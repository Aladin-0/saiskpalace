const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const db = require('./db');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.static(path.join(__dirname, '../dist')));

const JWT_SECRET = 'saiskpalace_secret_key_123';

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// Multer storage for images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

// Auth Middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// Login Route
app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body;
  db.get('admins', { username }, (err, admin) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!admin) return res.status(401).json({ error: 'Invalid credentials' });

    if (bcrypt.compareSync(password, admin.password)) {
      const token = jwt.sign({ id: admin.id, username: admin.username }, JWT_SECRET, { expiresIn: '24h' });
      res.json({ token });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  });
});

// Get all rooms
app.get('/api/rooms', (req, res) => {
  db.all('rooms', (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Get single room
app.get('/api/rooms/:id', (req, res) => {
  db.getById('rooms', req.params.id, (err, room) => {
    if (err) return res.status(404).json({ error: err.message });
    res.json(room);
  });
});

// Add a room (Protected)
app.post('/api/rooms', authenticateToken, upload.array('images', 10), (req, res) => {
  const { id, title, description, price, location, features, bedType, acType } = req.body;
  
  let images = [];
  if (req.files && req.files.length > 0) {
    images = req.files.map(f => `/uploads/${f.filename}`);
  }
  
  const featureString = features ? (Array.isArray(features) ? features.join(',') : features) : '';
  
  const newRoom = {
    id: id || Date.now().toString(),
    title,
    description,
    price: parseInt(price) || 0,
    location,
    features: featureString,
    images,
    bedType,
    acType
  };

  db.insertRoom(newRoom, (err, newId) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true, id: newId });
  });
});

// Update a room (Protected)
app.put('/api/rooms/:id', authenticateToken, upload.array('images', 10), (req, res) => {
  const { title, description, price, location, features, existingImages, bedType, acType } = req.body;
  const roomId = req.params.id;
  
  const featureString = features ? (Array.isArray(features) ? features.join(',') : features) : '';
  const updates = { title, description, price: parseInt(price) || 0, location, features: featureString, bedType, acType };
  
  // Parse existing images that were kept
  let images = [];
  if (existingImages) {
    images = Array.isArray(existingImages) ? existingImages : [existingImages];
  }

  // Add new uploaded images
  if (req.files && req.files.length > 0) {
    const newImages = req.files.map(f => `/uploads/${f.filename}`);
    images = [...images, ...newImages];
  }
  
  // Only update images if we provided some (or if we explicitly cleared them)
  updates.images = images;
  
  db.updateRoom(roomId, updates, (err, changes) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true, changes });
  });
});

// Delete a room (Protected)
app.delete('/api/rooms/:id', authenticateToken, (req, res) => {
  db.deleteRoom(req.params.id, (err, changes) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true, changes });
  });
});

// Serve the React frontend for any unknown routes
app.use((req, res, next) => {
  if (req.method === 'GET' && !req.path.startsWith('/api') && !req.path.startsWith('/uploads')) {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
  } else {
    next();
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

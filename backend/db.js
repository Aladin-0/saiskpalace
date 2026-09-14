const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');

const dbPath = path.resolve(__dirname, 'database.json');

// Initialize database
let db = {
  rooms: [],
  admins: []
};

// Load existing data
if (fs.existsSync(dbPath)) {
  const data = fs.readFileSync(dbPath, 'utf8');
  db = JSON.parse(data);
} else {
  // Add default admin if doesn't exist
  // bcrypt hash for 'password123'
  db.admins.push({
    id: 1,
    username: 'admin',
    password: bcrypt.hashSync('password123', 10)
  });
  saveDb();
}

function saveDb() {
  fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
}

// Simple DB interface mimicking async behavior
module.exports = {
  get: (table, conditions, callback) => {
    // Very simple get implementation for auth
    if (table === 'admins') {
      const user = db.admins.find(a => a.username === conditions.username);
      callback(null, user);
    }
  },
  all: (table, callback) => {
    if (table === 'rooms') {
      callback(null, db.rooms);
    }
  },
  getById: (table, id, callback) => {
    if (table === 'rooms') {
      const room = db.rooms.find(r => r.id === id);
      if (room) {
        callback(null, room);
      } else {
        callback(new Error('Room not found'), null);
      }
    }
  },
  insertRoom: (room, callback) => {
    db.rooms.push(room);
    saveDb();
    callback(null, room.id);
  },
  updateRoom: (id, updates, callback) => {
    const index = db.rooms.findIndex(r => r.id === id);
    if (index !== -1) {
      db.rooms[index] = { ...db.rooms[index], ...updates };
      saveDb();
      callback(null, 1);
    } else {
      callback(new Error('Room not found'), 0);
    }
  },
  deleteRoom: (id, callback) => {
    const initialLength = db.rooms.length;
    db.rooms = db.rooms.filter(r => r.id !== id);
    saveDb();
    callback(null, initialLength !== db.rooms.length ? 1 : 0);
  }
};

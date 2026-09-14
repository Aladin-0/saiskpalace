import { useState, useEffect, useRef } from 'react';
import { AMENITIES } from '../constants/amenities';
import { Link } from 'react-router-dom';

export function AdminPanel() {
  const [token, setToken] = useState<string | null>(localStorage.getItem('adminToken'));
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [rooms, setRooms] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingRoom, setEditingRoom] = useState<any>(null);
  const [existingImages, setExistingImages] = useState<string[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [generatedTitle, setGeneratedTitle] = useState('');
  const [generatedDesc, setGeneratedDesc] = useState('');
  
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (token) {
      fetchRooms();
    }
  }, [token]);

  const fetchRooms = () => {
    setLoading(true);
    fetch('/api/rooms')
      .then(res => res.json())
      .then(data => {
        setRooms(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    })
      .then(res => res.json())
      .then(data => {
        if (data.token) {
          localStorage.setItem('adminToken', data.token);
          setToken(data.token);
          setLoginError('');
        } else {
          setLoginError(data.error || 'Login failed');
        }
      })
      .catch(() => setLoginError('Server error'));
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setToken(null);
  };

  const handleSubmitRoom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current || isSubmitting) return;
    
    setIsSubmitting(true);
    const formData = new FormData(formRef.current);
    
    const url = editingRoom ? `/api/rooms/${editingRoom.id}` : '/api/rooms';
    const method = editingRoom ? 'PUT' : 'POST';

    fetch(url, {
      method,
      headers: { 'Authorization': `Bearer ${token}` },
      body: formData
    })
      .then(res => res.json())
      .then(data => {
        setIsSubmitting(false);
        if (data.success) {
          fetchRooms();
          closeDrawer();
        } else {
          alert(data.error || 'Failed to save room');
        }
      })
      .catch((err) => {
        setIsSubmitting(false);
        alert('Server error while saving room');
      });
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to permanently delete this room? This action cannot be undone.')) {
      fetch(`/api/rooms/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      })
        .then(res => res.json())
        .then(() => fetchRooms());
    }
  };

  const generateSeoContent = () => {
    if (!formRef.current) return;
    const formData = new FormData(formRef.current);
    const bedType = formData.get('bedType')?.toString().trim() || 'Premium Bed';
    const acType = formData.get('acType')?.toString().trim() || '';
    const location = formData.get('location')?.toString().trim() || '';
    const price = formData.get('price')?.toString() || '';
    const features = formData.getAll('features') as string[];
    
    // Expert SEO Title Generation (Optimized for 60-70 characters)
    const modifiers = ['Luxury', 'Premium', 'Exclusive', 'Comfortable', 'Top-Rated', 'Spacious'];
    const modifier = modifiers[Math.floor(Math.random() * modifiers.length)];
    const isSuite = bedType.toLowerCase().includes('suite');
    
    let titleParts = [`${modifier} ${bedType}${!isSuite ? ' Room' : ''}`];
    
    if (location) titleParts.push(`in ${location}`);
    
    const topAmenities = [];
    if (acType && acType.toUpperCase() !== 'NON AC') topAmenities.push(acType);
    if (features.includes('wifi')) topAmenities.push('Free Wi-Fi');
    if (features.includes('parking')) topAmenities.push('Parking');
    
    if (topAmenities.length > 0) {
      titleParts.push(`with ${topAmenities.slice(0, 2).join(' & ')}`);
    }
    titleParts.push(`| Sai Sk Palace, Shirdi`);
    
    const finalTitle = titleParts.join(' ').replace(/\s+/g, ' ');
    setGeneratedTitle(finalTitle);

    // Expert SEO Description Generation (High-converting sales copy)
    const allAmenitiesMap: Record<string, string> = {
      wifi: 'high-speed Wi-Fi', parking: 'secure parking', hotwater: '24/7 hot water',
      tv: 'flat-screen TV', gym: 'fitness center access', spa: 'relaxing spa services',
      restaurant: 'in-house dining', pool: 'swimming pool', cctv: '24/7 CCTV security',
      generator: 'power backup'
    };
    
    const humanAmenities = features.map(f => allAmenitiesMap[f]).filter(Boolean);
    
    let desc = `Experience the ultimate comfort in our ${modifier.toLowerCase()} ${bedType} ${!isSuite ? 'room' : 'suite'}, perfectly situated ${location ? `in the ${location} wing` : 'in the heart of Shirdi'}. `;
    
    desc += `Designed for both relaxation and convenience during your Shirdi visit, this beautiful accommodation features ${acType || 'climate control'}. `;
    
    if (humanAmenities.length > 0) {
      const last = humanAmenities.pop();
      const amenitiesText = humanAmenities.length > 0 ? `${humanAmenities.join(', ')} and ${last}` : last;
      desc += `Guests will enjoy exclusive access to premium amenities including ${amenitiesText}. `;
    }
    
    if (price) {
      desc += `Book your stay today for just ₹${price}/night and enjoy a flagship experience at Sai Sk Palace, Shirdi!`;
    } else {
      desc += `Book your stay today and enjoy a flagship experience at Sai Sk Palace, Shirdi!`;
    }

    setGeneratedDesc(desc);
  };

  const openDrawerForNew = () => {
    setEditingRoom(null);
    setExistingImages([]);
    setPreviewImages([]);
    setGeneratedTitle('');
    setGeneratedDesc('');
    setIsDrawerOpen(true);
  };

  const openDrawerForEdit = (room: any) => {
    setEditingRoom(room);
    let imgs = room.images || [];
    if (imgs.length === 0 && room.image) imgs = [room.image];
    setExistingImages(imgs);
    setPreviewImages([]);
    setGeneratedTitle(room.title || '');
    setGeneratedDesc(room.description || '');
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
    setTimeout(() => {
      setEditingRoom(null);
      setExistingImages([]);
      setPreviewImages([]);
      formRef.current?.reset();
    }, 300);
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      const fileUrls = filesArray.map(file => URL.createObjectURL(file));
      setPreviewImages(fileUrls);
    }
  };

  if (!token) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-900 overflow-hidden">
        {/* Abstract Background Elements */}
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-orange-500/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px]" />
        
        <div className="relative z-10 bg-white/10 backdrop-blur-2xl p-10 rounded-3xl shadow-2xl border border-white/20 w-full max-w-md mx-4">
          <div className="text-center mb-8">
            <h1 className="font-display text-3xl font-bold text-white mb-2 tracking-tight">Sai Sk Palace</h1>
            <p className="text-neutral-400 text-sm font-medium tracking-widest uppercase">Admin Portal</p>
          </div>
          
          {loginError && (
            <div className="mb-6 p-3 bg-red-500/20 border border-red-500/50 rounded-xl text-red-200 text-sm text-center font-medium backdrop-blur-md">
              {loginError}
            </div>
          )}
          
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-neutral-400 mb-1.5 uppercase tracking-wider">Username</label>
              <input 
                type="text" 
                className="w-full px-4 py-3 bg-black/40 border border-white/10 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all placeholder:text-neutral-600"
                placeholder="Enter username"
                value={username} 
                onChange={e => setUsername(e.target.value)} 
                required 
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-neutral-400 mb-1.5 uppercase tracking-wider">Password</label>
              <input 
                type="password" 
                className="w-full px-4 py-3 bg-black/40 border border-white/10 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all placeholder:text-neutral-600"
                placeholder="••••••••"
                value={password} 
                onChange={e => setPassword(e.target.value)} 
                required 
              />
            </div>
            <button type="submit" className="w-full mt-4 py-3.5 bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-bold transition-all shadow-lg shadow-orange-500/25">
              Sign In to Dashboard
            </button>
          </form>
          
          <div className="mt-8 text-center">
            <Link to="/" className="text-xs text-neutral-500 hover:text-white transition-colors">
              &larr; Return to main website
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex bg-[#f8f9fa] text-neutral-900 font-sans overflow-hidden">
      
      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-neutral-900/50 backdrop-blur-sm z-30 lg:hidden" 
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar Navigation */}
      <aside className={`fixed inset-y-0 left-0 w-64 bg-white border-r border-neutral-200 flex flex-col shadow-xl lg:shadow-sm z-40 shrink-0 transform transition-transform duration-300 lg:relative lg:translate-x-0 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6 border-b border-neutral-100 flex items-center justify-between">
          <div>
            <h1 className="font-display font-bold text-xl text-neutral-900 tracking-tight">Admin<span className="text-orange-500">Portal</span></h1>
            <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mt-0.5">Sai Sk Palace</p>
          </div>
          <button onClick={() => setIsMobileMenuOpen(false)} className="lg:hidden p-2 text-neutral-500 hover:text-neutral-900 rounded-lg bg-neutral-50">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <nav className="flex-1 p-4 space-y-1">
          <a href="#" className="flex items-center gap-3 px-4 py-3 bg-orange-50 text-orange-600 font-bold rounded-xl transition-colors">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            Manage Rooms
          </a>
          <Link to="/" className="flex items-center gap-3 px-4 py-3 text-neutral-500 hover:bg-neutral-50 hover:text-neutral-900 font-medium rounded-xl transition-colors">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            View Website
          </Link>
        </nav>
        
        <div className="p-4 border-t border-neutral-100">
          <button onClick={handleLogout} className="flex items-center gap-3 w-full px-4 py-3 text-red-500 hover:bg-red-50 font-bold rounded-xl transition-colors">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        {/* Header */}
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-neutral-200 px-4 md:px-8 flex items-center justify-between shrink-0 z-10 sticky top-0">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-2 -ml-2 text-neutral-600 hover:bg-neutral-100 rounded-lg"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <div>
              <h2 className="text-lg md:text-2xl font-bold text-neutral-900">Room Inventory</h2>
              <p className="text-[10px] md:text-xs text-neutral-500 font-medium hidden sm:block">Manage pricing, photos, and availability</p>
            </div>
          </div>
          
          <button 
            onClick={openDrawerForNew}
            className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-3 py-2 md:px-5 md:py-2.5 rounded-xl font-bold text-xs md:text-sm transition-all shadow-sm shadow-orange-500/20 whitespace-nowrap"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            <span className="hidden sm:inline">Add New Room</span>
            <span className="sm:hidden">Add Room</span>
          </button>
        </header>

        {/* Dashboard Content */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 custom-scrollbar">
          
          {/* Stats Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 bg-orange-50 text-orange-500 rounded-full flex items-center justify-center shrink-0">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-bold text-neutral-500">Total Rooms</p>
                <p className="text-2xl font-display font-bold text-neutral-900">{rooms.length}</p>
              </div>
            </div>
            {/* Add more stats if needed */}
          </div>

          {/* Data Table / List */}
          <div className="bg-white border border-neutral-200 rounded-3xl shadow-sm overflow-hidden">
            {loading ? (
              <div className="p-12 text-center text-neutral-500 font-medium animate-pulse">Loading inventory...</div>
            ) : rooms.length === 0 ? (
              <div className="p-16 text-center flex flex-col items-center">
                <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-neutral-900 mb-1">No rooms found</h3>
                <p className="text-neutral-500 text-sm max-w-sm mb-6">Your inventory is currently empty. Start by adding your first room to display on the website.</p>
                <button onClick={openDrawerForNew} className="text-orange-500 font-bold hover:text-orange-600">
                  + Add your first room
                </button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-neutral-50 border-b border-neutral-200 text-xs font-bold text-neutral-500 uppercase tracking-wider">
                      <th className="p-4 pl-4 md:pl-6 font-bold w-16">Photos</th>
                      <th className="p-4 font-bold">Room Details</th>
                      <th className="p-4 font-bold">Pricing</th>
                      <th className="p-4 font-bold hidden md:table-cell">Amenities</th>
                      <th className="p-4 pr-4 md:pr-6 font-bold text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-100">
                    {rooms.map(room => {
                      const roomFeatures = room.features ? room.features.split(',') : [];
                      return (
                        <tr key={room.id} className="hover:bg-neutral-50/50 transition-colors group">
                          <td className="p-4 pl-4 md:pl-6 align-top">
                            <div className="w-20 h-16 rounded-xl overflow-hidden bg-neutral-100 border border-neutral-200 relative">
                              <img 
                                src={(room.images && room.images.length > 0) ? room.images[0] : (room.image || '/images/room3.jpeg')} 
                                alt={room.title} 
                                className="w-full h-full object-cover"
                              />
                              {room.images && room.images.length > 1 && (
                                <div className="absolute bottom-1 right-1 bg-black/70 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-md backdrop-blur-sm">
                                  +{room.images.length - 1}
                                </div>
                              )}
                            </div>
                          </td>
                          <td className="p-4 align-top">
                            <h4 className="font-bold text-neutral-900 text-sm mb-0.5">{room.title}</h4>
                            <p className="text-xs text-neutral-500 font-medium flex items-center gap-1">
                              <svg className="w-3.5 h-3.5 text-neutral-400 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                <path clipRule="evenodd" fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" />
                              </svg>
                              {room.location}
                            </p>
                          </td>
                          <td className="p-4 align-top">
                            <div className="font-display font-bold text-neutral-900 text-base">₹{room.price}</div>
                            <div className="text-[10px] text-neutral-500 uppercase font-bold tracking-wider">Per Night</div>
                          </td>
                          <td className="p-4 align-top hidden md:table-cell">
                            <div className="flex flex-wrap gap-1 max-w-[200px]">
                              {roomFeatures.slice(0, 4).map((f: string) => {
                                const amenity = AMENITIES.find(a => a.id === f);
                                return amenity ? (
                                  <span key={f} title={amenity.title} className="inline-flex items-center justify-center w-6 h-6 bg-neutral-100 text-neutral-600 rounded-md border border-neutral-200">
                                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={amenity.icon} /></svg>
                                  </span>
                                ) : null;
                              })}
                              {roomFeatures.length > 4 && (
                                <span className="inline-flex items-center justify-center px-1.5 h-6 bg-neutral-50 text-neutral-400 text-[10px] font-bold rounded-md border border-neutral-100">
                                  +{roomFeatures.length - 4}
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="p-4 pr-4 md:pr-6 align-top text-right">
                            <div className="flex items-center justify-end gap-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                              <button 
                                onClick={() => openDrawerForEdit(room)}
                                className="p-2 text-neutral-500 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
                                title="Edit Room"
                              >
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                              </button>
                              <button 
                                onClick={() => handleDelete(room.id)}
                                className="p-2 text-neutral-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                title="Delete Room"
                              >
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Centered Modal for Form */}
      {isDrawerOpen && (
        <>
          <div 
            className="fixed inset-0 bg-neutral-900/60 backdrop-blur-sm z-[60] transition-opacity flex items-center justify-center p-4 sm:p-6"
            onClick={closeDrawer}
          >
            <div 
              className="relative w-full max-w-2xl bg-white shadow-2xl z-[70] flex flex-col rounded-3xl border border-neutral-200 animate-in fade-in zoom-in-95 duration-300 overflow-hidden max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
            
            <div className="flex items-center justify-between p-6 border-b border-neutral-100 bg-neutral-50/50 shrink-0">
              <div>
                <h3 className="font-bold text-xl text-neutral-900">
                  {editingRoom ? 'Edit Room' : 'Add New Room'}
                </h3>
                <p className="text-xs text-neutral-500 mt-1">Fill out the details to update your inventory.</p>
              </div>
              <button 
                onClick={closeDrawer}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-white border border-neutral-200 text-neutral-500 hover:bg-neutral-50 hover:text-neutral-900 transition-colors shadow-sm"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
              <form ref={formRef} onSubmit={handleSubmitRoom} className="space-y-6">
                
                {/* Basic Info Section */}
                <div className="space-y-4">
                  <h4 className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest border-b border-neutral-100 pb-2">Basic Details</h4>
                  
                  <div>
                    <div className="flex justify-between items-end mb-1.5">
                      <label className="block text-xs font-bold text-neutral-700">Room Title & Description</label>
                      <button 
                        type="button" 
                        onClick={generateSeoContent}
                        className="text-[10px] font-bold text-[#b54a1a] bg-[#f4eee6] hover:bg-[#e8decb] px-3 py-1.5 rounded-md transition-colors flex items-center gap-1.5 shadow-sm"
                      >
                        ✨ Auto-Generate SEO Content
                      </button>
                    </div>
                    <input 
                      type="text" 
                      name="title" 
                      value={generatedTitle}
                      onChange={(e) => setGeneratedTitle(e.target.value)}
                      placeholder="e.g. Premium Deluxe Suite"
                      required 
                      className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all placeholder:text-neutral-400" 
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-neutral-700 mb-1.5">Price (₹)</label>
                      <input 
                        type="number" 
                        name="price" 
                        defaultValue={editingRoom?.price} 
                        placeholder="e.g. 2500"
                        required 
                        className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all placeholder:text-neutral-400" 
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-neutral-700 mb-1.5">Location / Wing</label>
                      <input 
                        type="text" 
                        name="location" 
                        defaultValue={editingRoom?.location} 
                        placeholder="e.g. Ground Floor"
                        required 
                        className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all placeholder:text-neutral-400" 
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-neutral-700 mb-1.5">Description (SEO Caption)</label>
                    <textarea 
                      name="description" 
                      value={generatedDesc}
                      onChange={(e) => setGeneratedDesc(e.target.value)}
                      rows={4} 
                      placeholder="Describe the room and its vibe..."
                      className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all placeholder:text-neutral-400 resize-none leading-relaxed"
                    />
                  </div>
                </div>

                {/* Room Specifications Section */}
                <div className="space-y-4 pt-2">
                  <h4 className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest border-b border-neutral-100 pb-2">Room Specifications</h4>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-neutral-700 mb-1.5">Bed Type</label>
                      <input 
                        type="text" 
                        name="bedType" 
                        list="bed-types"
                        defaultValue={editingRoom?.bedType} 
                        placeholder="e.g. King Bed"
                        required 
                        className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all placeholder:text-neutral-400" 
                      />
                      <datalist id="bed-types">
                        <option value="Single Bed" />
                        <option value="Double Bed" />
                        <option value="King Bed" />
                        <option value="Queen Bed" />
                        <option value="Twin Beds" />
                      </datalist>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-neutral-700 mb-1.5">AC Status</label>
                      <input 
                        type="text" 
                        name="acType" 
                        list="ac-types"
                        defaultValue={editingRoom?.acType} 
                        placeholder="e.g. AC"
                        required 
                        className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all placeholder:text-neutral-400" 
                      />
                      <datalist id="ac-types">
                        <option value="AC" />
                        <option value="Non AC" />
                        <option value="Central AC" />
                      </datalist>
                    </div>
                  </div>
                </div>

                {/* Amenities Section */}
                <div className="space-y-4 pt-2">
                  <h4 className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest border-b border-neutral-100 pb-2">Premium Amenities</h4>
                  <div className="grid grid-cols-2 gap-3 max-h-56 overflow-y-auto pr-2 custom-scrollbar">
                    {AMENITIES.map((amenity) => (
                      <label key={amenity.id} className="group flex items-start gap-2.5 p-2.5 bg-white border border-neutral-200 rounded-xl cursor-pointer hover:border-orange-500 hover:bg-orange-50/30 transition-all shadow-sm shadow-black/[0.01]">
                        <input 
                          type="checkbox" 
                          name="features" 
                          value={amenity.id}
                          defaultChecked={editingRoom?.features?.includes(amenity.id)}
                          className="mt-0.5 shrink-0 w-4 h-4 text-orange-500 focus:ring-orange-500 rounded border-neutral-300 transition-colors"
                        />
                        <div>
                          <div className="text-xs font-bold text-neutral-900 group-hover:text-orange-700 transition-colors">{amenity.title}</div>
                          <div className="text-[10px] text-neutral-500 line-clamp-1">{amenity.shortDesc}</div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Photos Section */}
                <div className="space-y-4 pt-2">
                  <h4 className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest border-b border-neutral-100 pb-2">Room Photography</h4>
                  
                  {/* Existing images gallery */}
                  {existingImages.length > 0 && (
                    <div className="mb-4">
                      <p className="text-xs text-neutral-500 mb-2">Existing Photos (Will be kept unless removed)</p>
                      <div className="grid grid-cols-3 gap-3">
                        {existingImages.map((img: string, i: number) => (
                          <div key={i} className="relative group rounded-xl overflow-hidden border border-neutral-200 aspect-[4/3] bg-neutral-100">
                            <img src={img} alt={`Existing photo ${i+1}`} className="w-full h-full object-cover" />
                            <button 
                              type="button" 
                              onClick={() => setExistingImages(prev => prev.filter((_, idx) => idx !== i))}
                              className="absolute top-1.5 right-1.5 w-6 h-6 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-md"
                              title="Remove this photo"
                            >
                              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
                            </button>
                            {/* We still need the hidden input so the backend knows this image was kept */}
                            <input type="hidden" name="existingImages" value={img} />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {previewImages.length > 0 && (
                    <div className="mb-4">
                      <p className="text-xs text-orange-500 font-medium mb-2">New Photos Selected for Upload</p>
                      <div className="grid grid-cols-3 gap-3">
                        {previewImages.map((img, i) => (
                          <div key={i} className="relative rounded-xl overflow-hidden border-2 border-orange-500/50 aspect-[4/3] bg-neutral-100 shadow-sm">
                            <img src={img} alt={`New Preview ${i+1}`} className="w-full h-full object-cover" />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="relative group">
                    <input 
                      type="file" 
                      name="images" 
                      accept="image/*" 
                      multiple 
                      onChange={handleImageSelect}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
                    />
                    <div className="w-full border-2 border-dashed border-neutral-300 rounded-2xl p-8 text-center bg-neutral-50 group-hover:bg-orange-50 group-hover:border-orange-300 transition-colors">
                      <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto shadow-sm border border-neutral-200 text-neutral-400 group-hover:text-orange-500 mb-3 transition-colors">
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                      </div>
                      <p className="text-sm font-bold text-neutral-900 mb-1">Click to upload new photos</p>
                      <p className="text-xs text-neutral-500">You can select multiple files at once.</p>
                    </div>
                  </div>
                </div>

              </form>
            </div>

            <div className="p-6 border-t border-neutral-100 bg-neutral-50 shrink-0 flex gap-3 justify-end">
              <button 
                type="button" 
                onClick={closeDrawer} 
                disabled={isSubmitting}
                className="py-3 px-6 bg-white border border-neutral-200 text-neutral-700 rounded-xl font-bold text-sm hover:bg-neutral-50 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button 
                onClick={(e) => {
                  e.preventDefault();
                  formRef.current?.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
                }}
                disabled={isSubmitting}
                className="py-3 px-8 bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-bold text-sm transition-all shadow-lg shadow-orange-500/20 disabled:opacity-50 flex items-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                    Saving...
                  </>
                ) : (
                  editingRoom ? 'Save Changes' : 'Publish Room'
                )}
              </button>
            </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

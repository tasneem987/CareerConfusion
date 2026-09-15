import React, { useEffect, useState, useRef } from "react";
import Sidebar from "../components/Sidebar";
import "../styles/Profile.css";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [edit, setEdit] = useState(false);
  const [form, setForm] = useState({});
  const [activity, setActivity] = useState([]);
  const [stats, setStats] = useState({
    saved: 0,
    quizzes: 0,
    topField: "None"
  });
  const [error, setError] = useState(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);
  const [showResults, setShowResults] = useState(false);
const [quizResults, setQuizResults] = useState([]);
const [loadingResults, setLoadingResults] = useState(false);
const [showSaved, setShowSaved] = useState(false);
const [savedMajors, setSavedMajors] = useState([]);
const [loadingSaved, setLoadingSaved] = useState(false);
const [nameError, setNameError] = useState("");

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    const raw = localStorage.getItem("user");
    if (!raw) {
      setError("No user logged in");
      return;
    }

    const parsed = JSON.parse(raw);
    const userId = parsed.userid;

    try {
      // GET USER
      const userRes = await fetch(`http://localhost:5000/api/user/${userId}`);
      const userData = await userRes.json();
      
      if (userData.error) {
        setError(userData.error);
        setUser(null);
      } else {
        setUser(userData);
        setForm(userData);
      }

      // GET ACTIVITY
      const activityRes = await fetch(`http://localhost:5000/api/activity/${userId}`);
      const activityData = await activityRes.json();
      setActivity(Array.isArray(activityData) ? activityData : []);

      // GET STATS
      const statsRes = await fetch(`http://localhost:5000/api/profile-stats/${userId}`);
      const statsData = await statsRes.json();
      setStats(statsData);
    } catch (err) {
      console.error(err);
      setError("Failed to load profile");
    }
  };
  
const handleImageUpload = async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  setUploading(true);
  const formData = new FormData();
  formData.append('profilePic', file);

  // Get user from localStorage
  const user = JSON.parse(localStorage.getItem('user'));

  try {
    const res = await fetch('http://localhost:5000/api/upload-profile-pic', {
  method: 'POST',
  body: formData,
  headers: {
    'X-User-ID': JSON.stringify({ userid: user.userid })   // only what's needed
  }
});
    
    const data = await res.json();
    
    if (data.success) {
      // Update local state AND localStorage
      const updatedUser = { ...user, profile_pic: data.profilePic };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setUser(updatedUser);
      setForm(updatedUser);
    } else {
      alert(data.message || 'Upload failed');
    }
  } catch (err) {
    console.error('Upload failed:', err);
    alert('Upload failed. Please try again.');
  } finally {
    setUploading(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
  }
};

const handleDeletePic = async () => {
  try {
    const res = await fetch(`http://localhost:5000/api/profile-pic/${user.userid}`, {
      method: 'DELETE'
    });
    const data = await res.json();
    if (data.success) {
      const updatedUser = { ...user, profile_pic: null };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setUser(updatedUser);
      setForm(updatedUser);
    }
  } catch (err) {
    console.error(err);
    alert('Failed to delete picture');
  }
};
 const handleSave = async () => {
  // Validate name
  if (form.name && /\d/.test(form.name)) {
    setNameError("Name cannot contain numbers");
    return;
  } else {
    setNameError("");
  }

  try {
    const res = await fetch(`http://localhost:5000/api/user/${user.userid}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    if (data.success) {
      setUser(form);
      setEdit(false);
    } else {
      alert(data.error || "Update failed");
    }
  } catch (err) {
    console.error(err);
    alert("Failed to save changes");
  }
};

  const fetchResults = async () => {
  setLoadingResults(true);
  try {
    const res = await fetch(`http://localhost:5000/api/user-results/${user.userid}`);
    const data = await res.json();
    setQuizResults(data);
  } catch (err) {
    console.error(err);
  } finally {
    setLoadingResults(false);
  }
};

  if (error) return (
    <div className="dashboard">
      <Sidebar />
      <div className="main">
        <div style={{ padding: '40px', textAlign: 'center' }}>
          <h2>⚠️ Error</h2>
          <p>{error}</p>
        </div>
      </div>
    </div>
  );

  const fetchSavedMajors = async () => {
  setLoadingSaved(true);
  try {
    const res = await fetch(`http://localhost:5000/api/saved-majors/${user.userid}`);
    const data = await res.json();
    setSavedMajors(data);
  } catch (err) {
    console.error(err);
  } finally {
    setLoadingSaved(false);
  }
};

  if (!user) return (
    <div className="dashboard">
      <Sidebar />
      <div className="main">
        <div style={{ padding: '40px', textAlign: 'center' }}>
          <div style={{ width: '50px', height: '50px', border: '3px solid #e5e7eb', borderTop: '3px solid #3b82f6', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto 20px' }}></div>
          <p>Loading Profile...</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="dashboard">
      <Sidebar />
      <div className="main">
        <div className="profile-page">
          {/* 🖼️ HERO SECTION */}
          <div className="profile-hero">
            <div className="hero-background"></div>
            <div className="profile-avatar-section">
              <div className="avatar-container">
                {user.profile_pic ? (
                  <img src={user.profile_pic} alt="Profile" className="profile-img" />
                ) : (
                  <div className="avatar-fallback">
                    {user.name?.charAt(0).toUpperCase() || '?'}
                  </div>
                )}
                <button 
                  className="avatar-upload-btn" 
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploading}
                >
                  {uploading ? '⏳' : '📸'}
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  style={{ display: 'none' }}
                />
                {user.profile_pic && (
  <button 
    className="avatar-upload-btn delete" 
    onClick={handleDeletePic}
    disabled={uploading}
    style={{ background: '#ef4444' }}
  >
    🗑️
  </button>
)}
              </div>
              <div className="profile-status">
                <span className="status-online"></span>
                <span className="status-text">Active now</span>
              </div>
            </div>
            
            <div className="profile-info">
              <h1>{user.name || 'Anonymous User'}</h1>
              <p className="role-badge">Student • {user.educational_level || 'Not specified'}</p>
              <p className="bio">{user.bio || 'Exploring career paths and building my future...'}</p>
            </div>

            <div className="profile-actions">
              <button className={`btn-primary ${edit ? 'btn-save' : 'btn-edit'}`} onClick={edit ? handleSave : () => setEdit(true)}>
                {edit ? '💾 Save Changes' : '✏️ Edit Profile'}
              </button>
            </div>
          </div>

          {/* 📊 STATS & INFO */}
          <div className="profile-content">
            {/* Stats */}
            <section className="stats-section">
              <h2>📈 Your Stats</h2>
              <div className="stats-grid">
                <div className="stat-card"
     onClick={() => {
       fetchSavedMajors();
       setShowSaved(true);
     }}
     style={{ cursor: 'pointer' }}
>
  <div className="stat-number">{stats.saved}</div>
  <div className="stat-label">Majors Saved</div>
</div>
                <div className="stat-card" 
     onClick={() => { 
       fetchResults(); 
       setShowResults(true); 
     }}
     style={{ cursor: 'pointer' }}
>
  <div className="stat-number">{stats.quizzes}</div>
  <div className="stat-label">Results</div>
</div>
                <div className="stat-card"
     onClick={() => {
       fetchResults();
       setShowResults(true);
     }}
     style={{ cursor: 'pointer' }}
>
  <div className="stat-number">{stats.topField}</div>
  <div className="stat-label">Top Field</div>
</div>
              </div>
            </section>

            {/* Personal Info */}
            <section className="info-section">
              <h2>👤 Personal Information</h2>
              <div className="info-grid">
                <div className="info-item">
                  {/* Name – editable */}
    <div className="info-item">
      <label>Name</label>
      {edit ? (
        <>
          <input
            value={form.name || ""}
            onChange={(e) => {
              setForm({ ...form, name: e.target.value });
              if (nameError) setNameError("");
            }}
            className="input-edit"
            placeholder="Your full name"
          />
          {nameError && <span className="error-text">{nameError}</span>}
        </>
      ) : (
        <div className="info-value">{user.name}</div>
      )}
    </div>

    {/* Email – non-editable */}
    <div className="info-item">
      <label>Email</label>
      <div className="info-value locked">
        {user.email} <span title="Email cannot be changed">🔒</span>
      </div>
    </div>

                <div className="info-item">
                  <label>Age</label>
                  {edit ? (
                    <input 
                      value={form.age || ""} 
                      onChange={(e) => setForm({ ...form, age: e.target.value })}
                      className="input-edit"
                    />
                  ) : (
                    <div className="info-value">{user.age || '—'}</div>
                  )}
                </div>
                </div>
                <div className="info-item">
                  <label>Location</label>
                  {edit ? (
                    <input 
                      value={form.location || ""} 
                      onChange={(e) => setForm({ ...form, location: e.target.value })}
                      className="input-edit"
                      placeholder="e.g. New York, USA"
                    />
                  ) : (
                    <div className="info-value">{user.location || '—'}</div>
                  )}
                </div>
                <div className="info-item full">
                  <label>Bio</label>
                  {edit ? (
                    <textarea 
                      value={form.bio || ""} 
                      onChange={(e) => setForm({ ...form, bio: e.target.value })}
                      className="input-edit textarea"
                      rows="3"
                      placeholder="Tell us about yourself..."
                    />
                  ) : (
                    <div className="info-value">{user.bio || 'No bio yet'}</div>
                  )}
                </div>
              </div>
              <div className="member-since">
                <span>Member since </span>
                <strong>
                  {user.created_at 
                    ? new Date(user.created_at).toLocaleDateString('en-US', { 
                        year: 'numeric', month: 'long' 
                      }) 
                    : 'Recently'
                  }
                </strong>
              </div>
            </section>
          </div>
        </div>
      </div>
      {/* Results Modal */}
{showResults && (
  <div className="results-overlay" onClick={() => setShowResults(false)}>
    <div className="results-modal" onClick={(e) => e.stopPropagation()}>
      <div className="results-header">
        <h2>📋 Your Quiz Results</h2>
        <button onClick={() => setShowResults(false)}>✕</button>
      </div>
      <div className="results-body">
        {loadingResults ? (
          <p>Loading...</p>
        ) : quizResults.length === 0 ? (
          <p>No quizzes taken yet.</p>
        ) : (
          <ul className="results-list">
            {quizResults.map((quiz) => (
              <li key={quiz.id}>
                <span className="result-type">{quiz.result_type}</span>
                <span className="result-date">
                  {new Date(quiz.created_at).toLocaleDateString()}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  </div>
)}
{/* Saved Majors Modal */}
{showSaved && (
  <div className="results-overlay" onClick={() => setShowSaved(false)}>
    <div className="results-modal" onClick={(e) => e.stopPropagation()}>
      <div className="results-header">
        <h2>⭐ Saved Majors</h2>
        <button onClick={() => setShowSaved(false)}>✕</button>
      </div>
      <div className="results-body">
        {loadingSaved ? (
          <p>Loading...</p>
        ) : savedMajors.length === 0 ? (
          <p>No saved majors yet.</p>
        ) : (
          <ul className="results-list">
            {savedMajors.map((major) => (
              <li key={major.major_id}>
                <span className="result-type">{major.major_name}</span>
                <span className="result-date">{major.category}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  </div>
)}
    </div>
  );
}
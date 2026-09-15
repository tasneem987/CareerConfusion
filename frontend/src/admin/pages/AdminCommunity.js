import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import "../../styles/admincommunity.css";

export default function AdminCommunity() {
  const [posts, setPosts] = useState([]);
  const [stats, setStats] = useState({ totalPosts: 0, totalComments: 0 });
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [loading, setLoading] = useState(false);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const params = {};
      if (searchTerm) params.query = searchTerm;
      if (selectedFilter !== "all") params.filter = selectedFilter;

      const res = await axios.get("http://localhost:5000/api/admin/posts/search", { params });
      setPosts(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/admin/community/stats");
      setStats(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchPosts();
    fetchStats();
  }, [searchTerm, selectedFilter]);

  const deletePost = async (id) => {
    if (!window.confirm("Delete this post and all its comments?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/admin/posts/${id}`);
      fetchPosts();
    } catch (err) {
      console.error(err);
    }
  };

  const pinPost = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/admin/posts/pin/${id}`);
      fetchPosts(); // refresh
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="admin-community">
      <div className="community-header">
        <div className="page-header">
          <div>
            <h2>Community Management</h2>
            <p className="subtitle">Manage posts, comments, and community engagement</p>
          </div>
        </div>

        <div className="stats-grid">
          <div className="stat-card"><span>📝</span><h3>Total Posts</h3><p>{stats.totalPosts || 0}</p></div>
          <div className="stat-card"><span>💬</span><h3>Total Comments</h3><p>{stats.totalComments || 0}</p></div>
          <div className="stat-card"><span>⭐</span><h3>Pinned</h3><p>{posts.filter(p => p.pinned).length}</p></div>
          <div className="stat-card"><span>👀</span><h3>Showing</h3><p>{posts.length}</p></div>
        </div>

        <div className="controls-container">
          <input
            type="text"
            placeholder="Search posts or users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <select
            value={selectedFilter}
            onChange={(e) => setSelectedFilter(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Posts</option>
            <option value="pinned">Pinned Only</option>
            <option value="unpinned">Unpinned Only</option>
          </select>
        </div>

        <div className="posts-container">
          {loading && posts.length === 0 ? (
            <div className="loading-container">Loading...</div>
          ) : posts.length === 0 ? (
            <div className="empty-state">No posts found</div>
          ) : (
            posts.map(post => (
              <AdminPost
                key={post.post_id}
                post={post}
                onPin={pinPost}
                onDelete={deletePost}
                onRefreshStats={fetchStats} 
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

// ----- Admin Post Component with Likes, Replies, and Admin Actions -----
function AdminPost({ post, onPin, onDelete,onRefreshStats }) {
  const [likes, setLikes] = useState(post.likes_count || 0);
  const [liked, setLiked] = useState(false);
  const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState(false);
  const [reply, setReply] = useState("");
  const [replying, setReplying] = useState(false);

  const currentUser = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchComments();
  }, [post.post_id]);

  const fetchComments = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/comments/${post.post_id}`);
      setComments(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleLike = async () => {
    if (!currentUser) return;
    try {
      const res = await axios.post(`http://localhost:5000/api/posts/${post.post_id}/like`, {
        user_id: currentUser.userid,
      });
      setLikes(res.data.likes);
      setLiked(res.data.liked);
    } catch (err) {
      console.error(err);
    }
  };

  const handleReply = async () => {
    if (!reply.trim()) return;
    setReplying(true);
    try {
      await axios.post("http://localhost:5000/api/comments", {
        post_id: post.post_id,
        user_id: currentUser.userid,
        content: reply,
      });
      setReply("");
      fetchComments();
    } catch (err) {
      console.error(err);
    } finally {
      setReplying(false);
    }
  };

 const deleteComment = async (commentId) => {
  if (!window.confirm("Delete this reply?")) return;
  try {
    await axios.delete(`http://localhost:5000/api/admin/comments/${commentId}`, {
      headers: { "user-role": currentUser?.role || "admin" }
    });
    fetchComments();          // refresh comment list
    if (onRefreshStats) onRefreshStats(); // refresh stats
  } catch (err) {
    console.error(err);
  }
};

  return (
    <div className="admin-post">
      <div className="post-header">
        {/* Profile picture – fixed to use post.profile_pic if available */}
        <div className="avatar">
          {post.profile_pic ? (
            <img
              src={post.profile_pic}
              alt={post.name}
              className="avatar-img"
              onError={(e) => {
                e.target.onerror = null;
                e.target.style.display = "none";
                // fallback to initial
                e.target.parentNode.innerHTML = post.name?.charAt(0).toUpperCase() || "?";
              }}
            />
          ) : (
            post.name?.charAt(0).toUpperCase() || "?"
          )}
        </div>
        <div className="user-info">
          <h4>{post.name} {post.pinned ? "📌" : ""}</h4>
          <span className="post-date">{new Date(post.created_at).toLocaleString()}</span>
        </div>
      </div>

      <p className="post-content">{post.content}</p>

      <div className="post-stats">
        <button className="like-btn" onClick={handleLike}>
          ❤️ Like ({likes})
        </button>
        <button className="comment-toggle" onClick={() => setShowComments(!showComments)}>
          💬 {comments.length} {comments.length === 1 ? "reply" : "replies"} {showComments ? "▲" : "▼"}
        </button>
      </div>

      {showComments && (
        <div className="comments-section">
          {comments.length === 0 ? (
            <p className="no-replies">No replies yet.</p>
          ) : (
            comments.map(c => (
              <div key={c.comment_id} className="comment-item">
                <div className="comment-author">
                  <div className="avatar-small">
                    {c.profile_pic ? (
                      <img
                        src={c.profile_pic}
                        alt={c.name}
                        className="avatar-img"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.style.display = "none";
                          e.target.parentNode.innerHTML = c.name?.charAt(0).toUpperCase() || "?";
                        }}
                      />
                    ) : (
                      c.name?.charAt(0).toUpperCase() || "?"
                    )}
                  </div>
                  <strong>{c.name}</strong>
                  <span className="comment-time">
                    {new Date(c.created_at).toLocaleString()}
                  </span>
                  {/* Delete comment button – admin only */}
                  <button
                    className="delete-comment-btn"
                    onClick={() => deleteComment(c.comment_id)}
                    title="Delete reply"
                    style={{
                      background: "none",
                      border: "none",
                      color: "#ef4444",
                      cursor: "pointer",
                      marginLeft: "auto",
                      fontSize: "1rem",
                    }}
                  >
                    🗑️
                  </button>
                </div>
                <p>{c.content}</p>
              </div>
            ))
          )}
          <div className="reply-box">
            <input
              value={reply}
              onChange={(e) => setReply(e.target.value)}
              placeholder="Write a reply..."
              disabled={replying}
            />
            <button onClick={handleReply} disabled={replying || !reply.trim()}>
              {replying ? "Posting..." : "Reply"}
            </button>
          </div>
        </div>
      )}

      <div className="post-actions">
        <button
          className={`action-btn pin-btn ${post.pinned ? 'active' : ''}`}
          onClick={() => onPin(post.post_id)}
        >
          {post.pinned ? "Unpin" : "Pin"}
        </button>
        <button className="action-btn delete-btn" onClick={() => onDelete(post.post_id)}>
          Delete
        </button>
      </div>
    </div>
  );
}
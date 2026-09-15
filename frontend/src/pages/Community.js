import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import "../styles/community.css";

export default function Community() {
  const [posts, setPosts] = useState([]);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/posts");
      setPosts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handlePost = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!content.trim()) return;

    setLoading(true);
    try {
      await axios.post("http://localhost:5000/api/posts", {
        user_id: user.userid,
        content,
      });
      setContent("");
      fetchPosts();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard">
      <Sidebar />
      <div className="main">
        <div className="community-container">
          <div className="community-header">
            <h2 className="community-title">Community Hub</h2>
            <p className="community-subtitle">
              Connect, share ideas, and grow together with like-minded professionals
            </p>
          </div>

          {/* POST BOX */}
          <div className="post-box">
            <textarea
              placeholder="What's on your mind? Share a career tip, ask a question, or celebrate a win..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              disabled={loading}
            />
            <button onClick={handlePost} disabled={loading || !content.trim()}>
              {loading ? "Posting..." : "Share Post"}
            </button>
          </div>

          {/* POSTS */}
          {posts.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon">📝</div>
              <h3>No posts yet</h3>
              <p>Be the first to share your thoughts and kickstart the conversation!</p>
            </div>
          ) : (
            posts.map((post) => (
              <Post key={post.post_id} post={post} refreshPosts={fetchPosts} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

// ================= POST COMPONENT =================
function Post({ post, refreshPosts }) {
  const [likes, setLikes] = useState(post.likes_count || 0);
  const [liked, setLiked] = useState(false);
  const [comments, setComments] = useState([]);
  const [reply, setReply] = useState("");
  const [replying, setReplying] = useState(false);
  const [showReplies, setShowReplies] = useState(false);

  const currentUser = JSON.parse(localStorage.getItem("user"));

  // Fetch like status and comments on mount
  useEffect(() => {
    fetchLikeStatus();
    fetchComments();
  }, [post.post_id]);

  const fetchLikeStatus = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/posts/${post.post_id}/likes`);
      setLikes(res.data.likes);
      // Check if current user liked (optional – we could use endpoint but simpler to check state)
      // We'll set liked based on an additional call or from a dedicated endpoint; for simplicity, we'll rely on toggle.
      // Better: add a `liked` field to the GET /api/posts response.
    } catch (err) {
      console.error(err);
    }
  };

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
      fetchComments(); // reload comments
    } catch (err) {
      console.error(err);
    } finally {
      setReplying(false);
    }
  };

  const toggleReplies = () => {
    setShowReplies(!showReplies);
    if (!showReplies && comments.length === 0) fetchComments();
  };

  return (
    <div className="post-card">
      <div className="post-header">
        <div className="avatar">
          {post.profile_pic ? (
            <img src={post.profile_pic} alt="Profile" className="avatar-img" />
          ) : (
            post.name?.charAt(0).toUpperCase() || "?"
          )}
        </div>
        <div className="post-author">
          <strong>{post.name}</strong>
          <span className="time">{new Date(post.created_at).toLocaleString()}</span>
        </div>
      </div>

      <p className="content">{post.content}</p>

      <div className="actions">
        <span className="like-btn" onClick={handleLike}>
          ❤️ Like ({likes})
        </span>
        <span className="comments-count" onClick={toggleReplies}>
          💬 {comments.length} {comments.length === 1 ? "reply" : "replies"} {showReplies ? "▲" : "▼"}
        </span>
      </div>

      {/* COMMENTS SECTION – only visible when toggled */}
      {showReplies && (
        <div className="comments">
          {comments.length === 0 ? (
            <p style={{ color: "#6b7280", textAlign: "center" }}>No replies yet.</p>
          ) : (
            comments.map((c) => (
              <div key={c.comment_id} className="comment">
                <div className="comment-author">
                  <div className="avatar-small">
                    {c.profile_pic ? (
                      <img src={c.profile_pic} alt="Profile" className="avatar-img" />
                    ) : (
                      c.name?.charAt(0).toUpperCase() || "?"
                    )}
                  </div>
                  <strong>{c.name}</strong>
                  <span style={{ fontSize: "0.8rem", color: "#9ca3af", marginLeft: "auto" }}>
                    {new Date(c.created_at).toLocaleString()}
                  </span>
                </div>
                <p>{c.content}</p>
              </div>
            ))
          )}

          {/* Reply input inside the toggled section */}
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
    </div>
  );
}
import React, { useState } from "react";

export default function PostForm() {
  const [title, setTitle] = useState("");
  const [token, setToken] = useState("");
  const [responseId, setResponseId] = useState(null);
  const [loading, setLoading] = useState(false);

  const requestToken = async (e) => {
    try {
      const res = await fetch("http://localhost:5007/authenticate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: {},
      });

      if (!res.ok) {
        throw new Error(`Looks like there was a problem authenticating! status: ${res.status}`);
      }

      const data = await res.json();
      setResponseId(data.id);
    } catch (err) {
      console.error("Failed to send POST:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = { title };
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Title:
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={loading}
        />
      </label>
      <button type="submit" disabled={loading}>
        {loading ? "Sending…" : "Send POST"}
      </button>

      {responseId && <p>Created record ID: {responseId}</p>}
    </form>
  );
}

import React, { useState } from 'react';

export default function Home() {
  const [longUrl, setLongUrl] = useState('');
  const [shortCode, setShortCode] = useState('');
  const [shortenedUrl, setShortenedUrl] = useState('');

  const handleShorten = () => {
    if (!longUrl) return;
    const code = shortCode || Math.random().toString(36).substring(2, 8);
    setShortenedUrl(`https://cpt405.co/${code}`);
  };

  return (
    <main className="main-content">
      <h1 className="title">Link Shrinker</h1>
      
      <div className="form-group">
        <label className="label">Long URL:</label>
        <input
          type="url"
          className="input"
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
          placeholder="https://react.dev/learn/reusing-logic-with-custom-hooks"
        />

        <label className="label">Enter short code:</label>
        <input
          type="text"
          className="input"
          value={shortCode}
          onChange={(e) => setShortCode(e.target.value)}
          placeholder="react101"
        />

        <div className="button-container">
          <button className="btn-shorten" onClick={handleShorten}>
            Shorten
          </button>
        </div>

        {shortenedUrl && (
          <div className="result-group">
            <label className="label">Short URL</label>
            <div className="result-box">
              {shortenedUrl}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

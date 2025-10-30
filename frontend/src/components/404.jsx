import React from 'react';
import { Link } from 'react-router-dom';
import './404.css';

const NotFound = () => {
  return (
    <div className="error-page">
      <div className="error-content">
        <div className="error-header">
          <h1 className="error-code">404</h1>
          <img 
            src="/mascot404.png" 
            alt="Nipon Motors Mascot" 
            className="error-mascot"
          />
        </div>
        <h2 className="error-title">ページが見つかりません</h2>
        <p className="error-subtitle">Page Not Found</p>
        <p className="error-message">
          申し訳ございません。お探しのページは存在しないか、移動した可能性があります。
        </p>
        <p className="error-message-en">
          Sorry, the page you are looking for doesn't exist or has been moved.
        </p>
        <div className="error-actions">
          <Link to="/" className="error-button primary">
            ホームに戻る
            <span className="button-en">Go Home</span>
          </Link>
          <Link to="/cars" className="error-button secondary">
            車を見る
            <span className="button-en">Browse Cars</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
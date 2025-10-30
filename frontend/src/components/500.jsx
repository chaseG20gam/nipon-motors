import React from 'react';
import { Link } from 'react-router-dom';
import './404.css'; // reuse the same CSS

const ServerError = () => {
  return (
    <div className="error-page">
      <div className="error-content">
        <div className="error-header">
          <h1 className="error-code">500</h1>
          <img 
            src="/mascot404.png" 
            alt="Nipon Motors Mascot" 
            className="error-mascot"
          />
        </div>
        <h2 className="error-title">サーバーエラー</h2>
        <p className="error-subtitle">Internal Server Error</p>
        <p className="error-message">
          申し訳ございません。サーバーで問題が発生しました。しばらくしてからもう一度お試しください。
        </p>
        <p className="error-message-en">
          Sorry, something went wrong on our end. Please try again later.
        </p>
        <div className="error-actions">
          <Link to="/" className="error-button primary">
            ホームに戻る
            <span className="button-en">Go Home</span>
          </Link>
          <button onClick={() => window.location.reload()} className="error-button secondary">
            再読み込み
            <span className="button-en">Reload Page</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServerError;
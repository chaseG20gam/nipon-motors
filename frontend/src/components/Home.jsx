import React from 'react';
import { Link } from 'react-router-dom';
import ad1 from '../assets/ad1.jpg';
import ad2 from '../assets/ad2.jpg';
import sakuraPetal from '../assets/sakura-petal-11.svg';
import carIcon from '../assets/car-ico.svg';
import yenIcon from '../assets/yen-ico.svg';
import secureIcon from '../assets/sec-ico.svg';
import lensIcon from '../assets/lens-ico.svg';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      {/* floating side panels */}
      <div className="floating-panels-left">
        {/* news Panel */}
        <div className="floating-panel news-panel">
          <div className="panel-header">
            <span className="panel-icon">📰</span>
            <h4>最新情報</h4>
            <small>Latest News</small>
          </div>
          <div className="panel-content">
            <div className="news-item">
              <div className="news-badge">NEW</div>
              <p>春の特別セール開始!</p>
              <small>Spring Special Sale Started!</small>
            </div>
            <div className="news-item">
              <div className="news-badge">HOT</div>
              <p>東京モーターショー参加</p>
              <small>Tokyo Motor Show Participation</small>
            </div>
          </div>
        </div>

        {/* live stats panel */}
        <div className="floating-panel stats-panel no-header">
          <div className="panel-content">
            {/* background image */}
            <img src={ad1} alt="ad" className="stats-bg-image" />
          </div>
        </div>
      </div>

      <div className="floating-panels-right">
        {/* quick search panel */}
        <div className="floating-panel search-panel">
          <div className="panel-header">
            <h4>クイック検索</h4>
            <small>Quick Search</small>
          </div>
          <div className="panel-content">
            <div className="quick-search-options">
              <Link to="/cars?fuel_type=ELECTRIC" className="quick-option electric">
                電気自動車
              </Link>
              <Link to="/cars?fuel_type=HYBRID" className="quick-option hybrid">
                ハイブリッド
              </Link>
            </div>
          </div>
        </div>

        {/* promotional banner */}
        <div className="floating-panel promo-panel">
          <div className="panel-content">
            <img src={ad2} alt='blossomAd' className='promo-bg-image' />
            <div className="promo-banner">
              <div className="promo-text">
                <h4>特別キャンペーン</h4>
                <small>Special Campaign</small>
                <h5>桜祭りセール</h5>
                <p>最大30%オフ!</p>
                <small>Up to 30% OFF during Sakura Festival!</small>
              </div>
              <div className="promo-cta">
                <Link to="/cars" className="promo-button">
                  今すぐ見る
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* social panel */}
        <div className="floating-panel community-panel">
          <div className="panel-header">
            <span className="panel-icon">👥</span>
            <h4>コミュニティ</h4>
            <small>Community</small>
          </div>
          <div className="panel-content">
            <div className="community-item">
              <span className="user-avatar">👨‍💼</span>
              <div className="user-activity">
                <p><strong>田中さん</strong>がトヨタを購入</p>
                <small>2分前</small>
              </div>
            </div>
            <div className="community-item">
              <span className="user-avatar">👩‍💻</span>
              <div className="user-activity">
                <p><strong>佐藤さん</strong>がレビュー投稿</p>
                <small>5分前</small>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* hero section */}
      <section className="hero-section">
        <div className="japanese-pattern-overlay"></div>
        <div className="hero-overlay">
          <div className="hero-content">
            <div className="japanese-accent">日本の品質</div>
            <h1 className="hero-title">
              Welcome to <span className="brand-name">ニポンモータース</span>
            </h1>
            <img src='/nm-logo.png' alt='Nipon Motors Logo' className='hero-logo' />
            <div className="hero-subtitle-container">
              <p className="hero-subtitle"> Experience Japan's Legacy of Automotive Perfection.</p>
              <p className="hero-subtitle-japanese"> 最高品質の日本車をお届けします</p>
              <p className="hero-subtitle-japanese"> Driven by Tradition. Perfected by Passion.</p>
            </div>
            <div className="hero-stats">
              <div className="stat-item">
                <div className="stat-number-container">
                  <span className="stat-number">1000+</span>
                  <img src="/mascotsale.png" alt="Mascot" className="stat-mascot" />
                </div>
                <span className="stat-label">Premium Cars</span>
                <span className="stat-label-japanese">プレミアム車</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">47</span>
                <span className="stat-label">Prefectures</span>
                <span className="stat-label-japanese">都道府県</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">24/7</span>
                <span className="stat-label">Support</span>
                <span className="stat-label-japanese">サポート</span>
              </div>
            </div>
            <div className="hero-actions">
              <Link to="/cars" className="cta-button primary">
                車を見る
                <span className="cta-english">Browse Cars</span>
              </Link>
              <Link to="/login" className="cta-button secondary">
                始める
                <span className="cta-english">Get Started</span>
              </Link>
            </div>
          </div>
        </div>
        <div className="hero-background"></div>
        <div className="cherry-blossoms">
          <img src={sakuraPetal} alt="sakura" className="sakura sakura-1" />
          <img src={sakuraPetal} alt="sakura" className="sakura sakura-2" />
          <img src={sakuraPetal} alt="sakura" className="sakura sakura-3" />
          <img src={sakuraPetal} alt="sakura" className="sakura sakura-4" />
          <img src={sakuraPetal} alt="sakura" className="sakura sakura-5" />
          <img src={sakuraPetal} alt="sakura" className="sakura sakura-6" />
          <img src={sakuraPetal} alt="sakura" className="sakura sakura-7" />
          <img src={sakuraPetal} alt="sakura" className="sakura sakura-8" />
        </div>
      </section>

      {/* features section */}
      <section className="features-section">
        <div className="container">
          <h2 className="section-title">Why Choose Nipon Motors?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <img src={carIcon} alt="Premium Selection" className="feature-icon-svg" />
              </div>
              <h3>Premium Selection</h3>
              <p>Handpicked vehicles from trusted dealers across Japan, ensuring quality and reliability.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <img src={lensIcon} alt="Smart Search" className="feature-icon-svg" />
              </div>
              <h3>Smart Search</h3>
              <p>Advanced filtering and search capabilities to find your perfect match quickly and easily.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <img src={yenIcon} alt="Best Prices" className="feature-icon-svg" />
              </div>
              <h3>Best Prices</h3>
              <p>Competitive pricing with transparent costs and no hidden fees. Get the best value for your money.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <img src={secureIcon} alt="Trusted Platform" className="feature-icon-svg" />
              </div>
              <h3>Trusted Platform</h3>
              <p>Secure transactions and verified dealers. Your peace of mind is our top priority.</p>
            </div>
          </div>
        </div>
      </section>

      {/* popular categories */}
      <section className="categories-section">
        <div className="container">
          <h2 className="section-title">Popular Categories</h2>
          <div className="categories-grid">
            <div className="category-card tokyo">
              <div className="category-overlay">
                <h3>Tokyo Cars</h3>
                <p>Premium Selection</p>
                <Link to="/cars?prefecture=Tokyo" className="category-link">
                  Explore →
                </Link>
              </div>
            </div>
            <div className="category-card budget">
              <div className="category-overlay">
                <h3>Under ¥20,000</h3>
                <p>Budget Friendly</p>
                <Link to="/cars?max_price=20000" className="category-link">
                  Explore →
                </Link>
              </div>
            </div>
            <div className="category-card electric">
              <div className="category-overlay">
                <h3>Electric</h3>
                <p>Future Forward</p>
                <Link to="/cars?fuel_type=ELECTRIC" className="category-link">
                  Explore →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Find Your Dream Car?</h2>
            <p>Join thousands of satisfied customers who found their perfect vehicle with Nipon Motors</p>
            <Link to="/cars" className="cta-button large">
              Start Your Search
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
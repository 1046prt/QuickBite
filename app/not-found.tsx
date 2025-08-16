"use client";

import { Home, ArrowLeft, Search } from "lucide-react";
import Link from "next/link";
import "../styles/NotFound.css";

export default function NotFound() {
  return (
    <div className="notfound-page">
      <div className="notfound-container">
        {/* Animated Food Icons */}
        <div className="notfound-icons">
          <div className="icon-main">🍔</div>
          <div className="icon-sub icon-fries">🍟</div>
          <div className="icon-sub icon-drink">🥤</div>
          <div className="icon-sub icon-pizza">🍕</div>
        </div>

        {/* Error Message */}
        <div className="card error-card">
          <div className="error-content">
            <h1 className="error-code">404</h1>
            <h2 className="error-title">Oops! This Page is Off the Menu</h2>
            <p className="error-description">
              Looks like you're trying to order something that doesn't exist!
              Don't worry, we have plenty of delicious options waiting for you
              on our main menu.
            </p>

            {/* Fun Food Pun */}
            <div className="error-pun">
              <p>
                "We searched everywhere, but this page seems to have been eaten
                by our hungry customers!" 🍽️
              </p>
            </div>

            {/* Action Buttons */}
            <div className="error-actions">
              <Link href="/">
                <button className="btn btn-lg btn-back-menu">
                  <Home className="btn-icon" />
                  Back to Menu
                </button>
              </Link>

              <button
                onClick={() => window.history.back()}
                className="btn btn-outline btn-lg btn-go-back"
              >
                <ArrowLeft className="btn-icon" />
                Go Back
              </button>
            </div>
          </div>
        </div>

        {/* Popular Items Suggestion */}
        <div className="popular-suggestion">
          <div className="popular-header">
            <Search className="popular-icon" />
            <h3>While You're Here...</h3>
          </div>
          <p className="popular-text">
            Why not check out our most popular items? Our customers can't get
            enough of them!
          </p>
          <Link href="/#menu">
            <button className="btn btn-secondary btn-sm btn-view-popular">
              View Popular Items
            </button>
          </Link>
        </div>

        {/* Footer */}
        <div className="notfound-footer">
          <div className="footer-brand">
            <div className="footer-icon">🍔</div>
            <span className="footer-text">QuickBite</span>
          </div>
          <p className="footer-note">
            Delicious food, delivered fast. Even when you're lost!
          </p>
        </div>
      </div>
    </div>
  );
}

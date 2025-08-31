"use client";

import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Home, Search, Phone, Mail, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="not-found-page">
      <Header />

      <div className="not-found-container">
        <div className="not-found-content">
          <div className="not-found-animation">
            <div className="burger-stack">
              <div className="bun-top">🍞</div>
              <div className="lettuce">🥬</div>
              <div className="tomato">🍅</div>
              <div className="patty">🥩</div>
              <div className="cheese">🧀</div>
              <div className="bun-bottom">🍞</div>
            </div>
          </div>

          <div className="not-found-text">
            <h1 className="error-code">404</h1>
            <h2 className="error-title">Oops! This page is off the menu</h2>
            <p className="error-description">
              Looks like this page got eaten! Don't worry, we have plenty of
              other delicious options waiting for you.
            </p>

            <div className="not-found-actions">
              <Link href="/" className="btn btn-primary">
                <Home className="btn-icon" />
                Back to Menu
              </Link>
              <button
                onClick={() => window.history.back()}
                className="btn btn-outline"
              >
                <ArrowLeft className="btn-icon" />
                Go Back
              </button>
            </div>
          </div>
        </div>

        <div className="not-found-suggestions">
          <h3>While you're here, try these popular items:</h3>
          <div className="suggestion-cards">
            <Link href="/#burgers" className="suggestion-card">
              <div className="suggestion-emoji">🍔</div>
              <h4>Classic Burger</h4>
              <p>Our signature beef burger with fresh ingredients</p>
              <span className="suggestion-price">$12.99</span>
            </Link>
            <Link href="/#pizzas" className="suggestion-card">
              <div className="suggestion-emoji">🍕</div>
              <h4>Margherita Pizza</h4>
              <p>Fresh basil, mozzarella, and tomato sauce</p>
              <span className="suggestion-price">$14.99</span>
            </Link>
            <Link href="/#sides" className="suggestion-card">
              <div className="suggestion-emoji">🍟</div>
              <h4>Golden Fries</h4>
              <p>Crispy and perfectly salted golden fries</p>
              <span className="suggestion-price">$4.99</span>
            </Link>
          </div>
        </div>

        <div className="not-found-help">
          <h3>Need Help?</h3>
          <div className="help-options">
            <div className="help-item">
              <Search className="help-icon" />
              <div>
                <h4>Search Our Menu</h4>
                <p>Use the search bar to find your favorite dishes</p>
              </div>
            </div>
            <div className="help-item">
              <Phone className="help-icon" />
              <div>
                <h4>Call Us</h4>
                <p>+1 (555) 123-4567</p>
              </div>
            </div>
            <div className="help-item">
              <Mail className="help-icon" />
              <div>
                <h4>Email Support</h4>
                <p>support@quickbite.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

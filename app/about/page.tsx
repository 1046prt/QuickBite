"use client";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Clock, Users, Award, Heart, Truck, Shield } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="about-page">
      <Header />

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>About QuickBite</h1>
          <p>Bringing delicious food to your doorstep since 2020</p>
        </div>
      </section>

      {/* About Content */}
      <section className="about-section">
        <div className="container">
          <div className="about-content">
            <div className="about-text">
              <h2>Our Story</h2>
              <p>
                QuickBite was born from a simple idea: everyone deserves access
                to delicious, high-quality food without the hassle. Founded in
                2020, we've grown from a small local delivery service to a
                comprehensive food platform serving thousands of happy
                customers.
              </p>
              <p>
                Our mission is to connect food lovers with their favorite
                flavors while supporting local restaurants and creating
                opportunities for our delivery partners. We believe that great
                food brings people together, and we're proud to be part of that
                connection.
              </p>

              <div className="about-features">
                <div className="feature-item">
                  <Clock className="feature-icon" />
                  <span>Fast Delivery</span>
                </div>
                <div className="feature-item">
                  <Users className="feature-icon" />
                  <span>10,000+ Customers</span>
                </div>
                <div className="feature-item">
                  <Award className="feature-icon" />
                  <span>Award Winning</span>
                </div>
                <div className="feature-item">
                  <Heart className="feature-icon" />
                  <span>Made with Love</span>
                </div>
              </div>
            </div>

            <div className="about-image">
              <img
                src="/about-hero.jpg"
                alt="QuickBite team preparing food"
                onError={(e) => {
                  e.currentTarget.src =
                    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400'%3E%3Crect width='400' height='400' fill='%23f3f4f6'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial, sans-serif' font-size='18' fill='%236b7280'%3EAbout QuickBite%3C/text%3E%3C/svg%3E";
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="values-section">
        <div className="container">
          <div className="section-header">
            <h2>Our Values</h2>
            <p>What drives us every day</p>
          </div>

          <div className="values-grid">
            <div className="value-card">
              <div className="value-icon">
                <Truck />
              </div>
              <h3>Fast & Reliable</h3>
              <p>
                We guarantee quick delivery times without compromising on food
                quality or safety.
              </p>
            </div>

            <div className="value-card">
              <div className="value-icon">
                <Shield />
              </div>
              <h3>Safe & Secure</h3>
              <p>
                Your safety is our priority. We follow strict hygiene protocols
                and secure payment methods.
              </p>
            </div>

            <div className="value-card">
              <div className="value-icon">
                <Heart />
              </div>
              <h3>Customer First</h3>
              <p>
                Every decision we make is centered around providing the best
                experience for our customers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section">
        <div className="container">
          <div className="section-header">
            <h2>Meet Our Team</h2>
            <p>The people behind QuickBite</p>
          </div>

          <div className="team-grid">
            <div className="team-member">
              <div className="member-image">
                <img
                  src="/team/ceo.jpg"
                  alt="Prakash Raj | Developer"
                  onError={(e) => {
                    e.currentTarget.src =
                      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'%3E%3Ccircle cx='100' cy='100' r='100' fill='%23e5e7eb'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial, sans-serif' font-size='16' fill='%236b7280'%3ECEO%3C/text%3E%3C/svg%3E";
                  }}
                />
              </div>
              <h4>Prakash Raj</h4>
              <p className="member-role">Developer</p>
              <p className="member-bio">
                Passionate about building scalable web applications.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

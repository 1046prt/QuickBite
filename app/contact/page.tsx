"use client";

import { useState } from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Contact form submitted:", formData);
    // Reset form
    setFormData({ name: "", email: "", subject: "", message: "" });
    alert("Thank you for your message! We'll get back to you soon.");
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="contact-page">
      <Header />

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Contact Us</h1>
          <p>We'd love to hear from you. Get in touch with our team!</p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="contact-section">
        <div className="container">
          <div className="contact-content">
            {/* Contact Information */}
            <div className="contact-info-section">
              <h2>Get in Touch</h2>
              <p>
                Have a question, suggestion, or just want to say hello? We're
                here to help and would love to hear from you.
              </p>

              <div className="contact-methods">
                <div className="contact-method">
                  <div className="method-icon">
                    <MapPin />
                  </div>
                  <div className="method-details">
                    <h4>Visit Us</h4>
                    <p>
                      123 Food Street
                      <br />
                      Flavor City, FC 12345
                    </p>
                  </div>
                </div>

                <div className="contact-method">
                  <div className="method-icon">
                    <Phone />
                  </div>
                  <div className="method-details">
                    <h4>Call Us</h4>
                    <p>
                      +91-9508015377
                      <br />
                      Mon-Sun: 9:00 AM - 11:00 PM
                    </p>
                  </div>
                </div>

                <div className="contact-method">
                  <div className="method-icon">
                    <Mail />
                  </div>
                  <div className="method-details">
                    <h4>Email Us</h4>
                    <p>
                      1046prt@gmail.com
                      <br />
                      prakashraj.info
                    </p>
                  </div>
                </div>

                <div className="contact-method">
                  <div className="method-icon">
                    <Clock />
                  </div>
                  <div className="method-details">
                    <h4>Business Hours</h4>
                    <p>
                      Monday - Sunday
                      <br />
                      9:00 AM - 11:00 PM
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="contact-form-section">
              <form onSubmit={handleSubmit} className="contact-form">
                <h3>Send us a Message</h3>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">Full Name *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="form-input"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">Email Address *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="form-input"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="subject">Subject *</label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="form-input"
                  >
                    <option value="">Select a subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="order">Order Issue</option>
                    <option value="feedback">Feedback</option>
                    <option value="partnership">Partnership</option>
                    <option value="complaint">Complaint</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="message">Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    className="form-textarea"
                    rows={6}
                    placeholder="Tell us how we can help you..."
                  />
                </div>

                <button type="submit" className="btn btn-primary submit-btn">
                  <Send className="btn-icon" />
                  Send Message
                </button>
              </form>
            </div>
          </div>

          {/* FAQ Quick Links */}
          <div className="contact-faq">
            <h3>Frequently Asked Questions</h3>
            <p>Looking for quick answers? Check out our FAQ section.</p>
            <div className="faq-links">
              <a href="/faq#delivery" className="faq-link">
                Delivery Information
              </a>
              <a href="/faq#payment" className="faq-link">
                Payment Methods
              </a>
              <a href="/faq#food" className="faq-link">
                Food & Menu
              </a>
              <a href="/faq#account" className="faq-link">
                Account Help
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

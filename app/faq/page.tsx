"use client";

import { useState } from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ChevronDown, ChevronUp } from "lucide-react";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

const faqData: FAQItem[] = [
  {
    id: "1",
    question: "How long does delivery take?",
    answer:
      "Our standard delivery time is 30-45 minutes. During peak hours, it might take up to 60 minutes. We'll always keep you updated with real-time tracking.",
    category: "delivery",
  },
  {
    id: "2",
    question: "What are your delivery charges?",
    answer:
      "Delivery charges vary based on distance and order value. Orders above $25 qualify for free delivery within 5km. Standard delivery fee is $2.99.",
    category: "delivery",
  },
  {
    id: "3",
    question: "Can I track my order?",
    answer:
      "Yes! Once your order is confirmed, you'll receive a tracking link via SMS and email. You can monitor your order status in real-time.",
    category: "delivery",
  },
  {
    id: "4",
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit cards, debit cards, PayPal, Apple Pay, Google Pay, and cash on delivery in select areas.",
    category: "payment",
  },
  {
    id: "5",
    question: "Is my payment information secure?",
    answer:
      "Absolutely! We use industry-standard SSL encryption and comply with PCI DSS standards to ensure your payment information is completely secure.",
    category: "payment",
  },
  {
    id: "6",
    question: "Can I get a refund if I'm not satisfied?",
    answer:
      "Yes, we offer a 100% satisfaction guarantee. If you're not happy with your order, contact us within 24 hours and we'll provide a full refund or replacement.",
    category: "payment",
  },
  {
    id: "7",
    question: "Do you have vegetarian/vegan options?",
    answer:
      "Yes! We have a wide variety of vegetarian and vegan options clearly marked on our menu. Use our filters to easily find plant-based meals.",
    category: "food",
  },
  {
    id: "8",
    question: "Can I customize my order?",
    answer:
      "Many of our items offer customization options like size, spice level, and add-ons. Look for the 'Customize' option when adding items to your cart.",
    category: "food",
  },
  {
    id: "9",
    question: "Do you cater to food allergies?",
    answer:
      "We take food allergies seriously. Each menu item lists common allergens, and you can add special instructions to your order. Please contact us for severe allergies.",
    category: "food",
  },
  {
    id: "10",
    question: "How do I create an account?",
    answer:
      "Click the 'Sign Up' button in the top right corner, enter your details, and verify your email. You can also sign up using your Google or Facebook account.",
    category: "account",
  },
  {
    id: "11",
    question: "Can I save my favorite orders?",
    answer:
      "Yes! Once you create an account, you can save your favorite items and reorder them with just one click. Your order history is also saved for easy reordering.",
    category: "account",
  },
  {
    id: "12",
    question: "How do I change my delivery address?",
    answer:
      "You can update your delivery address in your account settings or during checkout. We deliver to most areas within 15km of our partner restaurants.",
    category: "account",
  },
];

const categories = [
  { id: "all", name: "All Questions" },
  { id: "delivery", name: "Delivery" },
  { id: "payment", name: "Payment" },
  { id: "food", name: "Food & Menu" },
  { id: "account", name: "Account" },
];

export default function FAQPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [openItems, setOpenItems] = useState<string[]>([]);

  const filteredFAQs =
    selectedCategory === "all"
      ? faqData
      : faqData.filter((faq) => faq.category === selectedCategory);

  const toggleItem = (id: string) => {
    setOpenItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="faq-page">
      <Header />

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Frequently Asked Questions</h1>
          <p>Find answers to common questions about QuickBite</p>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="faq-section">
        <div className="container">
          {/* Category Filter */}
          <div className="faq-categories">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`category-btn ${
                  selectedCategory === category.id ? "active" : ""
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* FAQ Items */}
          <div className="faq-list">
            {filteredFAQs.map((faq) => (
              <div key={faq.id} className="faq-item">
                <button
                  className="faq-question"
                  onClick={() => toggleItem(faq.id)}
                >
                  <span>{faq.question}</span>
                  {openItems.includes(faq.id) ? (
                    <ChevronUp className="faq-icon" />
                  ) : (
                    <ChevronDown className="faq-icon" />
                  )}
                </button>
                {openItems.includes(faq.id) && (
                  <div className="faq-answer">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Contact Section */}
          <div className="faq-contact">
            <h3>Still have questions?</h3>
            <p>
              Can't find what you're looking for? Our support team is here to
              help!
            </p>
            <div className="contact-buttons">
              <a
                href="mailto:support@quickbite.com"
                className="btn btn-primary"
              >
                Email Support
              </a>
              <a href="tel:+1555123456" className="btn btn-outline">
                Call Us
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

"use client";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Calendar, Plus, Bug, Zap, Star } from "lucide-react";

interface ChangelogEntry {
  version: string;
  date: string;
  type: "major" | "minor" | "patch";
  changes: {
    type: "feature" | "improvement" | "bugfix" | "breaking";
    description: string;
  }[];
}

const changelogData: ChangelogEntry[] = [
  {
    version: "2.1.0",
    date: "2025-01-15",
    type: "minor",
    changes: [
      {
        type: "feature",
        description: "Added real-time order tracking with GPS location",
      },
      {
        type: "feature",
        description: "Introduced loyalty points system for frequent customers",
      },
      {
        type: "improvement",
        description: "Enhanced search functionality with filters and sorting",
      },
      {
        type: "improvement",
        description: "Improved mobile app performance by 40%",
      },
      {
        type: "bugfix",
        description:
          "Fixed issue with payment processing for international cards",
      },
    ],
  },
  {
    version: "2.0.0",
    date: "2024-12-01",
    type: "major",
    changes: [
      {
        type: "breaking",
        description: "Complete UI redesign with modern, responsive interface",
      },
      {
        type: "feature",
        description:
          "Added support for multiple cuisines and dietary preferences",
      },
      {
        type: "feature",
        description: "Introduced group ordering for office and party orders",
      },
      {
        type: "feature",
        description: "Added scheduled delivery option",
      },
      {
        type: "improvement",
        description: "Faster checkout process with saved payment methods",
      },
    ],
  },
  {
    version: "1.8.2",
    date: "2024-11-15",
    type: "patch",
    changes: [
      {
        type: "bugfix",
        description: "Fixed cart items disappearing on page refresh",
      },
      {
        type: "bugfix",
        description: "Resolved delivery time calculation errors",
      },
      {
        type: "improvement",
        description: "Updated restaurant partner onboarding process",
      },
    ],
  },
  {
    version: "1.8.1",
    date: "2024-10-30",
    type: "patch",
    changes: [
      {
        type: "bugfix",
        description: "Fixed notification system not working on iOS devices",
      },
      {
        type: "improvement",
        description: "Enhanced security measures for user data protection",
      },
    ],
  },
  {
    version: "1.8.0",
    date: "2024-10-01",
    type: "minor",
    changes: [
      {
        type: "feature",
        description: "Added customer reviews and ratings system",
      },
      {
        type: "feature",
        description: "Introduced promotional codes and discount system",
      },
      {
        type: "improvement",
        description: "Optimized delivery route algorithms for faster delivery",
      },
      {
        type: "improvement",
        description: "Added dark mode support",
      },
    ],
  },
  {
    version: "1.7.0",
    date: "2024-09-15",
    type: "minor",
    changes: [
      {
        type: "feature",
        description: "Added support for contactless delivery",
      },
      {
        type: "feature",
        description: "Introduced meal customization options",
      },
      {
        type: "improvement",
        description: "Enhanced order history with detailed receipts",
      },
    ],
  },
];

const getChangeIcon = (type: string) => {
  switch (type) {
    case "feature":
      return <Plus className="change-icon feature" />;
    case "improvement":
      return <Zap className="change-icon improvement" />;
    case "bugfix":
      return <Bug className="change-icon bugfix" />;
    case "breaking":
      return <Star className="change-icon breaking" />;
    default:
      return <Plus className="change-icon" />;
  }
};

const getVersionBadge = (type: string) => {
  switch (type) {
    case "major":
      return <span className="version-badge major">Major</span>;
    case "minor":
      return <span className="version-badge minor">Minor</span>;
    case "patch":
      return <span className="version-badge patch">Patch</span>;
    default:
      return null;
  }
};

export default function ChangelogPage() {
  return (
    <div className="changelog-page">
      <Header />

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Changelog</h1>
          <p>Stay updated with the latest features and improvements</p>
        </div>
      </section>

      {/* Changelog Content */}
      <section className="changelog-section">
        <div className="container">
          <div className="changelog-timeline">
            {changelogData.map((entry, index) => (
              <div key={entry.version} className="changelog-entry">
                <div className="entry-header">
                  <div className="version-info">
                    <h3>Version {entry.version}</h3>
                    {getVersionBadge(entry.type)}
                  </div>
                  <div className="entry-date">
                    <Calendar className="date-icon" />
                    <span>
                      {new Date(entry.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                </div>

                <div className="entry-changes">
                  {entry.changes.map((change, changeIndex) => (
                    <div key={changeIndex} className="change-item">
                      {getChangeIcon(change.type)}
                      <span className="change-description">
                        {change.description}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Subscribe Section */}
          <div className="changelog-subscribe">
            <h3>Stay Updated</h3>
            <p>Get notified about new features and updates</p>
            <form className="subscribe-form">
              <input
                type="email"
                placeholder="Enter your email"
                className="subscribe-input"
              />
              <button type="submit" className="btn btn-primary">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

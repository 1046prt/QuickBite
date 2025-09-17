"use client";

import { useState } from "react";
import { X, Mail, Lock, User, Eye, EyeOff } from "lucide-react";
import { useUserStore } from "@/lib/user-store";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: "login" | "signup";
}

interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

export function AuthModal({
  isOpen,
  onClose,
  initialMode = "login",
}: AuthModalProps) {
  const { login, signup } = useUserStore();
  const [mode, setMode] = useState<"login" | "signup">(initialMode);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    // Validation
    if (mode === "signup") {
      if (formData.password !== formData.confirmPassword) {
        setError("Passwords do not match");
        setLoading(false);
        return;
      }
      
      if (formData.password.length < 6) {
        setError("Password must be at least 6 characters");
        setLoading(false);
        return;
      }
    }

    try {
      const response = await fetch("/api/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: mode,
          email: formData.email,
          password: formData.password,
          name: formData.name,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Authentication failed");
      }

      if (data.success) {
        setSuccess(data.message);
        
        // Update user store
        if (mode === "login" && data.user) {
          login(data.user);
        } else if (mode === "signup" && data.user) {
          signup(data.user);
        }
        
        // Reset form
        setFormData({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
        // Close modal after a short delay
        setTimeout(() => {
          onClose();
        }, 1500);
      } else {
        setError(data.message);
      }
    } catch (err: any) {
      console.error("Auth error:", err);
      setError(err.message || "An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    // Clear error when user starts typing
    if (error) setError("");
  };

  return (
    <div className="auth-modal-overlay" onClick={onClose}>
      <div className="auth-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="auth-modal-close" onClick={onClose}>
          <X />
        </button>

        <div className="auth-modal-header">
          <div className="auth-brand">
            <img
              src="/logo/QuickBite.png"
              alt="QuickBite"
              className="auth-logo"
            />
            <h2>QuickBite</h2>
          </div>
          <h3>{mode === "login" ? "Welcome Back!" : "Join QuickBite"}</h3>
          <p>
            {mode === "login"
              ? "Sign in to your account to continue ordering"
              : "Create an account to start your food journey"}
          </p>
        </div>

        {error && (
          <div className="auth-error">
            {error}
          </div>
        )}

        {success && (
          <div className="auth-success">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form">
          {mode === "signup" && (
            <div className="form-group">
              <label htmlFor="name" className="form-label">
                <User className="form-icon" />
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="form-input"
                placeholder="Enter your full name"
                required
              />
            </div>
          )}

          <div className="form-group">
            <label htmlFor="email" className="form-label">
              <Mail className="form-icon" />
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="form-input"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">
              <Lock className="form-icon" />
              Password
            </label>
            <div className="password-input-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="form-input"
                placeholder="Enter your password"
                required
                minLength={6}
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </button>
            </div>
          </div>

          {mode === "signup" && (
            <div className="form-group">
              <label htmlFor="confirmPassword" className="form-label">
                <Lock className="form-icon" />
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className="form-input"
                placeholder="Confirm your password"
                required
              />
            </div>
          )}

          <button 
            type="submit" 
            className="btn btn-primary auth-submit"
            disabled={loading}
          >
            {loading ? (
              <span className="loading-spinner"></span>
            ) : mode === "login" ? "Sign In" : "Create Account"}
          </button>
        </form>

        <div className="auth-divider">
          <span>or</span>
        </div>

        <div className="social-auth">
          <button className="btn btn-outline social-btn">
            <img src="/icons/google.svg" alt="Google" className="social-icon" />
            Continue with Google
          </button>
          <button className="btn btn-outline social-btn">
            <img
              src="/icons/facebook.svg"
              alt="Facebook"
              className="social-icon"
            />
            Continue with Facebook
          </button>
        </div>

        <div className="auth-switch">
          <p>
            {mode === "login"
              ? "Don't have an account?"
              : "Already have an account?"}
            <button
              type="button"
              className="auth-switch-btn"
              onClick={() => {
                setMode(mode === "login" ? "signup" : "login");
                setError("");
                setSuccess("");
              }}
            >
              {mode === "login" ? "Sign Up" : "Sign In"}
            </button>
          </p>
        </div>

        {mode === "login" && (
          <div className="auth-forgot">
            <a href="#" className="forgot-link">
              Forgot your password?
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
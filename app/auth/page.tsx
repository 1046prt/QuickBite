"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/lib/user-store";
import { AuthModal } from "@/components/auth/auth-modal";

export default function AuthPage() {
  const router = useRouter();
  const { isAuthenticated } = useUserStore();
  const [showModal, setShowModal] = useState(true);

  // Redirect to home if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, router]);

  const handleClose = () => {
    setShowModal(false);
    router.push("/");
  };

  if (isAuthenticated) {
    return null; // Don't render anything if already authenticated
  }

  return (
    <div className="auth-page">
      <div className="auth-page-container">
        <AuthModal 
          isOpen={showModal} 
          onClose={handleClose} 
          initialMode="login"
        />
      </div>
    </div>
  );
}
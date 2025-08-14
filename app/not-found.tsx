"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Home, ArrowLeft, Search } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        {/* Animated Food Icons */}
        <div className="mb-8 relative">
          <div className="text-8xl mb-4 animate-bounce">🍔</div>
          <div className="absolute -top-4 -left-8 text-4xl animate-pulse opacity-70">
            🍟
          </div>
          <div className="absolute -top-2 -right-6 text-3xl animate-pulse opacity-60">
            🥤
          </div>
          <div className="absolute -bottom-2 left-4 text-2xl animate-pulse opacity-50">
            🍕
          </div>
        </div>

        {/* Error Message */}
        <Card className="bg-white shadow-lg border-0 mb-8">
          <CardContent className="p-8">
            <h1 className="font-serif font-black text-6xl text-cyan-600 mb-4">
              404
            </h1>
            <h2 className="font-serif font-bold text-2xl text-gray-900 mb-4">
              Oops! This Page is Off the Menu
            </h2>
            <p className="font-sans text-gray-600 text-lg mb-6 leading-relaxed">
              Looks like you're trying to order something that doesn't exist!
              Don't worry, we have plenty of delicious options waiting for you
              on our main menu.
            </p>

            {/* Fun Food Pun */}
            <div className="bg-gradient-to-r from-cyan-50 to-indigo-50 rounded-lg p-4 mb-6">
              <p className="font-sans text-sm text-gray-700 italic">
                "We searched everywhere, but this page seems to have been eaten
                by our hungry customers!" 🍽️
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/">
                <Button
                  size="lg"
                  className="bg-cyan-600 hover:bg-cyan-700 text-white font-sans font-semibold px-6 py-3 w-full sm:w-auto"
                >
                  <Home className="h-4 w-4 mr-2" />
                  Back to Menu
                </Button>
              </Link>

              <Button
                variant="outline"
                size="lg"
                onClick={() => window.history.back()}
                className="font-sans font-medium px-6 py-3 hover:bg-gray-50 w-full sm:w-auto"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Go Back
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Popular Items Suggestion */}
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg p-6 text-white">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Search className="h-5 w-5" />
            <h3 className="font-serif font-bold text-lg">
              While You're Here...
            </h3>
          </div>
          <p className="font-sans text-sm opacity-90 mb-4">
            Why not check out our most popular items? Our customers can't get
            enough of them!
          </p>
          <Link href="/#menu">
            <Button
              variant="secondary"
              size="sm"
              className="bg-white text-indigo-600 hover:bg-gray-100 font-sans font-medium"
            >
              View Popular Items
            </Button>
          </Link>
        </div>

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="text-xl">🍔</div>
            <span className="font-serif font-bold text-lg text-gray-900">
              QuickBite
            </span>
          </div>
          <p className="font-sans text-xs text-gray-500">
            Delicious food, delivered fast. Even when you're lost!
          </p>
        </div>
      </div>
    </div>
  );
}

"use client"

import { useEffect } from "react";
import Image from "next/image";
import { LoanForm } from "@/components/loan-form";
import { ToastNotificationSystem } from "@/components/toast-notification-system";
import { DottedSurface } from "@/components/ui/dotted-surface";
import { ThemeToggle } from "@/components/theme-toggle";
import { clearSessionData } from "@/lib/session-storage";

export default function Home() {
  // Clear session storage when returning to homepage
  useEffect(() => {
    clearSessionData();
  }, []);

  return (
    <div className="relative min-h-screen bg-white dark:bg-gray-950">
      <DottedSurface className="opacity-20" />
      <ToastNotificationSystem />

      {/* Logo Header */}
      <header className="relative sticky top-0 z-50 bg-white/80 dark:bg-gray-950/80 border-b border-gray-100 dark:border-gray-800 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Easy <span className="text-green-600 dark:text-green-500">Loans</span>
            </h1>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main Content - Image and Form Side by Side */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-2 gap-8 items-center">

          {/* Left - Image with Text Overlay */}
          <div className="relative h-[600px] rounded-2xl overflow-hidden bg-gradient-to-br from-green-50 to-emerald-100 dark:from-gray-800 dark:to-gray-900">
            <Image
              src="/hero-illustration.png"
              alt="Loan illustration"
              fill
              className="object-cover dark:opacity-60"
              priority
            />
            {/* Text Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent dark:from-black/80 dark:via-black/40">
              <div className="absolute bottom-12 left-0 right-0 p-8 text-white">
                <h2 className="text-4xl font-bold">
                  Get Quick Loans
                  <span className="block text-green-400 dark:text-green-500">When You Need Them</span>
                </h2>
              </div>
            </div>
          </div>

          {/* Right - Modern Form */}
          <div className="flex flex-col justify-center items-center">
            <div className="w-full max-w-md">
              <div className="mb-6">
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Apply Now</h3>
                <p className="text-gray-600 dark:text-gray-400">Fill in your details to check eligibility</p>
              </div>
              <LoanForm />
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}

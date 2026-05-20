"use client";

import { SignUp } from "@clerk/nextjs";
import Link from "next/link";
import { Sparkles } from "lucide-react";

export default function SignupPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="absolute inset-0 mesh-gradient opacity-30" />
      <div className="relative z-10 w-full max-w-md px-6">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 justify-center mb-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Sparkles className="w-7 h-7 text-white" />
            </div>
          </Link>
          <h1 className="text-3xl font-bold mb-2">Create Account</h1>
          <p className="text-text-secondary">Start accessing premium AI workflows</p>
        </div>
        <div className="glass-card p-8">
          <SignUp />
        </div>
        <p className="text-center text-text-secondary text-sm mt-6">
          Already have an account? <Link href="/login" className="text-primary hover:underline">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
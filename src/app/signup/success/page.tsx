"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckCircle, Gift, ArrowRight } from "lucide-react";
import { Navbar, Footer } from "@/components/ui/Navbar";

function SignupSuccessContent() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  return (
    <div className="glass-card p-10 max-w-lg text-center">
      <CheckCircle className="w-14 h-14 text-green-400 mx-auto mb-5" />
      <h1 className="text-3xl font-bold mb-3">Account Created</h1>
      <p className="text-text-secondary mb-6">
        {email ? `Your account for ${email} is ready.` : "Your account is ready."}
      </p>

      <div className="p-4 rounded-xl bg-primary/5 border border-primary/20 text-left mb-8">
        <div className="flex gap-3">
          <Gift className="w-6 h-6 text-primary flex-shrink-0" />
          <div>
            <p className="font-bold">Free workflow unlocked</p>
            <p className="text-sm text-text-secondary">
              Dental Clinic Appointment Booking Bot is available in your account.
            </p>
          </div>
        </div>
      </div>

      <Link href="/account" className="btn-primary inline-flex items-center gap-2">
        Go to account <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  );
}

export default function SignupSuccessPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="min-h-screen flex items-center justify-center px-6 pt-20">
        <Suspense fallback={<div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full" />}>
          <SignupSuccessContent />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}

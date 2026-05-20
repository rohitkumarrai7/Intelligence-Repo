import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

export const metadata: Metadata = {
  title: "Intelligence Repository - AI Workflows & Voice Agents Marketplace",
  description: "The only AI marketplace where prompts come with workflows and voice agents — ready to deploy, not just copy-paste.",
  keywords: "AI workflows, n8n workflows, voice agents, automation, AI prompts, no-code automation",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="min-h-screen bg-background text-text-primary antialiased">
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
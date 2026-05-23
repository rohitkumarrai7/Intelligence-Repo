import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import { MetaPixel } from "@/components/MetaPixel";

export const metadata: Metadata = {
  title: "Intelligence Repository — Premium Codebases & AI Workflows",
  description: "The only marketplace selling full project codebases, n8n workflows, voice agents, and Chrome extensions. Download, deploy, profit.",
  keywords: "AI codebases, n8n workflows, voice agents, Chrome extensions, automation, AI marketplace, source code",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: undefined,
        variables: {
          colorPrimary: "#F59E0B",
          colorBackground: "#111827",
          colorInputBackground: "#1E293B",
          colorInputText: "#F9FAFB",
          colorText: "#F9FAFB",
          colorTextSecondary: "#9CA3AF",
          colorNeutral: "#374151",
        },
        elements: {
          formButtonPrimary: {
            background: "linear-gradient(135deg, #F59E0B 0%, #D97706 100%)",
            color: "#0B0F1A",
            fontWeight: 700,
          },
          card: {
            background: "rgba(17, 24, 39, 0.6)",
            backdropFilter: "blur(16px)",
            border: "1px solid rgba(255, 255, 255, 0.08)",
          },
          input: {
            background: "#1E293B",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            color: "#F9FAFB",
          },
        },
      }}
    >
      <html lang="en" className="dark">
        <body className="min-h-screen bg-background text-text-primary antialiased">
          <MetaPixel />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}

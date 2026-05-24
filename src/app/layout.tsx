import type { Metadata } from "next";
import "./globals.css";
import { PostHogProvider } from "./providers";

export const metadata: Metadata = {
  title: "Intelligence Repository — Premium Codebases & AI Workflows",
  description: "The only marketplace selling full project codebases, n8n workflows, voice agents, and Chrome extensions. Download, deploy, profit.",
  keywords: "AI codebases, n8n workflows, voice agents, Chrome extensions, automation, AI marketplace, source code",
  icons: {
    icon: [
      { url: "/logo.svg", type: "image/svg+xml" },
    ],
    apple: "/logo.svg",
  },
  openGraph: {
    title: "Intelligence Repository — Premium Codebases & AI Workflows",
    description: "The only marketplace selling full project codebases, n8n workflows, voice agents, and Chrome extensions.",
    url: "https://intelligencerepo.ai",
    siteName: "Intelligence Repository",
    images: [
      {
        url: "/logo.svg",
        width: 200,
        height: 200,
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Intelligence Repository — Premium Codebases & AI Workflows",
    description: "The only marketplace selling full project codebases, n8n workflows, voice agents, and Chrome extensions.",
    images: ["/logo.svg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="icon" href="/logo.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/logo.svg" />
      </head>
      <body className="min-h-screen bg-background text-text-primary antialiased">
        <PostHogProvider>
          {children}
        </PostHogProvider>
      </body>
    </html>
  );
}

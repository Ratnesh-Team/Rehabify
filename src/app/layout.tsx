import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ratnesh-maurya.com"),
  title: "Rehabify - Management Platform for Rehabilitation Centers and Nasha Mukti Kendras",
  description:
    "Rehabify is an all-in-one management platform for rehabilitation centers and Nasha Mukti Kendras. This website includes demo data for showcasing Nasha Mukti Kendra operational workflows.",
  alternates: {
    canonical: "https://ratnesh-maurya.com",
  },
  openGraph: {
    title: "Rehabify",
    description:
      "Nasha Mukti Kendra operations demo platform for coordinated rehabilitation workflows across doctors, centers, and patients.",
    url: "https://ratnesh-maurya.com",
    siteName: "Rehabify",
    type: "website",
  },
  keywords: [
    "Rehabify",
    "Nasha Mukti Kendra demo",
    "Nasha Mukti Kendra",
    "rehabilitation platform",
    "healthcare operations",
    "ratnesh-maurya.com",
    "blog.ratnesh-maurya.com",
  ],
  icons: {
    icon: "/favicon.ico",
  },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}

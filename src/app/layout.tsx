import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { VercelToolbar } from "@vercel/toolbar/next";
import { existsSync } from "fs";
import { join } from "path";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Vercel Feature Flags",
  description: "Vercel Feature Flags Demo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Check if project is linked to Vercel by checking for .vercel directory
  const isVercelLinked = existsSync(
    join(process.cwd(), ".vercel", "project.json")
  );
  const shouldInjectToolbar =
    process.env.NODE_ENV === "development" && isVercelLinked;

  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        {children}
        {shouldInjectToolbar && <VercelToolbar />}
      </body>
    </html>
  );
}

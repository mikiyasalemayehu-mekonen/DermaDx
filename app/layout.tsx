import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DermaDx | AI-Powered Clinical Decision Support for Dermatology",
  description: "Empowering clinicians with high-precision dermatological screening tools.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-full flex flex-col">
        {children}
      </body>
    </html>
  );
}

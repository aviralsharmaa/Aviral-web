import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Aviral Sharma - Machine Learning Engineer",
  description: "Portfolio website for Aviral Sharma - Machine Learning Engineer",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}


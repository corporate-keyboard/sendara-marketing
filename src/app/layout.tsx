import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "Sendara — WhatsApp Campaign Engine for UAE Real Estate | Stop Getting Blocked",
  description: "Sendara protects your WhatsApp number while scaling campaigns. Automated warm-up, AI templates, and real-time quality monitoring for UAE real estate agencies.",
  keywords: ["whatsapp campaign real estate dubai", "whatsapp blocked real estate uae", "whatsapp marketing uae", "real estate campaign engine"],
  icons: {
    icon: "/sendara-favicon.svg",
    apple: "/sendara-icon-teal.svg",
  },
  openGraph: {
    title: "Sendara — WhatsApp Campaign Engine for UAE Real Estate",
    description: "Stop getting blocked on WhatsApp. Automated warm-up, AI templates, and quality monitoring for UAE real estate.",
    type: "website",
    locale: "en_AE",
    siteName: "Sendara",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sendara — WhatsApp Campaign Engine for UAE Real Estate",
    description: "Stop getting blocked on WhatsApp. Automated warm-up, AI templates, and quality monitoring.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${plusJakarta.variable} ${inter.variable} font-body antialiased`}>
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}

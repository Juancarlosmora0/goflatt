import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    default: "GoFlatt — Find Erasmus Roommates Before You Arrive",
    template: "%s | GoFlatt",
  },
  description:
    "Find compatible flatmates for your Erasmus, master's or exchange program before you arrive. No WhatsApp chaos. No fake profiles. Just real students forming real groups.",
  keywords: [
    "erasmus roommates",
    "find flatmates erasmus",
    "erasmus housing",
    "student shared flat europe",
    "erasmus roommate finder",
    "find erasmus flatmates milan",
    "find erasmus flatmates lisbon",
    "find erasmus flatmates berlin",
    "compañeros de piso erasmus",
    "buscar roommate erasmus",
    "coinquilini erasmus",
    "colocation erasmus",
    "goflatt",
  ],
  authors: [{ name: "GoFlatt" }],
  creator: "GoFlatt",
  metadataBase: new URL("https://goflatt.com"),
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://goflatt.com",
    siteName: "GoFlatt",
    title: "GoFlatt — Find Erasmus Roommates Before You Arrive",
    description:
      "Form your flat group with compatible students before arriving in your Erasmus city. Free, fast, and no WhatsApp chaos.",
    images: [{ url: "/api/og", width: 1200, height: 630, alt: "GoFlatt — Find Erasmus Roommates" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "GoFlatt — Find Erasmus Roommates Before You Arrive",
    description: "Form your flat group with compatible students before arriving. Free.",
    images: ["/api/og"],
    creator: "@goflatt",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.ico" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  verification: {
    google: "5DonNmz019P5YVvHZO3b5IXcWx9nCZXQPvAcLcITFkA",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geist.variable} h-full antialiased`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "GoFlatt",
              url: "https://goflatt.com",
              description:
                "Platform for international students to find compatible flatmates before arriving at their Erasmus or exchange destination.",
              applicationCategory: "SocialNetworkingApplication",
              operatingSystem: "Web",
              inLanguage: ["en", "es", "it", "fr", "de", "pt"],
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "EUR",
              },
              audience: {
                "@type": "Audience",
                audienceType: "International university students, Erasmus students",
              },
            }),
          }}
        />
        {/* GA4 */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-WM29Y87LZ3');
            `,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
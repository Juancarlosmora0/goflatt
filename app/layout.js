import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    default: "GoFlatt — Encuentra tu grupo de piso antes de llegar",
    template: "%s | GoFlatt",
  },
  description:
    "GoFlatt es la plataforma para que estudiantes de intercambio, Erasmus y máster encuentren compañeros de piso compatibles antes de llegar a su destino. Sin caos, sin WhatsApp eternos.",
  keywords: [
    "compañeros de piso erasmus",
    "grupo piso erasmus milán",
    "grupo piso erasmus lisboa",
    "buscar compañeros piso intercambio",
    "formar grupo piso estudiantes",
    "roommate erasmus",
    "piso compartido estudiantes internacionales",
    "goflatt",
  ],
  authors: [{ name: "GoFlatt" }],
  creator: "GoFlatt",
  metadataBase: new URL("https://goflatt.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "https://goflatt.com",
    siteName: "GoFlatt",
    title: "GoFlatt — Encuentra tu grupo de piso antes de llegar",
    description:
      "Forma tu grupo de piso con estudiantes compatibles en tu ciudad de destino, antes de llegar. Para Erasmus, másters e intercambios.",
    images: [
    {
      url: "/api/og",
      width: 1200,
      height: 630,
      alt: "GoFlatt — Encuentra tu grupo de piso antes de llegar",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "GoFlatt — Encuentra tu grupo de piso antes de llegar",
    description:
      "Forma tu grupo de piso con estudiantes compatibles en tu ciudad de destino, antes de llegar.",
    images: ["/og-image.png"],
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
    { url: "/favicon.svg", type: "image/svg+xml" },
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
    <html lang="es" className={`${geist.variable} h-full antialiased`}>
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
                "Plataforma para que estudiantes de intercambio encuentren compañeros de piso compatibles antes de llegar a su destino.",
              applicationCategory: "SocialNetworkingApplication",
              operatingSystem: "Web",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "EUR",
              },
              audience: {
                "@type": "Audience",
                audienceType: "Estudiantes universitarios internacionales",
              },
            }),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
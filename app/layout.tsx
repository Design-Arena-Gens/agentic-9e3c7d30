import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Everest Summit | 60-Second Cinematic Plan",
  description:
    "Storyboard, shot design, and sensory treatment for a 60-second cinematic ascent culminating on the summit of Mount Everest.",
  openGraph: {
    title: "Everest Summit | 60-Second Cinematic Plan",
    description:
      "Shot-by-shot blueprint capturing the climber's predawn summit push with RED Komodo & Zeiss Supreme Primes.",
    type: "website",
    url: "https://agentic-9e3c7d30.vercel.app",
    images: [
      {
        url: "https://images.unsplash.com/photo-1549887534-1541e9326642?auto=format&fit=crop&w=1200&q=80",
        width: 1200,
        height: 630,
        alt: "Cinematic Everest summit storyboard"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Everest Summit | 60-Second Cinematic Plan",
    description:
      "Dynamic timeline, shot design, and sensory map for a 60-second Everest summit film.",
    images: ["https://images.unsplash.com/photo-1549887534-1541e9326642?auto=format&fit=crop&w=1200&q=80"]
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

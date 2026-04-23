import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ChatBot from "@/components/ChatBot";
import { LanguageProvider } from "@/contexts/LanguageContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  fallback: ["-apple-system", "BlinkMacSystemFont", "Segoe UI", "Hiragino Kaku Gothic ProN", "Hiragino Sans", "Meiryo", "sans-serif"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  fallback: ["monospace"],
});

export const metadata: Metadata = {
  title: "ホテル シルク・トゥリー 名古屋 - 館内のご案内",
  description: "ホテル シルク・トゥリー 名古屋の館内案内サイトです。名古屋市中区錦、チェックイン・朝食・Wi-Fi・館内設備のご案内。",
  icons: {
    icon: "/main-page/icon-hotelnagoya.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // ホテル館内案内の構造化データ
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Hotel",
    "name": "ホテル シルク・トゥリー 名古屋",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "JP",
      "addressRegion": "愛知県",
      "addressLocality": "名古屋市中区",
      "streetAddress": "錦2丁目20-5",
      "postalCode": "460-0003"
    },
    "telephone": "052-222-1113",
    "url": "https://www.silk-tree.jp/",
    "amenityFeature": [
      {
        "@type": "LocationFeatureSpecification",
        "name": "朝食",
        "description": "2F ALLY's Nagoya。大人 1,650円（税込）／小学生 1,100円（税込）／未就学児無料。6:30～9:30（オーダーストップ9:00）。当日券はフロントで販売。ヨーロピアン＆オリエンタル・モーニングブッフェ（名古屋めし・のっけ丼・パン・スープ・サラダ・ドリンク等）。"
      },
      {
        "@type": "LocationFeatureSpecification",
        "name": "チェックイン・チェックアウト",
        "description": "チェックイン 15:00／チェックアウト 11:00。ご不明な点はフロント内線333へ。"
      },
      {
        "@type": "LocationFeatureSpecification",
        "name": "Wi-Fi",
        "description": "無料Wi-Fi。SSID: silktree。パスワード: silktree。有線LANはご利用いただけません。"
      },
      {
        "@type": "LocationFeatureSpecification",
        "name": "館内設備",
        "description": "ウェルカムドリンク・アメニティバイキング(14:00～25:00) 1F、喫煙所1F、自動販売機1F・3F、電子レンジ3F・4F・6F・8F・10F、コインランドリー・製氷機・コミックコーナー 3F"
      }
    ]
  };

  return (
    <html lang="ja">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <LanguageProvider>
          {children}
          <ChatBot />
        </LanguageProvider>
      </body>
    </html>
  );
}

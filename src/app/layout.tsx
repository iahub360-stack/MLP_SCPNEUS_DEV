import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mercado Livre dos Pneus - O maior e-commerce de pneus do Brasil",
  description: "O maior e-commerce de pneus do Brasil. As melhores marcas e preços com a qualidade SCPNEUS. Pneus para carro, moto, caminhão e agricultura.",
  keywords: ["pneus", "pneus carro", "pneus moto", "pneus caminhão", "SCPNEUS", "Mercado Livre dos Pneus"],
  authors: [{ name: "SCPNEUS DISTRIBUIDORA" }],
  icons: {
    icon: "https://i.ibb.co/1GQxJ9mc/Logo-MLP-2.png",
  },
  openGraph: {
    title: "Mercado Livre dos Pneus",
    description: "O maior e-commerce de pneus do Brasil. As melhores marcas e preços.",
    url: "https://mercadolivredospneus.com.br",
    siteName: "Mercado Livre dos Pneus",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mercado Livre dos Pneus",
    description: "O maior e-commerce de pneus do Brasil. As melhores marcas e preços.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}

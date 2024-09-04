import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";
import Header from "@/componets/_layout/Header";
import Footer from "@/componets/_layout/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sale Optimizer",
  description: "sale optimizer system for retail fashion",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}

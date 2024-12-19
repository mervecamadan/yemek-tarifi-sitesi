"use client"; // Bileşenin istemci tarafında çalışacağını belirtir.

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import HeaderWrapper from "@/app/components/HeaderWrapper";
import { Provider } from "react-redux";
import { store } from "@/app/redux/store";
import { useEffect } from "react"; // useEffect'i istemci tarafında kullanmak için import ediyoruz
import { setAuthFromLocalStorage } from "@/app/redux/authSlice";
import Head from "next/head"; // Sayfa başlıklarını ayarlamak için import ediyoruz

// Fonts
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Kimlik doğrulama işlemlerini başlatan bileşen
function AuthInitializer() {
  const dispatch = store.dispatch;
  useEffect(() => {
    dispatch(setAuthFromLocalStorage());
  }, [dispatch]);
  return null;
}

// RootLayout bileşeni
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Provider store={store}>
          {/* Kimlik doğrulama işlemleri */}
          <AuthInitializer />
          {/* Head bileşenini kullanarak sayfa başlıklarını ayarlıyoruz */}
          <Head>
            <title>MC Mutfak</title>
            <meta name="description" content="Yemek Tarifi Uygulaması" />
          </Head>
          {/* Header bileşeni */}
          <HeaderWrapper />
          {/* Sayfa içerikleri */}
          <main>{children}</main>
        </Provider>
      </body>
    </html>
  );
}

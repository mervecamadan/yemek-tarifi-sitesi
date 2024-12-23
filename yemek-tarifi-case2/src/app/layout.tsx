"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import HeaderWrapper from "@/app/components/HeaderWrapper";
import { Provider } from "react-redux";
import { store } from "@/app/redux/store";
import { useEffect } from "react";
import { setAuthFromLocalStorage } from "@/app/redux/authSlice";
import Head from "next/head";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


function AuthInitializer() {
  const dispatch = store.dispatch;
  useEffect(() => {
    dispatch(setAuthFromLocalStorage());
  }, [dispatch]);
  return null;
}


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

          <AuthInitializer />

          <Head>
            <title>MC Mutfak</title>
            <meta name="description" content="Yemek Tarifi Uygulaması" />
          </Head>

          <HeaderWrapper />

          <main>{children}</main>
        </Provider>
      </body>
    </html>
  );
}

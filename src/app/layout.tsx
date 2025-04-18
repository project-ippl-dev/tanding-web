import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import "./globals.css";
import Wrapper from "./wrapper";
import NavigationWrapper from "@/components/navbar/NavigationWrapper";
import WrapperContext from "./wrapper";
import Footer from "@/components/Footer/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tanding!",
  description: "Platform Komunitas Olahraga Indonesia Terbaik!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en" >
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AppRouterCacheProvider>
          <WrapperContext>
            <NavigationWrapper>
              <main>{children}</main>
            </NavigationWrapper>
            <Footer />
          </WrapperContext>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}

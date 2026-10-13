import React from "react";
import type { Metadata } from "next";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Providers } from "./providers";
import LocaleWrapper from "@/components/LocaleWrapper";
import "./css/globals.css";
import { ThemeModeScript } from "flowbite-react";
import { Manrope } from "next/font/google";
import { defaultLocale, isAppLocale } from "@/lib/locale";

const manrope = Manrope({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Kiy24.uz - Dashboard",
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: requestedLocale } = await params;
  const locale = isAppLocale(requestedLocale) ? requestedLocale : defaultLocale;
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <head>
        <ThemeModeScript />
      </head>
      <body className={`${manrope.className}`}>
        <LocaleWrapper>
          <NextIntlClientProvider messages={messages}>
            <Providers>
              {children}
            </Providers>
          </NextIntlClientProvider>
        </LocaleWrapper>
      </body>
    </html>
  );
}

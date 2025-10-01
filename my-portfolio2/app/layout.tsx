import "@/styles/globals.css";
import clsx from "clsx";
import { Yomogi as YomogiFont } from "next/font/google";

import { Providers } from "./providers";

import I18nClientProvider from "@/components/I18nClientProvider";
import TransitionOverlay from "@/components/TransitionOverlay";

const Yomogi = YomogiFont({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-yomogi",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning>
      <head>
        <title>Barbie's Portfolio</title>
        <link href="/bunny.ico" rel="icon" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Cherry+Bomb+One&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={clsx(Yomogi.variable)}>
        <I18nClientProvider>
          <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
            <TransitionOverlay isActive={false} />
            <main>{children}</main>
          </Providers>
        </I18nClientProvider>
      </body>
    </html>
  );
}

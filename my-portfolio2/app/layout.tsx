import "@/styles/globals.css";
import clsx from "clsx";
import { Yomogi as YomogiFont } from "next/font/google";

import { Providers } from "./providers";

import I18nClientProvider from "@/components/I18nClientProvider";
import TransitionOverlay from "@/components/TransitionOverlay";

const Yomogi = YomogiFont({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-modak",
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
      </head>
      <body className={clsx(Yomogi.className)}>
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

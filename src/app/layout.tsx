import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { ReduxProvider } from "../store/ReduxProvider";
import { SkeletonTheme } from "react-loading-skeleton";

const montserrat = Montserrat({ subsets: ["cyrillic"] });

export const metadata: Metadata = {
  title: "Music",
  description: "Music app by ax1lebafer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <ReduxProvider>
        <SkeletonTheme baseColor="#393939" highlightColor="#4b4a4a">
          <body className={montserrat.className}>{children}</body>
        </SkeletonTheme>
      </ReduxProvider>
    </html>
  );
}

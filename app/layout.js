import localFont from "next/font/local";
import "./globals.css";

import { Manrope } from 'next/font/google'
const inter = Manrope({
  subsets: ['cyrillic'],
  display: "swap",
})

export const metadata = {
  title: "Marketplace",
  description: "Website",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} text-muted-foreground overflow-x-hidden font-medium antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

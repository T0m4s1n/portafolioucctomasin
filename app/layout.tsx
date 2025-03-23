import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { Geist_Mono } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "900"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "T0m4s1n portfolio",
  description: "My personal portfolio of t0m4s1n to showcase my projects and skills.",
  icons: {
    icon: '/flower.svg',
  },
  viewport: "width=device-width, initial-scale=1, viewport-fit=cover",
  themeColor: "transparent",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'><style>path{fill:%23000}@media(prefers-color-scheme:dark){path{fill:%23fff}}</style><path d='M12 2.5a5.5 5.5 0 0 1 3.096 10.047 5.47 5.47 0 0 1 2.44 1.794 3.5 3.5 0 1 1-3.536 5.848 5.5 5.5 0 1 1-4 0A3.5 3.5 0 1 1 6.464 14.34a5.471 5.471 0 0 1 2.44-1.794A5.5 5.5 0 0 1 12 2.5z'/></svg>"
        />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="transparent" />
        <meta name="theme-color" content="transparent" />
      </head>
      <body
        className={`${poppins.variable} ${geistMono.variable} antialiased`}
        style={{ 
          paddingBottom: "env(safe-area-inset-bottom)",
          paddingTop: "env(safe-area-inset-top)",
          paddingLeft: "env(safe-area-inset-left)",
          paddingRight: "env(safe-area-inset-right)" 
        }}
      >
        {children}
      </body>
    </html>
  );
}
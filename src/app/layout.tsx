import type { Metadata } from "next";
import 'antd/dist/reset.css'
import "./globals.css";

export const metadata: Metadata = {
  title: "Filer UI",
  description: "UI Client for Filer API",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}

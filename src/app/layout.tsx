import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";


export const metadata: Metadata = {
  title: "Habit Battles",
  description: "Battle your habits with peers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`nunito-sans antialiased`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}

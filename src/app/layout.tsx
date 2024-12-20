import type { Metadata } from "next";
import { ReactNode } from "react";
import { Stack } from "@mui/material"

import "./globals.css";

export const metadata: Metadata = {
  title: "Next.js static site",
  description: "A personal website template for Next.js.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
            {children}
      </body>
    </html>
  );
}

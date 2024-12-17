import { ReactNode } from "react";
import { Stack } from "@mui/material"

import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
        <Stack
            sx={{
                position: "relative",
                maxWidth: "1140px",
                margin: "0 auto",
            }}
        >
            {children}
        </Stack>

  );
}

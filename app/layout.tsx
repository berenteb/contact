import { ReactNode } from "react";

import "./globals.css";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>Contacts</title>
      </head>
      <body>{children}</body>
    </html>
  );
}

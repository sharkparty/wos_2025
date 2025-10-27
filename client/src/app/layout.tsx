import "./globals.css";

import { Roboto_Flex } from "next/font/google";

const roboto = Roboto_Flex({
  weight: "400",
  subsets: ["latin"],
});

export const metadata = {
  title: "WorkOS | Modify User Roles",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={roboto.className}>
      <body>{children}</body>
    </html>
  );
}

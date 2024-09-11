import type { Metadata } from "next";
import { Inter, Pixelify_Sans } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const pixelify = Pixelify_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "KatKafe",
    description: "Welcome to KatKafe!",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={pixelify.className}>{children}</body>
        </html>
    );
}


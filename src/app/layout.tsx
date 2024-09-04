import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "@/components/mode-toggle";
import SideNav from "@/components/side-nav";
import { SessionProvider } from "next-auth/react";
import TopBar from "@/components/topbar";

const inter = Inter({ subsets: ["latin"] });
const outfit = Outfit({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CineBook",
  description:
    "CinnBook is a movie searching and bookmarking app where users can brows information about any movie and also bookmark the movie",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={outfit.className}>
        <SessionProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <TopBar />
            <div className="flex">
              <SideNav />
              <div className="w-full overflow-x-auto">
                <div className="sm:h-[calc(100vh-70px)] overflow-auto">
                  <div className="w-full flex justify-center mx-auto overflow-auto h-[calc(100vh - 120px)] overflow-y-auto relative">
                    <div className="w-full md:max-w-screen-2xl">{children}</div>
                  </div>
                </div>
              </div>
            </div>
            <Toaster />
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}

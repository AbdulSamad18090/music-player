import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import Header from "@/components/header/Header";
import Player from "@/components/player/Player";
import { Sidebar } from "@/components/sidebar/Sidebar";
import { ThemeProvider } from "@/components/theme-provider";
import StoreProvider from "@/components/store-provider/StoreProvider";
import { CustomThemeProvider } from "@/components/custom-theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Music App",
  description: "A responsive music application",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <StoreProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <CustomThemeProvider defaultTheme="default">
              <div className="flex flex-col h-dvh">
                <Header />
                <ResizablePanelGroup
                  direction="horizontal"
                  className="flex-1 border-y"
                >
                  <ResizablePanel
                    defaultSize={20}
                    minSize={0}
                    maxSize={20}
                    className="hidden sm:block"
                  >
                    <Sidebar />
                  </ResizablePanel>
                  <ResizableHandle withHandle className="hidden sm:flex" />
                  <ResizablePanel defaultSize={80} minSize={0}>
                    <div className="h-full overflow-y-auto">
                      <div className="block sm:hidden">
                        <div className="w-full py-2 px-4 bg-card border-b">
                          <Sidebar />
                        </div>
                      </div>
                      {children}
                    </div>
                  </ResizablePanel>
                </ResizablePanelGroup>
                <Player />
              </div>
            </CustomThemeProvider>
          </ThemeProvider>
        </StoreProvider>
      </body>
    </html>
  );
}

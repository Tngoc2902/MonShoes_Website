import { CartProvider } from "@/contexts/cart-context";
import { AuthProvider } from "@/contexts/auth-context";
import { ThemeProvider } from "@/components/theme-provider";
import { ScrollToTop } from "@/components/scroll-to-top";
import ClientOnly from "@/components/ClientOnly";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import { Toaster } from "sonner";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MONSHOES - Giày thể thao chính hãng",
  description:
    "Cửa hàng giày thể thao chính hãng với đa dạng mẫu mã và kích cỡ",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <head>
        <Script id="recover-stale-next-chunks" strategy="afterInteractive">{`
          (function () {
            var STORAGE_KEY = "monshoes:last-chunk-reload";
            var RELOAD_COOLDOWN_MS = 10000;

            function isChunkLoadError(value) {
              var message = "";

              if (typeof value === "string") {
                message = value;
              } else if (value && typeof value === "object") {
                message = [value.name, value.message, value.type, value.src]
                  .filter(Boolean)
                  .join(" ");
              }

              return new RegExp("ChunkLoadError|Loading chunk|_next/static/chunks|webpack", "i").test(message);
            }

            function reloadOnce() {
              var now = Date.now();
              var lastReload = Number(window.sessionStorage.getItem(STORAGE_KEY) || "0");

              if (now - lastReload < RELOAD_COOLDOWN_MS) return;

              window.sessionStorage.setItem(STORAGE_KEY, String(now));
              window.location.reload();
            }

            window.addEventListener(
              "error",
              function (event) {
                if (isChunkLoadError(event.error) || isChunkLoadError(event.target)) {
                  reloadOnce();
                }
              },
              true
            );

            window.addEventListener("unhandledrejection", function (event) {
              if (isChunkLoadError(event.reason)) {
                reloadOnce();
              }
            });
          })();
        `}</Script>
      </head>
      <body className={inter.className} suppressHydrationWarning>
        <ClientOnly>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <AuthProvider>
              <CartProvider>
                {children}
                <ScrollToTop />
                <Toaster />
              </CartProvider>
            </AuthProvider>
          </ThemeProvider>
        </ClientOnly>
      </body>
    </html>
  );
}

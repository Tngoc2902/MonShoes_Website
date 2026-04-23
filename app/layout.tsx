import { CartProvider } from "@/contexts/cart-context";
import { AuthProvider } from "@/contexts/auth-context";
import { ThemeProvider } from "@/components/theme-provider";
import { ScrollToTop } from "@/components/scroll-to-top";
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
    <html lang="vi" suppressHydrationWarning>
      <head>
        <Script id="remove-extension-attrs" strategy="beforeInteractive">{`
          (function () {
            try {
              function clean(el) {
                if (!el || !el.attributes) return;
                var attrs = Array.prototype.slice.call(el.attributes);
                for (var i = 0; i < attrs.length; i++) {
                  var name = attrs[i].name;
                  if (name === "bis_register" || name.indexOf("__processed_") === 0) {
                    el.removeAttribute(name);
                  }
                }
              }

              clean(document.documentElement);
              if (document.body) clean(document.body);
              if (!document.body) {
                document.addEventListener("DOMContentLoaded", function () {
                  clean(document.body);
                });
              }
            } catch (e) {}
          })();
        `}</Script>
      </head>
      <body className={inter.className} suppressHydrationWarning>
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
      </body>
    </html>
  );
}

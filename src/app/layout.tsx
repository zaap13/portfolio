import "./globals.css";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google"; // Apenas Montserrat é importada
import { ThemeProvider } from "@/components/theme-provider";
import NavBar from "@/components/layout/NavBar";

// Carregamos a Montserrat e definimos a variável CSS
const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-mont",
});

export const metadata: Metadata = {
  title: "Felipe Bueno - Desenvolvedor Full-Stack",
  description: "Portfólio para apresentação de projetos e habilidades.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" suppressHydrationWarning>
      <body
        className={`${montserrat.className} bg-dark font-mont dark:bg-light`}
      >
        <ThemeProvider
          attribute="class"
          enableSystem={false}
          disableTransitionOnChange
        >
          <NavBar />
          <main className="p-8 sm:p-16 lg:p-32">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
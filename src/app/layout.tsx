// app/layout.tsx (Versão de Diagnóstico Final)

import NavBar from "@/components/layout/NavBar";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import Footer from "@/components/layout/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
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
      <body className={`${inter.className} bg-dark dark:bg-light`}>
        {/*
          ALTERAÇÃO PRINCIPAL AQUI:
          - Removemos 'defaultTheme="dark"'
          - Adicionamos 'enableSystem={false}'
        */}
        <ThemeProvider
          attribute="class"
          enableSystem={false} // Força o tema a ser controlado apenas pelo site
          disableTransitionOnChange
        >
          <NavBar />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import Footer from "@/components/layout/Footer"; // Supondo que você moveu para a nova estrutura
import Navbar from "@/components/layout/NavBar"; // Supondo que você moveu para a nova estrutura
import "./globals.css";

// Configuração da fonte, como você já tinha
const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-mont",
});

// Metadados de SEO aprimorados, como sugerido anteriormente
export const metadata: Metadata = {
  title: "Zaap | Desenvolvedor Front-end",
  description: "Portfólio de projetos de um desenvolvedor front-end especializado em React, Next.js e TypeScript.",
  keywords: ["Desenvolvedor Front-end", "React", "Next.js", "TypeScript", "Portfólio", "Zaap"],
  creator: "Zaap",
  openGraph: {
    title: "Zaap | Desenvolvedor Front-end",
    description: "Confira meu portfólio de projetos e habilidades.",
    // Lembre-se de criar essa imagem e colocar na pasta /public
    images: ['/og-image.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      {/* A fonte e a cor de fundo principal agora estão no body.
        Isso garante que a página inteira tenha esses estilos base.
      */}
      <body
        className={`${montserrat.variable} font-mont bg-light w-full min-h-screen`}
      >
        {/* Navbar e Footer agora são irmãos da tag <main>, o que é
          semanticamente mais correto.
        */}
        <Navbar />

        {/* A tag <main> agora recebe os estilos que antes estavam no seu
          componente Layout. É ela quem aplica o padding principal.
        */}
        <main className="w-full inline-block z-0 p-32">
          {children}
        </main>
        
        <Footer />
      </body>
    </html>
  );
}
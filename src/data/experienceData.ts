export type ExperienceDetails = {
  position: string;
  company: string;
  companyLink: string;
  time: string;
  address: string;
  work: string;
};

export const professionalExperience: ExperienceDetails[] = [
  {
    position: "Desenvolvedor Full-Stack",
    company: "Projeto Freelance - Aplicativo XB PRO",
    companyLink: "https://www.xadrezbrasil.com.br",
    time: "Maio/2023 - Dez/2023",
    address: "Remoto",
    work: "Desenvolvi a aplicação de ensino de xadrez XB PRO do zero, utilizando Next.js, AWS Lambda e RDS PostgreSQL. Fui responsável pela arquitetura serverless, interface interativa e gestão do banco de dados, colaborando diretamente com o stakeholder para entregar um MVP de alta qualidade.",
  },
];

export const academicExperience: ExperienceDetails[] = [
    {
        position: "Desenvolvimento Web Full-Stack",
        company: "Driven Education",
        companyLink: "https://www.driven.com.br",
        time: "1.200 horas - Concluído em Abril/2023",
        address: "Bootcamp Intensivo",
        work: "Formação intensiva com mais de 25 projetos práticos, cobrindo o ciclo completo do desenvolvimento web com React, Node.js, TypeScript, Prisma e práticas de DevOps (Docker, AWS, CI/CD).",
      },
      {
        position: "Engenharia de Software",
        company: "Universidade Tecnológica Federal do Paraná (UTFPR)",
        companyLink: "http://www.utfpr.edu.br/",
        time: "Cursando - 7º Período",
        address: "Cornélio Procópio, PR",
        work: "Sólida base em algoritmos, estruturas de dados, paradigmas de programação e processos ágeis. Atuei como Diretor de Eventos Externos no Diretório Acadêmico, organizando visitas técnicas e eventos.",
      },
]
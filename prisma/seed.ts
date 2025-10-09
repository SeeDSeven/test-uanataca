// prisma/seed.ts
import { PrismaClient, Category } from '@prisma/client'; // <-- Volvemos a importar Category

const prisma = new PrismaClient();

// NOTA: Ahora usamos el enum 'Category' para una compatibilidad de tipos perfecta.
const technologiesData = [
  {
    name: 'React',
    description: 'Una biblioteca de JavaScript para construir interfaces de usuario interactivas.',
    website: 'https://react.dev/',
    category: Category.frontend, 
  },
  {
    name: 'Node.js',
    description: 'Un entorno de ejecución para JavaScript construido con el motor de JavaScript V8 de Chrome.',
    website: 'https://nodejs.org/',
    category: Category.backend, 
  },
  {
    name: 'Docker',
    description: 'Una plataforma de código abierto para desarrollar, enviar y ejecutar aplicaciones en contenedores.',
    website: 'https://www.docker.com/',
    category: Category.devops, 
  },
  {
    name: 'PostgreSQL',
    description: 'Un potente sistema de base de datos objeto-relacional de código abierto con más de 30 años de desarrollo activo.',
    website: 'https://www.postgresql.org/',
    category: Category.data, 
  },
  {
    name: 'Jest',
    description: 'Un framework de pruebas de JavaScript encantador con un enfoque en la simplicidad.',
    website: 'https://jestjs.io/',
    category: Category.testing, 
  },
  {
    name: 'React Native',
    description: 'Un framework para construir aplicaciones móviles nativas usando React.',
    website: 'https://reactnative.dev/',
    category: Category.mobile, 
  },
  {
    name: 'Next.js',
    description: 'El framework de React para producción. Permite renderizado del lado del servidor y generación de sitios estáticos.',
    website: 'https://nextjs.org/',
    category: Category.frontend,
  },
  {
    name: 'GraphQL',
    description: 'Un lenguaje de consulta para APIs y un entorno de ejecución para satisfacer esas consultas con tus datos existentes.',
    website: 'https://graphql.org/',
    category: Category.backend,
  },
  {
    name: 'Kubernetes',
    description: 'Un sistema de orquestación de contenedores de código abierto para automatizar el despliegue, escalado y gestión de aplicaciones.',
    website: 'https://kubernetes.io/',
    category: Category.devops,
  },
  {
    name: 'TypeScript',
    description: 'Un superconjunto de JavaScript que añade tipado estático opcional al lenguaje.',
    website: 'https://www.typescriptlang.org/',
    category: Category.frontend,
  },
  {
    name: 'Prisma',
    description: 'Un ORM de próxima generación para Node.js y TypeScript que facilita el trabajo con bases de datos.',
    website: 'https://www.prisma.io/',
    category: Category.backend,
  },
  {
    name: 'SQLite',
    description: 'Una biblioteca en C que implementa un motor de base de datos SQL autónomo, sin servidor, sin configuración y transaccional.',
    website: 'https://www.sqlite.org/index.html',
    category: Category.data,
  },
];

async function main() {
  console.log(`🌱 Comenzando el proceso de seeding...`);
  for (const tech of technologiesData) {
    await prisma.technology.upsert({
      where: { name: tech.name },
      update: {},
      create: tech,
    });
  }
  console.log(`✨ Seeding finalizado.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
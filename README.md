# TechCatalog: Catálogo de Tecnologías
Este proyecto es una aplicación web full-stack construida con Next.js que permite gestionar un catálogo de tecnologías a través de una API RESTful. La aplicación implementa un CRUD completo (Crear, Leer, Actualizar, Eliminar) y está desplegada en Vercel.

## 🚀 Aplicación en Vivo
Puedes probar la aplicación desplegada en el siguiente enlace:
https://test-uanataca.vercel.app/

## ✨ Características

* Gestión de Tecnologías (CRUD): Creación, listado, edición y eliminación de tecnologías.
* Backend Modular: Lógica de la API organizada en controladores, servicios y repositorios.
* Búsqueda en Tiempo Real: Filtrado dinámico de tecnologías en el listado.
* Validación de Datos: Reglas de validación tanto en el frontend (Zod) como en el backend para asegurar la integridad de los datos.
* Interfaz Responsiva: Diseño limpio y adaptable a diferentes dispositivos, construido con Tailwind CSS.
* Notificaciones: Mensajes de éxito y error para una mejor experiencia de usuario.
* Pruebas Unitarias: Tests para componentes de frontend y lógica del backend.

## 🛠️ Stack Tecnológico

* Framework: Next.js 14 (App Router)
* Lenguaje: TypeScript
* Base de Datos: PostgreSQL
* ORM: Prisma
* Estilos: Tailwind CSS
* Gestión de Formularios: React Hook Form & Zod
* Notificaciones: React Hot Toast
* Pruebas: Jest & React Testing Library

## 🚀 Cómo Levantar el Proyecto en Local

Sigue estos pasos para configurar y ejecutar el proyecto en tu máquina local.
Prerrequisitos

* Node.js (v22)
* npm (o yarn/pnpm)
* Git

### Pasos de Instalación

1. Clona el repositorio:
   ```git clone https://github.com/SeeDSeven/test-uanataca.git
   cd test-uanataca```

2. Instala las dependencias:
  `npm install`


3. Configura las variables de entorno:

Crea un archivo .env en la raíz del proyecto.

```URL de conexión directa para migraciones y seeding
POSTGRES_URL="postgres://..."

URL con pool de conexiones para la aplicación (usada por Prisma Accelerate)
PRISMA_DATABASE_URL="prisma+postgres://..."```


4. Aplica las migraciones a la base de datos:
Este comando creará las tablas en tu base de datos según el esquema de Prisma.

`npx prisma migrate dev`


5. (Opcional) Puebla la base de datos con datos de ejemplo:

`npm run db:seed`


### Ejecutar la Aplicación

* Modo Desarrollo:

`npm run dev`

La aplicación estará disponible en http://localhost:3000.

* Build de Producción:

`npm run build`

`npm run start`



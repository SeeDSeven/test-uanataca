-- CreateEnum
CREATE TYPE "Category" AS ENUM ('frontend', 'backend', 'devops', 'data', 'mobile', 'testing', 'other');

-- CreateTable
CREATE TABLE "technologies" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "website" TEXT,
    "category" "Category" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "technologies_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "technologies_name_key" ON "technologies"("name");

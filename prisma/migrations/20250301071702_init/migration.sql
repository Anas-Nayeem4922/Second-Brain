-- CreateEnum
CREATE TYPE "ContentEnum" AS ENUM ('video', 'article', 'image', 'tweet');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "username" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Content" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "type" "ContentEnum" NOT NULL,

    CONSTRAINT "Content_pkey" PRIMARY KEY ("id")
);

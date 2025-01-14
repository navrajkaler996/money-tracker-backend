-- CreateEnum
CREATE TYPE "AccountType" AS ENUM ('credit', 'debit', 'cash');

-- CreateTable
CREATE TABLE "Account" (
    "account_id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "account_type" "AccountType" NOT NULL,
    "bank_name" TEXT,
    "total_amount" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("account_id")
);

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

/*
  Warnings:

  - You are about to drop the column `categoryId` on the `Ledger` table. All the data in the column will be lost.
  - Added the required column `account_id` to the `Ledger` table without a default value. This is not possible if the table is not empty.
  - Added the required column `category_id` to the `Ledger` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Ledger" DROP CONSTRAINT "Ledger_categoryId_fkey";

-- AlterTable
ALTER TABLE "Ledger" DROP COLUMN "categoryId",
ADD COLUMN     "account_id" INTEGER NOT NULL,
ADD COLUMN     "category_id" INTEGER NOT NULL,
ADD COLUMN     "description" TEXT;

-- AddForeignKey
ALTER TABLE "Ledger" ADD CONSTRAINT "Ledger_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ledger" ADD CONSTRAINT "Ledger_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "Account"("account_id") ON DELETE CASCADE ON UPDATE CASCADE;

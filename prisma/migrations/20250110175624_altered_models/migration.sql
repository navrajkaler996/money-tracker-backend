/*
  Warnings:

  - You are about to drop the column `amount` on the `Category` table. All the data in the column will be lost.
  - Added the required column `category_amount` to the `Category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `categoryId` to the `Ledger` table without a default value. This is not possible if the table is not empty.
  - Added the required column `transaction_amount` to the `Ledger` table without a default value. This is not possible if the table is not empty.
  - Added the required column `transaction_date` to the `Ledger` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Category" DROP COLUMN "amount",
ADD COLUMN     "category_amount" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Ledger" ADD COLUMN     "categoryId" INTEGER NOT NULL,
ADD COLUMN     "transaction_amount" INTEGER NOT NULL,
ADD COLUMN     "transaction_date" TIMESTAMP(3) NOT NULL;

-- AddForeignKey
ALTER TABLE "Ledger" ADD CONSTRAINT "Ledger_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

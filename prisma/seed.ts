import { PrismaClient } from '@prisma/client';
import { categoryData, expenseData, ledgerData, userData } from './data';

const prisma = new PrismaClient();

async function main() {
  // const deleteUsers = await prisma.user.deleteMany();
  const users = await prisma.user.createMany({
    data: userData,
  });
  // console.log(users);
  // const deleteLedger = await prisma.ledger.deleteMany({});
  // const deleteExpenses = await prisma.expense.deleteMany({});
  // const deleteCategories = await prisma.category.deleteMany({});
  // await prisma.$executeRaw`ALTER TABLE ledger AUTO_INCREMENT = 1;`;
  // const expenses = await prisma.expense.createMany({
  //   data: expenseData,
  //   skipDuplicates: true,
  // });
  // const categories = await prisma.category.createMany({
  //   data: categoryData,
  // });
  // const ledgers = await prisma.ledger.createMany({
  //   data: ledgerData,
  //   // skipDuplicates: true,
  // });
  // //console.log({ users });
  // console.log({ expenses });
  // console.log({ categories });
  // console.log({ ledgers });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

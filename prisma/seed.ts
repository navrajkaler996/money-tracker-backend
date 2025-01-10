import { PrismaClient } from '@prisma/client';
import { categoryData, expenseData, ledgerData, userData } from './data';

const prisma = new PrismaClient();

async function main() {
  // const deleteUsers = await prisma.user.deleteMany();

  // const users = await prisma.user.createMany({
  //   data: userData,
  // });

  const expenses = await prisma.expense.createMany({
    data: expenseData,
  });

  const categories = await prisma.category.createMany({
    data: categoryData,
  });

  const ledgers = await prisma.ledger.createMany({
    data: ledgerData,
  });

  //console.log({ users });
  console.log({ expenses });
  console.log({ categories });
  console.log({ ledgers });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

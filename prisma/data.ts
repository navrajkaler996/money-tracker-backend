export const userData = [
  {
    email: 'navraj@gmail.com',
    password: 'admin',
  },
];

export const expenseData = [
  {
    total_expenses: 23000,
    date_started: new Date('2025-01-01'),
    date_ended: null,
    userId: 1,
  },
];

export const categoryData = [
  {
    category_name: 'Walmart',
    category_amount: 20000,
    userId: 1,
  },
  {
    category_name: 'Gym',
    category_amount: 3000,
    userId: 1,
  },
];

export const ledgerData = [
  {
    transaction_amount: 20000,
    transaction_date: new Date('2025-01-05'),
    userId: 1,
    categoryId: 1,
  },
  {
    transaction_amount: 3000,
    transaction_date: new Date('2025-01-06'),
    userId: 1,
    categoryId: 2,
  },
];

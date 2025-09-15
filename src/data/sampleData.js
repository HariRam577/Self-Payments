// data/sampleData.js - Sample Data for Testing
export const sampleLoans = [
  {
    id: 1,
    borrowerName: 'Alice Johnson',
    borrowerEmail: 'alice@example.com',
    amount: 50000,
    interestRate: 5,
    duration: 12,
    purpose: 'Business expansion - new equipment purchase',
    startDate: '2024-01-15',
    dueDate: '2025-01-15',
    status: 'active',
    paidAmount: 15000,
    paymentGateway: 'googlepay',
    payments: [
      { date: '2024-02-15', amount: 5000, type: 'partial' },
      { date: '2024-03-15', amount: 5000, type: 'partial' },
      { date: '2024-04-15', amount: 5000, type: 'partial' }]
  },
     {
    id: 2,
    borrowerName: 'Bob Smith',
    borrowerEmail: 'bob@example.com',
    amount: 30000,
    interestRate: 4,
    duration: 6,
    purpose: 'Medical emergency - surgery expenses',
    startDate: '2024-03-01',
    dueDate: '2024-09-01',
    status: 'completed',
    paidAmount: 30600,
    paymentGateway: 'phonepe',
    payments: [
      { date: '2024-09-01', amount: 30600, type: 'full' }
    ]
  },
  {
    id: 3,
    borrowerName: 'Carol Williams',
    borrowerEmail: 'carol@example.com',
    amount: 75000,
    interestRate: 6,
    duration: 18,
    purpose: 'Home renovation project',
    startDate: '2023-12-01',
    dueDate: '2025-06-01',
    status: 'active',
    paidAmount: 25000,
    paymentGateway: 'paytm',
    payments: [
      { date: '2024-01-01', amount: 10000, type: 'partial' },
      { date: '2024-02-01', amount: 7500, type: 'partial' },
      { date: '2024-03-01', amount: 7500, type: 'partial' }
    ]
  },
  {
    id: 4,
    borrowerName: 'David Brown',
    borrowerEmail: 'david@example.com',
    amount: 25000,
    interestRate: 7,
    duration: 8,
    purpose: 'Vehicle purchase - delivery van',
    startDate: '2024-02-10',
    dueDate: '2024-10-10',
    status: 'overdue',
    paidAmount: 10000,
    paymentGateway: 'googlepay',
    payments: [
      { date: '2024-03-10', amount: 5000, type: 'partial' },
      { date: '2024-04-10', amount: 5000, type: 'partial' }
    ]
  },
  {
    id: 5,
    borrowerName: 'Emma Davis',
    borrowerEmail: 'emma@example.com',
    amount: 40000,
    interestRate: 5.5,
    duration: 10,
    purpose: 'Education - professional course fees',
    startDate: '2024-01-20',
    dueDate: '2024-11-20',
    status: 'active',
    paidAmount: 20000,
    paymentGateway: 'phonepe',
    payments: [
      { date: '2024-02-20', amount: 4000, type: 'partial' },
      { date: '2024-03-20', amount: 4000, type: 'partial' },
      { date: '2024-04-20', amount: 4000, type: 'partial' },
      { date: '2024-05-20', amount: 4000, type: 'partial' },
      { date: '2024-06-20', amount: 4000, type: 'partial' }
    ]
  },
  {
    id: 6,
    borrowerName: 'Frank Miller',
    borrowerEmail: 'frank@example.com',
    amount: 15000,
    interestRate: 8,
    duration: 4,
    purpose: 'Emergency repair - roof damage',
    startDate: '2024-05-01',
    dueDate: '2024-09-01',
    status: 'completed',
    paidAmount: 15400,
    paymentGateway: 'paytm',
    payments: [
      { date: '2024-09-01', amount: 15400, type: 'full' }
    ]
  },
  {
    id: 7,
    borrowerName: 'Grace Wilson',
    borrowerEmail: 'grace@example.com',
    amount: 60000,
    interestRate: 4.5,
    duration: 15,
    purpose: 'Small business startup - inventory purchase',
    startDate: '2023-11-15',
    dueDate: '2025-02-15',
    status: 'active',
    paidAmount: 35000,
    paymentGateway: 'googlepay',
    payments: [
      { date: '2023-12-15', amount: 5000, type: 'partial' },
      { date: '2024-01-15', amount: 5000, type: 'partial' },
      { date: '2024-02-15', amount: 5000, type: 'partial' },
      { date: '2024-03-15', amount: 5000, type: 'partial' },
      { date: '2024-04-15', amount: 5000, type: 'partial' },
      { date: '2024-05-15', amount: 5000, type: 'partial' },
      { date: '2024-06-15', amount: 5000, type: 'partial' }
    ]
  },
  {
    id: 8,
    borrowerName: 'Henry Taylor',
    borrowerEmail: 'henry@example.com',
    amount: 20000,
    interestRate: 6.5,
    duration: 6,
    purpose: 'Wedding expenses',
    startDate: '2024-04-01',
    dueDate: '2024-10-01',
    status: 'overdue',
    paidAmount: 8000,
    paymentGateway: 'phonepe',
    payments: [
      { date: '2024-05-01', amount: 4000, type: 'partial' },
      { date: '2024-06-01', amount: 4000, type: 'partial' }
    ]
  },
  {
    id: 9,
    borrowerName: 'Ivy Anderson',
    borrowerEmail: 'ivy@example.com',
    amount: 35000,
    interestRate: 5,
    duration: 9,
    purpose: 'Debt consolidation',
    startDate: '2024-02-01',
    dueDate: '2024-11-01',
    status: 'active',
    paidAmount: 22000,
    paymentGateway: 'paytm',
    payments: [
      { date: '2024-03-01', amount: 4000, type: 'partial' },
      { date: '2024-04-01', amount: 4000, type: 'partial' },
      { date: '2024-05-01', amount: 4000, type: 'partial' },
      { date: '2024-06-01', amount: 5000, type: 'partial' },
      { date: '2024-07-01', amount: 5000, type: 'partial' }
    ]
  },
  {
    id: 10,
    borrowerName: 'Jack Thompson',
    borrowerEmail: 'jack@example.com',
    amount: 80000,
    interestRate: 7.5,
    duration: 24,
    purpose: 'Property investment - down payment',
    startDate: '2023-10-01',
    dueDate: '2025-10-01',
    status: 'active',
    paidAmount: 45000,
    paymentGateway: 'googlepay',
    payments: [
      { date: '2023-11-01', amount: 5000, type: 'partial' },
      { date: '2023-12-01', amount: 5000, type: 'partial' },
      { date: '2024-01-01', amount: 5000, type: 'partial' },
      { date: '2024-02-01', amount: 5000, type: 'partial' },
      { date: '2024-03-01', amount: 5000, type: 'partial' },
      { date: '2024-04-01', amount: 5000, type: 'partial' },
      { date: '2024-05-01', amount: 5000, type: 'partial' },
      { date: '2024-06-01', amount: 5000, type: 'partial' },
      { date: '2024-07-01', amount: 5000, type: 'partial' }
    ]
  }
];

export const sampleContacts = [
  {
    name: 'Alice Johnson',
    email: 'alice@example.com',
    phone: '+91 98765 43210',
    totalLoans: 1,
    totalAmount: 50000,
    relationship: 'Business Partner'
  },
  {
    name: 'Bob Smith',
    email: 'bob@example.com',
    phone: '+91 87654 32109',
    totalLoans: 1,
    totalAmount: 30000,
    relationship: 'Friend'
  },
  {
    name: 'Carol Williams',
    email: 'carol@example.com',
    phone: '+91 76543 21098',
    totalLoans: 1,
    totalAmount: 75000,
    relationship: 'Relative'
  },
  {
    name: 'David Brown',
    email: 'david@example.com',
    phone: '+91 65432 10987',
    totalLoans: 1,
    totalAmount: 25000,
    relationship: 'Colleague'
  },
  {
    name: 'Emma Davis',
    email: 'emma@example.com',
    phone: '+91 54321 09876',
    totalLoans: 1,
    totalAmount: 40000,
    relationship: 'Family Friend'
  },
  {
    name: 'Frank Miller',
    email: 'frank@example.com',
    phone: '+91 43210 98765',
    totalLoans: 1,
    totalAmount: 15000,
    relationship: 'Neighbor'
  },
  {
    name: 'Grace Wilson',
    email: 'grace@example.com',
    phone: '+91 32109 87654',
    totalLoans: 1,
    totalAmount: 60000,
    relationship: 'Business Contact'
  },
  {
    name: 'Henry Taylor',
    email: 'henry@example.com',
    phone: '+91 21098 76543',
    totalLoans: 1,
    totalAmount: 20000,
    relationship: 'Friend'
  },
  {
    name: 'Ivy Anderson',
    email: 'ivy@example.com',
    phone: '+91 10987 65432',
    totalLoans: 1,
    totalAmount: 35000,
    relationship: 'Colleague'
  },
  {
    name: 'Jack Thompson',
    email: 'jack@example.com',
    phone: '+91 09876 54321',
    totalLoans: 1,
    totalAmount: 80000,
    relationship: 'Business Partner'
  }
];

// Utility functions for sample data
export const getRandomLoanData = () => {
  const names = ['Michael Johnson', 'Sarah Davis', 'Robert Wilson', 'Linda Brown', 'James Miller'];
  const purposes = ['Business expansion', 'Medical expenses', 'Education fees', 'Home improvement', 'Vehicle purchase'];
  const gateways = ['googlepay', 'phonepe', 'paytm'];
  
  const randomName = names[Math.floor(Math.random() * names.length)];
  const randomPurpose = purposes[Math.floor(Math.random() * purposes.length)];
  const randomGateway = gateways[Math.floor(Math.random() * gateways.length)];
  const randomAmount = Math.floor(Math.random() * 50000) + 10000; // 10k to 60k
  const randomRate = (Math.random() * 5 + 3).toFixed(1); // 3% to 8%
  const randomDuration = Math.floor(Math.random() * 18) + 6; // 6 to 24 months
  
  return {
    borrowerName: randomName,
    borrowerEmail: `${randomName.toLowerCase().replace(' ', '.')}@example.com`,
    amount: randomAmount,
    interestRate: parseFloat(randomRate),
    duration: randomDuration,
    purpose: randomPurpose,
    paymentGateway: randomGateway
  };
};

export const calculateLoanSummary = (loans) => {
  return loans.reduce((summary, loan) => {
    summary.totalLoans += 1;
    summary.totalAmount += loan.amount;
    summary.totalPaid += loan.paidAmount;
    summary.totalOutstanding += Math.max(0, loan.amount - loan.paidAmount);
    
    // Status counts
    const status = loan.status || 'active';
    summary.statusCounts[status] = (summary.statusCounts[status] || 0) + 1;
    
    // Gateway counts
    summary.gatewayCounts[loan.paymentGateway] = (summary.gatewayCounts[loan.paymentGateway] || 0) + 1;
    
    return summary;
  }, {
    totalLoans: 0,
    totalAmount: 0,
    totalPaid: 0,
    totalOutstanding: 0,
    statusCounts: {},
    gatewayCounts: {}
  });
};

// Mock API responses for testing
export const mockApiResponses = {
  login: {
    success: true,
    token: 'mock-jwt-token-12345',
    user: {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com'
    }
  },
  
  createLoan: (loanData) => ({
    success: true,
    message: 'Loan created successfully',
    loan: {
      id: Date.now(),
      ...loanData,
      startDate: new Date().toISOString().split('T')[0],
      status: 'active',
      paidAmount: 0,
      payments: []
    }
  }),
  
  recordPayment: (loanId, amount) => ({
    success: true,
    message: 'Payment recorded successfully',
    payment: {
      id: Date.now(),
      loanId,
      amount: parseFloat(amount),
      date: new Date().toISOString().split('T')[0],
      type: 'partial'
    }
  }),
  
  sendReminder: (loanId) => ({
    success: true,
    message: 'Reminder sent successfully',
    reminderSent: true,
    timestamp: new Date().toISOString()
  })
};

export default {
  sampleLoans,
  sampleContacts,
  getRandomLoanData,
  calculateLoanSummary,
  mockApiResponses
};
 
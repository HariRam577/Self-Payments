// App.jsx - Main Application Component
import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Dashboard from "./components/Dashboard";
import LoansList from "./cards/LoansList";
import Reports from "./cards/Reports";
import NewLoanModal from "./cards/NewLoanModal";
import { sampleLoans, sampleContacts } from "./data/sampleData";
import './App.css';

const App = () => {
  // State management
  const [loans, setLoans] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [currentView, setCurrentView] = useState("dashboard");
  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useState({
    name: "John Doe",
    email: "john@example.com",
  });

  // Initialize sample data
  useEffect(() => {
    setLoans(sampleLoans);
    setContacts(sampleContacts);
  }, []);

  // Financial calculations
  const calculateInterest = (principal, rate, duration) => {
    return (principal * rate * duration) / (12 * 100);
  };

  const calculateTotalAmount = (principal, rate, duration) => {
    return principal + calculateInterest(principal, rate, duration);
  };

  const getLoanStatus = (loan) => {
    const totalAmount = calculateTotalAmount(
      loan.amount,
      loan.interestRate,
      loan.duration
    );
    if (loan.paidAmount >= totalAmount) return "completed";
    if (new Date(loan.dueDate) < new Date()) return "overdue";
    return "active";
  };

  // Dashboard statistics
  const getDashboardStats = () => {
    const activeLoans = loans.filter(
      (loan) => getLoanStatus(loan) === "active"
    );
    const totalLent = loans.reduce((sum, loan) => sum + loan.amount, 0);
    const totalReceived = loans.reduce((sum, loan) => sum + loan.paidAmount, 0);
    const pendingAmount = loans.reduce((sum, loan) => {
      const total = calculateTotalAmount(
        loan.amount,
        loan.interestRate,
        loan.duration
      );
      return sum + Math.max(0, total - loan.paidAmount);
    }, 0);

    return {
      activeLoans: activeLoans.length,
      totalLent,
      totalReceived,
      pendingAmount,
    };
  };

  // Loan operations
  const addLoan = (newLoanData) => {
    const newLoan = {
      id: Date.now(),
      ...newLoanData,
      startDate: new Date().toISOString().split("T")[0],
      status: "active",
      paidAmount: 0,
      payments: [],
    };
    setLoans((prev) => [...prev, newLoan]);
  };

  const recordPayment = (loanId, amount) => {
    setLoans((prev) =>
      prev.map((loan) => {
        if (loan.id === loanId) {
          const newPayment = {
            date: new Date().toISOString().split("T")[0],
            amount: parseFloat(amount),
            type: "partial",
          };
          return {
            ...loan,
            paidAmount: loan.paidAmount + parseFloat(amount),
            payments: [...loan.payments, newPayment],
          };
        }
        return loan;
      })
    );
  };

  const sendReminder = (loan) => {
    alert(`Reminder sent to ${loan.borrowerEmail} for loan #${loan.id}`);
  };

  const stats = getDashboardStats();

  const appProps = {
    loans,
    stats,
    calculateTotalAmount,
    getLoanStatus,
    recordPayment,
    sendReminder,
    user,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        currentView={currentView}
        setCurrentView={setCurrentView}
        setShowModal={setShowModal}
        user={user}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentView === "dashboard" && <Dashboard {...appProps} />}
        {currentView === "loans" && <LoansList {...appProps} />}
        {currentView === "reports" && <Reports {...appProps} />}
      </main>

      {showModal && (
        <NewLoanModal
          onClose={() => setShowModal(false)}
          onSubmit={addLoan}
          calculateTotalAmount={calculateTotalAmount}
          calculateInterest={calculateInterest}
        />
      )}
    </div>
  );
};

export default App;

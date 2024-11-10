import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import UserForm from './components/UserForm';
import TransactionForm from './components/TransactionForm';
import Transactions from './components/Transactions';
function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/user-form" element={<UserForm />} />
          <Route path="/transaction-form" element={<TransactionForm />} />
          <Route path="/transactions" element={<Transactions />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;



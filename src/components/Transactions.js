import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TransactionsTable = () => {
  const [transactions, setTransactions] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/transactions', {
            auth: {
                username: 'user',
                password: 'password',
            },
        });
        setTransactions(response.data);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };
    
    fetchData();
  }, []);

  return (
    <div className="row">
      <div className="col-md-12">
        <div className="card">
          <div className="card-header">
            <h4 className="card-title"> İşlemler</h4>
          </div>
          <div className="card-body">
            <div className="table-responsive">
              <table className="table">
                <thead className="text-primary">
                  <tr>
                    <th>Açıklama</th>
                    <th>Tutar</th>
                    <th>Tarih</th>
                    <th>Türü</th>
                    <th>Kullanıcı Adı</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((transaction) => (
                    <tr key={transaction.id}>
                      <td>{transaction.description}</td>
                      <td>{transaction.amount}</td>
                      <td>{transaction.date}</td>
                      <td>{transaction.type}</td>
                      <td>{transaction.user.username}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionsTable;

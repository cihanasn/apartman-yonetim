// src/components/TransactionForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TransactionForm = () => {
  const [formData, setFormData] = useState({
    id: 0,
    userId: 0,
    description: '',
    amount: 0,
    date: '',
    type: 'income',
  });
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Kullanıcıları almak için API isteği yapıyoruz
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/users', {
          headers: {
            'Authorization': `Basic ${btoa('user:password')}`, // Kullanıcı adı ve şifreyi base64 formatında kodlayarak ekliyoruz
          },
        });
        setUsers(response.data); // Kullanıcıları state'e ekliyoruz
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const credentials = `user:password`;
    const encodedCredentials = btoa(credentials); // Base64 encoding
    try {
      const response = await axios.post('http://localhost:8080/api/transactions', formData, {
        headers: {
          'Authorization': `Basic ${encodedCredentials}`, // Authorization header
        },
      });
      console.log('Transaction created:', response.data);
      alert('İşlem başarıyla oluşturuldu!');
    } catch (error) {
      console.error('Error creating transaction:', error);
      alert('İşlem oluşturulurken bir hata oluştu.');
    }
  };

  return (
    <div className="row">
      <div className="col-md-12">
        <div className="card card-user">
          <div className="card-header">
            <h5 className="card-title">Yeni İşlem Oluştur</h5>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-4 pr-1">
                  <div className="form-group">
                    <label>Kullanıcı Seç</label>
                    <select
                      name="userId"
                      value={formData.userId}
                      onChange={handleChange}
                      className="form-control"
                    >
                      <option value={0}>Kullanıcı Seçin</option>
                      {users.map((user) => (
                        <option key={user.id} value={user.id}>
                          {user.username} - {user.email}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-4 pr-1">
                  <div className="form-group">
                    <label>Açıklama</label>
                    <input
                      type="text"
                      className="form-control"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      placeholder="Açıklama"
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-4 pr-1">
                  <div className="form-group">
                    <label>Tutar</label>
                    <input
                      type="number"
                      className="form-control"
                      name="amount"
                      value={formData.amount}
                      onChange={handleChange}
                      placeholder="Tutar"
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-4 pr-1">
                  <div className="form-group">
                    <label>Tarih</label>
                    <input
                      type="date"
                      className="form-control"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-4 pr-1">
                  <div className="form-group">
                    <label>Tip</label>
                    <select
                      name="type"
                      value={formData.type}
                      onChange={handleChange}
                      className="form-control"
                    >
                      <option value="income">Gelir</option>
                      <option value="expense">Gider</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="update ml-auto mr-auto">
                  <button type="submit" className="btn btn-primary btn-round">Kaydet</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionForm;

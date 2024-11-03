// src/components/UserForm.js
import React, { useState } from 'react';
import axios from 'axios';

const UserForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Basic Auth için kullanıcı adı ve şifreyi birleştirip base64 formatına çeviriyoruz
    const credentials = `user:password`;
    const encodedCredentials = btoa(credentials); // Base64 encoding

    try {
        const response = await axios.post('http://localhost:8080/api/users', formData, {
            headers: {
              'Authorization': `Basic ${encodedCredentials}`, // Authorization header
            },
        });
      console.log('User created:', response.data);
      alert('Kullanıcı başarıyla oluşturuldu!');
    } catch (error) {
      console.error('Error creating user:', error);
      alert('Kullanıcı oluşturulurken bir hata oluştu.');
    }
  };

  return (
  <div className="row">
    <div className="col-md-12">
      <div className="card card-user">
        <div className="card-header">
          <h5 className="card-title">Yeni Kullanıcı Oluştur</h5>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row">
                <div className="col-md-4 pr-1">
                    <div className="form-group">
                        <label>Kullanıcı Adı</label>
                        <input
                            type="text"
                            className="form-control"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            placeholder="Kullanıcı Adı"
                        />
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-4 pr-1">
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            className="form-control"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Email"
                        />
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-4 pr-1">
                    <div className="form-group">
                        <label>Şifre</label>
                        <input
                            type="password"
                            className="form-control"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Şifre"
                        />
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

export default UserForm;

import React, { useState } from 'react';

function Register() {
  const [form, setForm] = useState({
    companyName: '',
    clientID: '',
    clientSecret: '',
    ownerName: '',
    ownerEmail: '',
    rollNo: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
    // Handle form submission here (e.g., send data to an API)
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-black">Register</h1>
        <form onSubmit={handleSubmit}>
          {Object.keys(form).map((key) => (
            <div className="mb-4" key={key}>
              <label className="block text-gray-700 mb-2" htmlFor={key}>
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </label>
              <input
                type="text"
                id={key}
                name={key}
                value={form[key]}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded"
                readOnly
              />
            </div>
          ))}
          <button type="submit" className="w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700">
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;

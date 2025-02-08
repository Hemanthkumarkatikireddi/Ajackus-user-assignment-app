import React, { useState } from "react";

const UserForm = ({ formData, onSubmit, onCancel }) => {
  const [user, setUser] = useState(formData);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(user);
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="user-form w-full grid grid-cols-1 md:grid-cols-2 gap-4 p-4 font-bold"
    >
      <input 
        className="col-span-1 p-2 border border-gray-300 rounded-md m-1 w-full"
        type="text" 
        name="firstName" 
        placeholder="First Name" 
        value={user.firstName} 
        onChange={handleChange} 
        required 
      />
      <input 
        className="col-span-1 p-2 border border-gray-300 rounded-md m-1 w-full"
        type="text" 
        name="lastName" 
        placeholder="Last Name" 
        value={user.lastName} 
        onChange={handleChange} 
        required 
      />
      <input 
        className="col-span-1 p-2 border border-gray-300 rounded-md m-1 w-full"
        type="email" 
        name="email" 
        placeholder="Email" 
        value={user.email} 
        onChange={handleChange} 
        required 
      />
      <input 
        className="col-span-1 p-2 border border-gray-300 rounded-md m-1 w-full"
        type="text" 
        name="department" 
        placeholder="Department" 
        value={user.department} 
        onChange={handleChange} 
        required 
      />

      <div className="col-span-1 md:col-span-2 flex flex-col md:flex-row justify-between items-center gap-2">
        <button 
          type="submit" 
          className="bg-blue-600 m-2 rounded-md text-white p-2 w-full md:w-auto hover:bg-blue-500"
        >
          {user.id ? "Update" : "Add"} User
        </button>
        <button 
          type="button"  
          onClick={onCancel} 
          className="bg-gray-600 m-2 rounded-md text-white p-2 w-full md:w-auto hover:bg-gray-500"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default UserForm;

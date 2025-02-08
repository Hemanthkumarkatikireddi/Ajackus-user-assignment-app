import React from "react";

const UserList = ({ users, onEdit, onDelete, indexOfFirstUser}) => {
  return (
    <ul className="user-list bg-red-200 w-full mt-2 mb-2 font-bold">
      {users.map((user, index) => (
        <ul key={user.id} className="grid grid-cols-12 md:grid-cols-12 gap-4 sm:text-xs md:text-sm lg:text-md text-left">
          {/* User Details Section */}
          <li className="col-span-12 md:col-span-8 p-1 bg-white m-2 rounded-lg">
            <ul className="flex flex-col md:flex-row gap-4 justify-between items-center p-2 grid grid-cols-8 md:grid-cols-8">
              <li className="col-span-1 text-left">{indexOfFirstUser + index + 1}</li>
              <li className="col-span-2 text-left">{user.firstName} {user.lastName}</li>
              <li className="col-span-3 text-left">{user.email}</li>
              <li className="col-span-2 text-left">{user.department}</li>
            </ul>
          </li>

          {/* Edit Button */}
          <li className="col-span-6 md:col-span-2 bg-green-600 m-2 rounded-md text-white flex justify-center hover:bg-green-500">
            <button onClick={() => onEdit(user)} className="w-full py-2">Edit</button>
          </li>

          {/* Delete Button */}
          <li className="col-span-6 md:col-span-2 bg-red-500 m-2 rounded-md text-white flex justify-center hover:bg-red-400">
            <button onClick={() => onDelete(user.id)} className="w-full py-2">Delete</button>
          </li>
        </ul>
      ))}
    </ul>
  );
};

export default UserList;

import React, { Component } from "react";
import axios from "axios";
import "../App.css"
import UserList from "./UserList";
import UserForm from "./UserForm";
import ErrorHandler from "./ErrorHandler";

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: JSON.parse(localStorage.getItem("users")) || [],
      formData: { id: "", firstName: "", lastName: "", email: "", department: "" },
      error: null,
      showForm: false,
      currentPage: 1,
      usersPerPage: 10,
    };
  }

  componentDidMount() {
    if (this.state.users.length === 0) {
      this.fetchUsers();
    }
  }

  fetchUsers = async () => {
    try {
      const response = await axios.get("https://jsonplaceholder.typicode.com/users");
      const users = response.data.map((user, index) => ({
        id: index + 1,
        firstName: user.name.split(" ")[0],
        lastName: user.name.split(" ")[1] || "",
        email: user.email,
        department: user.company?.name || "Unknown",
      }));
      this.setState({ users }, () => {
        localStorage.setItem("users", JSON.stringify(users));
      });
    } catch (err) {
      this.setState({ error: "Failed to fetch users" });
    }
  };

  handleSubmit = (formData) => {
    const { users } = this.state;
    if (formData.id) {
      const updatedUsers = users.map(user => 
        (user.id === formData.id ? { ...user, ...formData } : user));
      this.setState({ users: updatedUsers, showForm: false }, () => {
        localStorage.setItem("users", JSON.stringify(updatedUsers));
      });
    } else {
      const maxId = users.length > 0 ? Math.max(...users.map(user => user.id)) : 0;
      const newUser = { ...formData, id: maxId + 1 };
      const updatedUsers = [...users, newUser];
      this.setState({ users: updatedUsers, showForm: false }, () => {
        localStorage.setItem("users", JSON.stringify(updatedUsers));
      });
    }
  };

  handleEdit = (user) => {
    this.setState({ formData: { ...user }, showForm: true });
  };

  handleDelete = (id) => {
    const updatedUsers = this.state.users.filter(user => user.id !== id);
    this.setState({ users: updatedUsers }, () => {
      localStorage.setItem("users", JSON.stringify(updatedUsers));
    });
  };

  handlePageChange = (pageNumber) => {
    this.setState({ currentPage: pageNumber });
  };

  render() {
    const { users, formData, error, showForm, currentPage, usersPerPage } = this.state;
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
    const totalPages = Math.ceil(users.length / usersPerPage);

    return (
      <div className="container mx-auto  ">
        <div className="grid grid-cols-12 gap-4 flex jusify-between">
          <div className="title font-bold col-span-9 items-center flex text-left">
            <h1 className="text-2xl">USER MANAGEMENT</h1>
              <ErrorHandler error={error} />
          </div>
          <div className="col-span-3 text-right">
            <button onClick={() => this.setState({ showForm: true })} className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded font-bold">Add User</button>
          </div>
        </div>

        {showForm && <UserForm formData={formData} onSubmit={this.handleSubmit} onCancel={() => this.setState({ showForm: false })} />}

        <UserList users={currentUsers} onEdit={this.handleEdit} onDelete={this.handleDelete} indexOfFirstUser={indexOfFirstUser} />


        {/* <UserList users={currentUsers} onEdit={this.handleEdit} onDelete={this.handleDelete} /> */}
        <div className="pagination">
          {[...Array(totalPages)].map((_, index) => (
            <button key={index + 1} onClick={() => this.handlePageChange(index + 1)} className={currentPage === index + 1 ? "bg-gray-600 text-white px-2 py-1 m-3 rounded" : ""}>
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    );
  }
}

export default User;
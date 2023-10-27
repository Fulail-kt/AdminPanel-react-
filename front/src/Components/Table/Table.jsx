import React, { useState, useEffect } from 'react';
import axios from '../../Axios/Axios';
import { Link } from 'react-router-dom';
import EditUser from '../Modals/EditUser';
import { TextField } from '@mui/material';
import Swal from 'sweetalert2';

function Table() {
  const [EditModalOpen, setEditModalOpen] = useState(false);
  const [AddingUser, setAddingUser] = useState(false);
  const [EditingUser, setEditingUser] = useState(false);
  const [users, setUsers] = useState([]);
  const [selected, setSelected] = useState('');
  const [searchTerm, setSearchTerm] = useState('');


  const openAddModal = () => {
    setAddingUser(true);
    setEditingUser(false);
    setEditModalOpen(true);
  };

  const openEditModal = (user) => {
    setAddingUser(false);
    setEditingUser(true);
    setSelected(user);
    setEditModalOpen(true);
  };

  const closeEditModal = () => {
    setEditModalOpen(false);
  };

  const token = localStorage.getItem('token');

  useEffect(() => {
    axios
      .get('/getUsers', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const updatedUsers = response.data.users;
        setUsers(updatedUsers);
      });
  }, [token]);

  const updateUserList = (updatedUser) => {
    if (AddingUser) {
      setUsers((prevUsers) => [...prevUsers, updatedUser]);
    } else {
      setUsers((prevUsers) => {
        return prevUsers.map((user) => (user._id === updatedUser._id ? updatedUser : user));
      });
    }
  };
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  
  const deleteUser = (id) => {
    Swal.fire({
      text: 'Are you sure you want to delete this user?',
      width:'300px',
      showCancelButton: true,
    }).then((result) => {
    if (result.isConfirmed) {
      // User confirmed the deletion
      axios.delete(`/deleteUser/${id}`).then((res) => {
        setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id));
        
              Swal.fire({
                text: res.data.message,
                width: '300px',
                showCancelButton: false,
                showConfirmButton: false,
                position: 'top',
                toast: true,
                timer: '2000',
                timerProgressBar: true,
              })
      });
    }
    });
  }

    const editUser = (user) => {
      setSelected(user);
      openEditModal(user);
    };

  return (
    <>
      <nav>
        <input
        className='border outline-none border-gray-500 mx-12 mt-5 p-2 bg-transparent text-slate-500 rounded-md'
          id="search"
          placeholder='Search'
          label="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </nav>

      <div>
        <div className="flex flex-col m-5">
          <div className="overflow-x-auto">
            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
              <div className="overflow-hidden">
                <table className="min-w-full text-left text-sm font-light">
                  <thead className="border-b font-medium dark:border-neutral-500 text-center">
                    <tr>
                      <th scope="col" className="px-6 py-4">
                        No
                      </th>
                      <th scope="col" className="px-6 py-4">
                        User Name
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Email
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Role
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map((user, index) => {
                      return (
                        <tr key={user._id} className="border-b dark:border-neutral-500 text-center">
                          <td className="whitespace-nowrap px-6 py-4 font-medium">{index + 1}</td>
                          <td className="whitespace-nowrap px-6 py-4">{user.name}</td>
                          <td className="whitespace-nowrap px-6 py-4">{user.email}</td>
                          <td className="whitespace-nowrap px-6 py-4">{user.role}</td>
                          <td className="whitespace-nowrap px-6 py-4 flex justify-around">
                            <Link onClick={() => editUser(user)}>
                              <svg
                                className="w-6 h-6 text-gray-800 dark:text-white"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 20 18"
                              >
                                <path
                                  stroke="currentColor"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="0.5"
                                  d="M4.109 17H1v-2a4 4 0 0 1 4-4h.87M10 4.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Zm7.95 2.55a2 2 0 0 1 0 2.829l-6.364 6.364-3.536.707.707-3.536 6.364-6.364a2 2 0 0 1 2.829 0Z"
                                />
                              </svg>
                            </Link>
                            <Link onClick={() => deleteUser(user._id)}>
                              <svg
                                className="w-6 px-1 h-6 text-gray-800 dark:text-white"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 18 20"
                              >
                                <path
                                  stroke="currentColor"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="0.5"
                                  d="M1 5h16M7 8v8m4-8v8M7 1h4a1 1 0 0 1 1 1v3H6V2a1 1 0 0 1 1-1ZM3 5h12v13a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5Z"
                                />
                              </svg>
                            </Link>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>

                <div className="w-full justify-center flex items-center h-24">
                  <button onClick={openAddModal}>Add User</button>
                  <EditUser isOpen={EditModalOpen} closeModal={closeEditModal} user={selected} AddingUser={AddingUser} EditingUser={EditingUser} updateUserList={updateUserList} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Table;

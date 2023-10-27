import React, { useState, useEffect } from 'react';
import './EditUser.css';
import axios from '../../Axios/Axios';
import { toast, Toaster } from 'react-hot-toast';
import Swal from 'sweetalert2';
import {useNavigate} from 'react-router-dom'

function EditUser({ isOpen, closeModal, user, AddingUser, EditingUser,updateUserList }) {
  if (!isOpen) {
    return null;
  }

  const navigate=useNavigate()
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');


  const [currentUser, setCurrentUser] = useState(user);

  useEffect(() => {
    if (EditingUser) {
      setName(currentUser.name);
      setEmail(currentUser.email);
      setPassword(currentUser.password);
      setRole(currentUser.role);
    } else {
      setName('');
      setEmail('');
      setPassword('');
      setRole('user');
    }
  }, [EditingUser, currentUser, AddingUser]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (EditingUser) {
      const id = currentUser._id;
      axios.patch(`/editUser/${id}`, { name, email, password, role }).then((res) => {
        if (res.data.status) {
         
          updateUserList({ _id: id, name, email, password, role });
          
          closeModal()
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
        } else {
          toast.error(res.data.message, {
            duration: 6000,
            position: 'top-center',
          });
        }
      }).catch((e) => {
        console.log(e.message);
      });
    } else if (AddingUser) {


      const trimmedName = name.trim();
      const trimmedEmail = email.trim();
      const trimmedPassword = password.trim();
  
      if (!trimmedName || !trimmedEmail || !trimmedPassword) {

        return Swal.fire({
          text:'Every field must be filled',
          width: '300px',
      showCancelButton: false,
      showConfirmButton: false,
      position: 'top',
      toast: true,
      timer: '2000',
      timerProgressBar: true,
        });
      }
  
      if (trimmedPassword.length < 4) {
      
        return Swal.fire({
          text:'Password must be atleast 4 digit',
          width: '300px',
      showCancelButton: false,
      showConfirmButton: false,
      position: 'top',
      toast: true,
      timer: '2000',
      timerProgressBar: true,
        });
      }
  
      axios.post('/addUser',{name: trimmedName,
        email: trimmedEmail,
        password: trimmedPassword,role}).then((response)=>{
        const newUser = response.data.user;
    updateUserList(newUser);
    closeModal()

    Swal.fire({
      text: `${response.data.message}`,
      width: '300px',
      showCancelButton: false,
      showConfirmButton: false,
      position: 'top',
      toast: true,
      timer: '2000',
      timerProgressBar: true,
    })
    
    return

   
      })
    }
  };

  return (
    <>
              
      <div className='container-modal text-gray-300'>
        <div className='modal-content rounded-xl flex flex-col'>
          <div className='modal_head w-64 flex justify-between'>
            <h2 className='text-red-400 text-center w-72'>{EditingUser ? 'Edit Users' : 'Add Users'}</h2>
            <span className=' cursor-pointer bg-gray-900 text-white py-0.5 px-2 rounded-full' onClick={closeModal}>X</span>
          </div>
          <form onSubmit={handleSubmit} className='w-full h-full flex flex-col justify-around items-center'>
            <div className='flex flex-col justify-start items-start w-full space-y-2'>
              <label htmlFor='name'  className='text-slate-300 '>Name</label>
              <input type='text' required value={name} name='name' id='name' onChange={(e) => setName(e.target.value)} className='outline-none border rounded-md border-slate-500 bg-transparent w-full' />

              <label htmlFor='email' className='text-slate-300 '>Email</label>
              <input type='email' required value={email} name='email' id='email' onChange={(e) => setEmail(e.target.value)} className='outline-none border rounded-md border-slate-500 bg-transparent w-full' />

              <label htmlFor='password' className='text-slate-300 '>Password</label>
              <input type='password' readOnly={EditingUser} required value={password} id='password' name='password' onChange={(e) => setPassword(e.target.value)} className='outline-none border rounded-md border-slate-500 bg-transparent w-full' />

              <div className='w-full flex justify-around items-center text-slate-200 font-thin'>
                <label htmlFor='role'>
                  <input required type='radio' checked={role === 'user'} onChange={() => setRole('user')} value='user' name='role' id='role' /> user
                </label>
                <label htmlFor='roleadmin'>
                  <input required type='radio' value='admin' checked={role === 'admin'} onChange={() => setRole('admin')} name='role' id='roleadmin' /> admin
                </label>
              </div>
            </div>

            <div className='w-full flex items-center justify-around'>
              <button className='bg-blue-500 p-2 font-serif hover-bg-inherit text-sm rounded text-white mt-2' type='submit'>
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default EditUser;

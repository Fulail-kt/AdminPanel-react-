import React,{useState,useEffect} from 'react'
import axios from '../../Axios/Axios'
import { Link, useNavigate } from 'react-router-dom'


function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      // Trim white spaces from the name, email, and password
      const trimmedName = name.trim();
      const trimmedEmail = email.trim();
      const trimmedPassword = password.trim();
  
      if (!trimmedName || !trimmedEmail || !trimmedPassword) {
        return setError('Every field must be filled');
      }
  
      if (trimmedPassword.length < 4) {
        return setError('Password must be at least 4 characters');
      }
  
      const response = await axios.post('/addUser', {
        name: trimmedName,
        email: trimmedEmail,
        password: trimmedPassword,
      });
  
      if (response.data.status) {
        setSuccess(response.data.message);
        setError('');
      } else {
        setError(response.data.message);
        setSuccess('');
      }
    } catch (error) {
      console.log(error.message);
      setError('An error occurred during registration.');
      setSuccess('');
    }
  };
  
  
    return (
      <>
      <div className='flex flex-col justify-center items-center mt-28 h-96'>
        {error && <p className='text-red-500'>{error}</p>}
        {success && <p className='text-green-500'>{success}</p>}
    
        <div className='w-70 h-80 rounded-xl flex flex-col items-center justify-center bg-gray-900 hover:shadow-gray-700 shadow-lg'>
          <form onSubmit={handleSubmit} className='w-full h-full flex flex-col justify-around items-center p-4'>
            <div className='flex flex-col justify-start items-start w-full space-y-3'>
              <label htmlFor="name" className='text-slate-300 '>Name</label>
              <input type="text" required name="name" id="name" onChange={(e) => setName(e.target.value)} className='outline-none border rounded-md border-slate-500 bg-transparent w-full ' />
    
              <label htmlFor="email" className='text-slate-300 '>Email</label>
              <input type="email"  required   name="email" id="email" onChange={(e) => setEmail(e.target.value)} className='outline-none border rounded-md border-slate-500 bg-transparent w-full' />
    
              <label htmlFor="password" className='text-slate-300 '>Password</label>
              <input type="password" pattern=".{3,}" required name='password' onChange={(e) => setPassword(e.target.value)} className='outline-none border rounded-md border-slate-500 bg-transparent w-full' />
            </div>
    
            <div className='w-full flex items-center justify-around'>
              <button className='bg-blue-500 p-2 font-serif hover:bg-inherit text-sm rounded text-white' type='submit'>
                Sign Up
              </button>
              <Link to='/' className='font-thin text-sm underline text-blue-500'>
                Already have an Account
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
    

    )
}

export default Signup

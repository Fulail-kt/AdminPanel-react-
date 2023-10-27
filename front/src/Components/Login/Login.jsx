import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from '../../Axios/Axios'
import jwt_decode from "jwt-decode";
import { useDispatch } from 'react-redux';
import { login } from '../../redux/authSlice';


function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error,setError]=useState('')

  const dispatch = useDispatch();


  const navigate = useNavigate()




  const handleSubmit = async (e) => {
    e.preventDefault()

    if(password.length<4){

      return setError('check the password')
    }

   

    await axios.post('/login', { email, password }).then((response) => {

      const data = response.data
      console.log(response.data)


      if (data.user) {

        const token = data.token;

        const decodetoken = jwt_decode(token)

        dispatch(login({ name: decodetoken.name, role: decodetoken.role, email:decodetoken.email,id:decodetoken.id, token }))
        console.log(decodetoken,'from login Component')
       
        navigate('/', { replace: true,state: { userLogin: true } })
      }else{
        setError(data.message);
      }

    })
  }



  return (
    <>
<div className='grid place-items-center h-96'>

       

              <div className='mt-40 w-56 h-72 rounded-xl flex flex-col items-center justify-center bg-gray-900  hover:shadow-gray-700 shadow-lg'>
              {error && <p className='text-red-500'>{error}</p>}
                <form onSubmit={handleSubmit}>
                  <div className='flex h-64 text-slate-300 justify-around items-center flex-col max-h-full'>
                    <div className='flex flex-col justify-start'>
                      <label htmlFor="">Email</label><br/>
                      <input className='bg-transparent outline-none border rounded-md border-slate-400'type="email" name="email" id="" onChange={(e) => setEmail(e.target.value)}  required  />
                      <br />
                      <label htmlFor="">Password</label><br/>
                      <input type="password" pattern=".{3,}" required className='bg-transparent outline-none border rounded-md border-slate-400' name='password' onChange={(e) => setPassword(e.target.value)} />
                      <br />
                    </div>
                    <div className="w-full flex items-center justify-around">
                      <button className='bg-blue-500 p-2 font-serif hover:bg-inherit text-sm' type='submit'>SignIn</button>
                      <Link to="/signup" className='font-thin text-sm underline'>Create an Account</Link>
                    </div>
                  </div>
                </form>
              </div>
          
        
      </div>
    </>
  )
}

export default Login

import React,{useEffect} from 'react'
import Login from '../../Components/Login/Login'
import { useNavigate } from 'react-router-dom';
import Spinner from '../../Components/Spinner/Spinner';




function LoginPage() {

  const navigate=useNavigate();

  const token = localStorage.getItem('token')
  
  useEffect(() => {
    console.log(token)
    if (token) {
      navigate('/', { replace: true })
    } else {
      navigate('/login',{ replace: true })
    }
  
  }, [token])
  return (
    <>
      {
        token ? (
          <Spinner />
        ) : (

          <>
            <Login />
          </>
        )
      }
    </>
  )
}

export default LoginPage

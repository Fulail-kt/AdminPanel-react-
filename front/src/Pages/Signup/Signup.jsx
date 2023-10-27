import React, { useEffect } from "react";
import Signup from "../../Components/Signup/Signup";
import {useNavigate} from 'react-router-dom'
import Spinner from "../../Components/Spinner/Spinner";

function SignupPage() {

  const navigate=useNavigate()

  const token=localStorage.getItem('token')

useEffect(()=>{

  if(token){
    navigate('/',{replace:true})
  }else{
    navigate('/signup')
  }
},[token])


  return (
    <>
      
    {token?(<Spinner/>):(
      <div>
    <Signup/>
  </div>
    )}
    
    </>
  )
}

export default SignupPage

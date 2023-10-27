import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from '../../Components/Navbar/Navbar';
import Table from '../../Components/Table/Table';
import jwtDecode from 'jwt-decode';




function User() {

  const navigate=useNavigate()

  const token=localStorage.getItem('token')

  useEffect(()=>{

    if(token){
      let decode=jwtDecode(token)
      if(decode.role!=='admin'){
        navigate('/',{replace:true})
        
      }else{
        
        navigate('/users',)
      }
    }else{
      navigate('/login')
    }
    },[token])
  return (
    <div>
      <Navbar />
      <Table/>
    </div>
  );
}

export default User;

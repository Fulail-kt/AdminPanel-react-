
import React,{useState} from 'react';
import jwtDecode from 'jwt-decode';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { logout } from '../../redux/authSlice';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';


function Navbar() {

  const navigate = useNavigate()
  const location = useLocation();
  const token = localStorage.getItem("token");
  const decode = jwtDecode(token);
  const role = decode.role;
  const dispatch = useDispatch();

  const handleClick = (e) => {
    e.preventDefault()


    Swal.fire({
      text: 'Are you sure you want to Logout?',
      width:'300px',
      showCancelButton: true,
    }).then((result)=>{

      if(result.isConfirmed){
        dispatch(logout({ name: null, email: null, }))

        localStorage.removeItem('token')
    
        navigate('/', { replace: true })

      }

    })

   
  }

  return (
    <div>
      <nav className="bg-gray-800">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
              <div className="hidden sm:ml-6 sm:block">
                <div className="flex space-x-4">
                  <Link to="/" className={`${location.pathname === '/' ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover-text-white'} rounded-md px-3 py-2 text-sm font-medium`} aria-current="page">
                    Dashboard</Link>
                  {role === 'admin' ? (<Link to="/users" className={`${location.pathname === '/users' ? 'bg-gray-900 text-white' : 'text-gray-300 hover-bg-gray-700 hover-text-white'} rounded-md px-3 py-2 text-sm font-medium`}>
                    Users
                  </Link>
                  ):(<Link to="/userinfo" className={`${location.pathname === '/userinfo' ? 'bg-gray-900 text-white' : 'text-gray-300 hover-bg-gray-700 hover-text-white'} rounded-md px-3 py-2 text-sm font-medium`}>
                  Userinfo
                </Link>)}
                  <Link  onClick={handleClick} className={`${location.pathname === '/logout' ? 'bg-gray-900 text-white' : 'text-gray-300 hover-bg-gray-700 hover-text-white'} rounded-md px-3 py-2 text-sm font-medium space-x-8`}>
                    Logout
                  </Link>
                 
                  {/* <Search/> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar;


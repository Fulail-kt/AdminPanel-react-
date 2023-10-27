import React, { useEffect, useState, useRef } from 'react'
import Navbar from '../../Components/Navbar/Navbar'

import axios from '../../Axios/Axios'
import jwtDecode from 'jwt-decode';


function UserInfo() {


    const imageInputRef = useRef(null)
    const [msg, setMsg] = useState('')
    const [userData,setUserData]=useState('')
    // const userData = useSelector((state) => state.auth);
    // // const { name, email, id } = userData;




    const token = localStorage.getItem('token');
    const decode=jwtDecode(token)
    const id=decode.id
    
    useEffect(() => {
        
        console.log(id)
        axios
        .get('/userInfo', {
          headers: {
            Authorization: `Bearer ${token}`,
            value:`${id}`
          },
        })
        .then((response) => {

            console.log(response.data)
           setUserData(response.data.userData) 
           console.log(userData.profile,"klklklklklklklklklklklklklklklkll")
         
        });
    }, [token]);


    // useEffect(() => {
    //     if (name && email) {
    //         setMsg('Profile');
    //     } else {
    //         setMsg('Error');
    //     }
    // }, [name, email, id]);

    const profileUpload = async (e) => {

        console.log("oooooooooooo")
        try {
            console.log(e.target)
            const file = e.target.files[0]; // Access the selected file using e.target.files[0]

            console.log(file,"777777777777777770")
            if (!file) return;
        
            const formData = new FormData();
            formData.append('file', file); // Use 'file' as the field name, which matches your server route
            formData.append('userId', id);
            console.log("oooooooooooo")
        
            axios.patch('/profileUpdate', formData, {
              headers: { 'Content-Type': 'multipart/form-data' }
            }).then((response) => {
                setUserData({ ...userData, profile: response.data.profile });
              alert(response.data.message);
            });
          } catch (error) {
            console.error(error);
          }
        }
    

    return (
        <>
            <Navbar />
            <div className='w-full h-96 grid place-items-center'>
                <div className='bg-teal-800 border h-56 w-56 flex justify-center items-center rounded-md p-2 shadow-zinc-950 shadow-2xl'>
                    <h2>{msg}</h2>
                    {userData && (
                        <div className='flex flex-col items-center text-left'>
                            
                            <input type="file" accept="image/*" style={{ display: 'none' }} onChange={profileUpload} ref={imageInputRef} />

                            <img
                                className='w-fit rounded-full h-32'
                                onClick={() => imageInputRef.current.click()}
                                src={userData.profile ? (`http://localhost:8008/images/${userData?.profile}`):('https://pixlok.com/wp-content/uploads/2021/03/default-user-profile-picture.jpg')}
                                alt="profile_pic"
                            />
                            <p>Username: {userData.name}</p>
                            <p>Email: {userData.email}</p>
                        </div>
                    ) }
                </div>
            </div>
        </>
    )
}

export default UserInfo

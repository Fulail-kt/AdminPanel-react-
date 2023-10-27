import React,{Fragment} from 'react';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import SignupPage from './Pages/Signup/Signup';
import LoginPage from './Pages/Login/Login';
import HomePage from './Pages/Home/Home';
import User from './Pages/User/User';
import UserInfo from './Pages/UserInfo/UserInfo';


function App() {
  return (
<Router>
    <Routes>
    <Route path="/" element={<HomePage/>}/>
      <Route path="/signup" element={<SignupPage/>}/>
      <Route path="/login"  element={<LoginPage/>}/>
      <Route path="/users"  element={<User/>}/>
      <Route path='/userinfo' element={<UserInfo/>}/>
    </Routes>
</Router>
  );
}

export default App;



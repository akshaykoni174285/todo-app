import React, {useState} from "react";
import axios from "axios";

import { useNavigate } from "react-router-dom";



const LoginPage = ()=>{
    const navigate = useNavigate();
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [error,setError] = useState('');


    const handleLogin = async (e) =>{
      e.preventDefault();
      try {
          const response = await axios.post('http://localhost:5000/api/auth/login',{
            email,
            password
          })
          console.log(response.data)

          localStorage.setItem('token',response.data.token)
          navigate('/dashboard/tasks')

      } catch (error) {
          setError(error.response.data.message)
      }
    };


    return(
      <div>
        <h2>Login</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Sign Up</button>
      </form>
      </div>
    )

}

export default LoginPage;
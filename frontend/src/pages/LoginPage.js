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


    return (
      <div className="Card">
          <div className="Form">
              <h2 className="Title_child">Login</h2>
              {error && <p>{error}</p>}
              <form onSubmit={handleLogin} className="form-child">
                  <input
                      type="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button 
                      type="submit" 
                      className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-200">
                      Login In
                  </button>
              </form>
          </div>
      </div>
  );

}

export default LoginPage;
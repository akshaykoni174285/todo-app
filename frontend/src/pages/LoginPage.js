import React, {useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';



const LoginPage = ()=>{
    const navigate = useNavigate(); // Initialize the navigate function

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    // const history = userHistory();

    const handleLogin = async (e)=>{
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/api/auth/login',{
                email,
                password
            });
            console.log(response.data); // Ensure the API response has the expected structure

            localStorage.setItem('token', response.data.token);  // Store JWT token in localStorage
            navigate('/dashboard')
            
        } catch (error) {
            setError(error.response.data.message); // Handle error from backend

        }

    }


    
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
        <button type="submit">Login</button>
      </form>

        </div>
    )
}

export default LoginPage;



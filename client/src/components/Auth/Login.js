import React, { useState } from 'react';
import { login } from '../../api';
import { jwtDecode } from 'jwt-decode'; // Incorrecto

import { useNavigate } from 'react-router-dom'; // Importar useNavigate para la redirección
import { Link } from 'react-router-dom'; // Importar Link para navegación

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // Estado para manejar errores
  const navigate = useNavigate(); // Instancia de useNavigate para redirigir

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Limpiar el error al iniciar el proceso de inicio de sesión
    try {
      const response = await login(email, password);
      const token = response.data.token;
      localStorage.setItem('token', token);

      // Decodificar el token
      const decodedToken = jwtDecode(token);
      const isAdmin = decodedToken.role === 'admin'; // Verificar si es admin

      // Redireccionar en base al rol
      if (isAdmin) {
        navigate('/admin'); // Redirige a /admin si es administrador
      } else {
        navigate('/'); // Redirige a la página de inicio si no es administrador
      }
    } catch (error) {
      // Manejar errores de autenticación
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message); // Mostrar mensaje de error desde la respuesta
      } else {
        setError('Error de autenticación, por favor intenta de nuevo.'); // Mensaje genérico
      }
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <div className="alert alert-danger">{error}</div>} {/* Mostrar mensaje de error */}
        <button type="submit" className="btn btn-primary">Login</button>
      </form>
      
      <p className="mt-3">
        ¿No tienes cuenta? <Link to="/signup">Regístrate aquí</Link> {/* Enlace a la página de registro */}
      </p>
    </div>
  );
};

export default Login;

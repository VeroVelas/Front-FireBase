import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../assets/img/logo.svg';
import '../assets/style/Login.css';

const Login = () => {
    const [isDarkMode, setIsDarkMode] = useState(true);
    const [ip, setIp] = useState('');
    const [password, setPassword] = useState('');
    const [confirmation, setConfirmation] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmation) {
            setError('Las contraseñas no coinciden.');
            return;
        }

        try {
            const response = await fetch(`http://${ip}:5000/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ip, password })
            });
            const data = await response.json();
            if (response.ok) {
                navigate('/inicio');
            } else {
                setError(data.error);
            }
        } catch (error) {
            setError('Error al conectar con el servidor.');
        }
    };

    return (
        <div className={`login-container ${isDarkMode ? 'dark-mode' : ''}`}>
            <header className="header">
                <img src={Logo} alt="Logo" className="logo" />
                <div className="toggle-switch">
                    <label className="switch-label">
                        <input
                            type="checkbox"
                            className="checkbox"
                            checked={isDarkMode}
                            onChange={toggleDarkMode}
                        />
                        <span className="slider"></span>
                    </label>
                </div>
            </header>
            <form className="login-form" onSubmit={handleSubmit}>
                <div className="titulo-login">Login</div>
                {error && <p className="error-message">{error}</p>}
                <div className="input-group">
                    <input
                        required
                        type="text"
                        name="ip"
                        autoComplete="off"
                        className="input"
                        value={ip}
                        onChange={(e) => setIp(e.target.value)}
                    />
                    <label className="user-label">IP: Base de datos</label>
                </div>
                <div className="input-group">
                    <input
                        required
                        type="password"
                        name="password"
                        autoComplete="off"
                        className="input"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <label className="user-label">Contraseña</label>
                </div>
                <div className="input-group">
                    <input
                        required
                        type="password"
                        name="confirmation"
                        autoComplete="off"
                        className="input"
                        value={confirmation}
                        onChange={(e) => setConfirmation(e.target.value)}
                    />
                    <label className="user-label">Confirmación</label>
                </div>
                <button type="submit" className="login-btn">Iniciar</button>
            </form>
            <footer className='footer'>
                <div className="person1">
                    <div className="name">Carlos Enrique Barriga Aguilar</div>
                    <div className="id">221188</div>
                    <div className="major">Ingeniería en software</div>
                </div>
                <div className="divider"></div>
                <div className="person2">
                    <div className="name">Veronica Velazco Jimenes</div>
                    <div className="id">221224</div>
                    <div className="major">Ingeniería en software</div>
                </div>
            </footer>
        </div>
    );
};

export default Login;

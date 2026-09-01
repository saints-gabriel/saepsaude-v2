import { useState, useRef, useEffect } from 'react';
import axios from 'axios';

import styles from '../styles/Globals.module.css';

export const Header = ({ user, setUser }) => {
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [error, setError] = useState('');
    const dialogRef = useRef(null);

    const checkLogin = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);

        try {
            setError('');
            const response = await axios.post('http://localhost:3000/usuarios/login', {
                email: formData.get('email'),
                password: formData.get('password'),
            });
            localStorage.setItem('usuario', JSON.stringify(response.data));
            setUser(response.data);
            closeLogin();
        } catch (error) {
            setError(error.response?.data?.error || 'Não foi possível realizar o login.');
        }
    };

    const logout = () => {
        localStorage.removeItem('usuario');
        setUser(null);
    };

    const login = () => {
        setIsLoginOpen(true);
    };

    const closeLogin = () => {
        setIsLoginOpen(false);
    };

    useEffect(() => {
        const dialog = dialogRef.current;
        if (!dialog) return;

        if (isLoginOpen) {
            dialog.showModal();
        } else {
            dialog.close();
        }
    }, [isLoginOpen]);

    const handleBackdropClick = (e) => {
        if (e.target === dialogRef.current) {
            closeLogin();
        }
    };

    return (
        <header className={styles.headerBut}>
            {user ? (
                <div className={styles.loggedUser}>
                    <span>Olá, {user.name}</span>
                    <button className={styles.loginBut} onClick={logout}>Sair</button>
                </div>
            ) : <button className={styles.loginBut} onClick={login}>Login</button>}

            <dialog
                ref={dialogRef}
                className={styles.loginModal}
                onClick={handleBackdropClick}
                onCancel={closeLogin}
            >
                <div className={styles.modalContent}>
                    <button className={styles.closeBut} onClick={closeLogin} aria-label="Fechar">
                        &times;
                    </button>

                    <h2>Entrar</h2>

                    <form onSubmit={checkLogin} className={styles.loginForm}>
                        <div className={styles.inputGroup}>
                            <label htmlFor="email">E-mail</label>
                            <input type="email" id="email" name="email" placeholder="seu@email.com" required />
                        </div>

                        <div className={styles.inputGroup}>
                            <label htmlFor="password">Senha</label>
                            <input type="password" id="password" name="password" placeholder="••••••••" required />
                        </div>

                        <button type="submit" className={styles.submitBut}>
                            Acessar
                        </button>
                        {error && <p role="alert">{error}</p>}
                    </form>
                </div>
            </dialog>
        </header>
    );
};
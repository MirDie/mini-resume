import React, {useContext, useState} from 'react';
import {TextField, Button, Typography, Box} from '@mui/material';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {useNavigate} from "react-router-dom";
import {AuthContext} from "../context/AuthContext";

const theme = createTheme({
    palette: {
        background: {
            default: 'linear-gradient(to bottom, #000000, #333333)',
        },

    },
    MuiTextField: {
        defaultProps: {
            size: 'small', // 设置输入框大小为小号
        },
    }
});

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useContext(AuthContext);
    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const navigate = useNavigate();
    const handleSubmit = (event) => {
        event.preventDefault();
        login({ username, password }, navigate('/edit-resume'));
    };


    return (
        <ThemeProvider theme={theme}>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: '100vh',
                    backgroundColor: '#a0cfe5',
                }}
            >
                <div style={{
                    backgroundColor: '#d9eaf7',
                    border: '1px solid #9fbacb',
                    padding: '2rem',
                    borderRadius: '8px',
                    maxWidth: '400px',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
                }}>

                    <Typography variant="h4" align="center" gutterBottom>
                        Mini Go Resume
                    </Typography>
                    <Typography variant="h6" align="center" gutterBottom>
                        登录
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="用户名"
                            variant="outlined"
                            fullWidth
                            value={username}
                            onChange={handleUsernameChange}
                            margin="normal"
                        />
                        <TextField
                            label="密码"
                            variant="outlined"
                            fullWidth
                            type="password"
                            value={password}
                            onChange={handlePasswordChange}
                            margin="normal"
                        />
                        <Button variant="contained" type="submit" fullWidth>
                            登录
                        </Button>
                    </form>
                </div>
            </Box>
        </ThemeProvider>
    );
};

export default LoginPage;

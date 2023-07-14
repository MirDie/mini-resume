import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import {Download} from "@mui/icons-material";
import html2pdf from 'html2pdf.js';
import {useContext} from "react";
import {AuthContext} from "../../../context/AuthContext";
import {useNavigate} from "react-router-dom";

function HeadBarComponent(params) {
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const {isLoggedIn, userInfo, logout} = useContext(AuthContext);
    const menuItems = []
    const navigation = useNavigate()
    if (isLoggedIn) {
        //退出登录
        const handleLogout = () => {
            logout()
        };
        //重置密码
        const handleResetPassword = () => {
        }
        menuItems.push(
            <MenuItem key={"logout"} onClick={handleLogout}>
                <Typography textAlign="center">退出登录</Typography>
            </MenuItem>
        )
        menuItems.push(<MenuItem key={"resetPassword"} onClick={handleResetPassword}>
            <Typography textAlign="center">重置密码</Typography>
        </MenuItem>)
    } else {
        const handleToLogin = (event) => {
            navigation('/login')
        }
        menuItems.push(
            <MenuItem key={"login"} onClick={handleToLogin}>
                <Typography textAlign="center">登录</Typography>
            </MenuItem>
        )
        menuItems.push(
            <MenuItem key={"resgister"} onClick={()=>navigation('/register')}>
                <Typography textAlign="center">注册</Typography>
            </MenuItem>
        )
    }
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };


    const handleDownload = () => {
        const element = document.getElementsByClassName('previewContainer')[0];
        console.log("element", element)
        let opt = {
            filename: '简历.pdf',
            jsPDF: {unit: 'in', format: 'A4', orientation: 'portrait'}
        };
        html2pdf().set(opt).from(element).save();
    };
    return (
        <AppBar position="static">
            <Container maxWidth={null}>
                <Toolbar>
                    <Box>
                        <Tooltip title={isLoggedIn ? userInfo && userInfo.email : "未登录"}>
                            <IconButton onClick={handleOpenUserMenu}>
                                <Avatar alt={isLoggedIn ? userInfo && userInfo.email : "未登录"}/>
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{mt: '45px'}}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {menuItems.map((item, index) => (item))}
                        </Menu>
                    </Box>
                    <Box fontSize={"1.5rem"} sx={{flexGrow: 0, display: {xs: 'none', md: 'flex'}}}>
                        <IconButton onClick={handleDownload}>
                            <Download></Download>
                        </IconButton>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default HeadBarComponent;
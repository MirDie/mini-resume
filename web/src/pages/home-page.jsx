import { styled } from '@mui/system';
import {Button} from "@mui/material";
import {Link} from "react-router-dom";
const Container = styled('div')({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    background: 'linear-gradient(to right, #212121, #000000)',
    color: '#fff',
});

const Content = styled('div')({
    textAlign: 'center',
});

const Heading = styled('h1')({
    fontSize: '48px',
    fontWeight: 'bold',
    marginBottom: '20px',
});

const Subheading = styled('h4')({
    fontSize: '24px',
    marginBottom: '40px',
});

const RegisterButton = styled(Button)({
    fontSize: '24px',
    color: '#fff',
    borderRadius: '4px',
    border: '2px solid #fff',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    marginRight: '20px',
});

const HomePage = () => {
    return (
        <Container>
            <Content>
                <Heading>Welcome to Simple Go Resume</Heading>
                <Subheading>This is a simple and creative resume template.</Subheading>

                <Link  to={`/edit-resume`}>
                    <RegisterButton to={`/edit-resume`} size="large">快速开始</RegisterButton>
                </Link>
                <Link to="/login">
                    <RegisterButton  size="large">登录</RegisterButton>
                </Link>
                <Link to={`/register`}>
                    <RegisterButton  size="large">注册</RegisterButton>
                </Link>

            </Content>
        </Container>
    );
};

export { HomePage };

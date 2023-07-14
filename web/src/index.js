import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import {BrowserRouter, createBrowserRouter} from "react-router-dom";
import {RouterProvider} from "react-router-dom";
import {HomePage} from "./pages/home-page.jsx";
import EditResumePage from "./pages/edit-resume";
import CssBaseline from "@mui/material/CssBaseline";
import reportWebVitals from './reportWebVitals';
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";
import App from "./App";
import axios from "axios";
import message from "./unit/message";


const router = createBrowserRouter([
    {
        path: "/",
        element: <App></App>,
        children: [
            {
                path: "/",
                element: <HomePage></HomePage>,
            },
            {
                path: "/edit-resume",
                element: <EditResumePage></EditResumePage>,
            },
            {
                path: "/login",
                element: <LoginPage></LoginPage>,
            },
            {
                path: "/register",
                element: <RegisterPage></RegisterPage>,
            }
        ]
    }
]);
axios.defaults.baseURL = '/api/v1/';
// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    if(response&&response.data.success){
        message.success({content: response.data.message})
    }
    else{
        message.error({content: response.data.message})
    }
    return response;
}, function (error) {
    console.log("interceptors.error", error);
    return error;
});

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <CssBaseline/>
        <RouterProvider router={router}/>
    </React.StrictMode>
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

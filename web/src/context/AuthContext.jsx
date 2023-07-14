import React, { createContext, useEffect, useState } from "react";
import localUnits from "../unit/localStorageUnits";
import axios from "axios";
import { formatUserInfoFromResponse } from "../unit/userInfoHelp";
import {useNavigate} from "react-router-dom";
import message from "../unit/message";
// 创建 AuthContext
export const AuthContext = createContext();

// 创建 AuthProvider，提供登录状态和登录方法
export const AuthProvider = ({ children }) => {
  const token = localUnits.getToken();
  if (token != null && token.length > 0) {
    axios.defaults.headers["Authorization"] = token;
  }
  const [isLoggedIn, setIsLoggedIn] = useState(
    Boolean(localUnits.getIsLogin())
  );
  const [userInfo, setUserInfo] = useState(localUnits.getUserInfo());

  const [resumeInfo, setResumeInfo] = useState(
    localUnits.getResumeInfo() || {
      email: "",
      username: "",
      college: "",
      intendedJob: "",
      qualification: "",
      phone: "",
      address: "",
      age: 0,
      sex: "",
      education: [],
      workExperience: [],
      technologyStack: [],
    }
  );
  const navigate = useNavigate();
  useEffect(() => {
    // 在组件加载时执行一次异步请求
    if (isLoggedIn) {
      axios.get("resume/" + userInfo.ID).then((response) => {
        console.log('response',response);
        if (response.status === 200 && response.data && response.data.success) {
          console.log("formatUserInfoFromResponse(response.data.data)",formatUserInfoFromResponse(response.data.data));
          setResumeInfo(formatUserInfoFromResponse(response.data.data));
        }
        if(response.status===401){
          setIsLoggedIn(false);
          setUserInfo(null);
          localUnits.removeIsLogin();
          localUnits.removeToken();
          localUnits.removeUserInfo();
          axios.defaults.headers["Authorization"] = null;
          navigate("/login");
        }
      }, error => {
        if(error.status===401){
          setIsLoggedIn(false);
          setUserInfo(null);
          localUnits.removeIsLogin();
          localUnits.removeToken();
          localUnits.removeUserInfo();
          axios.defaults.headers["Authorization"] = null;
          message.warning({
            content:"未登录"
          });
        }
      });
    }
  }, [userInfo,isLoggedIn,setResumeInfo,navigate]);
  
  const login = (userInfo, successCallback) => {
    axios
      .post("login", {
        username: userInfo.username,
        password: userInfo.password,
      })
      .then((response) => {
        if (response.data.success) {
          let token = response.headers["authorization"];
          // 登录逻辑，设置登录状态为 true
          setIsLoggedIn(true);
          setUserInfo(response.data.data);
          localUnits.setToken(token);
          localUnits.setIsLogin(true);
          localUnits.setUserInfo(response.data.data);
          axios.defaults.headers["Authorization"] = token;
          typeof successCallback == "function" &&
            successCallback &&
            successCallback();
        }
      });
  };
  const logout = () => {
    axios.post("logout").then((response) => {
      setIsLoggedIn(false);
      setUserInfo(null);
      localUnits.removeIsLogin();
      localUnits.removeToken();
      localUnits.removeUserInfo();
      axios.defaults.headers["Authorization"] = null;
    });
  };
  return (
    <AuthContext.Provider
      value={{ isLoggedIn, login, logout, userInfo, resumeInfo, setResumeInfo }}
    >
      {children}
    </AuthContext.Provider>
  );
};

import axios from "axios";

const TokenKey = 'token';
const IsLoginKey = 'isLogin';


 function getToken() {
    return localStorage.getItem(TokenKey);
}

 function setToken(token) {
    localStorage.setItem(TokenKey, token);
}

 function removeToken() {
    localStorage.removeItem(TokenKey);
}

 function getIsLogin() {
  return   localStorage.getItem(IsLoginKey);
}

 function setIsLogin(isLogin) {
    localStorage.setItem(IsLoginKey, isLogin);
}

function removeIsLogin() {
     localStorage.removeItem(IsLoginKey);
}

 function setUserInfo(userInfo) {
    localStorage.setItem('userInfo', JSON.stringify(userInfo));
}

 function getUserInfo() {
    return JSON.parse(localStorage.getItem('userInfo'));
}

 function removeUserInfo() {
    localStorage.removeItem('userInfo');
}

 function setResumeInfo(resumeInfo) {
    localStorage.setItem('resumeInfo', JSON.stringify(resumeInfo));
}

 function getResumeInfo() {
    return JSON.parse(localStorage.getItem('resumeInfo'));
}



const localUnits = {
     getToken,
     setToken,
     removeToken,
     getIsLogin,
     setIsLogin,
     setUserInfo,
     getUserInfo,
     removeUserInfo,
     setResumeInfo,
     getResumeInfo,
    removeIsLogin
}
export default  localUnits;
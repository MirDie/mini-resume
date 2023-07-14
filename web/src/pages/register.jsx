import React, { useState, useEffect } from "react";
import { TextField, Button, Box, Typography, Stack } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const RegisterPage = () => {
  const validationSchema = yup.object({
    email: yup.string().email("输入正确的邮箱格式").required("请输入邮箱"),
    code: yup
      .string()
      .matches(/[0-9]{6}/, "验证码格式错误")
      .required("请输入验证码"),
    password: yup.string().required("请输入密码"),
    repeatPassword: yup
      .string()
      .when("password", (password, schema) => {
        return schema.equals(password, "两次密码不相等");
      })
      .required("请输入重复密码"),
  });
  const RegisterFormik = useFormik({
    initialValues: {
      email: "",
      code: "",
      password: "",
      repeatPassword: "",
    },
    onSubmit: (values) => {
     
    },
    validationSchema: validationSchema,
  });

  const getFieldError = function (name) {
    let meta = RegisterFormik.getFieldMeta(name);
    return {
      error: meta.touched && !!meta.error,
      helperText: meta.touched && meta.error,
    };
  };
  const handleSendVerificationCode = () => {
    axios
      .post("/send-verification-code", { email: RegisterFormik.values.email })
      .then((response) => {
        if (response.data.success) {
          startCountdown();
        }
      });
  };
  const navigate = useNavigate();
  const handleRegister = () => {
    axios
      .post("/register", {
        email: RegisterFormik.values.email,
        verificationCode: RegisterFormik.values.code,
        password: RegisterFormik.values.password,
      })
      .then((response) => {
        console.log("response", response);
        if (response.data.success) {
          navigate("/login");
        }
      });
  };

  const [countdown, setCountdown] = useState(0);
  const [isCounting, setIsCounting] = useState(false);

  const startCountdown = () => {
    setCountdown(60); // 设置倒计时初始值
    setIsCounting(true); // 启动倒计时
  };

  useEffect(() => {
    let timer;
    if (isCounting && countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000); // 每秒减少倒计时时间
    } else if (countdown === 0) {
      setIsCounting(false); // 倒计时结束，停止计时
    }
    return () => clearTimeout(timer); // 清除计时器
  }, [countdown, isCounting]);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#a0cfe5",
      }}
    >
      <Box
        sx={{
          borderRadius: "4px",
          p: 2,
          maxWidth: "400px",
          mt: 3,
          backgroundColor: "#d9eaf7",
          border: "1px solid #9fbacb",
        }}
      >
        <Typography variant="h4" align="center" gutterBottom>
          Mini Go Resume
        </Typography>
        <Typography variant="h6" align="center" gutterBottom>
          注册
        </Typography>
        <TextField
          label="邮箱"
          {...RegisterFormik.getFieldProps("email")}
          {...getFieldError("email")}
          fullWidth
          margin="normal"
        />

        <Stack direction="row" spacing={2}>
          <TextField
            label={"验证码"}
            {...RegisterFormik.getFieldProps("code")}
            {...getFieldError("code")}
          ></TextField>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSendVerificationCode}
            disabled={isCounting}
            size={"small"}
            sx={{ height: "3.3rem", fontSize: "1rem" }}
          >
            {isCounting ? `(${countdown})` : "发送验证码"}
          </Button>
        </Stack>

        <TextField
          label="密码"
          fullWidth
          margin="normal"
          type="password"
          {...RegisterFormik.getFieldProps("password")}
          {...getFieldError("password")}
        />
        <TextField
          label="重复密码"
          {...RegisterFormik.getFieldProps("repeatPassword")}
          {...getFieldError("repeatPassword")}
          fullWidth
          margin="normal"
          type="password"
        />

        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          <Button
            variant="contained"
            color="primary"
            size={"large"}
            onClick={handleRegister}
          >
            注册
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default RegisterPage;

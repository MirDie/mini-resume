# Mini-Resume

Mini-Resume 是一个使用 Golang 编写的简单在线简历程序，项目分为前端和后端两部分。前端使用 React 和 MUI（Material-UI），后端使用 GORM、Gin 和 Viper 框架。

## 功能特点

- 👤 用户注册、登录功能,访客功能
- 📃 创建、编辑个人简历
- 🖥️ 在线预览简历
- 💾 生成 PDF 格式简历

## 技术栈

- 前端：React, MUI（Material-UI）
- 后端：Golang, GORM, Gin, Viper

## 开发环境

- Node.js 18.16.0 或更高版本
- Golang 1.19.4 或更高版本
- Mysql 数据库

## 安装步骤

### 前端

1. 克隆本仓库到本地：

   ```bash
   git clone https://github.com/your-username/mini-resume.git
   ```

2. 进入前端目录：

   ```bash
   cd mini-resume/web
   ```

3. 安装依赖:

   ```bash
   npm install
   ```

4. 启动前端:

   ```bash
   npm run start
   ```

5. 启动后端:

   ```bash
   go mod tidy
   go run main.go
   ```

# 使用官方 Node.js 镜像作为基础镜像
FROM node:16-alpine

# 设置工作目录
WORKDIR /usr/local/app-nest

# 复制 package.json 和 package-lock.json
COPY package*.json ./

# 安装项目依赖
RUN npm install

# 复制项目文件
COPY . .

# 构建应用
RUN npm run build

# 暴露端口
EXPOSE 3000

# 容器启动时运行的命令
CMD ["node", "dist/main"]
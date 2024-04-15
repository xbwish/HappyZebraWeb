# 基于node 版本
FROM node:16.13.2
# 设置环境为生产环境
ENV NODE_ENV=production
# 创建工作目录
RUN mkdir  /app
# 将打包的nuxt 文件拷贝到 目录/app
COPY . /app
# 设置工作目录
WORKDIR /app

# 暴露4000
EXPOSE 4000
ENTRYPOINT [ "node","./server/index.mjs" ]
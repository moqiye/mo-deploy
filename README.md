# mo-deploy

前端自动化部署服务，支持开发、测试、生产多环境配置。配置好后一键即可自动完成部署。

###### V1.0.2

- 增加部署完成后，自动删除部署包

###### V1.0.1

- 修复偶尔备份不生效的BUG

## 1 安装

全局安装 mo-deploy

```shell
npm install mo-deploy -g
```

本地安装 mo-deploy

```shell
npm install mo-deploy --save-dev
```

### 2 使用（以下代码都以全局安装为例）

#### 2.1 查看帮助

```shell
mo-deploy -h
```

#### 2.2 自动生成初始化配置文件（在项目目录下）

```shell
mo-deploy init # 或者使用简写 mo-deploy i
```

根据提示填写内容，会在项目根目录下生成 `mo-deploy.config.js` 文件，初始化配置只会生成 `dev` (开发环境)、`test` (测试环境)、`prod` (生产环境) 三个配置，再有其他配置可参考模板自行配置。

#### 2.3 手动创建或修改配置文件

在项目根目录下手动创建 `mo-deploy.config.js` 文件，复制以下代码按情况修改即可。

```javascript
module.exports = {
  projectName: 'mo-admin', // 项目名称
  privateKey: '',
  passphrase: '',
  cluster: [], // 集群部署配置，要同时部署多台配置此属性如: ['dev', 'test', 'prod']
  dev: {
    // 环境对象
    name: '开发环境', // 环境名称
    script: 'npm run build', // 打包命令
    host: '192.168.0.1', // 服务器地址
    port: 22, // 服务器端口号
    username: 'root', // 服务器登录用户名
    password: '123456', // 服务器登录密码
    distPath: 'dist', // 本地打包生成目录
    webDir: '/usr/local/nginx/html', // 服务器部署路径（不可为空或'/'）
    bakDir: '/usr/local/nginx/backup', // 备份路径 (打包前备份之前部署目录 最终备份路径为 /usr/local/nginx/backup/html.zip)
    isRemoveRemoteFile: true, // 是否删除远程文件（默认true）
    isRemoveLocalFile: true, // 是否删除本地文件（默认true）
    isRemoveRemoteZip: true, // 删除远程服务本次打包zip文件（默认true）
  },
  test: {
    // 环境对象
    name: '测试环境', // 环境名称
    script: 'npm run build:test', // 打包命令
    host: '192.168.0.1', // 服务器地址
    port: 22, // 服务器端口号
    username: 'root', // 服务器登录用户名
    password: '123456', // 服务器登录密码
    distPath: 'dist', // 本地打包生成目录
    webDir: '/usr/local/nginx/html', // 服务器部署路径（不可为空或'/'）
    bakDir: '/usr/local/nginx/backup', // 备份路径 (打包前备份之前部署目录 最终备份路径为 /usr/local/nginx/backup/html.zip)
    isRemoveRemoteFile: true, // 是否删除远程文件（默认true）
    isRemoveLocalFile: true, // 是否删除本地文件（默认true）
    isRemoveRemoteZip: true, // 删除远程服务本次打包zip文件（默认true）
  },
  prod: {
    // 环境对象
    name: '生产环境', // 环境名称
    script: 'npm run build:prod', // 打包命令
    host: '192.168.0.1', // 服务器地址
    port: 22, // 服务器端口号
    username: 'root', // 服务器登录用户名
    password: '123456', // 服务器登录密码
    distPath: 'dist', // 本地打包生成目录
    webDir: '/usr/local/nginx/html', // 服务器部署路径（不可为空或'/'）
    bakDir: '/usr/local/nginx/backup', // 备份路径 (打包前备份之前部署目录 最终备份路径为 /usr/local/nginx/backup/html.zip)
    isRemoveRemoteFile: true, // 是否删除远程文件（默认true）
    isRemoveLocalFile: true, // 是否删除本地文件（默认true）
    isRemoveRemoteZip: true, // 删除远程服务本次打包zip文件（默认true）
  },
  // 其它环境
  // xxx: {
  //   name: 'xx环境', // 环境名称
  //   script: 'npm run build:xxx', // 打包命令
  //   host: '192.168.0.1', // 服务器地址
  //   port: 22, // 服务器端口号
  //   username: '', // 服务器登录用户名
  //   password: '', // 服务器登录密码
  //   distPath: '', // 本地打包生成目录
  //   webDir: '', // 服务器部署路径（不可为空或'/'）
  //   bakDir: '', // 备份路径 (打包前备份之前部署目录 最终备份路径为 /usr/local/nginx/backup/html.zip)
  //   isRemoveRemoteFile: true, // 是否删除远程文件（默认true）
  //   isRemoveLocalFile: true, // 是否删除本地文件（默认true）
  //   isRemoveRemoteZip: true, // 删除远程服务本次打包zip文件（默认true）
  // }
}
```

#### 2.4 本地安装扩展

如果使用本地安装命令的话，可以在项目根目录下的 `package.json` 文件中 `scripts` 脚本中添加如下代码

```json
"scripts": {
  "serve": "vite",
  "build": "vite build",
  "deploy": "mo-deploy deploy",
  "deploy:dev": "mo-deploy deploy --mode dev",
  "deploy:test": "mo-deploy deploy --mode test",
  "deploy:prod": "mo-deploy deploy --mode prod"
}
```

然后使用下面代码也可以完成部署操作

```shell
npm run deploy:dev
```

#### 2.5 直接部署

注意：命令后面需要加 `--mode` 环境对象 （如：`--mode dev`）

```shell
mo-deploy deploy --mode dev # 或者使用 mo-deploy d --mode dev
```

输入 `Y` 确认后即可开始自动部署，看见如下提示说明部署完成

#### 2.6 集群部署 （在项目目录下）

注意：集群配置需要在 `mo-deploy` 中 配置 `cluster` 字段 （如：`cluster: ['dev', 'test', 'prod']`）

```shell
mo-deploy deploy # 或者使用 mo-deploy d
```

输入 `Y` 确认后即可开始自动部署，看见如下提示说明部署完成

#### 2.7 其它配置

如果不想把服务器密码保存在配置文件中，也可以在配置文件中删除 `password` 字段。在部署的时候会弹出输入密码界面。

如果不想在部署前执行打包命令，在配置文件中删除 `script` 字段即可。

如果需要部署前备份，在配置文件中配置 `bakDir` 字段，为空不会备份。ps: 服务器需要安装 zip 模块，。

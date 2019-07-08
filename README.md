## 项目目录
1. /server : 后台工程目录
   - /common : 公用方法、后台配置
   - /model : 数据库骨架(参照mongoose)
   - /router : 路由
   - api.js : API路由入口
   - app.js : 前端直接后台入口
----
2. /src : 前端工程目录
   - /common : 公用方法
   - /component : 公用组件
   - /config : 前端配置
   - /page : 前端分离页面
   - /pureComponent : 纯函数组件
   - /reducer : reducer注册入口
   - /static : 静态文件
----
3. 其他文件
   - postcss.config.js : postcss配置(参照postcss)
   - webpack.config.js : webpack配置(参照webpack)
   - rooter.jsx : 权限路由位置,页面注册
   - index.html : 根页面

## 配置方法

- 安装环境 ` Node.js v11.8.0 mongoDB v4.0.3 ` ，并确保mongoDB启动
- 进入项目根目录下输入命令 `npm install` 
- 修改后台配置文件
   - 若服务器使用https协议，请修改后台代码中所有http协议ip
   - 修改/server/src/common/config.js,
      - port : 前端直接后台运行端口
      - apiPort : api服务器运行端口
      - ip : 服务器主机ip地址
      - mongodb : mongodb数据库地址
      - cookieSecret : 数据库密钥
      - db : 项目数据库名
      - hmcKeyGen : 账户密码进行hmc加密时所需密钥
      - accessOrigin : 修改为域名，保证所有dns解析到的域名都有，此参数设置影响 ***Access-Control-Allow-Origin*** 配置，详情请参照。
- 修改前端配置文件
   - 修改/src/config/host.jsx 中 *prodHost* 下 *nodeHost* 为后台地址 修改方式参照 *nodeHost : "//118.24.39.81/getData"* 其中ip地址为服务器地址，若前端直接后台端口不为80，请在ip后添加端口。请保留/getData。
- 使用node启动app.js , api.js
- 项目根目录下输入命令 `webpack --mode production` , 打包完成后 , 若配置正确 , 可通过域名直接访问前端页面
- mongo配置
   - 向users(账户)表中插入超级管理员账户及密码 , 插入代码请参照 `db.users.insert({"username" : "账户名" , "password" : "密码，请注意此需为前端和后台联合加密后的字符串，并非明文，可在验证密码路由下，通过console.log打出后台加密后的密码" , "type" : "admin"})`
   - 向teachers(考官)表中插入基础计数代码,`db.teachers.insert({"id" : "count" , "num" : 0})`
   - 向airlines(航空公司)表中插入基础计数代码,`db.airlines.insert({"id" : "count" , "num" : 0})`

## 须知
代码有双版本，本版本为上线版代码，代码托管于公开平台github，请上线前务必修改数据库密钥，账户加密密码。
另一版代码为开发版本，可直接运行于开发电脑，参见[github地址](https://github.com/xxx407410849/PyhsicalExamination) master分支。



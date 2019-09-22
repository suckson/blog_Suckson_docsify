### npx是什么？和npm的关系？

!> 高处不胜寒

- npx是一个执行npm的工具，在npmV5.2引入的，提高npm的使用体验。简化了npm的大量步骤

###### 举例

 - 使用create-react-app创建一个react项目。

 ```bash
 npm install -g create-react-app
 create-react-app my-app
```

npx方式：

```bash
npx create-react-app my-app
```

这条命令会临时安装 create-react-app 包，命令完成后create-react-app 会删掉，不会出现在 global 中。下次再执行，还是会重新临时安装。

npx 会帮你执行依赖包里的二进制文件，之前我们可能会写这样的命令：

```bash
npm i -D webpack
./node_modules/.bin/webpack -v
```

如果你对 bash 比较熟，可能会写成这样：

```bash
npm i -D webpack`npm bin`/webpack -v
```

有了 npx，你只需要这样：

```bash
npm i -D webpack
npx webpack -v
```

也就是说 npx 会自动查找当前依赖包中的可执行文件，如果找不到，就会去 PATH 里找。如果依然找不到，就会帮你安装！npx 甚至支持运行远程仓库的可执行文件：
```bash
再比如 npx http-server 可以一句话帮你开启一个静态服务器！（第一次运行会稍微慢一些）
npx http-server
```
指定node版本来运行npm scripts：
```bash
npx -p node@8 npm run build
```

###### 主要特点:

1. 临时安装可执行依赖包，不用全局安装，不用担心长期的污染。
2. 可以执行依赖包中的命令，安装完成自动运行。
3. 自动加载node_modules中依赖包，不用指定$PATH。
4. 可以指定node版本、命令的版本，解决了不同项目使用不同版本的命令的问题。
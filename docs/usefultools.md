### 1.tldr
```bash
  tldr --update
  tldr --clear-cache
  tldr --list
  tldr xxx
```

### 2.cnmp
```bash
npm i -g cnpm --registry=https://registry.npm.taobao.org

cnpm xxxxx
```
or
```
npm i xxxx [-D | =S] --registry=https://registry.npm.taobao.org
```

### 3.nrm
```bash
npm install -g nrm
nrm ls
nrm use xxx
```
### 4.http-server
```bash
npm i http-server -g

hs -o -p 9999
```

### 5.json-server
```bash
npm i -g json-server

Create a db.json file
{
  "posts": [
    { "id": 1, "title": "json-server", "author": "typicode" }
  ],
  "comments": [
    { "id": 1, "body": "some comment", "postId": 1 }
  ],
  "profile": { "name": "typicode" }
}

json-server --watch db.json
```

### live-server
```bash
npm install -g live-server
```
### 6.nodemon

   ```
   npm i -g nodemon
   nodemon app.js
   see more detail on npm
   ```

### 7.gitbook
### 8.marked (markdown -> html)
### 9.path-to-regexp
### 10.serve
  ```bash
  npm i -g serve
  # -s 参数的意思是将其架设在 Single-Page Application 模式下
  # 这个模式会处理即将提到的路由问题
  serve -s dist
  ```
### 11.express-generator
### 12. webpack-bundle-analyzer
### 13. prerender-spa-plugin
### 14. [mock-server](https://segmentfault.com/a/1190000019218003)


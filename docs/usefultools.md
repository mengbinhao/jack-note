### 1.cnmp

   ```
   npm i -g cnpm --registry=https://registry.npm.taobao.org

   cnpm xxxxx
   ```
   or
   ```
   npm i xxxx [-D | =S] --registry=https://registry.npm.taobao.org
   ```

### 2.nrm
  ```
  npm install -g nrm
  nrm ls
  nrm use xxx
  ```
### 2.http-server

   ```
   npm i http-server -g

   hs -o -p 9999
   ```

### 3.json-server

   ```
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

### 4.nodemon

   ```
   npm i -g nodemon
   nodemon app.js
   see more detail on npm
   ```

### 5.gitbook

### 6.marked (markdown -> html)


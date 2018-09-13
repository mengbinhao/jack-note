1. cnmp

   ```
   npm install -g cnpm --registry=https://registry.npm.taobao.org
   
   cnpm xxxxx
   ```

2. http-server

   ```
   npm install http-server -g
   
   hs -o -p 9999
   ```

3. json-server

   ```
   npm install -g json-server
   
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

4. nodemon

   ```
   npm install -g nodemon
   nodemon app.js
   see more detail on npm
   ```

5. gitbook

6. nvm


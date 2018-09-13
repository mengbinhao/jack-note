1. steps

   ```
   npm install gitbook-cli -g
   
   mkdir xxx
   
   cd xxx
   
   gitbook init
   
   gitbook build
   
   gitbook serve
   ```

2. 介绍

   - README.md是书皮 

   - SUMMARY.md 是目录

     ># Summary
     >
     >- [Introduction](README.md)
     >- [第一章：xxxxxx](./redux/index.md)
     >  - [第一节：state 复习](./redux/1-state.md)
     >  - [第二节：你好 redux](./redux/2-hello-redux.md)

3. book.json

   ```
   {
       "root": "./docs"
   }
   ```

4.  

   ```
   add repository on github
   git clone git@yyy.git
   git init
   git add .
   git commit -m "first comment"
   git remote add origin git@yyy.git
   git push -u origin master
   ```

5. 
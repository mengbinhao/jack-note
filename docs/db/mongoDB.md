### MongoDB常用语句

1. find
    - 查询所有结果

    ```
    select * from article
    db.article.find()
    ```
    - 指定返回哪些键

    ```
    select title, author from article
    db.article.find({}, {"title": 1, "author": 1})
    ```
    - where条件

    ```
    select * from article where title = "mongodb"
    db.article.find({"title": "mongodb"})
    ```
    - and条件

    ```
    select * from article where title = "mongodb" and author = "god"
    db.article.find({"title": "mongodb", "author": "god"})
    ```
    - or条件

    ```
    select * from article where title = "mongodb" or author = "god"
    db.article.find({"$or": [{"title": "mongodb"}, {"author": "god"}]})
    ```
    - 比较条件

    ```
    select * from article where read >= 100;
    db.article.find({"read": {"$gt": 100}})
    ```
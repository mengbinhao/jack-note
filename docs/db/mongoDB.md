### Basic configuration
- 配置环境变量
    C:\Program Files\MongoDB\Server\3.2\bin
- 在c盘根目录
    - 创建一个文件夹 data
    - 在data中创建一个文件夹db
- 打开cmd命令行窗口
    - 输入 mongod 启动mongodb服务器
    - 32位注意：
        启动服务器时，需要输入如下内容
            mongod --storageEngine=mmapv1
    - mongod --dbpath 数据库路径 --port 端口号
- 再打开一个cmd窗口
    - 输入 mongo 连接mongodb ，出现 >
- 将MongoDB设置为系统服务
1. 在c盘根目录创建data
    - 在data下创建db和log文件夹
2. 创建配置文件
    - 在目录 C:\Program Files\MongoDB\Server\3.2 下添加一个配置文件mongod.cfg
3. 以管理员的身份打开命令行窗口
4. 执行如下的命令
```
sc.exe create MongoDB binPath= "\"C:\Program Files\MongoDB\Server\3.2\bin\mongod.exe\" --service --config=\"C:\Program Files\MongoDB\Server\3.2\mongod.cfg\"" DisplayName= "MongoDB" start= "auto"

sc.exe create MongoDB binPath= "\"mongod的bin目录\mongod.exe\" --service --config=\"mongo的安装目录\mongod.cfg\"" DisplayName= "MongoDB" start= "auto"
```
5. 启动mongodb服务

6. 如果启动失败，证明上边的操作有误，在控制台输入 sc delete MongoDB 删除之前配置的服务，然后从第一步再来一次

### 基本概念
- 数据库（database）
- 集合（collection）
- 文档（document）
  - 在MongoDB中，数据库和集合都不需要手动创建，当我们创建文档时，如果文档所在的集合或数据库不存在会自动创建数据库和集合
- 基本指令
    - show dbs
    - show databases
    - use 数据库名
    - db
    - show collections

### MongoDB常用语句

1. find(findOne()：除了只返回一个查询结果外，其与find()一样)
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

    select * from article where read >= 100 and read <= 200
    db.article.find({"read": {"$gte": 100, "lte": 200}})
    ```
    - in条件

    ```
    select * from article where author in ("a", "b", "c")
    db.article.find({"author": {"$in": ["a", "b", "c"]}})
    ```
    - like

    ```
    select * from article where title like "%mongodb%"
    db.article.find({"title": /mongodb/})
    ```
    - count

    ```
    select count(*) from article
    db.article.count()
    ```
    - 不等于

    ```
    select * from article where author != "a"
    db.article.find({ "author": { "$ne": "a" }})
    ```
    - sort

    ```
    select * from article where type = "mongodb" order by read desc
    db.article.find({"type": "mongodb"}).sort({"read": -1}) //升
    db.article.find({"type": "mongodb"}).sort({"read": 1}) //降
    ```

2. insert
    ```
    insert into article(title, author, content) values("mongodb", "tg", "haha")
    db.article.insert({"title": "mongodb", "author": "tg", "content": "haha"})
    ```

3. update

    - update `db.collection.update(query, update[, options] )`

        - query : 必选，查询条件，类似find中的查询条件。
        - update : 必选，update的对象和一些更新的操作符（如$,$inc...）等
        - options：可选，一些更新配置的对象。
            - upsert：可选，这个参数的意思是，如果不存在update的记录，是否插入objNew,true为插入，默认是false，不插入。
            - multi：可选，mongodb 默认是false,只更新找到的第一条记录，如果这个参数为true,就把按条件查出来多条记录全部更新。
            - writeConcern：可选，抛出异常的级别。
    ```
    update article set title = "mongodb" where read > 100
    db.article.update({"read": {"$gt": 100}}, {"$set": { "title": "mongodb"}})
    ```
    - save
    ```
    //如果集合中已经存在一个_id为123的文档，则更新对应字段;否则插入
    //如果更新对象不存在_id，系统会自动生成并作为新的文档插入
    db.article.save({_id: 123, title: "mongodb"})
    ```
    - 更新操作符
        - 更新特定字段（$set）
        ```
        update game set count = 10000 where _id = 123
        db.game.update({"_id": 123}, { "$set": {"count": 10000}})
        ```
        - 删除特定字段（$unset）
        ```
        db.game.update({"_id":123}, {"$unset": {"author":1}})
        ```
        - 递增或递减（$inc）
        ```
        //$inc对应的字段必须是数字，而且递增或递减的值也必须是数字
        db.game.update({"_id": 123}, { "$inc": {"count": 10}})
        ```
        - 数组追加（$push）
        ```
        //追加字段必须是数组。如果数组字段不存在，则自动新增，然后追加
        db.game.update({"_id": 123}, { "$push": {"score": 123}})
        db.game.update({"_id": 123}, {"$push": {"score": [12,123]}}) //一次追加多个
        ```
        - 一次追加多个元素（$pushAll）
        ```
        db.game.update({"_id": 123}, {"$pushAll": {"score": [12,123]}})
        ```
        - 追加不重复元素（$addToSet）
        ```
        //$addToSet类似集合Set，只有当这个值不在元素内时才增加
        db.game.update({"_id": 123}, {"$addToSet": {"score": 123}})
        ```
        - 删除元素（$pop）
        ```
        //$pop每次只能删除数组中的一个元素，1表示删除最后一个，-1表示删除第一个
        db.game.update({"_id": 123}, {"$pop": {"score": 1}})  // 删除最后一个元素
        db.game.update({"_id": 123}, {"$pop": {"score": -1}})  // 删除第一个元素
        ```
        - 删除特定元素（$pull）
        ```
        //删除数组score内值等于123的元素
        db.game.update({"_id": 123}, {"$pull": {"score": 123}})
        ```
        - 删除多个特定元素（$pullAll）
        ```
        //删除数组内值等于123或12的元素
        db.game.update({"_id": 123}, {"$pullAll": {score: [123,12]}})
        ```
        - 更新嵌套数组的值
        ```
        //使用数组下标（从0开始）
        {

            address: [{place: "nanji", tel: 123}, {place: "dongbei", tel: 321}]

        }
        db.game.update({"_id": 123}, {"$set": {"address.0.tel": 213}})

        //如果你不知道要更新数组哪项，我们可以使用$操作符（ $表示自身，也就是按查询条件找出的数组里面的项自身，而且只会应用找到的第一条数组项）
        //$就是查询条件{"address.place": "nanji"}的查询结果，也就是{place: "nanji", tel: 123}，所以{"address.$.tel": 123}也就是{"address.{place: "nanji", tel: 123}.tel": 123}
        db.game.update({"address.place": "nanji"}, {"$set": {"address.$.tel": 123}})
        ```
4. delete
    - 删除所有文档

    ```
    delete from article
    db.article.remove()
    ```
    - 删除指定文档

    ```
    delete from article where title = "mongodb"
    db.article.remove({title: "mongodb"})
    ```

5. MongoDB特有的语句
    1. 数组查询
        - 数组的普通查询
        ```
        //假如type是["mongodb", "javascript"]
        db.article.find({"type": "mongodb"})
        ```
        - 多个元素的查询
        ```
        //只有type数组同时存在mongodb和javascript才会匹配
        db.article.find({"type": {"$all": ["mongodb", "javascript"]}})
        ```
        - 限制数组长度查询
        ```
        //type必须是数组
        db.article.find({"type": {"$size": 2}})
        ```
        - 返回特定数量
        ```
        //当$slice的参数是一个时，表示返回的数量;当是一个数组时，第一个参数表示偏移量，第二个表示返回的数量
        db.article.find({"type": {"$slice": 1}}) // 返回第1个
        db.article.find({"type": {"$slice": -1}})  // 返回最后一个
        db.article.find({"type": {"$slice": [20, 10]}})  // 从第21个开始，返回10个，也就是21～30
        ```
        - 元素匹配
        ```
        //如果文档中有一个字段的值是数组，可以使用$elemMatch来匹配数组内的元素
        {

            kown: [{ a: 2, b: 4}, 10, { a: 4}, {b:10}]

        }
        //只有a=1且b>2才会匹配
        db.article.find({"kown": { "$elemMatch": {a: 1, b: {"$gt": 2}}}})
        ```
    2. 取模（$mod）
    ```
    //比如我们要匹配 read % 5 == 1
    b.article.find({"read": {$mod: [5, 1]}})
    ```
    1. 是否存在（$exists)
    ```
    db.article.find({"love": {"$exists": true}})
    db.article.find({"love": {"$exists": false}})
    ```
    1. 正则表达式
    ```
    db.article.find({"title": /mongodb/i})
    ```
    1. 类型查询 [see more](https://docs.mongodb.com/manual/reference/operator/query/type)
    ```
    //只有当comments的类型是数组才匹配
    db.article.find({"comments": {"$type": 4}})
    ```
    1. 内嵌文档
    ```
    {
        address: { name: "nanji" }
    }
    db.article.find({"address.name": "nanji"})

    //数组
    {
        comments: [{title: "mongodb"}, {title: "javascript"}]
    }
    db.article.find({"comments.title": "mongodb"})
    ```
    1. 取反
    ```
    //$not是元语句，即可以用在任何其他条件之上
    db.article.find({"author": {"$not": /mongodb/i}})
    ```

6. MongoDB常用方法
    1. 控制返回数量（limit） `db.article.find().limit(10)`
    2. 略过数量 `db.article.find().skip(5) //start from 6`
        ```
        //分页
        select * from article limit 10, 20
        db.article.find().skip(10).limit(20)
        ```
    3. 统计  `db.article.find().count()`
    4. 格式化  `db.article.find().pretty()`
    5. 删除集合  `db.article.drop() 当你要删除一个集合中的所有文档时，直接删除一个集合效率会更高`
### GET
    1. get
    2. delete
    3. head
    4. ...

### POST
    1. post
    2. put
    3. ...

### 区别

1. GET请求传递给服务器的内容一般没有POST传递给服务器的多
    > 原因：GET基于url地址问号传递参数来实现,POST基于设置请求主体来实现。各大浏览器都有url最大长度限制,超过部分浏览器会舍弃掉

    > POST理论上没有大小限制,一般项目中会做限制

2. GET很容易出现缓存(不可控),POST不会出现(除非特殊处理)
    > 原因：GET基于url地址问号传递参数来实现,POST基于设置请求主体来实现.

    > 通过添加random参数避免GET出现缓存

3. GET请求没有POST请求安全(POST只是相对)
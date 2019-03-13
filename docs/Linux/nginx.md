### Nginx
Nginx是一款轻量级的Web服务器，也是一款轻量级的反向代理服务器

### Nginx能干什么
1. 直接支持Rails和PHP的程序
2. 作为HTTP反向代理服务器
3. 作为负载均衡服务器
4. 作为邮件代理服务器
5. 帮助实现前端动静分离

### nginx在应用程序中的作用
- 解决跨域
- 请求过滤
- 配置gzip
- 负载均衡
- 静态资源服务器

### Nginx特点
高稳定、高性能、资源占用少、功能丰富、模块化结构、支持热部署

### nginx的安装

1. 安装依赖：

`yum -y install gcc zlib zlib-devel pcre-devel openssl openssl-devel`

2. 检查是否安装成功：`nginx -v`

3. start/stop nginx：

`/etc/init.d/nginx start`
`/etc/init.d/nginx stop`

4. 编辑配置文件  `/etc/nginx/nginx.conf`
### 正向代理
内网服务器主动去请求外网的服务的一种行为

```
server {
    #指定DNS服务器IP地址
    resolver 114.114.114.114;
    #指定代理端口
    listen 8080;
    location / {
        #设定代理服务器的协议和地址（固定不变）
        proxy_pass http://$http_host$request_uri;
    }
}
```

这样就可以做到内网中端口为8080的服务器主动请求到1.2.13.4的主机上，如在Linux下可以：

`curl --proxy proxy_server:8080 http://www.taobao.com/`

正向代理的关键配置：
> 1 resolver：DNS服务器IP地址
>
> 2 listen：主动发起请求的内网服务器端口
>
> 3 proxy_pass：代理服务器的协议和地址

### 反向代理
是指用代理服务器来接受客户端发来的请求，然后将请求转发给内网中的上游服务器，上游服务器处理完之后，把结果通过nginx返回给客户端。

```
server {
    #监听端口
    listen 80;
    #服务器名称，也就是客户端访问的域名地址
    server_name  a.xxx.com;
    #nginx日志输出文件
    access_log  logs/nginx.access.log  main;
    #nginx错误日志输出文件
    error_log  logs/nginx.error.log;
    root   html;
    index  index.html index.htm index.php;
    location / {
        #被代理服务器的地址
        proxy_pass  http://localhost:8081;
        #对发送给客户端的URL进行修改的操作
        proxy_redirect     off;
        proxy_set_header   Host             $host;
        proxy_set_header   X-Real-IP        $remote_addr;
        proxy_set_header   X-Forwarded-For  $proxy_add_x_forwarded_for;
        proxy_next_upstream error timeout invalid_header http_500 http_502 http_503 http_504;
        proxy_max_temp_file_size 0;
   }
}
```
这样就可以通过a.xxx.com来访问a项目对应的网站了，而不需要带上难看的端口号。

正向代理的关键配置：
> 1 server_name：代表客户端向服务器发起请求时输入的域名
>
> 2 proxy_pass：代表源服务器的访问地址，也就是真正处理请求的服务器（localhost+端口号）
### 透明代理
也叫做简单代理，意思客户端向服务端发起请求时，请求会先到达透明代理服务器，代理服务器再把请求转交给真实的源服务器处理，也就是是客户端根本不知道有代理服务器的存在。

### 负载均衡

将服务器接收到的请求按照规则分发的过程，称为负载均衡。负载均衡是反向代理的一种体现。

nginx实现负载均衡有几种模式：

1. 轮询：每个请求按时间顺序逐一分配到不同的后端服务器，也是nginx的默认模式。轮询模式的配置很简单，只需要把服务器列表加入到upstream模块中即可。

下面的配置是指：负载中有三台服务器，当请求到达时，nginx按照时间顺序把请求分配给三台服务器处理。
```
upstream serverList {
    server 1.2.3.4;
    server 1.2.3.5;
    server 1.2.3.6;
}
```

> ip_hash：每个请求按访问IP的hash结果分配，同一个IP客户端固定访问一个后端服务器。可以保证来自同一ip的请求被打到固定的机器上，可以解决session问题。

下面的配置是指：负载中有三台服务器，当请求到达时，nginx优先按照ip_hash的结果进行分配，也就是同一个IP的请求固定在某一台服务器上，其它则按时间顺序把请求分配给三台服务器处理。
```
upstream serverList {
    ip_hash
    server 1.2.3.4;
    server 1.2.3.5;
    server 1.2.3.6;
}
```
>　url_hash：按访问url的hash结果来分配请求，相同的url固定转发到同一个后端服务器处理。

```
upstream serverList {
    server 1.2.3.4;
    server 1.2.3.5;
    server 1.2.3.6;
    hash $request_uri;
    hash_method crc32;
}
```
> fair：按后端服务器的响应时间来分配请求，响应时间短的优先分配。

```
upstream serverList {
    server 1.2.3.4;
    server 1.2.3.5;
    server 1.2.3.6;
    fair;
}
```

而在每一种模式中，每一台服务器后面的可以携带的参数有：

- down: 当前服务器暂不参与负载
- weight: 权重，值越大，服务器的负载量越大。
- max_fails：允许请求失败的次数，默认为1。
- fail_timeout:max_fails次失败后暂停的时间。
- backup：备份机， 只有其它所有的非backup机器down或者忙时才会请求backup机器。

如下面的配置是指：负载中有三台服务器，当请求到达时，nginx按时间顺序和权重把请求分配给三台服务器处理，例如有100个请求，有30%是服务器4处理，有50%的请求是服务器5处理，有20%的请求是服务器6处理。

```
upstream serverList {
    server 1.2.3.4 weight=30;
    server 1.2.3.5 weight=50;
    server 1.2.3.6 weight=20;
}
```

如下面的配置是指：负载中有三台服务器，服务器4的失败超时时间为60s，服务器5暂不参与负载，服务器6只用作备份机。

```
upstream serverList {
    server 1.2.3.4 fail_timeout=60s;
    server 1.2.3.5 down;
    server 1.2.3.6 backup;
}
```

下面是一个配置负载均衡的示例（只写了关键配置）：
其中：
1. upstream serverList是负载的配置模块
2. server_name是客户端请求的域名地址
3. proxy_pass是指向负载的列表的模块

```
upstream serverList {
    server 1.2.3.4 weight=30;
    server 1.2.3.5 down;
    server 1.2.3.6 backup;
}

server {
    listen 80;
    server_name  www.xxx.com;
    root   html;
    index  index.html index.htm index.php;
    location / {
        proxy_pass  http://serverList;
        proxy_redirect     off;
        proxy_set_header   Host             $host;
   }
}
```
### 静态服务器
现在很多项目流行前后分离，也就是前端服务器和后端服务器分离，分别部署，这样的方式能让前后端人员能各司其职，不需要互相依赖，而前后分离中，前端项目的运行是不需要用Tomcat、Apache等服务器环境的，因此可以直接用nginx来作为静态服务器。

```
server {
    listen       80;
    server_name  www.xxx.com;
    client_max_body_size 1024M;
    location / {
        root   /var/www/xxx_static;
        index  index.html;
    }
}
```
静态服务器的关键配置：
> root：直接静态项目的绝对路径的根目录。
>
> server_name : 静态网站访问的域名地址
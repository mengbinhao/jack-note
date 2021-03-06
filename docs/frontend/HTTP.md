### 前置知识
我们知道，HTTP是基于TCP/IP协议的。属于TCP/IP 协议的一个子集，TCP/IP是互联网通信相关联的协议族的总称。了解TCP/IP协议族有助于我们更好的理解HTTP协议。
#### 1 分层管理
TCP/IP协议族主要分为:

- 应用层 :向用户提供应用服务时通信的活动。
- 传输层 :提供处于网络连接中的两台计算机之间的数据传输。
- 网络层 :网络层用来处理在网络上流动的数据包。
- 数据链路层 ：用来处理连接网络的硬件部分。
#### 2 TCP/IP传输流

![](./images/http-1.png)

举个栗子，客户端在应用层按规范发起了一个HTTP请求，然后由传输层（TCP）负责将报文分片，编序发给网络层，再由网络层增加目标服务器的mac地址，最终由链路层将请求发往目标机器。服务器在链路层接收到数据，按序往上层发送，一直到应用层。当传输到应用层，才能算真正接收到由客户端发送过来的 HTTP请求。

#### 3 URL 和 URI
- URI：统一资源标识符
- URL：统一资源定位符

URI是一个用于标识互联网资源名称的字符串，最常见的形式是统一资源定位符（URL），经常指定为非正式的网址。更罕见的用法是统一资源名称（URN），其目的是通过提供一种途径。用于在特定的命名空间资源的标识，以补充网址。
即URL和URN 都是 URI的子集，URI是一种抽象的概念，URL是URI的一种常见的具象表达形式。
#### 4 代理、网关、隧道的概念
##### 代理

代理是一种有转发功能的应用程序，它扮演了位于服务器和客户端“中间人”的角色，接收由客户端发送的请求并转发给服务器，同时也接收服务器返回的响应并转发给客户端。每次通过代理服务器转发请求或响应时，会追加写入 Via 首部信息。

    - 代理的分类：
        - 透明代理： 直接转发请求，不对请求做任何加工，反之则是非透明代理
        - 缓存代理： 将请求的资源缓存在代理服务器上，用于下次请求。
    - 代理的方式:
        - 正向代理 ：简单来说，正向代理就是对服务器透明，将不同用户的请求代理到某台服务器，服务器并不知道请求来自哪个用户。
        - 反向代理 ：反之，反向代理就是对用户透明，将用户的请求转发到服务器集群的某一台服务器，用户不知道自己访问的具体是哪台服务器。
    - 使用代理的好处：
        - 利用缓存技术减少网络带宽的流量。
        - 组织内部针对特定网站的访问控制，以获取访问日志为主要目的
##### 网关
网关的工作机制和代理十分相似，但是它可以使用非http协议与服务器、数据库进行通信，即是说，网关在收到来自客户端的http请求之后，可以直接与数据库连接，使用sql查询数据库。
##### 隧道
隧道的目的是确保客户端能与服务器进行安全的通信，本身不会去解析 HTTP 请求，也就是说，请求保持原样中转给之后的服务器，隧道会在通信双方断开连接时结束。隧道多用于相隔较远的两台服务器的安全通信。

### HTTP协议
#### 什么是HTTP？
##### 1 HTTP是一种属于应用层通信协议，它允许将超文本标记语言(HTML)文档从Web服务器传送到客户端的浏览器。
##### 2 报文的结构
HTTP请求的报文一般是由 协议行、可选的请求头部、请求体组成

- 请求：
1. Request line(请求方法、请求地址、HTTP协议版本号)
2. Request header(Cache头域、Client头域、Cookie/Login头域、Entity头域、Miscellaneous头域、Transport头域等, 浏览器的信息、接受的语言格式等一些浏览器的信息和想要发送给服务器的信息比如身份验证信息，**可选**)
3. 空行
4. Request body(发送服务器的数据、内容，**可选**，get方式没有请求主体)

- 回包：
1. Response line(HTTP协议的版本号、状态码、消息)
2. Response header(Cache头域、Cookie/Login头域、Entity头域、Miscellaneous头域、Transport头域、Location头域等, 服务器的信息以及服务器想要告诉浏览器的一些信息)
3. 空行
4. Response body(正常用户看到的内容)

##### 3 请求的过程
一个完整的HTTP请求过程如下：

- 用户在浏览器输入URL
- 域名解析（DNS的寻址）
- TCP三次握手
- 握手成功后建立TCP通道，发起HTTP请求
- 服务器响应HTTP请求，返回对应的响应报文
- 客户端开始解析渲染
  - 解析html文件，生成dom树
  - 解析css文件，生成style树
  - 结合dom树和style树，生成render tree
  - layout布局渲染
  - GPU像素绘制页面

##### 4 状态码

###### basic
形如200这样的状态码，这里的3位数字中第1位数字，通常表示响应的类别（会有一两个例外），大致可以分成以下几类

| status code | description                          |
| ----------- | ------------------------------------ |
| 1xx         | 请求正被处理                         |
| 2xx         | 请求成功处理                         |
| 3xx         | 请求需要附加操作，常见的例子如重定向 |
| 4xx         | 客户端出错导致请求无法被处理         |
| 5xx         | 服务端处理出错                       |

###### 2xx
- 200 OK
    表示请求已经被正常处理

- 204 NO Content

表示请求成功，但是响应的报文中不含实体主体。通常用于只需要客户端向服务端发送信息，而不需要接受新信息的情况使用

现在很常见的一种请求类型`option`，通常被用来做正式请求的预请求，这个请求**只需要确认后续的请求能不能通过，即只需要一个结果，而不需要返回其他内容**，这类请求成功时就会返回204

####### 206 Partial Content

只返回了请求资源的**部分**。这种情况必须提到提到一个请求头`Range`——在`http`的请求中，这个头部用来表示**范围请求**，例如:`'Range':byte=5001-10000 // 表示本次要请求资源的5001-10000字节的部分`

这种情况下，如果服务器接受范围请求并且成功处理，就会返回`206`,并且在响应的头部返回

`'Content-Range':bytes 5001-10000/10000 // 表示整个资源有10000字节，本次返回的范围为 5001-10000字节`

###### 3xx

- 301 Moved Permanently

资源被**永久**重定向了。这种情况下**响应**的头部字段`Location`中一般还会返回一个地址，用来表示要新地址

```bash
301 Moved Permanently
...
Location:`b.com`
...

//上述内容表示：亲，您请求的资源已经永久转移啦，这边建议您去新的地址b.com访问呢，以后也请直接访问新地址哦
```

- 302 Found

资源**临时**重定向了。和301的唯一区别就在于一个是临时，一个是永久,新HTTP版本307是临时重定向,一般用于负载均衡,一般图片请求经常出现302,单独的图片服务器)

```bash
02 Found
...
Location:`b.com`
...
//上述内容表示：亲，您请求的资源被临时转移啦，后面也有可能再次转移，所以这边建议您本次去新的地址b.com访问，以后的话还是先访问原来地址哦，有任何变化mm依然会热心为你解答
```

- 303 See Other

这个和302很像，但是有个细微区别是，除了会提示客户端去请求`Location`以外，还会要求请求要使用`Location`时使用`GET`方法

简单的说，实际的浏览器在处理301和302时，默认就会把原先的POST请求改为GET请求，所以实际上使用303的意义，单纯只是让语义化更清晰点。（303表示服务器**明确告诉**客户端，你要使用`GET`方法访问`location`;如果是302，就是仅仅告诉客户端要访问`location`,不限制方法，但是实际上客户端自己也会用`GET`方法访问。）

- 304 Not Modified

资源未改变，可直接使用缓存。

这种响应一般是`GET`请求中带有**附加条件**，例如请求头中含有`if-Match,if-Modified-Since`等（`if-Match`表示只请求带有特殊标记的资源，`if-Modified-Since`表示请求指定时间后未变更的资源，因为本文主要讲解状态码，所以不在此引入太多http头部的相关内容，这里是为了简单解释下**附加条件请求**的含义）。

这种情况下，服务端不会返回响应主体，含义就是：”从你上次访问以来这个资源都没变过哟，直接使用你本地的缓存就行啦“。从浏览器缓存中获取,一般不经常更新的文件或内容缓存到浏览器,减轻服务器压力,提高页面加载速度

304就是3xx里面的一个特例，因为它不算是一个重定向

- 307 Temporary Redirect

这个重定向是为了解决前面刚刚介绍的一个历史背景问题：`302`时浏览器默认会转用`GET`方法去请求`Location`，而如果是`307`， 含义就是严格限制不允许从`POST`转为`GET`，这个目前我在实际工作中很少遇到。

###### 4xx

4xx表示一般是客户端发生了错误

- 400 Bad Request

400的含义简单粗暴：“对不起，你的请求中有语法错误”，那具体是什么语法错误呢? 答案是 —— 不一定，一般来说响应报文里会有一些提示，例如：

```bash
哎呀，你多加了什么请求头，我不能接受呀”
“哎呀，你地址不是不是写错了，这个uri不存在啊”
“哎呀，你是不是请求方法错了，这个uri之只能用put而不是post”
...
```

- 401 Unauthorized

未经过认证。一般在后台系统之类的应用里，用户登录之后会获得一个身份认证信息，然后生成`mac`之类的信息，放在请求头的`Authorization`字段里，发送给服务端，如果这个认证信息有问题或者根本没发送，就会出现这个状态码

- 403 Forbidden

禁止访问也就是无权限访问。至于具体为什么禁止，服务器可以在响应内容的实体部分给出，当然也可以不给

- 404 Not Found

服务端没有找到所请求的资源

###### 5xx

5xx表明服务端发生了错误

- 500 Internal Server Error

- 503 Service Unavailable

##### 5 首部字段

首部字段一般分为4类：

- 通用字段（connection、via、cache-control、data等）
- 请求首部字段（accept-charset、accept-encoding、If-Modified-Since、Referer、User-Agent等）
- 响应首部字段（Age、ETag 、Server、Location 等）
- 实体首部字段（Allow 、Content-Type 、Expires 、Last-Modified等）

#### 特性
HTTP被设计之初，就以简易、灵活为目的。它的主要特性就是简易、灵活 、 无状态 、无连接、支持B/S模式。

##### 1 无状态的HTTP。
- 简介
    - 无状态是指：协议本身不保存状态，即每次请求，HTTP这一层都不对请求和响应之中的状态进行保存，后一次请求无法得知前一次请求的信息。
    - 优点是：由于不需要保存状态，对CPU和内存的资源消耗减少，协议可以更快的处理大量事务，可伸缩性也更强。
    - 存在的问题: 随着web应用的快速发展，web变得越来越复杂，这样的设计却对一些业务造成了严重的阻碍，比如说，一个购物网站，登陆后，每个页面都需要保持当前的登录态。而不是让用户每次发起请求都去登录一下。显然，HTTP无状态的特性无法实现状态的保留。于是，为了解决这个问题，cookie 和 session 技术应运而生。

- Cookie技术
    - 概念：Cookie 技术通过在请求和响应报文中写入 Cookie 信息来控制客户端的状态。
    - 如何工作：Cookie 会根据从服务器端发送的响应报文内的一个叫做 Set-Cookie 的首部字段信息，通知客户端保存 Cookie。当下次客户端再往该服务器发送请求时，客户端会自动在请求报文中加入 Cookie 值后发送出去。服务器端发现客户端发送过来的 Cookie 后，会去检查究竟是从哪一个客户端发来的连接请求，然后对比服务器上的记录，最后得到之前状态信息。
    - 缺点： Cookie存在长度和数量的限制，每个domian不能超过20条，每条不能超过4kb，从安全性的角度来说，cookie容易被盗用，偷盗者无需知道Cookie中每个字段的意义，只需要透传cookie就能达到

- Session 技术
    - 概念： Session是在服务端保存的一个数据结构，用来跟踪用户的状态，这个数据可以保存在集群、数据库、文件中。
    - 如何工作：session 由服务端存储，在一次登陆操作后，服务器将登陆的账户信息等作为一个session 写入在特定等文件里，在回包报文中使用set-cookies为客户端设置sessionId，最终，客户端在发送下一次请求的时候，会带上session信息，从而达到状态保存的目的。所以，当客户端禁用了cookie，sessoin也无法工作

- 其他的认证技术-token
    - token验证的大致过程是：客户端和服务器端约定了一种特定的加密方式，比如以cookie中的某个字段通过特定的位运算，加密编码成一串字符串。最终在请求中作为参数传递给服务器，服务器在收到请求时，再使用同样的加密方式，获取加密串，与传过来的参数进行对比。从而达到身份认证的关系。由于同源的关系，cookie无法被盗取，而加密手段也是自定义的，从而保证了安全性。

##### 2 无连接的HTTP
- 简介：

无连接是指每一次请求结束后都会断开TCP连接。在web技术高速发展的今天，每个页面需要请求的资源都日益增多，而每次请求都需要重新建立TCP连接，这显然极大的增加了无意义的通信开销。于是，Keep-Alive 被提出，以解决TCP无法复用的问题。

- Keep-Alive:
    - Keep-Alive 其实就是在协议头里面设置 Connection： Keep-Alive , 表示当前连接是持久化的，持续时间有服务器控制，在没有接收到关闭信号时，TCP连接不会断开，这样避免了重复建立TCP请求的无用耗时。
    - keep-Alive 对应PC端的帮助很大，但在APP端，请求比较分散，且时间跨度大，将keep-Alive的时间设置为很大显然是不合理的。所以，一般会寻求其他的长连接方案和伪长连接方案。这个下文会详细介绍。

- 存在的缺陷：

HTTP是一个优秀的协议，但是仍然存在着一些缺陷：

- 数据明文传输，容易被窃听
- 不验证通信方的身份，因此有可能遭遇伪装
- 无法证明报文的完整性，所以有可能已遭篡改
但是，程序员的智慧是无穷的，既然不安全，那就让它安全，于是，HTTPS就诞生了。

### HTTPS
#### 什么是HTTPS？
HTTPS是 HTTP+ SSL +TLS 的产物，用于对通信的加密、认证、完整性保护。它并不是一种新的协议，而是HTTP的某些部分由SSL和TLS代理。

![](./images/http-2.png)
#### HTTPS如何保证通信安全（原理）?
- 原理

我们先来了解一下常用的两种加密方式：

- 对称加密： 加密和解密都是用同一把密钥。
- 非对称加密： 加密和解密是两把不同的密钥。
HTTPS 使用混合加密机制，即先通过非对称加密交换通信密钥，拿到密钥后再使用对称加密的方式进行后续的通信。但是如何保证第一步中，客户端获取到的公共密钥是正确的呢？这时候，就需要用到我们的数字证书了。

证书是由第三方机构提供认证的，服务器先去第三方机构申请公共密钥，然后会获得公共密钥和使用第三方数字签名，在非对称加密的过程中，将数字证签名和包含的公共密钥一起发给客户端，客户端通过第三方机构的公共密钥对证书上的签名进行验证，一旦通过，则说明公共密钥是正确的。
![](./images/http-3.png)

- 请求过程

下面看看具体的安全通信建立过程：

![](./images/http-4.png)
1. 客户端发起client hello 报文， 携带客户端支持的ssl版本、加密相关的约定（密钥长度和加密算法）。
2. 服务器响应 server hello 报文， 表示可以进行ssl通信，并携带相关加密约定。
3. 服务器发送 certificate 报文, 携带了公共密钥的证书。
4. 服务器发送 server hello done，表示最初的ssl协商部分结束。
5. 客户端发起 Client Key Exchange 报文，并携带使用第一阶段协商之后得到的Pre-master

secret加密随机串（对称密钥）。

1. 客户端发起 Change Cipher Spec 报文，表示之后的请求将使用Pre-master secret进行加密通信
2. 客户端发送 Finished 报文。该报文包含连接至今全部报文的整体校验值。这次握手协商是否能够成功，要以服务器是否能够正确解密该报文作为判定标准。
3. 服务器发送 Change Cipher Spec 报文，表示解密成功，下面将使用协商的密钥进行安全通信。
4. 服务器发送 Finished 报文，至此，一个安全的通信已经简历。
5. 应用层协议通信，即发送 HTTP 响应。
6. 最后由客户端发送 close_notify 报文断开连接。

#### HTTPS存在的缺陷
##### 历史痛点
HTTP1.0 时代最大的两个问题就是：
- 连接无法复用 : 每次请求都需要重新建立tcp通道，经历三次握手的过程。
- 队头阻塞：请求通道如一个独木桥，多个请求一起发出，只能先等第一个请求获得回包之后才能开始第二个请求，否则就只能排队等候。

那些年的解决之道：

1. 解决连接无法复用：

**基于tcp的长链接:**
一般APP会基于TCP造一个长连接的通信协议，门槛较高，但是一旦完成，带来的回报也是非常大的。信息的推送和更新变得及时，且在一些请求爆发点，相较于传统HTTP重复建立请求的耗时，也能减轻服务器的压力。现在业界的成熟方案如：google的protobuf。

**http long-polling:**
long-polling请求就是在客户端初始化的时候发起一个polling请求到服务器，然后请求一直等待中，当服务器有资源更新的时候，再返回数据，数据放回时，再次发起一个polling请求继续监听。当然，polling请求也有一些缺陷，比如 长时间的连接会增加服务器压力，复杂的业务场景下需要考虑如何才能建立健康的请求通道等。此外，这种方式有个致命的缺陷是：数据通信是单向的，主动权在服务端这边，客户端只能根据服务端被动的接受数据，有新的业务请求的时候无法及时传送。

**http streaming:**
与http-polling 不同的是， http-streaming 在初始化的的时候就发起一个不会断开的请求，持续监听服务器的回包，服务器有数据更新时就通过这个请求通道返回数据。此种方式跟http-polling一样是单向的，streaming是通过在server response的头部里增加”Transfer Encoding: chunked”来告诉客户端后续还会有新的数据到来。当然，streaming 也有缺陷: 业务数据无法按照请求来做分割，所以客户端没收到一块数据都需要自己做协议解析，也就是说要做自己的协议定制。

**websocket:**
WebSocket和传统的tcp socket连接相似，也是基于tcp协议，提供双向的数据通道。WebSocket优势在于提供了message的概念，比基于字节流的tcp socket使用更简单，同时又提供了传统的http所缺少的长连接功能。websocket 一般在数据需要实时更新的场景中使用。

2. 解决队头阻塞:

**http pipelining（管线化）**
管线化的前提是长连接的建立，keep-alive的多个请求使用同一个tcp连接使请求并行成为可能，pipelining与传统的请求可以形象的比喻为 串行和并行 ， 多个请求同时发起，无需等待上一个请求的回包。但是它并不是救世主，也存在着缺陷：

- pipelining只适用与HTTP1.1，并且需要服务器端支持
- 队头阻塞的问题并没有根本的解决，因为服务端要响应要遵循先进先出的原则，第一个请求的回包发出之后，才会响应第二个请求。

#### 新的改变(HTTP2)

HTTP1.0和1.1的普及程度使得HTTP2必须得在不改变原有方式的情况下解决上述问题，即HTTP2 并不能像angular2那样放飞自我。所以，HTTP2的使用方式和原来的差不多，HTTP2的改变相当之多，这里主要讲一下对我们影响较大的几点：

##### 二进制

http2.0的协议解析决定采用二进制格式，实现方便且健壮。每一个请求都有这些公共字段：Type, Length, Flags, Steam Identifier和frame payload。http2.0的格式定义更接近tcp层的方式，length定义了整个frame的开始到结束，type定义frame的类型（一共10种），flags用bit位定义一些重要的参数，stream id用作流控制，剩下的payload就是request的正文了。

![](./images/http-5.png)

##### 多路复用
多路复用是HTTP2.0主要解决的一个问题，一个request对应一个stream并分配一个id，这样一个连接上可以有多个stream，每个stream的frame可以随机的混杂在一起，接收方可以根据stream id将frame再归属到各自不同的request里面。

##### 头部压缩
无状态的HTTP导致每次请求都需要携带服务器所需要的参数，而一些头部信息基本上是固定的，这部分重复的信息刚好可以用于压缩，减少报文体积。

##### 连接重置
HTTP 1.1的有一个缺点是：当一个含有确切值的Content-Length的HTTP消息被送出之后，你就很难中断它了。当然，通常你可以断开整个TCP链接（但也不总是可以这样），但这样导致的代价就是需要重新通过三次握手建立一个新的TCP连接。一个更好的方案是只终止当前传输的消息并重新发送一个新的。在http2里面，我们可以通过发送RST_STREAM帧来实现这种需求，从而避免浪费带宽和中断已有的连接。

##### 依赖与优先级
每个流都包含一个优先级，优先级被用来告诉对端哪个流更重要。从而实现资源的有效分配。

##### 服务器推送
当一个客户端请求资源X，而服务器知道它很可能也需要资源Z的情况下，服务器可以在客户端发送请求前，主动将资源Z推送给客户端。这个功能帮助客户端将Z放进缓存以备将来之需。

##### 流量控制
http2上面每个流都拥有自己的公示的流量窗口，它可以限制另一端发送数据。

### 总结：
HTTP 虽然只有2个版本，但是每个版本所包含的改动是非常之大的。所做出的突破和尝试也是非常多的，当然，HTTP也有竞争者，比如在HTTP2还未提出时，由google提出并推行的SPDY协议，它的优势在于解决了HTTP1.0的不能多路复用的问题，对资源请求速度有极大的提升，目前在市场上仍然有许多的使用量，HTTP2也是借鉴了很多SPDY的特性。再比如quic协议，是号称比HTTP2更快的协议。这个在下一篇文章中会重点介绍~ 哈！主要是这篇有点长了。
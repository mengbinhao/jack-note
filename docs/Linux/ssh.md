### SSH登录

#### 基本用法

- `ssh user@hostname`    hostname: IP地址或域名

第一次登录时会提示：

> The authenticity of host '123.57.47.211 (123.57.47.211)' can't be established.
> ECDSA key fingerprint is SHA256:iy237yysfCe013/l+kpDGfEG9xxHxm0dnxnAbJTPpG8.
> Are you sure you want to continue connecting (yes/no/[fingerprint])?

输入`yes`，然后回车即可
这样会将该服务器的信息记录在本地终端机器上的`~/.ssh/known_hosts`

然后输入密码即可登录到远程服务器中

默认登录端口号为`22`。如果想登录某一特定端口

`ssh user@hostname -p 22`

#### 本地终端配置文件

创建文件`~/.ssh/config`

```bash
Host myserver1
    HostName IP地址或域名
    User 用户名

Host myserver2
    HostName IP地址或域名
    User 用户名
```

之后可以直接使用别名myserver1、myserver2

#### 密钥登录

本地终端创建密钥：`ssh-keygen` 然后一直回车即可

执行结束后，`~/.ssh/`目录下会多两个文件

- id_rsa：私钥
- id_rsa.pub：公钥

之后想免密码登录哪个服务器，就将公钥传给哪个服务器即可

例如: 想免密登录myserver服务器。则将公钥中的内容，复制到服务器上的`~/.ssh/authorized_keys`

也可以使用命令一键添加公钥 `ssh-copy-id aliasServer`

#### 服务器执行命令

```bash
ssh user@hostname command

ssh user@hostname ls -a

# 单引号中的$i可以求值
ssh myserver 'for ((i = 0; i < 10; i ++ )) do echo $i; done'
```

### scp传文件

#### 基本用法

```bash
scp source destination

# 一次复制多个文件
scp source1 source2 destination

# 复制文件夹
# 将本地家目录中的tmp文件夹复制到myserver服务器中的/home/acs/目录下
scp -r ~/tmp myserver:/home/acs/

# 将本地家目录中的tmp文件夹复制到myserver服务器中的~/homework/目录下
scp -r ~/tmp myserver:homework/

# 将myserver服务器中的~/homework/文件夹复制到本地的当前路径下
scp -r myserver:homework .

# 指定服务器的端口号
scp -P 22 source1 source2 destination
```

#### 使用scp配置其他服务器的vim和tmux

`scp ~/.vimrc ~/.tmux.conf myserver:`
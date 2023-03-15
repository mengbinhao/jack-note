### [阿里云](https://www.aliyun.com/)

```bash
# 1 创建工作用户acs并赋予sudo权限
ssh root@xxx.xxx.xxx.xxx  # xxx.xxx.xxx.xxx替换成新服务器的公网IP

# 2 创建acs用户
adduser acs  # 创建用户acs
usermod -aG sudo acs  # 给用户acs分配sudo权限

# 3 配置免密登录方式

# 4 配置新服务器的工作环境
scp .bashrc .vimrc .tmux.conf server_name:  # server_name需要换成自己配置的别名

# 5 安装tmux和docker
sudo apt-get update
sudo apt-get install tmux

# 6 打开tmux(养成好习惯，所有工作都在tmux里进行，防止意外关闭终端后，工作进度丢失)

# 7 然后在tmux中根据docker安装教程安装docker
```

### docker教程

#### 将当前用户添加到docker用户组

为了避免每次使用docker命令都需要加上sudo权限，可以将当前用户加入安装中自动创建的docker用户组,[官方文档](https://docs.docker.com/engine/install/linux-postinstall/)

```bash
sudo usermod -aG docker $USER
```

#### images

```bash
# 拉取一个镜像
docker pull ubuntu:20.04

# 列出本地所有镜像
docker images

# 删除镜像ubuntu:20.04
docker rmi ubuntu:20.04

# 创建某个container的镜像
docker [container] commit CONTAINER IMAGE_NAME:TAG

# 将镜像ubuntu:20.04导出到本地文件ubuntu_20_04.tar中
docker save -o ubuntu_20_04.tar ubuntu:20.04

# 将镜像ubuntu:20.04从本地文件ubuntu_20_04.tar中加载出来
docker load -i ubuntu_20_04.tar
```

#### container

```bash
# 利用镜像ubuntu:20.04创建一个容器
docker [container] create -it ubuntu:20.04

# 查看本地的所有容器
docker ps -a

# 启动容器
docker [container] start CONTAINER

# 停止容器
docker [container] stop CONTAINER

# 重启容器
docker [container] restart CONTAINER

# 创建并启动一个容器
docker [container] run -itd ubuntu:20.04

# 进入容器
docker [container] attach CONTAINER
### 先按Ctrl-p，再按Ctrl-q可以挂起容器
### 先按Ctrl-p，再按Ctrl-q可以挂起容器

# 在容器中执行命令
docker [container] exec CONTAINER COMMAND

# 删除容器
docker [container] rm CONTAINER

# 删除所有已停止的容器
docker container prune

# 将容器CONTAINER导出到本地文件xxx.tar中
docker export -o xxx.tar CONTAINER

# 将本地文件xxx.tar导入成镜像，并将镜像命名为image_name:tag
docker import xxx.tar image_name:tag

# docker export/import与docker save/load的区别
#     export/import会丢弃历史记录和元数据信息，仅保存容器当时的快照状态
#     save/load会保存完整记录，体积更大

# 查看某个容器内的所有进程
docker top CONTAINER

# 查看所有容器的统计信息，包括CPU、内存、存储、网络等信息
docker stats

# 在本地和容器间复制文件
docker cp xxx CONTAINER:xxx 或 docker cp CONTAINER:xxx xxx

# 重命名容器
docker rename CONTAINER1 CONTAINER2

# 修改容器限制
docker update CONTAINER --memory 500MB
```

### 实战



```bash
# 1 进入AC Terminal

# 2 将镜像上传到自己租的云端服务器
scp /var/lib/acwing/docker/images/docker_lesson_1_0.tar server_name:

# 3 登录自己的云端服务器
ssh server_name

# 4 将镜像加载到本地
docker load -i docker_lesson_1_0.tar

# 5 创建并运行docker_lesson:1.0镜像
docker run -p 20000:22 --name my_docker_server -itd docker_lesson:1.0

# 6 进入创建的docker容器
docker attach my_docker_server

# 7 设置root密码
passwd

# 8 去云平台控制台中修改安全组配置，放行端口20000

# 9 返回AC Terminal，即可通过ssh登录自己的docker容器
ssh root@xxx.xxx.xxx.xxx -p 20000  # 将xxx.xxx.xxx.xxx替换成自己租的服务器的IP地址

# 10 创建工作账户acs

# 11 配置docker容器的别名和免密登录
```

### 修改软件源

若`apt-get`下载软件速度较慢，修改软件源

Ubuntu 的软件源配置文件是 `/etc/apt/sources.list`。将系统自带的该文件做个备份，将该文件替换为下面内容，即可使用 TUNA 的软件源镜像

```bash
# 默认注释了源码镜像以提高 apt update 速度，如有需要可自行取消注释
deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ focal main restricted universe multiverse
# deb-src https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ focal main restricted universe multiverse
deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ focal-updates main restricted universe multiverse
# deb-src https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ focal-updates main restricted universe multiverse
deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ focal-backports main restricted universe multiverse
# deb-src https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ focal-backports main restricted universe multiverse
deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ focal-security main restricted universe multiverse
# deb-src https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ focal-security main restricted universe multiverse
```




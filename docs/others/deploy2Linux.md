#### 1 Build Linux server

1. install VirtualBox-5.2.12-122591-Win 
2. install [Ubuntu Server 14.04 LTS ](http://www.ubuntu.com/download/server) through iso in VirtualBox

#### 2 Use Linux server

##### 	1 基本操作

```
sudo apt-get update  --> update source first
sudo apt-get install/remove xxx

dpkg -l|grep openssh-server -> check if install xxxx
ps -aux | grep xxxx  -> check process

ifconfig --> check IP
shutdown -r now --> reboot
```

##### 	2 use ssh

```
sudo apt-get install openssh-server  -> ssh can connect to server
sudo service ssh start
ps -aux | grep ssh
//set 桥接网卡 ping ip for test
//MobaXterm_Personal 连接 IP + username
optional: (在linux内的终端内配置IP地址,配置的IP地址应与宿主机在一个网段内,子网掩码,port，防火墙)
```

##### 	3 Nginx：高性能Web服务器+负责反向代理

##### 	4 Supervisor：监控服务进程的工具

##### 	5 MySQL
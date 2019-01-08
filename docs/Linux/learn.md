### concept
![](./images/learn-1.png)

![](./images/learn-2.png)

### Linux学习阶段
1. linux环境下的基本操作命令,包括文件操作命令(rm mkdir chmod, chown) 编辑工具使用(vi vim)linux 用户管理(useradd userdel usermod)等
2. linux的各种配置(环境变量配置,网络配置,服务配置)
3. linux下如何搭建对应语言的开发环境(大数据,JavaEE, Python 等)
4. 能编写shell脚本,对Linux服务器进行维护
5. 能进行安全设置,防止攻击,保障服务器正常运行,能对系统调优
6. 深入理解Linux系统(对内核有研究),熟练掌握大型网站应用架构组成、并熟悉各个环节的部署和维护方法

### install vm + CentOS
1. install vm
2. BIOS设置开始虚拟化技术
3. create virtual machine
4. setting virtual machine
   1. ROM  2G+
   2. CPU
   3. Network
    ![](./images/learn-3.png)
5. install centOS
   1. 分区(至少3个分区)
    ![](./images/learn-4.png)


### vmtools
#### requirement
1. 可以直接粘贴命令在windows和centos系统之间
2. 可以设置windows和centos的共享文件夹

#### install vmtools
1. 进入centos
2. 点击vm菜单的->install vmware tools
3. 解压
4. ./vmware-install.pl
5. reboot

#### shared folder
1. window create a folder
2. vm => setting, check always enable,loate to the foler which created by step 1
3. /mnt/hgfs/


### Linux Directory
1. linux的目录中有且只要一个根目录 /
2. linux的各个目录存放的内容是规划好,不用乱放文件
3. linux是以文件的形式管理我们的设备,因此**linux系统一切皆为文件**
4. linux的各个文件目录下存放什么内容,大家必须有一个认识
   1. /bin        常用命令
   2. /home
   3. /root
   4. /boot       启动相关
   5. /media      U盘 光驱
   6. /mnt        挂载别的文件系统
   7. /opt        安装文件
   8. /usr/local  安装目录
   9. /var        日志 经常修改的东西

![](./images/learn-5.png)

### Xshell + Xftp
#### resolve can not login by password
- change /etc/ssh/sshd_config, set PasswordAuthentication yes
- service sshd restart
#### resolve can not login as root
- change /etc/ssh/sshd_config, set PermitRootLogin yes
- service sshd restart
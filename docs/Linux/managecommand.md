### 网络管理

#### 网络状态查看

- ifconfig | ip
- /sbin/ifconfig  # 普通用户需加完整路径
  - eth0第一块网卡

> 或者叫
>
> eno1        板载网卡
>
> ens33      PCI-E网卡
>
> enp0s3    无法获取物理信息的PCI-E网卡
>
> CentOS 7 使用了一致性网络设备命名,以上都不匹配叫则使用eth0

- mii-tool eth0 查看网线
- route -n 查看网关
- service network status

#### 网络配置

- hostname

#### 路由命令

#### 网络故障排除

- ping `ping www.taobao.com`
- traceroute
- mtr
- nslookup
- telnet
- tcpdump
- netstat ``netstat -tlnp | grep 8080` 查看端口8080的使用情况`
- ss

#### 网络服务管理

- sysv
- systemd

#### 常用网络配置文件

- ifcfg-ethx
- /etc/hosts

### 分区(分区->格式化->挂载)

- fdisk
- mkfs
- parted (> 2T)
- mount
- /etc/fstab

### 计划任务

- 一次性计划任务

  ```bash
  at 18:31
  echo hello > /tmp/hello.txt
  # ctrl + d提交
  atq
  
  # 非内部命令建议加上命令完整路径，脚本运行时利用source引入系统环境变量
  # 没有标准输出，要加重定向输出
  ```

- 周期性计划任务

  ```bash
  crontab -l
  crontab -e
  # 分钟 小时 日期 月份 星期
  # 注意命令路径
  * * * * * /usr/bin/date >> /tmp/date.txt
  
  tail -f /var/log/corn
  # 用户计划任务文件位置
  ls /var/spool/cron
  ```

- anacrontab 延时计划任务

- flock   锁文件

### SSH

- 配置文件

- SSH命令

  ```bash
  systemctl status|start|stop|restart|enable|disable sshd.service
  
  # 客户端命令
  ssh	[-p port] 用户@远程ip
  # SecureCRT Schell putty
  ```

- 公钥认证

  - s sh-keygen -t rsa
  - ssh-copy-id

- scp和sftp远程拷贝文件

  - scp
  - sftp
  - winscp


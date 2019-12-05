### 网络管理

#### 网络状态查看

- ifconfig
- /sbin/ifconfig  //普通用户
  - eth0第一块网卡

> 或者叫
>
> eno1        板载网卡
>
> ens33      PCI-E网卡
>
> enp0s3    无法获取物理信息的PCI-E网卡
>
> CentOS 7 使用了一致

- `netstat -tlnp | grep 8080` 查看端口8080的使用情况
- `ping www.taobao.com`

#### 网络配置

#### 路由命令

#### 网络故障排除

#### 网络服务管理

#### 常用网络配置文件


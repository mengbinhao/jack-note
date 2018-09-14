1. install
   -  https://www.microsoft.com/en-US/download/details.aspx?id=42299  eng version


#### question

##### 1. 无法连接数据库

1. open sql server configuration manager

2. enable TCP/IP

![enable TCP/IP](.\images\sqlserver-configure_1.jpg)

3. 右键点击“TCP/IP协议”选择“属性”,点击“ip地址”，找到“IP3”，更改IP地址为自己电脑的IP地址（或者是127.0.0.1） ，在TCP端口添加1433,进度条在拉到最后，“IPALL”的TCP端口改成“1433”，点击确定保存
4. restart

![enable TCP/IP](.\images\sqlserver-configure_2.jpg)
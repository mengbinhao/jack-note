### 1.Download

- [php-7.2.5-Win32-VC15-x64](https://windows.php.net/download#php-7.2)  for Apache server  have to use TS version

- VC_redist.x64.exe / VC_redist.x86.exe and httpd-2.4.33-win64-VC15.zip(https://www.apachelounge.com/download/)

- [testlink-1.9.17.tar.gz](https://sourceforge.net/projects/testlink/files/latest/download?source=files)

- [mysql-**5.6.40**-winx64](https://dev.mysql.com/downloads/mysql/5.6.html#downloads)



### 2.Change Apache **httpd.conf**

- c:/Apache24 -> x:/Apache24

- ```
  # add below at the bottom
  # Support php7
  LoadModule php7_module x:/php/php7apache2_4.dll
  AddType application/x-httpd-php .php .html .html
  # path to php.ini, change any php.ini-xxxx to php.ini
  PHPIniDir "x:/php"
  ```

- create a php file at x:/Apache24/htdocs for test

  - startup Apache     x:\Apache24\bin\httpd.exe
  - http://localhost/testphp.php

  ```php
  <?php
      echo phpinfo();
  ?>
  ```

- DirectoryIndex index.html -> DirectoryIndex index.php index.html

- DocumentRoot xxxxx ->  DocumentRoot x:/php

- 紧挨着的Directory xxx -> Directory x:/php

- 2个 c:/Apache/cgi-bin -> x:/Apache24/cgi-bin

- set ServerName 127.0.0.1:80


### 3.Change **php.ini**

- rename php.ini-xxxxxxx-> php.ini

- ; extension_dir = "ext" -> extension_dir = "x:/php/ext"

- uncomment  -> curl / gd2 / mbstring / mysqli / xmlrpc

- date.timezone = Asia/Shanghai


### 4.Mysql **5.6.40**(user :root password : '')

- ALTER USER root@localhost IDENTIFIED WITH mysql_native_password BY 'root'; (**here is 8.0 problem, but testlink do not support it**)

- change my-default.ini to **my.ini**

  ```
  #mysql -u root -p
  #show variables like '%char%';

  [client]
  default-character-set = utf8

  [mysqld]
  default-storage-engine = INNODB
  character-set-server = utf8
  collation-server = utf8_general_ci
  basedir="e:/mysql-5.6.40-winx64"
  datadir="e:/mysql-5.6.40-winx64/data"
  port=3306

  #log
  #不会自己创建文件需要自己建
  #全查询日志
  log_output = FILE
  #不启用的话慢日志查询会存在数据表中
  general_log = 1
  general_log_file = "e:/mysql-5.6.40-winx64/logs/query.log"
  slow_query_log = 0
  long_query_time = 3
  slow_query_log_file = "e:/mysql-5.6.40-winx64/logs/slowquery.log"
  log-error = "e:/mysql-5.6.40-winx64/logs/err.log"
  #server-id=1
  #log_bin = "C:/bin/mysql-5.6.40-winx64/log_bin/binlog-bin"
  #log_bin_index = "C:/bin/mysql-5.6.40-winx64/log_bin/binlog"
  ```

- start mysql for test

  - x:\mysql-5.6.40-winx64\bin> .\mysqld.exe --console (若使用PowerShell启动没反应,用cmd测试，查看错误信息）

  -  如果出现以下错误   install [directx9.0c](http://www.jb51.net/softjc/368601.html) ，然后下载[repaire工具](http://www.crsky.com/soft/31471.html)   修复缺失dll及C++相关组件, 若提示还有问题重启+ 勾选C++强力修复进行修复                        ![1527054780321](.\images\mysql-error.png)



### 5.Testlink

- unzip file to php folder, rename to testlink

- change **config.inc.php**

  - $tlCfg->log_path  ==>  'x:/php/testlink/logs/';
  - $g_repositoryPath ==> 'x:/php/testlink/upload_area/

- user_self_signup = false

- run mysql **.\mysqld.exe --console** for test http://localhost/testlink to install

- $tlCfg->config_check_warning_mode = 'SILENT';

- $tlCfg->default_language = 'zh_CN';

- “Deprecated : ...... X:\bin\php\testlink\third_party\phpmailer”

  ```
  //修改PHPMailerAutoload.php
  function __autoload($classname)
  修改为：function spl_autoload_register($classname)
  ```


### 6.How to startup service (可以添加系统变量简化启动方式)

- start apache -> x:\Apache24\bin> .\httpd.exe
- start mysql -> x:\mysql-5.6.40-winx64\bin> .\mysqld.exe --console



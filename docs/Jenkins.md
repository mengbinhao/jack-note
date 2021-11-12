### 1 install

#### 1 [jdk8](https://www.oracle.com/java/technologies/javase/javase8-archive-downloads.html) or [jdk11](https://www.oracle.com/java/technologies/javase/jdk11-archive-downloads.html)

 - Linux写入`/etc/profile` or windows系统环境变量配置

   ```bash
   # step install on Linux
   curl -L -b "oraclelicense=a" -O http://download.oracle.com/otn-pub/java/jdk/8u191-b12/2787e4a523244c269598db4e85c51e0c/jdk-8u191-linux-x64.tar.gz
   mkdir /usr/jdk8
   tar -zxf jdk-8u191-linux-x64.tar.gz -C /usr/jdk8
   java -version
   rm -f jdk-8u191-linux-x64.tar.gz
   # uninstall
   apt remove default-jdk
   
   # set java path
   # install for Single User
   # Check if JAVA_HOME is already set
   echo $JAVA_HOME
   # install java
   # install java
   vi ~/.bashrc OR vi ~/.bash_profile `export JAVA_HOME=/usr/java/jdk1.8.0_191`
   source ~/.bashrc OR source ~/.bash_profile
   echo $JAVA_HOME
   
   # Install for all users :
   # Login as root or execute commands with sudo
   ```

#### 2 [git](https://git-scm.com/downloads)

```bash
apt update
apt install git
git --version
git config --global user.name "Jack"
git config --global user.email "mengbinhao2018@gmail.com"
git config --list
```

#### 3 Tomcat /  Maven / Gradle / Ant if needed

##### Maven

```bash
wget http://www-eu.apache.org/dist/maven/maven-3/3.5.4/binaries/apache-maven-3.5.4-bin.tar.gz
mkdir /usr/maven
tar -zxf apache-maven-3.5.4-bin.tar.gz -C /usr/maven
vi /etc/profile.d/apache-maven.sh
# 加入
export M2_HOME=/usr/maven/apache-maven-3.5.4
export MAVEN_HOME=/usr/maven/apache-maven-3.5.4
source /etc/profile.d/apache-maven.sh
mvn -version
rm -f apache-maven-3.5.4-bin.tar.gz
```

##### Tomcat

- install

  ```bash
  curl -O https://www-us.apache.org/dist/tomcat/tomcat-8/v8.5.37/bin/apache-tomcat-8.5.37.tar.gz
  mkdir /usr/tomcat
  tar -zxf apache-tomcat-8*tar.gz -C /usr/tomcat
  ```

- configuration

  ```bash
  # configuration
  vi /usr/tomcat/apache-tomcat-8.5.37/conf/tomcat-users.xml
  <role rolename="admin-gui"/>
  <role rolename="manager-gui"/>
  <role rolename="manager-script"/>
  <role rolename="manager-jmx"/>
  <role rolename="manager-status"/>
  <user username="tomcat" password="tomcat" roles="admin-gui,manager-gui,manager-script,manager-jmx,manager-status" />
  
  
  vi /usr/tomcat/apache-tomcat-8.5.37/conf/server.xml
  <Connector port="8080" protocol="HTTP/1.1" 72 connectionTimeout="20000" 73 redirectPort="8443" URIEncoding="UTF-8"/>
  ```

- access

  ```bash
  # optional
  chmod +x ./startup.sh, then sudo ./startup.sh
  chmod +x ./shutdown.sh, then sudo ./shutdown.sh
  ```

- 开启自启动

  ```bash
  groupadd tomcat
  useradd -s /bin/false -g tomcat -d /usr/tomcat tomcat
  cd /usr/tomcat
  chgrp -R tomcat /usr/tomcat
  chmod -R g+r conf
  chmod -R g+x conf
  chown -R tomcat webapps/work/temp/logs/
  
  vi /etc/systemd/system/tomcat.service
  [Unit]
  Description=Apache Tomcat Web Application Container
  After=network.target
  
  [Service]
  Type=forking
  
  Environment=JAVA_HOME=/usr/jdk8/jdk1.8.0_191
  Environment=CATALINA_PID=/usr/tomcat/apache-tomcat-8.5.37/temp/tomcat.pid
  Environment=CATALINA_HOME=/usr/tomcat/apache-tomcat-8.5.37
  Environment=CATALINA_BASE=/usr/tomcat/apache-tomcat-8.5.37
  Environment='CATALINA_OPTS=-Xms512M -Xmx1024M -server -XX:+UseParallelGC'
  Environment='JAVA_OPTS=-Djava.awt.headless=true -Djava.security.egd=file:/dev/./urandom'
  
  ExecStart=/usr/tomcat/apache-tomcat-8.5.37/bin/startup.sh
  ExecStop/usr/tomcat/apache-tomcat-8.5.37/bin/shutdown.sh
  
  User=tomcat
  Group=tomcat
  UMask=0007
  RestartSec=10
  Restart=always
  
  [Install]
  WantedBy=multi-user.target
  
  
  systemctl daemon-reload
  systemctl start tomcat
  systemctl status tomcat
  systemctl enable tomcat
  systemctl restart tomcat
  ```

#### 4 [jenkins](https://www.jenkins.io/download/)

```bash
# actually excute /etc/init.d/jenkins
systemctl start jenkins.service
systemctl stop jenkins.service
systemctl restart jenkins.service
systemctl status jenkins.service
systemctl enable jenkins.service
systemctl disable jenkins.service

# change port if needed
/etc/default/jenkins

# build path
/var/lib/jenkins/workspace/xxxx/target
```

### 2 Configure

#### 1 System Configuration & global security & global tools & users

#### 2 plugin related

- change update site if needed

> http://mirror.xmission.com/jenkins/updates/current/update-center.json

- 一些推荐插件
  - Git / Git Parameter / Rebuilder / GitHub Branch Source
  - Mailer Plugin / Email Extension Plugin
  - Timestamper、Ansicolor、Workspace Cleanup
  - Monitoring、Project statistics、Test Result Analyzer Plugin
  - Matrix Authorization Stratery Plugin
  - ThinBackup
  - Folders
  - ...

#### 3 change httpPort

> locate  jenkins.xml-->  change --httpPort=8888

#### 4 smtp server 

##### basic

1. register 163 or other email for 授权码

2. System Admin email address must be same as below SMTP Username

   ```bash
   # System Admin email address
   系统检测中心自动化<xxx@yyy.com>
   # SMTP Username
   xxx@yyy.com
   ```

3. ==SMTP Password是客户端授权码不是邮箱密码==

4. Charset / Content Type / Recipients / Subject / Maxinum Attachment Size / Content / Triggers if needed

   ```bash
   构建通知：$PROJECT_NAME - Build # BUILD_NUMBER - $BUILD_STATUS!
   ```

5. Item add post-build action -> E-mail Notification

> Then test email funciton 

##### advanced

1. finish basic email configuration
2. ==check Enable Debug Mode==
3. add Always Trigger
4. readd Recipient List (==maybe bug==)
5. change content type to html
6. ==change content templete==
7. Attach Build Log
8. item add post-build action -> Editable Email Notification

#### 5 configure DingTalk

	- create dingtalk group
	- add robot -> add Webhook
	- install DingTalk plugin in jenkins
	- configure DingTalk in System Configuration
	-  item add DingTalk

### 3 构建Item

 - 前置条件

   > 1. 将Jenkins的秘钥拷贝到Git服务器，以使其在拉取代码的时候免密码操作
   > 2.  将Jenkins的秘钥拷贝到tomcat服务器，以使其在同步等操作的时候免密码

- 命名规则：项目前缀 - 说明 - Job类型

- 配置Item（SCM、Build Triggers、Pre/Post-actions等）

  - SCM

    - System Configuration -> add Github server -> add secret text凭据 -> github创建token (check repo、admin:repo_hook) -> 添加凭据 -> 测试jenkins和Github 连通性

      ![](.\images\jenkins_1.jpg)

    - Item check github项目 -> 项目url

    - Item check git -> url -> github登录凭证
    
      > git开头的url才需要加公钥私钥
      >
      > 公钥加入github，私钥加入jenkins
      >
      > ssh-keygen不是命令则需要加入环境变量

    - check GitHub hook trigger for GITScm polling

      - ==webhook必须是外网可以访问的地址，github才能通知到jenkins==

    - check Use secret text or file -> add secret text  ?????
    
      ![](.\images\jenkins_2.jpg)
    
      > then push to github for auto-build test






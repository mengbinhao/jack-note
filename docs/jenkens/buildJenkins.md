### resource
http://www.cnblogs.com/itech/archive/2011/11/23/2260009.html

http://www.cnblogs.com/zz0412/tag/jenkins/

### windows
#### Download

1. [jdk8](http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html)
2. [jenkins war version](https://jenkins.io/download/)

#### Install

1. Open up a terminal in the download directory
2. Run `java -jar jenkins.war --httpPort=xxxx`
3. Browse to `http://localhost:xxxx`
4. Follow the instructions to complete the installation

### install JDK/Jenkins/Git on Debian 9

#### JDK8
- curl -L -b "oraclelicense=a" -O http://download.oracle.com/otn-pub/java/jdk/8u191-b12/2787e4a523244c269598db4e85c51e0c/jdk-8u191-linux-x64.tar.gz
- mkdir /usr/jdk8
- tar -zxf jdk-8u191-linux-x64.tar.gz -C /usr/jdk8
- update-alternatives --install "/usr/bin/java" "java" "/usr/jdk8/jdk1.8.0_191/bin/java" 1500
- update-alternatives --install "/usr/bin/javac" "javac" "/usr/jdk8/jdk1.8.0_191/bin/javac" 1500
- update-alternatives --install "/usr/bin/javaws" "javaws" "/usr/jdk8/jdk1.8.0_191/bin/javaws" 1500
- java -version
- rm -f jdk-8u191-linux-x64.tar.gz
- update-alternatives --config java  //list multi java version
- apt remove default-jdk  //uninstall
- set java path
  - install for Single User :
      - echo $JAVA_HOME    //Check if JAVA_HOME is already set
      - install java
      - vi ~/.bashrc OR vi ~/.bash_profile `export JAVA_HOME=/usr/java/jdk1.8.0_191`
      - source ~/.bashrc OR source ~/.bash_profile
      - echo $JAVA_HOME
  - Install for all users :
    - Login as root or execute commands with sudo



#### maven
- wget http://www-eu.apache.org/dist/maven/maven-3/3.5.4/binaries/apache-maven-3.5.4-bin.tar.gz
- mkdir /usr/maven
- tar -zxf apache-maven-3.5.4-bin.tar.gz -C /usr/maven
- vi /etc/profile.d/apache-maven.sh
  ```
  export JAVA_HOME=/usr/jdk8/jdk1.8.0_191
  export JRE_HOME=/usr/jdk8/jdk1.8.0_191
  export M2_HOME=/usr/maven/apache-maven-3.5.4
  export MAVEN_HOME=/usr/maven/apache-maven-3.5.4
  export PATH=${M2_HOME}/bin:${PATH}
  ```
- source /etc/profile.d/apache-maven.sh
- mvn -version
- rm -f apache-maven-3.5.4-bin.tar.gz


#### Tomcat
- curl -O https://www-us.apache.org/dist/tomcat/tomcat-8/v8.5.37/bin/apache-tomcat-8.5.37.tar.gz
- mkdir /usr/tomcat
- tar -zxf apache-tomcat-8*tar.gz -C /usr/tomcat
- config tomcat
  - vi /usr/tomcat/apache-tomcat-8.5.37/conf/tomcat-users.xml
  ```
    <role rolename="admin-gui"/>
    <role rolename="manager-gui"/>
    <role rolename="manager-script"/>
    <role rolename="manager-jmx"/>
    <role rolename="manager-status"/>
    <user username="tomcat" password="tomcat" roles="admin-gui,manager-gui,manager-script,manager-jmx,manager-status" />
  ```
  - vi /usr/tomcat/apache-tomcat-8.5.37/conf/server.xml
  ```
  <Connector port="8080" protocol="HTTP/1.1" 72 connectionTimeout="20000" 73 redirectPort="8443" URIEncoding="UTF-8"/>
  ```
  - commit `Valve tag` in context.xml if can not open manager page
  ```
  vi ./webapps/host-manager/META-INF/context.xml
  vi ./webapps/manager/META-INF/context.xml
  <!-- <Valve classNam='xxx' allow='yyy'>-->
  ```
  - chmod +x ./startup.sh, then sudo ./startup.sh //optional
  - chmod +x ./shutdown.sh, then sudo ./shutdown.sh  //optional


> 以下配置开机自动启动
- groupadd tomcat
- useradd -s /bin/false -g tomcat -d /usr/tomcat tomcat
- cd /usr/tomcat
- chgrp -R tomcat /usr/tomcat
- chmod -R g+r conf
- chmod -R g+x conf
- chown -R tomcat webapps/work/temp/logs/
- vi /etc/systemd/system/tomcat.service
```
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
```
- systemctl daemon-reload
- systemctl start tomcat
- systemctl status tomcat
- systemctl enable tomcat
- systemctl restart tomcat


#### Git
- apt update
- apt install git
- git --version
- git config --global user.name "Jack"
- git config --global user.email "mengbinhao2018@gmail.com"
- git config --list
- /usr/lib/git-core   //git root folder path


#### Jenkins
- install
  if offical doc does not work, see below:
  - apt-get update
  - apt-get upgrade
  - wget -q -O - https://pkg.jenkins.io/debian/jenkins.io.key | sudo apt-key add -
  - sh -c 'echo deb http://pkg.jenkins.io/debian-stable binary/ > /etc/apt/sources.list.d/jenkins.list'
  - apt update
  - apt-get install jenkins
- configure
  - systemctl start jenkins.service //actually excute /etc/init.d/jenkins
  - systemctl stop jenkins.service
  - systemctl restart jenkins.service
  - systemctl status jenkins.service
  - systemctl enable jenkins.service
  - systemctl disable jenkins.service
  - /etc/default/jenkins //change port if needed, can not change name!
  - /var/lib/jenkins/workspace/xxxx/target //build path
- jenkins UI setting
  - global security
    - 关闭防止跨站点请求伪造
  - global tools(maven、jdk、git)
    - /usr/jdk8/jdk1.8.0_191
    - /usr/bin/git  //which git
    - /usr/maven/apache-maven-3.5.4
  - source code management for SVN
    - svn//xxxxxxxxxxx@HEAD
  - build
  - build trigger
    - http://35.243.68.206:8081/job/test/build?token=apptest
    - setInterval
  - post-build actions

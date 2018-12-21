### Download

1. [jdk8](http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html)
2. [jenkins war version](https://jenkins.io/download/)

### Install

1. Open up a terminal in the download directory
2. Run `java -jar jenkins.war --httpPort=xxxx`
3. Browse to `http://localhost:xxxx`
4. Follow the instructions to complete the installation

### install JDK/Jenkins/Git on Debian 9

#### JDK8
- curl -L -b "oraclelicense=a" -O http://download.oracle.com/otn-pub/java/jdk/8u191-b12/2787e4a523244c269598db4e85c51e0c/jdk-8u191-linux-x64.tar.gz
- mkdir /usr/local/oracle-java-8
- tar -zxf jdk-8u191-linux-x64.tar.gz -C /usr/local/oracle-java-8
- update-alternatives --install "/usr/bin/java" "java" "/usr/local/oracle-java-8/jdk1.8.0_191/bin/java" 1500
- update-alternatives --install "/usr/bin/javac" "javac" "/usr/local/oracle-java-8/jdk1.8.0_191/bin/javac" 1500
- update-alternatives --install "/usr/bin/javaws" "javaws" "/usr/local/oracle-java-8/jdk1.8.0_191/bin/javaws" 1500
- java -version
- rm -f jdk-8u191-linux-x64.tar.gz
- update-alternatives --config java  //list multi java version
- apt remove default-jdk  //uninstall
- set java path
  - install for Single User :
      - echo $JAVA_HOME    //Check if JAVA_HOME is already set
      - install java
      - vi ~/.bashrc OR vi ~/.bash_profile `export JAVA_HOME=/usr/java/jre1.6.0_04`
      - source ~/.bashrc OR source ~/.bash_profile
      - echo $JAVA_HOME
  - Install for all users :
    - Login as root or execute commands with sudo



#### maven
- wget http://www-eu.apache.org/dist/maven/maven-3/3.5.4/binaries/apache-maven-3.5.4-bin.tar.gz
- tar -zxf apache-maven-3.5.4-bin.tar.gz
- ln -s apache-maven-3.5.4 apache-maven   //optional
- vi /etc/profile.d/apache-maven.sh
  ```
  export JAVA_HOME=/usr/local/oracle-java-8/jdk1.8.0_191
  export JRE_HOME=/usr/local/oracle-java-8/jdk1.8.0_191
  export M2_HOME=/usr/local/apache-maven
  export MAVEN_HOME=/usr/local/apache-maven
  export PATH=${M2_HOME}/bin:${PATH}
  ```
- source /etc/profile.d/apache-maven.sh
- mvn -version
- rm -f apache-maven-3.5.4-bin.tar.gz


#### Tomcat
- curl -O https://www-us.apache.org/dist/tomcat/tomcat-8/v8.5.37/bin/apache-tomcat-8.5.37.tar.gz
- mkdir /usr/local/tomcat
- tar xzvf apache-tomcat-8*tar.gz -C /usr/local/tomcat
- config tomcat
  - vi /usr/local/tomcat/xxxx/conf/tomcat-users.xml
  ```
    <!-- <role rolename="admin-gui"/> -->

    <role rolename="manager-gui"/>
    <role rolename="manager-script"/>
    <role rolename="manager-jmx"/>
    <role rolename="manager-status"/>
    <user username="tomcat" password="tomcat" roles="manager-gui,manager-script,manager-jmx,manager-status" />
  ```
  - vi /usr/local/tomcat/xxxx/conf/server.xml
  ```
  <Connector port="8080" protocol="HTTP/1.1" 72 connectionTimeout="20000" 73 redirectPort="8443" URIEncoding="UTF-8"/>
  ```
  - commit `Valve tag` in context.xml if can not open manager page
  ```
  cd /usr/local/tomcat/apache-tomcat-8.5.35/webapps/manager/META-INF
  and
  cd /usr/local/tomcat/apache-tomcat-8.5.35/webapps/host-manager/META-INF
  <!-- <Valve classNam='xxx' allow='yyy'>-->
  ```
  - change port if needed  `/usr/local/tomcat/apache-tomcat-8.5.35/conf/server.xml`
  - chmod +x ./startup.sh, then sudo ./startup.sh
  - chmod +x ./shutdown.sh, then sudo ./shutdown.sh

/usr/local/tomcat/apache-tomcat-8.5.35/webapps
> 以下配置开机自动启动
- groupadd tomcat
- useradd -s /bin/false -g tomcat -d /usr/local/tomcat tomcat
- cd /usr/local/tomcat
- chgrp -R tomcat /usr/local/tomcat
- chmod -R g+r conf
- chmod -R g+x conf
- chown -R tomcat webapps/ work/ temp/ logs/
- vi /etc/systemd/system/tomcat.service
```
[Unit]
Description=Apache Tomcat Web Application Container
After=network.target

[Service]
Type=forking

Environment=JAVA_HOME=/usr/local/oracle-java-8/jdk1.8.0_191
Environment=CATALINA_PID=/usr/local/tomcat/temp/tomcat.pid
Environment=CATALINA_HOME=/usr/local/tomcat
Environment=CATALINA_BASE=/usr/local/tomcat
Environment='CATALINA_OPTS=-Xms512M -Xmx1024M -server -XX:+UseParallelGC'
Environment='JAVA_OPTS=-Djava.awt.headless=true -Djava.security.egd=file:/dev/./urandom'

ExecStart=/usr/local/tomcat/bin/startup.sh
ExecStop/usr/local/tomcat/bin/shutdown.sh

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
  - wget --no-check-certificate -q -O - http://pkg.jenkins-ci.org/debian/jenkins-ci.org.key | sudo apt-key add -
  - sh -c 'echo deb http://pkg.jenkins.io/debian-stable binary/ > /etc/apt/sources.list.d/jenkins.list'
  - apt update
  - apt install jenkins
  - service jenkins start //actually excute /etc/init.d/jenkins
  - service jenkins stop
  - service jenkins restart
  - service jenkins status
- config jenkins
  - /etc/default/jenkins //change port if needed, can not change name!!!
  - /var/lib/jenkins/workspace/xxxx/target //build path
- jenkins UI setting
  - global security
    - 关闭防止跨站点请求伪造
    - 权限最大
  - global tools(maven、jdk、git)
  - source code management
    - svn//xxxxxxxxxxx@HEAD
  - build
  - build trigger
    - http://35.243.68.206:8081/job/test/build?token=apptest
    - setInterval
  - post-build actions

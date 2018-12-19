### Download

1. [jdk8](http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html)
2. [jenkins war version](https://jenkins.io/download/)

### Install

1. Open up a terminal in the download directory
2. Run `java -jar jenkins.war --httpPort=xxxx`
3. Browse to `http://localhost:xxxx`
4. Follow the instructions to complete the installation

### install JDK/Jenkins/Git on Debian 9
- sudo -i
- cp -a ./apache-maven-3.5.4/. /usr/local/apache-maven
- find
- ps -ef|grep java
- rm -rf /xxx/yyy/zzz

#### vi
- i
- :wq
- :q!

#### JDK8
- curl -L -b "oraclelicense=a" -O http://download.oracle.com/otn-pub/java/jdk/8u191-b12/2787e4a523244c269598db4e85c51e0c/jdk-8u191-linux-x64.tar.gz
- mkdir /usr/local/oracle-java-8
- tar -zxf jdk-8u191-linux-x64.tar.gz -C /usr/local/oracle-java-8
- update-alternatives --install "/usr/bin/java" "java" "/usr/local/oracle-java-8/jdk1.8.0_191/bin/java" 1500
- update-alternatives --install "/usr/bin/javac" "javac" "/usr/local/oracle-java-8/jdk1.8.0_191/bin/javac" 1500
- update-alternatives --install "/usr/bin/javaws" "javaws" "/usr/local/oracle-java-8/jdk1.8.0_191/bin/javaws" 1500
- java -version
- rm -f apache-maven-3.5.4-bin.tar.gz
- update-alternatives --config java
- apt remove default-jdk


#### maven
- wget http://www-eu.apache.org/dist/maven/maven-3/3.5.4/binaries/apache-maven-3.5.4-bin.tar.gz
- tar -zxf apache-maven-3.5.4-bin.tar.gz
- ln -s apache-maven-3.5.4 apache-maven
- vi /etc/profile.d/apache-maven.sh
```
//notice： path!!!
export JAVA_HOME=/usr/local/oracle-java-8/jdk1.8.0_191
export M2_HOME=/usr/local/apache-maven
export MAVEN_HOME=/usr/local/apache-maven
export PATH=${M2_HOME}/bin:${PATH}
```
- source /etc/profile.d/apache-maven.sh
- mvn -version
- rm -f apache-maven-3.5.4-bin.tar.gz


#### Tomcat
- curl -O https://www-us.apache.org/dist/tomcat/tomcat-9/v9.0.14/bin/apache-tomcat-9.0.14.tar.gz
- mkdir /usr/local/tomcat
- tar xzvf apache-tomcat-8*tar.gz -C /usr/local/tomcat
- vi /usr/local/tomcat/xxxx/conf/tomcat-users.xml
```
<role rolename="manager-gui"/>
<role rolename="admin-gui"/>
<user username="tomcat" password="tomcat" roles="manager-gui,admin-gui"/>
```
- commit `value tag` in context.xml if can not open manager page
- change port if needed
- chmod +x ./startup.sh, then sudo ./startup.sh
- chmod +x ./shutdown.sh, then sudo ./shutdown.sh



> 以下可选
- groupadd tomcat
- useradd -s /bin/false -g tomcat -d /opt/tomcat tomcat
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
Environment=CATALINA_PID=/opt/tomcat/temp/tomcat.pid
Environment=CATALINA_HOME=/opt/tomcat
Environment=CATALINA_BASE=/opt/tomcat
Environment='CATALINA_OPTS=-Xms512M -Xmx1024M -server -XX:+UseParallelGC'
Environment='JAVA_OPTS=-Djava.awt.headless=true -Djava.security.egd=file:/dev/./urandom'

ExecStart=/opt/tomcat/bin/startup.sh
ExecStop=/opt/tomcat/bin/shutdown.sh

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
- visit tomcat


#### Git
- apt update
- apt install git
- git --version
- git config --global user.name "Jack"
- git config --global user.email "mengbinhao2018@gmail.com"
- git config --list
- /usr/lib/git-core/git


#### Jenkins
if offical doc does not work, use below:
- wget --no-check-certificate -q -O - http://pkg.jenkins-ci.org/debian/jenkins-ci.org.key | sudo apt-key add -
- sh -c 'echo deb http://pkg.jenkins.io/debian-stable binary/ > /etc/apt/sources.list.d/jenkins.list'
- apt-get update
- apt-get install jenkins
- service jenkins start
- service jenkins stop
- service jenkins restart
- service jenkins status
- /etc/default/jenkins   change port if needed, can not change name!!!!!!!
- /var/lib/jenkins/workspace/xxxx/target

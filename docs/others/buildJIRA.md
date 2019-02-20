### 1.download & install

1. [jdk download](http://www.oracle.com/technetwork/java/javase/archive-139210.html), choose your version
2. [atlassian-jira-6.3.6-x32.exe and crack](http://www.xz7.com/dir/196682.html)  or other can be cracked version

### 2.operation mysql

```
create database jira character set 'UTF8';
create user jira identified by 'jira';
grant all privileges on *.* to 'jira'@'localhost' identified by 'jira' with grant option;
flush privileges;
```
### 3.JIRA (with crack)

1. choose My Own Database to config db info

2. after install, stop JIRA service

3. copy **mysql-connector-java-5.1.xx-bin.jar** to **C:\Program Files (x86)\Atlassian\JIRA\lib**

4. start JIRA service, configure mysql info

5. stop JIRA  service at license page

6. overwrite **atlassian-extras-2.2.2.jar** to **C:\Program Files (x86)\Atlassian\JIRA\atlassian-jira\WEB-INF\lib **(change jar's mf file if version is not same)

7. overwrite **atlassian-universal-plugin-manager-plugin-2.17.13.jar** to **C:\Program Files (x86)\Atlassian\JIRA\atlassian-jira\WEB-INF\atlassian-bundled-plugins**(change jar's mf file if version is not same)

8. start  JIRA service, choose I have a license, then input **JIRA account** and **license key**

   ```
   Description=JIRA: Commercial,
   CreationDate=yyyy-mm-dd,
   jira.LicenseEdition=ENTERPRISE,
   Evaluation=false,
   jira.LicenseTypeName=COMMERCIAL,
   jira.active=true,
   licenseVersion=2,
   MaintenanceExpiryDate=2099-12-31,
   Organisation=saper,
   SEN=SEN-L4140432,
   ServerID=xxxxxxxxxxxxxxx,
   jira.NumberOfUsers=-1,
   LicenseID=LIDSEN-L4140432,
   LicenseExpiryDate=2099-12-31,
   PurchaseDate=yyyy-mm-dd
   ```

9. then check if cracker sucessfully

   ![](.\images\jira_license.png)

10. china language, : stop JIRA service copy JIRA-6.3.6-language-pack-zh_CN.jar to C:\Program Files (x86)\Atlassian\JIRA\atlassian-jira\WEB-INF\lib,start  JIRA service

11. change port
    - x:\Program Files (x86)\Atlassian\JIRA\conf to change port

12. change jvm

    - setenv.sh change jvm


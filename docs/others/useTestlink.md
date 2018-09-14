### 1.Run testlink

- start apache x:\Apache24\bin> .\httpd.exe(可以添加系统变量简化启动方式)
- start mysql x:\mysql-5.6.40-winx64\bin> .\mysqld.exe --console(可以添加系统变量简化启动方式)
- visit http://localhost/testlink/index.php

### 2.Module

- project

- user

- assign role (admin / leader / senior tester / test designer / tester /guest)

- assign test plan role

- custom fields (assign fields to one project)

- key words

- import / export

  | 选项     | 格式    | import | export | description                  |
  | -------- | ------- | ------ | ------ | ---------------------------- |
  | 测试项目 | XML     | Y      | Y      | 测试套件和测试用例           |
  | 测试套件 | XML     | Y      | Y      | 测试套件及其子套件和测试用例 |
  | 测试用例 | XML XLS | Y      | Y      | 仅导出一个或套件所有         |
  | 关键字   | CVS XML | Y      | Y      | 当前测试项目中关键字         |
  | 需求     | XML CSV | Y      | Y      |                              |
  | 结果     | XML     | Y      |        |                              |



### 3.Workflow

![](.\images\testlink-workflow.jpg)

1. create project
2. create requirement(requirement specification / requirement)
3. create case(suite / test case)
4. create test plan(plan / build / *milestone*)
5. assign requirement, then check coverage in requirement specification(which means test case cover requirement)
6. add / remove test case to test plan
7. assign test case to tester
8. tester excute test case
9. check test result and metrics

### 3.Config email  in **config.inc.php**

```
$g_smtp_host        = 'smtp.163.com';
$g_tl_admin_email     = '18591953989@163.com';
$g_from_email         = '18591953989@163.com';
$g_return_path_email  = '18591953989@163.com';
$g_phpMailer_method = PHPMAILER_METHOD_SMTP
$g_smtp_username    = '18591953989@163.com';
$g_smtp_password    = '1q2w3e4r5t';  # 此处填写163的客户端授权密码or邮箱密码
$g_smtp_connection_mode = 'openssl';
$g_smtp_port = 25;
```

### 4.Config generator document in **config.inc.php**

```
$tlCfg->document_generator->company_name = 'Our United RT';
$tlCfg->document_generator->company_copyright = '2018 &copy; Our United RT';
$tlCfg->document_generator->confidential_msg = '';
$tlCfg->document_generator->company_logo = 'xxxx.png';
$tlCfg->document_generator->company_logo_height = '53';
/** CSS used in printed html documents */
$tlCfg->document_generator->css_template = 'css/tl_documents.css';
// CSS file for Requirement Specification Document, Requirement and Requirement Spec Print View
$tlCfg->document_generator->requirement_css_template = 'css/tl_documents.css';
```
### 5.Integrated with mantis

- create issue tracker, integrate through db

```
<issuetracker>
    <dbhost>localhost</dbhost>
    <dbname>mantis</dbname>
    <dbtype>mysql</dbtype>
    <dbuser>mantis</dbuser>
    <dbpassword>mantis</dbpassword>
    <uriview>http://localhost/mantisbt/view.php?id=</uriview>
    <uricreate>http://localhost/mantisbt</uricreate>
</issuetracker>
```
- set associate with project and active
- see result in Excute test page

### 6.Integrated with JIRA 6.3.6

- create issue tracker, integrate through db

```
<issuetracker>
	<jiraversion>6.3.6</jiraversion>
    <dbhost>localhost</dbhost>
    <dbname>jira</dbname>
    <dbtype>mysql</dbtype>
    <dbuser>jira</dbuser>
    <dbpassword>jira</dbpassword>
    <uriview>http://localhost:8888/browse/</uriview>
    <uricreate>http://localhost:8888/secure/CreateIssue!default.jspa</uricreate>
</issuetracker>
```

- set associate with project and active
- see result in Excute test page

### 7.Integrated with JIRA7.x through sql server

1. download

   ```
   https://www.microsoft.com/en-US/download/details.aspx?id=42299  sqlserver2014
   http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html JDK8
   https://www.atlassian.com/software/jira/download  JIRA 7.x
   https://www.microsoft.com/en-us/download/details.aspx?id=56729  Microsoft Drivers for PHP for SQL Server
   https://www.microsoft.com/en-us/download/details.aspx?id=50420  ODBC Driver  13
   ```

2. install framework3.5/4  and sqlserver2014, then create jiradb and create jiradbuser (db_owner)，修改 ALTER DATABASE jiradb SET READ_COMMITTED_SNAPSHOT ON    隔离规则，修改jiradb  collation

3. install JIRA and make license (account : yg.ma@cybermedical.com / password )

4. jira --> x:\Program Files\Atlassian\JIRA\lib    mssql JDBC Driver

5. php.ini --> install mssql extension SQLSRV52(5.2 support 7.0+) according to php7.dll / php7ts.dll  and  ODBC (13, 15, 17 version)， reboot apache

6. test  connect mssql

   ```php
   <?php
   header("Content-type: text/html; charset=utf8");
   $serverName = "localhost";
   $uid = "jiradbuser";
   $pwd = "jiradbuser";
   $connectionInfo = array("UID"=>$uid, "PWD"=>$pwd, "Database"=>"jiradb");
   $conn = sqlsrv_connect( $serverName, $connectionInfo);
   if( $conn == false)
   {
   echo "connect fail";
   die( print_r( sqlsrv_errors(), true));
   }else{
   echo "connect success  ";
   }
   $query = sqlsrv_query($conn, "select top 10 * from jiraschema.project");
   var_dump($query);
   while($row = sqlsrv_fetch_array($query))
   {
     print_r($row);
   }
   ?>
   ```

7. change jiradbInterface.class.php according to error stack

   ```
   $this->dbSchema->issues = 'jiraschema.jiraissue';
   $this->dbSchema->status = 'jiraschema.issuestatus';
   $this->dbSchema->project = 'jiraschema.project';
   ```

8. test in testlink (add issue tracker and associate with target project)


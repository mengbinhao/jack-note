### 1.Start /Stop JIRA service

- start menu
- task manager

### 2.Change DB

change my.ini

```
init_connect='SET NAMES utf8′
default-character-set = utf8
default-collation = utf8_bin
```

### 3.Admin

1. System setting

   - Mode      public / private  -> if can register

   - configure outgoing mail

     ![](.\images\jira-email.jpg)

2. Project (Project Category)

3. project role

4. group --> user

5. project workflow

   1. create project (assign project leader)
      - project leader
        - version
        - manage component(component default assigner)
        - defualt assigner of this project
        - add user to system role (can not edit system /custom role)
        - edit workflow for issue type

   2. issue type  多对多   issue type scheme

   3. **workflow**(trigger / condition and so on )

      1. 可以具体到issue type
      2. 自定义workflow
      3. 添加状态和动作,设置条件和post function

   4. workflow scheme

      ​      related issue type and workflow

   5. Screens  / Screen scheme  / issue type screen scheme

   6. custom field (assine to screen)/ field configuration / field configuration scheme

   7. status

   8. resolution

   9. issue security scheme

   10. notification scheme

   11. **permission scheme**

   12. import / export



### 4.User

1. filter (basic / advance)

2. dashboard (add gadget / layout / copy / find / edit share and so on)

3. issue
   1. vote issue(reporter can not vote)
   2. log work
   3. comments
   4. **change workflow**
   5. issue type
   6. issue priority level
   7. status
   8. resolution

### 5.question

       	1. if u want to see a project you must have the right first, even you are adminstrator
       	2. 如何动态assigner到上一节点处理人
       	3. 如何条件显示节点
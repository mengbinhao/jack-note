### GTRF
I know GTRF from the official website of HSBC, There are four sub-department under commercial banking, GTRF is one of them. the full name of GTRF is Global Trade and Receivables Finance, it provides services and financing for buyers and suppliers throughout the trade cycle, helping them to use working capital efficiently, manage trade risk and fund their supply chains

This is a strategic department in Xi'an and do Devops、micro-service and interface API work

and this is all I know about GTRF

### introduce
Good afternoon, interviewer, let me take a brief introduce myself. You can call me Jack. a native of Xi'an,35 years old. I graduated from Xi'an Polytechnic University in computer science and technology in 2008. So far I have more than 10 years of work experience and I worked in four companies. At the beginning,I am a developer using JAVA to develop web system. but in recent years, I worked as an automated testing engineer.

In my current job, My duty includes write automated scrips and maintain them using javascript, set up automated test environment, analyze automated report, just like what I did in Emerson. but there is a major difference is that I am the only person who did automation work. which means I finish my job independently. I don't have a colleague to discuss, to argue, to learn or to share, all of the automated thing I have to implement it by myself, you know, this is very very important to me, I am not just only consider how to write scripts, but also need, including technology selection, organize automated project, set up CI environment, integrate JENKINS with TestComplete, so based on that, I feel more confident about my work、my skills and push myself higher demands.

#### What do you like/want to join about the company?
I want to join the industry in which HSBC is located. I am very happy to work with talented people all over the world, anr the multi-cultures. This job is an ideal match for my skills and work experience. So I think I am qualified for this job. I believe I can do it well and I want to be part of HSBC.

#### Why do you want to change you job? why are you leaving your current position?
There are three factors.

- First, My current company is not a traditional IT company, which means the test team does not have a louder voice as I expected. It is a bit little harder to extend the automated project.
- Second, Sometimes I have to go to customer there, go to hospital for test, to operate the radiation machine, so I have opportunity to contact with radiation, It is not good for health if I work long term in that circumstance. this is the major reason that I want to change my job
- last, I want to advance my career, and I think this job offers more opportunities for me to do that and I am ready for a bigger challenge

#### What is the biggest accomplishment form these jobs?
After finishing the automation project, we saw a 40% increase in test team efficiency.

Scrum teams are my customer, they told me the synchronization tools saves lots of their time.

I mean I am proud of delivering the synchronization tool between startteam and rally to the scrum team.

### talk about project
- background
- your role, what you did
- result
- summary and insufficiency
    - what do you get from the project?
    - any insufficiency? how to improve?

#### TPS automated project
The TPS automated project is to build for testing the target desktop application, which is run on windows, this target application is used to make a treatment plan for patient.

Do you know about TPS? the basic process of how to use it is
1. import standard DICOM images
2. contour some volumes, it means point out where the tumour located and point put some key organ
3. calculate the dose, the radiation dose
4. the doctor checks the report, if it is fine, export it then treat patient, it it not, re-contour and re-calculate until it can be accepted

We use TC, a commercial automated tool, to test the UI function of the application, the purpose of TPS automated project is to save the time of tester from manual test.

What I did just like what I said above, turn manual cases into automated scripts, update scripts, organize the project structure, set up CI environment, analyze the test report, and some manual test.

For now, I have finished over 50% percent of automated scripts. Our team saw a 40% increase in test team efficiency. normally, the tester need to spend 2 days to test a new version of the application, but now it will be done less than half day.

From this project, I have learned a lot of javascript knowledge, I use it more skilled. but there is a little regret, most of the scripts written by ES5 grammar,if I have enough time, I will refactor it to ES6 grammar, this is the trend, furthermore, I did not write full of unit test for my business code, if I have the opportunity, I will add them as well.

##### technology selection
- learning cost, TC support lots of script language, js、python and other script language, I am familiar with it, so this is a factor
- price, my company is a small company, although it has several branch company, but it can not spent lots of money on test team
- can resolve current work problem, the target application developed by QT5, TC can recognize the component/object on it to do UI automated testing
- easily reading official doc, I spent a lot of time, less one month to learn how to use TC
- community, I requested several topic there and I found a bug of TC, TC built a hot-fix for this bug
- popular or not, like UFT

##### automated test environment
- a login user with admin access
- an existing machine config
- a set of specified DICOM images
- make sure the db is accessible

##### difficult point
- image compare. TC cannot recognize the images object, so test image related function need to prepare a set of specified images first, store the expected in TC, then compared the real result and the stored image
- organize folder according to the different function module、encapsulate common function
- object mapping
- global event
write business code first, then automated case invoke them
encapsulate common function(like get data from different table. goto mainUI)
each single case test cycle is, launch target app first, do some operation to go to the checkpoint, at last check property to see if it is the case expected. exit app

#### oxygen(encapsulation、poly'morphism)
This is an automated test framework developed by Emerson, Automation team, it is used to test different web system. Oxygen resolves lots of xml files to related bean to execute automated cases, after test complete, generate report then send to related people. the main technology stacks are java and selenium, JAVA encapsulates selenium.

more precisely speaking, it is a semi-finished product, Oxygen defines many types of web components, but all of them are abstract class.(such as button、link、table、checkbox、text_input and others) which means the target system has to implement those components if needed.

actually, I do not totally understand each technical point, because when I joined the group, the framework has already in shape, what I did is to enhance framework and write automated test scripts and define components, but I am clear that how it works, the workflow of Oxygen, Is this fine that I show you this information?

![](./images/Oxygen-Model.png)
![](./images/ParseModel.png)
![](./images/Oxygen-DataFlow.png)
What I did is convert manual cases to automated scripts and maintain them, set up CI environment during regressing period, analyze the test report, enhance framework and define components.

The scrum team is my customer, Oxygen saves lots of their time during regressing, nearly one thousand automated scripts have be run within one week.

From this project, I learned lots of automation knowledge, the automated test case cycle, how to execute automated test case, how to set up automate env and so on.

##### Basic actions
- Web: perform a single operation on a specified page.Such as click on a button or type string into a text input.
- System: perform a single operation on local computer system. Such as isFileExists, deleteOneFile, etc
- Browser: perform a single operation on the browser.Such as refresh, getCurrentUrl, openNewWindow, etc
- Database: perform a single operation on the database.Such as queryDB, modifyDB, etc
- Activity: perform a suite of actions to finish a business logic. Such as login system or add a new user

##### A Web action has 4 properties
- page: indicate to which page will be operated on
- component: indicate to which widget will be operated on
- method: indicate to which method will be called at the back end
- parameters: indicate to which value will be parameter for specified method, multiple values are separated by comma

#### Selenium
- browser
  - declare browser object
  - open/visit/close/switch website
  - browser tab
  - page back or forward
- DOM related
  - find DOM
  - interactive with DOM
  - DOM attributes(id, location, tagName, size)
- cookies setting
- frame related
- execute js
- wait(implicit、explicit)
- exception

### questions
- what does this position do? to resolve what? what is the responsibility?
- what is the technology stack?tool?need any key skills?
- what kind of person you look for?
- this position is new position or someone left?why did previous person leave?
- report to whom? the structure of department? how many person in department?how many tester? how many dev?
- office location?
- Can I visit google using company network?
- the importance of frontend / test in project?
- talk about project?
- Dose team often work overtime or business travel?
- Does company have any training or any way to help new member be part of team quickly?
- Is my English level fine for this position/vacancy?
- Do you think any thing that I need to improve?
- Can I ask anything? Can you tell the good part of company or bad part of company?

### end
I really appreciate you taking the time to interview me

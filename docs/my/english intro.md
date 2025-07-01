Gamma Knife Rack rotate 30 degrees
procrastination
refrigeration
mind map
intermediate
cancer
cobalt
mechanical
electronic

### Copeland

I know copeland from the official website,Copeland is a global leader in sustainable heating, cooling and refrigeration solutions for commercial industrial, cold chain and residential industries. Copeland helps customers and end users reduce carbon emissions, improve energy efficiency, and safeguard user's perishable food and medicine.

and this is all I know about Copeland

### introduces

Good morning/afternoon, interviewer. [Allow me to briefly introduce myself.] My name is Jack, I’m 42 years old, and I’m from Xi’an. I graduated from Xi'an Polytechnic University in 2008. My major is Computer Science and Technology, By now I have over 15 years of work experience and have worked at four companies. I began my career as a Java developer building web systems for years, then I transited to an automated testing engineer role in recent years.

In my current position, my responsibilities include writing and maintaining automated test scripts using JavaScript, setting up automated test environments, and analyzing automated test reports, to see if there are any bugs exist in target softwares, This job is similar to what I did at Emerson. However, a key difference is that I am the owner of automation task. This means I managed all aspects of automation work myself, including technology selection, organizing automated testing project, setting up CI environment, and integrating Jenkins with automated tool, which is TestComplete.

As a result, my work increased testing efficiency by 40%.This work experience has strengthened my confidence in my skills and deepened my expertise in automation.

Thank you.

#### What do you like/want to join about the company?

I am excited about the opportunity to collaborate with talented individuals from all over the world,the diverse cultural backgrounds from different countries.This position aligns perfectly with my skills and my past work experience. especially for environmental systems or devices. So I am confident that I am well-qualified for this role.I can perform it effectively.

My experience with automation aligns with the precision and reliability required for environmental testing systems.
I’m eager to apply my automation expertise to ensure the reliability of environmental testing systems at Copeland.

#### Why do you want to change you job? why are you leaving your current position?

There are three main reasons:

First, my current company is not a traditional IT company, which means the testing team has less influence than I had expected. This makes much harder to push automated testing projects in my company.
Second, due to organization changed, I frequently visit customer sites, the hospitals, to operate or to test radiation machine. which called Gamma knife. This exposes me to radiation environment, This is not good for healthy.This is the most important reason that I am seeking a new opportunity.
Finally, I don't want to give up my English. if I work in a global team, It is helpful for improving my English level

Finally, I am eager to advance my career. I believe this position offers greater opportunities for professional growth and challenges that align with my skills and ambitions.

#### What is the biggest accomplishment form these jobs?

After completing the automation project, My achieved 40% increase in test team efficiency.

Scrum teams, as my primary stakeholders, reported that the synchronization tool significantly saved them time.

I am proud of delivering the synchronization tool between StarTeam and Rally to the Scrum team, enhancing their productivity.

### talk about project

- background
- your role, what you did
- result
- summary and insufficiency
  - what do you get from the project?
  - any insufficiency? how to improve?

#### TPS automated project

The TPS automated project is to build for testing the target desktop application, this target application is used to make a treatment plan for patient.

Do you know about TPS? the basic process of how to use it is

1. import standard DICOM images
2. contour some volumes, it means point out where the tumour located and point put some key organ
3. calculate the dose, the radiation dose
4. the doctor checks the report, if it is fine, export it then treat patient, if it is not ok, re-contour and re-calculate until it can be accepted

We use TC, a commercial automated tool, to test the UI function of the application, the purpose of TPS automated project is to save the time of tester from manual test.

What I did just like what I said above, turn manual cases into automated scripts, update scripts, organize the project structure, set up CI environment, analyze the test report, and some manual test.

For now, I have finished over 50% percent of automated scripts. Our team saw a 40% increase in test team efficiency. normally, the tester need to spend 2 days to test a new version of the application, but now it will be done less than half day.

From this project, I have learned a lot of javascript knowledge, I use it more skilled. but there is a little regret, most of the scripts written by ES5 grammar,if I have enough time, I will refactor it to ES6 grammar, this is the trend, furthermore, I did not write full of unit test for my business code, if I have the opportunity, I will add them as well.

##### technology selection

Here are the key reasons for selecting TestComplete (TC) for our automation testing needs:

- Low Learning Curve: TestComplete supports multiple scripting languages, including JavaScript, Python, and others, with which I am familiar. This compatibility reduced the learning effort.
- Cost-Effectiveness: My company is a small organization with limited resources, despite having several branch offices. TestComplete was a cost-effective solution for our testing team’s budget.
- Compatibility with Current Work: The target application, developed in Qt5, is fully supported by TestComplete, which can recognize its components and objects for effective UI automated testing.
- Accessible Documentation: The official TestComplete documentation is clear and comprehensive. I was able to learn the tool proficiently in less than a month.
- Active Community Support: I engaged with the TestComplete community, raising several topics and even identifying a bug. The TestComplete team promptly provided a hotfix for this issue.

##### difficult point

Here are key aspects of my experience with TestComplete (TC) for automated testing:

- Image Comparison: TestComplete does not natively recognize image objects, so testing image-related functions requires preparing a set of predefined images. These expected images are stored in TestComplete and compared with actual results during testing.
- Organized Project Structure: I organize folders based on different functional modules and encapsulate common functions, such as data retrieval from various tables or navigation to the main UI, to improve efficiency and maintainability.
- Object Mapping: I utilize TestComplete’s object mapping feature to accurately identify and interact with UI components during automated testing.
- Global Event Handling: My approach involves writing business logic code first, which - automated test cases then invoke. Common functions, such as retrieving data from different tables or navigating to the main UI, are encapsulated for reusability. Each test case follows a cycle: launching the target application, performing operations to reach the checkpoint, verifying properties against expected outcomes, and exiting the application.

#### oxygen(encapsulation、poly'morphism)

I contributed to Oxygen, an automated test framework developed by Emerson’s Automation team, designed to test various web systems. Oxygen processes numerous XML files into related beans to execute automated test cases, generating reports upon completion that are sent to relevant stakeholders. The primary technology stack includes Java and Selenium, with Java encapsulating Selenium functionality.

To clarify, Oxygen is a semi-finished framework that defines various web components, such as buttons, links, tables, checkboxes, and text inputs, as abstract classes. This requires the target system to implement these components as needed.

Although I joined the team after the framework was initially developed, I have a clear understanding of its workflow and functionality. My contributions included enhancing the framework, writing automated test scripts, and defining components. Is it appropriate to share this information with you?

Specifically, my responsibilities involved converting manual test cases to automated scripts and maintaining them, setting up CI environments during regression testing, analyzing test reports, enhancing the framework, and defining components.

The Scrum team, as my primary stakeholders, benefited significantly from Oxygen, which saved considerable time during regression testing. Nearly one thousand automated scripts were executed within a week.

Through this project, I gained extensive knowledge of automation, including the automated test case lifecycle, execution of test cases, setting up automation environments, and more.

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

Thank you for your time

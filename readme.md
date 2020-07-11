# DevJam Project by Team Code S.W.A.T
This is project which we are making during Devjam Competition organized by zaio. This Project has various Components that are given in particular weeks of competition. Complete Description of each component will be given Below.

## Contributors:

  Name | Github | LinkedIn
  -------------|------------------------------------------|----------------------------------------------------
  __Manjot Singh__ | [Github](https://github.com/manjots1607) | [LinkedIn](https://www.linkedin.com/in/manjot-singh-5bb706153/)
  __Bharat Nischal__ | [Github](https://github.com/BharatNischal) | [LinkedIn](https://www.linkedin.com/in/nischalbharat/)

## Technical Stack

* __MongoDB__ (Database)
* __Express__ (NodeJS Framework)
* __React__ (Frontend)
* __NodeJS__ (Backend)

## Components:

 Component | Link
 ----------|-------
 Profile Generator | [click to see](#profile-generator)
Adding Content  | [click to see](#adding-content)
Learner's Portal | [click to see](#learners-portal)
Marking System on Admin Portal | [click to see](#marking-system-on-admin-portal)
Testing System | [click to see](#Testing-System)
Course System | [click to see](#Course-System)
Coding System | [click to see](#Coding-System)

## How To Run ?
  To Know functionality of this project there are two ways you can either view deployed version or run it locally.  
  1. ### Deployed:
        [Click this link to view deployed version](http://devjam-code-swat.herokuapp.com/)
  1. ### Locally:
        0. Install nodeJS, MongoDB.
        1. Clone This Git Repository using:
            ```bash
            git clone https://github.com/BharatNischal/devJam-week0.git
            ```
        2. Install Client Dependecies by running commands:
            ```bash
            cd client
            npm install
            ```
        3. Install Server Dependecies by running commands:
            ```bash
            cd server
            npm install
            ```
        4. Run Client by running following command:
            ```bash
            cd client
            npm run start
            ```
        5. Run Server by running following command:
            ```bash
            cd server
            npm run start
            ```
        6. Open [localhost:3000](http://localhost:3000)


## Profile Generator
 This was component developed in warmup week & our team also recieved solution of week by developing this. This component enables admin to create profiles for developers.

 You can click to view [Sample Profile](http://devjam-week1.herokuapp.com/profile/Bharat/5ec90895fc230c00174a62be).

 #### Routes
 Sr No. | Path | Description
 -------|-----|------------
 1.| /login | Admin Can Login
 2.| /profiles | It contains list of created Profiles.
 3.| /createProfile | This Route is used to create new developer profiles.
 4.| /editProfile/:name/:id | This Route is used to editProfile Of particular developer.
 5.| /profile/:name/:id | This is profile of particular developer & this link can be shared.
 6.| /adminDashboard | This is accessible to only super admin and can be used to create new admins.   
 
 #### Deliverables for the week
 [Click to view](https://firebasestorage.googleapis.com/v0/b/zaio-corporate-platform.appspot.com/o/task_files%2F%23DevJam%20Warmup%20week.pdf?alt=media&token=8b8a986f-273b-4a6e-8bd0-f96956272589)

## Adding Content
This is component that we have to develop in week 1 and 2. This component help admins to add content in this platform. This component is only visible to admins. In content We have different topics and topics can have multiple videos and deliverables. USP of this component is its UI & UX which includes loaders, draggable sorting, sidebar, etc.
 #### Routes
 Sr No. | Path | Description
 -------|-----|------------
 1.| /content | This is main route where content can be managed.
 2.| /topic/:id | This route is used in editing and adding new topics.
 3.| /deliverable/:id | This route is used in editing and adding deliverable.
 4.| /video/:id | This route is used in editing and adding videos.
 
 #### Deliverables for the week
 [Click to view](https://firebasestorage.googleapis.com/v0/b/zaio-corporate-platform.appspot.com/o/task_files%2F%23DevJam%20Week%201%20%26%202.pdf?alt=media&token=5172ac1b-a3cd-4811-9257-49abcfafd5b9)
 
 ## Learners Portal
 This Functionality will allow signup students from google, github or by email and In this they can see content added by admin and also submit the submission in form of zip.
 #### Routes
 Sr. No. | Path | Description
 --------|------|------------
 1.| /studDash | This Route will show all topics cards.
 2.| /topic/:topicId/:itemId | This Route opens topic page with item with (itemId) and it also has playlist for easy navigation. (Items is Either Topic or Video).
 
 ### Bonus
 - __Video Should Not Downloaded from Inspector__: We Added Server Side logic to enusre we are not exposing cloud link of video to end user even if he inspects the video element. The detailed explanation of our logic is in drive document. [Click here to view](https://docs.google.com/document/d/1i5CRbXbxZtEYLbJvpbzy4RHniOUgp-PKbD1IHW_tUHA/edit?usp=sharing)
 
 #### Deliverables for the week
 [Click to view](https://firebasestorage.googleapis.com/v0/b/zaio-corporate-platform.appspot.com/o/task_files%2F%23DevJam%20Week%204_%20Learners%20Portal.pdf?alt=media&token=5ef88557-8764-45d8-8ba7-4a6f56908d2d)
 
 ## Marking System on Admin Portal
The admin portal will now be used to view each of the students deliverable submissions and allow them to be marked. These will in turn be seen by the learner themselves.
 #### Routes
 Sr No. | Path | Description
 -------|-----|------------
 1.| /marks | This route consists of a excel like UI where the admin can view the marks for each deliverable for every student. They can update the marks, view the submission(through redirect to /submission/:id/:index) and go to a specific deliverable page to apply sorting and filtering. This page also contains average scores for each deliverable.
 2.| /submission/:id/:index | This route shows the submission for a particular deliverable for all the students. The user from where the view submission is called will be active, __index__ param help us to manage the active student. Admins can also reply to the private comments here.(This route is renamed from the /submission/id because of our database modal design to make the webapp faster by reducing load time. More about this in bonus part.)
 3.| /marks/deliverable/:id | This route helps us to filter the submissions from various students based on options provided and can then sort them as well.
 
 ### Bonus 
 - __Avatars__: Student avatars are provided in the marks and submission page.
 - __Navigation__: The navigation to the different pages in the webapp is made very easy. Links and back buttons are added in every page and are placed in such a way that the user can find them easily.
 - __Startup Guide__: Startup guide has been provided in the marks page which will teach the users how to use this route when they visit the __/marks__ page for the first time.
 - __Edge cases covered__: In the marks and submission page edge cases have been covered during marking so that if a teacher accidentlly gives marks greater than Max marks or marks below 0 they shoud be converted to max marks and 0 marks respectively.
 - __Scalability__: We have added the lazy loading for the marks page to get a certain number of deliverables from database (currently set to 10 but can be changed based on database size). When a user scrolls to the end the new deliverables are requested from database. Thus in terms of scalability our app performance will not be affected as the users/database grow.
 - __Faster Loading__: When redirecting from __marks__ to __deliverable__ and __submission__ pages, the data is sent as prop as we have required data already in the marks component which makes the rendering of these pages very fast. We have also taken care of hard refreshing. In case of hard refreshing the data will be requested from Database.
 - __Database Model Design__: The design of the database model is designed in such a way that the data is fetched from database without any complex queries and complex constraints to join the collections. In our case the data is stored in a very convinient way and we just need to populate the data.
 - __Fast Filering and Sorting__: For filtering and sorting we have stick to the client side, so this will save the time to give a request to database about a query -> Sorting data -> Send the response data.
 The client side JS handles the Sorting and Filtering thus saving time.

#### Deliverables for the week
 [Click to view](https://firebasestorage.googleapis.com/v0/b/zaio-corporate-platform.appspot.com/o/task_files%2F%23DevJam%20Week%205.pdf?alt=media&token=8838b37b-84a7-4b99-a805-5fb21b24329e)

## Testing System
The main deliverable for this week revolves around creating a testing system that enables the admin to create a test & publish it to specific students. The students can login, take the test and their submissions will be autograded. The admin can then provide feedback that is viewable by the student themselves. 
#### Routes
Sr. No. | Path | Description
 --------|------|------------
 1.| /test | This Route will show all tests with their status.
 2.| /test/:testId | This Route opens create test page where you can add different types of questions, preview the test, add autograding, select time for test etc.
 3.| /livetest/:testId | This route gives the authorized students an access to take the test and also saves the progress of the test.
 4.| /publish/:testId | This route publish the test and help admins to select the students who can take test.
 5.| /result/test/:testId | This test gives details about which students have given the test and what are their scores. You can click on the name of student to get detailsed information on marking which redirects to route /resultSingle/:studentId/:testSubmissionId
 6.| /resultSingle/:studentId/:testSubmissionId | The admin can see the details about what are the answers given by the students and can edit marks and add feedback.
 7.| /allTests | Students can see their results and marking of the tests which are released.
 
## Course System
A MEGA Bonus Challenge is open & this can help push your team into the next round! You'll need to create a course scheduler by setting the start date & time. The admin can add videos, deliverables and test to the schedule on specific days. The scheduler can also automatically show due dates. Admins can subscribe specific students to each schedule. The student can then view the schedule & receive reminders linked to specific events. The items details should be accessible by clicking.

#### Routes
Sr. No. | Path | Description
 --------|------|------------
 1.| /courses | This Route will show all courses with their status.
 2.| /course/:courseId | This Route opens create course page where you can add set the timing of the course, add deliverables/ videos/ tests / general events and edit them as well.
 3.| /learner/courses | This route will show all the courses which the user can access. 
 
 #### Specials
 1. The test saves the progress automatically (when a user submit a question the progress is saved to database thus avoiding regular timed updates) and questions can be shuffled.
 2. There is a upcoming feature which will tell the students about the all the events in the coming week.
 3. Daily reports about the upcoming events for the next day at 6:00pm . Note that we have deployed our app at heroku which sleeps the server after every 30 mins of inactivity so please open the app few time before 6:00pm to see the results(for code see timedAlert.js file).
 4. Notifications of every alerts using email and lerner portals notifications.
 5. Student avatars are provided in the marks and submission page.
 6. The navigation to the different pages in the webapp is made very easy. Links and back buttons are added in every page and are placed in such a way that the user can find them easily.
 7. For filtering and sorting we have stick to the client side, so this will save the time to give a request to database about a query -> Sorting data -> Send the response data.

#### Deliverables for the week
 [Click to view](https://firebasestorage.googleapis.com/v0/b/zaio-corporate-platform.appspot.com/o/task_files%2F%23DevJam%20Week%206.pdf?alt=media&token=9849c7c4-adc6-4808-8f01-9a1e76c26a00)

## Coding System
The finals are going to involve allowing admins to create coding challenges that can be attempted by learners - focused on python, java, and javascript accepted as solutions. The system should provide instructions on how an admin can create coding challenges and have a points system. The learner portal should then have a challenges page that allows students to click on attempt the challenges that were created by the admins. A points system should be included to reflect their marks.

#### Routes
Sr. No. | Path | Description
 --------|------|------------
 1.| /codingQuestions | This Route will show all competitive coding questions.
 2.| /compCoding/question/:id | This Route opens a test page for student where student can attempt the competitive coding question and get results. In this page the student can view the leaderboard, submissions and editorial part.
 3.| /addQuestion/:id | This route edit the competitive coding question for admins. They can publish and unpublish questions from here.
 4.| /home | This route is a dashboard for both students and admins and can go to relevent page from there. 
 5.| /uiquestions | This route shows all frontend based questions.
 6.| /coding/uiquestion/:id | This Route opens a test page for student where student can attempt the frontend coding question and get results. In this page the student can view submissions.
 7.| /admin/uiquestion/:id | This route edit the frontend coding question for admins. They can publish and unpublish questions from here.
 
 ### Extras 
 - __AutoComplete & shortcuts in Code Editor__
 - __Themes in Code Editor__
 - __Navigation__: The navigation to the different pages in the webapp is made very easy. Links and back buttons are added in every page and are placed in such a way that the user can find them easily.
 - __LeaderBoard for every question__
 - __Different Layouts in frontend test__
 - __AI based frontend Evaluation__
 - __Visible and hidden test cases __: The design of the database model is designed in such a way that the data is fetched from database without any complex queries and complex constraints to join the collections. In our case the data is stored in a very convinient way and we just need to populate the data.
 - __Fast Filering and Sorting__: For filtering and sorting we have stick to the client side, so this will save the time to give a request to database about a query -> Sorting data -> Send the response data.
 The client side JS handles the Sorting and Filtering thus saving time.
 
 ### Note
 In coding questions the Run button will only test visible test cases and will not give any marks. Please submit the code to run through all test cases and save submission.
 If a person started a test but don't submit anything his name will be shown on leaderboard and not on submissions because the student has attempted the test

#### Deliverables for the week
 [Click to view](https://firebasestorage.googleapis.com/v0/b/zaio-corporate-platform.appspot.com/o/task_files%2F%23DevJam%20Week%207%20(finals).pdf?alt=media&token=e5d05469-fdc8-45eb-920e-ad0b233e325a)

### Video link for final week submission
https://drive.google.com/file/d/1hX7Rl03VCL5uUnqf56dbIGJ4RkUJRAS5/view

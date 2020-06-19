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
Marking System on Admin Portal | [click to see](#marking-system-on-admin-portal)

## How To Run ?
  To Know functionality of this project there are two ways you can either view deployed version or run it locally.  
  1. ### Deployed:
        [Click this link to view deployed version](http://devjam-week1.herokuapp.com)
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

## Adding Content
This is component that we have to develop in week 1 and 2. This component help admins to add content in this platform. This component is only visible to admins. In content We have different topics and topics can have multiple videos and deliverables. USP of this component is its UI & UX which includes loaders, draggable sorting, sidebar, etc.
 #### Routes
 Sr No. | Path | Description
 -------|-----|------------
 1.| /content | This is main route where content can be managed.
 2.| /topic/:id | This route is used in editing and adding new topics.
 3.| /deliverable/:id | This route is used in editing and adding deliverable.
 4.| /video/:id | This route is used in editing and adding videos.
 
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

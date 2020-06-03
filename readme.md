# DevJam Project by Team Code S.W.A.T
This is project which we are making during Devjam Competition organized by zaio. This Project has various Components that are given in particular weeks of competition. Complete Description of each component will be given Below.

## Components:

 Component | Link
 ----------|-------
 Profile Generator | [click to see](#profile-generator)
Adding Content  | [click to see](#adding-content)

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

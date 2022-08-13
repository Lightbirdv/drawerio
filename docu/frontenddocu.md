##### Create a new Project
- if you dont want to create a new Project, just go down to "Without creating a new Project"


#Intro
- Tech = Next.js

#firstSteps
- download node.js https://nodejs.org/en/
- version 16... lts, works better than 18
- after install, check version
- node -v & npm -v 

#Create first Next.js project
- Attention, this isthe only cases where you have to use npX and not npm, its not a Typo
- npx create-next-app next-cd or
- npx create-next-app [projectname]

#run the project
- npm run dev
- in the cmd you can see the link url: http://localhost:3000
- just click on it and the Website will open up

#little overview about the pages
- index.js = main directory, here you call all components

- components = Here you create each individual component to keep track

- styles, global.css = all styles can be found here


##### Without creating a new Project
- Just download the folder
- drag and drop in into the vsc
- required npm install --force (beacuse of @material-ui/lab@4.0.0-apha)
- Bootstrap may need to be installed separately
- npm install bootstrap
- npm run dev 

#### Backend and Database 
- We use psql
- please download the backend (you can find more information in the backend documentation)

- The backend must run continuously, for example to display the login, registration or data in a table. 

### Functioning of each component

# Logic behind the Pages (overview)
- pages/ -> different components are called
- components/ -> the content of the site, mostly functions or rarely react classes, components always have a return in which JSX (html in react/next.js) is returned
- lib/ -> middleware, mostly fetches, like delete Drawer, edit User

- index => Firstpage -> includes Navbar, Topcomponent, ServiceComponent, AboutComponent, DonwloadComponent, ContactComponent

- login => LoginComponent -> auth
- loginComponent - form and Modal
- auth => fetch login datas, route to privatepage 

- thats the logic behind almost every the page

# NavbarOne, NavbarTwo, NavbarThree
- three a little different Navbars
- NavbarOne.js hase the Login and Sign Up Button
- NavbarTwo.js has no logout Button
- NavbarThree.js has a logout Button and an Welcome text for the User

# index.js (like publicpage)
- pages/index.js has inside the main some components
- Navbar, TopComponent, Service, About and Contact, all of them together makes the publicpage
- in the Navbar in the navbar there is a login and registrations button
- in the TopComponentComponent is a regButton also

# Registration
- RegistrationComponent has the form and a Methode which call the lib/reg.js
- lib/reg.js takes the form input and fetch the Data

# Login
- similar to registration
- LoginComponent has the form and a Methode which call the lib/auth.js
- lib/auth.js takes the form input and fetch the Data
- on the bottom of the Login page there is a forgett Password and don't have an acount button

# confirmMail.js, confirmHash.js
- after the user has registered, they should confirm their email
- After the user logs in, a banner with an email confirmation button appears on the AxiosPost.js page

- If the user clicks on the button, a modal opens in which the email must be entered. An email with a hash code is then sent and the user must enter this in the second modal
- lib/confirmMail.js takes the email adress and fetch the data, the backend sends the mail
- lib/confirmHash.js takes the hash from the mail and fetch it to the backend, the User is now enabled


# Forgett Password and don't have an account
- if the user clicks "don't have an account" User gets pushed with Router.push(/registartion) to the registrationComponent
- If the User hase forgetten the PW, User will get an email and have to put the Hashcode in the modal and then the new PW
- lib/newPW.js gets the emailadress form the User and trigger the sendig of the forgettmail
- lib/forgettHash.js gets the Hash and the new PW, than the pw is Updated


# AxiosPost.js
- After logging in you get to the AxiosPost.js
- In the moment the page render it fetches all Drawers of the User that has logged in.
- There is a Searchfunction and an AddnewDrawer Button at the top under the Navbar
- Every Tablerow can be opend by a click and has two buttons, delete and edit
- most styles are direkt in de jsx Code but some, like the onhover color change is in the global.css

# AdminPageComponent.js
- Same as AxiosPost.js just for admins
- have an Usermanagement Button

# NewDrawer, DeleteDrawer, EditDrawer
- lib/newDrawer.js
- lib/updateDrawer.js
- lib/deleteD.js
- those three functions get called in the AxiosPost.js and get the data they need and fetch  them

# usermanagementComponent.js
- when renderd, fetch all Users and put them in a List
- DeleteUser, EditUser, SetAdmin

# isAdmin, makeAdmin, updateUser, deleteUser
- lib/isAdmin.js return true or false, if User is an Admin or not
- lib/makeAdmin.js gives an User Adminrights
- lib/updateUser.js takes the input in the usermanagementComponents.js modal and fetch the data
- lib/deleteUser.js takes the User ID and delete the User

# ThirdPageComponent.js
- All the Datas from the drawerentrys get fetched here
- We have three iterations over the Datas, first over the whole data, then over the imagesArray and then over the videoArray
- everything is displayed in rows and columns
- Each picture can be viewed in its original size on a separate page by clicking on it
- Every Entry can be deletet with the red DeleteButton

# entryDelete.js
- Takes the EntryId and delete the Entry

# showPicture.js
- routes per click to fullPic.js

# fullPic.js
- takes the imgURl and display it


**MUST DO (FIRST STEPS)**

- Install Node.js here: https://nodejs.org/en/
- after installation check version with npm -v and node -v
- Follow the Backend Docu and setup a Backend locally


**STEPS**

- Download Folder
- Open Folder in VSCode
- Open Terminal in VSCode and type "npm install --force"
- Now type "npm run build"
  -> A build folder should appear 
- Open Chrome
- type "chrome://extensions"
- activate "developer mode" on top right
- click "Load unpacked extension..." on the left
- select the build folder 
- now you should see the extension -> activate it
- go to top right and click the "extension" icon (puzzle logo)
- pin the "drawer.io" extension
- now you can open it and use it




# Custom Components
- DisplayForm
- DrawerForm
- LoginForm
- PasswordForget
- RegisterForm
- UserPage


# DisplayForm
- Displays the current Page in the Chrome Extension
- If User is logged in => UserPage will be shown
- If User isn't logged in => LoginForm will be shown
- For this mechanism the Localstorage Token is used


# LoginForm
- Form contains two Input fields; one for the Email and one for the Password
- Login Button and Register Button are implemented
- Pressing the Register Button will redirect you to the RegisterForm
- Pressing the Login Button will redirect you to the UserPage if the login credentials are correct
- After pressing the Login Button a Axios Post request will be made to the Backend with the Email and Password
- Receiving a response with the User Object and the necessary Data
- Token and Refresh Token will be set in the Localstorage
- Receiving a error response if Login is failed

# RegisterForm
- Form contains three Input fields; one for the Email and two for the Password
- The two Password fields are there to confirm that they're identical
- Register Button and Go Back Button are implemented
- Pressing the Go Back Button will redirect you to the LoginForm
- After pressing the Register Button a Axios Post Request will be made to the Backend with the Email and Password
- After some seconds you will be redirected to the LoginForm
- An Email is send where you have to confirm your Email in order to login

# PasswordForget
- Form contains one Input field; only for the Email
- Send Email Button and Go Back Button are implemented
- Pressing the Go Back Button will redirect you to the LoginForm
- After pressing the Send Email Button a Axios Post Request will be made to the Backend with the Email
- After some seconds you will be redirected to LoginForm
- An Email is send where you have to click on the link which will redirect you to a page where you change your password

# UserPage
- UserPage contains multiple features
- You can select a Drawer with the selection
- You can write a Comment in the textbox named Comment
- Your selected text which you selected on the current Tab will be shown in the Selected Text textbox
- HTML Page Content will be shown in the Page Content textbox
- Every image of the current Tab will be grabbed and shown in the Chrome Extension
- If there is a Video it will be grabbed and shown in the Chrome Extension
- The Save Button will send via Axios Post Request the Content you have selected to the Backend 
- The Plus Button will redirect you to DrawerForm
- If the token has expired the token will be refreshed with the refresh token => Axios Post Request with the refresh token to get new token and setting it to localstorage.setItem("token", ...token)
- In order to get all the Drawer the user have created there is a Axios Get Request with the token to get all the drawer => they will be set in the Selection so the user can select the drawer he wants


**URL grabbing**
1. Chrome Extension gets via Chrome API the current Tab ID
2. Returns tab Object
3. Set tab.url in tabURL useState

**Text grabbing**
1. Chrome Extension gets via Chrome API the current Tab ID
2. An async function is used => chrome.scripting.executeScript
3. In this function there is another function which is executed => getSelection().toString()
4. This text selection will be set in a useState named selectedText

**Image grabbing**
1. Chrome Extension gets via Chrome API the current Tab ID
2. All images getting grabbed with querySelectorAll("img")
3. If the image URL starts with http => pushed into imagesResult Array
3. The Array will be set in a allImages useState 
4. The allImages Array will be mapped over and all the Images will be shown in the Chrome Extension

**Video grabbing**
1. Chrome Extension gets via Chrome API the current Tab ID
2. All videos getting grabbed with querySelectorAll("iframe")
3. If the video URL starts with certain Youtube URL beginnings => pushed into videoResult Array
4. The Array will be set in a allVideos useState
5. The allVideos Array will be mapped over and all the Videos will be shown in the Chrome Extension


# DrawerForm
- Form contains one Input field; this one Input field is the Drawer name
- There is a Back Button and a Create Drawer Button
- The Back Button when pressed will redirect you back to the UserPage
- The Create Drawer Button will send a Axios Post Request with the Drawer name in order to create a new Drawer
##### Guide through the front end
- Each path is explained and the expected behavior


# Home
- Enter the URL drawerio.com, the website should now open
- When the page is fully loaded, a modal is opened right at the beginning, asking for confirmation that drawerio is allowed to collect the data, this MUST be confirmed
- The page should contain a navbar with the sign up and login button

# Sign Up
- Click on the Sign Up button
- You should now be redirected to the registration page
- There are three input fields, email and twice the password
- Now use an already registered user, a toast should now open that refuses to register
- Now use a user that does not exist yet, an email should be sent, just like a toast with the send email opens

# Confirm Email
- Now click on the email link and you will be forwarded to the login page

# Login
- Click on the login button
- You should now be redirected to the login page
- There are two input fields, email and password, now enter an existing email address and the wrong password, a toast should open at the top right corner with the content: "Sorry, you can not log in"
- Now try it with the correct information, now you should be redirected to the drawer page

# Forgot Password
- click on the text at the bottom of the login page, a page should open, now enter a valid email, an email will now be sent to it
- Click on the link in the email, a page should open, please enter the same (new) password twice, with at least eight characters
- You should now be directed to the login page

# DrawerPage
- The drawerpage contains a navbar, with a logout button, two search fields and a table with all the user's drawers
- Press the logout button, you should now be logged out and directed to home, the token should be deleted

# Searchfield for Drawers
- Suche im ersten Suchfeld nach einem Drawer, nur dieser sollte angezeigt werden

#Searchfield for Drawerentrys
- Suche im zweiten Suchfeld nach einem Drawerentry, nur dieser sollte angezeigt werden

# Create Drawer Button
- Next to the search field is a green button with a plus, click it, a modal should now open to create a new drawer, now enter the name, a new drawer should now appear in the table

# Update Drawer Button
- Rename on the yellow button should also open a modal, enter the new name, the new name should now appear

# Delete Drawer Button
- On the far right of the table there is a red button with a trash can as a sign, click on this, a modal should open that asks if you really want to delete the drawer, click on "yes", the drawer should now be deleted and fall out of the table of drawers

# Drawerentry Page
- Click on the table and you will get to the next page, the drawer entries page from the respective drawer
- On this page, the images are displayed in a timeline, your own comment, the creation date, the text previously marked on the website and/or youtube videos are displayed and a button to delete the entry and download the website content

# Download Button
- Click on the green button with the arrow down, it should download a txt document, open it and you will see the complete website content

# Delete Button
- Click on the red button with the garbage can, a confirmation modal should open, confirm it and the entry should be deleted

# the picture in its original size
- click on the respective picture, now you should be forwarded to the fullPicture page, here only the picture is displayed in its original size

# Adminpage
- If you log in as an administrator, you actually get the same path, but on the drawer page, next to the plus button for creating a new drawer, there is also the button with two people on it, this leads to user management

# Usermanagement
- All users should be displayed here, again in a table, showing whether the user has administrator rights, whether the user has confirmed their email, the user iD and the user name, and next to them three buttons that work exactly like the other tables

# Set Administrator
- There is only one new button, a green button to make a user an admin
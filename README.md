# ngo-events-client
This project is created in Angular and features user authentication and registration, as well as an admin user type and a regular user type.

The project is meant to be run in conjunction with the server located at https://github.com/LukewarmCoffee/ngo-events-server.git

Clone or download this project using the normal methods with this link https://github.com/LukewarmCoffee/ngo-events-client.git

Using a command prompt type:
1. git clone https://github.com/LukewarmCoffee/ngo-events-client.git
2. cd ngo-events-client
3. npm install
4. npm start

This will download all the relevant files using git and npm which can be downloaded at https://nodejs.org/en/ which downloads npm as well as node.js. Next it starts the server and opens the website at localhost:4200.

When registering a new user, that user's role is automatically added as a regular user. In order to initialize an admin user, navigate to ngo-events-client/src/app/register/register.component.ts and find the line:            

role: ['user', Validators.required]    //set to admin for admin priv, otherwise set user

change 'user' to 'admin' and restart the project. All new users will be registered as an admin. After creating an inital admin, change the role back to user after creating the initial first admin. All new admins can be created without altering code by an admin on the Users tab on the website. 


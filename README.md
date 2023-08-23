
# Node Js Simple JWT Auth

This application shows simple node js authentication with jwt.

The user can upload a profile image too when registering and the application comes with the ability to request password resets and reset passwords too.






## Installation

First of all clone the application

```bash
  git clone https://github.com/kellslte/node-auth-test.git
```

Then cd into the application directory

```bash
    cd node-auth-test && npm i
```

Then copy the values in the .env.example file into an env file like so

```bash
    cp .env.example .env
```

Then open the .env file and add the configuration details there. 

The configuration details you need to add include the following

|   Parameter	| Type  	| Description  	|
|---	|---	|---	|
|   PORT	|  Integer 	| The port the app will run on in localhost  	|
|   JWT_SECRET	| String  	| Any string to serve as your jwt secret key  	|
|   NODE_ENV	| String  	| The environment your app is in, usually development  	|
| MAIL_HOST | String | The address for your mail host |
| MAIL_PORT | Integer | The port for your mail host |
| MAIL_USER | String | Your username on the mail server |
| MAIL_PASS | String | Your password on the mail server |
| MONGODB_URI | String | The url for your mongodb database |

When you are done, you can run the app with the following command

```bash
    npm run start
```
## Authors

- [@kellslte](https://www.github.com/kellslte)
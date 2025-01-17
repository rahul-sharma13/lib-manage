## Backend
The API is written in node js and express js with mongodb as database
Find the frontend instructions after backend section is done(or provided separately in each folder)

## Getting started
Install with npm - commands required to start

```bash
repository clone - git clone https://github.com/rahul-sharma13/lib-manage.git
```

```bash
  cd server
  npm install
  npm run server
```

## Sample env
Please add this to the api folder in .env file

```bash
MONGO_URI=
PORT=3000
JWT_SECRET=caskbaskbf
```

## Authentication and authorization flow
ideally we should be using two refresh token(long lived) and access token(Short lived), whenever access token is expired we can refresh it if the refresh token is present but if the referesh token is also expired then user needs to login again. Refresh token can be stored on the database while access token is only in cookies. Used as httponly for better security. Here only access token is used as it is small application and because of time constraint of assignment.
![image](https://github.com/user-attachments/assets/f958fd84-0fef-47f8-ba25-c154100fe988)

## Module Used

```bash
Bcrypt - for encryption of password
JWT - for authenication and user authorisation
Mongoose - for connected mongodb with node
```

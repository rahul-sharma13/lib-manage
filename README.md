## Backend

The API is written in node js and express js with mongodb as database

## Sample env
Please add this to the api folder in .env file

```bash
MONGO_URI=mongodb+srv://rahulharit13:gkrOdJPZLr6tav3x@cluster0.pvtkg.mongodb.net/
PORT=3000
JWT_SECRET=caskbaskbf
```

## Getting started

Install with npm - commands required to start

```bash
repository clone - git clone https://github.com/rahul-sharma13/nextBlog.git
```

```bash
  cd api
  npm install
  npm run dev
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

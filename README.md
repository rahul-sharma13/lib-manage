## Project walk through
you can find the add book functionality after 1:00 min mark and a book can be borrowed from all books page, while it can be returned through dashboard page of a user. Dashboard and add books are protected routes.
https://drive.google.com/file/d/1BzN1zLnZxG9ML0Bnm8LqTTyhFmg5vc_J/view?usp=sharing

## Deployed link(vercel) 
https://lib-manage-e6h4jeyji-rahuls-projects-8d0afc8f.vercel.app/

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

## FRONTEND
Built using reactjs

## Getting started

Install with npm - commands required to start

```bash
repository clone - git clone https://github.com/rahul-sharma13/lib-manage.git
```

```bash
  cd client
  npm install
  npm run dev
```

Open [http://localhost:5173](http://localhost:5173) with your browser to see the result.

## Project Structure

```bash
src directory - consists of all the pages, components, hooks and root page of the project

component - consists of all the component used, while ui inside the component directory is used for common components

redux - for setting up redux store and slice

hooks - to create custom hooks
```

## Tech Used

```bash
Axios - provides more default settings than fetch(better option would be to using it with react-query for client side caching and easy management of states)

tailwind - shadcn is highly customisable library, makes it easy to Used

redux - to manage global states
```

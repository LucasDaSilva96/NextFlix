# Netflix Clone

This is a Full Stack Netflix Clone built using React, Tailwind CSS, Next.js, Prisma, MongoDB, NextAuth, and deployed on Vercel. The project aims to mimic the core features of Netflix, including user authentication, movie browsing, and movie details display.

![Preview image 1](/public//images//NextFlix-1.png)
![Preview image 2](/public//images//NextFlix-2.png)

## Table of Contents

- [Demo](#demo)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)

## Demo

A live demo of the project can be found at [www.nextFlix.com](https://next-flix-peach.vercel.app/).

## Features

- User Authentication with NextAuth
- Movie Browsing
- Movie Details Display
- Responsive Design using Tailwind CSS
- Integration with MongoDB using Prisma ORM
- Server-side rendering with Next.js
- Deployed on Vercel

## Technologies Used

- **React**: A JavaScript library for building user interfaces
- **Tailwind CSS**: A utility-first CSS framework
- **Next.js**: A React framework for server-side rendering and static site generation
- **Prisma**: A next-generation ORM for Node.js and TypeScript
- **MongoDB**: A NoSQL database for storing user and movie data
- **NextAuth**: Authentication for Next.js
- **Vercel**: A platform for deploying serverless functions and static sites

## Installation

### Prerequisites

- Node.js (>= 14.x)
- npm or yarn
- MongoDB instance

### Clone the repository

```sh
git clone https://github.com/LucasDaSilva96/NextFlix.git
cd NEXTFLIX
```

```sh
npm install
# or
yarn install
```

```sh
DATABASE_URL=mongodb+srv://<username>:<password>@cluster.mongodb.net/netflix-clone?retryWrites=true&w=majority
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_secret
NEXTAUTH_JWT_SECRET=your_secret
GITHUB_ID=your_github_client_id
GITHUB_SECRET=your_github_client_secret
GOOGLE_CLIENT_ID=your_google_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
DEMO_USER_EMAIL=demo_email
DEMO_USER_PASSWORD=demo_password

```

### Run database migrations

```sh
npx prisma migrate dev --name init
```

### Start the development server

```sh
npm run dev
# or
yarn dev
```

### Credits

This project was inspired by and built with the help of the tutorials and resources provided by [Code With Antonio](https://www.youtube.com/@codewithantonio). Special thanks for the detailed and comprehensive guides that made this project possible.

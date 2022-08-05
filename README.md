<h1 align="center">
  Tomateto React - Social Media Web App
</h1>
<br>
<p align="center">
  <img src="https://user-images.githubusercontent.com/69242299/183031100-0f3d44ac-9899-4581-bdf4-d629829391d3.png" alt="tomateto-logo" />
</p>
<br>

<p align="center">
  <a href="https://tomateto.com">
    <img src="https://img.shields.io/badge/vercel-ready-lightgrey" alt="vercel-badge">
  </a>
  <a href="https://tomateto.com">
    <img src="https://img.shields.io/badge/demo-online-brightgreen" alt="demo-badge">
  </a>
</p>

## Introduction

This is a social media web application powered by React and provides main functionalities of a social media app such as creating new posts, liking a post, following a user, etc. With this web app you can interact and show data requested from Tomateto API through user interface.

This is the front-end side of Tomateto. To learn more about the back-end side, click [here](https://github.com/adamscript/tomateto-api).

### Demo
Here is the working live demo : <https://tomateto.com>

### Built With
- [Typescript](https://www.typescriptlang.org/)
- [React](https://reactjs.org/)
- [Redux](https://react-redux.js.org/)
- [MUI (Material UI)](https://mui.com/)
- [Firebase](https://firebase.google.com/)
- [Vercel](https://vercel.com/)

## Features
### Single Page App ([example code](https://github.com/adamscript/tomateto-react/blob/main/src/routes/App.tsx)) {#single-page-app}
By building this web app as a single page app, users can navigate through the pages without reloading the entire page. This feature is powered by [React Router](https://reactrouter.com/).

### Responsive Design ([example code](https://github.com/adamscript/tomateto-react/blob/main/src/routes/App.tsx))
This web app will adapt its layout based on the device it’s currently running on. So it will always look good whether you use it on mobile or desktop.

| Desktop | Mobile |
| ------- | ------ |
| <img src="https://user-images.githubusercontent.com/69242299/183032512-b6a10b91-bf4c-4f53-a874-5a5b9f349205.png" alt="home_desktop" width="400"/> | <img src="https://user-images.githubusercontent.com/69242299/183032519-62097dad-b5ab-4149-a814-92bd03101791.png" alt="home_mobile" height="200"/> |
| <img src="https://user-images.githubusercontent.com/69242299/183032542-4b8533aa-b184-491b-bc4e-3cebe98abfae.png" alt="user_desktop" width="400"/> | <img src="https://user-images.githubusercontent.com/69242299/183032549-5ad8a468-d229-49f7-910d-23be27873b9c.png" alt="user_mobile" height="200"/> |
| <img src="https://user-images.githubusercontent.com/69242299/183032528-0af346aa-47a3-4197-b3f5-82107d69f873.png" alt="post_desktop" width="400"/> | <img src="https://user-images.githubusercontent.com/69242299/183032531-61085f71-9022-4a70-a4f5-5c3defa94ac7.png" alt="post_mobile" height="200"/> |
| <img src="https://user-images.githubusercontent.com/69242299/183032521-600f2e64-f565-4f1d-a900-ea406bdda0bf.png" alt="newpost_desktop" width="400"/> | <img src="https://user-images.githubusercontent.com/69242299/183032527-372d95b9-b38d-43e8-bed9-4fe851e9324f.png" alt="newpost_mobile" height="200"/> |

### Instant Search ([example code](https://github.com/adamscript/tomateto-react/blob/main/src/routes/Search.tsx))
Users can type in keywords and get results instantly.

### Image Resize & Compression ([example code](https://github.com/adamscript/tomateto-react/blob/main/src/features/utility/resizePhoto.ts))
To reduce pixelation on pictures loaded on the page even on the smallest scale, every picture uploaded will be compressed and resized by implementing image processing. This procedure also reduces upload size. This feature is powered by [Pica](https://github.com/nodeca/pica).

### Authentication
Users can sign up and log in to create posts, comments, and follow other users. They also can reset password, change email, and delete their account when needed. This feature is powered by [Firebase Authentication](https://firebase.google.com/docs/auth).

### Error Logging ([example code](https://github.com/adamscript/tomateto-react/blob/main/src/features/utility/errorLogging.ts))
When the web app detects an error, it will store the error message, timestamp, and the action that causes the error in a dedicated NoSQL database to aid in the debugging and troubleshooting process.

### Dark Mode ([example code](https://github.com/adamscript/tomateto-react/blob/main/src/Page.tsx))
It’s just better for your eyes.

<img src="https://user-images.githubusercontent.com/69242299/183036628-03d8ed10-2abe-4ea7-a0a3-b9b1d63919db.png" alt="home_dark_desktop" width="600"/>

### Main social media functionalities :
- Follow and unfollow user
- Create, edit, and delete post
- Like and unlike post
- Create and delete comment
- Like and unlike comment
- Upload photo
- Add emoji, powered by [Emoji Mart](https://github.com/missive/emoji-mart)
- Edit profile

## Reflection
Through this project, my main goal was to learn how to write my own REST API and the React app to interact it with. I also wanted to use this opportunity to learn about cloud, containers, testing, and CI/CD.
Initially I wanted to build it as microservices but I figured it was a bit too ambitious for what I was trying to build with the amount of time that I had, so I built it as a monolithic app instead. 

If I had more time, I would add these :
- Implement websocket to add features like notifications, private message/chat, live feed, etc.
- More advanced text editor to add features like mentions, hashtags, hyperlink, etc.
- Add tests for the react app.
- Add pagination, I figured that there won’t be that many posts so I plan to add this later when it’s absolutely needed.
- Optimize it further by implementing caching (perhaps Redis?).

## Support
If you are having issues or found a bug, feel free to [open an issue](https://github.com/adamscript/tomateto-react/issues). Also if you have questions about the project, feel free to reach out at: <adam@adamscript.com>.

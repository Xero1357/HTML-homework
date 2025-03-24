const posts = [
    {
      name: "Lily Carter",
      createdAt: "12-05-2018",
      message: "Excited to share my latest adventure!"
    },
    {
      name: "Noah Williams",
      createdAt: "07-11-2020",
      message: "Learning new JavaScript features is so much fun!"
    },
    {
      name: "Isabella Kim",
      createdAt: "29-03-2015",
      message: "Finally completed my first app!"
    },
    {
      name: "Lucas Brown",
      createdAt: "14-09-2019",
      message: "Can't wait for the holiday trip!"
    },
    {
      name: "Ava Jones",
      createdAt: "01-01-2022",
      message: "Wishing everyone a fantastic year ahead!"
    },
    {
      name: "Oliver Garcia",
      createdAt: "25-07-2017",
      message: "Looking forward to our coffee catch-up!"
    },
    {
      name: "Emily Cruz",
      createdAt: "30-07-2017",
      message: "Just began reading a fascinating novel."
    },
    {
      name: "Michael Thompson",
      createdAt: "18-12-2021",
      message: "Savoring the cozy holiday vibes!"
    },
    {
      name: "Chloe Nguyen",
      createdAt: "05-04-2014",
      message: "Super excited for the upacoming trip!"
    },
    {
      name: "Ethan Martinez",
      createdAt: "10-08-2023",
      message: "Thrilled about starting my new position!"
    }
  ];
  
  module.exports = {
    posts
  }

//   const express = require("express");
// const router = express.Router();
// const { posts } = require('./data');

// router.get('/api/posts', (req, res) => {
//     res.json(posts);
// });

// module.exports = router;

// router.post('/api/posts', express.json(), (req, res) => {
//   const newPost = req.body;
//   posts.push(newPost); 
//   res.status(201).json(newPost); 
// });
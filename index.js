import express from "express";

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

const posts = [];
let postCount = 0;
const blogName = "Blog do Vriustolabs";
const user = {
  id: 1,
  name: "Esquistrofenighty",
  bio: "Just another poster in this wild internet",
};

app.get("/", (req, res) => {
  res.redirect("/profile");
});

app.get("/blog", (req, res) => {
  res.render("blog.ejs", {
    blogName: blogName,
    posts: posts,
  });
});

app.get("/profile", (req, res) => {
  res.render("profile.ejs", {
    user: user,
    posts: posts,
  });
});

app.post("/profile", (req, res) => {
  res.render("profile.ejs");
});

app.get("/newpost", (req, res) => {
  res.render("postForm.ejs");
});

app.post("/savepost", (req, res) => {
  const currentDate = new Date().toLocaleDateString("pt-BR", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const post = {
    id: ++postCount,
    title: req.body.postTitle,
    body: req.body.postBody,
    author: user.id,
    date: currentDate,
  };

  posts.push(post);
  console.log("criado POST:: ", post);

  res.redirect("/profile");
});

app.put("/updatepost/:id", (req, res) => {
  const currentDate = new Date().toLocaleDateString("pt-BR", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const post = {
    id: ++postCount,
    title: req.body.postTitle,
    body: req.body.postBody,
    author: user.id,
    date: currentDate,
  };

  posts.push(post);
  console.log("criado POST:: ", post);

  res.redirect("/profile");
});

app.get("/editpost/:id", (req, res) => {
  const postId = req.params.id;
  const targetPost = posts.find((post) => post.id == postId);
  if (targetPost) {
    res.render("postForm.ejs", {
      post: targetPost,
    });
  } else {
    res.sendStatus(404);
  }
});

app.post("/editpost/:id", (req, res) => {
  const currentDate = new Date().toLocaleDateString("pt-BR", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const postId = req.params.id;
  const targetPost = posts.find((post) => post.id == postId);

  if (!targetPost) {
    res.sendStatus(404);
  }

  targetPost.title = req.body.postTitle;
  targetPost.body = req.body.postBody;

  console.log("Atualizado POST:: ", targetPost);

  res.redirect("/profile");
});

app.get("/deletepost/:id", (req, res) => {
  const postId = req.params.id;

  const targetPost = posts.find((post) => post.id == postId);
  if (targetPost) {
    const index = posts.indexOf(targetPost);
    posts.splice(index, 1);
    console.log(posts);
    console.log("deleted post with id", postId);
    res.redirect("/profile");
  } else {
    res.sendStatus(404);
  }
});

app.listen(port, () => {
  console.log("Listening on port ", port);
});

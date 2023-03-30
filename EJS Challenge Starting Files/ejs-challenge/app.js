//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require("mongoose");
const { response } = require("express");
main().catch(err=> console.log(err));

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();


app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


async function main(){

  await mongoose.connect("mongodb://127.0.0.1/blogDB");
  console.log("connected");

  const postSchema = new mongoose.Schema({
    title: String,
    content: String
  });

  const Post = mongoose.model("Post", postSchema);


  app.post("/compose", function(request,response){
    const post = new Post({
      title: request.body.typetext,
      content: request.body.text1
    });
  
    post.save()
    .then(function(){
      response.redirect("/");

    })
    .catch(function(err){
      console.log(err);
    });
    
   
  
    
   });

   let posts =[];

   app.get("/",function(request,response){
    
   Post.find({})
   .then(function(posts){
    response.render("Home",{
      Homestartcontent: homeStartingContent,
      posts: posts
    })
   })
  })
   

  app.get("/posts/:postId",function(request,response){
    const requestedPostId = request.params.postId;
  
    Post.findOne({_id:requestedPostId})
    .then(function(post){
      response.render("post",{
        title:post.title,
        content: post.content
      });
    });
    
  
   });

  



}






app.get("/about",function(request,response){
  response.render("About",{content: aboutContent});
})
 app.get("/contact",function(request,response){
  response.render("Contact",{connect: contactContent});
 })
 

 app.get("/compose",function(request,response){
  response.render("Compose");
 })

 















app.listen(3000, function() {
  console.log("Server started on port 3000");
});

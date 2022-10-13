const  express = require("express");
const path = require("path");
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
mongoose.connect('mongodb://localhost/contactDance', {useNewUrlParser: true, useUnifiedTopology: true});

const app = express();
const port = 8000;

//Define mongo schema
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String
  });

  const Contact = mongoose.model('Contact', contactSchema);
//EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static'))//for using static files
app.use(express.urlencoded());

//PUG SPECIFIC STUFF
app.set('view engine', 'pug')//set the template engine as pug
app.set('views', path.join(__dirname, 'views'))//set the views directory

//END POINTS
app.get('/',(req,res)=>{
    
    const params ={};
    res.status(200).render('home.pug',params);

});
app.get('/contact',(req,res)=>{
    
    const params ={};
    res.status(200).render('contact.pug',params);

});
app.post('/contact',(req,res)=>{
    
    var mydata = new Contact(req.body);
    mydata.save().then(()=>{
res.send("This data has been saved to the database")
    }).catch(()=>{
        res.status(400).send("Item was not saved to the database")
    });
    // res.status(200).render('contact.pug',params);

});

//START THE SERVER
app.listen(port, ()=>{
    console.log(`The application has started successfully on port ${port}`);
});
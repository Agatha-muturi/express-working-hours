const express =require('express');
const path =require('path');
const app=express();

// set view engine
app.set('view engine','pug');
app.set('views',path.join(__dirname,'views',));

// middleware for working hours
app.use((req,res,next)=>{
    const now = new Date();
    const day =now.getDay();
    const hour=now.getHours();

    if (day>=1 && day<=5 && hour >= 9 && hour <=17) {
        next();

    }else{
        res.send('Sorry, the site is only available during working hours (Mon to Fri, 0900hrs to 1700hrs)')
    }
});

// server static css
app.use(express.static(path.join(__dirname,'style.css')));

// routes
app.get('/',(req,res)=>{
    res.render('index',{title:'Home'});
});
app.get('/services',(req,res)=>{
    res.render('service',{title:'Our services'});
});
app.get('/contact',(req,res)=>{
    res.render('contact',{title:'Contact us'});
});
const PORT =3000;
app.listen(PORT,()=> console.log(`Server running on http://localhost:${PORT}`));
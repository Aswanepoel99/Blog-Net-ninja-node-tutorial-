const { response } = require('express');
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes')

const { MongoDb } = require('./config/config');
const { result } = require('lodash');
const { render } = require('ejs');
// express app
const app = express();

if (process.env.NODE_ENV === 'production'){
    
}

//  connect to mongodb
mongoose.connect(process.env.MONGODB_URI || MongoDb, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => {
        console.log('mongoDb connected')
        app.listen(process.env.PORT || 3000);

    })
    .catch((err) => console.log(err))
// register view engine
app.set('view engine', 'ejs')

// middleware and static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true}));
app.use(morgan('dev'))

// routes
app.get('/', (req, res) => {
    res.redirect('/blogs')
});


app.get('/about', (req, res) => {
    // res.send('<p> about Page</P>');
    res.render('about', { title: 'About' })
});

// blog routes
app.use('/blogs', blogRoutes);

// 404 page
app.use((req, res) => {
    res.status(404).render('404', { title: '404' })
})
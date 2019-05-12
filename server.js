const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const port = 3000

// have to set environment variables before requiring edamam api 
// otherwise, the api strings don't load with values :0
require('dotenv').config({
    path: 'development.env'
})

const edamam = require('./api/edamam')

app.use(bodyParser.json())
app.use(cors())
app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });

//
app.get('/api', (req, res) => res.send('Hello World!'))

app.get('/api/autocomplete', (req, res, next) => {
    if(!req.query.search) { res.status(400).send('Need a search, dummy')}
    edamam.autocompleteIngredientSearch(
        req.query.search, 
        r => res.json(r)
    )
})

app.post('/api/getFoodIds', (req, res, next) => {
    if(!req.body.ingredients) { res.status(400).send('Need a valid ingredients object, dummy')}
    edamam.getParsedIngredientInfo(
        req.body.ingredients, 
        r => res.json(r)
    )
})

app.post('/api/getNutritionInfo', (req, res, next) => {
    if(!req.body.foodIds) { res.status(400).send('Need a valid foodIds object, dummy')}
    edamam.getNutritionInfo(
        req.body.foodIds, 
        r => res.json(r)
    )
})

app.listen(port, () => console.log(`BOWL API LISTENING ON ${port}!`))
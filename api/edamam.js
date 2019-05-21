const fetch = require('node-fetch')

const baseEndpoint = "https://api.edamam.com"

const foodDbEndpoint = `${baseEndpoint}/api/food-database/`
const parserEndpoint = foodDbEndpoint + "parser?categoryLabel=food&category=generic-foods&health=vegan"
const nutrientsEndpoint = foodDbEndpoint + "nutrients"
const nutritionEndpoint = `${baseEndpoint}/api/nutrition-data?`
const autocompleteEndpoint = `${baseEndpoint}/auto-complete`

const cupMeasureUri = "http://www.edamam.com/ontologies/edamam.owl#Measure_cup"

const makeCredString = (id, key) => `app_id=${id}&app_key=${key}`
const foodDbCreds = {
    id: process.env.FOOD_DB_AUTH_ID,
    key: process.env.FOOD_DB_AUTH_KEY
}
const foodDbAuthStr = makeCredString(foodDbCreds.id, foodDbCreds.key)

const nutritionCreds = {
    id: process.env.NUTRITION_DB_AUTH_ID,
    key: process.env.NUTRITION_DB_AUTH_KEY
}
const nutritionStr = makeCredString(nutritionCreds.id, nutritionCreds.key)

module.exports = {
    /**
     * Retrieves edamam FOODIDs from a list of ingredient names (and categories)
     * @param {*} ingrList A list of ingredients - should have fields 'name' and 'category'
     * @param {*} cb Callback to execute
     */
    getParsedIngredientInfo(ingrList, cb) {
        const gets = ingrList.map(ingr => {
            const url = encodeURI(`${parserEndpoint}&ingr=${ingr.name}&${foodDbAuthStr}`)
            return fetch(url, {
                method: 'get'
            })
            .then(response => response.json())
            .then(json => Object.assign(json, { category: ingr.category }))
        })

        const successFilter = r => r.parsed.length > 0
        const stripFields = d => {
            return {
                ingredientName: d.text, 
                foodId: d.parsed[0].food.foodId, 
                category: d.category
            }
        }
        return Promise.all(gets)
            .then(data => data.filter(successFilter))
            .then(data => data.map(stripFields))
            .then(cb)
            .catch(err => console.log("There was a network error: ", err))
    }, 

    /**
     * From a list of foodids retrieves all nutrition information
     * @param {*} ingrList list of foodId strings
     * @param {*} cb callback to execute
     */
    getNutritionInfo(ingrList, cb) {
        const gets = ingrList.map(ingr => {
            const params = { 
                ingredients: [
                    {
                        quantity: 1, 
                        measureURI: cupMeasureUri,
                        foodId: ingr.foodId
                    }
                ]
            };

            const authUrl = `${nutrientsEndpoint}?${foodDbAuthStr}`;
            return fetch(authUrl, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                }, 
                mode: 'cors',
                body: JSON.stringify(params)
            })
            .then(response => response.json())
            .then(json => Object.assign(json, ingr))
        })

        return Promise.all(gets)
            .then(cb)
            .catch(e => console.error("There was a network error: " + e))
    }, 

    autocompleteIngredientSearch(query, cb) {
        //build the query
        const queryUrl = `${autocompleteEndpoint}?q=${query}&limit=5&${foodDbAuthStr}`
        return fetch(queryUrl)
                .then(response => {
                    if(response.ok) { return response.json()}
                    // test data
                    return ['avocado', 'pear', 'apple']
                    //throw new Error(`Uh oh, bad status: ${response.status}`)
                })
                .then(cb)
                .catch(e => console.error("Something went wrong autocompleting", e))
    }
}


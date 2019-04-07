const foodDbEndpoint = "https://api.edamam.com/api/food-database/"
const parserEndpoint = foodDbEndpoint + "parser?categoryLabel=food&category=generic-foods&health=vegan"
const nutrientsEndpoint = foodDbEndpoint + "nutrients"
const nutritionEndpoint = "http://api.edamam.com/api/nutrition-data?"

const cupMeasureUri = "http://www.edamam.com/ontologies/edamam.owl#Measure_cup"

const makeCredString = (id, key) => `app_id=${id}&app_key=${key}`
const foodDbCreds = {
    id: "d9d9413d",
    key: "2783f0f67bde39d661baa1a3508995dd"
}
const foodDbAuthStr = makeCredString(foodDbCreds.id, foodDbCreds.key)

const nutritionCreds = {
    id: "8678f85d",
    key: "cb6d8d2b46927f697cb27f63c135e5c3"
}
const nutritionStr = makeCredString(nutritionCreds.id, nutritionCreds.key)

export default {
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
    }
}


import axios from 'axios'

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

const stripParsedResults = (resultList) => {
    return resultList.reduce((acc, res) => {
        if(res.data.parsed.length > 0) {
            acc.push({ ingredientName: res.data.text, foodId: res.data.parsed[0].food.foodId })
        }
        return acc;
    }, [])
}

export default {
    getParsedIngredientInfo(ingrList, cb) {
        const encodedList = ingrList.map(encodeURI);
        const urls = encodedList.map(e => `${parserEndpoint}&ingr=${e}&${foodDbAuthStr}`);
        const gets = urls.map(u => axios.get(u));
        return axios.all(gets)
            .then(stripParsedResults)
            .then(cb)
            .catch(e => console.error("There was a network error: " + e))
    }, 

    getNutritionInfo(foodIdList, cb) {
        const gets = foodIdList.map(foodId => {
            const params = { 
                ingredients: [
                    {
                        quantity: 1, 
                        measureURI: cupMeasureUri,
                        foodId
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
            .then(json => Object.assign(json, { foodId }))
        })
        // const urls = ingrList.map(e => `${nutrientsEndpoint}?quantity=1&foodId=${e.foodId}${foodDbAuthStr}&measureURI=${cupMeasureUri}`);
        // const encodedUrls = urls.map(encodeURI);
        // const gets = encodedUrls.map(axios.get);
        return Promise.all(gets)
            .then(cb)
            .catch(e => console.error("There was a network error: " + e))
    }
}


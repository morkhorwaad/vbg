import axios from 'axios'

const parserEndpoint = "https://api.edamam.com/api/food-database/parser?categoryLabel=food&category=generic-foods&health=vegan"
const nutritionEndpoint = "http://api.edamam.com/api/nutrition-data?"

const makeCredString = (id, key) => `&app_id=${id}&app_key=${key}`
const parserCreds = {
    id: "d9d9413d",
    key: "2783f0f67bde39d661baa1a3508995dd"
}
const parserStr = makeCredString(parserCreds.id, parserCreds.key)

const nutritionCreds = {
    id: "8678f85d",
    key: "cb6d8d2b46927f697cb27f63c135e5c3"
}
const nutritionStr = makeCredString(nutritionCreds.id, nutritionCreds.key)

const stripResults = (resultList) => {
    return resultList.reduce((acc, res) => {
        if(res.data.parsed.length > 0) {
            acc.push({ name: res.data.text, data: res.data.parsed[0].food })
        }
        return acc;
    }, [])
}

export default {
    getIngredientInfo(ingrList, cb) {
        const encodedList = ingrList.map(i => encodeURI(i));
        const urls = encodedList.map(e => `${parserEndpoint}&ingr=${e}${parserStr}`);
        const gets = urls.map(u => axios.get(u));
        return axios.all(gets)
            .then(stripResults)
            .then(cb)
            .catch(e => console.error("There was a network error: " + e))
    }
}


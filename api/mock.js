const NUTRITION_FIELDS = require('../constants').NUTRITION_FIELDS

const stringHash = (s) => s.split("").reduce(function(a,b){a=((a<<5)-a)+b.charCodeAt(0);return a&a},0).toString();
const randomNumber = (max) => Math.floor(Math.random() * max);
const getMockNutrients = () => {
    return Object.values(NUTRITION_FIELDS).reduce((acc, value) => {
        acc[value.field] = {
            label: "SOMETHING", 
            quantity: randomNumber(300), 
            unit: "g"
        }
        return acc;
    }, {})
}
const makeFakeNutritionBase = (foodInfo) => {
    return {
        uri: "http://google.com", 
        yield: randomNumber(10),
        calories: randomNumber(500),
        totalWeight: randomNumber(50),
        dietLabels: [], 
        healthLabels: [], 
        cautions: [], 
        totalNutrients: getMockNutrients(), 
        totalDaily: {}, 
        ingredients: [],
        foodId: foodInfo.foodId
    }

}

module.exports = {
    getParsedIngredientInfo(ingrList, cb) {
        cb(ingrList.map(i => {
            return {
                ingredientName: i.name,
                category: i.category,
                foodId: stringHash(i.name)
            }
        }))
    },

    getNutritionInfo(ingrList, cb) {
        cb(ingrList.map(i => makeFakeNutritionBase(i)))
    },

    autocompleteIngredientSearch(query, cb) {
        cb(["a", "aa", "aaa"].map(letter => `${query}${letter}`))
    },


}
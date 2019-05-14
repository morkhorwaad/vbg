const baseApiUrl = 'http://localhost:3000'

export default {
    getFoodIds(ingredients, cb) {
        fetch(`${baseApiUrl}/api/getFoodIds`, {
            method: 'POST', 
            headers: {
                "Content-Type": "application/json",
            },
            mode: "cors", // no-cors, cors, *same-origin
            credentials: "same-origin",
            body: JSON.stringify({ ingredients })
        })
        .then(response => response.json())
        .then(cb)
        .catch(err => console.error(err))
    }, 

    getNutritionInfo(foodIds, cb) {
        fetch(`${baseApiUrl}/api/getNutritionInfo`, {
            method: 'POST', 
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ foodIds })
        })
        .then(response => response.json())
        .then(cb)
        .catch(err => console.error(err))
    },

    autocomplete(query, cb) {
        fetch(`${baseApiUrl}/api/autocomplete?search=${query}`)
                .then(response => response.json())
                .then(cb)
                .catch(err => console.error(err))
    }
}
const isValidNutrientObj = (nutrients) => nutrients != undefined && nutrients.totalNutrients != undefined

// should this return null? where should things break? 
export const getNutrientQuantity = (nutrients, field) => {
    return isValidNutrientObj(nutrients)
        ? nutrients.totalNutrients[field].quantity 
        : 0; 
}

export const getNutrientLabel = (nutrients, field) => {
    return isValidNutrientObj(nutrients) 
        ? `${parseInt(nutrients.totalNutrients[field].quantity)}${nutrients.totalNutrients[field].unit}`
        : "--"; 
}


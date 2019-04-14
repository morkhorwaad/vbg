const BASE_TAG = "Base"
const PROTEIN_TAG = "Protein"
const VEGGIE_TAG = "Veggies"
const DRESSING_TAG = "Dressing"

export const INGREDIENT_CATEGORIES = [
    BASE_TAG, 
    PROTEIN_TAG, 
    VEGGIE_TAG, 
    DRESSING_TAG
]

export const STARTING_INGREDIENTS = [
    // bases
    { name: "brown rice", category: BASE_TAG },
    // { name: "quinoa", category: BASE_TAG },
    // { name: "couscous", category: BASE_TAG },
    
    // proteins
    { name: "tofu", category: PROTEIN_TAG },
    // { name: "tempeh", category: PROTEIN_TAG },
    // { name: "black beans", category: PROTEIN_TAG },

    // veggies
    { name: "green kale", category: VEGGIE_TAG },
    // { name: "sweet potato", category: VEGGIE_TAG },
    // { name: "asparagus", category: VEGGIE_TAG },

    // dressings
    { name: "tahini", category: DRESSING_TAG },
    // { name: "olive oil", category: DRESSING_TAG },
    // { name: "avocado", category: DRESSING_TAG },
];

const CALORIE_FIELD = "ENERC_KCAL"
const PROTEIN_FIELD = "PROCNT"
const CARB_FIELD = "CHOCDF"
const FAT_FIELD = "FAT"

export const NUTRITION_FIELDS = {
    CALORIES: { field: CALORIE_FIELD, name: "calories" },
    PROTEIN: { field: PROTEIN_FIELD, name: "protein" }, 
    CARBS: { field: CARB_FIELD, name: "carbs" },
    FAT: { field: FAT_FIELD, name: "fat" }
}
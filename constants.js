const BASE_TAG = "Base"
const PROTEIN_TAG = "Protein"
const VEGGIE_TAG = "Veggies"
const DRESSING_TAG = "Dressing"

const INGREDIENT_CATEGORIES = [
    BASE_TAG, 
    PROTEIN_TAG, 
    VEGGIE_TAG, 
    DRESSING_TAG
]

const STARTING_INGREDIENTS = [
    { name: "brown rice", category: BASE_TAG },
    { name: "quinoa", category: BASE_TAG },
    { name: "couscous", category: BASE_TAG },
    { name: "spaghetti", category: BASE_TAG },
    { name: "rice noodles", category: BASE_TAG },
    { name: "bulgar", category: BASE_TAG },
    { name: "cornmeal mush", category: BASE_TAG },
    { name: "linguini", category: BASE_TAG },
    { name: "fettuccini", category: BASE_TAG },
    { name: "israeli couscous", category: BASE_TAG },
    
    { name: "tofu", category: PROTEIN_TAG },
    { name: "tempeh", category: PROTEIN_TAG },
    { name: "black beans", category: PROTEIN_TAG },
    { name: "proteiney protein", category: PROTEIN_TAG },
    { name: "pinto beans", category: PROTEIN_TAG },
    { name: "kidney beans", category: PROTEIN_TAG },
    { name: "garbanzo beans", category: PROTEIN_TAG },
    { name: "also chickpeas tho", category: PROTEIN_TAG },
    { name: "great northern white beans", category: PROTEIN_TAG },
    { name: "super bean", category: PROTEIN_TAG },
    { name: "green beans?", category: PROTEIN_TAG },
    

    { name: "green kale", category: VEGGIE_TAG },
    { name: "sweet potato", category: VEGGIE_TAG },
    { name: "asparagus", category: VEGGIE_TAG },
    { name: "lettuce", category: VEGGIE_TAG },
    { name: "brussels sprouts", category: VEGGIE_TAG },
    { name: "corn", category: VEGGIE_TAG },
    { name: "peas", category: VEGGIE_TAG },
    { name: "spinach", category: VEGGIE_TAG },
    { name: "arugala", category: VEGGIE_TAG },
    { name: "carrots", category: VEGGIE_TAG },
    { name: "potato", category: VEGGIE_TAG },
    { name: "radishes", category: VEGGIE_TAG },

    { name: "tahini", category: DRESSING_TAG },
    { name: "olive oil", category: DRESSING_TAG },
    { name: "avocado", category: DRESSING_TAG },
    { name: "balsamic vineagar", category: DRESSING_TAG },
    { name: "peanut butter", category: DRESSING_TAG },
    { name: "goddess dressing", category: DRESSING_TAG },
    { name: "ranch", category: DRESSING_TAG },
    { name: "italian dressing", category: DRESSING_TAG },
    { name: "super cool dressing", category: DRESSING_TAG },
    { name: "caesar", category: DRESSING_TAG },
    { name: "blue chise", category: DRESSING_TAG },
    { name: "asian dressing", category: DRESSING_TAG },
    { name: "garlicky", category: DRESSING_TAG },
];

const CALORIE_FIELD = "ENERC_KCAL"
const PROTEIN_FIELD = "PROCNT"
const CARB_FIELD = "CHOCDF"
const FAT_FIELD = "FAT"

const NUTRITION_FIELDS = {
    CALORIES: { field: CALORIE_FIELD, name: "calories" },
    PROTEIN: { field: PROTEIN_FIELD, name: "protein" }, 
    CARBS: { field: CARB_FIELD, name: "carbs" },
    FAT: { field: FAT_FIELD, name: "fat" }
}

module.exports = {
    INGREDIENT_CATEGORIES, 
    STARTING_INGREDIENTS, 
    NUTRITION_FIELDS
}
const baseStarter = [
    "brown rice",
    "quinoa",
    "couscous"
];

const proteinStarter = [
    "glvvsspa",
    "tempeh",
    "black beans"
]

const veggieStarter = [
    "green kale",
    "sweet potato",
    "asparagus"
]

const dressingStarter = [
    "tahini",
    "olive oil",
    "avocado"
]

export const ingredientCategories = {
    Base: {
        name: "Base",
        starter: baseStarter
    },

    Protein: {
        name: "Protein",
        starter: proteinStarter
    },

    Veggies: {
        name: "Veggies",
        starter: veggieStarter
    },

    Dressing: {
        name: "Dressing",
        starter: dressingStarter
    }
}
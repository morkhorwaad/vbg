# Vegan Bowl Generator

A small personal project to learn Vue/Vuex. If you want to run this yourself, there's just a little more than `npm install`. 

**Environment Variables**

This project is using the [Edamam API](https://edamam.com) for food data, and you'll need to get API keys. Keys are expected to be stored in `[$Environment].env` files in the root directory. The expected keys are: 

- FOOD_DB_AUTH_ID
- FOOD_DB_AUTH_KEY
- NUTRITION_DB_AUTH_ID
- NUTRITION_DB_AUTH_KEY

As you might have guessed, these belong to the ID/KEYs for the Food and Nutrition databases in Edamam. 

For hacking, I just used a free developer account &mdash; if you do too, just be warned that the call limits are pretty low. 

**Defaults**

To provide a starting place for bowl-making, I defined a list of default food items in `constants.js`. If you want to keep your call level down, just comment out some of the entries in the `STARTING_INGREDIENTS` array. Or, add some - the format for an entry is just 
```
{ name: "pear", category: BASE_TAG }
```
where "pear" can be any parseable ingredient, and the category is one of the constant categories (also defined in `constants.js`). 

**That's it**

It's a pretty small test app, happy hacking!
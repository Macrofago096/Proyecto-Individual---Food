const { Router } = require('express');
const axios = require('axios');
const { getApiById, getAllRecipes, getDbById} = require('../controllers/recipes');
const { Recipe, Diet } = require('../db');
const { API_KEY } = process.env;

const router = Router();

router.get('/', async (req, res, next) => {
    try {
        const { title } = req.query;
        const allRecipes = await getAllRecipes();    
        
        if (title) {
            const recipeName = await allRecipes.filter(e => e.title.toLowerCase().includes(title.toString().toLowerCase()));
           
            if (recipeName.length) {
                const recipes = recipeName.map(e => {
                    return {
                        image: e.image,
                        title: e.title,
                        healthScore: e.healthScore,
                        dietTypes: e.dietTypes ? e.dietTypes : e.diets.map(e => e.name),
                        id: e.id
                    }
                })
                return res.status(200).send(recipes); 
            }  
            return res.status(404).send('Receta no encontrada')
        } else {
            const recipes = allRecipes.map(e => {
                return {
                    image: e.image,
                    title: e.title,
                    healthScore: e.healthScore,
                    dietTypes: e.dietTypes ? e.dietTypes : e.diets.map(e => e.name),
                    id: e.id
                }
            })
            return res.status(200).send(recipes);
        }
    } catch {
       return res.status(400).send('Error /recipes?title=');
    }
});

router.get('/:id', async (req, res, next) => {    
  const { id } = req.params;  
    try {
        if (/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(id)) {
            let recipeGetDbById = await getDbById(id);            
            return res.status(200).json(recipeGetDbById)
        } else { 
          recipeGetApiById = await getApiById(id)
            if (recipeGetApiById.data.id) {
                let recipeDetail =  {                    
                    image: recipeGetApiById.data.image,
                    title: recipeGetApiById.data.title,
                    dishTypes: recipeGetApiById.data.dishTypes,
                    dietTypes: recipeGetApiById.data.diets,
                    summary: recipeGetApiById.data.summary,
                    healthScore: recipeGetApiById.data.healthScore,
                    steps: recipeGetApiById.data.analyzedInstructions[0]?.steps.map(e => {
                        return {
                            number: e.number,
                            step: e.step
                        }
                    })
                }
                return res.status(200).send(recipeDetail); 
            }
        } 
    } catch {
        return res.status(404).send('Receta no encontrada')
    }
});
    
    
module.exports = router;
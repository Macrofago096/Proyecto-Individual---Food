const { Router } = require('express');
const { Recipe, Diet } = require('../db')
const router = Router();

router.post('/', async (req, res, next) => {
    try {
        const { title, image, summary, healthScore, steps, dietTypes } = req.body
        const newRecipe = await Recipe.create({
            title,
            image,
            summary,
            healthScore,
            steps,
        })

        const dietTypesRecipe = await Diet.findAll({
            where: {name: dietTypes}
        })
        newRecipe.addDiet(dietTypesRecipe)
        res.status(200).send(newRecipe)  
    } catch (error) {
        next(error)
    };
});

module.exports = router;
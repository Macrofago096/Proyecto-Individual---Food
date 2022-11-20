const { Router } = require('express');

const recipesRouter = require('./recipes');
const recipeRouter = require('./recipe');
const dietsRouter = require('./diets');

const router = Router();


router.use('/recipes', recipesRouter);
router.use('/recipe', recipeRouter);
router.use('/diets', dietsRouter);


module.exports = router;

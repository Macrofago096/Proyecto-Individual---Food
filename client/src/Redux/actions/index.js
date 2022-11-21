import axios from 'axios';
export const GET_RECIPES = 'GET_RECIPES';
export const GET_RECIPE = 'GET_RECIPE';
export const GET_RECIPE_DETAIL = 'GET_RECIPE_DETAIL';
export const GET_TYPE_DIETS = 'GET_TYPE_DIETS';
export const POST_RECIPE = 'POST_RECIPE';
export const FILTER_TYPE_DIET = 'FILTER_TYPE_DIET';
export const FILTER_ABC = 'FILTER_ABC';
export const FILTER_HEALTH_SCORE = 'FILTER_SCORE';
export const RELOAD = 'RELOAD';

//const {RECIPES_URL, DIETS_URL, RECIPE_URL} = process.env

export function getRecipes(){
  return async function (dispatch){
    try{
      //const json = await axios.get('http://localhost:3001/recipes')
      const json = await axios.get('https://proyecto-individual-food.onrender.com/api/recipes')
      return dispatch({
        type: GET_RECIPES,
        payload: json.data
      })
      } catch (error) {
        console.log(error)
    }
  }
};

export function getRecipe(payload){
  return async function (dispatch){
    try{
      //const json = await axios.get(`http://localhost:3001/recipes?title=${payload}`)
      const json = await axios.get(`https://proyecto-individual-food.onrender.com/api/recipes?title=${payload}`)
      return dispatch ({
          type: GET_RECIPE,
          payload: json.data,

      })
      } catch {
        return alert ('Recipe Not Found')
    }
  }
};

export function getRecipeDetail(payload){
  return async function (dispatch){
    try{
      //const json = await axios.get(`http://localhost:3001/recipes/${payload}`)
      const json = await axios.get(`https://proyecto-individual-food.onrender.com/api/recipes/${payload}`)
      return dispatch ({
          type: GET_RECIPE_DETAIL,
          payload: json.data
      })
      } catch (error) {
        console.log(error)
    }
  }
};

export function getTypeDiets(){
  return async function (dispatch){
    try{
      //const json = await axios.get(`http://localhost:3001/diets`)
      const json = await axios.get('https://proyecto-individual-food.onrender.com/api/diets')
      return dispatch ({
          type: GET_TYPE_DIETS,
          payload: json.data.map(d => d.name)
      })
    } catch (error) {
      console.log(error)
    }
  }
};

export function postRecipe(payload){
  return async function(dispatch){
    try{
      //const json = await axios.post('http://localhost:3001/recipe', payload)
      const json = await axios.post('https://proyecto-individual-food.onrender.com/api/recipe', payload) 
      return json
    } catch (error) {
      console.log(error)
    }
  }
};

export function filterTypeDiet(payload){
  return {
      type: FILTER_TYPE_DIET,
      payload
  }
};

export function filterAbc(payload){
  return {
      type: FILTER_ABC,
      payload
  }
};

export function filterHealthScore(payload){
  return {
      type: FILTER_HEALTH_SCORE,
      payload
  }
};

export function reload(payload){
  return {
      type: RELOAD,
      payload
  }
};
import { GET_RECIPES } from '../actions'
import { GET_RECIPE } from '../actions'
import { GET_RECIPE_DETAIL } from '../actions'
import { GET_TYPE_DIETS } from '../actions'
import { POST_RECIPE } from '../actions'
import { FILTER_TYPE_DIET } from '../actions'
import { FILTER_ABC } from '../actions'
import { FILTER_HEALTH_SCORE } from '../actions'
import { RELOAD } from '../actions'

const initialState = { 
  recipes: [],
  recipeFilter: [],
  dietTypes: [],
  recipe: []
};

export default function rootReducer(state = initialState, action){
  switch (action.type) {
    case GET_RECIPES:
      return{
        ...state,
        recipes: action.payload,
        recipeFilter: action.payload
      }

    case GET_RECIPE:
      return{
        ...state,
        recipes: action.payload
      }

    case GET_RECIPE_DETAIL:
      return{
        ...state, 
        recipe: action.payload
      }

    case GET_TYPE_DIETS:
      return{
        ...state,
        dietTypes: action.payload
      }

    case POST_RECIPE:
      return{
        ...state
      }
    
    case FILTER_TYPE_DIET:
      const allRecipes = state.recipeFilter;
      const filterDiet = allRecipes.filter(r => r.dietTypes?.some(d => d.toLowerCase() === action.payload.toLowerCase()))
      return {
        ...state,
        recipes: filterDiet
      }

    case FILTER_ABC:
      let recipeAbc = [...state.recipes]   
      recipeAbc = action.payload === "asc" ? 
            state.recipes.sort(function (a, b){
                if (a.title > b.title) {
                    return 1;
                }
                if (a.title < b.title) {
                    return -1;
                }
                return 0
            }) :
            state.recipes.sort(function (a, b){
                if (a.title < b.title) {
                    return 1;
                }
                if (a.title > b.title) {
                    return -1;
                }
                return 0
            }) 
            return{
                ...state,
                recipes: recipeAbc
            }

    case FILTER_HEALTH_SCORE:  
    let recipeHealthScore = [...state.recipes]   
    recipeHealthScore = action.payload === "asc" ? 
            state.recipes.sort(function (a, b){
                if (a.healthScore > b.healthScore) {
                    return 1;
                }
                if (a.healthScore < b.healthScore) {
                    return -1;
                }
                return 0
            }) :
            state.recipes.sort(function (a, b){
                if (a.healthScore < b.healthScore) {
                    return 1;
                }
                if (a.healthScore > b.healthScore) {
                    return -1;
                }
                return 0
            }) 
            return{
                ...state,
                recipes: recipeHealthScore
            }

    case RELOAD:
      return {
        ...state,
        recipes: state.recipeFilter
      }      

    default:
      return state;
  }
}
import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
// import { useParams } from 'react-router-dom';
import { getRecipeDetail } from '../../Redux/actions';
import './Detail.css'


export default function Detail(props){

  const dispatch = useDispatch();
  // let paramsRecipeId = useParams();
  const id = props.match.params.id;

  const recipe = useSelector(state => state.recipe);

  
  useEffect(()=>{
   dispatch(getRecipeDetail(id))
  }, [dispatch, id])

  return (
    <div className="details" key={id}>
      
      <h1 className="textTitle">{recipe.title}</h1>
        
        <div className="divimg">
          <img className="detailImg" src={recipe.image} alt="Not found" />
        </div>

        {recipe.dishTypes ?
            <div className="ddsh">
                <h2 className="texts">Dish Type: </h2>
                {recipe.dishTypes?.map(e => {
                    return(
                        <h2 className="dishesanddiets" key={e}>{e.toUpperCase()}</h2>
                    )
                })}
            </div> :
            <br />
            }

            <div className="ddsh">
                <h2 className="texts">Diet Type: </h2> 
                {recipe.dietTypes ? recipe.dietTypes.map(e => {
                    return(
                        <h2 className="dishesanddiets" key={e}>{e.toUpperCase()}</h2>
                    )
                }) :
                recipe.diets?.map(e => {
                    return(
                        <h2 className="dishesanddiets" key={e.name}>{e.name.toUpperCase()}</h2>
                    )
                })}
            </div>

            <div className="ddsh">
                <h3 className="texts">Summary </h3>
                <p className="summary">{recipe.summary?.replace(/<[^>]*>/g, '')}</p>
            </div>

        
            <div className="ddsh">
                <h3 className="scores">HealthScore: {recipe.healthScore}</h3>
            </div>  


        <div className="ddsh">
          {}
            <h3 className="texts">Steps</h3>
            <ul className="steps">{Array.isArray(recipe.steps) ? recipe.steps.map(e => {
                return(
                    <li key={e.number}>{e.step}</li>
                    )
            }) :
            <h1>{recipe.steps}</h1>
            }</ul>
        </div>
        <div  className="contButton">
          <Link to="/home"><button className="backButton">Go back to recipes</button></Link>
        </div>
    </div>
  )
};
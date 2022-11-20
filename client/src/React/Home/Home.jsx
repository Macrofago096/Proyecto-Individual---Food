import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getRecipes, getTypeDiets, reload, filterTypeDiet, filterAbc, filterHealthScore } from '../../Redux/actions';
import Nav from '../Nav/Nav';
import SearchBar from '../SearchBar/SearchBar';
import Recipe from '../Recipe/Recipe';
import Paginado from '../Paginado/Paginado';
import './Home.css'
import Logo from '../../Image/logo.jpg'
import Logo2 from '../../Image/logo0.jpg'

let prevId = 1;

export default function Home() {

  let dispatch = useDispatch();

  let allRecipes = useSelector(state => state.recipes);


  const [currentPage, setCurrentPage] = useState(1)
  const [charactersPerPage, setCharactersPerPage] = useState(9)
  const [order, setOrder] = useState ("")

  const indexOfLastCharacter = currentPage * charactersPerPage
  const indexOfFirstCharacter = indexOfLastCharacter - charactersPerPage
  const currentCharacters = allRecipes.slice(indexOfFirstCharacter, indexOfLastCharacter)
  // console.log(currentCharacters)

const paginado = (pageNumber) => {
  setCurrentPage(pageNumber)
}

  useEffect(()=>{
    dispatch(getRecipes())
},[dispatch])

function handleReload(e) {
  e.preventDefault();
  dispatch(reload(e));
  setCurrentPage(1);
};

function handleFilterType(e) {
  e.preventDefault();
  dispatch(filterTypeDiet(e.target.value));
  setCurrentPage(1);
};

function handleFilterAbc(e) {
  e.preventDefault();
  dispatch(filterAbc(e.target.value));
  setCurrentPage(1);
  setOrder(`Ordenado ${e.target.value}`)
};

function handleFilterScore(e) {
  e.preventDefault();
  dispatch(filterHealthScore(e.target.value));
  setCurrentPage(1);
  setOrder(`Ordenado ${e.target.value}`)
};

  return (
    <div className="home">
      <Nav />
      <div className="search">
        <SearchBar />
      </div>
      
      <div className="logos" >
        <img className="logo" src={Logo2} alt="LogoRecipe" width="60" height="60" />
        <img className="logo" src={Logo} alt="LogoRecipe" width="60" height="60" />
        <img className="logo" src={Logo2} alt="LogoRecipe" width="60" height="60" />
        <img className="logo" src={Logo} alt="LogoRecipe" width="60" height="60" />
        <img className="logo" src={Logo2} alt="LogoRecipe" width="60" height="60" />
        <img className="logo" src={Logo} alt="LogoRecipe" width="60" height="60" />
        <img className="logo" src={Logo2} alt="LogoRecipe" width="60" height="60" />
        </div>
      <div>
        <Link to="/recipe">
          <button className="addButton">Create Recipe</button>
        </Link>
      </div>

      <button
      className="reloadButton"
      onClick={e=> handleReload(e)}>All recipes
      </button>

      <br />
      
      <div className="select">
        <label>Diet Types:</label>
        <select className="select" name="diets" onChange={e => handleFilterType(e)}>
          <option disabled selected>Select...</option>
          <option value="gluten free">Gluten Free</option>
          <option value="ketogenic">Keto</option>
          <option value="vegetarian">Vegetarian</option>
          <option value="lacto vegetarian">Lacto-Vegetarian</option>
          <option value="ovo vegetarian">Ovo-Vegetarian</option>
          <option value="lacto ovo vegetarian">Lacto-Ovo-Vegetarian</option>
          <option value="vegan">Vegan</option>
          <option value="pescetarian">Pescetarian</option>
          <option value="paleolithic">Paleo</option>
          <option value="primal">Primal</option>
          <option value="low fodmap">Low FODMAP</option>
          <option value="whole 30">Whole30</option>
          <option value="dairy free">Dairy Free</option>
        </select>

        <br />
        
        <select className="select" name="alphabetical" onChange={e => handleFilterAbc(e)}>
          <option disabled selected> Alphabetically order </option>
          <option value="asc"> A - Z </option>
          <option value="desc"> Z - A </option>
        </select>

        <br />

        <select className="select" name="numerical" onChange={e => handleFilterScore(e)}>
          <option disabled selected>Health Score</option>
          <option value="asc">Ascendente</option>
          <option value="des">Descendente</option>
        </select>
      </div>

      <div className="allrecipes">
        {currentCharacters?.map(e => {    
          return (
            <div className="eachRecipe" key={prevId++}>
              <Link className="linkRecetas" to={`detail/${e.id}`}>
                <Recipe
                    image={e.image}
                    title={e.title}                             
                    dietTypes={e.dietTypes}
                />
              </Link>
            </div>
          )
        })
      }
      </div> 

      <br />
      
      <Paginado
            charactersPerPage = {charactersPerPage}
            allRecipes = {allRecipes.length}
            paginado = {paginado}
            />
      <br />
    </div>
  )
};
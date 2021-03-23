import React, { useState, useEffect } from "react";
import { NavLink } from 'react-router-dom';
import { connect } from "react-redux";
import Paginado from './Paginado.js'
import './buscador.css';

import { getRecipeDetail, getRecipes, sortRecipe, getDiets, filterBy, SortBy } from '../actions/index.js';

export function Buscador(props) {

  const [title, setTitle]= useState('');
  const [render, setRender]= useState('');
  const [currentPage, setCurrentPage]= useState(1);
  const [postsPerPage, setPostsPerPage]= useState(8);

  const indexOfLastPost = currentPage * postsPerPage;//indice de la ultima page---10
  const indexOfFirstPost = indexOfLastPost - postsPerPage;//index de la primera pagina---0
  let currentPost;

  //ASIGNO CURRENT POST PARA QUE NO RENDERICE EN ERROR
  // props.recipes.error
  // ?currentPost=null
  // :currentPost=props.recipes.slice(indexOfFirstPost, indexOfLastPost);

  props.recipes.error
  ?currentPost=null
  :props.filtered.length
  ?currentPost=props.filtered.slice(indexOfFirstPost, indexOfLastPost)
  :currentPost=props.recipes.slice(indexOfFirstPost, indexOfLastPost);


  const handleSelect = (e) =>{
    e.preventDefault();
    props.sortRecipe(e.target.value);
    setCurrentPage(1);
    setRender(`Ordenado de forma ${e.target.value}`);
  };

  const handleMax = (e) => {
    e.preventDefault();
    props.SortBy(e.target.value);
    setCurrentPage(1);
    setRender(`Ordenado de forma ${e.target.value}`);
  };
  
  //cambiar de pagina
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  
  //busqueda del form
  const handleChange = (event) => {
    setTitle(event.target.value );
  };
  
  const handleSubmit = (event) => {//manda el estado para getrecipes
    event.preventDefault();
    props.filterBy('renewed');
    props.getRecipes(title);
    props.getDiets();
  };

  //filtrado
  const handleClick = (string, event) =>{
    event.preventDefault();
    setCurrentPage(1);
    props.filterBy(string);
    setRender(`filtrado por ${string}`);
  };

  const handleAll = (event) => {
    event.preventDefault();
    props.getRecipes('%20');
    props.getDiets()
  };


  return (
    <div className='ppal'>
      
      <NavLink to={`/post`}> Create Recipe </NavLink>
      
      {/* <h2>Search:</h2> */}
      <form className="form-container" onSubmit={(e) => handleSubmit(e)}>
        <div>
        <label className="label" htmlFor="title"> Recipe: </label>
        <input
          type="text"
          id="title"
          autoComplete="off"
          value={title}//el state es el value del input, el titulo de la recipe
          onChange={(e) => handleChange(e)}
        />
        </div>
        <button type="submit">SEARCH</button><button onClick={(e)=> handleAll(e)}>ALL RECIPES</button>
      </form>

      <select id="alfabetico" onChange={(e) =>handleSelect(e)}>
        <option value="ascendente">A-Z</option>
        <option value="descendente">Z-A</option>
      </select>

      <select id="min" onChange={(e) =>handleMax(e)}>
        <option value="min to max">Lower scores first</option>
        <option value="max to min">Higher scores first</option>
      </select>

      {props.recipes.error
        ?(<div>{props.recipes.error}</div>)                          
      :(
      <ul className='ul'> 
        {/* Aqui tienes que escribir tu codigo para mostrar la lista de peliculas */
        currentPost && currentPost.map((recipe)=> (
        <li className='li' key={recipe.id}>

          <NavLink to={`/recipe/${recipe.id}`} onClick={()=>props.getRecipeDetail(recipe.id)}>
          {recipe.title}
          </NavLink>
          <div> Score: {recipe.spoonacularScore}</div>
          {(typeof recipe.diets[0] === 'string') &&  recipe.diets.map((diet) => <div>{diet}</div>)}
          {(typeof recipe.diets[0] === 'object') &&  recipe.diets.map((diet) => <div>{diet.name}</div>)}
          <img src={recipe.image}></img>
          
        </li>))
        }
      </ul>
      )}
      {props.diets && props.diets.map((diet) =>(
        <button className='dietButton' onClick={(event)=>handleClick(diet.name, event)}>{diet.name}</button>
      ))
      }
      
      <Paginado
      postsPerPage={postsPerPage}
      totalPosts={props.recipes.length} 
      filteredPosts={props.filtered.length}
      paginate={paginate}
      />

    </div>  
  )
};

    
    
function mapStateToProps(state) {
  return {
    recipes: state.recipesLoaded,
    recipeDetail: state.recipeDetail,
    diets: state.diets,
    filtered: state.filtered,
  };
};

function mapDispatchToProps(dispatch) {//me pasa como prop el dispatch de actions
  return {
    getRecipes: title => dispatch(getRecipes(title)),
    getRecipeDetail: id=> dispatch(getRecipeDetail(id)),
    sortRecipe: string => dispatch(sortRecipe(string)),
    getDiets: () => dispatch(getDiets()),
    filterBy: string => dispatch(filterBy(string)),
    SortBy: string => dispatch(SortBy(string)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Buscador);

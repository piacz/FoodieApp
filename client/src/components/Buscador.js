import React, { useState, useEffect } from "react";
import { NavLink } from 'react-router-dom';
import { connect } from "react-redux";
import Paginado from './Paginado.js'
import './buscador.css';
import './buttons.css';

import { getRecipeDetail, getRecipes, sortRecipe, getDiets, filterBy, SortBy } from '../actions/index.js';

export function Buscador(props) {

  const [title, setTitle]= useState('');
  const [loading, setLoading]= useState('');
  const [render, setRender]= useState('');
  const [currentPage, setCurrentPage]= useState(1);
  const [postsPerPage, setPostsPerPage]= useState(8);

  const indexOfLastPost = currentPage * postsPerPage;//indice de la ultima page---10
  const indexOfFirstPost = indexOfLastPost - postsPerPage;//index de la primera pagina---0
  let currentPost;

  props.recipes.error
  ?currentPost=null
  // :props.filtered[0]
  // ?currentPost=props.filtered.slice(indexOfFirstPost, indexOfLastPost)
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
    setLoading('Loading...')
    props.getRecipes(title);
    props.getDiets();
    props.filterBy('reset');
    setTitle(' ');
    setLoading('');
  };

  //filtrado
  const handleClick = (string, event) =>{
    event.preventDefault();
    setCurrentPage(1);
    props.filterBy(string);
  };

  const handleAll = (event) => {
    event.preventDefault();
    setLoading('Loading...')
    props.filterBy('reset');
    props.getRecipes('%20');
    props.getDiets();
    setLoading('');
  };


  return (
    <div className='ppal'>
      <nav className='top'>

      <NavLink to={`/post`} className='linkPost'> Create Recipe </NavLink>
      <div className='search-box'>
      <form className="search" action="" onSubmit={(e) => handleSubmit(e)}>

        <label className="label" htmlFor="title"> RECIPE: </label>
        <input
          placeholder="Search here..."
          required
          type="text"
          id="title"
          autoComplete="off"
          value={title}//el state es el value del input, el titulo de la recipe
          onChange={(e) => handleChange(e)}
        />

        <button type="submit" className='searchButton'>SEARCH</button>
        <button onClick={(e)=> handleAll(e)}className='searchButton'>ALL RECIPES</button>
      </form>
      </div>  

      <div className='selects'>

      <select id="alfabetico" onChange={(e) =>handleSelect(e)}>
        <option value="ascendente">A-Z</option>
        <option value="descendente">Z-A</option>
      </select>

      <select id="min" onChange={(e) =>handleMax(e)}>
        <option value="min to max">Lower scores first</option>
        <option value="max to min">Higher scores first</option>
      </select>

      </div>
      </nav>
      {/* -------------------- */}
      <div className='filteredBy'>filtered by: {props.filtered}</div>
      {props.recipes.error
        ?(<div className='errors'>{props.recipes.error}</div>)                          
      :(
      <ul className='ul'> 
        {/* Aqui tienes que escribir tu codigo para mostrar la lista de peliculas */
        currentPost && currentPost.map((recipe)=> (
        <li className='li' key={recipe.id}>

          <div>
            <NavLink to={`/recipe/${recipe.id}`} className='litext' onClick={()=>props.getRecipeDetail(recipe.id)}>
            {recipe.title}
            </NavLink>
            <div className='recetascontent'>

              <div className='scorelitem'> Score: {recipe.spoonacularScore}</div>
              <div className='newscoreli'>

              <div className='scoreli' id='scoreli'>Diets:</div>
              {(typeof recipe.diets[0] === 'string') &&  recipe.diets.map((diet) => <div className='recetascontent'>{diet}</div>)}
              {(typeof recipe.diets[0] === 'object') &&  recipe.diets.map((diet) => <div className='recetascontent'>{diet.name}</div>)}
              </div>
            </div>

          </div>
          {
            !recipe.image?<img className='recipic' src='https://asianinspirations.com.au/wp-content/uploads/2019/07/Chinese-Cooking-Hacks.jpg' ></img>
            :<img className='recipic' src={recipe.image} ></img>
          }
          
          
        </li>))
        }
      </ul>
      )}

      {loading[0]?<div>{loading}</div>:null}

      <div className='dietButtons'>

        {props.diets && props.diets.map((diet) =>(
          <button className='dietButton' onClick={(event)=>handleClick(diet.name, event)}>{diet.name}</button>
        ))
        }
      
      </div>
      <Paginado
      postsPerPage={postsPerPage}
      totalPosts={props.recipes.length} 
      // filteredPosts={props.filtered.length}
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
    // filtrado: string => dispatch(filtrado(string)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Buscador);

import React, { useState, useEffect } from "react";
// import { NavLink } from 'react-router-dom';
// import Logo from '../../logoHenry.png'
import { connect } from 'react-redux';
import { NavLink } from "react-router-dom";
// import { getRecipeDetail } from '../actions/index';



export function Recipe(props) {
    useEffect(() => {
        if (props.recipeDetail.instructions) {
          let instructions = props.recipeDetail.instructions;
          document.getElementById('instructions').innerHTML = instructions;
        };
        if (props.recipeDetail.summary) {
          let summary = props.recipeDetail.summary;
          document.getElementById('summary').innerHTML = summary;
        }
        return () => {};
    }, [props.recipeDetail]);

    return (
        <div className="movie-detail">
            <div>Detalle Receta:</div> 
            <h1>{props.recipeDetail.name}</h1> 
            <p id='summary'>Summary: {props.recipeDetail.summary}</p>
            <h5>Score: {props.recipeDetail.spoonacularScore}</h5>
            <h5>Health Level:
                <p className='movieText'>{props.recipeDetail.healthScore}</p>
            </h5>
            <h5>Instructions:
                <p className='movieText' id='instructions'>{props.recipeDetail.instructions}</p>
            </h5>
            {
                props.recipeDetail.image && <img src={props.recipeDetail.image} align="right"></img>
            }
            Diets:
            {props.recipeDetail.diets && props.recipeDetail.diets.map((diet) =>(
                <div>{diet}</div>))
            }

            <NavLink to='/home'><button>Back Home!</button></NavLink>

        </div> 
    )
};

function mapStateToProps(state) {
    return {
    //   favMovies: state.movies,//el buscador solo se suscribe a moviesLoaded del store
    recipeDetail: state.recipeDetail,
    };
};


export default connect(mapStateToProps, null)(Recipe);
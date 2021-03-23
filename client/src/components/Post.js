import React, { useState, useEffect } from "react";
import { NavLink } from 'react-router-dom';
import { connect } from "react-redux";
import { getDiets, submit } from '../actions/index.js';
const axios = require('axios');

//COMPONENTE FORM


export function validate(input) {
  let errors = {};
  if (input.spoonacularScore>100 || input.spoonacularScore<0 ) {
    errors.spoonacularScore = 'Score must be between 1 and 100';
  }

  if (!input.healthScore>100 || input.healthScore<0 ) {
    errors.healthScore = 'Healthiness must be scored between 0 and 100';
  } 
  return errors;
};

export function Post(props) {

  const [input, setInput] = useState({//estados
    title: '',
    summary: '',
    spoonacularScore:0,
    healthScore:0,
    instructions: '',
    diets: [],
  });

  const [errors, setErrors] = useState({});//errores estado
  const [render, setRender]= useState('');

  const handleInputChange = function(e) {

    setErrors(validate({
      ...input,
      [e.target.name]: e.target.value
    }));

    setInput({
      ...input,//se trae el objeto que ya habia
      [e.target.name]: e.target.value
    });
  };

  const handleCheck = function(e){
    if(e.target.checked){
      setInput({...input, diets: [...input.diets,e.target.value]});
    }else{
      setInput({...input, diets: input.diets.filter((diet)=>diet!==e.target.value)})
    };
  };

  const handleSubmit = function(e){
    e.preventDefault();
    // axios.post('http://localhost:3001/recipe', input);
    props.submit(input)
    setRender('Your recipe has been added correctly.')
    setInput({
      title: '',
      summary: '',
      spoonacularScore:0,
      healthScore:0,
      instructions: '',
      diets: [],
    })
  }

  useEffect(() => {
    props.getDiets()
    return () => {
    }
  }, [])
    return (
      <form onSubmit={(e)=>handleSubmit(e)}>
      <div>
        <label>Title:</label>
        <input className='unico' 
          type="text" name="title" onChange={handleInputChange} value={input.title}/>
      </div>
      <div>
        <label>Summary:</label>
        <input
          type="text" name="summary" onChange={handleInputChange} value={input.summary}/>
      </div>
      <div>
        <label>Score:</label>
        <input 
          type="number" name="spoonacularScore" onChange={handleInputChange} value={input.score}/>
        {errors.spoonacularScore && (
        <p className="danger">{errors.spoonacularScore}</p>
        )}
      </div>
      <div>
        <label>healthScore:</label>
        <input 
          type="number" name="healthScore" onChange={handleInputChange} value={input.healthScore}/>
          {errors.healthScore && (
          <p className="danger">{errors.healthScore}</p>
        )}
      </div>
      <div>
        <label>Instructions:</label>
        <input 
          type="text" name="instructions" onChange={handleInputChange} value={input.instructions}/>
      </div>
      <p>
        Dietas:
        {props.diets && props.diets.map((diet)=>(
          <label><input type="checkbox" name={diet.name} value={diet.name} onChange={(e)=>handleCheck(e)}/>{diet.name}</label>
        ))}
      </p>
      {render[0] &&
      <div>{render}</div>
      }
      <input type='submit'value='Submit'/>
      </form>
    )
}

function mapStateToProps(state) {
  return {
    diets: state.diets,
    submit: state.submit,
  };
};

function mapDispatchToProps(dispatch) {//me pasa como prop el dispatch de actions
  return {
    getDiets: () => dispatch(getDiets()),
    submit: (obj) => dispatch(submit(obj))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Post);
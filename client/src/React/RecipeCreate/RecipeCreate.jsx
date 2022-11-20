import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { postRecipe, getTypeDiets } from '../../Redux/actions';
import "./RecipeCreate.css"

export default function RecipeCreate(){

    const dispatch = useDispatch();
    const history = useHistory();
    const dietTypes = useSelector(state => state.dietTypes);
    const [ errors, setErrors ] = useState({});
    const [ input, setInput ] = useState({
        title: "",
        image: "",
        summary: "",
        healthScore: "",
        steps: "",
        dietTypes: []
        });

    useEffect ( () => {
        dispatch(getTypeDiets())
    }, [dispatch] )

    function validate(input) {
        const errors = {};
        if (!input.title) errors.title = 'Please complete with a recipe name';
        if (!input.image) errors.image = 'Please complete with a recipe name';
        if (!input.summary) errors.summary = 'Please add some comments about your recipe';
        if (input.healthScore < 1 || input.healthScore > 100) errors.healthScore = 'The score must be a number between 1 and 100';
        if (!input.steps.length) errors.steps = 'Please detail the steps for your recipe';
        if (!input.dietTypes.length) errors.dietTypes = 'You must select at least one diet type';
        return errors;
    };
    

    function handleChange(e) {
        e.preventDefault();
        setInput((prevInput) => {
            const newInput = {
                ...prevInput,
                [e.target.name]: e.target.value
            }
            const validations = validate(newInput);
            setErrors(validations)
            return newInput
        })
    };

    function handleCheckBox(e) {
       
        let newArray = input.dietTypes;
        let find = newArray.indexOf(e.target.value);
        
        if (find >= 0) {
            newArray.splice(find, 1)
        } else {
            newArray.push(e.target.value)
        }
        
        setInput({
            ...input,
            dietTypes: newArray
        });
        const validations = validate(input);
        setErrors(validations)
    }


    function handleSubmit(e) {
        e.preventDefault();
        if (Object.values(errors).length > 0) {
            alert("Please complete the information required");
        } else if (
           input.title === '' && 
           input.image === '' &&
           input.summary === '' && 
           input.healthScore === '' &&
           input.steps === '' &&
           !input.dietTypes.length) {
           alert("Please complete the form");}
       else {
           dispatch(postRecipe(input));
           alert('New recipe added successfully!')
           setInput({
               name: "",
               summary: '',
               score: '',
               healthScore: '',
               steps: [],
               dietTypes: []
           });
           history.push('/home')
           console.log(setInput)
       }
   };

    // let handleDelete  = (diet) => {
    //     setInput({
    //         ...input,
    //         diets: input.diets.filter( pt => pt !== diet)
    //     })
    // }

    return(
        <div className="divForm">
            <div  className="contButton">
                <Link to="/home"><button className="backButton">Go back to recipes</button></Link>
            </div>

            <div className="title">
                <h1 className='createTitle'>YOUR RECIPE</h1>
            </div>
            
                <form className="form" onSubmit={(e) => handleSubmit(e)}>
                
                    <div className="nameInput">
                        <div className="columna1">
                            <label className="textCreate">Name:</label>
                            <input type="text" value={input.title} name="title" placeholder="Recipe name..." onChange={(e) => handleChange(e)} />
                            {
                            errors.title && (
                                <p className="errors">{errors.title}</p>
                            )
                        }
                        </div>

                        <div className="columna1">
                            <label className="textCreate">Image:</label>
                            <input type="url" value={input.image} name="image" placeholder="Image Url..." onChange={(e) => handleChange(e)} />
                            {
                                errors.image && (
                                    <span className="errors">{errors.image}</span>
                                )
                            }
                        </div>

                        <div className="columna1">
                            <label className="textCreate">Summary:</label>
                            <textarea name="summary" type="text" rows="4" cols="30" value={input.summary} onChange={e => handleChange(e)}/>
                        </div>

                        <div className="columna1">
                            <label className="textCreate">Health Score:</label>
                            <input name="healthScore" type="number" value={input.healthScore} onChange={e => handleChange(e)}/>
                            {errors.healthScore && (
                                <span className="errors">{errors.healthScore}</span>
                            )}
                        </div>

                        <div className="columna1">
                            <label className="textCreate">Steps:</label>
                            <textarea name="steps" type="text" rows="4" cols="40" value={input.steps} onChange={e => handleChange(e)}/>
                            {errors.steps && (
                                <span className="errors">{errors.steps}</span>
                            )}
                        </div>
                    </div>
                    
                    <div className="columna2">
                        <label className="textCreate">Diet Types:</label>                   
                                {dietTypes.map(d =>{
                                        return (
                                            <div key={d}>
                                                <div className="item">
                                                    <input   
                                                    type="checkbox" id="checkbox-rect1" 
                                                    name={d} 
                                                    value={d} 
                                                    selected={input.dietTypes.includes(d)} 
                                                    onChange={e => handleCheckBox(e)}/>
                                        
                                                    <label for="checkbox-rect1">
                                                        {d.toUpperCase()}
                                                    </label>
                                                </div>
                                            </div>  
                                        )
                                 })}
                                {errors.dietTypes && (
                                    <span className="errors">{errors.dietTypes}</span>
                                )}
                        </div>
                </form>
                <div className="contButton">
                    <button id="submit" className="submitButton" type="submit" onClick={(e) => handleSubmit(e)}> CREATE RECIPE</button>
                </div>
        </div>   
    )
};
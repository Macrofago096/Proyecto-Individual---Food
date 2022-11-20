import React from 'react';
import "./Recipe.css"

let prevId = 1;

export default function Recipe({ image, title, dietTypes }) {
    return (
        <div className="card">
            
            <div>
                <img className="recipeImage" src={image} alt="not found" width="200px" height="200px"/>
            </div>
            
            <div>
                <h2 className="recipe">{title}</h2>            
            </div>

            <div className="diets">
                {dietTypes?.map(e => {
                    return (
                        <h5 className="diets" key={prevId++}>{e.toUpperCase()}</h5>
                    )
                })}            
            </div>
        </div>
    )
};

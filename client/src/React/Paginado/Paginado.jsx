import React from 'react';
import "./Paginado.css"

export default function Paginado({charactersPerPage, allRecipes, paginado}) { // Me traigo como propiedades del otro componente 
    const pageNumbers = []; // arreglo vacio

    for (let i=1; i<= Math.ceil(allRecipes/charactersPerPage); i++){
        pageNumbers.push(i)
    }

    return (
    <nav className="paginated">
        <ul className="pages">
            { pageNumbers &&
            pageNumbers.map(number => (
                <li className="page" key={number}>
                    <button className="pageBtn" onClick={() => paginado(number)}>{number}</button>
                </li>
            ))}
        </ul>
    </nav>        
    )
}
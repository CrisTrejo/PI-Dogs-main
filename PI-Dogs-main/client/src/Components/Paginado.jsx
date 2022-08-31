import React from 'react'
import s from './Styles/Paginado.module.css'

export default function Paginado ({dogsPerPage, allDogs, paginado}){
    const pageNumbers = []

    for(let i = 1; i <= Math.ceil(allDogs/dogsPerPage); i++) {
        pageNumbers.push(i)

    }

    return(
        <nav>
            <div className={s.center}>
            <ul className={s.pagination}>
                {pageNumbers &&
                    pageNumbers.map(number =>{
                    return(
                    <li key={number}>
                    <a onClick={() => paginado(number)}>{number}</a>
                    </li>
                    )
                })}
            </ul>
            </div>
        </nav>
    )
}

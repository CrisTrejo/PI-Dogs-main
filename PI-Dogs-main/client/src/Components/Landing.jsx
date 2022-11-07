import React from 'react'
import {Link} from 'react-router-dom'
import s from './Styles/Landing.module.css';


export default function Landing(){
    return (
       
    <div className={s.container}>
        
        <div className={s.titulo2}>Dog Library</div>
        
        
        <div className={s.subtitulo2}>Más de 100 razas de perros con detalles e información de cada uno de ellos 
        <br></br>Incluye filtros aplicables y barra de búsqueda. También podes crear tu propia raza de perro.</div>
        
        <div  className={s.button}>
       <Link to = '/home'  className={s.link}>HOME</Link>
        </div>
    </div>
        )
}
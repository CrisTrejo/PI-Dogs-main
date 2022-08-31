import React from 'react'
import {Link} from 'react-router-dom'
import s from './Styles/Landing.module.css';


export default function Landing(){
    return (
       
    <div className={s.container}>
        
        <div className={s.titulo2}>Dog Library</div>
        
        
        <div className={s.subtitulo2}>It has 100 breeds of dogs and their respective details. 
        <br></br>Includes filters and a search bar. You can also create your own race</div>
        
        <div  className={s.button}>
       <Link to = '/home'  className={s.link}>HOME</Link>
        </div>
    </div>
        )
}
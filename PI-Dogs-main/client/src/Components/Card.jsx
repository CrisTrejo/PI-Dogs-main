import React from 'react'
import s from './Styles/Card.module.css'
import { Link } from 'react-router-dom'

const Card = ({name, weight, temperament, image, createdInDb })=>{
    console.log(temperament, "MIRAR D1")
    
    return (
        <div className={s.card}>
            <img src={image} alt="img not found" width={"150px"} height={"100px"} nError={({ currentTarget }) => {
                    currentTarget.onerror = null; // prevents looping
                    currentTarget.src = "https://comodibujar.club/wp-content/uploads/2019/03/dibujar-perro-kawaii-1.jpg";
                    }}/>
            <h3 className={s.name}>{name}</h3>
            <h5 className={s.weight}>Peso: {weight}</h5>
            <h5 className={s.temperament}>Temperamento: {temperament?.length === 0 && "Desconocido" } {createdInDb? temperament?.map(el=>el + ' '):temperament.map(el=>el + " ")}</h5>
           
        </div>
    )
}
export default Card
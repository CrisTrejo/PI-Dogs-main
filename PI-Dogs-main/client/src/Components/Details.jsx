import React from 'react'
// import s from 'Styles/Details.module.css'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getDetail } from '../Redux/Actions'
import { useEffect } from 'react'
import s from './Styles/Details.module.css'


const Details = ()=>{
    // console.log(props)
    let {id} = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(getDetail(id));
    },[dispatch, id])

    const myDog = useSelector((state) => state.detail)
    console.log(myDog, "MIRAR D2")
    console.log(myDog.temperament, "que es esto")

    return (
        <div className={s.container}>
            
                <div >
                <h1>{myDog.name}</h1>
                <img src={myDog.reference_image_id? myDog.reference_image_id : myDog.image} alt="" width="100px" height="100px"/>
                <p>Altura: {myDog.height}</p>
                <p>Peso : {myDog.weight}</p>
                <p>Años de vida: {myDog.life_span}</p>
                <h5>Temperamento: {myDog.createdInDb? myDog.temperament.map(el=>el.name + ' '): myDog.temperament?.join(' ')}</h5>
                </div> 
            <Link to= '/home'>
            <button>Volver</button>

            </Link>
            </div>
        
    )
}

export default  Details
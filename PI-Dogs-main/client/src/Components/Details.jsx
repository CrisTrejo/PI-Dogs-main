import React from 'react'
// import s from 'Styles/Details.module.css'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getDetail, deleteDog, } from '../Redux/Actions'
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

    const handleDelete = () =>{
        dispatch(deleteDog(id))
        navigate('/home')
    }
    

    return (
        <div className={s.container}>
            
                {myDog.name ?
                <div className={s.subContainer}>
                <h1 className={s.name}>{myDog.name}</h1>
                <img src={myDog.reference_image_id? 'https://cdn2.thedogapi.com/images/' + myDog.reference_image_id + '.jpg'  : myDog.image} alt="" width="100px" height="100px"/>
                <p>Altura: {myDog.height}</p>
                <p>Peso : {myDog.weight}</p>
                <p>Años de vida: {myDog.life_span}</p>
                <h5>Temperamento: {myDog.temperament?.length === 0 && "Desconocido" }{myDog.createdInDb? myDog.temperament.map(el=>el.name + ' '): myDog.temperament?.join(' ')}</h5>
                </div> : <h1>Cargando..</h1>}
            <Link to= '/home'>
           
            <button onClick={handleDelete}>Borrar perro</button>
            <button>Volver</button>

            </Link>
            </div>
        
    )
}

export default  Details
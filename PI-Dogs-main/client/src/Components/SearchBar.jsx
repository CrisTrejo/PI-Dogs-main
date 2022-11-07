import React from 'react'
import {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getNameDogs } from '../Redux/Actions'
import s from './Styles/SearchBar.module.css'

export default function SearchBar({setCurrentPage}){
    const dispatch = useDispatch()
    const [name, setName] = useState("")
    const estadoPerros = useSelector((state)=>state.dogs)
    // const [input, setInput] = useState("")

    function handleInputChange(e){
        e.preventDefault()
        setName(e.target.value)
       
    }
    function handleSubmit(e){
        e.preventDefault()
        dispatch(getNameDogs(name))
        console.log(name)
        setCurrentPage(1)
        setName('')
        if(!name){
            
            alert("Escriba el nombre de una raza")
        }

    

    }
    
    // useEffect(() => {
    //     dispatch(getNameDogs())
    //     if ()
    //   }, [dispatch])

    return (
        <div>
            <input
                type= 'text'
                placeholder='Buscar..'
                value={name}
                onChange={(e)=>handleInputChange(e)}
            />
            <button className={s.buttonSearch} type='submit' onClick={(e)=>handleSubmit(e)}>Buscar 🔎</button>
        </div>
    )
}
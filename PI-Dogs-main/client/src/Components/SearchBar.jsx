import React from 'react'
import {useState} from 'react'
import { useDispatch } from 'react-redux'
import { getNameDogs } from '../Redux/Actions'
import s from './Styles/SearchBar.module.css'

export default function SearchBar({setCurrentPage}){
    const dispatch = useDispatch()
    const [name, setName] = useState("")
    // const [input, setInput] = useState("")

    function handleInputChange(e){
        e.preventDefault()
        setName(e.target.value)
       
    }
    function handleSubmit(e){
        e.preventDefault()
        dispatch(getNameDogs(name))
        setCurrentPage(1)
        setName('')
    }

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
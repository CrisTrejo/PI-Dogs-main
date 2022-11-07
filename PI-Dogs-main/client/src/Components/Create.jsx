import React, {useEffect, useState} from 'react'
import {Link, useNavigate } from 'react-router-dom'
import { getTemperament, postDog } from '../Redux/Actions'
import { useDispatch, useSelector } from 'react-redux'
import s from './Styles/Create.module.css'


const Create = ()=>{
    
    function validate(input){
        let errors = {};
        const reg = new RegExp('^[0-9]+$');
        
        // const pattern = new RegExp('^[A-Z]+$', 'i');
        // const reg = new RegExp('^(?=(?:.\d){1})(?=(?:.[A-Z]){1})(?=(?:.[a-z]){1})(?=(?:.[@$?¡-_]){1})\S{8,16}$');
        
        if(!input.name ){
            errors.name = "Se requiere un Nombre"
        }else if (input.name.includes(" ")){
            errors.name = "No se admiten mas de dos espacios"
        }
        else if (input.name.match(reg)){
            errors.name = "No se admiten numeros"
        }
        // else if(input.name.match(regex)){
        //     errors.name = "No se admiten caracteres especiales"
        // }
        else if(input.name.trim().length < 3){
            errors.name = "Se requiere un Nombre de más de 3 caracteres"
        }else if (input.name.trim().length > 20){
            errors.name = "Se requiere un Nombre de menos de 20 caracteres"
        }


        else if(isNaN(parseInt(input.heightMin, 10))){
            errors.heightMin  = "La altura minima debe ser completada"
        }else if (isNaN(parseInt(input.heightMax, 10))){
            errors.heightMax  = "La altura maxima debe ser completada"
        }
        else if(isNaN(parseInt(input.weightMin, 10))){
            errors.weightMin  = "El peso minimo debe ser completado"
        }else if (isNaN(parseInt(input.weightMax, 10))){
            errors.weightMax  = "El peso maximo debe ser completado"
        }

        else if(isNaN(parseInt(input.life_spanMin, 10))){
            errors.life_spanMin  = "La expetativa de vida minima debe ser completada"
        }else if (isNaN(parseInt(input.life_spanMax, 10))){
            errors.life_spanMax  = "La expetativa de vida maxima debe ser completada"
        }
       
        
        
        // else if (!input.weight){
        //     errors.weight = "Se requiere un peso"
        // }else if((input.weight.trim().length < 2)){
        //     errors.weight = "Se requiere un peso de más de 2 caracteres"
        // }else if (input.weight.trim().length > 7){
        //     errors.weight = "Se requiere un peso de menos de 7 caracteres"
        // }else if(!input.life_span){
        //     errors.life_span = "Los años de vida deben ser completados"
        // }else if(input.life_span.trim().length < 2){
        //     errors.life_span = "Los años de vida deben ser más de 2 caracteres"
        // }else if((input.life_span.trim().length > 15)){
        //     errors.life_span = "Se requiere un peso de menos de 15 caracteres"
        // }



        if (errors.name || errors.heightMin || errors.heightMax|| errors.weightMin || errors.weightMax|| errors.life_spanMin || errors.life_spanMax ) {
                
            setSendButton(true)
        }else if(errors.genres){
            
            setSendButton(true)
        }
        else if(errors.platforms ){
            
            setSendButton(true)
        }
         else {
            
            setSendButton(false)
        }
        return errors
    }

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const temperament = useSelector((state) => state.temperament)
    const [errors, setErrors] = useState({});
    const [sendButton, setSendButton] = useState(true)



    const [input, setInput] = useState({
        name: "",
        heightMin:"",
        heightMax:"",
        weightMin:"",
        weightMax:"",
        life_spanMin:"",
        life_spanMax:"",
        image:"",
        temperament: [],

    })

    function handleChange(e){
        setInput({
            ...input,
            [e.target.name] : e.target.value

        })
        setErrors(validate({
            ...input,
            [e.target.name]:e.target.value
        }))
        console.log(input)
    }

    function handleSelect(e){
        console.log(e.target.value)
        if(!input.temperament.includes(e.target.value)){

            setInput({
    
                ...input,
                temperament: [...input.temperament, e.target.value]
              
            })
        }
    }
    
    function handleSubmit(e){
        e.preventDefault();
        // console.log(input)
        
        let dogardo = {
            ...input,
            height: input.heightMin + " - " + input.heightMax,
            weight: input.weightMin + " - " + input.weightMax,
            life_span: input.life_spanMin + " - " + input.life_spanMax + " years"
        }
        dispatch(postDog(dogardo))
        alert("Raza creada")
        setInput({
            name: "",
            heightMin:"",
            heightMax:"",
            weightMin:"",
            weightMax:"",
            life_spanMin:"",
            life_spanMax:"",
            temperament: [],
        })
        navigate('/home')//redirige
    }

    function handleDelete(el, option){
        if (option === 'temperament'){

            setInput({
                ...input,
                temperament: input.temperament.filter(temp=> temp !== el)
                
            })
            if (input.temperament.length) {
                setSendButton(true)
                console.log(input.temperament.length, "LENGTH")
            } 
        }
    }

    useEffect(()=>{
        dispatch(getTemperament())
        
    }, []);

    return (
        <div>
            <Link to= '/home'><button>Volver</button></Link>
            <div className={s.container}>
            <h1>Crear raza</h1>
            <form className={s.form} onSubmit={(e)=>handleSubmit(e)}>
                <div>
                    <label>Nombre: </label>
                    <input
                     className={s.input}
                        type= "text"
                        value= {input.name}
                        name="name"
                        onChange={(e)=>handleChange(e)}
                        // onInput="this.value = this.value.replace(/[^a-zA-Z0-9]/,'')"

                    />
                    {errors.name && (
                        <p className='error'>{errors.name}</p>
                    )}
                </div>
                <div>
                    <label>Altura: </label>
                    <input
                     className={s.input}
                        type= "number"
                        value= {input.heightMin}
                        name="heightMin"
                        onChange={(e)=>handleChange(e)}
                        placeholder="Altura minima en numeros"
                        min="1"
                        max="200"
                        
                    />
                    
                     {errors.heightMin && (
                        <p className='error'>{errors.heightMin}</p>
                    )}
                    
                    <input
                         className={s.input}
                        type= "number"
                        value= {input.heightMax}
                        name="heightMax"
                        onChange={(e)=>handleChange(e)}
                        placeholder="Altura maxima en numeros"
                        min="1"
                        max="200"
                    />
                    {errors.heightMax && (
                        <p className='error'>{errors.heightMax}</p>
                    )}
                </div>
                <div>
                    <label>Peso: </label>
                    <input
                     className={s.input}
                        type= "number"
                        value= {input.weightMin}
                        name="weightMin"
                        onChange={(e)=>handleChange(e)}
                        placeholder="Peso maximo en numeros"
                        min="1"
                        max="500"
                        
                    />
                    {errors.weightMin && (
                        <p className='error'>{errors.weightMin}</p>
                    )}
                    <input
                         className={s.input}
                        type= "number"
                        value= {input.weightMax}
                        name="weightMax"
                        onChange={(e)=>handleChange(e)}
                        placeholder="Peso maximo en numeros"
                        min="1"
                        max="500"
                    />
                    {errors.weightMax && (
                        <p className='error'>{errors.weightMax}</p>
                    )}
                </div>
                <div>
                    <label>Años de vida: </label>
                    <input
                     className={s.input}
                        type= "number"
                        value= {input.life_spanMin}
                        name="life_spanMin"
                        onChange={(e)=>handleChange(e)}
                        placeholder="Expectativa de vida minima en numeros"
                        min="1"
                        max="100"
                        
                    />
                    {errors.life_spanMin && (
                        <p className='error'>{errors.life_spanMin}</p>
                    )}
                    <input
                     className={s.input}
                        type= "number"
                        value= {input.life_spanMax}
                        name="life_spanMax"
                        onChange={(e)=>handleChange(e)}
                        placeholder="Expectativa de vida maxima en numeros"
                        min="1"
                        max="100"
                        
                    />
                    {errors.life_spanMax && (
                        <p className='error'>{errors.life_spanMax}</p>
                    )}
                </div>
               
                <div>
                    <p>Selecciona temperamentos: </p>
                <select onChange={(e)=> handleSelect(e)}>
                    {
                        temperament.map((temp) =>(
                            <option value={temp}>{temp}</option>
                        ))
                    }
                </select>
                    {/* <label>Temperamento: </label>
                    <input
                        type= "text"
                        value= {input.temperament}
                        name="temperament"

                    /> */}
                </div>
                <ul><li>{input.temperament.map(el=>el + " ,")}</li></ul>
                <button disabled={sendButton} id='Button' type='submit'>Crear raza</button>
            </form>
            {input.temperament.map(el=>
            <div>
            <p>{el}</p>
            <button onClick={()=> handleDelete(el, 'temperament')}  >Borrar</button>
            </div>
            )}
            </div>
        </div>
    )

}

export default Create
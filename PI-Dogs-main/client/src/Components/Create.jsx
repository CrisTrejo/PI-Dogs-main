import React, {useEffect, useState} from 'react'
import {Link, useNavigate } from 'react-router-dom'
import { getTemperament, postDog } from '../Redux/Actions'
import { useDispatch, useSelector } from 'react-redux'
import s from './Styles/Create.module.css'


const Create = ()=>{
    
    function validate(input){
        let errors = {};
        const pattern = new RegExp('^[A-Z]+$', 'i');
        
        if(!input.name ){
            errors.name = "Se requiere un Nombre"
        }else if(input.name.trim().length < 3){
            errors.name = "Se requiere un Nombre de más de 3 caracteres"
        }else if (input.name.trim().length > 20){
            errors.name = "Se requiere un Nombre de menos de 20 caracteres"
        }
        else if(!input.height){
            errors.height = "La altura debe ser completada"
        }else if(input.height.trim().length < 2){
            errors.height = "Se requiere un altura de más de 2 caracteres"
        }else if (input.height.trim().length > 7){
            errors.height = "Se requiere un altura de menos de 7 caracteres"
        }else if (!input.weight){
            errors.weight = "Se requiere un peso"
        }else if((input.weight.trim().length < 2)){
            errors.weight = "Se requiere un peso de más de 2 caracteres"
        }else if (input.weight.trim().length > 7){
            errors.weight = "Se requiere un peso de menos de 7 caracteres"
        }else if(!input.life_span){
            errors.life_span = "Los años de vida deben ser completados"
        }else if(input.life_span.trim().length < 2){
            errors.life_span = "Los años de vida deben ser más de 2 caracteres"
        }else if((input.life_span.trim().length > 15)){
            errors.life_span = "Se requiere un peso de menos de 15 caracteres"
        }



        if (errors.name || errors.height || errors.rating ) {
                
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
        height:"",
        weight:"",
        life_span:"",
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
        setInput({
            ...input,
            temperament: [...input.temperament, e.target.value]
        })
    }
    
    function handleSubmit(e){
        e.preventDefault();
        console.log(input)
        dispatch(postDog(input))
        alert("Raza creada")
        setInput({
            name: "",
            height:"",
            weight:"",
            life_span:"",
            // image:"",
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
                        type= "text"
                        value= {input.height}
                        name="height"
                        onChange={(e)=>handleChange(e)}
                        
                    />
                     {errors.height && (
                        <p className='error'>{errors.height}</p>
                    )}
                </div>
                <div>
                    <label>Peso: </label>
                    <input
                     className={s.input}
                        type= "text"
                        value= {input.weight}
                        name="weight"
                        onChange={(e)=>handleChange(e)}
                        
                    />
                    {errors.weight && (
                        <p className='error'>{errors.weight}</p>
                    )}
                </div>
                <div>
                    <label>Años de vida: </label>
                    <input
                     className={s.input}
                        type= "text"
                        value= {input.life_span}
                        name="life_span"
                        onChange={(e)=>handleChange(e)}
                        
                    />
                    {errors.life_span && (
                        <p className='error'>{errors.life_span}</p>
                    )}
                </div>
                {/* <div>
                    <label>Imagen: </label>
                    <input
                        type= "text"
                        value= {input.image}
                        name="image"
                        onChange={(e)=>handleChange(e)}
                    />
                </div> */}
                <div>
                    <p>Selecciona temperamentos: </p>
                <select onChange={(e)=> handleSelect(e)}>
                    {
                        temperament.map((temp) =>(
                            <option value={temp.name}>{temp.name}</option>
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
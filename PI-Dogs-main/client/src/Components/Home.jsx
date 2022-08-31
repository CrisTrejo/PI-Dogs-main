import React from 'react'
import {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { Link } from 'react-router-dom'
import { getDogs, getTemperament, filterDogsByTemperament, filterCreated, orderByName  } from '../Redux/Actions'
import Card from './Card'
import Paginado from './Paginado'
import SearchBar from './SearchBar'
import s from './Styles/Home.module.css'

const Home = () =>{
  const dispatch = useDispatch()


  const allDogs = useSelector((state) => state.dogs)
  console.log(allDogs, "el ALL DOGS")
  const allTemperaments = useSelector((state) =>state.temperament)
  const [orden, setOrder] = useState('')

  //estados locales
  const [currentPage, setCurrentPage ] = useState(1) //pagina uno
  const [dogsPerPage, setPerrosXPagina] = useState(8)// cantidad de cards x pagina
  const indexOfLastDog = currentPage * dogsPerPage //8
  const indexOfFirstDog = indexOfLastDog - dogsPerPage //0
  const currentDogs = allDogs.slice(indexOfFirstDog, indexOfLastDog)
  console.log(currentDogs, "El CURRENT")

  const paginado = (pageNumber) =>{
    setCurrentPage(pageNumber)
  }

  //traer del estado los perros cuando el componente se monta
  useEffect(()=>{
        dispatch(getDogs())
        dispatch(getTemperament())
  },[dispatch])//segundo parametro de useEffect
  //es lo mismo q hacer el maps dispatch to props

  const handleClick = (e) =>{
    e.preventDefault() //preventivo
    dispatch(getDogs())
    // setPaginaActual(1)
  }
  function handleSort(e){
    e.preventDefault()
    dispatch(orderByName(e.target.value))
    setCurrentPage(1)
    setOrder(`Ordenado.${e.target.value}`)
  }

  const handleFilterTemperament = (e)=>{
    dispatch(filterDogsByTemperament(e.target.value))

}

const handleFilterCreated = (e)=>{
  dispatch(filterCreated(e.target.value))
}


return(
 
  <div className={s.container}>
 
    <Link className={s.linkCrear} style={{textDecoration:"none"}} to= '/dogs'>Crear raza</Link>
    <div className={s.divTitle} >
    <h1 className={s.title}>Paw Project</h1>
    </div>
    <button className={s.buttonCargar} onClick={e=> {handleClick(e)}}>Volver a cargar razas</button>
    
    <div>
    <div className={s.filtros}>
    <p>Filtros : </p>
      <select onChange={e => handleSort(e)}>
      
        <option value='ascendente'>A-Z</option>
        <option value='descendente'>Z-A</option>
        <option value='ascendenteW'>Min-Max peso</option>
        <option value='descendenteW'>Max-Min peso</option>
      </select>
      <p>Temperamentos : </p>
      <select onChange={e => handleFilterTemperament(e)}> 
        <option value = 'All'>Todos</option>
          {allTemperaments?.map(el=><option key = {el.id} value = {el.name}>{el.name}</option>)}
      </select>
      <p> Creados y existentes : </p>
      <select onChange={e => handleFilterCreated(e)}>
        <option value='All'>Todos</option>
        <option value='created'>Creados</option>
        <option value='api'>Existentes</option>
      </select>
      </div>
      <div className={s.search}>
      <SearchBar 
      setCurrentPage= {setCurrentPage}

      />
      </div>
      <div className={s.card}>
      {
        currentDogs?.map(d=>{
          return (

          <div>
          <Link style={{textDecoration:"none"}} to={"/home/" + d.id}>

          <Card 
          name={d.name} 
          image={d.image ? d.image : <img src= 'https://comodibujar.club/perro-kawaii/' alt = "Img not found"/>} 
          weight={"Peso: " + d.weight} 
          temperament={ d.temperament}
          createdInDb={d.createdInDb}
          />
          </Link>
          </div>
          )
        })
      }
      </div>
      <Paginado 
      dogsPerPage={dogsPerPage}
      allDogs={allDogs.length}
      paginado={paginado}
      />
    </div>
   
  </div>
  
)
}
export default Home
// import s from './Styles/Home.module.css'
// import Nav from './Nav'



// const Home = () =>{
//     const dispatch = useDispatch()

//     const allDogs = useSelector((state)=> state.dogs)
//     const allTemperaments = useSelector ((state) => state.temperaments)
//     const [setOrder] = useState('')

//     const [currentPage, setCurrentPage] = useState(1)
//     const [dogPerPage] = useState(15)
//     const indexOfLastDog = currentPage * dogPerPage
//     const indexOfFirstDog = indexOfLastDog - dogPerPage
//     const currentDogs = allDogs.slice(indexOfFirstDog, indexOfLastDog)

//     const paginado = (pageNumber) => {
//         setCurrentPage(pageNumber) //! Cambio el estado de la pagina para ir a la siguiente
//       }
//       useEffect(() => {
//         dispatch(getDogs())
//         dispatch(getTemperaments())
    
//       }, [dispatch])

//       function handleClick(e) {
//         e.preventDefault()
//         dispatch(getDogs())
//         setCurrentPage(1)
//       }

//       const handleSearch = (value) => {
//         dispatch(searchDog(value))
//         setCurrentPage(1)
//       }

      // function handleFilterCreated(e) {
      //   dispatch(filterCreated(e.target.value))
      // }

      // function handleSortedName(e) {
      //   e.preventDefault()
      //   dispatch(orderByName(e.target.value))
      //   setCurrentPage(1)
      //   setOrder(`Ordenado.${e.target.value}`)
      // }
      // function handleFilterStatus(e){
      //       dispatch(filterVideogamesByStatus(e.target.value))
    
      //   }



//         return (
// <>
// <div>
//     <Nav onSearch={handleSearch}></Nav>
//     </div>
// </>



// )}
// export default Home
// import React, {useState} from "react";
// import s from './Styles/Nav.module.css'

// import { useSelector } from 'react-redux';
// import { NavLink } from 'react-router-dom';


// const Nav = ({onSearch}) => {
//     const [value, setValue] = useState("");
//     const allDogs = useSelector((state) => state.dogs)

//     const handleSearchValue = (e) => {
//         setValue(e.target.value);
//     }

//         const handleSubmit = (e) => {
//             e.preventDefault();
//             const dogs = allDogs.find(el => el.name.toLowerCase().includes(value.trim().toLowerCase()))
//             console.log(value, "SOY EL VALUE")
//             console.log(dogs, "SOY EL NOMBRE EN LOWER CASE")
//             dogs?
//             onSearch(value):
//             alert("No existe el perro")
//             setValue("")
//           };

//           return (
//             <>
//             <div className={s.nav}>
           
//                 <h1 className={s.containerTitulo}>Paw Project</h1>
                
//                 <ul>
//                 <NavLink to="/home/create">
//                   <button className={s.button}>Crear perro </button>
//                 </NavLink>
//                     <form onSubmit={handleSubmit}>
//                   <input
//                    className={s.input}
//                     onChange={handleSearchValue}
//                     value={value}
//                     type="search"
//                     placeholder="Busca un perro..."
//                   />
//                   <button type="submit">🔎</button>
//                     </form>
//                 </ul>
        
//             </div>
//             </>
//           )

// }

// export default Nav
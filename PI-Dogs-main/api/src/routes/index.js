const { Router } = require('express');

const axios = require ('axios')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

require ('dotenv').config()
// console.log(process.env.API_KEY, "soy API KEY")

const router = Router();
const {Dog, Temperament}=require("../db");


// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

const getApiInfo = async ()=>{
    const APIKEY = process.env.API_KEY;
    const Info = "https://api.thedogapi.com/v1/breeds?api_key=" + APIKEY //+ "&page_size=100"
    const apiUrl  = await axios.get(Info)
    const apiInfo =  apiUrl.data.map(m => {
        // let tempArray = action.payload.map(el=>el.temperament)
        // let tempArraySplit = m.temperament
        // let tempArrayPosta = tempArraySplit.split(',')
        // console.log(m)
        return  {

            id:               m.id,
            name:             m.name,
            height:           m.height.metric,
            weight:           m.weight.metric,
            life_span:        m.life_span,
            image:            m.image.url,
            temperament:      typeof m.temperament =='string'? m.temperament?.trim().split(', '): [],
        }
        
    }
    )
    // let a = apiInfo.map(el=>el.temperament).toString().trim().split(', ')
    // let b = a.toString().split(',')
    
    // console.log(a)
    return apiInfo
}

const getDbInfo = async ()=>{
    return await Dog.findAll({
        include: {
            model: Temperament,
            attributes: ["name"],
            through: {
               attributes: [],
            },
          },
    })
}

const getAllDogs = async ()=>{
    let apiInfo = await getApiInfo()
    let dbInfo = await getDbInfo()
    const infoTotal = apiInfo.concat(dbInfo)
    return infoTotal
}

const DetailsDG = async (id) =>{
    try{
    const APIKEY = process.env.API_KEY;
    // console.log(id, "Soy el ID de Details")
    if (id.length >4){
        const infoDb = await getDbInfo()
        const filtrado = infoDb.find(el =>el.id === id)
        // console.log(filtrado, "Soy el Filtrado")
        return filtrado
    }else {
        const apiInfo = await axios.get("https://api.thedogapi.com/v1/breeds/" + id + "?api_key=" + APIKEY);
        const detalles = apiInfo.data
        // console.log(detalles)
        // const apiImg = await axios.get("https://api.thedogapi.com/v1/images/" + detalles.reference_image_id + "?api_key=" + APIKEY);
        // console.log(apiImg.data, "IMAGEN")
        const objDetalle = {
            id:               detalles.id,
            name:             detalles.name,
            height:           detalles.height.metric,
            weight:           detalles.weight.metric,
            life_span:        detalles.life_span,
            reference_image_id:  detalles.reference_image_id,
            temperament:     typeof detalles.temperament =='string'? detalles.temperament?.trim().split(', '): [],
        }
        console.log(objDetalle, "SOY EL OBJ DETALLE")
        return objDetalle
    }}catch(error){
        console.log(error)
    //   console.log(detalles)
    }
}

const saveTemperaments = async () => {
    
    const APIKEY = process.env.API_KEY;
    const info = "https://api.thedogapi.com/v1/breeds?api_key=" + APIKEY
    const temperamentApi  = await axios.get(info)
    const temperaments = temperamentApi.data.map(el=>el.temperament).sort().join()
    const spliteado = temperaments.split(',',temperaments.length).sort().map(el=>el.trim())
let tempSet = new Set(spliteado)
    let temperamentardos = await Temperament.findAll()
    console.log(temperamentardos)
    let filteredTemp = Array.from(tempSet).filter(el=> el.length > 1)
    if (temperamentardos.length=== 0){
        
    
    filteredTemp.forEach(async(el) => {
        await Temperament.create({name: el})
    })}
    filteredTemp = filteredTemp.map(el=>({name:el}))
    // console.log(filteredTemp)
    return filteredTemp
  };

//   const getTemperamentsFromDB = async () => {
//     try {
//         let temperamentsFromDB = await Temperament.findAll();
//         temperamentsFromDB = temperamentsFromDB.map((g) => g.toJSON());
     
//         return temperamentsFromDB;
//     } catch (error) {
//         console.log(error);
//     }
//  };

router.get('/dogs', async (req, res) => {
    const name = req.query.name
    let totalDogs = await getAllDogs()
    if (name) {
     //    const n = 14
        let dogsName = await totalDogs.filter(el => el.name.toLowerCase().includes(name.toLowerCase()))
        dogsName.length ?
            res.status(200).send(dogsName) :
            res.status(404).send("No existe el perro")
    } else {
        res.status(200).send(totalDogs)
    }
 })

 router.get('/dogs/:id', async (req,res)=>{
    try{
    const {id} = req.params
    let infoTotal = await DetailsDG(id)
    // console.log(id, "Soy el ID del get x id")
    
    
      
    res.status(200).send(infoTotal)
    }catch(error){
       const {id} = req.params
    //    console.log(id, "SOY EL ID get que fue Exitoso")
 
    res.status(404).send("soy el error de ID get", ) 
    }
    
 });

 router.post('/dogs', async (req, res) => {
    try {

        let {
                   name,
                   height,
                   weight,
                   life_span,
                   image,
                   temperament,
                   
                   
        } = req.body
console.log(temperament, "SOY EL TEMP")
        const newDog = await Dog.create({
                        name,
                        height,
                        weight,
                        life_span,
                        image: image || 'https://comodibujar.club/wp-content/uploads/2019/03/dibujar-perro-kawaii-1.jpg',              
        });
        console.log(Temperament,"Soy el modelo")
        let TemperamentDB = await Temperament.findAll({
            where: { name: temperament },
          });
          console.log(TemperamentDB)
         await newDog.addTemperament(TemperamentDB)

        // console.log(temperamentIndb)
        
        res.status(200).send("Dog creado con exito")
    } catch (error) {
        console.log(error);
        res.status(400).send({ errorMsg: error });
    }
})

router.get('/temperaments', async (req,res) => {

    try{
    
   let infoApi = await saveTemperaments()
   
   res.status(200).send(infoApi)
//    console.log(infoApi)
} catch(error){
    console.log(error)
    res.status(400).send({ errorMsg: error });
}
}
)


module.exports = router;

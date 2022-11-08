import axios from 'axios';  

export function getDogs(){
    return async function (dispatch){
      const dogs = await axios.get ("/dogs");
      return dispatch({
        type: 'GET_DOGS',
        payload: dogs.data
        
      }) 
    }}

    export function filterDogsByTemperament(payload){
      console.log(payload)
      return{
          type: 'FILTER_BY_TEMPERAMENT',
          payload
      }
  
  }
  export function getTemperament(){
    return async function (dispatch){
      var temperament = await axios.get ("/temperaments");
      
      return dispatch({
          type: 'GET_TEMPERAMENT',
          payload: temperament.data
          
        }) 
      }}

      export function postDog(payload){
        return async function (dispatch){
          const response = await axios.post ("/dogs", payload)
          console.log(response)
          return response
        }
      }
  
  export function filterCreated(payload){
    return {

      type: 'FILTER_CREATED',
      payload
    }
    
  }
  export function orderByName(payload){
    return{
      type:'ORDER_BY_NAME',
      payload
    }
  }
  export function getNameDogs(name){
    return async function(dispatch){

      try{
        var json = await axios.get ('/dogs?name=' + name)
        return dispatch({
          type:'GET_NAME_DOGS',
          payload:json.data
        })
      }catch(error){
        return (
          alert("El perro que buscas no esta en nuestra base de datos :(")
        )
        // console.log(error)
      }
    }
  }
  export function getDetail(id){
    return async function(dispatch){
      try{
        var json = await axios.get('/dogs/' + id)
        console.log(json)
        return dispatch({
          type: "GET_DETAIL",
          payload: json.data
        })
      }catch(error){
        console.log(error)
      }
    }
  }
  export function deleteDog(id){
    return async function(dispatch){
      await axios.delete('/dogs/' + id)
      return dispatch({
        type: 'DELETE_DOG',

      })
    }

  }

  export function editDog(id, data){
    return async function (dispatch) {
      await axios.put('/dogs/' + id ,data)
      return dispatch({
        type: 'UPDATE_DOG'
      })
    }
}

    // export function getTemperaments(){
    //     return async function (dispatch){
    //     var temperaments = await axios.get ("http://localhost:3001/temperaments");
    //     return dispatch({
    //         type: 'GET_TEMPERAMENTS',
    //         payload: temperaments.data
            
    //       }) 
    //     }}
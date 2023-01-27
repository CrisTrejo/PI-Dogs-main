const initialState = {
    dogs: [],
    temperament: [],
    allDogs: [],
    detail:{}

}

function rootReducer(state = initialState, action) {
    switch(action.type){
        case 'GET_DOGS':
            // console.log(action.payload)
            // let tempArray = action.payload.map(el=>el.temperament)
            // let tempArraySplit = tempArray.toString()
            // let tempArrayPosta = tempArraySplit.split(',')
            // console.log(tempArrayPosta)
            return{
                ...state,
                dogs: action.payload,
                allDogs: action.payload
                
            }
            case 'FILTER_CREATED':
                const allDogs = state.allDogs
                const createdFilter = action.payload === 'created' ? allDogs.filter(el=>el.createdInDb) : allDogs.filter(el=>!el.createdInDb)
                return{ 
                    ...state,
                    dogs: action.payload === 'All' ? state.allDogs : createdFilter
    
                }
                case 'CLEAR_DETAIL':
                    return {
                        ...state,
                        detail: {}
                      };
                   
        
                    

        case 'FILTER_BY_TEMPERAMENT':
            // console.log(action.payload, "PAYLOAD TEMP")
            const allDogss = state.allDogs
            // console.log(state.allDogs)
            // console.log(allDogss, "EL ALL DOGS")
            const temperamentFiltered = action.payload === 'All' ? state.allDogs : allDogss.filter(el=>el?.temperament?.map(el=>el).includes(action.payload))
            console.log(temperamentFiltered, "TEMP FILTRADO")
            
            return{
                ...state,
                dogs: temperamentFiltered
            }
        case 'GET_TEMPERAMENT':
            return{
                ...state,
                temperament:action.payload
            }
        case 'ORDER_BY_NAME': let sortedArr ; 
            if (action.payload === 'ascendente'){
                sortedArr = state.dogs.sort(function(a, b){
                if(a.name.toLowerCase() > b.name.toLowerCase()){ 
                    return 1;
                }
                if (b.name.toLowerCase() > a.name.toLowerCase()){
                    return -1;
                }
                    return 0;
            })
                }else if (action.payload === "descendente") {
                    sortedArr = state.dogs.sort(function (a, b) {
                if (a.name.toLowerCase() > b.name.toLowerCase()) {
                    return -1
                }
                if (b.name.toLowerCase() > a.name.toLowerCase()) {
                    return 1
              }
              return 0
            })
          }
                if (action.payload === 'descendenteW'){
                    sortedArr = state.dogs.sort(function (a, b){
                if (a.weight > b.weight){
                    return -1
                    }
                if (b.weight > a.weight){
                    return 1;
                    }
                    return 0;
                    })}
                if (action.payload === 'ascendenteW'){
                    sortedArr = state.dogs.sort(function (a, b){
                if (a.weight > b.weight){
                    return 1
                    }
                if (b.weight > a.weight){
                    return -1;
                    }
                    return 0;
                })}
        return {
            ...state,
            dogs:sortedArr
    }
        case 'GET_NAME_DOGS':
            console.log(action.payload,"action payload reducer name dogs")
            return{
                ...state,
                dogs:action.payload
            }
            case 'POST_DOG':
                return{
                    ...state,
                    
                }
                case 'GET_DETAIL':
                    return{
                        ...state,
                        detail: action.payload
                    }
                    case 'DELETE_DOG':
                        return{
                            ...state,

                        }
                        case 'UPDATE_DOG':
                            return{
                                ...state
                            }
            default:
                return {...state}
    }

}

export default rootReducer
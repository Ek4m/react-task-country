export const countriesReducer = (initialState = {countries:[], currentCountry:null},action) => {
    switch(action.type){
        case "GET_COUNTRIES":
            return {
                ...initialState,
                countries: action.countries
            }
        case "DELETE_COUNTRY":
            return {
                ...initialState,
                countries:action.countries
            }
            case "ADD_CURRENT":
            return {
                ...initialState,
                currentCountry:action.current
            }
        default: 
            return initialState
    }
}
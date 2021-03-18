import axios from 'axios';
import store from '../store/store';
export const onGetCountries = (countries) => {
    return dispatch => {
        dispatch({type:"GET_COUNTRIES", countries:countries})
    }
}

export const onDeleteCountry = (alpha3Code) => {
    return dispatch => {
        let countries = [...store.getState().countries.countries];
        let newCountries = countries.filter(country => country.alpha3Code !== alpha3Code);
        dispatch({type:"DELETE_COUNTRY", countries:newCountries})
    }
}

export const addCurrentCountry = (alpha) => {
    return dispatch => {
       axios.get('https://restcountries.eu/rest/v2/alpha/'+ alpha)
       .then(response => {
           let country = response.data;
           if(store.getState().countries.currentCountry){
               if(JSON.stringify(store.getState().countries.currentCountry) !== JSON.stringify(country)){
                dispatch({type:"ADD_CURRENT",current:country})
               }else{
                dispatch({type:"DEF"})
               }
           }else{
            dispatch({type:"ADD_CURRENT",current:country})
           }
       })
    .catch(err => {
        console.log(err)
        dispatch({type:"DEF"})
        alert('no country found')
    })
    }
}
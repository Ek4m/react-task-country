import React from 'react'
import { connect } from 'react-redux'
import * as countriesActions from '../../redux/actions/countries'
import Country from './Country/Country';
import './Countries.css';
const Countries = (props) => {

    const onDeleteCountry = (alpha3Code) => {
        props.deleteCountry(alpha3Code)
    }

    let content;
    if(!props.countryNotFound){
        if(props.countries.countries.length > 0){
            content = props.countries.countries.map(country => (
                <Country key={country.alpha3Code} 
                delete={() =>onDeleteCountry(country.alpha3Code)}
                alpha={country.alpha3Code}
                name={country.capital} />
            ))
        } else{
            content = <h1>Type and submit to see the countries</h1>
        }
    }else{
        content = <h1 style={{color:'red'}}>{!window.navigator.onLine ? "Disconnected" : "No country found"}</h1>
    }
  
    return (
        <div className="Countries" style={{
            border: props.countries.countries.length > 0 ? '1px solid rgb(189, 189, 189)' : '',
            boxShadow:props.countries.countries.length >0 ? 'box-shadow: 0px 3px 6px 1px rgba(0, 0, 0, 0.562)' : ''
        }}>
            {content}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        countries:state.countries
    }
    }
    
    const mapDispatchToProps = (dispatch) => {
        return {
           deleteCountry:(code) => dispatch(countriesActions.onDeleteCountry(code)),
        }
    }
    
    export default connect(mapStateToProps, mapDispatchToProps)(Countries)
    
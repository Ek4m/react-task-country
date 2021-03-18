import React from 'react'
import './Country.css';
import * as countriesActions from '../../../redux/actions/countries'
import { connect } from 'react-redux';

const Country = (props) => {
    const clickHandler = (e) => {
        e.stopPropagation()
        props.delete()
    }

    let classname;
    if(props.countries.currentCountry){
        if(props.alpha === props.countries.currentCountry.alpha3Code){
            classname = 'Country Selected'
        }else{
            classname = 'Country';
        }
    }else{
            classname = 'Country';
        }

        let style = {};
        if(props.countries.countries.length > 1){
            style={
                borderBottom:'1px solid rgb(189, 189, 189)'
            }
        }
    return (
        <div className={classname}
        onClick={() => props.onAddToCurrent(props.alpha)}
        style={style}>
            <p>{props.name}</p>
            <button onClick={(e) => clickHandler(e)}>X</button>
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
           onAddToCurrent:(alpha) => dispatch(countriesActions.addCurrentCountry(alpha))
        }
    }
    
    export default connect(mapStateToProps, mapDispatchToProps)(Country)
    
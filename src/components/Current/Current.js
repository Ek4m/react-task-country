import React, { Fragment, useEffect, useState } from 'react'
import './Current.css';
import * as countriesActions from '../../redux/actions/countries'
import { connect } from 'react-redux';
import axios from 'axios';

const Current = (props) => {

const [borders, setborders] = useState('');
    useEffect(() => {
        if(props.countries.currentCountry){
            if(props.countries.currentCountry.borders.length > 0){
                setborders('Loading...')
                console.log('olar')
                let requests = props.countries.currentCountry.borders.map(border => {
                    return new Promise((resolve, reject) => {
                        axios.get('https://restcountries.eu/rest/v2/alpha/'+ border)
                        .then(response => {
                            resolve(response.data.name);
                        })
                        .catch(err => {
                            resolve(err)
                        })
                    })
                    
                })
                Promise.all(requests).then(res => {
                    setborders(res.join(', '));
                })
                .catch(err => {
                    console.log(err);
                    setborders('')
                })
            }
           
          
        }
        return () => {
            setborders('')
        }
    },[props.countries.currentCountry])



    let content;
    if(props.countries.currentCountry){
        let currency = "";
         props.countries.currentCountry.currencies.forEach((c, index) => {
             if(index === props.countries.currentCountry.currencies.length - 1){
                 currency = currency.concat(c.code)
             }else{
                currency = currency.concat(c.code, ', ')
             }
                  })
        content = <Fragment>
            <img src={props.countries.currentCountry.flag}  alt={props.countries.currentCountry.alpha3Code}/>
            <div className="Current-Content">
                <h2>{props.countries.currentCountry.name}</h2>
                <span>{props.countries.currentCountry.region}</span>
                <p>Population: {props.countries.currentCountry.population}</p>
                <p>Currency: {currency}</p>
                <div className='borders'>
                    <p>Borders:{borders}</p>
                </div>
            </div>
        </Fragment>
    }else if(props.countries.countries.length > 0){
        content = <h3 className="Current--Suggest">Select one of the capitals to view more</h3>
    }else{
        content = null;
    }

    return (
        <div className='Current' style={{
            boxShadow: props.countries.currentCountry  ? '0px 3px 6px 1px rgba(0, 0, 0, 0.562)' : '',
            border: props.countries.currentCountry  ? '1px solid rgb(194, 194, 194)' : ""
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
           deleteCountry:(code) => dispatch(countriesActions.onDeleteCountry(code))
        }
    }
    
    export default connect(mapStateToProps, mapDispatchToProps)(Current)

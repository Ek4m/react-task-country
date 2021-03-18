import axios from 'axios';
import React, { Component } from 'react'
import { connect } from 'react-redux';
import * as countriesActions from '../../redux/actions/countries'
import Countries from '../Countries/Countries';
import Current from '../Current/Current';
import Input from '../Input/Input'
import './Main.css';
export class Main extends Component {

    state = {
        value:"",
        isPressed:false,
        countryNotFound:false
    }

    onChangeHandler = (e) => {
        if(this.state.countryNotFound){
            this.setState({
                value:e.target.value,
                countryNotFound:false
            })
        }else{
            this.setState({
                value:e.target.value
            })
        }
    }

    onSubmitHandler = (e) => {
        e.preventDefault();
      if(this.state.countryNotFound){
        this.setState({
            isPressed:true,
            countryNotFound:false
        })
      }else{
        this.setState({
            isPressed:true,
        })
      }
        let val = this.state.value.trim().toLowerCase()
       if(val.length > 0){
           axios('https://restcountries.eu/rest/v2/capital/' + val)
           .then(res => {
              this.props.getCountries(res.data)
              this.setState({
                isPressed:false
            })
               })
               .catch(err => {
                   this.props.getCountries([]);
                   this.setState({
                    isPressed:false,
                    countryNotFound:true
                })
               })
              
       }
    }

    render() {
        return (
            <div className="Main">
                <Input 
                val={this.state.value}
                change={this.onChangeHandler}
                submit={this.onSubmitHandler}
                pressed={this.state.isPressed}
                />
               <div className="Body">
               <Countries
                countryNotFound={this.state.countryNotFound}
                />
                <Current />
               </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
return {
    countries:state.countries
}
}

const mapDispatchToProps = (dispatch) => {
    return {
        getCountries:(countries) => dispatch(countriesActions.onGetCountries(countries))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main)

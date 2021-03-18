import React from 'react'
import './Input.css';
const Input = (props) => {
    return (
        <div className="InputForm">
            <form action="#" onSubmit={e => props.submit(e)} >
                <input type="text" placeholder="Capital"
                 value={props.val}
                 required
                 onChange={e=> props.change(e)}/>
                <input 
                type="submit" 
                disabled={props.pressed}  
                value={props.pressed ? "Loading..." : "Submit"}/>
            </form>
        </div>
    )
}

export default Input

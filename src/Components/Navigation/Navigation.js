import React from 'react'

const Navigation = ({onRoutechange, IsSignedIn}) =>{
    if(IsSignedIn){
    return(
    <nav style ={{display:'flex', justifyContent:'flex-end'}}>
        <p onClick = {()=>onRoutechange('signout')}
        className ='f3 link dim black pa3 underline pointer'> Sign Out</p>
    </nav>

    );
    } else {
        return (
            <nav style ={{display:'flex', justifyContent:'flex-end'}}>
            <p onClick = {()=>onRoutechange('signin')} className ='f3 link dim black pa3 underline pointer '> SignIn</p>
            <p onClick = {()=>onRoutechange('Register')}className ='f3 link dim black pa3 underline pointer '>  Register</p>
        </nav>
        );
    }
}

export default Navigation;

//tachyons:
// f3 =>size 3
//dim 
//back :when click on it
// pointer when you hove over it
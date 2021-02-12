import React, { Component } from 'react';

   class SignInForm  extends Component{
     constructor(props){
       super(props);
       this.state={
         signinEmail:'',
         signinPassWord:''
       }
     }
     onEmailChange =(event)=>{
       this.setState({signinEmail:event.target.value})
     }

     onPassWordChange = (event) =>{
       this.setState({signinPassWord: event.target.value})
     }

     onSubmitSignin = () =>{
       //console.log(this.state)
       fetch('http://localhost:3000/signin',{
         method:'post',
         headers:{'Content-Type':'application/json'},
         body: JSON.stringify({
           email:this.state.signinEmail,
           password: this.state.signinPassWord
          })
      
       })
        //prevent empty/or wrong log in
        .then(response => response.json())
        // .then( data =>{
        //   if(data === 'successful signed in'){
        //    this.props.onRoutechange('home')}
        // })
        .then(user =>{ 
          if(user.id){
            this.props.loadUser(user);
            this.props.onRoutechange('home')
          }
        })
     
     }
     render(){
       const {onRoutechange} = this.props
      return(
        <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 center shadow-5">
          <main className="pa4 black-80">
        <div className="measure">
          <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <legend className="f2 fw6 ph0 mh0">Sign In</legend>
            <div className="mt3">
              <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
              <input 
              className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
              type="email" 
              name="email-address" 
               id="email-address"
               onChange = {this.onEmailChange}
               />
            </div>
            <div className="mv3">
              <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
              <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
               type="password" 
               name="password"  
               id="password"
               onChange = {this.onPassWordChange}
               />
            </div>
          </fieldset>
          <div className="">    
            <input
               onClick = {this.onSubmitSignin}
             className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
             type="submit" 
             value="Sign in"/>
          </div>
          <div className="lh-copy mt3">
            <p  onClick = {() => onRoutechange('Register')}className="f6 link dim black db  pointer">Register</p>
          
          </div>
        </div>
    </main>
  </article>
      )
      


     }
    
}

export default SignInForm;
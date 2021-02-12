import React,{Component} from 'react'
import Particles from 'react-particles-js';
 
import './App.css';
import Navigation from './Components/Navigation/Navigation';
import Logo from './Components/Logo/Logo'
import ImageForm from './Components/ImageForm/ImageForm';
import Rank from './Components/Rank/Rank'
import FaceRecognition from './Components/FaceRecognition/FaceRecognition'
import SignInForm from './Components/SignInForm/SignInForm'
import Register from './Components/Register/Register'
import Clarifai from 'clarifai';


const app = new Clarifai.App({
 //apiKey:'98f683fb10f0429c9ef1619e7610720a'
 apiKey:'65e6e1eae09b4f508ffa678ee4ffa374'

});


  const ParticleOption  = { 
    particles: {
      
    //   line_linked: 
    //   { shadow: { enable: true, color: "#3CA9D1", blur: 5 }
    //   }
    // }

    number:{ value:90 ,
       density: { enable: true , value_area: 800}
      }
    }
  }

   const initialState = {
    input : '',
    imageUrl: '',
    box:{},
    route: 'signin',
    IsSignedIn: false,
    user: {
      id: '',
      name:'',
      email:'',
     entries:0,
     joined: ''
    }
  }

class  App extends  Component {

   constructor(){
     super();
     this.state = initialState;
   }
  //  componentDidMount(){
  //    fetch('http://localhost:3000')
  //    .then(response =>response.json())
  //    .then(console.log)
  //  }

  loadUser =(data) =>{
    this.setState({user:{
      id : data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }})

  }

   CalculataFaceLocation = (data) =>{
     const faceSize = data.outputs[0].data.regions[0].region_info.bounding_box;
     const image = document.getElementById('inputImage')
     const width = Number(image.width);
     const height = Number(image.height);
     console.log(width,height)
     return ({
       leftcol : (faceSize.left_col * width),
       toprow : (faceSize.top_row * height),
       rightcol : width - (faceSize.right_col * width),
       bottomrow : height - (faceSize.bottom_row * height)

     }
       
     )
      
   }
     
   //create fcn that set the clarifaiFaceCalculation
   displayBox =(box) =>{
     //console.log(box)
     this.setState({box:box})
   }

   onInputChange = (event) =>{
    //  console.log(event.target.value);
     this.setState({input:event.target.value })
     
   }
   onButtonClick = ()=>{
    
    this.setState({imageUrl :this.state.input});
  
     app.models
        .predict( Clarifai.FACE_DETECT_MODEL, this.state.input)
      //setState(updater, callback) for imageUrl instead of this.state.input
         .then(response => {
           if(response){
             fetch('http://localhost:3000/image',{
               method:'put',
               headers:{'Content-Type':'application/json'},
               body: JSON.stringify({
                 id: this.state.user.id
               })
             })
             .then(response => response.json())
             .then(count =>{
               this.setState({user:{
                 entries:count
               }})
              // this.setState(Object.assign(this.state.user,{entries:count}))
             })
           }
           this.displayBox(this.CalculataFaceLocation(response))
        
        })
         .catch(err =>console.log(err))
        
   }
      
   onRoutechange = (route) =>{
     if(route === 'signout'){
      //  this.setState({IsSignedIn:initialState}) //bcz i initialzed state out of class
        this.setState(initialState)
      }else if(route === 'home'){
            this.setState({IsSignedIn:true})
         }
     this.setState({route:route})
   }

  render(){
    const { IsSignedIn,imageUrl,box} = this.state;
  return (
    <div className="App">
 
      <Particles  className ='particles'
      params = {ParticleOption}/>
     <Navigation  IsSignedIn = {IsSignedIn} onRoutechange = {this.onRoutechange}/>
     {
         this.state.route === 'home'
          ?<div>
              <Logo/>
              <Rank  name = {this.state.user.name} entries = {this.state.user.entries}/>
              <ImageForm 
                onInputChange = {this.onInputChange}
                onButtonClick = {this.onButtonClick}
                />
              <FaceRecognition  box = {box} imageUrl = {imageUrl} />
         </div>
          
          :(
             this.state.route === 'signin'
             ? <SignInForm loadUser = {this.loadUser} onRoutechange = {this.onRoutechange}/>
             :<Register loadUser = {this.loadUser}  onRoutechange = {this.onRoutechange}/>
             )
  } 
    
    </div>
    
  );
}
}
export default App;

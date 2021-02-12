import React from 'react';
import './ImageForm.css';


const ImageForm = ({onInputChange, onButtonClick}) =>{
   return ( 
            <div>
                <p> {'This magic brain will detect Faces in your pictures. Give it a try '}</p>
                <div className = 'center'>
                    <div className = 'center form pa4 br3 shadow-5'> 
                        <input className = 'center f4 w-70'  type = 'text' onChange = {onInputChange} />
                        <button className ='f4 grow pointer link w-30 bg-light-purple'onClick = {onButtonClick}>
                             Detect</button>
                    </div>
                </div>
            </div>
            )
}

export default ImageForm;
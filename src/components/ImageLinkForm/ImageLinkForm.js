import React from 'react';
import "./imageLinkForm.css"


function ImageLinkForm({ onInputChange,onSubmit }) {

  return (
    <div >
        <p className="f3">
            {"This magic brain will detect faces in your picture. give it  a try "} 
        </p>
        <div className="center">
            <div className=" form center pa4 br3 shadow-5">
                <input  onChange={onInputChange} placeholder="Enter the link to an image" className="f4 pa2 w-70 center" type="text" />
                <button  onClick={onSubmit} className="w-30 grow f4 link ph3 pv2  dib white bg-light-purple">Detect</button>
            </div>
        </div>
    </div>
  ) 
}

export default ImageLinkForm;

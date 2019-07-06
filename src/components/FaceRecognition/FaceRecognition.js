import React, { Component } from "react"
import "./FaceRecognition.css"

class FaceRecognition extends Component {
    render() {
        let box = this.props.box

        let boxes = box.map((item,index) => {
            return  <div key ={index} className="bounding-box" style={{ top:item.top, right: item.rightcol, bottom: item.bottom, left: item.leftcol }}></div>
        })

        return (
            <div>
                <p className="mb2">There are {box.length} faces in this image</p>
                <div className="center ma">
                    <div className="absolute mt2">
                        <img id="input_image" src={this.props.imageUrl} width="500px" height="auto" alt="" />
                        {boxes}
                    </div>
                </div>
            </div>
            )
    }
}

export default FaceRecognition
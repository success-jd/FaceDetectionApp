import React, { Component } from "react"
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Rank from './components/Rank/Rank';
import Particles from 'react-particles-js'
import Clarifai from "clarifai"

const app = new Clarifai.App({
    apiKey: '4271b38dc9014046b19b32e613cc15aa'
   });

const particleOptions = {
    particles: {
        number: {
          value: 20,
          density: {
            enable: true,
            value_area: 90
          }
        }
      }
    }

class MainApp extends Component {
    constructor(props) {
        super(props);
        this.state = {
           input: "" ,
           imageUrl: "",
           box: []
        }
    }

    onInputChange = (e) => {
        this.setState({ input: e.target.value })
    }

    calculateFaceLocation = (data) => {
        // const clarifyFace = data.outputs[0].data.regions[0].region_info.bounding_box
        // const image = document.getElementById("input_image")
        // const width =  Number(image.width)
        // const height = Number(image.height)
        // console.log(width,height)

        // return {
        //     leftcol: clarifyFace.left_col * width,
        //     top: clarifyFace.top_row * height,
        //     rightcol: width - (clarifyFace.right_col * width),
        //     bottom: height - (clarifyFace.bottom_row * height)
        // }
        let totalNews = []
        let datas = data.outputs[0].data.regions
        datas.forEach((item) => {
                let info = item.region_info.bounding_box
                const image = document.getElementById("input_image")
                const width = Number(image.width)
                const height = Number(image.height)

                 let news = {
                    leftcol: info.left_col * width,
                    top: info.top_row * height,
                    rightcol: width - (info.right_col * width),
                    bottom: height - (info.bottom_row * height)
                }

                totalNews.push(news)
            })
            return totalNews
    }

    displayFaceBox = (box) => {
        this.setState({ box: box });
    }

    onSubmit = () => {
        console.log("click")
        this.setState({ imageUrl: this.state.input})
        app.models.predict(
        Clarifai.FACE_DETECT_MODEL, this.state.input)
        .then((response) => {
           this.displayFaceBox(this.calculateFaceLocation(response))
            // do something with response
        })
        .catch((err) =>  console.log(err))
    }

    render() {

        return (
            <div className="App">
                <Particles className="particles"
                    params={particleOptions}
                />
                <Navigation />
                <Logo />
                <Rank />
                <ImageLinkForm 
                onSubmit={this.onSubmit}
                onInputChange={this.onInputChange} />
                <FaceRecognition box={this.state.box} imageUrl = {this.state.imageUrl} />
                {/*  */}
            </div>
        )
    }
}

export default MainApp
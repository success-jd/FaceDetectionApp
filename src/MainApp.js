import React, { Component } from "react"
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import Rank from './components/Rank/Rank';
import Particles from 'react-particles-js'

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

   const initialState = {
        input: "" ,
        imageUrl: "",
        box: [],
        route: "signin",
        isSignedIn: false,
        user: {
            id: "",
            name: "",
            email: "",
            entries: 0,
            joined: ""
        }
   } 

class MainApp extends Component {
    constructor(props) {
        super(props);
        this.state = initialState
    }

    loadUser = (data) => {
        this.setState({user: {
            id: data.id,
            name: data.name,
            email: data.email,
            entries: data.entries,
            joined: data.joined
        }})
    }

    onInputChange = (e) => {
        this.setState({ input: e.target.value })
    }

    calculateFaceLocation = (data) => {
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
        fetch("https://rocky-gorge-19803.herokuapp.com/apicall", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                input: this.state.input
            })
        })
        .then(res => res.json())
        .then((response) => {
            if(response) {
                fetch("https://rocky-gorge-19803.herokuapp.com/image", {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        id: this.state.user.id
                    })
                }).then(response => {
                    if(response.status === 200) {
                        response.json()
                        .then(res => {
                            this.setState(Object.assign(this.state.user, { entries: res.entries}))
                        })
                        .catch(console.log)
                    }
                })
                this.displayFaceBox(this.calculateFaceLocation(response))
                
            }
           
            // do something with response
        })
        .catch((err) =>  console.log(err))
    }
    onRouteChange = (route) => {
        if( route === "signout" ) {
            this.setState({ isSignedIn: false })
            this.setState(initialState)
        }
        else if (route === "home"){
            this.setState({ isSignedIn: true })
        }
        this.setState({ route })
    }



    render() {

        return (
            <div className="App">
                <Particles className="particles"
                    params={particleOptions}
                />

                <Navigation  onRouteChange={this.onRouteChange} isSignedIn={this.state.isSignedIn}/>
                { this.state.route === "home" ?
                    <div>
                        <Logo />
                        <Rank name={this.state.user.name} entries={this.state.user.entries}/>
                        <ImageLinkForm 
                        onSubmit={this.onSubmit}
                        onInputChange={this.onInputChange} />
                        <FaceRecognition box={this.state.box} imageUrl = {this.state.imageUrl} />
                    </div>
                    :(
                        this.state.route === "signin"
                        ?
                        <SignIn onRouteChange={this.onRouteChange} 
                        loadUser={this.loadUser}/>
                        :
                        <Register onRouteChange={this.onRouteChange} 
                        loadUser={this.loadUser}/>
                    )
                    
        }
            </div>
        )
    }
}

export default MainApp
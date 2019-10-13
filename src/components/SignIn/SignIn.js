import React, { Component } from "react"


class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: ""
        }
    }


    onClickRegister = () => {
        this.props.onRouteChange("register")
    }
    handleSubmit = (e) => {
        e.preventDefault()
        let formElements = e.target.elements

        let data = {
            email: formElements.email.value,
            password: formElements.password.value
        }
        
        console.log(formElements.email.value)
        if(formElements.email.value === "" && formElements.password.value === "") {
            return 
        }

        else {
            fetch("https://rocky-gorge-19803.herokuapp.com/signin", {
                method: "POST",
                headers :{
                    "Content-Type" : "application/json"
                },
                body:JSON.stringify(data)
            }).then( response => {
                if(response.status === 200) {
                    response.json()
                    .then(res => {
                        this.props.loadUser(res)
                        this.props.onRouteChange("home")
                    })
                }
                if(response.status === 400) {
                    response.json()
                    .then(res => {
                        this.setState({ message: res })
                    })
                }
            })
        }   
    }
    

    render() {

        return (
        <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
                <main className="pa4 black-80">
                {this.state.message &&
                        <p className="w-100 ba br2 pa1 ma2 red bg-washed-green" role="alert">{this.state.message}</p>
                    }
                    <form className="measure " onSubmit={this.handleSubmit}>
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f1 fw6 ph0 mh0">Sign In</legend>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email"  id="email-address"/>
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password"/>
                            </div>
                        </fieldset>
                        <div className="">
                            <input  className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Sign in"/>
                        </div>
                        <div className="lh-copy mt3">
                            <p  onClick={this.onClickRegister}href="#0" className="f6 link dim black db pointer">Register</p>
                        </div>
                    </form>
                </main>
            </article>
            )
    }
}

export default SignIn
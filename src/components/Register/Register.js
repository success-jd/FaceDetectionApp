import React, { Component } from "react"


class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: ""
        }
    }

    handleSubmit = (e) => {
        e.preventDefault()
        let formElements = e.target.elements
        let isValid = true
        
        if(formElements.name.value === "" && formElements.email.value === "" && formElements.password.value === ""){
            isValid = false
        }
        
        if(isValid) {
            let data = {
                name: formElements.name.value,
                email: formElements.email.value,
                password: formElements.password.value 
            }

            fetch("https://rocky-gorge-19803.herokuapp.com/register", {
                method: "post",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            }).then(response => {
                if(response.status === 200) {
                    response.json()
                    .then(res => {
                        this.props.loadUser(res.user)
                    })

                    this.props.onRouteChange("home")

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
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0" value="fieldset">
                            <legend className="f1 fw6 ph0 mh0">Register</legend>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                                <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" name="name"  id="name"/>
                            </div>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email"  id="email"/>
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password"/>
                            </div>
                        </fieldset>
                        <div className="">
                            <button  className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"  value="submit">Register</button>
                        </div>
                    </form>
                </main>
            </article>
            )
    }
}

export default Register
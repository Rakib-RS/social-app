import React, { Component } from "react";

class SignUp extends Component {
  constructor(){
      super();
      this.state ={
          name:'',
          email: '',
          password: '',
          password2: '',
          errors:{}
      };
      this.onChange = this.onChange.bind(this);
      this.onSubmit = this.onSubmit.bind(this);
  }
onChange(e){
    this.setState({[e.target.name]:[e.target.value]})
}
onSubmit(e){
    e.preventDefault();
    const newUser ={
        name: this.state.name,
        email: this.state.email,
        password: this.state.password,
        password2: this.state.password2
    }
    console.log(newUser);
    
}

  
  render() {
      const {name,email,password,password2,errors} = this.state;
    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="text-center">Sign In</h1>

              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Enter your Name"
                    name="name"
                   
                    value={name}
                    onChange={this.onChange}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="email"
                    className="form-control form-control-lg"
                    placeholder="Enter Email Address"
                    name="email"
                    
                    value={email}
                    onChange={this.onChange}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className="form-control form-control-lg"
                    placeholder="enter password"
                    name="password"
                
                    value={password}
                    onChange={this.onChange}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className="form-control form-control-lg"
                    placeholder="enter password"
                    name="password2"
                    onChange={this.onChange}
                    value={password2}
                  />
                </div>
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default SignUp;

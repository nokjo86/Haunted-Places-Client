import React from "react";
import { PostsContext } from "../context/PostsContext";

class Login extends React.Component {
  static contextType = PostsContext;
  state = { email: "", password: "", errMessage: "" };

  onInputChange = (event) => {
    const key = event.target.id;
    this.setState({
      [key]: event.target.value,
    });
  };

  onFormSubmit = async (event) => {
    event.preventDefault();
    const { email, password } = this.state;
    const body = {
      auth: { email, password },
    };
    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          
        },
        body: JSON.stringify(body),
      });
      if (response.status >= 400) {
        throw new Error("incorrect credentials");
      } else {
        const { jwt } = await response.json();
        localStorage.setItem("token", jwt);
        this.props.history.push("/posts/create");
      }
    } catch (err) {
      this.setState({
        errMessage: err.message,
      });
    }
  };

  render() {
    const { email, password, errMessage } = this.state;
    return (
      <div className="container">
        <h1 className="mt-5">Login</h1>
        {errMessage && <span>{errMessage}</span>}
        <form onSubmit={this.onFormSubmit}>
           <div className="form-group  mt-5">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={this.onInputChange}
            className="form-control" 
            id="email" 
            aria-describedby="emailHelp" 
            
          /><small id="emailHelp" className="form-text text-muted">Your email probably will not be shared with anyone else....</small>
          </div>

          <div className="form-group  mt-3">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={this.onInputChange}
            className="form-control" 
            id="password" 
            
          />
          </div>
          <button type="submit" className="btn btn-secondary">Join us</button>
        </form>
      </div>
    );
  }
}

export default Login;
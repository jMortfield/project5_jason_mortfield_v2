import React, {Component} from 'react';
import "./login.css";

class Login extends Component {
    render(){
        return  <div className="loginInfo">
          {this.props.user &&
          <div className="userInfo">
            <div className="imgContainer">
              <img src={this.props.userImg} alt="Google profile image" className="profileImage" />
            </div>
            <h4 className="displayName">{this.props.name}</h4>
          </div>}{this.props.user ? <button onClick={this.props.logout} className="loginButton button">
              Log Out
            </button> : <button onClick={this.props.login} className="loginButton button">
              Log In
            </button>}
        </div>;
    }
}

export default Login;
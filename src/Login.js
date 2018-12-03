import React, {Component} from 'react';
import "./login.css";

class Login extends Component {
    render(){
        return <div>
            {this.props.user ? <button onClick={this.props.logout}>
                Log Out
              </button> : <button onClick={this.props.login}>Log In</button>}
          </div>;
    }
}

export default Login;
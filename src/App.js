import React, { Component } from 'react';
import './App.css';
import firebase from './firebase';
import standardClothes from './listItems';
import toiletries from './listItems';
import Header from './Header';
import List from './List';

const dbRef = firebase.database().ref();
const users = firebase.database().ref("users");

// const handleClick = () => {
//   users.push({basicClothes})
// }

// const handleSubmit = () => {
//   users.push({Jason: basicClothes})
// }




class App extends Component {
  // constructor() {
  //   super();
  //   this.state = {
  //     standardClothes,
  //     toiletries
  //   }
  // }

  render() {
    return (
      <div className="App">
        <Header />
        <List clothes={standardClothes} toiletries={toiletries}/>
      </div>
    );
  }
}

export default App;

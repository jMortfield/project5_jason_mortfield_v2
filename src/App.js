import React, { Component } from 'react';
import './App.css';
// import firebase from './firebase';
import Header from './Header';
import TripSelector from './TripSelector';
import List from './List';
import {
  standardClothes,
  toiletries,
  travelItems,
  carryOnItems,
  miscItems
} from "./listItems";

// const dbRef = firebase.database().ref();
// const users = firebase.database().ref("users");

// const handleClick = () => {
//   users.push({basicClothes})
// }

// const handleSubmit = () => {
//   users.push({Jason: basicClothes})
// }




class App extends Component {
  constructor() {
    super();
    this.state = {
      standardClothes,
      toiletries,
      travelItems,
      carryOnItems,
      miscItems
    }
  }

  render() {
    return (
      <div className="App">
        <Header />
        <TripSelector />
        <List clothes={this.state.standardClothes} toiletries={this.state.toiletries} travelItems={this.state.travelItems} carryOnItems={this.state.carryOnItems} miscItems={this.state.miscItems}/>
      </div>
    );
  }
}

export default App;

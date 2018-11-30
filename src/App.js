import React, { Component } from 'react';
import './App.css';
// import firebase from './firebase';
import Header from './Header';
import TripSelector from './TripSelector';
import List from './List';
import {
  clothes,
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
      clothes,
      filteredClothes: [],
      showClothes: false,
      toiletries,
      travelItems,
      carryOnItems,
      miscItems,
      duration: "extraShort",
      temperature: "isCold"
    };
  }

  
// Filter clothing list based on selected temperature
// *** STRETCH GOAL - Add more conditions (isWarm, isCool) ***
  filteredClothesList = () => {
    return clothes.filter(item => {
      // Uses val of temp selector as index of clothing item
      return item[this.state.temperature];
    });
  };

  // Changes state of either temp or duration when user changes from dropdown menu
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  
  handleSubmit = e => {
    e.preventDefault();
    // this.filteredClothesList();
    this.setState({
      filteredClothes: this.filteredClothesList(),
      showClothes: true
    })
    console.log(this.filteredClothesList());
  };

  render() {
    return (
      <div className="App">
        <Header />
        <TripSelector handleChange={this.handleChange} handleSubmit={this.handleSubmit}/>
        {this.state.showClothes && (
          <List
            clothes={this.state.filteredClothes}
            toiletries={this.state.toiletries}
            travelItems={this.state.travelItems}
            carryOnItems={this.state.carryOnItems}
            miscItems={this.state.miscItems}
          />
        )}
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import './App.css';
import firebase from './firebase';
import SaveList from './SaveList';
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
      temperature: "isCold",
      userName: "",
      nameObject: {},
      listName: "",
      listObject: {},
      fireBase: {}
    };
  }

  
// Filter clothing list based on selected temperature
// *** STRETCH GOAL - Add more conditions (isWarm, isCool) ***
  filteredClothesList = () => {
    return this.state.clothes.filter(item => {
      // Uses val of temp selector as index of clothing item
      return item[this.state.temperature];
    });
  };

  resetQuantity = (element) => {
      element.quantity = 0
    }    
  

  quantityChange = (element) => {
    switch(this.state.duration) {
      case 'extraShort':
        element.quantity += 3;
        return element;
      case 'short':
        element.quantity += 6;
        return element;
      case 'long':
        element.quantity += 8;
        return element;
      case 'extraLong':
        element.quantity += 10;
        return element;
      default :
        console.log("DIDN'T WORK!!!!!")
        return element;
    } 
  }

  // Changes state of either temp or duration when user changes from dropdown menu
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  // Sets new clothes array (to be rendered) to filtered list, shows list
  handleSubmit = e => {

    // console.log(this.filteredClothesList());
    e.preventDefault();
    // this.resetQuantity();
    this.setState({
      filteredClothes: this.filteredClothesList().map(this.resetQuantity)
    })
    this.setState({
      filteredClothes: this.filteredClothesList().map(this.quantityChange),
      showClothes: true
    });
    // console.log(this.filteredClothesList());
  };

  pushToFirebase = e => {
    e.preventDefault();
    const users = firebase.database().ref(this.state.userName);
    // console.log(users)

    // Create new object that saves packing list with key of list name
    const listObject = Object.assign(this.state.listObject);
    listObject[this.state.listName]=this.state.filteredClothes;
    console.log(listObject);

    // Create a new object that saves list object as value with key of username
    const nameObject = Object.assign(this.state.nameObject);
    nameObject[this.state.userName]=listObject;
    console.log(nameObject);
    // this.setState({
    //   fireBase: newNewObj
    // }, function(){
    //   users.push(this.state.fireBase);
    // })
  }

  render() {
    return (
      <div className="App">
        <SaveList handleChange={this.handleChange} pushToFirebase={this.pushToFirebase}/>
        <Header />
        {/* Pass change and submit function to TripSelector component as props */}
        <TripSelector handleChange={this.handleChange} handleSubmit={this.handleSubmit}/>
        {/* Only show list is showClothes is set to true */}
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

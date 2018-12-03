import React, { Component } from 'react';
import './App.css';
import './setup.css';
// import firebase from './firebase';
import firebase, { auth, provider } from "./firebase.js";
import Login from './Login';
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
import RetrieveList from './RetrieveList';

const dbRef = firebase.database().ref();
// const user = firebase.database().ref('users');


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
      email: "",
      listName: "",
      listObject: {},
      firebaseObject: {},
      user: null,
      uid: null,
      destination: "",
      destinationObject: {},
      packingObject: {},
      loggedOut: true,
      showList: false
    };
    // handleChangeAuth = (e) => {
    //   /* ... */
    // }
  }

  // Update userList state if user is logged in
  updateUserList = () => {
    if (this.state.uid) {
      dbRef.on("value", snapshot => {
        this.setState({
          userList: snapshot.val().users[this.state.uid]
        });
        console.log(this.state.userList);
      });
    }
  }

  componentDidMount() {
    auth.onAuthStateChanged(user => {
      if (user) {
        this.setState({
          user,
          uid: user.uid,
          email: user.email,
          loggedOut: false
        });
      }
    });
    this.updateUserList();
  }

  // addUidToFirebase = () => {
  //     const users = firebase.database().ref('users');
  //     users.push({id:this.state.uid});
  // }

  login = () => {
    auth.signInWithPopup(provider).then(result => {
      const user = result.user;
      this.setState({
        user,
        uid: user.uid,
        email: user.email,
        loggedOut: false
      });
    }); 
    // this.addUidToFirebase();
  };

  logout = () => {
    auth.signOut().then(() => {
      this.setState({
        user: null,
        uid: null,
        email: null,
        loggedOut: true
      });
    });
  };

  // Filter clothing list based on selected temperature
  // *** STRETCH GOAL - Add more conditions (isWarm, isCool) ***
  filteredClothesList = () => {
    return this.state.clothes.filter(item => {
      // Uses val of temp selector as index of clothing item
      return item[this.state.temperature];
    });
  };

  // Reset quantity of clothes when user submits form
  resetQuantity = element => {
    element.quantity = 0;
  };

  // Conditionals for quantity change based on duration of trip
  quantityChange = element => {
    switch (this.state.duration) {
      case "extraShort":
        element.quantity += 3;
        return element;
      case "short":
        element.quantity += 6;
        return element;
      case "long":
        element.quantity += 8;
        return element;
      case "extraLong":
        element.quantity += 10;
        return element;
      default:
        console.log("DIDN'T WORK!!!!!");
        return element;
    }
  };

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
    });
    this.setState({
      filteredClothes: this.filteredClothesList().map(this.quantityChange),
      showClothes: true
    });
    // console.log(this.filteredClothesList());
  };

  // Push info to firebase when SaveList is clicked
  pushToFirebase = e => {
    e.preventDefault();

    // Create an object with all arrays for packing list
    const packingObject = Object.assign(this.state.packingObject);
    packingObject["clothes"] = this.state.filteredClothes;
    packingObject["toiletries"] = this.state.toiletries;
    packingObject["travelItems"] = this.state.travelItems;
    packingObject["carryOnItems"] = this.state.carryOnItems;
    packingObject["miscItems"] = this.state.miscItems;

    // Create new object that saves packing list with key of list name
    const listObject = Object.assign(this.state.listObject);
    listObject[this.state.listName] = packingObject;

    // Create a new object that saves listObject with key of Destination
    // const destinationObject = Object.assign(this.state.destinationObject);
    // destinationObject[this.state.destination] = listObject;

    // Create a new object that saves listObject under users unique id to be pushed to firebase
    const firebaseObject = Object.assign(this.state.firebaseObject);
    firebaseObject[this.state.uid] = listObject;

    const users = firebase.database().ref("users");

    // Updated firebaseObject and then updates firebase with new info
    this.setState(
      {
        firebaseObject
      },
      function() {
        users.update(this.state.firebaseObject);
        this.resetFirebaseObject();
      }
    );
  };

  // Reset firebaseObject state
  resetFirebaseObject = () => {
    this.setState({
      listObject: {},
      firebaseObject: {},
      destination: "",
      listName: ""
    });
  };

  // Show saved lists when user click Retrieve List button
  showList = () => {
    this.setState({
      showList: true
    })
  }

  // Render saved list on page when clicked
  showSavedList = (e) => {
    dbRef.on("value", snapshot => {
      const savedList = snapshot.val().users[this.state.uid][e.target.value]
      this.setState({
        showClothes: true,
        filteredClothes: savedList.clothes
      });
    });
  }

  render() {
    return (
      <div className="App">
        <div className="header">
          <div className="wrapper header__wrapper">
            <Header />
            {this.state.uid && <RetrieveList showList={this.state.showList} userList={this.state.userList}
            updateUserList={this.updateUserList} changeShowList={this.showList} uid={this.state.uid} showSavedList={this.showSavedList}/>}
            <Login
              user={this.state.user}
              login={this.login}
              logout={this.logout}
            />
          </div>
        </div>
        {/* Pass change and submit function to TripSelector component as props */}
        <div className="main">
          <div className="wrapper main__wrapper">
            <TripSelector
              handleChange={this.handleChange}
              handleSubmit={this.handleSubmit}
            />
            {/* Only show list if showClothes is set to true */}
            {this.state.showClothes && (
              <div>
                {this.state.uid && (
                  <SaveList
                    handleChange={this.handleChange}
                    pushToFirebase={this.pushToFirebase}
                    destination={this.state.destination}
                    listName={this.state.listName}
                  />
                )}

                {this.state.loggedOut && (
                <p>Please login to save list</p>)}
                <List
                  clothes={this.state.filteredClothes}
                  toiletries={this.state.toiletries}
                  travelItems={this.state.travelItems}
                  carryOnItems={this.state.carryOnItems}
                  miscItems={this.state.miscItems}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default App;

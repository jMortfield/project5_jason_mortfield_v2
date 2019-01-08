import React, { Component} from 'react';
import './App.css';
import './setup.css';
import firebase, { auth, provider } from "./firebase.js";
import Logo from './Logo';
import RetrieveList from './RetrieveList';
import Login from './Login';
import HeaderTitle from './HeaderTitle';
import TripSelector from './TripSelector';
import SaveList from './SaveList';
import List from './List';
import {
  clothes,
  toiletries,
  travelItems,
  carryOnItems,
  miscItems,
  outdoorEquipment
} from "./listItems";


const dbRef = firebase.database().ref();


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
      outdoorEquipment,
      duration: "extraShort",
      temperature: "isCold",
      name: "",
      listName: "",
      listObject: {},
      firebaseObject: {},
      user: null,
      uid: null,
      destination: "",
      destinationObject: {},
      packingObject: {},
      loggedOut: true,
      showList: false,
      userImg: ""
    };
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
          name: user.displayName,
          userImg: user.photoURL,
          loggedOut: false
        });
      }
    });
    this.updateUserList();
    // const localStorageRef = localStorage.getItem('filteredClothes');
    // if (localStorageRef) {
    //   this.setState({ 
    //     showList: true,
    //     filteredClothes: JSON.parse(localStorageRef)
    //   })
    // }
  }

  componentDidUpdate() {
    localStorage.setItem('filteredClothes', JSON.stringify(this.state.filteredClothes))
  }


  // componentDidMount() {
  //   const { params } = this.props.match;
  //   // First reinstate our localStorage
  //   const localStorageRef = localStorage.getItem(params.storeId);
  //   if (localStorageRef) {
  //     this.setState({ order: JSON.parse(localStorageRef) })
  //   }
  //   this.ref = base.syncState(`${params.storeId}/fishes`, {
  //     context: this,
  //     state: 'fishes'
  //   });
  // }

  // componentDidUpdate() {
  //   localStorage.setItem(this.props.match.params.storeId, JSON.stringify(this.state.order))
  // }




  login = () => {
    auth.signInWithPopup(provider).then(result => {
      const user = result.user;
      this.setState({
        user,
        uid: user.uid,
        name: user.displayName,
        userImg: user.photoURL,
        loggedOut: false
      });
    }); 
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
    e.preventDefault();
    this.setState({
      filteredClothes: this.filteredClothesList().map(this.resetQuantity)
    });
    this.setState({
      filteredClothes: this.filteredClothesList().map(this.quantityChange),
      showClothes: true
    });
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

    // Create firebase object that saves packing list with key of list name to be pushed to firebase

    const firebaseObject = Object.assign(this.state.firebaseObject);
    firebaseObject[this.state.listName] = packingObject;


    const users = firebase.database().ref("users/" + this.state.uid);

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

    alert("List saved!");
  };

  // Reset firebaseObject state
  resetFirebaseObject = () => {
    this.setState({
      listObject: {},
      firebaseObject: {},
      destination: ""
    });
  };

  // Show saved lists when user click Retrieve List button
  showList = () => {
    this.setState({
      showList: !this.state.showList
    })
  }

  // Render saved list on page when clicked
  showSavedList = (e) => {
    dbRef.on("value", snapshot => {
      const savedList = snapshot.val().users[this.state.uid][e.currentTarget.id]
      // If savedList doesn't exist (like when changing list name from a retrieved list), return nothing
      if (!savedList) return null;
      this.setState({
        showClothes: true,
        filteredClothes: savedList.clothes,
        listName: e.currentTarget.id
      });
    });
  }

  render() {
    return <div className="App">
        <header className="header">
          <div className="header-overlay">
            <div className="wrapper header__wrapper">
              {/* Header logo */}
              <Logo />
              {/* Retrieve list section */}
              {this.state.uid && <RetrieveList showList={this.state.showList} userList={this.state.userList} updateUserList={this.updateUserList} changeShowList={this.showList} uid={this.state.uid} showSavedList={this.showSavedList} />}
              {/* Login button */}
              <Login user={this.state.user} login={this.login} logout={this.logout} userImg={this.state.userImg} name={this.state.name} />
              {/* Header hero title */}
            </div>
            <HeaderTitle />
            <TripSelector handleChange={this.handleChange} handleSubmit={this.handleSubmit} />
          </div>
        </header>
        {/* Pass change and submit function to TripSelector component as props */}
        {this.state.showClothes && <main className="main">
            <div className="wrapper main__wrapper">
              {/* Only show list if showClothes is set to true */}
              <section className="listArea">
                {/* Save List Section */}
                <div>
                  {/* If user is logged out - tells user to sign in to save list. If user is signed in, show form to save list */}
                  {this.state.user ? <SaveList handleChange={this.handleChange} pushToFirebase={this.pushToFirebase} destination={this.state.destination} listName={this.state.listName} /> : <p className="loginToSave">Please login to save list</p>}
                 
                </div>
                {/* Packing list section */}
                <div className="packingListSection">
                  <List listName={this.state.listName} clothes={this.state.filteredClothes} toiletries={this.state.toiletries} travelItems={this.state.travelItems} carryOnItems={this.state.carryOnItems}outdoorEquipment={this.state.outdoorEquipment} miscItems={this.state.miscItems} />
                </div>
              </section>
            </div>
          </main>}
      </div>;
  }
}

export default App;

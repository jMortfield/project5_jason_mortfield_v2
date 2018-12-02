import React, {Component} from 'react';

class SaveList extends Component {
    render() {
        return (
            <div>
                <form onSubmit={this.props.pushToFirebase} action="">
                    <label htmlFor="destination">Enter Destination</label>
                    <input onChange={this.props.handleChange}type="text" name="destination" id="destination"/>
                    <label htmlFor="listName">Enter name of list</label>
                    <input onChange={this.props.handleChange} type="text" name="listName" id="listName"/>
                    <input type="submit"/>
                </form>
                </div>
        )
        
    }
}


export default SaveList;


{/* <form onSubmit={this.props.pushToFirebase} action="">
     <label htmlFor="userName">Enter name</label>
     <input onChange={this.props.handleChange}type="text" name="userName" id="userName"/>
     <label htmlFor="listName">Enter name of list</label>
     <input onChange={this.props.handleChange} type="text" name="listName" id="listName"/>
     <input type="submit"/>
 </form>
  <div> */}
import React, {Component} from 'react';

class SaveList extends Component {
    render() {
        return (
            <form onSubmit={this.props.pushToFirebase} action="">
                <label htmlFor="userName">Enter name</label>
                <input onChange={this.props.handleChange}type="text" name="userName" id="userName"/>
                <label htmlFor="listName">Enter name of list</label>
                <input onChange={this.props.handleChange} type="text" name="listName" id="listName"/>
                <input type="submit"/>
            </form>
        )
    }
}

export default SaveList;


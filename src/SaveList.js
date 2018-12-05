import React, {Component} from 'react';
import './saveList.css';

class SaveList extends Component {
    render() {
        return <div>
            <form onSubmit={this.props.pushToFirebase} action="" className="saveListForm">

              <label htmlFor="listName" className="saveListLabel">Enter list name</label>
              <input onChange={this.props.handleChange} type="text" name="listName" id="listName" value={this.props.listName}/>
              <input type="submit" value="Save List"/>
            </form>
          </div>;
        
    }
}


export default SaveList;


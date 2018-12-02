import React, {Component, Fragment} from 'react';

class RetrieveList extends Component {
  componentDidMount() {
    this.props.updateUserList();
  }


  render() {
    return <Fragment>
        <button onClick={this.props.changeShowList()}>Retrieve List</button>
        {this.props.showList && <div className="savedLists">
            <h2>Saved Lists</h2>
            <div>
              <h3>Destination</h3>
              <h3>List Name</h3>
            </div>
            <div>
            {/* {this.props.uid && (
              <ul>
                {Object.keys(this.props.userList).map(function(key) {
                  return <li>{key}</li>;
                })}
              </ul>
            )} */}
            </div>
          </div>}
      </Fragment>;
  }
}

export default RetrieveList;
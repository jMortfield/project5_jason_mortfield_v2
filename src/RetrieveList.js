import React, {Component, Fragment} from 'react';

class RetrieveList extends Component {
  componentDidMount() {
    this.props.updateUserList();
  }

  render() {
      
    return <Fragment>
        <button onClick={this.props.changeShowList}>Retrieve List</button>
        {this.props.showList && <div className="savedLists">
            <h2>Saved Lists</h2>
            <div>
              <h3>Destination</h3>
              <h3>List Name</h3>
            </div>
            <div>
              {console.log(this.props.userList)}
              {this.props.uid && <Fragment>
                  <ul>
                    {Object.keys(this.props.userList).map(key => {
                      console.log(key);
                      return <li>
                          <button onClick={this.props.showSavedList} id={key}>{key}</button>
                        </li>;
                    })}
                  </ul>
                  {/* <ul>
                    {Object.keys(this.props.userList).map(key => {
                      console.log(key);
                      return <li>
                          <button>{this.props.userList[key]}</button>
                        </li>;
                    })}
                  </ul> */}
                </Fragment>}
            </div>
          </div>}
      </Fragment>;
  }
}

export default RetrieveList;
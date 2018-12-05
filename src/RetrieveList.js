import React, {Component, Fragment} from 'react';
import './retrieveList.css';


class RetrieveList extends Component {
  componentDidMount() {
    this.props.updateUserList();
  }


  render() {
      
    return <Fragment>
        {!this.props.showList && <button onClick={this.props.changeShowList} className="retrieveButton button">
            Retrieve List
          </button>}
        {this.props.showList && <div className="savedListsMenu">
            <div className="savedListHeader">
              <button onClick={this.props.changeShowList} className="exitListButton button">
                X
              </button>
                <h2 className="savedListsTitle">Saved Lists</h2>
              </div>
              <div className="savedLists">
              {console.log(this.props.userList)}
              {this.props.uid && <Fragment>
                  <ul className="savedListList">
                    {Object.keys(this.props.userList).map(key => {
                      console.log(key);
                      return <li className="savedListItem">
                          <button onClick={this.props.showSavedList} id={key} className="savedListButton button">
                            {key}
                          </button>
                        </li>;
                    })}
                  </ul>
                </Fragment>}
            </div>
          </div>}
      </Fragment>;
  }
}

export default RetrieveList;
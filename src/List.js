import React, {Component, Fragment} from 'react';

class List extends Component {
  render() {
    return <Fragment>
        <h2>Standard Clothes</h2>
        <ul>
          {this.props.clothes.map(res => {
            return <li>
                <ul>
                  <li>{res.name}</li>
                  <li>{res.quantity}</li>
                </ul>
              </li>;
          })}
        </ul>
        <h2>Toiletries</h2>
        <ul>
          {this.props.toiletries.map(res => {
            return <li>
                <ul>
                  <li>{res.name}</li>
                  <li>{res.quantity}</li>
                </ul>
              </li>;
          })}
        </ul>
      </Fragment>;
  }
}

export default List;
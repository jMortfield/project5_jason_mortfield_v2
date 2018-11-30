import React, {Component, Fragment} from 'react';


class List extends Component {
    render() {
    if (this.props.clothes) {
    return (
    <Fragment>
        {/* Map throguh each list and render as li's */}
        <h2>Standard Clothes</h2>
        <ul>
          {this.props.clothes.map(res => {
            //   console.log(res);
            return (<li>
                <ul>
                  <li>{res.name}</li>
                  <li>{res.quantity}</li>
                </ul>
            </li>);
            
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
        <h2>Travel Essentials</h2>
        <ul>
          {this.props.travelItems.map(res => {
            return <li>{res}</li>;
          })}
        </ul>
        <h2>Carry-on Items</h2>
        <ul>
          {this.props.carryOnItems.map(res => {
            return <li>{res}</li>;
          })}
        </ul>
        <h2>Misc. Items</h2>
        <ul>
          {this.props.miscItems.map(res => {
            return <li>{res}</li>;
          })}
        </ul>
    </Fragment>);
        
    }
  }
}

export default List;
import React, {Component} from 'react';
import './list.css';


class List extends Component {
    render() {
    if (this.props.clothes) {
    return <div className="list">
          <h2>{this.props.listName}</h2>
        <div className="packingList">
          {/* Map throguh each list and render as li's */}
          <div className="listSection">
            <h2>Standard Clothes</h2>
            <ul>
              {this.props.clothes.map(res => {
                //   console.log(res);
                return <li key={res.name}>
                    <ul className="listItem">
                      <input type="checkbox"/>
                      <li>{res.name}</li>
                      <li>{res.quantity}</li>
                    </ul>
                  </li>;
              })}
            </ul>
          </div>
          <div className="listSection">
            <h2>Toiletries</h2>
            <ul>
              {this.props.toiletries.map(res => {
                return <li key={res.name}>
                    <ul className="listItem">
                      <input type="checkbox" />
                      <li>{res.name}</li>
                      <li>{res.quantity}</li>
                    </ul>
                  </li>;
              })}
            </ul>
          </div>
          <div className="listSection">
            <h2>Travel Essentials</h2>
            <ul>
              {this.props.travelItems.map(res => {
                return <li key={res}>
                    <ul className="listItem">
                      <input type="checkbox" />
                      <li>{res.name}</li>
                      <li>{res.quantity}</li>
                    </ul>
                  </li>;
              })}
            </ul>
          </div>
          <div className="listSection">
            <h2>Carry-on Items</h2>
            <ul>
              {this.props.carryOnItems.map(res => {
                return <li key={res}>
                    <ul className="listItem">
                      <input type="checkbox" />
                      <li>{res.name}</li>
                      <li>{res.quantity}</li>
                    </ul>
                  </li>;
              })}
            </ul>
          </div>
          <div className="listSection">
            <h2>Misc. Items</h2>
            <ul>
              {this.props.miscItems.map(res => {
                return <li key={res}>
                    <ul className="listItem">
                      <input type="checkbox" />
                      <li>{res.name}</li>
                      <li>{res.quantity}</li>
                    </ul>
                  </li>;
              })}
            </ul>
          </div>
          <div className="listSection">
            <h2>Outdoor Equipment</h2>
            <ul>
              {this.props.outdoorEquipment.map(res => {
                return <li key={res.name}>
                    <ul className="listItem">
                      <input type="checkbox" />
                      <li>{res.name}</li>
                      <li>{res.quantity}</li>
                    </ul>
                  </li>;
              })}
            </ul>
          </div>
        </div>
      </div>; 
    }
  }
}

export default List;
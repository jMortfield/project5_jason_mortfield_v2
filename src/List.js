import React, {Component, Fragment} from 'react';


class List extends Component {
    // newClothes = () => {
    //     const basicClothes = this.props.clothes.filter((item) => {
    //         console.log(item);
    //         return item.isCold === false && item.isHot === false;
    //     })
    //     return basicClothes.map(res => {
    //       return (<li>
    //           <ul>
    //             <li>{res.name}</li>
    //             <li>{res.quantity}</li>
    //           </ul>
    //         </li>
    //     )})
    // }

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
      </Fragment>;
  }
}

export default List;
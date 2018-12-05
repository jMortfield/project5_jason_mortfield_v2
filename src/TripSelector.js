import React, {Component} from 'react';
import './tripSelector.css'


class TripSelector extends Component {

    render () {
        return <div className="wrapper tripSelector">
            {/* Call handleSbbmit prop passed from App.js */}
            <h2 className="selectorHeader">
              Enter your trip information and create the perfect packing
              list
            </h2>
            <form onSubmit={this.props.handleSubmit} className="tripInfoForm" action="">
              <div className="selectorItem">
                <label htmlFor="duration" className="selectorLabel">
                  Duration
                </label>
                {/* Call handleChange prop passed from App.js */}
                <select onChange={this.props.handleChange} name="duration" id="duration">
                  <option value="extraShort">0-3 Days</option>
                  <option value="short">3-7 Days</option>
                  <option value="long">1-2 Weeks</option>
                  <option value="extraLong">2+ Weeks</option>
                </select>
              </div>
              <div className="selectorItem">
                <label htmlFor="temperature" className="selectorLabel">
                  Temperature
                </label>
                {/* Call handleChange prop passed from App.js */}
                <select onChange={this.props.handleChange} name="temperature" id="temperature">
                  <option value="isCold">Below 0 Degrees</option>
                  <option value="isCold">0-15 Degrees</option>
                  <option value="isHot">15-30 Degrees</option>
                  <option value="isHot">30+ Degrees</option>
                </select>
              </div>
              <div className="selectorItem">
                <label htmlFor="submit" className="visuallyhidden">
                  Submit
                </label>
                <input type="submit" id="submit" className="button"/>
              </div>
            </form>
          </div>;
    }
}

export default TripSelector;
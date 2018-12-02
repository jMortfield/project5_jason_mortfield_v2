import React, {Component, Fragment} from 'react';
import './tripSelector.css'


class TripSelector extends Component {

    render () {
        return <Fragment>
            {/* Call handleSbbmit prop passed from App.js */}
            <form onSubmit={this.props.handleSubmit} className="tripInfoForm" action="">
              <label htmlFor="duration">Duration</label>
              {/* Call handleChange prop passed from App.js */}
              <select onChange={this.props.handleChange} name="duration" id="duration">
                <option value="extraShort">0-3 Days</option>
                <option value="short">3-7 Days</option>
                <option value="long">1-2 Weeks</option>
                <option value="extraLong">2+ Weeks</option>
              </select>
              <label htmlFor="temperature">Temperature</label>
              {/* Call handleChange prop passed from App.js */}
              <select onChange={this.props.handleChange} name="temperature" id="temperature">
                <option value="isCold">Below 0 Degrees</option>
                <option value="isCold">0-15 Degrees</option>
                <option value="isHot">15-30 Degrees</option>
                <option value="isHot">30+ Degrees</option>
              </select>
              <label htmlFor="submit">Submit</label>
              <input type="submit" id="submit" />
            </form>
          </Fragment>;
    }
}

export default TripSelector;
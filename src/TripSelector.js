import React, {Component, Fragment} from 'react';

class TripSelector extends Component {
    render () {
        return (
        <Fragment>

            <form action="">
            <select name="duration" id="">
                <option value="">
                0-3 Days
                </option>
                <option value="">
                3-7 Days
                </option>
                <option value="">
                1-2 Weeks
                </option>
                <option value="">
                2+ Weeks
                </option>
            </select>
            <select name="weather" id="">
                <option value="">
                Below 0 Degrees
                </option>
                <option value="">
                0-15 Degrees
                </option>
                <option value="">
                15-30 Degrees
                </option>
                <option value="">
                30+ Degrees
                </option>
            </select>
            </form>
        </Fragment>
        )
    }
}

export default TripSelector;
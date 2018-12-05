import React, {Component, Fragment} from 'react';
import "./logo.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHiking } from "@fortawesome/free-solid-svg-icons";
library.add(faHiking);


class Logo extends Component {
  render() {
      return <div className="logo">
          <h2 className="headerLogo">
            Pack<span>
              <FontAwesomeIcon icon="hiking" />
            </span>t
          </h2>
        </div>;
  }
}

export default Logo;
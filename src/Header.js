import React, {Component, Fragment} from 'react';
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHiking } from "@fortawesome/free-solid-svg-icons";
library.add(faHiking);


class Header extends Component {
  render() {
      return <Fragment>
          <h1>
            Pack<span>
              <FontAwesomeIcon icon="hiking" />
            </span>t
          </h1>
        </Fragment>;
  }
}

export default Header;
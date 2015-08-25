import React from "react";
import AppActions from "../actions/AppActions";

class NavButton extends React.Component {

    render () {
        return (
            <li
                onClick={this._handleClick.bind(this)}>
                {this.props.children}
            </li>
        );

    }

    _handleClick(event) {
        let sort = this.props.sort;
        AppActions.changeSearchOptions("sort", sort)
    }

}

export default NavButton;

import React from "react";
import AppActions from "../actions/AppActions";

class NavDropDown extends React.Component {

    constructor (props) {
        super(props);

        let selected;
        props.payload.options.some((option) => {
            if(option.selected)
                selected = option.value;
            return option.selected;
        });

        this.state ={
            "selected": "week"
        }
    }

    render () {
        let dropdownOptions = this.props.payload.options.map((option) => {
            return (
                <li>
                <a href="#"
                   onClick={this._handleClick.bind(this)}
                   data-value={option.value} >
                {option.label}
                </a>
                </li>
            );
        });

        return (
            <div className="btn-group">
              <button type="button" className={"btn btn-default dropdown-toggle"}
                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                {this.state.seleceted}
                <span className="caret"></span>
              </button>
              <ul className="dropdown-menu">
                {dropdownOptions}
              </ul>
            </div>
        );

    }

    _handleClick(event) {
        let target = event.target;
        AppActions.changeSearchOptions(this.props.payload.name, target.data-value);
    }

}

export default NavDropDown;

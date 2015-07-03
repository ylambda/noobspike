import React from "react";
import AppActions from "../actions/AppActions";

class SearchOption extends React.Component {

    render () {

        let options = this.props.payload.options.map((option) => {
            return (
                <option value={option.value}> {option.label} </option>
            );
        });

        let searchOption = (
            <div>
                <label>{this.props.payload.label}</label>
                <select onChange={this._handleChange.bind(this)} name={this.props.payload.name}>
                    {options}
                </select>
            </div>
        );

        return searchOption;
    }

    _handleChange(event) {
        let select = event.target;
        let name = this.props.payload.name;
        let value = select.options[select.selectedIndex].value;
        AppActions.changeSearchOption(name, value)
    }

}

export default SearchOption

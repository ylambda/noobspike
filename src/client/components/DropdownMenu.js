import React from "react";
import {Link} from "react-router";

class DropdownMenu extends React.Component {

  render () {
    let item_keys = Object.keys(this.props.items);
    let menu_items = item_keys.map((key) => {
      let item = this.props.items[key];
      return (
        <li key={key}>
          <Link to={item.to} params={item.params} query={item.query}>{ item.label }</Link>
        </li>
      );
    });

    let menu = (
      <div className="btn-group">
        <button type="button" className={"btn btn-default dropdown-toggle"}
          data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              { this.props.label }
          <span className="caret"></span>
          <span className="sr-only">Toggle Dropdown</span>
        </button>
        <ul className="dropdown-menu">
           { menu_items }
        </ul>
      </div>
    );

    return menu;
  }
}

export default DropdownMenu;

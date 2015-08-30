import React from "react";
import assign from "object-assign";
import {Link, State} from "react-router";
import AppActions from "../actions/AppActions";

let options = {
    'nav': [
        {query: {sort: "top"}, label: "Top"},
        {query: {sort: "new"}, label: "New"},
        {query: {sort: "hot"}, label: "Hot"},
    ],
}

class Header extends React.Component {

    onDropdownItemClick (value) {
        AppActions.updateFilter('t', value);
    }

    render () {

        let header = (
            <div className="header">
              <div className="container">
                <div className="col-xs-2">
                  <h4><a href="/">Noobspike</a></h4>
                </div>
                <div className="col-xs-10">
                  <div className="row">
                    <div className="col-xs-8">
                      <Header.NavMenu items={options.nav} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
        );

        return header;
    }
}


Header.contextTypes = {
    router: React.PropTypes.func
}
export default Header;

class HeaderNavMenu extends React.Component {

  render () {

    let items = this.props.items.map((item) => {
      let query = assign({}, item.query);
      return (
        <li key={item.label}>
          <Link className={"btn btn-default"}
            to="video-list" query={query}>
            { item.label }
          </Link>
        </li>
      );
    });

    return (
      <ul className="nav-menu">
        { items }
      </ul>
    );
  }
}
HeaderNavMenu.defaultProps = {items: []}
Header.NavMenu = HeaderNavMenu;

class HeaderSearch extends React.Component {

  render () {
    return (
      <div className={"input-group pull-right"}>
        <input type="text" className="form-control" />
        <span className="input-group-btn">
          <button type="submit" className="btn btn-success">
            <span className={"glyphicon glyphicon-search"}></span>
          </button>
        </span>
      </div>
    );
  }

}
Header.Search = HeaderSearch;


import React from "react";
import assign from "object-assign";
import {Link, State} from "react-router";
import Search from "./Search";
import SearchOption from "./SearchOption";
import NavButton from "./NavButton";
import NavDropDown from "./NavDropDown";
import AppActions from "../actions/AppActions";

let options = {
    'nav-menu': [
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

        let router = this.context.router;
        let params = router.getCurrentParams();
        let qs = router.getCurrentQuery();


        let nav_menu = options['nav-menu'].map((item) => {

            let query = assign({}, qs, item.query);

            return (
            <li key={item.label}>
              <Link className={"btn btn-default"}
                to="video-list" query={query}>
                { item.label }
              </Link>
            </li>
            );
        });

        let header = (
            <div className="header">
              <div className="container">
                <div className="col-xs-2">
                  <h4><a href="/">Noobspike</a></h4>
                </div>
                <div className="col-xs-10">
                  <div className="row">
                    <div className="col-xs-8">
                      <ul className="nav-menu">
                        {nav_menu}
                      </ul>
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

export default Header


import React from "react";
import Search from "./Search";
import SearchOption from "./SearchOption";

let options = {
    sort: {
        label: 'Sort',
        name: "sort",
        options: [
            {value: "top", label: "Top"},
            {value: "new", label: "New", selected: true},
            {value: "relevance", label: "Relevance"},
            {value: "comments", label: "Comments"}
        ]
    },
    time: {
        label: 'Time',
        name: "t",
        options: [
            {value: "hour", label: "Hour"},
            {value: "day", label: "24 hours"},
            {value: "week", label: "Week"},
            {value: "month", label: "Month"},
            {value: "year", label: "Year"},
            {value: "all", label: "All", selected: true}
        ]
    }
}

class Header extends React.Component {

    render () {

        let header = (
            <div className="header">
              <div className="container">
                <div className="col-xs-4">
                  <h4><a href="/">Noobspike</a></h4>
                </div>
                <div className="col-xs-8">
                  <div className="row">
                    <div className="col-xs-3">
                      <SearchOption payload={options.time} />
                    </div>
                    <div className="col-xs-3">
                      <SearchOption payload={options.sort} />
                    </div>
                    <div className="col-xs-6">
                      <Search />
                    </div>
                  </div>
                </div>
              </div>
            </div>
        );

        return header;
    }

}

export default Header


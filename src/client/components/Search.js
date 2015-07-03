import React from "react";

class Search extends React.Component {

    render () {
        let search = (
        <div className={"input-group pull-right"}>
          <input type="text" className="form-control" />
          <span className="input-group-btn">
            <button type="submit" className="btn btn-success">
              <span className={"glyphicon glyphicon-search"}></span>
            </button>
          </span>
        </div>
        );

        return search;
    }

}

export default Search

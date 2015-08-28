import React from "react";
import Header from "./Header.js";
import {RouteHandler} from "react-router"

class App extends React.Component {

    render () {

      return (
        <div id="app-container">
          <Header />
          <div className="container">
            <div className="col-xs-12">
              <section id="noobspike">
                <RouteHandler />
              </section>
            </div>
          </div>
        </div>
      );
    }
}

export default App

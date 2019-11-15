import React, { Component } from "react";
import axios from "axios";

const Context = React.createContext();

export class Provider extends Component {
  state = {
    track_list: [],
    heading: "Top 10 Tracks"
  };

  componentDidMount(name) {
    fetch("https://itunes.apple.com/search?term=pantera&limit=10&entity=song")
      .then(res => res.json())
      .then(data => {
        //console.log(data);
        this.setState({ track_list: data.results });
      });
  }

  render() {
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    );
  }
}

export const Consumer = Context.Consumer;

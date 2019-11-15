import React, { Component } from "react";
import SongImage from "./SongImage";

import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Navbar from "./components/layouts/Navbar";
import Index from "./components/layouts/Index";
import { Provider } from "./context";

class TopTenButton extends React.Component {
  render() {
    return <Button title="Top ten!" />;
  }
}

class Button extends React.Component {
  render() {
    return (
      <a href={this.props.href} className="btn btn-primary" type="button">
        {this.props.title}
      </a>
    );
  }
}

class ThumbnailList extends React.Component {
  render() {
    var list = this.props.results.map(function(thumbnailProps, i) {
      return <Thumbnail key={i} {...thumbnailProps} />;
    });
    return <div className="row text-center">{list}</div>;
  }
}

class Thumbnail extends React.Component {
  render() {
    return (
      <div className="col-xs-3 col-md-3 mb-4">
        <div className="card">
          <img className="card-img-top" src={this.props.artworkUrl100} alt="" />
          <div className="card-body">
            <h4 className="card-title">{this.props.trackName}</h4>
            <p className="card-text">{this.props.artistName}</p>
          </div>
          <div className="card-footer">
            <Button href={this.props.previewUrl} title="Listen now!" />
          </div>
        </div>
      </div>
    );
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);

    this.state = {
      songs: [],
      searchString: ""
    };
  }

  submit(e) {
    e.preventDefault();
    const name = e.target.search.value;
    this.componentDidMount(name);
  }

  componentDidMount(name) {
    //itunes
    fetch(
      "https://itunes.apple.com/search?term=" + name + "&limit=25&entity=song"
    )
      .then(res => res.json())
      .then(data => {
        //console.log(data);
        this.setState({ songs: data.results });
      });
  }

  render() {
    return (
      <Provider>
        <Router>
          <React.Fragment>
            <Navbar />
            <div className="container">
              <Switch>
                <Route exact path="/" component={Index} />
              </Switch>
              <form className="form-inline" onSubmit={this.submit}>
                <div className="form-group">
                  <input
                    onChange={this.handleChange}
                    type="search"
                    id="search"
                    name="search"
                    className="form-control"
                  />
                  <input
                    className="form-control"
                    type="submit"
                    value="Search"
                  />
                </div>
              </form>
            </div>
            <div>
              <TopTenButton />
              <h1> Albums</h1>

              <ThumbnailList results={this.state.songs} />
            </div>
          </React.Fragment>
        </Router>
      </Provider>
    );
  }
}

export default App;

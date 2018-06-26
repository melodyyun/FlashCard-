import React, { Component } from "react";

const Loader = WrappedComponent => {
  return class Loader extends Component {
    render() {
      return this.props.DeckList.length() === 0 ? (
        <div className="loader" />
      ) : (
        <WrappedComponent {...this.props} />
      );
    }
  };
};

export default Loader;

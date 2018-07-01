import React from "react";

class NavBar extends React.Component {
  constructor() {
    super();
    this.navScroll = this.navScroll.bind(this);
    this.handleNavScroll = this.handleNavScroll.bind(this);
  }

  navScroll() {
    window.addEventListener("scroll", this.handleNavScroll);
  }

  handleNavScroll(e) {
    this.refs.authBar.classList.toggle(
      "hide",
      window.pageYOffset > this.state.zero
    );
    this.setState({
      zero: window.pageYOffset
    });
  }
  render() {
    return (
      <div>
        {this.props.loggedIn === false && (
          <div ref="authBar" className="auth-bar">
            <div className="results">
              <div className="links clearfix">
                <div className="auth-btn">
                  <button onClick={this.props.loginWithGoogle}>
                    <i className="fas fa-sign-in-alt" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        {this.props.loggedIn === true && (
          <div className="auth-bar">
            <div className="results">
              <div className="links clearfix">
                <button onClick={this.props.logout}>
                  <i className="fas fa-sign-out-alt" />
                </button>
                <img src={this.props.userImg} alt={this.props.userName} />
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default NavBar;

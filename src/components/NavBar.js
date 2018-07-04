import React from "react";
import {UserContext} from "../views/Home";

class NavBar extends React.Component {
  constructor() {
    super();
    //this.navScroll = this.navScroll.bind(this);
    //this.handleNavScroll = this.handleNavScroll.bind(this);
  }

  navScroll() {
    window.addEventListener("scroll", this.handleNavScroll);
  }

  // handleNavScroll(e) {
  //   this.refs.authBar.classList.toggle(
  //     "hide",
  //     window.pageYOffset > this.state.zero
  //   );
  //   this.setState({
  //     zero: window.pageYOffset
  //   });
  // }
  render() {
    return (
      <div>
        <UserContext.Consumer>
        {(context) => {
          console.log(context);
          const { userId, userImg, userName, loginWithGoogle, logout } = context;

          return userId? (
            <React.Fragment>
              <div className="auth-bar">
                <div className="results">
                  <div className="links clearfix">
                    <div className="auth-btn">
                      <button onClick={loginWithGoogle}>
                        <i className="fas fa-sign-in-alt" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </React.Fragment>
          ) : (
            <React.Fragment>
            <div className="auth-bar">
              <div className="results">
                <div className="links clearfix">
                  <button onClick={logout}>
                    <i className="fas fa-sign-out-alt" />
                  </button>
                  <img src={userImg} alt={userName} />
                </div>
              </div>
            </div>
            </React.Fragment>
          )
        }}
      </UserContext.Consumer>
      </div>
    );
  }
}

export default NavBar;

import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Payments from "./Payments";

class Header extends Component {
  renderContent(){
    switch(this.props.auth) {
      case null:
        return "checking";
      case false:
        return (
          <li><a href="/auth/google">Log in with Google</a></li>
        )
      default:
        return [
          <li key="1"><Payments /></li>,
          <li key="3">
            Credits: {this.props.auth.credits}
          </li>,
          <li key="2"><a href="/api/logout">Log out</a></li>
        ];
    }


  }

  render() {
    console.log(this.props)
    return (
      <nav>
        <div className="nav-wrapper">
          <Link
            to={ this.props.auth ? "/surveys" : "/"}
            className="left brand-logo"
          >
             Email App
          </Link>
          <ul className="right">
            {this.renderContent()}
          </ul>
        </div>
      </nav>
    );
  }
}

// ES6 syntax
function mapStateToProps({ auth }) {
  return { auth: auth}
}

// function mapStateToProps(state){
//   return { auth: state.auth}
// }

export default connect(mapStateToProps)(Header);

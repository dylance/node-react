import React, { Component } from "react";
import { connect } from "react-redux";

class Header extends Component {
  renderContent(){
    switch(this.props.auth) {
      case null:
        return "checking";
      case false:
        return "log in"
      default:
        return "Logged in"
    }


  }

  render() {
    console.log(this.props)
    return (
      <nav>
        <div className="nav-wrapper">
          <a className="left brand-logo">
             ReactApp
          </a>
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

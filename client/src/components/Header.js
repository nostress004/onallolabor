import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Payments from './Payments';

class Header extends Component {
    renderContent() {
        switch (this.props.auth) {
            case null:
                return;
            case false:
                return (
                    <li>
                        <a href="/auth/google"> Sign in with google</a>
                    </li>
                );
            // user is logged in
            default:
                return [
                    <li key="1">
                        <Payments />
                    </li>,
                    <li key="3" style={{ margin: '0 10px' }}>
                        Credits: {this.props.auth.credits}
                    </li>,
                    <li key="2">
                        <a href="/api/logout"> Log out</a>
                    </li>
                ];
        }
    }

    render() {
        return (
            <nav>
                <div className="nav-wrapper">
                    <Link
                        to={this.props.auth ? '/surveys' : '/'}
                        className="left brand-logo"
                    >
                        Restaurant
                    </Link>
                    <ul className="right">
                        <li>{this.renderContent()}</li>
                    </ul>
                </div>
            </nav>
        );
    }
}

function mapStateToProps({ auth }) {
    return { auth };
}

// function mapStateToProps(state) {
//   return { auth: state.auth };
// }

export default connect(mapStateToProps)(Header);

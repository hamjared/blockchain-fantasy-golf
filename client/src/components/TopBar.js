import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { Button } from "semantic-ui-react";

import CreateLeague from "./CreateLeague";
//import TransferZombie from "./TransferZombie";

import { Menu, Header } from "semantic-ui-react";

function mapStateToProps(state) {
  return {
    userAddress: state.userAddress,
    userZombieCount: state.userZombieCount,
    totalZombieCount: state.totalZombieCount,
    leagueNumber: 1
  };
}

// This renders the topbar on the webpage as well as the lines listing address and zombie count.

class TopBar extends Component {
  render() {
    return (
      <div style={{color: '#F5F5F5'}}>
        <Menu style={{backgroundColor: '#3FC1C9', border: '1px solid black', marginTop: '10px'}}>
          <Menu.Item>
            <CreateLeague />
          </Menu.Item>

          <Menu.Item>
            <Link to={{ pathname: "/RosterManagement" }}>
              <Button primary>Roster Management</Button>
            </Link>
          </Menu.Item>

          <Menu.Item>
            <Link to={{ pathname: "/Matches" }}>
              <Button primary>Matches</Button>
            </Link>
          </Menu.Item>
          <Menu.Item>
              <Button primary>End Tournament</Button>
          </Menu.Item>
          <Menu.Item position="right">
            <Link to={{ pathname: "/" }}>
              <Header style={{color: '#F5F5F5'}} size="large">Cryptogolf DApp </Header>
            </Link>
          </Menu.Item>



        </Menu>
        Your account address: {this.props.userAddress}
        <br />
        You are in league(ID): {this.props.leagueNumber}
        <hr />
      </div>
    );
  }
}

export default connect(mapStateToProps)(TopBar);

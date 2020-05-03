import React, { Component } from "react";
import {
  Card,
  Grid,
  Input,
  Segment,
  Pagination,
} from "semantic-ui-react";
import { connect } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import ZombieCard from "../components/zombieCard";
import { Button } from "semantic-ui-react";
import { Menu, Header } from "semantic-ui-react";

function mapStateToProps(state) {
  return {
    CZ: state.CZ,
    totalZombieCount: state.totalZombieCount,
    userAddress: state.userAddress
  };
}
class Greeting extends Component {
  state = {
    classes: {
      table: {
        minWidth: 650
      }
    }
  };
  componentDidMount = async () => {

  };

  render() {
    const imgStyle = {
      display: "block",
      marginLeft: "auto",
      marginRight: "auto",
      width: "50%"
    };

    return (

      <div>


        <br />
        <h2 style={{ textAlign: "center" }}>
          {" "}
          Fantasy Golf League
        </h2>
        <br />
        <img src="Logo.png" style={imgStyle} width="200px" alt="Zombie rising from grave" />
        <br /> <br />
        <p style={{ textAlign: "center" }}>
          This CS481A3 blockchain game allows you to create and join fantasy golf leagues.
          <br /> Once created, you can add people to your league or join an already created league
          <br /> Additionally, the winner of the league will receive a large share of the prize pool
          <br /> <br /> To get started, select a button from the menu bar above.
        </p>
      </div>
    );
  }
}

export default Greeting;

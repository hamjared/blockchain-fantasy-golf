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

function mapStateToProps(state) {
  return {
    CZ: state.CZ,
    userZombieCount: state.userZombieCount,
    userAddress: state.userAddress
  };
}

class RosterManagement extends Component {
  state = {
    Player1: [],
    Player2: [],
    Player3: [],
    Player4: [],
    Player5: [],
    Player6: [],
    activePage: 1,
    totalPages: Math.ceil(this.props.totalZombieCount / 9),
    rows: [],
    rows2: [],
    classes: {
      table: {
        minWidth: 650
      }
    }
  };
  componentDidMount = async () => {
    await this.makeZombieCards();
    await this.setState({rows: []
            })
      await this.setState({rows2: [
                {name:'Jhon 12', cost:23},
                {name:'Onhj 23', cost:82},
                {name:'Jhon 14', cost:28},
                {name:'Onhj 25', cost:82},
                {name:'Jhon 16', cost:28},
                {name:'Onhj 27', cost:82},
                {name:'Jhon 18', cost:28},
                {name:'Onhj 29', cost:82},
                {name:'Jhon 10', cost:28},
                {name:'Onhj 211', cost:82},
                {name:'Jhon 122', cost:28},
                {name:'Onhj 233', cost:82},
                {name:'Jhon 144', cost:28},
                {name:'Onhj 255', cost:82},
                {name:'Nohj 366', cost:41}]
              })
    console.log(this.state.rows)
  };
  createData = async (name, calories, fat, carbs, protein) => {
    return { name, calories, fat, carbs, protein };
  }

  onChange = async (e, pageInfo) => {
    await this.setState({ activePage: pageInfo.activePage });
    this.makeZombieCards();
  };

  handleInputChange = async (e, { value }) => {
      await this.setState({ activePage: value });
      this.makeZombieCards();
  }
  onHire = async(e, value) => {
    value = value.value
    let r1 = 0
    let r2 = 0
    for(let i=0;i<this.state.rows2.length;i++){
      if(this.state.rows2[i].name == value){
        r2 = i
      }
    }
    if(this.state.rows.length < 6){
      let newRows1 = this.state.rows;
      newRows1.push(this.state.rows2[r2])
      this.setState({rows: newRows1})
      let newRows2 = this.state.rows2;
      newRows2.splice(r2, 1);
      this.setState({rows2: newRows2})
    }
  }

  onFire = async(e, value) => {
    value = value.value
    let r1 = 0
    let r2 = 0
    for(let i=0;i< this.state.rows.length;i++){
      if(this.state.rows[i].name == value){
        r1 = i
      }
    }
    let newRows2 = this.state.rows2;
    newRows2.push(this.state.rows[r1])
    this.setState({rows2: newRows2})
    let newRows1 = this.state.rows;
    newRows1.splice(r1, 1);
    this.setState({rows: newRows1})
  }

  submitRoster = async(e, value) => {
    console.log("submit roster")
    console.log(this.state.rows.length)
    if(this.state.rows.length == 6){
      console.log("gucci")
      let golfer = this.state.rows
      let roster = await this.props.CZ.methods
        .placeBet(golfer[0].cost, golfer[1].cost, golfer[2].cost, golfer[3].cost, golfer[4].cost, golfer[5].cost, 1) // contains the League Name
        .send({
          from: this.props.userAddress,
          gas: 1000000
        });
      console.log(roster)
      let bet = await this.props.CZ.methods
        .getBet() // contains the League Name
        .call({
          from: this.props.userAddress,
          gas: 1000000
        });
      console.log(bet)
    }
  }

  makeZombieCards = async () => {
    let zList = [];
    let zOwner = [];
    await this.setState({ zombieTable: [] }); // clear screen while waiting for data

    for (let i = this.state.activePage * 9 - 9;i < this.state.activePage * 9;i++) {
      try {
        let metaData = await this.props.CZ.methods.zombies(i).call();
        zList.push(metaData);
        let myOwner = await this.props.CZ.methods.zombieToOwner(i).call();
        zOwner.push(myOwner);
      } catch (err) {
        break;
      }
    }
  };

  render() {
    return (
      <div>
        <hr />
        <h2> Roster Management </h2>
        <hr />
        <Button onClick={this.submitRoster}>Submit Roster</Button>
        <br/>
        <br/>
        <Grid columns={2}>
          <Grid.Column>
            <Segment secondary>
              <div>Your Roster</div>
              <TableContainer component={Paper}>
                <Table className={this.state.classes.table} size="small" aria-label="a dense table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Player Name</TableCell>
                      <TableCell>Cost</TableCell>
                      <TableCell align="right"></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {this.state.rows.map((row) => (
                      <TableRow key={row.name}>
                        <TableCell component="th" scope="row">
                          {row.name}
                        </TableCell>
                        <TableCell>{row.cost}</TableCell>
                        <TableCell align="right"><Button value={row.name} onClick={this.onFire}>Fire</Button></TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Segment>
          </Grid.Column>
          <Grid.Column>
            <Segment secondary>
              <div>Free Agents</div>
              <TableContainer component={Paper} style={{maxHeight: 600}}>
                <Table className={this.state.classes.table} size="small" aria-label="a dense table">
                <TableHead>
                  <TableRow>
                    <TableCell>Player Name</TableCell>
                    <TableCell>Cost</TableCell>
                    <TableCell align="right"></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {this.state.rows2.map((row) => (
                    <TableRow key={row.name}>
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell>{row.cost}</TableCell>
                      <TableCell align="right"><Button value={row.name} onClick={this.onHire}>Hire</Button></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                </Table>
              </TableContainer>
            </Segment>
          </Grid.Column>
        </Grid>
        <br /> <br />
        <div>
          <Card.Group>{this.state.zombieTable}</Card.Group>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(RosterManagement);

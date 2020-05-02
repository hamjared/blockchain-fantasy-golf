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
import Web3 from "web3";
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
    console.log(this.state.rows)
    //get golfers
    let golferArr = []
    for(let i=1; i<8; i++){
      let golfer = await this.props.CZ.methods
        .getGolfer(i) // contains the League Name
        .call({
          from: this.props.userAddress,
          gas: 10000000,
        });
      console.log(golfer)
      golferArr.push({name: golfer[0], cost: golfer[1], id: i})
    }
    let bet = {}
    try{
      bet = await this.props.CZ.methods
        .getBet() // contains the League Name
        .call({
          from: this.props.userAddress,
          gas: 10000000,
          gasPrice: '20000000000',
        });
      console.log(bet[0])
    }catch(err){

    }
    //bet will now equal the array of IDS on the roster
    let newRows = []
    bet = bet[0]
    for(let i = 0; i < golferArr.length; i++){
      for(let j = 0; j < 6; j++){
        if(golferArr[i].id == bet[j]){
          newRows.push(golferArr[i])
          golferArr.splice(i, 1)
        }
      }
    }
    this.setState({rows2: golferArr})
    this.setState({rows: newRows})
  };

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
        .placeBetNonArray(golfer[0].id, golfer[1].id, golfer[2].id, golfer[3].id, golfer[4].id, golfer[5].id, 0) // contains the League Name
        .send({
          from: this.props.userAddress,
          gas: 1000000,
          value: 6
        });
      console.log(roster)
      // let bet = await this.props.CZ.methods
      //   .getBet() // contains the League Name
      //   .call({
      //     from: this.props.userAddress,
      //     gas: 10000000,
      //     gasPrice: '20000000000',
      //   });
      // console.log(bet)
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

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

class Matches extends Component {
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
    playerIDS: [],
    classes: {
      table: {
        minWidth: 650
      }
    }
  };
  componentDidMount = async () => {
    await this.makeZombieCards();
    await this.setState({rows: [
              {name:'Jhon 1', points:28},
              {name:'Onhj 2', points:82},
              {name:'Nohj 3', points:41}]
            })
    let getTeams = await this.props.CZ.methods
      .getBets(0) // contains the League Name
      .call({
        from: this.props.userAddress,
        gas: 1000000
      }).then(console.log());
    console.log(getTeams)
    this.setState({playerIDS: getTeams[0]})
    let counter = 20;
    let teams = [];
    for(let i = 0; i < 6; i++){
      let golfer = await this.props.CZ.methods
        .getGolfer(counter) // contains the League Name
        .call({
          from: this.props.userAddress,
          gas: 10000000,
        });
        counter ++;
        let golfer2 = await this.props.CZ.methods
          .getGolfer(counter) // contains the League Name
          .call({
            from: this.props.userAddress,
            gas: 10000000,
          });
                  counter ++;
        let golfer3 = await this.props.CZ.methods
          .getGolfer(counter) // contains the League Name
          .call({
            from: this.props.userAddress,
            gas: 10000000,
          });
                  counter ++;
        let golfer4 = await this.props.CZ.methods
          .getGolfer(counter) // contains the League Name
          .call({
            from: this.props.userAddress,
            gas: 10000000,
          });
                  counter ++;
        let golfer5 = await this.props.CZ.methods
          .getGolfer(counter) // contains the League Name
          .call({
            from: this.props.userAddress,
            gas: 10000000,
          });
                  counter ++;
        let golfer6 = await this.props.CZ.methods
          .getGolfer(counter) // contains the League Name
          .call({
            from: this.props.userAddress,
            gas: 10000000,
          });
      let person1 = ({name: golfer[0], cost: golfer[1]/1000000000000000000, id: counter})
      let person2 = ({name: golfer2[0], cost: golfer2[1]/1000000000000000000, id: counter})
      let person3 = ({name: golfer3[0], cost: golfer3[1]/1000000000000000000, id: counter})
      let person4 = ({name: golfer4[0], cost: golfer4[1]/1000000000000000000, id: counter})
      let person5 = ({name: golfer5[0], cost: golfer5[1]/1000000000000000000, id: counter})
      let person6 = ({name: golfer6[0], cost: golfer6[1]/1000000000000000000, id: counter})
      teams.push([person1, person2, person3, person4, person5, person6])
    }
    console.log(teams)
    this.setState({Player1: teams[0]})
    this.setState({Player2: teams[1]})
    this.setState({Player3: teams[2]})
    this.setState({Player4: teams[3]})
    this.setState({Player5: teams[4]})
    this.setState({Player6: teams[5]})
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
  onStartTournament = async(e, value) => {
    let start = await this.props.CZ.methods
      .startTournament(0) // contains the League Name
      .send({
        from: this.props.userAddress,
        gas: 10000000
      });
      console.log(start)
  }
  onEndTournament = async(e, value) => {
    let end = await this.props.CZ.methods
      .endTournament(0) // contains the League Name
      .send({
        from: this.props.userAddress,
        gas: 10000000
      });
      console.log(end)
      let withdraw = await this.props.CZ.methods
        .withdrawEther(0) // contains the League Name
        .send({
          from: this.props.userAddress,
          gas: 10000000
        });
        console.log(withdraw)
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
      <Menu style={{backgroundColor: '#364F6B', marginTop: '10px'}}>
        <Menu.Item>
            <Button primary onClick={this.onStartTournament}>Start Tournament</Button>
        </Menu.Item>
        <Menu.Item>
            <Button primary onClick={this.onEndTournament}>End Tournament</Button>
        </Menu.Item>
      </Menu>
        <hr />
        <h2> Fantasy Matches </h2>
        <hr />
        <Grid columns={2} verticalAlign="middle">
          <Grid.Column>
            <Segment secondary>
              <div>TEAM: {this.state.playerIDS[0]}</div>
              <TableContainer component={Paper}>
                <Table className={this.state.classes.table} size="small" aria-label="a dense table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Player Name</TableCell>
                      <TableCell align="right">Points</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {this.state.Player1.map((row) => (
                      <TableRow key={row.name}>
                        <TableCell component="th" scope="row">
                          {row.name}
                        </TableCell>
                        <TableCell align="right">{row.points}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Segment>
          </Grid.Column>
          <Grid.Column>
            <Segment secondary>
              <div>TEAM: {this.state.playerIDS[1]}</div>
              <TableContainer component={Paper}>
                <Table className={this.state.classes.table} size="small" aria-label="a dense table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Player Name</TableCell>
                      <TableCell align="right">Points</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {this.state.Player2.map((row) => (
                      <TableRow key={row.name}>
                        <TableCell component="th" scope="row">
                          {row.name}
                        </TableCell>
                        <TableCell align="right">{row.points}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Segment>
          </Grid.Column>
        </Grid>
        <Grid columns={2} verticalAlign="middle">
          <Grid.Column>
            <Segment secondary>
              <div>TEAM: {this.state.playerIDS[2]}</div>
              <TableContainer component={Paper}>
                <Table className={this.state.classes.table} size="small" aria-label="a dense table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Player Name</TableCell>
                      <TableCell align="right">Points</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {this.state.Player3.map((row) => (
                      <TableRow key={row.name}>
                        <TableCell component="th" scope="row">
                          {row.name}
                        </TableCell>
                        <TableCell align="right">{row.points}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Segment>
          </Grid.Column>
          <Grid.Column>
            <Segment secondary>
              <div>TEAM: {this.state.playerIDS[3]}</div>
              <TableContainer component={Paper}>
                <Table className={this.state.classes.table} size="small" aria-label="a dense table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Player Name</TableCell>
                      <TableCell align="right">Points</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {this.state.Player4.map((row) => (
                      <TableRow key={row.name}>
                        <TableCell component="th" scope="row">
                          {row.name}
                        </TableCell>
                        <TableCell align="right">{row.points}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Segment>
          </Grid.Column>
        </Grid>
        <Grid columns={2} verticalAlign="middle">
          <Grid.Column>
            <Segment secondary>
              <div>TEAM: {this.state.playerIDS[4]}</div>
              <TableContainer component={Paper}>
                <Table className={this.state.classes.table} size="small" aria-label="a dense table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Player Name</TableCell>
                      <TableCell align="right">Points</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {this.state.Player5.map((row) => (
                      <TableRow key={row.name}>
                        <TableCell component="th" scope="row">
                          {row.name}
                        </TableCell>
                        <TableCell align="right">{row.points}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Segment>
          </Grid.Column>
          <Grid.Column>
            <Segment secondary>
              <div>TEAM: {this.state.playerIDS[5]}</div>
              <TableContainer component={Paper}>
                <Table className={this.state.classes.table} size="small" aria-label="a dense table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Player Name</TableCell>
                      <TableCell align="right">Points</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {this.state.Player6.map((row) => (
                      <TableRow key={row.name}>
                        <TableCell component="th" scope="row">
                          {row.name}
                        </TableCell>
                        <TableCell align="right">{row.points}</TableCell>
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

export default connect(mapStateToProps)(Matches);

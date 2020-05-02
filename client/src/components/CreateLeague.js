import React, { Component } from "react";
//import getZombieCount from "../utils/getZombieCount";
import { connect } from "react-redux";
import Web3 from "web3";
import { Button, Header, Icon, Modal, Form, Message } from "semantic-ui-react";
import {getTournamentData} from '../GolfApi'
function mapStateToProps(state) {
    return {
        CZ: state.CZ,
        userAddress: state.userAddress,
        userZombieCount: state.userZombieCount
    };
}


// Create a New League

class CreateLeague extends Component {
  state = {
    modalOpen: false,
    leagueName: "",
    tournamentID: 1,
    message: "",
    errorMessage: "",
    loading: false
  };

  handleOpen = () => this.setState({ modalOpen: true });

  handleClose = () => this.setState({ modalOpen: false });

  onSubmit = async event => {
    event.preventDefault();
    this.setState({
      loading: true,
      errorMessage: "",
      message: "waiting for blockchain transaction to complete...",
      p1: "",
      p2: "",
      p3: "",
      p4: "",
      p5: "",
      p6: ""
    });
    // let addresses=[
    //   this.state.p1, this.state.p2, this.state.p3, this.state.p4, this.state.p5, this.state.p6
    // ]
    let addresses = [
      '0x09CCb34BA839efdBf5807fFFb93A3209A5eA3767',
      '0xD7221628f3E071037FBdcA322D713D013792F2F0',
      '0x1706B767f2aF2234FFb1d72099b277Aa2663042d',
      '0x212546936AaECeA5fB6f0fe3DEB684bB6D168D63',
      '0x16F708683185E96c4d827293b64e02c8E08642d9',
      '0xAfaE2ABB0863e1cD8a2DBd838f3A965DA7b20421'
    ]
    console.log(addresses)
    let tournamentData = await getTournamentData()
    //PUSH GOLFERS HERE TODO
    console.log(tournamentData.players);
    //.Name    .PlayerID
    try {
      console.log(this.state.leagueName)
      console.log("MAKE LEAGUE")
      let tournament = await this.props.CZ.methods
        .createTournament(this.state.tournamentID, "tourneything", 15818474599, 15818476599) // contains the League Name
        .send({
          from: this.props.userAddress,
          gas: 1000000
        });
        console.log(tournament)

      let creation = await this.props.CZ.methods
        .createLeague(this.state.tournamentID, this.state.leagueName, addresses) // contains the League Name
        .send({
          from: this.props.userAddress,
          gas: 100000000
        });
        console.log(creation)

      let leagueNum = await this.props.CZ.methods
        .getLeagueID() // contains the League Name
        .call({
          from: this.props.userAddress,
          gas: 1000000
        }).then(console.log());
      console.log("LEAGUE NUMBER: " + leagueNum)


      this.setState({
        loading: false,
        message: "You have created a New League"
      });
      // await this.props.CZ.events.NewLeague()
      // .on('data', (event) => {
      //   console.log(event)
      //   console.log("EVENT ABOVE")
      // })
      // .on('error', console.error);
      console.log("DONE")
    } catch (err) {
      this.setState({
        loading: false,
        errorMessage: err.message,
        message: "User rejected transaction or else this account is already in use, please try another name."
      });
    }
  };


  render() {
    let createDisabled = (this.props.userZombieCount !== 0);
      return (
      <Modal
        trigger={
          <Button primary onClick={this.handleOpen}>
            Create League
          </Button>
        }
        open={this.state.modalOpen}
        onClose={this.handleClose}
      >
        <Header icon="browser" content="Create a New League" />
        <Modal.Content>
          <img src="Logo.png" alt="fantasylogo" height="300px" width="300px"/><Header>Be sure to give your league a great name!</Header>
          <br /> <br />
          <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
            <Form.Field>
              <label>League Name</label>
              <input
                placeholder="Name"
                onChange={event =>
                  this.setState({
                    leagueName: event.target.value
                  })
                }
              />
              <label>Tournament ID</label>
              <input
                placeholder="Tournament ID"
                onChange={event =>
                  this.setState({
                    tournamentID: event.target.value
                  })
                }
              />
              <label>Player Addresses (6 Required)</label>
              <input
                placeholder="Player 1 Address"
                onChange={event =>
                  this.setState({
                    p1: event.target.value
                  })
                }
              />
              <input
                placeholder="Player 2 Address"
                onChange={event =>
                  this.setState({
                    p2: event.target.value
                  })
                }
              />
              <input
                placeholder="Player 3 Address"
                onChange={event =>
                  this.setState({
                    p3: event.target.value
                  })
                }
              />
              <input
                placeholder="Player 4 Address"
                onChange={event =>
                  this.setState({
                    p4: event.target.value
                  })
                }
              />
              <input
                placeholder="Player 5 Address"
                onChange={event =>
                  this.setState({
                    p5: event.target.value
                  })
                }
              />
              <input
                placeholder="Player 6 Address"
                onChange={event =>
                  this.setState({
                    p6: event.target.value
                  })
                }
              />

            </Form.Field>
            <Message error header="Oops!" content={this.state.errorMessage} />
            <Button primary type="submit" loading={this.state.loading}>
              <Icon name="check" />
              Create League
            </Button>
            <hr />
            <h2>{this.state.message}</h2>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button color="red" onClick={this.handleClose} inverted>
            <Icon name="cancel" /> Close
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

export default connect(mapStateToProps)(CreateLeague);

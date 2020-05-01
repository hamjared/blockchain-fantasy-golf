import React, { Component } from "react";
//import getZombieCount from "../utils/getZombieCount";
import { connect } from "react-redux";

import { Button, Header, Icon, Modal, Form, Message } from "semantic-ui-react";

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
      message: "waiting for blockchain transaction to complete..."
    });
    let addresses=[
      '0xE7b8168B405c4B47E13e194BD017346487aDd600',
      '0x740e54cdE748A713AA51aB9b8aBAE01Ea749e9CE',
      '0xC8fc0fdCa28E14F36B20282793763bdEDf31bEaa',
      '0xCDA1692240647564a586fB403253c899417D63Ce',
      '0x8049985bfEf0B574EdfA83a431832F8772078a66',
      '0x8688EeAE90DCc0872B19f5E80057b3B716aEFe8f'
    ]
    try {
      console.log("MAKE LEAGUE")
      let tournament = await this.props.CZ.methods
        .createTournament(1, "main", 15818474599, 15818476599) // contains the League Name
        .send({
          from: this.props.userAddress,
          gas: 1000000
        });
        console.log(tournament)
      let creation = await this.props.CZ.methods
        .createLeague(this.state.tournamentID, this.state.leagueName, addresses) // contains the League Name
        .send({
          from: this.props.userAddress,
          gas: 1000000
        });

        // await this.props.CZ.events.NewLeague({
        //   fromBlock: 0,
        //   toBlock: 'latest'})
        //   .on('data', event => {
        //     console.log('new event:', event)
        //   })
        //   .on('changed', event => {
        //     console.log('event removed from blockchain:', event)
        //   })
        //   .on('error', error => {
        //    console.error(error)
        //   })
        // event.get(function(error, logs){
        //   console.log(error, logs)
        // });
        // console.log(event)
        console.log(creation)

      // var event2 = await this.props.CZ.events.allEvents();
      // console.log(event2)
      // var events = await this.props.CZ.getPastEvents("allEvents",
      // {
      //   fromBlock: 0,
      //   toBlock: 'latest'
      // }).then(events => console.log(events))
      // console.log("-----------------")
      // console.log(events)

      // let leagueNum = await this.props.CZ.methods
      //   .getLeagueID() // contains the League Name
      //   .call({
      //     from: this.props.userAddress,
      //     gas: 1000000
      //   }).then(console.log());
      // console.log("LEAGUE NUM" + leagueNum)


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
                    value: event.target.leagueName
                  })
                }
              />
              <label>Tournament ID</label>
              <input
                placeholder="Tournament ID"
                onChange={event =>
                  this.setState({
                    value: event.target.tournamentID
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

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

class TransferZombie extends Component {
    state = {
        modalOpen: false,
        value: "",
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
        try {
            await this.props.CZ.methods
                .createRandomZombie(this.state.value) // contains the League Name
                .send({
                    from: this.props.userAddress
                });
            this.setState({
                loading: false,
                message: "You have created a New League"
            });
            getZombieCount(this.props.CZ, this.props.userAddress);
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
            <Button primary disabled={createDisabled} onClick={this.handleOpen}>
            Transfer Zombie
        </Button>
    }
        open={this.state.modalOpen}
        onClose={this.handleClose}
            >
            <Header icon="browser" content="Create a New League" />
            <Modal.Content>
            <img src="static/images/zombieWarrior.jpg" alt="zombie warrior" /><Header>Be sure to give your zombie a WORTHY name!!!</Header>
        <br /> <br />
        <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
    <Form.Field>
        <label>League Name</label>
        <input
        placeholder="Name"
        onChange={event =>
        this.setState({
            value: event.target.value
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

export default connect(mapStateToProps)(TransferZombie);

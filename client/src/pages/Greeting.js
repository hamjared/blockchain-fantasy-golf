import React, { Component } from "react";

class Greeting extends Component {
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

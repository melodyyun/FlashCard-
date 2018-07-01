import React from "react";
import CardsList from "../components/CardsList";
import styled from "styled-components";
import firebase from "firebase";

const EditCardsContainer = styled.main`
  height: 100%;
  width: 100%;
`;

const Header = styled.header`
  width: 100%;
  padding: 1px 0 4rem 0;
  height: 25rem;
  display: flex;
  align-items: center;
  position: relative;
`;
const navButtons = styled.nav``;

class EditCardsPage extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedDeckId: "",
      display: ""
    };
  }

  componentWillMount() {
    const dbRefDeck = firebase
      .database()
      .ref(`user/${this.props.uid}/decksList/${this.props.selectedDeckId}`);
    dbRefDeck.on("value", snapshot => {
      console.log(snapshot.val());
      const data = snapshot.val();
      this.setState({
        selectedDeckName: data.deckName,
        selectedDeckDescription: data.deckDescription
      });
    });

    this.setState({
      display: this.props.changeDisplay,
      selectedDeckId: this.props.selectedDeckId
    });
  }

  render() {
    return (
      <EditCardsContainer className="wrapper">
        <Header className="hero3">
          <div className="wrapper">
            <h1>{this.state.selectedDeckName}</h1>
            <h3>{this.state.selectedDeckDescription}</h3>
          </div>
        </Header>
        <div className="btn-container wrapper clearfix">
          <button
            className="btn float-right"
            name="home"
            value={this.props.selectedDeckId}
            onClick={e => this.props.changeDisplay(e)}
          >
            Home
          </button>
          <button
            className="btn float-right"
            name="study"
            value={this.props.selectedDeckId}
            onClick={e => this.props.changeDisplay(e)}
          >
            Study
          </button>
        </div>
        <CardsList selectedDeckId={this.state.selectedDeckId} />
      </EditCardsContainer>
    );
  }
}

export default EditCardsPage;

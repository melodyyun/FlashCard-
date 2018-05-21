import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase';
import DecksList from './DecksList';
import {firebaseConfig} from './firebase/firebase-config';
// import ui from 'firebaseui'
import StudyCardsPage from './StudyCardsPage';
import EditCardsPage from './EditCardsPage';
import styled from 'styled-components';
import Deck from './Deck';

//------------------
// Styled components 5px 5px #A9A9A9
//------------------

const Hero = styled.div`
  padding-top: 200px;
  z-index: 1;
  background: #EFEFEF;
  width: 100%;
  min-height: 40vh;
`

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

class App extends React.Component {
  constructor(){
    super();
    this.state = {
      deckName: '',
      deckDescription: '',
      likes: 0,
      display: 'home',
      selectedDeckId:''
    }
    this.createDeck = this.createDeck.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.createDeck = this.createDeck.bind(this);
    this.changeDisplay = this.changeDisplay.bind(this);
  }

  //-----------------
  // Change Display
  //-----------------

  changeDisplay(e){    
    this.setState({
      selectedDeckId: e.target.value,
      display: e.target.name
    });
  }

  //----------
  // Events
  //----------

  handleChange(e){
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  createDeck(e) {
    e.preventDefault();
    //info that will be set for each Deck
    const deck = {
      deckName: this.state.deckName,
      deckDescription: this.state.deckDescription,
      likes: 0,
      delete: true,
      cards:[],
    }

    const dbRef = firebase.database().ref('user/decksList');
    dbRef.push(deck);

    this.setState({
      deckName: '',
      deckDescription: ''
    })
  }

  //----------
  // Render
  //----------

  render() {
    return (
      <div>
        {this.state.display === 'home' ? 
        <section>
          <div className="hero">
            <div className="wrapper">
              <h1>Study Buddy</h1>
            </div>
          </div>
          <div className="createDeckFormParent wrapper">
            <div className="createDeckForm formBg">
              <h3>Create a Deck!</h3>
              <form action="" onSubmit={this.createDeck}>
                <input type="text"
                  name="deckName"
                  placeholder="Name your deck!"
                  value={this.state.deckName}
                  onChange={this.handleChange} required />
                <input type="text"
                  name="deckDescription"
                  placeholder="Field of study"
                  value={this.state.deckDescription}
                  onChange={this.handleChange} required />
                <input className="btn" type="submit" />
              </form>
            </div>
          </div>
          <div className="deckListContainer">
            <div className="wrapper">
                <div>
                  <DecksList
                    display={this.state.display}
                    // functions to change display state
                    changeDisplay={this.changeDisplay}
                  />
                </div>
            </div>
          </div>
        </section>
        : null}

        {this.state.display === 'study'? 
          <StudyCardsPage 
            changeDisplay = {this.changeDisplay}
            selectedDeckId ={this.state.selectedDeckId}
            /> : null}
      
        {this.state.display === 'edit' ?
          <EditCardsPage 
            changeDisplay = {this.changeDisplay}
            selectedDeckId ={this.state.selectedDeckId}
            /> : null}
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));

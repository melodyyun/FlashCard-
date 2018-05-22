import React from 'react';
import firebase from 'firebase';
import CardsList from './CardsList';
import { log } from 'util';
import styled from 'styled-components';


//------------------
// Styled components 
//------------------

const DeckContainer = styled.div`
    position: relative;
    margin: 2rem 0;
    width: 250px;
    height: 300px;
    border-radius 5px;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.5s ease-in-out;
    background: #F7FDFF;
    box-shadow: 1px 1px #dbdbdb, 2px 2px #d3d3d3,3px 3px #dbdbdb, 4px 4px #d3d3d3, 5px 5px #dbdbdb, 6px 6px #d3d3d3, 0 14px 28px rgba(58, 58, 58, 0.2), 0 10px 10px rgba(58, 58, 58, 0.2);
    &:hover, &:focus, &:active{
        transform: scale(1.05) rotate3d(1, -1, 1, 8deg);
        z-index: 2;
    }
    .delete{
        right: 0;
        top:0;
    }
`

const DeckOfCards = styled.div`
    height: 250px;
    position: relative;
    width: 200px;
    display: flex;
    flex-direction: column;
    padding: 0 2rem;
    background: #F7FDFF;
    h4{
        text-align: center;
    }
`

const Heart = styled.div`
    cursor: pointer;
    position absolute;
    bottom: 40px;
    height: 60px;
    width: 100%;
    background: linear-gradient(rgba(247, 253, 255, 0.3), rgba(247, 253, 255, 1));
    a{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: #F7FDFF;
        font-size: 2rem;
        z-index: 2;
    }
    .fa-heart{
        position: relative;
        font-size: 3.5rem;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        path{
            color: #FF383f;
        }
    }
`

const ButtonContainer = styled.div`
    position: absolute;
    bottom 0;
    display: flex;
    flex-flow: row wrap;
    width: 100%;
    button{
        width: 50%;
    }
`
//------------
// Deck Class
//------------
class Deck extends React.Component{
    constructor(){
        super();
        this.state = {
            display: 'home',
            selectedDeckId: '',
            likes: 0,
        };
        this.updateLikes = this.updateLikes.bind(this);
    }

    componentDidMount(){
        const dbRef = firebase.database().ref(`user/decksList/${this.props.DeckIdKey}/`);

        dbRef.on('value', (snapshot) => {
            const data = snapshot.val();
            this.setState({
                likes: data.likes
            });
        });
        this.setState({
            display: this.props.display,
        });       
    }

    updateLikes(){
        const dbRef = firebase.database().ref(`user/decksList/${this.props.DeckIdKey}/`);

        let updatedLikes = this.state.likes + 1;
        this.setState({
            likes: updatedLikes
        }, ()=>{
            dbRef.update({
            likes: this.state.likes
            });
        })
    }

    render(){
        return (
            <DeckContainer onClick={this.handleDeckClick}>
                {/* delete button */}
                {this.props.deckDelete === true ?
                    <button className="btn delete" onClick={() => this.props.deleteDeck(this.props.DeckIdKey)}><span><i className="fas fa-times"></i></span></button>
                    : null
                }
                <DeckOfCards>
                    <h4>{this.props.deckName}</h4>
                    <p>{this.props.deckDescription}</p>
                </DeckOfCards>
                <Heart>
                    <a onClick={this.updateLikes}>{this.props.deckLikes}</a><i className="fas fa-heart"></i>
                </Heart>
                <ButtonContainer>
                    <button 
                        className="btn primary" name="study" 
                        value={this.props.DeckIdKey}
                        onClick={(e) => this.props.changeDisplay(e)}>Study</button>
                    <button 
                        className="btn secondary" name="edit" 
                        value={this.props.DeckIdKey} 
                        onClick={(e) => this.props.changeDisplay(e)}>Edit</button>
                </ButtonContainer>
            </DeckContainer>
        )
    }
}

export default Deck;
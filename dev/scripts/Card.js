import React from 'react';
import styled from 'styled-components';

// const CardContainer = styled.div`
//     cursor: pointer;
//     perspective: 900px;
//     position: relative;
//     width: 250px;
//     min-height: 300px;
//     margin: auto;
//     transition: ease-in;
// `

// const FrontCard = styled.div`
//     border-radius: 5px;
//     box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
//     width: 250px;
//     min-height: 300px;
//     display:flex;
//     justify-content: center;
//     align-items: center;
//     padding: 2rem;
//     position: absolute;
//     transform-style: perserve-3d;
//     transition: all 0.4s ease-in-out;
//     overflow: hidden;
//     backface-visibility:hidden;
//     background-color: white;

//     &:hover, &:focus{
//         transform: rotateY(180deg);
//         transition: all 0.4s ease-in-out;
//         box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
//     }
// `
// const BackCard = styled.div`
//     border-radius: 5px;
//     box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
//     width: 250px;
//     min-height: 300px;
//     display:flex;
//     justify-content: center;
//     align-items: center;
//     padding: 2rem;
//     position: absolute;
//     transform-style: perserve-3d;
//     transition: all 0.4s ease-in-out;
//     transform: rotateY(180deg);

//     &:hover, &:focus{
//         transform: rotateY(180deg);
//         transition: all 0.4s ease-in-out;
//         box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
//     }
// `

const Card = (props) => {
    return(
        <div className="flip-container" onTouchStart="this.classList.toggle('hover');">
            <div className="flipper">
                <div className="front">
                    <p>{props.front}</p>
                </div>
                <div className="back">
                    <p>{props.back}</p>
                </div>
            </div>
        </div>
    )
}

export default Card;


// import React from 'react';
// import firebase from 'firebase';

// class Card extends React.Component {
//     constructor() {
//         super();
//         this.state = {
//             cardFront: '',
//             cardBack: '',
//             selectedDeckId: '',
//             cardsArray: [],
//             currentCard: {
//                 cardFront: '',
//                 cardBack: '',
//             }
//         }
//         //this.updateCard = this.updateCard.bind(this);
//     }

//     componentWillMount() {

//         const dbRefCardsList = firebase.database().ref(`user/decksList/${this.props.selectedDeckId}/cardsList/`);
//         dbRefCardsList.on('value', (snapshot) => {
//             const cardsListSnapshot = snapshot.val();
//             //clone
//             const cardsArrayClone = [];

//             for (let cardKey in cardsListSnapshot) {
//                 cardsListSnapshot[cardKey].key = cardKey;
//                 cardsArrayClone.push(cardsListSnapshot[cardKey]);
//             }

//             //if there's no cards in the array then just return an empty string
//             // const currentCard = this.getRandomCard(cardsArrayClone) || { cardBack: '', cardFront: '' }
//             this.setState({
//                 cardsArray: cardsArrayClone,
//                 // currentCard: currentCard
//             });
//         })
//     };

//     //----------------------------------------
//     //Generating random card from cards array
//     //----------------------------------------
//     // getRandomCard(cardsArrayClone) {
//     //     //return a random card from the cardsArrayClone
//     //     return cardsArrayClone[Math.floor(Math.random() * cardsArrayClone.length)];
//     // }

//     // updateCard() {
//     //     const cardsArray = this.state.cardsArray;
//     //     this.setState({
//     //         currentCard: this.getRandomCard(cardsArray)
//     //     })
//     // }

//     render() {
//         return (
//             <div className="card-container">
//                 <div className="card">
//                     <div className="front">
//                         <p>{this.state.currentCard.cardFront}</p>
//                     </div>
//                     <div className="back">
//                         <p>{this.state.currentCard.cardBack}</p>
//                     </div>
//                 </div>
//             </div>
//         )
//     }
// };

// export default Card;

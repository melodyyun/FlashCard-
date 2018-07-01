import React from "react";
import styled from "styled-components";

//------------------
// Styled components
//------------------

const CardContainer = styled.div`
  position: relative;
`;
class Card extends React.Component {
  constructor() {
    super();
    this.state = {
      cardFlip: false
    };
    this.cardClick = this.cardClick.bind(this);
  }
  cardClick() {
    this.setState(
      {
        cardFlip: !this.state.cardFlip
      },
      () => {
        console.log(this.state.cardFlip);
      }
    );
  }
  render() {
    return (
      <CardContainer className="flip-container" onClick={this.cardClick}>
        <div
          className={
            this.state.cardFlip === true ? "frontFlip flipper" : "flipper"
          }
        >
          <div className="front">
            <p>{this.props.front}</p>
          </div>
          <div className="back">
            <p>{this.props.back}</p>
          </div>
        </div>
      </CardContainer>
    );
  }
}

export default Card;

//------------
// Card Click
//------------

import React from 'react';
import styled from 'styled-components';

//------------------
// Styled components 
//------------------

const CardContainer = styled.div`
    position: relative;
`

const Card = (props) => {
    return(
        <CardContainer className="flip-container">
            <div className="flipper">
                <div className="front">
                    <p>{props.front}</p>
                </div>
                <div className="back">
                    <p>{props.back}</p>
                </div>
            </div>
        </CardContainer>
    )
}

export default Card;



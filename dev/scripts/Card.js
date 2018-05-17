import React from 'react';

const Card = (props) => {
    return(
        <div className="card-container">
            <div className="card">
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
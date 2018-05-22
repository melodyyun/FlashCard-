import React from 'react';
import styled from 'styled-components';

const DeleteB = styled.button`
    z-index: 3;
    position: absolute;
    top: 8%;
    right: 10%;
`

const DeleteCardButton = (props) => {
    return (
        <DeleteB className="delete" onClick={() => props.deleteCard(props.cardIdKey)}><i className="fas fa-times"></i></DeleteB>
    )
}

export default DeleteCardButton;

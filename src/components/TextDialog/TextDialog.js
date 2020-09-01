import React from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Button from '@components/Button';
import styled from 'styled-components';

const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;
`;

function TextDialog({ text, open, onClose }) {
    return (
        <Dialog aria-labelledby="simple-dialog-title" open={open}>
            <DialogTitle id="simple-dialog-title">{text}</DialogTitle>
            <ButtonContainer>
                <Button style={{ marginBottom: '5px' }} onClick={onClose}>close</Button>
            </ButtonContainer>
        </Dialog>
    );
}

export default TextDialog;
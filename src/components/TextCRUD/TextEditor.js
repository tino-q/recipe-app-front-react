import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import useInputState from '@hooks/useInputState';
import Emoji from '@components/Emoji';

const Input = styled.input`
    flex-grow: 1;
`;

// const TextButton = styled.div`
//     font-size: 20px;
//     border: transparent solid 1px;
//     &:hover {
//         border: ${props => props.theme.darkBlue} solid 1px;
//         border-radius: 4px;
//     }
// `;
// 

const EditorContainer = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: space-between;
    margin: 7px;
    max-width: 300px;
`;

const ButtonContainer = styled.div`
    display: flex;
`;


const TextEditor = ({ placeholder, onSubmit, onCancel, value = '', password }) => {
    const [editorValue, editorValueChanged] = useInputState(value);
    const inputRef = useRef(null);
    useEffect(() => {
        inputRef.current.focus();
    });
    return (
        <EditorContainer>
            <Input
                onKeyDown={e => editorValue && e.key === 'Enter' && onSubmit(editorValue)}
                type={password ? "password" : "text"}
                placeholder={placeholder}
                value={editorValue}
                onChange={editorValueChanged}
                maxLength="255"
                ref={inputRef}
            />
            <ButtonContainer>
                <Emoji label="OK" onClick={() => editorValue && onSubmit(editorValue)} emoji="✅" />
                <Emoji label="Cancel" onClick={onCancel} emoji="❌" />
            </ButtonContainer>
        </EditorContainer >
    );
}




export default React.memo(TextEditor);
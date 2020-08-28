import React from 'react';
import styled from 'styled-components';
import useToggleState from '@hooks/useToggleState';
import Emoji from '@components/Emoji';
import TextEditor from './TextEditor';

const Container = styled.li`
    display: flex;
    border: 1px solid black;
    border-radius: 4px;
    width: 100%;
    margin-top: 8px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

const Text = styled.div`
    overflow-wrap: break-word;
    word-break: break-all;
    margin: 10px;
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

const ButtonsContainer = styled.div`
    display: flex;
`;


const ListItem = ({ name, onDelete, onEdit }) => {
    const [isEditing, toggleIsEditing] = useToggleState(false);
    return <Container>
        {
            !isEditing ?
                <Text onDoubleClick={toggleIsEditing}>{name}</Text> :
                <TextEditor
                    onSubmit={onEdit}
                    onCancel={toggleIsEditing}
                    value={name}
                />
        }
        <ButtonsContainer>
            <Emoji label="Edit" onClick={toggleIsEditing} emoji="📝" />
            <Emoji label="Delete" onClick={onDelete} emoji="🗑️" />
        </ButtonsContainer>
    </Container>
}

export default React.memo(ListItem);
import React from 'react';
import styled from 'styled-components';
import useToggleState from '@hooks/useToggleState';
import EmojiButton from '@components/EmojiButton';
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
    color: ${props => props.theme?.theme?.accentColor};
`;

const ButtonsContainer = styled.div`
    display: ${({ isHovering }) => isHovering ? 'inline' : 'none'};
`;

const ListItem = ({ name, onDelete, onEdit }) => {
    const [isEditing, toggleIsEditing] = useToggleState(false);
    const [isHovering, setIsHovering] = useToggleState(false);

    return <Container
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
    >
        {
            !isEditing ?
                <Text onDoubleClick={toggleIsEditing}>{name}</Text> :
                <TextEditor
                    onSubmit={onEdit}
                    onCancel={toggleIsEditing}
                    value={name}
                />
        }
        <ButtonsContainer isHovering={isHovering}>
            <EmojiButton label="Edit" onClick={toggleIsEditing} emoji="📝" />
            <EmojiButton label="Delete" onClick={onDelete} emoji="🗑️" />
        </ButtonsContainer>
    </Container>
}

export default React.memo(ListItem);
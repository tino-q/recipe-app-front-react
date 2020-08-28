import React from 'react';
import ListItem from './ListItem';
import TextEditor from './TextEditor';
import styled from 'styled-components';
import useToggleState from '@hooks/useToggleState';

const List = styled.div`
    display: flex;
    flex-direction: column;
`;

const Container = styled.div`
    display: flex;
    min-height: 25px;
    margin-top: 25px;
    width: 100%;
    justify-content: center;
`;

const Root = styled.div`
    display: flex;
    flex-direction: column;
    width: 50%;
    max-width: 768px;
    min-width: 280px;
`;

const CenteredContainer = styled.div`
    display: flex;
    min-height: 25px;
    width: 100%;
    justify-content: center;
`;

const TextCRUD = ({ tag, items, onCreate, onEdit, placeholder, onDelete, onRefresh }) => {
    const [isEditing, toggleIsEditing] = useToggleState(false);
    return (
        <Root>
            <Container>
                <CenteredContainer>
                    {
                        !isEditing ?
                            <div style={{ width: "100%", display: 'flex', justifyContent: 'space-between' }}>
                                <button onClick={onRefresh}>Refresh</button>
                                <button onClick={toggleIsEditing}>{`Create new ${tag}`}</button>
                            </div> :
                            <TextEditor
                                tag={tag}
                                onSubmit={onCreate}
                                placeholder={placeholder}
                                onCancel={toggleIsEditing}
                            />
                    }
                </CenteredContainer>
            </Container>
            <List>
                {items.map(item => (
                    <ListItem
                        key={item.id}
                        name={item.name}
                        onEdit={newValue => onEdit(item, newValue)}
                        onDelete={() => onDelete(item)}
                    />
                ))}
            </List>
        </Root >
    );
}

export default React.memo(TextCRUD);

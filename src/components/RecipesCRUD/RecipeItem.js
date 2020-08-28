import React, { useContext, useRef, useState } from 'react';
import styled from 'styled-components';
import useToggleState from '@hooks/useToggleState';
import TextEditor from '@components/TextCRUD/TextEditor';
import Emoji from '@components/Emoji';
import { HomeContext } from '@contexts/HomeContext';




const RecipeContainer = styled.li`
    display: flex;
    border: 1px solid black;
    border-radius: 4px;
    width: 100%;
    margin-top: 8px;
    flex-direction: column;
`;

const Text = styled.div`
    overflow-wrap: break-word;
    word-break: break-all;
    margin: 10px;
`;

const Row = styled.div`
    display: flex;
    flex-wrap: wrap;
`;

const CenteredContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Label = styled(Text)`
    min-width: 100px;
    text-align: right;
    align-self: flex-start;
`;

const TagSelector = styled.select`
    flex-grow: 1;
`;

const TagSelectorContainer = styled.div`
    display: flex;
    flex-grow: 1;
    margin: 5px 0px 5px 0px;
`;

const ButtonContainer = styled.div`
    display: flex;
    flex-direction: column;
`;



const RecipeRow = ({ label, value, onEdit }) => {
    const [isEditing, toggleIsEditing] = useToggleState(false);
    return (
        <Row>
            <Label>{label}</Label>
            {
                !isEditing ?
                    <CenteredContainer>
                        <Text onDoubleClick={toggleIsEditing}>{value}</Text>
                        <Emoji label="Edit" onClick={toggleIsEditing} emoji="📝" />
                    </CenteredContainer> :
                    <TextEditor
                        onSubmit={onEdit}
                        value={value}
                        onCancel={toggleIsEditing}
                    />
            }
        </Row>
    )
};


const MultipleSelector = ({ ids, set, label, onUpdateSelected }) => {
    const [isEditing, toggleIsEditing] = useToggleState(false);
    const selectedItems = ids.map(i => set.find(t => t.id === i));
    const [selectedIds, setSelectedIds] = useState(selectedItems.map(i => i.id));
    const inputRef = useRef(null);

    return (
        <Row>
            <Label>{label}</Label>
            {
                isEditing ?
                    <TagSelectorContainer>
                        <TagSelector ref={inputRef} multiple onChange={t => {
                            const a = t.target.value;

                        }} value={set.map(({ id }) => id)}>
                            {set.map(({ id, name }) => (<option value={id} id={id} key={id}>{name}</option>))}
                        </TagSelector>
                        <ButtonContainer>
                            <Emoji label="OK" onClick={() => {
                                const selectedIds = Object.values(inputRef.current.options)
                                    .filter(({ selected }) => selected)
                                    .map(({ id }) => Number(id));
                                onUpdateSelected(selectedIds);
                            }} emoji="✅" />
                            <Emoji label="Cancel" onClick={toggleIsEditing} emoji="❌" />
                        </ButtonContainer>
                    </TagSelectorContainer> :
                    <TagSelectorContainer>
                        <TagSelector multiple disabled value={selectedItems.map(({ id }) => id)}>
                            {selectedItems.map(({ id, name }) => (<option value={id} key={id}>{name}</option>))}
                        </TagSelector>
                        <ButtonContainer>
                            <Emoji label="Edit" onClick={toggleIsEditing} emoji="📝" />
                        </ButtonContainer>
                    </TagSelectorContainer>

            }
        </Row>
    );
}

const RecipeItem = ({ recipe }) => {
    const home = useContext(HomeContext);
    return (
        <RecipeContainer>
            <RecipeRow label="title:" value={recipe.title} onSubmit={alert} onCancel={alert} />
            <RecipeRow label="minutes:" value={recipe.time_minutes} onSubmit={alert} onCancel={alert} />
            <RecipeRow label="price:" value={recipe.price} onSubmit={alert} onCancel={alert} />
            <RecipeRow label="link:" value={recipe.link} onSubmit={alert} onCancel={alert} />
            <MultipleSelector
                label="tags:"
                onUpdateSelected={home.updateTags(recipe)}
                set={home.tags}
                ids={recipe.tags}
            />
            <MultipleSelector
                label="ingredients:"
                onUpdateSelected={home.updateIngredients(recipe)}
                set={home.ingredients}
                ids={recipe.ingredients}
            />
        </RecipeContainer>
    )
}

export default RecipeItem;
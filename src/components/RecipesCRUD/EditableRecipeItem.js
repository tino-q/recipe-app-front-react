import React from 'react';
import styled from 'styled-components';
import useToggleState from '@hooks/useToggleState';
import TextEditor from '@components/TextCRUD/TextEditor';
import Emoji from '@components/Emoji';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

const RecipeContainer = styled.div`
    display: flex;
    border: 1px solid black;
    border-radius: 4px;
    width: 100%;
    margin-top: 8px;
    flex-direction: column;
    padding-bottom: 8px;
`;

const Text = styled.div`
    overflow-wrap: break-word;
    word-break: break-all;
    margin: 10px;
`;


const Row = styled.div`
    display: flex;
    margin: 5px 5px 0px 5px;
`;

const RecipeTextRowControlButtons = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Label = styled(Text)`
    min-width: 100px;
    text-align: right;
    align-self: flex-start;
`;

const MultiSelect = styled(Select)`
    flex-grow: 1;
    color: black;
`;

const DeleteButtonRow = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-end;
`;

const DeleteButton = styled(Emoji)`
    &:hover {
        cursor: pointer;
    }
`;


const RecipeTextRow = ({ label, value, onEdit }) => {
    const [isEditing, toggleIsEditing] = useToggleState(false);
    return (
        <Row>
            <Label>{label}</Label>
            {
                !isEditing ?
                    <RecipeTextRowControlButtons>
                        <Text onDoubleClick={toggleIsEditing}>{value}</Text>
                        <Emoji label="Edit" onClick={toggleIsEditing} emoji="📝" />
                    </RecipeTextRowControlButtons> :
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
    const selectedItems = ids.map(i => set.find(t => t.id === i));
    const toOption = i => ({ value: i.id, label: i.name });
    return (
        <Row>
            <Label>{label}</Label>
            <MultiSelect
                closeMenuOnSelect={false}
                components={makeAnimated()}
                defaultValue={selectedItems.map(toOption)}
                isMulti
                options={set.map(toOption)}
                onChange={selectedOptions => onUpdateSelected((selectedOptions || []).map(o => o.value))}
            />
        </Row>
    );
}


const EditableRecipeItem = ({ recipe, tags, ingredients, patchRecipe, onDelete }) => {
    return (
        <RecipeContainer>
            <RecipeTextRow
                label="title:"
                value={recipe.title}
                onEdit={title => patchRecipe(recipe, { title })}
                onCancel={alert}
            />
            <RecipeTextRow
                label="minutes:"
                value={recipe.time_minutes}
                onEdit={time_minutes => patchRecipe(recipe, { time_minutes })}
                onCancel={alert}
            />
            <RecipeTextRow
                label="price:"
                value={recipe.price}
                onEdit={price => patchRecipe(recipe, { price })}
                onCancel={alert}
            />
            <RecipeTextRow
                label="link:"
                value={recipe.link}
                onEdit={link => patchRecipe(recipe, { link })}
                onCancel={alert}
            />
            <MultipleSelector
                label="tags:"
                onUpdateSelected={tags => patchRecipe(recipe, { tags })}
                set={tags}
                ids={recipe.tags}
            />
            <MultipleSelector
                label="ingredients:"
                onUpdateSelected={ingredients => patchRecipe(recipe, { ingredients })}
                set={ingredients}
                ids={recipe.ingredients}
            />
            {
                onDelete &&
                <Row>
                    <DeleteButtonRow>
                        <DeleteButton label="Delete" onClick={onDelete} emoji="🗑️" />
                    </DeleteButtonRow>
                </Row>
            }
        </RecipeContainer>
    )
}

export default EditableRecipeItem;

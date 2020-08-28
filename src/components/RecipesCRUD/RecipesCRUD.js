import React, { useContext, useState } from 'react';
import Spinner from '@components/Spinner';
import Emoji from '@components/Emoji';
import { HomeContext } from '@contexts/HomeContext';
import EditableRecipeItem from './EditableRecipeItem';
import RecipeEditor from './RecipeEditor';
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
    flex-direction: column;
`;

const ButtonContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
`;


const RECIPE_CREATION_PLACEHOLDER = {
    title: 'New recipe',
    time_minutes: 0,
    price: 0,
    link: '',
    ingredients: [],
    tags: []
}


const RecipeCreationButtons = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-top: 5px;
`;

const Button = styled(Emoji)`
    &:hover {
        cursor: pointer;
    }
`;


const RecipesCRUD = () => {
    const home = useContext(HomeContext);
    const [isCreatingRecipe, toggleIsCreatingRecipe] = useToggleState(false);
    const [recipeForCreation, setRecipeForCreation] = useState(RECIPE_CREATION_PLACEHOLDER)

    if (home.loading || !home.recipes) {
        return <Spinner />
    }

    return (
        <Root>
            {
                !isCreatingRecipe ?
                    <CenteredContainer>
                        <ButtonContainer>
                            <button onClick={home.fetchRecipes}>Refresh</button>
                            <button onClick={toggleIsCreatingRecipe}>{`Create new Recipe`}</button>
                        </ButtonContainer>
                    </CenteredContainer> :
                    <CenteredContainer>
                        <RecipeCreationButtons>
                            <Button label="Create" onClick={() => toggleIsCreatingRecipe() ^ home.createRecipe(recipeForCreation)} emoji="💾" />
                            <Button label="Cancel" onClick={toggleIsCreatingRecipe} emoji="❌" />
                        </RecipeCreationButtons>
                        <EditableRecipeItem
                            recipe={recipeForCreation}
                            tags={home.tags}
                            ingredients={home.ingredients}
                            patchRecipe={(_, params) => setRecipeForCreation({ ...recipeForCreation, ...params })}
                        />

                    </CenteredContainer>
            }
            <List>
                {home.recipes.map(recipe => (
                    <EditableRecipeItem
                        recipe={recipe}
                        tags={home.tags}
                        ingredients={home.ingredients}
                        patchRecipe={home.patchRecipe}
                        onDelete={() => home.deleteRecipe(recipe)}
                    />
                ))}
            </List>
        </Root >
    );
}

export default RecipesCRUD;

import React, { useContext, useState } from 'react';
import Spinner from '@components/Spinner';
import EmojiButton from '@components/EmojiButton';
import Button from '@components/Button';
import { HomeContext } from '@contexts/HomeContext';
import EditableRecipeItem from './EditableRecipeItem';
import styled from 'styled-components';
import useToggleState from '@hooks/useToggleState';

const Root = styled.div`
    display: flex;
    flex-direction: column;
    width: 50%;
    max-width: 768px;
    min-width: 280px;
`;

const CenteredContainer = styled.div`
    display: flex;
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
                            <Button onClick={home.fetch?.recipes}>Refresh</Button>
                            <Button onClick={toggleIsCreatingRecipe}>{`Create new Recipe`}</Button>
                        </ButtonContainer>
                    </CenteredContainer> :
                    <CenteredContainer>
                        <RecipeCreationButtons>
                            <EmojiButton
                                label="Create"
                                onClick={() => toggleIsCreatingRecipe() ^ home.create?.recipe(recipeForCreation)}
                                emoji="💾"
                            />
                            <EmojiButton
                                label="Cancel"
                                onClick={toggleIsCreatingRecipe}
                                emoji="❌"
                            />
                        </RecipeCreationButtons>
                        <EditableRecipeItem
                            recipe={recipeForCreation}
                            patch={(_, params) => setRecipeForCreation({ ...recipeForCreation, ...params })}
                        />

                    </CenteredContainer>
            }
            {
                home.recipes.map(recipe => (
                    <EditableRecipeItem
                        key={recipe.id}
                        recipe={recipe}
                        patch={home.patch?.recipe}
                    />
                ))
            }
        </Root >
    );
}

export default RecipesCRUD;

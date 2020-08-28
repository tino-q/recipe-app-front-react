import React, { useContext } from 'react';
import Spinner from '@components/Spinner';
import { HomeContext } from '@contexts/HomeContext';
// import styled from 'styled-components';
import RecipeItem from './RecipeItem';
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
`;


const RecipesCRUD = () => {
    const home = useContext(HomeContext);
    const [isEditing, toggleIsEditing] = useToggleState(false);

    if (home.loading || !home.recipes) {
        return <Spinner />
    }

    return (
        <Root>
            <Container>
                <CenteredContainer>
                    {
                        !isEditing ?
                            <div style={{ width: "100%", display: 'flex', justifyContent: 'space-between' }}>
                                <button onClick={() => home.fetchRecipes()}>Refresh</button>
                                <button onClick={toggleIsEditing}>{`Create new Recipe`}</button>
                            </div> :
                            <RecipeEditor
                                tag="Recipe"
                                onSubmit={home.createRecipe}
                                placeholder={'eg: chicken pasta'}
                                onCancel={toggleIsEditing}
                            />
                    }
                </CenteredContainer>
            </Container>
            <List>
                {home.recipes.map(recipe => (
                    <RecipeItem
                        key={recipe.id}
                        recipe={recipe}
                        onEdit={updatedRecipe => {
                            debugger;
                        }}
                        onDelete={() => home.deleteRecipe(recipe)}
                    />
                ))}
            </List>
        </Root >
    );
}

export default RecipesCRUD;

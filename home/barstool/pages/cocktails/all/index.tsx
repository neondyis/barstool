import type { NextPage } from 'next';
import {Container, Row, Text} from '@nextui-org/react';
import {gql, useQuery} from '@apollo/client';
import Query_Cocktail from '../../../queries/allCocktailQuery.graphql';

const Recipes: NextPage = () => {
    const { data, loading, error } = useQuery(Query_Cocktail);
    console.log(data)

    return (
            <Container>
                <Row>
                    <Text h2>
                        Recipes
                    </Text>
                </Row>
            </Container>
    )
}

export default Recipes

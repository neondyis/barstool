import type {NextPage} from 'next';
import {Container, Loading, Row, Text} from "@nextui-org/react";
import {useQuery} from "@apollo/client";
import Query_Ingredients from '../../../queries/allIngredientsQuery.graphql';
import ReusableTable from "../../../components/ReusableTable";
import React from "react";

const Ingredients: NextPage = () => {
    const { data, loading, error } = useQuery(Query_Ingredients);

    const columns = [
        {
            key: "name",
            label: "Name",
        },
        {
            key: "alcohol_percentage",
            label: "Alcohol %"
        },
        {
            key: "type",
            label:"Type"
        },
        {
            key: "brand",
            label: "Brand"
        },
        {
            key: "actions",
            label: "Actions"
        }
    ]

    return (
        <Container>
            <Row>
                <Text h2>
                    Recipes
                </Text>
            </Row>
            <Row>
                { !loading ?
                    <ReusableTable columns={columns} data={data}></ReusableTable>
                    :
                    <Row justify='center'>
                        <Loading />
                    </Row>
                }
            </Row>
        </Container>
    )
}

export default Ingredients

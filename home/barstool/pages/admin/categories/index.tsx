import type { NextPage } from 'next';
import {Col, Container, Loading, Row, Text} from "@nextui-org/react";
import {useQuery} from "@apollo/client";
import Query_Ingredient_Types from '../../../queries/allIngredientTypesQuery.graphql';
import React from "react";
import ReusableTable from "../../../components/ReusableTable";

const Category: NextPage = () => {
    const { data, loading, error } = useQuery(Query_Ingredient_Types);

    const columns = [
        {
            key: "key",
            label: "Id",
        },
        {
            key: "name",
            label: "Name",
        },
        {
            key: "actions",
            label: "Actions"
        },
    ];

    return (
            <Container>
                <Row>
                    <Text h2>
                        Ingredient Categories
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

export default Category

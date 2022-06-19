import type { NextPage } from 'next';
import {Col, Container, Row, Table, Text, Tooltip, useAsyncList} from "@nextui-org/react";
import {useQuery} from "@apollo/client";
import Query_Ingredient_Types from '../../../queries/allIngredientTypesQuery.graphql';
import React, {useEffect} from "react";
import {IconButton} from "@mui/material";
import {DeleteOutline, EditOutlined, PanoramaFishEye} from "@mui/icons-material";
import ReusableTable from "../../../components/ReusableTable";

type CategoryType = {
    key: string | number
    name?: string
}

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

    const renderCell = (category: CategoryType, columnKey: React.Key) => {
        // @ts-ignore
        const cellValue = category[columnKey];
        console.log(columnKey)
        switch (columnKey) {
            case "actions":
                return (
                    <Row justify="center" align="center">
                        <Col css={{ d: "flex" }}>
                            <Tooltip content="Details">
                                <IconButton onClick={() => console.log("View Category", category?.key)}>
                                    <PanoramaFishEye/>
                                </IconButton>
                            </Tooltip>
                        </Col>
                        <Col css={{ d: "flex" }}>
                            <Tooltip content="Edit Category">
                                <IconButton onClick={() => console.log("Edit Category", category?.key)}>
                                    <EditOutlined/>
                                </IconButton>
                            </Tooltip>
                        </Col>
                        <Col css={{ d: "flex" }}>
                            <Tooltip
                                content="Delete Category"
                                color="error"
                                onClick={() => console.log("Delete Category", category?.key)}
                            >
                                <IconButton >
                                    <DeleteOutline/>
                                </IconButton>
                            </Tooltip>
                        </Col>
                    </Row>
                );
            default:
                return cellValue;
        }
    };

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
                        <p>Loading</p>
                    }
                </Row>
            </Container>
    )
}

export default Category

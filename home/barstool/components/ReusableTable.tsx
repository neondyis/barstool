import React from "react";
import {Col, Row, Table, Tooltip} from "@nextui-org/react";
import {IconButton} from "@mui/material";
import {DeleteOutline, EditOutlined, PanoramaFishEye} from "@mui/icons-material";
import flattenObject from './flattener'

function ReusableTable ({columns,data}:ReusableTableProps)  {
    let dynamicKey = Object.keys(data);
    data = data[`${dynamicKey[0]}`];
    const flattenData: any[] = [];
    data.forEach((part:any, index:any) => {
        flattenData[index] = flattenObject(data);
    })
    data = flattenData;
    console.log(data)
    console.log(flattenData)

    const renderCell = (category: any, columnKey: React.Key) => {

        const cellValue = category[columnKey];
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

    // @ts-ignore
    return(
        <Table
            bordered
            lined
            aria-label="Example table with dynamic content"
            css={{
                height: "auto",
                minWidth: "100%",
            }}
        >
            <Table.Header columns={columns}>

                {(column: ColumnProp) => (
                    <Table.Column allowsSorting
                                  hideHeader={column.key === "actions"}
                                  align={column.key === "actions" ? "center" : "start"}
                                  key={column.key}>{column.label}</Table.Column>
                )}
            </Table.Header>
            <Table.Body items={data}>
                {(item: any) => (
                    <Table.Row key={item.key}>
                        {(columnKey: React.Key) => <Table.Cell>{renderCell(item, columnKey)}</Table.Cell>}
                    </Table.Row>
                )}
            </Table.Body>
            <Table.Pagination
                shadow
                noMargin
                align="center"
                rowsPerPage={12}
                onPageChange={(page) => console.log({page})}
            />
        </Table>
    )
}

type ColumnProp = {
    key: any
    label: any
}

type ReusableTableProps = {
    columns: any
    data: any
}

export default ReusableTable

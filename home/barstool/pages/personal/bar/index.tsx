import {NextPage} from "next";
import {Button, Col, Container, Row, Spacer, Table, Text, Tooltip, User} from "@nextui-org/react";
import {IconButton} from "@mui/material";
import React from "react";
import {Delete} from "@mui/icons-material";

const Bar: NextPage = () => {
    const columns = [
        { name: "Name", uid: "name" },
        { name: "Alcohol", uid: "alcohol" },
        { name: "Status", uid: "status" },
        { name: "Actions", uid: "actions" },
    ];

    type UserType = {
        id: string | number,
        name?: string,
        email?: string,
        alcohol?: string,
        team?: string,
        status: "active" | "paused" | "vacation",
        age?: string,
        avatar?: string,
    };

    const users: UserType[] = [
        {
            id: 1,
            name: "Tony Reichert",
            alcohol: "CEO",
            team: "Management",
            status: "active",
            age: "29",
            avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
            email: "tony.reichert@example.com",
        },
        {
            id: 2,
            name: "Zoey Lang",
            alcohol: "Technical Lead",
            team: "Development",
            status: "paused",
            age: "25",
            avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
            email: "zoey.lang@example.com",
        },
        {
            id: 3,
            name: "Jane Fisher",
            alcohol: "Senior Developer",
            team: "Development",
            status: "active",
            age: "22",
            avatar: "https://i.pravatar.cc/150?u=a04258114e29026702d",
            email: "jane.fisher@example.com",
        },
        {
            id: 4,
            name: "William Howard",
            alcohol: "Community Manager",
            team: "Marketing",
            status: "vacation",
            age: "28",
            avatar: "https://i.pravatar.cc/150?u=a048581f4e29026701d",
            email: "william.howard@example.com",
        },
        {
            id: 5,
            name: "Kristen Copper",
            alcohol: "Sales Manager",
            team: "Sales",
            status: "active",
            age: "24",
            avatar: "https://i.pravatar.cc/150?u=a092581d4ef9026700d",
            email: "kristen.cooper@example.com",
        },
    ];

    const renderCell = (user: UserType, columnKey: React.Key) => {
        // @ts-ignore
        const cellValue = user[columnKey];
        switch (columnKey) {
            case "name":
                return (
                    <User squared src={user.avatar} name={cellValue} css={{ p: 0 }}>
                        {user.email}
                    </User>
                );
            case "role":
                return (
                    <Col>
                        <Row>
                            <Text b size={14} css={{ tt: "capitalize" }}>
                                {cellValue}
                            </Text>
                        </Row>
                        <Row>
                            <Text b size={13} css={{ tt: "capitalize", color: "$accents7" }}>
                                {user.team}
                            </Text>
                        </Row>
                    </Col>
                );
            case "status":
                return <p>kkk</p>
                // return <StyledBadge type={user.status}>{cellValue}</StyledBadge>;

            case "actions":
                return (
                    <Row justify="center" align="center">
                        <Col css={{ d: "flex" }}>
                            <Tooltip
                                content="Delete"
                                color="success"
                                onClick={() => console.log("Delete user", user.id)}
                            >
                                <IconButton>
                                    <Delete/>
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
    return (
        <Container>
            <Row gap={0}>
                <Text h2>
                    Bar Ingredients
                </Text>
            </Row>
            <Row align='center' justify='space-between'>
                <Button>
                    Add Ingredient
                </Button>
                <Spacer/>
                <Button>
                    Refresh
                </Button>
            </Row>
            <Spacer/>
            <Row justify='center' align='center'>
                <Table
                    aria-label="Example table with custom cells"
                    css={{
                        height: "auto",
                        minWidth: "100%",
                    }}
                    selectionMode="none"
                >
                    <Table.Header columns={columns}>
                        {(column) => (
                            <Table.Column
                                key={column.uid}
                                // hideHeader={column.uid === "actions"}
                                align={column.uid === "actions" ? "center" : "start"}
                            >
                                {column.name}
                            </Table.Column>
                        )}
                    </Table.Header>
                    <Table.Body items={users}>
                        {(item: UserType) => (
                            <Table.Row>
                                {(columnKey) => (
                                    <Table.Cell>{renderCell(item, columnKey)}</Table.Cell>
                                )}
                            </Table.Row>
                        )}
                    </Table.Body>
                </Table>
            </Row>
            <Spacer/>
            <Row>
                <Text h2>
                    Ingredients to get for the Bar
                </Text>
            </Row>
            <Row>
                <Table
                    aria-label="Example table with custom cells"
                    css={{
                        height: "auto",
                        minWidth: "100%",
                    }}
                    selectionMode="none"
                >
                    <Table.Header columns={columns}>
                        {(column) => (
                            <Table.Column
                                key={column.uid}
                                // hideHeader={column.uid === "actions"}
                                align={column.uid === "actions" ? "center" : "start"}
                            >
                                {column.name}
                            </Table.Column>
                        )}
                    </Table.Header>
                    <Table.Body items={users}>
                        {(item: UserType) => (
                            <Table.Row>
                                {(columnKey) => (
                                    <Table.Cell>{renderCell(item, columnKey)}</Table.Cell>
                                )}
                            </Table.Row>
                        )}
                    </Table.Body>
                </Table>
            </Row>
        </Container>
    )
}

export default Bar
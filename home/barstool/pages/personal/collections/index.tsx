import {NextPage} from "next";
import {Button, Container, Row, Text} from "@nextui-org/react";

const Collections: NextPage = () => {
    return (
      <Container>
          <Row>
              <Text h2>
                  My Collections
              </Text>
          </Row>
          <Row justify='space-between'>
              <Button>
                  Create Collection
              </Button>
              <Button>
                  Refresh
              </Button>
          </Row>
      </Container>
    )
}

export default Collections
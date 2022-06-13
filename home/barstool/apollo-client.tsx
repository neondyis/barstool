import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
    uri: "https://bar-stool.herokuapp.com/v1/graphql",
    cache: new InMemoryCache(),
});

export default client;
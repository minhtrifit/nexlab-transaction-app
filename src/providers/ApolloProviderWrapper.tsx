import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

interface PropType {
  children: React.ReactNode;
}

const client = new ApolloClient({
  uri: "http://localhost:5000/graphql",
  cache: new InMemoryCache(),
});

const ApolloProviderWrapper = (props: PropType) => {
  const { children } = props;

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default ApolloProviderWrapper;

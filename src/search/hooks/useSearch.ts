import { useQuery, gql } from "@apollo/client";

const SEARCH = gql`
  query Search($query: String!, $after: String) {
    search(query: $query, type: REPOSITORY, first: 24, after: $after) {
      repositoryCount
      pageInfo {
        endCursor
      }
      edges {
        node {
          ... on Repository {
            id
            name
            languages(orderBy: { direction: DESC, field: SIZE }, first: 1) {
              nodes {
                color
                name
              }
            }
            description
            owner {
              login
              avatarUrl
            }
            stargazerCount
          }
        }
      }
    }
  }
`;

export const useSearch = (searchText: string = "") => {
  const {
    loading,
    data: searchResult,
    error,
    fetchMore,
  } = useQuery(SEARCH, {
    variables: {
      query: searchText,
      after: null,
    },
  });
  return { loading, searchResult, error, fetchMore };
};

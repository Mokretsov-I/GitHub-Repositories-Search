import { useQuery, gql } from "@apollo/client";

const DETAIL_SEARCH = gql`
	query DetailSearch($name: String!, $owner: String!) {
		repository(name: $name, owner: $owner) {
			name
			description
			owner {
				avatarUrl
				login
			}
			languages(first: 50) {
				nodes {
					color
					name
				}
			}
			stargazerCount
			pullRequests {
				totalCount
			}
			issues {
				totalCount
			}
		}
	}
`;

export const useSearchDetail = (name: string, owner: string) => {
	const {
		loading,
		data: searchDetailResult,
		error,
	} = useQuery(DETAIL_SEARCH, {
		variables: {
			name: name,
			owner: owner,
		},
	});
	return { loading, searchDetailResult, error };
};

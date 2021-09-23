import React from "react";
import { NavLink } from "react-router-dom";

import { useSearch } from "search/hooks/useSearch";
import { searchResultType } from "search/modals";

import "./SearchResult.css";

type Props = {
	searchText: string;
};

export const SearchResult: React.FC<Props> = ({ searchText }) => {
	const { searchResult, error, loading, fetchMore } = useSearch(searchText);

	const onLoadMore = (e: any) => {
		const { endCursor } = searchResult.search.pageInfo;
		e.target.disabled = true;
		fetchMore({
			variables: {
				after: endCursor,
			},
			updateQuery: (prevResult: any, { fetchMoreResult }: any) => {
				fetchMoreResult.search.edges = [...prevResult.search.edges, ...fetchMoreResult.search.edges];
				e.target.disabled = false;
				return fetchMoreResult;
			},
		});
	};

	if (loading)
		return (
			<div className="search-result">
				<p>Loading...</p>
			</div>
		);

	if (error) return <p>Error :(</p>;

	if (searchResult.search.repositoryCount === 0)
		return (
			<div className="search-result">
				<h2>Ничего не найдено</h2>
			</div>
		);

	return (
		<div className="search-result">
			<p className="search-result__count">Найдено {searchResult.search.repositoryCount} репозиториев.</p>

			<div className="search-result__items">
				{searchResult.search.edges?.map((repo: searchResultType) => (
					<NavLink
						href="#"
						to={`/repository/${repo.node.name}&${repo.node.owner.login}`}
						key={repo.node.id}
						className="search-result__item search-item"
					>
						<div className="search-item__header">
							<h2 className="search-item__title">{repo.node.name}</h2>
							<div className="search-item__owner">
								<span>
									<img src={repo.node.owner.avatarUrl} alt={repo.node.owner.login} />
								</span>
								<p>{repo.node.owner.login}</p>
							</div>
						</div>
						<div className="search-item__body">
							<h4 className="search-item__description">{repo.node.description}</h4>
						</div>

						<div className="search-item__footer">
							<p className="search-item__language">
								<span
									style={{
										backgroundColor: repo.node.languages?.nodes[0]?.color,
									}}
								></span>
								{repo.node.languages?.nodes[0]?.name}
							</p>

							<p className="search-item__stars">
								<span>&#9734; </span>
								{repo.node.stargazerCount > 1000
									? (repo.node.stargazerCount / 1000).toFixed(1) + "k"
									: repo.node.stargazerCount}
							</p>
						</div>
					</NavLink>
				))}
			</div>
			{searchResult.search.pageInfo.endCursor && (
				<button className="search-result__btn-more" onClick={onLoadMore}>
					Загрузить еще
				</button>
			)}
		</div>
	);
};

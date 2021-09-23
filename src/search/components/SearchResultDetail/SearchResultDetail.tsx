import React from "react";

import { useSearchDetail } from "search/hooks/useSearchDetail";

import "./SearchResultDetail.css";

type Props = {
	name: string;
	owner: string;
};

type ColorType = {
	name: string;
	color: string;
};

export const SearchResultDetail: React.FC<Props> = ({ name, owner }) => {
	const { searchDetailResult, error, loading } = useSearchDetail(name, owner);

	if (loading) return <p>Loading...</p>;

	if (error) return <p>Error :(</p>;

	console.log(searchDetailResult);

	return (
		<div className="search-detail__body">
			<div className="search-item__header">
				<h1 className="search-item__title">{searchDetailResult.repository.name}</h1>
				<div className="search-item__owner">
					<span>
						<img src={searchDetailResult.repository.owner.avatarUrl} alt={searchDetailResult.repository.owner.login} />
					</span>
					<p>{searchDetailResult.repository.owner.login}</p>
				</div>
			</div>
			<h3 className="search-item__description">{searchDetailResult.repository.description}</h3>
			<div className="search-detail__languages">
				{searchDetailResult.repository.languages?.nodes.map((lan: ColorType, index: number) => {
					return (
						<p className="search-item__language" key={lan.name}>
							<span
								style={{
									backgroundColor: lan.color,
								}}
							></span>
							{index === 0 ? <b>{lan.name}</b> : lan.name}
						</p>
					);
				})}
			</div>
			<p className="search-item__pull-requests">
				<span>pullRequests: </span>
				{searchDetailResult.repository.pullRequests.totalCount}
			</p>
			<p className="search-item__issues">
				<span>issues: </span>
				{searchDetailResult.repository.issues.totalCount}
			</p>
			<p className="search-item__stars">
				<span>&#9734; </span>
				{searchDetailResult.repository.stargazerCount > 1000
					? (searchDetailResult.repository.stargazerCount / 1000).toFixed(1) + "k"
					: searchDetailResult.repository.stargazerCount}
			</p>
		</div>
	);
};

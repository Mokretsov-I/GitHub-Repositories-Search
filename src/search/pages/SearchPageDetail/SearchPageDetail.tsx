import React from "react";
import { useParams } from "react-router";
import { NavLink } from "react-router-dom";

import { SearchResultDetail } from "search/components/SearchResultDetail";

import "./SearchPageDetail.css";

export const SearchPageDetail: React.FC = () => {
	const { nameOwner } = useParams<{ nameOwner: string }>();
	const [name, owner] = nameOwner.split("&");

	return (
		<div className="search-detail">
			<NavLink to="/" className="search-detail__back">
				Вернуться к поиску
			</NavLink>
			<SearchResultDetail name={name} owner={owner} />
		</div>
	);
};

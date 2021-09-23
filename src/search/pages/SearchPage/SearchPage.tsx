import React, { FormEvent, useState } from "react";

import { SearchResult } from "../../components/SearchResult";

import "./SearchPage.css";

export const SearchPage: React.FC = () => {
	const [inputText, setInputText] = useState<string>("");
	const [searchText, setSearchText] = useState<string>("");

	const onSubmitSearch = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setSearchText(inputText);
	};

	return (
		<>
			<div className="search-input">
				<form action="" className="search-input__form" onSubmit={onSubmitSearch}>
					<input
						type="text"
						name="search"
						className="search-input__input"
						value={inputText}
						placeholder="Найти в GitHub"
						onChange={(e) => {
							setInputText(e.target.value);
						}}
					/>
					<button type="submit" className="search-input__button"></button>
				</form>
			</div>

			{searchText && <SearchResult searchText={searchText}></SearchResult>}
		</>
	);
};

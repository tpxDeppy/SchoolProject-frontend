import { createContext, useState } from "react";

export const SearchPeopleContext = createContext();

export const SearchPeopleProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showTable, setShowTable] = useState(true);

  const updateSearchQuery = (searchQuery) => {
    setSearchQuery(searchQuery);
  };

  const updateSearchResults = (resultsOfSearch) => {
    setSearchResults(resultsOfSearch);
  };

  const updateError = (searchError) => {
    setError(searchError);
  };

  const updateErrorMessage = (errorMsg) => {
    setErrorMessage(errorMsg);
  };

  const updateShowTable = (showTableData) => {
    setShowTable(showTableData);
  };

  return (
    <SearchPeopleContext.Provider
      value={{
        searchQuery,
        searchResults,
        updateSearchQuery,
        updateSearchResults,
        error,
        updateError,
        errorMessage,
        updateErrorMessage,
        showTable,
        updateShowTable,
      }}
    >
      {children}
    </SearchPeopleContext.Provider>
  );
};

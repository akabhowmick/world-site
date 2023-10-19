/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import React, { useState, useEffect, useContext, useCallback } from "react";

const CountryContext = React.createContext({});

export const CountriesProvider = ({ children }) => {
  const [countries, setCountries] = useState(null);
  const [researchCountries, setResearchCountries] = useState([]);
  const [showResearched, setShowResearched] = useState(false);
  const [state, setState] = useState("loading");

  const findCountryByName = useCallback(
    (name) => {
      if (!countries) return;
      return countries.find((country) => country.name.common === name);
    },
    [countries]
  );

  const findByAltSpelling = (altSpelling) => {
    console.log("findByAltSpelling");
    if (!countries) return;
    return countries.find((country) => country.cca3 === altSpelling);
  };

  const searchInResearch = (name) => {
    return researchCountries.find((country) => country.name.common === name);
  };

  const sortByRating = (researchCountriesArray) => {
    const sortedByRating = researchCountriesArray.sort(
      (a, b) => b.rating - a.rating
    );
    setResearchCountries(sortedByRating);
    localStorage.setItem(
      "researchedCountries",
      JSON.stringify(sortedByRating)
    );
  }

  const addToResearched = (name) => {
    if (searchInResearch) {
      const newCountry = findCountryByName(name);
      newCountry.rating = 0;
      sortByRating([...researchCountries, newCountry]);
    }
  };

  const setResearchRating = (rating, name) => {
    const countryRated = searchInResearch(name);
    countryRated.rating = rating;
    console.log(`setting ${name} rating to ${rating}`)
    const updatedRatingCountries = researchCountries.map((country) =>
      country !== countryRated ? country : countryRated
    );
    sortByRating(updatedRatingCountries);
  };

  useEffect(() => {
    const maybeResearchedCountries = localStorage.getItem(
      "researchedCountries"
    );
    if (maybeResearchedCountries) {
      setResearchCountries(JSON.parse(maybeResearchedCountries));
    }
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(
          "https://restcountries.com/v3.1/all?fields=name,population,region,subregion,capital,flags,cca3,continents,tld,currencies,languages,borders"
        );
        const data = await response.json();
        console.log(data);
        const sorted = data.sort((a, b) => b.population - a.population);
        setCountries(sorted);
        setState("resolved");
      } catch (err) {
        setState("error");
        console.log(err);
      }
    })();
  }, []);

  return (
    <CountryContext.Provider
      value={{
        countries,
        findCountryByName,
        findByAltSpelling,
        state,
        researchCountries,
        addToResearched,
        showResearched,
        setShowResearched,
        setResearchRating,
        searchInResearch,
      }}
    >
      {children}
    </CountryContext.Provider>
  );
};

export const useCountries = () => {
  const {
    countries,
    findCountryByName,
    findByAltSpelling,
    state,
    researchCountries,
    addToResearched,
    showResearched,
    setShowResearched,
    setResearchRating,
    searchInResearch,
  } = useContext(CountryContext);

  return {
    countries,
    findCountryByName,
    findByAltSpelling,
    state,
    researchCountries,
    addToResearched,
    showResearched,
    setShowResearched,
    setResearchRating,
    searchInResearch,
  };
};

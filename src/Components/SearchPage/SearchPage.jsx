import Card from "../Card/Card";
import Filters from "../Filters/Filter";
import { Wrapper, CardsList, StyledLoading } from "./SearchPage.styles";
import { useCountries } from "../../Providers/CountriesProviders";
import { useState } from "react";
import Icon from "../../assets/loadingIcon.svg";

const SearchPage = () => {
  const { countries, state, showResearched, researchCountries } = useCountries();
  const [selectedValue, setSelectedValue] = useState("");
  const [inputValue, setInputValue] = useState("");

  function handleSelectedItemChange({ selectedItem }) {
    setSelectedValue(selectedItem);
  }

  let content;
  if (state === "loading") {
    content = (
      <StyledLoading>
        <img src={Icon} alt="loading-svg" />
        Loading...
      </StyledLoading>
    );
  } else if (state === "resolved") {
    if (!showResearched) {
      const list = countries
        .filter((country) =>
          country.name.common.toLowerCase().includes(inputValue.toLowerCase())
        )
        .filter((country) => {
          return country.continents.some((continent) =>
            continent.toLowerCase().includes(selectedValue.toLowerCase())
          );
        })
        .map((country) => <Card country={country} key={country.name.common} />);
      content = <CardsList>{list}</CardsList>;
    } else {
      const list = researchCountries
        .filter((country) =>
          country.name.common.toLowerCase().includes(inputValue.toLowerCase())
        )
        .filter((country) => {
          return country.continents.some((continent) =>
            continent.toLowerCase().includes(selectedValue.toLowerCase())
          );
        })
        .map((country) => <Card country={country} key={country.name.common} />);
      content = <CardsList>{list}</CardsList>;
    }
  } else {
    content = <h2>Error...</h2>;
  }

  return (
    <Wrapper>
      <Filters
        selectedValue={selectedValue}
        handleSelectedItemChange={handleSelectedItemChange}
        inputValue={inputValue}
        setInputValue={setInputValue}
      />
      {content}
    </Wrapper>
  );
};

export default SearchPage;

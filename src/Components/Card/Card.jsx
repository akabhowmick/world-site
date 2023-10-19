/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useCountries } from "../../Providers/CountriesProviders";
import { Wrapper } from "./Card.styles";
import { StyledLink } from "./Card.styles";
import "./Card.css";

const Card = ({ country }) => {
  const {
    name: { common },
    capital,
    continents: [continent],
    population,
    flags: { svg },
  } = country;
  const {
    addToResearched,
    showResearched,
    setResearchRating,
    searchInResearch,
  } = useCountries();
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [inResearch, setInResearch] = useState(searchInResearch(common));

  useEffect(() => {
    if (inResearch) {
      setRating(country.rating || 0);
    }
  }, [inResearch, country.rating]);

  const handleRatingClick = (index) => {
    setRating(index);
    setResearchRating(index, common);
  };

  const handleAddBtn = () => {
    addToResearched(common);
    setInResearch(true);
  };

  const researchBtn = inResearch ? (
    <button className="research-btn">Added To Researched!</button>
  ) : (
    <button className="research-btn" onClick={() => handleAddBtn()}>
      Add To Researched!
    </button>
  );

  const starRating = (
    <div className="star-rating">
      <div>Country Rating:</div>
      {[...Array(5)].map((star, index) => {
        index += 1;
        return (
          <button
            type="button"
            key={index}
            className={index <= (hover || rating) ? "on" : "off"}
            onClick={() => handleRatingClick(index)}
            onMouseEnter={() => setHover(index)}
            onMouseLeave={() => setHover(rating)}
          >
            <span className="star">&#9733;</span>
          </button>
        );
      })}
    </div>
  );

  return (
    <Wrapper>
      <StyledLink to={`country/${common}`}>
        <img src={svg} alt={common} />
        <div>
          <h3>{common}</h3>
          <p>
            <span>Population:</span> {population}
          </p>
          <p>
            <span>Region:</span> {continent}
          </p>
          <p>
            <span>Capital:</span> {capital}
          </p>
        </div>
      </StyledLink>
      {showResearched ? starRating : researchBtn}
    </Wrapper>
  );
};

export default Card;

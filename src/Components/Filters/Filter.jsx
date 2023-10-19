/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useSelect } from 'downshift';
import { Wrapper, DropdownMenu, InputField, MenuItem, OptionWrapper, StyledButton } from './Filter.styles';
import { useCountries } from '../../Providers/CountriesProviders';

const items = ['', 'Africa', 'America', 'Asia', 'Europe', 'Oceania'];

const Filters = ({ selectedItem: selectedValue, handleSelectedItemChange, inputValue, setInputValue }) => {
  const { isOpen, selectedItem, getToggleButtonProps, getMenuProps, highlightedIndex, getItemProps } = useSelect({
    items,
    selectedItem: selectedValue,
    onSelectedItemChange: handleSelectedItemChange,
  });
  const { setShowResearched, showResearched } = useCountries(); 

  return (
    <Wrapper>
      <InputField>
        <FontAwesomeIcon icon={faSearch} />
        <input placeholder="Search for a country..." value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
      </InputField>
      <StyledButton type="button" onClick={()=>setShowResearched(!showResearched)}>
          {"Researched Countries"}
        </StyledButton>
      <OptionWrapper>
        <StyledButton type="button" {...getToggleButtonProps()}>
          {selectedItem || 'Filter by Region'}
        </StyledButton>
        <DropdownMenu {...getMenuProps()}>
          {isOpen &&
            items.map((item, index) => (
              <MenuItem isHighlighted={highlightedIndex === index} key={`${item}${index}`} {...getItemProps({ item, index })}>
                {item || 'Filter by Region'}
              </MenuItem>
            ))}
        </DropdownMenu>
      </OptionWrapper>
    </Wrapper>
  );
};

export default Filters;
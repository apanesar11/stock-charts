import React, {useState} from "react";
import {Overlay, OverlayBody, CloseButton, SearchField, Button, SearchResults} from "./search-overlay.styles";
import SearchItem from "./components/search-item/search-item.component";
import {BiSearch} from "react-icons/bi";

import {getStockSearch} from "../../../../api";


const SearchOverlay = ({ setModalVisible, addStock }) => {
  const [query, setQuery] = useState('');
  const [queryResults, setQueryResults] = useState([]);

  const searchQuery = async () => {
    const res = await getStockSearch(query);
    const results = res.data;
    setQueryResults(results);
  };

  return (
    <Overlay>
      <CloseButton onClick={() => setModalVisible(false)} title="Close Overlay">x</CloseButton>
      <OverlayBody>
        <SearchField type="text" placeholder="Search Stock..." name="search" value={query} onChange={e => setQuery(e.target.value)}/>
        <Button type="submit" onClick={searchQuery}><BiSearch/></Button>
        <SearchResults>
          {
            queryResults.map(({ticker, name}, id) => (
              <SearchItem
                key={`${ticker}-${id}`}
                ticker={ticker}
                name={name}
                addStock={addStock}
                setModalVisible={setModalVisible}
              />
            ))
          }
        </SearchResults>
      </OverlayBody>
    </Overlay>
  );
};

export default SearchOverlay;

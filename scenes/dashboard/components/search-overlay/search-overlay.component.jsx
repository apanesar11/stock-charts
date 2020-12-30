import React, {useContext, useState} from "react";
import {Overlay, OverlayBody, CloseButton, SearchField, Button, SearchResults} from "./search-overlay.styles";
import SearchItem from "./components/search-item/search-item.component";
import {BiSearch} from "react-icons/bi";

import {UiContext} from "../../../../contexts/ui/ui.context";
import {toggleSearchOverlay} from "../../../../contexts/ui/ui.actions";

import {getStockSearch} from "../../../../api";
import {Circle} from "better-react-spinkit";


const SearchOverlay = () => {
  const { state, dispatch } = useContext(UiContext);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [queryResults, setQueryResults] = useState([]);

  const searchQuery = async () => {
    setLoading(true);
    const res = await getStockSearch(query);
    const results = res.data;
    setQueryResults(results);
    setLoading(false);
  };

  return (
    <Overlay className={`${state.showSearchOverlay ? 'd-block' : 'd-none'}`}>
      <CloseButton onClick={() => dispatch(toggleSearchOverlay())} title="Close Overlay">x</CloseButton>
      <OverlayBody>
        <SearchField
          type="text"
          placeholder="Search Stock..."
          name="search"
          value={query}
          onChange={e => setQuery(e.target.value)}
          onKeyDown={e => (e.key === 'Enter') ? searchQuery() : null}
        />
        <Button type="submit" onClick={searchQuery}><BiSearch/></Button>
        { !loading &&
          <SearchResults>
            {
              queryResults.map(({ticker, name}, id) => (
                <SearchItem
                  key={`${ticker}-${id}`}
                  ticker={ticker}
                  name={name}
                />
              ))
            }
          </SearchResults>
        }
        { loading &&
          <div className='w-100 d-flex align-items-center'>
            <Circle size={100} color='white' className='mx-auto p-5 m-3'/>
          </div>
        }
      </OverlayBody>
    </Overlay>
  );
};

export default SearchOverlay;

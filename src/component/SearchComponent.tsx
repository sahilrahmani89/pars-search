import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setItems, setQuery, setHighlightedIndex } from '../feature/searchSlice';
import { RootState } from '../store/store';
import TextHighLight from './TextHighLight';

const SearchComponent: React.FC = () => {
  const dispatch = useDispatch();
  const { query, filteredItems, highlightedIndex } = useSelector((state: RootState) => state.search);
  const [showClearButton, setShowClearButton] = useState(false);
  const [hoveredItemName, setHoveredItemName] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('https://dws5njpmv35zp.cloudfront.net/Data.json');
      const data = await response.json();
      dispatch(setItems(data));
    };

    fetchData();
  }, [dispatch]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const queryValue = event.target.value;
    dispatch(setQuery(queryValue));
    setShowClearButton(queryValue.length > 0);
    setHoveredItemName(''); // Clear the hovered item name when typing
  }; 

  const handleClear = () => {
    dispatch(setQuery(''));
    setShowClearButton(false);
    setHoveredItemName(''); // Clear the hovered item name when clearing input
  }; // used to convert it to default state

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'ArrowDown') {
      const newIndex = Math.min(highlightedIndex + 1, filteredItems.length - 1);
      dispatch(setHighlightedIndex(newIndex));
      setHoveredItemName(filteredItems[newIndex]?.name || '');
    } else if (event.key === 'ArrowUp') {
      const newIndex = Math.max(highlightedIndex - 1, 0);
      dispatch(setHighlightedIndex(newIndex));
      setHoveredItemName(filteredItems[newIndex]?.name || ''); //set data while in hover operation or keydown operation for input
    }
  };

  const handleMouseOver = (index: number) => {
    dispatch(setHighlightedIndex(index));
    setHoveredItemName(filteredItems[index]?.name || '');
  };

  return (
    <div onKeyDown={handleKeyDown} tabIndex={0}>
      <div style={{ position: 'relative', marginBottom: '10px' }}>
        <input
          type="text"
          value={hoveredItemName || query} // Show hovered item name or query
          onChange={handleSearch}
          placeholder="Search by ID, Name, Address, Pincode, or Items..."
          style={{ width: '300px', padding: '8px', paddingRight: '30px' }}
        />
        {showClearButton && (
          <button
            onClick={handleClear}
            style={{
              position: 'absolute',
              right: '10px',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontSize: '16px',
            }}
          >
            &times;
          </button>
        )}
      </div>
      <div style={{ overflowY: 'auto', maxHeight: '400px', border: '1px solid #ccc', maxWidth: '350px' }}> 
        {query ?
        filteredItems.length > 0 ? (
          filteredItems.map((item, index) => (
            <div
              key={item.id}
              id={`item-${index}`}
              onMouseOver={() => handleMouseOver(index)}
              style={{
                padding: '10px',
                borderBottom: '1px solid #ddd',
                backgroundColor: highlightedIndex === index ? 'lightgray' : 'white',
                cursor: 'pointer',
              }}
            >
              <div><strong>ID:</strong> {TextHighLight(item.id,query)}</div>
              <div><strong>Name:</strong> {TextHighLight(item.name, query)}</div>
              <div><strong>Address:</strong> {TextHighLight(item.address, query)} {TextHighLight(item.pincode, query)}</div>
              {item.items.some((itm: string) => itm.toLowerCase().includes(query.toLowerCase())) && (
                <div><em>{query} found in items</em></div>
              )}
            </div>
          ))
        ) : (
          <div style={{ padding: '10px', textAlign: 'center' }}>No items found</div>
        ): ''}
      </div>
    </div>
  );
};



export default SearchComponent;

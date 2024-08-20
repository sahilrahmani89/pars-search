import React from 'react';
import TextHighLight from './TextHighLight';
import useSearch from '../hooks/useSearch';

const SearchComponent: React.FC = () => {
  const {handleClear,
    handleKeyDown,
    handleMouseOver,
    handleSearch,
    hoveredItemName,
    showClearButton,
    query,
    filteredItems,
    highlightedIndex
  } = useSearch() //custom hook

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

import React , {useState,useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setHighlightedIndex, setItems, setQuery } from '../feature/searchSlice';
import { RootState } from '../store/store';

const useSearch = () =>{
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

  // const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
  //   console.log('howmantimehandledn')
  //   if (event.key === 'ArrowDown') {
  //     const newIndex = Math.min(highlightedIndex + 1, filteredItems.length - 1);
  //     dispatch(setHighlightedIndex(newIndex));
  //     setHoveredItemName(filteredItems[newIndex]?.name || '');
  //   } else if (event.key === 'ArrowUp') {
  //     const newIndex = Math.max(highlightedIndex - 1, 0);
  //     dispatch(setHighlightedIndex(newIndex));
  //     setHoveredItemName(filteredItems[newIndex]?.name || ''); //set data while in hover operation or keydown operation for input
  //   }
  // };
  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'ArrowDown') {
        const newIndex = Math.min(highlightedIndex + 1, filteredItems.length - 1);
        dispatch(setHighlightedIndex(newIndex));
        setHoveredItemName(filteredItems[newIndex]?.name || ''); 

    }
    else if (event.key === 'ArrowUp') {
        const newIndex = Math.max(highlightedIndex - 1, 0); 
        dispatch(setHighlightedIndex(newIndex)); 
        setHoveredItemName(filteredItems[newIndex]?.name || '');
    }
};


useEffect(() => {
    if (filteredItems.length === 0) return; // If no items, no need to scroll
    const container = document.getElementById('scrollable-container');
    const item = document.getElementById(`item-${highlightedIndex}`);
    if (!container || !item) return;
    item.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest', 
    });
}, [highlightedIndex, filteredItems]); 


  const handleMouseOver = (index: number) => {
    dispatch(setHighlightedIndex(index));
    setHoveredItemName(filteredItems[index]?.name || '');
  };
    return{
        handleClear,
        handleKeyDown,
        handleMouseOver,
        handleSearch,
        showClearButton,
        hoveredItemName,
        query,
        filteredItems,
        highlightedIndex,
    }
}

export default useSearch
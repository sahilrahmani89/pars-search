import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SearchState {
  query: string;
  allItems: any[]; 
  filteredItems: any[];
  highlightedIndex: number;
}

const initialState: SearchState = {
  query: '',
  allItems: [],
  filteredItems: [],
  highlightedIndex: -1,
};
// inital state where query works when we search using input keydown(search)
// allItem contains allData from api
// filterItems used while performing operation
// highlightIndex check with index and show selected data while navigation.
const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<any[]>) {
      state.allItems = action.payload;
      state.filteredItems = action.payload; 
    },
    // setItems stored two items allItems & filteredItems
    setQuery(state, action: PayloadAction<string>) {
      state.query = action.payload.toLowerCase();
      state.filteredItems = state.allItems.filter((item) =>
        item.name.toLowerCase().includes(state.query) ||
        item.id.toString().includes(state.query) ||
        item.address.toLowerCase().includes(state.query) ||
        item.pincode.toString().includes(state.query) ||
        item.items.some((itm: string) => itm.toLowerCase().includes(state.query))
      );
    },
    // Setquery  works for filtered out data while  operation being called out
    setHighlightedIndex(state, action: PayloadAction<number>) {
      state.highlightedIndex = action.payload;
    },
    // sethighlightIndex work for set index item while operation such keydown, onhover 
  },
});

export const { setItems, setQuery, setHighlightedIndex } = searchSlice.actions;

export default searchSlice.reducer;

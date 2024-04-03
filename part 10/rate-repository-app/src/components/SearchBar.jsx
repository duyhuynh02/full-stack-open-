import { Searchbar } from 'react-native-paper';

const SearchBar = ( { searchQuery, setSearchQuery }) => {

  return (
    <Searchbar
      placeholder="Search"
      onChangeText={setSearchQuery}
      value={searchQuery}
    />
  );
};

export default SearchBar;
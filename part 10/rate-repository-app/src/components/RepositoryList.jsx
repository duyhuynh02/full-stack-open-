import { FlatList, View, StyleSheet } from 'react-native';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import OrderingRepositories from './OrderingRepositories';
import { useEffect, useState } from "react";
import SearchBar from './SearchBar';
import { useDebounce } from 'use-debounce';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({ repositories, visible, setVisible, 
                                          filter, setFilter,
                                          searchQuery, setSearchQuery 
                                        }) => {
  const repositoryNodes = repositories && repositories.edges
    ? repositories.edges.map(edge => edge.node)
    : []; 

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      ListHeaderComponent={
                          <View> 
                            <SearchBar 
                                searchQuery={searchQuery}
                                setSearchQuery={setSearchQuery}
                            />
                            <OrderingRepositories 
                              visible={visible}
                              setVisible={setVisible}
                              filter={filter}
                              setFilter={setFilter}
                            />
                          </View>
                          }
      renderItem={({ item }) => <RepositoryItem item={item} /> }
    />
  );
};


const RepositoryList = () => {
  const [visible, setVisible] = useState(false); 
  const [filter, setFilter] = useState('latest repositories'); 
  const [orderingType, setOrderingType] = useState('RATING_AVERAGE'); 
  const [orderingDirection, setOrderingDirection] = useState('DESC');
  const [searchQuery, setSearchQuery] = useState(''); 
  const [debouncedQuery] = useDebounce(searchQuery, 500);

  useEffect(() => {
    if (filter === "latest repositories") {
      setOrderingType('CREATED_AT');
      setOrderingDirection('DESC');
    } else {
      setOrderingType('RATING_AVERAGE');
      setOrderingDirection(filter === 'highest rate' ? 'DESC' : 'ASC'); 
    }
  }, [filter]);

  const repositories = useRepositories({ orderBy: orderingType, 
                                        orderDirection: orderingDirection,
                                        searchKeyword: debouncedQuery
                                      });

  return (<RepositoryListContainer 
                repositories={repositories} 
                visible={visible}
                setVisible={setVisible}
                filter={filter}
                setFilter={setFilter}
                searchQuery={debouncedQuery}
                setSearchQuery={setSearchQuery}
            />
  )
};

export default RepositoryList;
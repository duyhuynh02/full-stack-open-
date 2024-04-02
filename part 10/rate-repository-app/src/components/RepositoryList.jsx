import { FlatList, View, StyleSheet } from 'react-native';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import OrderingRepositories from './OrderingRepositories';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({ repositories }) => {
  const repositoryNodes = repositories && repositories.edges
    ? repositories.edges.map(edge => edge.node)
    : []; 

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      ListHeaderComponent={<OrderingRepositories />}
      renderItem={({ item }) => <RepositoryItem item={item} /> }
    />
  );
};


const RepositoryList = () => {
  const repositories = useRepositories();

  return <RepositoryListContainer repositories={repositories} />;
};

export default RepositoryList;
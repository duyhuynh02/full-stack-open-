// import * as Linking from 'expo-linking';
import RepositoryItem from './RepositoryItem';
import { useParams } from 'react-router-native';
import useRepository from '../hooks/useRepository';
import * as Linking from 'expo-linking';
import { View, Button, StyleSheet } from 'react-native';
import theme from '../theme';
import { Text, FlatList } from 'react-native';
import { format } from 'date-fns'

const styles = StyleSheet.create({
    container: {
        paddingTop: 12.5,
        paddingStart: 12.5, 
        paddingEnd: 12.5,
    },
    separator: {
        height: 10,
    }, 
    flexContainer: {
        display: 'flex',
        flexDirection: 'row',
        flexGrow: 0,
    },
    flexFirstRow: {
        display: 'flex',
        padding: 15
    },
    flexSecondRow: {
        display: 'flex',
    },
    rating: {
        width: 52,
        height: 52,  
        borderRadius: 26,
        borderColor: 'blue',
        color: 'blue',
        borderWidth: 3,
        paddingTop: 15,
        textAlign: 'center',
    },
    text: {
        fontSize: theme.fontSizes.body,
        fontWeight: theme.fontWeights.bold, 
    }, 
    date: {
        fontSize: theme.fontSizes.body,
        fontWeight: theme.fontWeights.lighter,   
    }
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryInfo = ({ repository }) => {
    return (
        <View style={styles.container}>
            <RepositoryItem item={repository} />
            <Button 
                onPress={() => Linking.openURL(repository.url)}
                title="Open in Github"
                color={theme.colors.blueBackground}
            />  
        </View>
    )
}

const ReviewItem = ({ review }) => {
    return (
        <View style={styles.flexContainer}>
            <View style={styles.flexFirstRow}>
                <Text style={styles.rating}>{review.rating}</Text>
            </View>
            <View style={styles.flexSecondRow}>
                <Text style={styles.text}>{review.user.username}</Text>
                <Text>{format(review.createdAt, 'MM/dd/yyyy')}</Text>
                <Text>{review.text}</Text>
            </View>
        </View>
    )
};

const SingleRepository = () => {
    const { repoId } = useParams(); 
    const repository  = useRepository(repoId);
    const reviews = repository && repository.reviews?.edges
                    ? repository.reviews.edges.map(edge => edge.node) 
                    : [];  

    return (
        <FlatList 
            data={reviews}
            renderItem={({ item }) => <ReviewItem review={item} />}
            keyExtractor={({ id }) => id}
            ListHeaderComponent={() => <RepositoryInfo repository={repository} />}
            ItemSeparatorComponent={ItemSeparator}
        />
    )
};

export default SingleRepository;
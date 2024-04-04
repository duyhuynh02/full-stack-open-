import { View, StyleSheet } from 'react-native';
import theme from '../theme';
import { Text, FlatList } from 'react-native';
import { format } from 'date-fns'
import useMyReviews from '../hooks/useMyReviews';

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

const ReviewItem = ({ review }) => {
    return (
        <View key={review.repositoryId} style={styles.flexContainer}>
            <View style={styles.flexFirstRow}>
                <Text style={styles.rating}>{review.rating}</Text>
            </View>
            <View style={styles.flexSecondRow}>
                <Text style={styles.text}>{review.repository.name}</Text>
                <Text>{format(review.createdAt, 'MM/dd/yyyy')}</Text>
                <Text>{review.text}</Text>
            </View>
        </View>
    )
};

const MyReviews = () => {
    const reviews = useMyReviews();
    const reviewsNodes = reviews && reviews.edges 
                        ? reviews.edges.map(edge => edge.node) 
                        : [];

    return (
        <FlatList 
            data={reviewsNodes}
            renderItem={({ item }) => <ReviewItem review={item} />}
            keyExtractor={item => item.repositoryId}
            ItemSeparatorComponent={ItemSeparator}
        />
    )
};

export default MyReviews;
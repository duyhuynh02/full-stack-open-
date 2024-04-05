import { View, StyleSheet, Text, FlatList, Button, Alert } from 'react-native';
import theme from '../theme';
import { format } from 'date-fns'
import useMyReviews from '../hooks/useMyReviews';
import { useNavigate } from 'react-router-native';
import useDeleteReview from '../hooks/useDeleteReview';

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
    },
    flexFirstRow: {
        display: 'flex',
        padding: 15
    },
    flexSecondRow: {
        display: 'flex',
        flexDirection: 'column'
    },
    flexThirdRow: {
        flexDirection: 'row',
        paddingHorizontal: 10,
        paddingVertical: 5,
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
    }, 
    deleteButton: {
        color: "#CB4335",
    }
});

const ItemSeparator = () => <View style={styles.separator} />;

const ReviewItem = ({ review, refetch }) => {
    const navigate = useNavigate();
    const [deleteReview] = useDeleteReview();

    const onPressDeleteButton = () => {
        console.log('review id: ', review.id)
        Alert.alert("Delete Review", "Do you really want to delete this review?",[
            {
                text: 'Yes',
                onPress: () => {
                    deleteReview(review.id)
                    refetch();
                },
            },
            {
                text: 'No',
                onPress: () => console.log('The review is still there.')
            }
        ])
    }

    return (
        <View key={review.repositoryId} style={styles.flexContainer}>
            <View style={styles.flexFirstRow}>
                <Text style={styles.rating}>{review.rating}</Text>
            </View>
            <View style={styles.flexSecondRow}>
                <Text style={styles.text}>{review.repository.name}</Text>
                <Text>{format(review.createdAt, 'MM/dd/yyyy')}</Text>
                <Text>{review.text}</Text>
                <View style={styles.flexThirdRow}>
                    <Button title={'View repository'} 
                            onPress={() => navigate(`/repository/${review.repositoryId}`)}
                    />
                    <Button color={styles.deleteButton.color}
                            title={'Delete review'} 
                            onPress={onPressDeleteButton} 
                    />
                </View>
            </View >
        </View>
    )
};



const MyReviews = () => {
    const {reviews, refetch} = useMyReviews();
    const reviewsNodes = reviews && reviews.edges 
                        ? reviews.edges.map(edge => edge.node) 
                        : [];

    return (
        <FlatList 
            data={reviewsNodes}
            renderItem={({ item }) => <ReviewItem review={item} refetch={refetch}/>}
            keyExtractor={item => item.repositoryId}
            ItemSeparatorComponent={ItemSeparator}
        />
    )
};

export default MyReviews;
import { Text, View, Image, StyleSheet, Pressable } from 'react-native';
import theme from '../theme';
import format from '../helper';
import { useNavigate } from 'react-router-native';

const styles = StyleSheet.create({
    flexContainer: {
        display: 'flex',
    },
    flexFirstRow: {
        display: 'flex',
        flexDirection: 'row', 
        flexGrow: 0,
    },
    flexSecondRow: {
        display: 'flex',
        flexGrow: 1, 
        flexDirection: 'row',
        justifyContent: 'space-around',
    }, 
    flexThirdRow: {
        display: 'flex',
    },
    flexSecondColumn: {
        paddingLeft: 12.5,
    },
    logo: {
        width: 56, 
        height: 58,
    },
    text: {
        fontSize: theme.fontSizes.body,
        fontWeight: theme.fontWeights.bold, 
    },
    tag: {
        color: theme.colors.white,
        fontWeight: theme.fontWeights.bold, 
        backgroundColor: theme.colors.primary, 
        alignSelf: 'flex-start',
        borderRadius: 5, 
    }
});


const RepositoryItem = ({ item }) => {
    const navigate = useNavigate();

    const onPress = () => {
        navigate(`/repository/${item.id}`)
    }

    return (
        <Pressable onPress={onPress}>
            <View testID="repositoryItem" style={styles.flexContainer}>
                <View style={styles.flexFirstRow}>
                    <Image 
                        style={styles.logo}
                        source={{uri: item.ownerAvatarUrl}}
                    />
                    <View style={styles.flexSecondColumn}>
                        <Text style={styles.text}>{item.fullName}</Text>
                        <Text>{item.description}</Text>
                        <Text style={styles.tag}>{item.language}</Text>
                    </View>
                </View>

                <View style={styles.flexSecondRow}>
                    <View style={styles.flexThirdRow}>
                        <Text style={styles.text}>{format.format(item.forksCount)}</Text>
                        <Text>Forks</Text>
                    </View>  
                    <View style={styles.flexThirdRow}>
                        <Text style={styles.text}>{format.format(item.stargazersCount)}</Text>
                        <Text>Stars</Text>
                    </View>  
                    <View style={styles.flexThirdRow}>
                        <Text style={styles.text}>{format.format(item.ratingAverage)}</Text>
                        <Text>Ratings</Text>
                    </View>  
                    <View style={styles.flexThirdRow}>
                        <Text style={styles.text}>{format.format(item.reviewCount)}</Text>
                        <Text>Reviews</Text>
                    </View>  
                </View>

            </View>
        </Pressable>
    );
};

export default RepositoryItem;
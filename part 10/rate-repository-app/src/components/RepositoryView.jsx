// import * as Linking from 'expo-linking';
import RepositoryItem from './RepositoryItem';
import { useParams } from 'react-router-native';
import useRepository from '../hooks/useRepository';
import * as Linking from 'expo-linking';
import { View, Button, StyleSheet } from 'react-native';
import theme from '../theme';

const styles = StyleSheet.create({
    container: {
        paddingTop: 12.5,
        paddingStart: 12.5, 
        paddingEnd: 12.5,
    }
});

const RepositoryView = () => {
    const { repoId } = useParams(); 
    const repository  = useRepository(repoId); 


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
};

export default RepositoryView;
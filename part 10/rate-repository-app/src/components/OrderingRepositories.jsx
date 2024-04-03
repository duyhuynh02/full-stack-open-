import { StyleSheet, View, Text} from "react-native";
import { Button, Menu, Divider, PaperProvider } from 'react-native-paper';


const styles = StyleSheet.create({
    container: {
        flex: 1, 
        justifyContent: 'center',
        alignContent: 'center',
        paddingBottom: 240, //i suck with design, this is the only way i can fix right now... 
    },
    buttonContainer: {
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
        elevation: 4,
        justifyContent: "center",
    },
    menuItem: {
        paddingVertical: 12,
        paddingHorizontal: 16,
        fontSize: 16,
        color: '#FFFFFF',
        backgroundColor: "gray",
        fontWeight: "bold"
    }
});

// eslint-disable-next-line no-unused-vars
const OrderingRepositories = ({ visible, setVisible, filter, setFilter }) => {

    const openMenu = () => setVisible(true); 
    const closeMenu = () => setVisible(false); 

    return (
        <PaperProvider>
            <View style={styles.container}>
                <Menu 
                    visible={visible}
                    onDismiss={closeMenu}
                    anchor={<Button onPress={openMenu} style={styles.buttonContainer}>
                                <Text>Select an item...</Text>
                            </Button>
                    }>
                    <Menu.Item 
                        onPress={() => setFilter('latest repositories')} 
                        title="Latest repositories"
                        style={styles.menuItem}
                    />
                    <Divider />
                    <Menu.Item 
                        onPress={() => setFilter('highest rate')} 
                        title="Highest rated repositories" 
                        style={styles.menuItem}/>
                    <Divider />
                    <Menu.Item 
                        onPress={() => setFilter('lowest rate')} 
                        style={styles.menuItem}
                        title="Lowest rated repositories" />   
                    
                </Menu>
            </View>
        </PaperProvider>
    )
}

export default OrderingRepositories; 
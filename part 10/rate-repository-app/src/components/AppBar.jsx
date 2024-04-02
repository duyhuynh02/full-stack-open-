import { View, StyleSheet, Text, Pressable, ScrollView } from 'react-native';
import { Link } from "react-router-native";
import Constants from 'expo-constants';
import theme from '../theme';
import { ME } from '../graphql/queries';
import { useQuery } from '@apollo/client';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    flexDirection: 'row',
    backgroundColor: theme.colors.topBackground,
    paddingBottom: 10,
  },
  text: {
    fontSize: theme.fontSizes.heading,
    fontWeight: theme.fontWeights.bold, 
    color: "white",
    paddingHorizontal: 10,
  }, 
  scrollView: {
    // marginHorizontal: 20, 
  }
});

const AppBar = () => {
  const { data } = useQuery(ME); 
  // console.log('data: ', data);

  return (
    <View style={styles.container}>
      <ScrollView horizontal style={styles.scrollView}>
        <Pressable onPress={() => {}}>
            <View style={{ flexDirection: 'row' }}>
              <Link to="/">
                <Text style={styles.text}>Repositories</Text>
              </Link> 
               {data?.me ? 
               <View>
                  <Link to="/createreview">
                    <Text style={styles.text}>Create a review</Text>
                  </Link>
                  <Link to="/logout">
                    <Text style={styles.text}>Sign out</Text>
                  </Link>
                </View>
                : 
              <View> 
                <Link to="/signup">
                  <Text style={styles.text}>Sign Up</Text>
                </Link>
                <Link to="/login">
                  <Text style={styles.text}>Sign In</Text>
                </Link>
              </View>              
              }
                
            </View>
        </Pressable>
      </ScrollView>
    </View>
  )
};

export default AppBar;
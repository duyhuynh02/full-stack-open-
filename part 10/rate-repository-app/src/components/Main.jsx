import { StyleSheet, View } from 'react-native';
import { Route, Routes, Navigate } from 'react-router-native';

import RepositoryList from './RepositoryList';
import AppBar from './AppBar';
// import theme from '../theme';
import SignIn from './SignIn';
import SignOut from './SignOut';
import SignUp from './SignUp';
import SingleRepository from './SingleRepository';
import Review from './Review';


const styles = StyleSheet.create({
  container: {
    // backgroundColor: theme.colors.mainBackground,
    flexGrow: 1,
    flexShrink: 1,
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
        <AppBar />
        <Routes>
          <Route path="/" element={<RepositoryList />} />
          <Route path="*" element={<Navigate to="/" replace />} /> 
          <Route path="/createreview" element={<Review />}/>
          <Route path="/login" element={<SignIn />}/>
          <Route path="/logout" element={<SignOut />}/>
          <Route path="/signup" element={<SignUp />}/>
          <Route path="/repository/:repoId" element={<SingleRepository />} />

        </Routes>
    </View>
  );
};

export default Main;
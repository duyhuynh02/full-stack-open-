import { useFormik } from 'formik';
import { View, TextInput, Pressable, StyleSheet } from 'react-native';
import { useNavigate } from 'react-router-native';
import Text from './Text'
import theme from '../theme';
import * as yup from 'yup';
import useSignIn from '../hooks/useSignIn';

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    paddingTop: 10,
    paddingLeft: 10
  }
});

const validationSchema = yup.object().shape({
  username: yup.string()
    .min(2, 'Too short!')
    .max(50, 'Too long!')
    .required('Username is required'),
  password: yup.string() 
    .min(2, 'Too short!')
    .max(50, 'Too long!')
    .required('Password is required')
});

export const SignInForm = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues: {
      username: '', 
      password: '',
    },
    validationSchema,
    onSubmit,
  })

  return (
    <View style={styles.container}>
      <TextInput 
        placeholder="Username"
        value={formik.values.username}
        onChangeText={formik.handleChange('username')}
        style={
          formik.touched.username && formik.errors.username && {borderColor: theme.colors.error, borderWidth: 1 }
        }
      />
      {formik.touched.username && formik.errors.username && (
        <Text style={{ color: theme.colors.error }}>{formik.errors.username}</Text>
      )}
      <TextInput 
        placeholder="Password"
        value={formik.values.password}
        secureTextEntry={true}
        onChangeText={formik.handleChange('password')}
        style={
          formik.touched.password && formik.errors.password && {borderColor: theme.colors.error, borderWidth: 1 }
        }
      />
      {formik.touched.password && formik.errors.password && (
        <Text style={{ color: theme.colors.error }}>{formik.errors.password}</Text>
      )}
      <Pressable style={{ backgroundColor: theme.colors.blueBackground }} onPress={formik.handleSubmit}>
        <Text style={{ alignSelf: 'center' }} fontWeight="bold" 
              backgroundColor="blue" fontSize="subHeading" >Sign In</Text>
      </Pressable>
    </View>
  )
};

export const SignInContainer = ({ signIn, navigate }) => {
  // const navigate = useNavigate(); 

  const onSubmit = async (values) => {
    const { username, password } = values; 

    try {
      const { data } = await signIn({ username, password }); 
      // console.log(data);
      navigate("/"); 
    } catch (e) {
      console.log(e);
    }
};

  return <SignInForm onSubmit={onSubmit} />;
}; 

const SignIn = () => {
  const [signIn] = useSignIn();
  const navigate = useNavigate(); 

  return <SignInContainer signIn={signIn} navigate={navigate}/>; 
};

export default SignIn;
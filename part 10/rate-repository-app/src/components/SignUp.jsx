import { useFormik } from 'formik';
import { View, TextInput, Pressable, StyleSheet } from 'react-native';
import Text from './Text'
import theme from '../theme';
import * as yup from 'yup';
import useCreateUser from '../hooks/useCreateUser';

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    paddingTop: 10,
    paddingLeft: 10
  }
});

const validationSchema = yup.object().shape({
  username: yup.string()
    .min(5, 'Too short!')
    .max(30, 'Too long!')
    .required('Username is required'),
  password: yup.string()
    .min(5, 'Too short!')
    .max(50, 'Too long!')
    .required('Password is required'),
  passwordConfirmation: yup.string()
    .oneOf([yup.ref('password'), 'Password must be matched'])
    .required('Password confirmation is required')
});

export const SignUpForm = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues: {
      username: '', 
      password: '',
      passwordConfirmation: '', 
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
        secureTextEntry={true}
        value={formik.values.password}
        onChangeText={formik.handleChange('password')}
        style={
          formik.touched.password && formik.errors.password && {borderColor: theme.colors.error, borderWidth: 1 }
        }
      />
      {formik.touched.password && formik.errors.password && (
        <Text style={{ color: theme.colors.error }}>{formik.errors.password}</Text>
      )}

      <TextInput 
        placeholder="Enter the same passowrd"
        secureTextEntry={true}
        value={formik.values.passwordConfirmation}
        onChangeText={formik.handleChange('passwordConfirmation')}
        style={
          formik.touched.passwordConfirmation && formik.errors.passwordConfirmation && {borderColor: theme.colors.error, borderWidth: 1 }
        }
      />
      {formik.touched.passwordConfirmation && formik.errors.passwordConfirmation && (
        <Text style={{ color: theme.colors.error }}>{formik.errors.passwordConfirmation}</Text>
      )}

      <Pressable style={{ backgroundColor: theme.colors.blueBackground }} onPress={formik.handleSubmit}>
        <Text style={{ alignSelf: 'center' }} fontWeight="bold" 
              backgroundColor="blue" fontSize="subHeading" >Create new user</Text>
      </Pressable>

    </View>
  )
};

const SignUp = () => {
  const [createUser] = useCreateUser();

  const onSubmit = async (values) => {
    const { username, password } = values; 
    try {
        const { data } = await createUser({ username, password }); 
        // console.log(data);
    } catch (e) {
        console.log(e); 
    }
  };

  return <SignUpForm onSubmit={onSubmit} />; 

};

export default SignUp;
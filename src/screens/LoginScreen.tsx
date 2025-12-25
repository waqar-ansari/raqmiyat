import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useForm, SubmitHandler } from 'react-hook-form';
import { FormInput } from '../components/FormInput';
import { emailRules, passwordRules } from '../utils/inputValidations';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { UserRoutes } from '../types';
import Colors from '../theme/colors';

type LoginFormValues = {
  email: string;
  password: string;
};

const LoginScreen = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    defaultValues: { email: 'waqar@raqmiyat.com', password: 'asdfgh' },
  });
  type LoginScreenNavigationProp = NativeStackNavigationProp<
    UserRoutes,
    'Login'
  >;
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const onSubmit: SubmitHandler<LoginFormValues> = () => {
    navigation.replace('Users');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <FormInput
        control={control}
        name="email"
        label="Email"
        placeholder="Enter your email"
        keyboardType="email-address"
        autoCapitalize="none"
        error={errors.email?.message}
        rules={emailRules}
      />

      <FormInput
        control={control}
        name="password"
        label="Password"
        placeholder="Enter your password"
        secureTextEntry
        error={errors.password?.message}
        rules={passwordRules}
      />
      <TouchableOpacity
        style={styles.loginButton}
        onPress={handleSubmit(onSubmit)}
      >
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: Colors.white,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  loginButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
  },
  loginButtonText: {
    color: Colors.white,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default LoginScreen;

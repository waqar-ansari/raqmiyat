import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Switch } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { User } from '../types';
import { FormInput } from './FormInput';
import { emailRules, nameRules, phoneNumberRules } from '../utils/inputValidations';
import Colors from '../theme/colors';

type Props = {
  defaultValues: Omit<User, 'id'>;
  onSubmit: (data: Omit<User, 'id'>) => void;
};

const UserForm = ({ defaultValues, onSubmit }: Props) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Omit<User, 'id'>>({
    defaultValues,
  });

  return (
    <View style={styles.container}>
      <FormInput
        control={control}
        name="name"
        label="Name"
        placeholder="Enter name"
        rules={nameRules}
        error={errors.name?.message}
      />

      <FormInput
        control={control}
        name="email"
        label="Email"
        placeholder="Enter email"
        keyboardType="email-address"
        autoCapitalize="none"
        rules={emailRules}
        error={errors.email?.message}
      />

      <FormInput
        control={control}
        name="phone"
        label="Phone"
        placeholder="Phone number"
        keyboardType="phone-pad"
        rules={phoneNumberRules}
        error={errors.phone?.message}
      />

      <FormInput
        control={control}
        name="age"
        label="Age"
        placeholder="Age"
        keyboardType="numeric"
        error={errors.age?.message}
      />

      <Controller
        control={control}
        name="isActive"
        render={({ field: { onChange, value } }) => (
          <View style={styles.switchContainer}>
            <Text>Active User</Text>
            <Switch value={value} onValueChange={onChange} />
          </View>
        )}
      />

      <TouchableOpacity
        style={styles.saveButton}
        onPress={handleSubmit(onSubmit)}
      >
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

export default UserForm;


const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: Colors.white,
    borderRadius: 12,
    margin: 20,
    shadowColor: Colors.black,
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.borderColor,
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: Colors.mainBackground,
  },
  multiline: {
    height: 80,
    textAlignVertical: 'top',
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  switchLabel: {
    fontSize: 16,
    color: '#333',
  },
  saveButton: {
    backgroundColor: Colors.success,
    paddingVertical: 12,
    borderRadius: 12,
  },
  saveButtonText: {
    color: Colors.white,
    fontWeight: '600',
    textAlign: 'center',
    fontSize: 16,
  },
  inputError: {
    borderColor: Colors.error,
  },

  errorText: {
    color: Colors.error,
    fontSize: 13,
    marginBottom: 10,
  },
});

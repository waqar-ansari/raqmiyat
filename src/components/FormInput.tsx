import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TextInputProps,
  TouchableOpacity,
} from 'react-native';
import {
  Control,
  Controller,
  FieldValues,
  Path,
  RegisterOptions,
} from 'react-hook-form';
import Colors from '../theme/colors';

type Props<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  rules?: RegisterOptions<T, Path<T>>;
  label?: string;
  error?: string;
} & TextInputProps;

export function FormInput<T extends FieldValues>({
  control,
  name,
  rules,
  label,
  error,
  secureTextEntry,
  ...inputProps
}: Props<T>) {
  const [showPassword, setShowPassword] = useState(false);

  const isPasswordField = secureTextEntry;

  return (
    <View style={styles.wrapper}>
      {label && <Text style={styles.label}>{label}</Text>}

      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({ field: { onChange, value } }) => (
          <View style={styles.inputWrapper}>
            <TextInput
              {...inputProps}
              style={[
                styles.input,
                error && styles.inputError,
                isPasswordField && styles.inputWithIcon,
              ]}
              value={value?.toString() ?? ''}
              onChangeText={onChange}
              secureTextEntry={isPasswordField && !showPassword}
            />

            {isPasswordField && (
              <TouchableOpacity
                style={styles.icon}
                onPress={() => setShowPassword(!showPassword)}
              >
                <Text style={styles.emoji}>
                  {showPassword ? '❌' : '👁️'}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      />

      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 14,
  },
  label: {
    marginBottom: 6,
    fontSize: 14,
    color: Colors.black,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: Colors.borderColor,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: Colors.mainBackground,
  },
  inputWithIcon: {
    paddingRight: 40,
  },
  icon: {
    position: 'absolute',
    right: 12,
  },
  emoji: {
    fontSize: 20,
  },
  inputError: {
    borderColor: Colors.error,
  },
  error: {
    color: Colors.error,
    fontSize: 12,
    marginTop: 4,
  },
});

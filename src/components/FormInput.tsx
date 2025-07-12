import React from 'react';
import { View, Text, TextInput, StyleSheet, TextInputProps } from 'react-native';
import { Control, Controller } from 'react-hook-form';
import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS } from '../theme/theme';

interface FormInputProps extends TextInputProps {
  control: Control<any>;
  name: string;
  label: string;
  error?: string;
}

const FormInput: React.FC<FormInputProps> = ({
  control,
  name,
  label,
  error,
  ...props
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={[styles.input, error && styles.inputError]}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholderTextColor={COLORS.gray[400]}
            {...props}
          />
        )}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: SPACING[4],
  },
  label: {
    fontSize: TYPOGRAPHY.fontSize.base,
    fontWeight: '600',
    color: COLORS.text.primary,
    marginBottom: SPACING[2],
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.gray[300],
    borderRadius: BORDER_RADIUS.base,
    padding: SPACING[3],
    fontSize: TYPOGRAPHY.fontSize.base,
    backgroundColor: COLORS.white,
    color: COLORS.text.primary,
  },
  inputError: {
    borderColor: COLORS.error,
  },
  errorText: {
    color: COLORS.text.error,
    fontSize: TYPOGRAPHY.fontSize.sm,
    marginTop: SPACING[1],
  },
});

export default FormInput; 

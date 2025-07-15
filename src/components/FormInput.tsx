import React from 'react';
import { View, Text, TextInput, StyleSheet, TextInputProps } from 'react-native';
import { Control, Controller } from 'react-hook-form';
import { Colors } from '@/constants/Colors';
import { BorderRadius, Spacing, Typography, Shadows } from '@/constants/Metrics';

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
          <View style={[styles.inputContainer, error && styles.inputError]}>
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholderTextColor={Colors.light.placeholder}
              {...props}
            />
          </View>
        )}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing.medium,
    
  },
    label: {
    fontSize: Typography.fontSize.xs,
    fontWeight: Typography.fontWeight.medium,
    color: Colors.darkGray,
    fontFamily: Typography.fontFamily.poppinsRegular,
    marginBottom: 2,
    marginLeft: Spacing.medium,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: Colors.light.inputBorder,
    borderRadius: BorderRadius.medium,
    backgroundColor: Colors.white,
    paddingVertical: Spacing.xsmall,
    marginBottom: Spacing.medium,
  },
  input: {
    flex: 1,
    paddingHorizontal: Spacing.medium,
    paddingVertical: Spacing.small,
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.black,
    fontFamily: Typography.fontFamily.poppinsRegular,
    borderWidth: 0,
  },
  inputError: {
    borderColor: Colors.error,
  },
  errorText: {
    color: Colors.error,
    fontSize: Typography.fontSize.sm,
    marginTop: Spacing.small,
  },
});

export default FormInput; 

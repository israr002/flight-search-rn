import React from 'react';
import { View, Text, TextInput, StyleSheet, TextInputProps } from 'react-native';
import { Control, Controller } from 'react-hook-form';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { BorderRadius, Spacing, Typography, Shadows } from '@/constants/Metrics';

interface FormInputProps extends TextInputProps {
  control: Control<any>;
  name: string;
  label: string;
  error?: string;
  iconName?: keyof typeof Ionicons.glyphMap;
}

const FormInput: React.FC<FormInputProps> = ({
  control,
  name,
  label,
  error,
  iconName,
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
            {iconName && (
              <Ionicons 
                name={iconName} 
                size={20} 
                color={Colors.blue} 
                style={styles.icon} 
              />
            )}
            <TextInput
              style={[styles.input, iconName && styles.inputWithIcon]}
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
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.medium,
    color: Colors.darkGray,

  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: Colors.light.inputBorder,
    borderRadius: BorderRadius.medium,
    backgroundColor: Colors.white,
    minHeight: 56,
  },
  icon: {

    marginRight: Spacing.small,
  },
  input: {
    flex: 1,
    padding: Spacing.medium,
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.black,
    borderWidth: 0,
  },
  inputWithIcon: {
    paddingLeft: 0,
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

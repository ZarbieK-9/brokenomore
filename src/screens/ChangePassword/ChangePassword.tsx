// src/screens/change-password.tsx

import React from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';

const ChangePassword: React.FC = () => {
  const [currentPassword, setCurrentPassword] = React.useState('');
  const [newPassword, setNewPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [isSecureEntry, setIsSecureEntry] = React.useState(true);

  const toggleSecureEntry = () => {
    setIsSecureEntry(!isSecureEntry);
  };

  const handleChangePassword = () => {
    // Handle password change logic
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Change Password</Text>
      <View style={styles.formContainer}>
        <Text style={styles.label}>Current Password</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={currentPassword}
            onChangeText={setCurrentPassword}
            placeholder="Current Password"
            secureTextEntry={isSecureEntry}
          />
          <TouchableOpacity onPress={toggleSecureEntry}>
            <Text style={styles.eyeIcon}>👁️</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.label}>New Password</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={newPassword}
            onChangeText={setNewPassword}
            placeholder="New Password"
            secureTextEntry={isSecureEntry}
          />
          <TouchableOpacity onPress={toggleSecureEntry}>
            <Text style={styles.eyeIcon}>👁️</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.label}>Confirm Password</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholder="Confirm Password"
            secureTextEntry={isSecureEntry}
          />
          <TouchableOpacity onPress={toggleSecureEntry}>
            <Text style={styles.eyeIcon}>👁️</Text>
          </TouchableOpacity>
        </View>
        <Button title="Change Password" onPress={handleChangePassword} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E6F7F2',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  formContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    backgroundColor: '#F0F0F0',
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    padding: 10,
  },
  eyeIcon: {
    fontSize: 18,
    color: '#666',
  },
});

export default ChangePassword;
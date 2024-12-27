import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

// Fixing the type of the value parameter
export default function App() {
  const [input, setInput] = useState<string>('');
  const [result, setResult] = useState<string>('');

  const handlePress = (value: string): void => {
    if (value === '=') {
      try {
        setResult(eval(input)); // Use cautiously, only for this demo.
      } catch {
        setResult('Error');
      }
    } else if (value === 'C') {
      setInput('');
      setResult('');
    } else {
      setInput(input + value);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.result}>{result || input || '0'}</Text>
      <View style={styles.row}>
        {['7', '8', '9', '/'].map((btn) => (
          <Button key={btn} value={btn} onPress={handlePress} />
        ))}
      </View>
      <View style={styles.row}>
        {['4', '5', '6', '*'].map((btn) => (
          <Button key={btn} value={btn} onPress={handlePress} />
        ))}
      </View>
      <View style={styles.row}>
        {['1', '2', '3', '-'].map((btn) => (
          <Button key={btn} value={btn} onPress={handlePress} />
        ))}
      </View>
      <View style={styles.row}>
        {['C', '0', '=', '+'].map((btn) => (
          <Button key={btn} value={btn} onPress={handlePress} isEqualButton={btn === '='} />
        ))}
      </View>
      
      {/* Footer */}
      <Text style={styles.footer}>Calc by Pratham</Text>
    </View>
  );
}

// Explicitly define types for Button component
type ButtonProps = {
  value: string;
  onPress: (value: string) => void;
  isEqualButton?: boolean; // Optional prop to style '=' button differently
};

const Button: React.FC<ButtonProps> = ({ value, onPress, isEqualButton }) => (
  <TouchableOpacity
    style={[styles.button, isEqualButton && styles.equalButton]} // Apply green background if '=' button
    onPress={() => onPress(value)}
  >
    <Text style={styles.buttonText}>{value}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  result: { fontSize: 40, marginBottom: 20 },
  row: { flexDirection: 'row', marginBottom: 10 },
  button: { padding: 20, backgroundColor: '#ddd', margin: 5, borderRadius: 5 },
  buttonText: { fontSize: 20 },
  equalButton: { backgroundColor: 'green' }, // Green background for '=' button
  footer: { 
    position: 'absolute', 
    bottom: 20, 
    fontSize: 16, 
    color: 'gray' 
  },
});
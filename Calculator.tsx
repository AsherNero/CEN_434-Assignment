import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, Dimensions } from 'react-native';

const Calculator = () => {
  const [num1, setNum1] = useState('');
  const [num2, setNum2] = useState('');
  const [result, setResult] = useState<number | string>('---');

  const calculate = (operation: string) => {
    const a = parseFloat(num1);
    const b = parseFloat(num2);
    if (isNaN(a) || isNaN(b)) {
      setResult('Invalid Input');
      return;
    }

    switch (operation) {
      case '+': setResult(a + b); break;
      case '-': setResult(a - b); break;
      case '*': setResult(a * b); break;
      case '/': setResult(b !== 0 ? (a / b).toFixed(2) : 'Error'); break;
    }
  };

  return (
    <View style={styles.mainWrapper}>
      <View style={styles.glassCard}>
        <Text style={styles.header}>Calculator</Text>
        
        <View style={styles.displayArea}>
          <Text style={styles.resultLabel}>TOTAL</Text>
          <Text style={styles.resultValue}>{result}</Text>
        </View>

        <View style={styles.inputGroup}>
          <TextInput 
            style={styles.customInput} 
            keyboardType="numeric" 
            value={num1} 
            onChangeText={setNum1} 
            placeholder="0.00" 
            placeholderTextColor="#999"
          />
          <TextInput 
            style={styles.customInput} 
            keyboardType="numeric" 
            value={num2} 
            onChangeText={setNum2} 
            placeholder="0.00" 
            placeholderTextColor="#999"
          />
        </View>
        
        <View style={styles.operatorRow}>
          {['+', '-', '*', '/'].map((op) => (
            <TouchableOpacity 
              key={op} 
              style={styles.opButton} 
              onPress={() => calculate(op)}
              activeOpacity={0.7}
            >
              <Text style={styles.opText}>{op === '*' ? '×' : op === '/' ? '÷' : op}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity 
          style={styles.resetBtn} 
          onPress={() => {setNum1(''); setNum2(''); setResult('---');}}
        >
          <Text style={styles.resetText}>CLEAR</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainWrapper: {
    flex: 1,
    backgroundColor: '#F0F2F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  glassCard: {
    width: Dimensions.get('window').width * 0.85,
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    padding: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.1,
    shadowRadius: 30,
    elevation: 12,
  },
  header: {
    fontSize: 14,
    fontWeight: '800',
    color: '#333',
    letterSpacing: 2,
    textAlign: 'center',
    marginBottom: 20,
    textTransform: 'uppercase',
  },
  displayArea: {
    backgroundColor: '#1A1A1A',
    borderRadius: 20,
    padding: 20,
    marginBottom: 25,
    alignItems: 'flex-end',
  },
  resultLabel: {
    color: '#666',
    fontSize: 10,
    fontWeight: '700',
    marginBottom: 5,
  },
  resultValue: {
    color: '#00FFCC',
    fontSize: 32,
    fontWeight: '300',
  },
  inputGroup: {
    gap: 12,
    marginBottom: 20,
  },
  customInput: {
    height: 55,
    backgroundColor: '#F8F9FA',
    borderRadius: 15,
    paddingHorizontal: 20,
    fontSize: 18,
    color: '#333',
    borderWidth: 1,
    borderColor: '#EEE',
  },
  operatorRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  opButton: {
    width: 60,
    height: 60,
    backgroundColor: '#eaaf57ff',
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#ff6363ff',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  opText: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: '600',
  },
  resetBtn: {
    padding: 15,
    alignItems: 'center',
  },
  resetText: {
    color: '#FF5C5C',
    fontWeight: '700',
    fontSize: 12,
    letterSpacing: 1,
  }
});

export default Calculator;
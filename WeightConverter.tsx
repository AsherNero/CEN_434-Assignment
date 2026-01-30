import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, Animated } from 'react-native';

const WeightConverter = () => {
  const [kg, setKg] = useState('');
  const pounds = kg ? (parseFloat(kg) * 2.20462).toFixed(2) : '0.00';

  return (
    <View style={styles.screen}>
      <View style={styles.converterCard}>
        <View style={styles.headerRow}>
          <Text style={styles.title}>Unit Converter</Text>
          <View style={styles.activeBadge}>
            <Text style={styles.badgeText}>Metric to Imperial</Text>
          </View>
        </View>

        <View style={styles.inputSection}>
          <Text style={styles.unitLabel}>KILOGRAMS</Text>
          <TextInput
            style={styles.massiveInput}
            keyboardType="numeric"
            placeholder="0"
            placeholderTextColor="#E0E0E0"
            value={kg}
            onChangeText={setKg}
            maxLength={6}
          />
        </View>

        <View style={styles.divider}>
          <View style={styles.line} />
          <View style={styles.swapCircle}>
            <Text style={styles.swapIcon}>↓</Text>
          </View>
          <View style={styles.line} />
        </View>

        <View style={styles.resultSection}>
          <Text style={styles.unitLabel}>POUNDS (LBS)</Text>
          <View style={styles.resultValueContainer}>
            <Text style={styles.resultValue}>{pounds}</Text>
            <TouchableOpacity 
              style={styles.copyButton}
              onPress={() => { /* Add copy functionality if desired */ }}
            >
              <Text style={styles.copyText}>COPY</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      
      <Text style={styles.hint}>Conversion Factor: 1 kg = 2.204 lbs</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    padding: 20,
  },
  converterCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 32,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 15 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 8,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 16,
    fontWeight: '800',
    color: '#111827',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  activeBadge: {
    backgroundColor: '#EEF2FF',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  badgeText: {
    color: '#cabf43ff',
    fontSize: 10,
    fontWeight: '700',
  },
  inputSection: {
    marginBottom: 10,
  },
  unitLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#9CA3AF',
    letterSpacing: 1.5,
    marginBottom: 8,
  },
  massiveInput: {
    fontSize: 56,
    fontWeight: '300',
    color: '#111827',
    paddingVertical: 10,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#F3F4F6',
  },
  swapCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#d8b34fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 15,
  },
  swapIcon: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  resultSection: {
    marginTop: 10,
  },
  resultValueContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  resultValue: {
    fontSize: 48,
    fontWeight: '600',
    color: '#d7c141ff',
  },
  copyButton: {
    padding: 8,
  },
  copyText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#9CA3AF',
  },
  hint: {
    textAlign: 'center',
    marginTop: 20,
    color: '#9CA3AF',
    fontSize: 12,
  }
});

export default WeightConverter;
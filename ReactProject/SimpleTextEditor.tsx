import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';

const SimpleTextEditor = () => {
  const [text, setText] = useState('');
  const [savedText, setSavedText] = useState('');

  const saveText = () => setSavedText(text);
  const clearText = () => {
    setText('');
    setSavedText('');
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
      style={styles.screen}
    >
      <View style={styles.editorCard}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Draft Pad</Text>
          <View style={styles.statusIndicator}>
            <View style={[styles.dot, { backgroundColor: text ? '#FFD700' : '#E0E0E0' }]} />
            <Text style={styles.statusText}>{text ? 'Unsaved' : 'Empty'}</Text>
          </View>
        </View>

        <TextInput
          style={styles.textArea}
          multiline
          placeholder="Start writing something great..."
          placeholderTextColor="#A0A0A0"
          value={text}
          onChangeText={setText}
          textAlignVertical="top"
        />

        <View style={styles.actionRow}>
          <TouchableOpacity style={styles.clearBtn} onPress={clearText}>
            <Text style={styles.clearBtnText}>Discard</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.saveBtn, !text && styles.disabledBtn]} 
            onPress={saveText}
            disabled={!text}
          >
            <Text style={styles.saveBtnText}>Save Note</Text>
          </TouchableOpacity>
        </View>
      </View>

      {savedText ? (
        <View style={styles.previewCard}>
          <Text style={styles.previewLabel}>SAVED MEMO</Text>
          <ScrollView style={styles.previewScroll}>
            <Text style={styles.previewContent}>{savedText}</Text>
          </ScrollView>
        </View>
      ) : null}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F9FBFC',
    padding: 20,
    justifyContent: 'center',
  },
  editorCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 20,
    shadowColor: '#171717',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#2D3436',
    letterSpacing: -0.5,
  },
  statusIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F2F5',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 6,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#636E72',
    textTransform: 'uppercase',
  },
  textArea: {
    height: 150,
    fontSize: 16,
    color: '#2D3436',
    backgroundColor: '#FAFAFA',
    borderRadius: 15,
    padding: 15,
    lineHeight: 22,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 20,
    gap: 12,
  },
  clearBtn: {
    paddingVertical: 12,
    paddingHorizontal: 18,
  },
  clearBtnText: {
    color: '#FF7675',
    fontWeight: '700',
    fontSize: 14,
  },
  saveBtn: {
    backgroundColor: '#0984E3',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    shadowColor: '#0984E3',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  disabledBtn: {
    backgroundColor: '#B2BEC3',
    shadowOpacity: 0,
  },
  saveBtnText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 14,
  },
  previewCard: {
    marginTop: 20,
    backgroundColor: '#E1F5FE',
    borderRadius: 20,
    padding: 20,
    maxHeight: 200,
  },
  previewLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: '#01579B',
    marginBottom: 8,
    letterSpacing: 1,
  },
  previewScroll: {
    marginTop: 5,
  },
  previewContent: {
    fontSize: 15,
    color: '#0277BD',
    lineHeight: 20,
    fontStyle: 'italic',
  },
});

export default SimpleTextEditor;
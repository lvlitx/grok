import React from 'react';
import { StyleSheet, Text, View, ScrollView, ActivityIndicator } from 'react-native';
import { colors } from '@/constants/colors';

type AnalysisResultProps = {
  description: string | null;
  isLoading: boolean;
  error: string | null;
};

export const AnalysisResult: React.FC<AnalysisResultProps> = ({ 
  description, 
  isLoading,
  error
}) => {
  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.loadingText}>Analyzing image...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorTitle}>Error</Text>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  if (!description) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Image Description</Text>
      <ScrollView style={styles.scrollContainer}>
        <Text style={styles.description}>{description}</Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.lightGray,
    borderRadius: 12,
    padding: 16,
    marginTop: 16,
    width: '100%',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 12,
  },
  scrollContainer: {
    maxHeight: 200,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: colors.text,
  },
  loadingContainer: {
    backgroundColor: colors.lightGray,
    borderRadius: 12,
    padding: 20,
    marginTop: 16,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: colors.text,
    fontWeight: '500',
  },
  errorContainer: {
    backgroundColor: colors.lightGray,
    borderRadius: 12,
    padding: 16,
    marginTop: 16,
    width: '100%',
    borderLeftWidth: 4,
    borderLeftColor: colors.error,
  },
  errorTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.error,
    marginBottom: 8,
  },
  errorText: {
    fontSize: 16,
    color: colors.text,
  },
});
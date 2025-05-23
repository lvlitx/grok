import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { colors } from '@/constants/colors';

type FoodAnalysisResultProps = {
  analysis: any | null;
  isLoading: boolean;
  error: string | null;
};

export const FoodAnalysisResult: React.FC<FoodAnalysisResultProps> = ({ 
  analysis, 
  isLoading,
  error
}) => {
  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.loadingText}>Checking your food...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorTitle}>Oops!</Text>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  if (!analysis) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Food Details</Text>
      
      {analysis.foodName && (
        <View style={styles.infoSection}>
          <Text style={styles.infoLabel}>What is it?</Text>
          <Text style={styles.infoValue}>{analysis.foodName}</Text>
        </View>
      )}
      
      {analysis.ingredients && (
        <View style={styles.infoSection}>
          <Text style={styles.infoLabel}>Main Ingredients</Text>
          <Text style={styles.infoValue}>{analysis.ingredients}</Text>
        </View>
      )}
      
      {analysis.artificial && (
        <View style={styles.infoSection}>
          <Text style={styles.infoLabel}>Artificial Stuff</Text>
          <Text style={styles.infoValue}>{analysis.artificial}</Text>
        </View>
      )}
      
      {analysis.healthTip && (
        <View style={styles.infoSection}>
          <Text style={styles.infoLabel}>Health Tip</Text>
          <Text style={styles.infoValue}>{analysis.healthTip}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.cardBackground,
    borderRadius: 16,
    padding: 20,
    marginTop: 16,
    width: '100%',
    borderWidth: 1,
    borderColor: colors.border,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 16,
  },
  infoSection: {
    marginBottom: 16,
  },
  infoLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.primary,
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 16,
    lineHeight: 24,
    color: colors.textSecondary,
  },
  loadingContainer: {
    backgroundColor: colors.cardBackground,
    borderRadius: 16,
    padding: 20,
    marginTop: 16,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    borderWidth: 1,
    borderColor: colors.border,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: colors.text,
    fontWeight: '500',
  },
  errorContainer: {
    backgroundColor: colors.cardBackground,
    borderRadius: 16,
    padding: 20,
    marginTop: 16,
    width: '100%',
    borderLeftWidth: 4,
    borderLeftColor: colors.danger,
    borderWidth: 1,
    borderColor: colors.border,
  },
  errorTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.danger,
    marginBottom: 8,
  },
  errorText: {
    fontSize: 16,
    color: colors.textSecondary,
  },
});
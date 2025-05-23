import React from 'react';
import { StyleSheet, Text, View, Dimensions, ColorValue } from 'react-native';
import { colors } from '@/constants/colors';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');
const CIRCLE_SIZE = width * 0.4;

type HealthScoreProps = {
  analysis: any | null;
  isLoading: boolean;
};

export const HealthScore: React.FC<HealthScoreProps> = ({ analysis, isLoading }) => {
  if (isLoading || !analysis || !analysis.healthScore) {
    return null;
  }

  const score = parseInt(analysis.healthScore, 10);
  
  let scoreColor;
  let scoreText;
  let gradientColors: [ColorValue, ColorValue];
  
  if (score >= 80) {
    scoreColor = colors.healthExcellent;
    scoreText = "Super Healthy!";
    gradientColors = [colors.healthExcellent, colors.healthGood];
  } else if (score >= 60) {
    scoreColor = colors.healthGood;
    scoreText = "Healthy!";
    gradientColors = [colors.healthGood, colors.healthModerate];
  } else if (score >= 40) {
    scoreColor = colors.healthModerate;
    scoreText = "OK Sometimes";
    gradientColors = [colors.healthModerate, colors.healthPoor];
  } else {
    scoreColor = colors.healthBad;
    scoreText = "Not So Healthy";
    gradientColors = [colors.healthPoor, colors.healthBad];
  }

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={gradientColors}
        style={styles.scoreCircle}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Text style={styles.scoreNumber}>{score}</Text>
        <Text style={styles.scoreLabel}>Health Score</Text>
      </LinearGradient>
      
      <Text style={[styles.scoreText, { color: scoreColor }]}>
        {scoreText}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 16,
  },
  scoreCircle: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  scoreNumber: {
    fontSize: 48,
    fontWeight: 'bold',
    color: colors.text,
  },
  scoreLabel: {
    fontSize: 14,
    color: colors.text,
    opacity: 0.8,
  },
  scoreText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
import React from 'react';
import { StyleSheet, Text, View, ScrollView, Linking, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '@/constants/colors';
import { ExternalLink, Apple, Carrot, Candy, AlertTriangle } from 'lucide-react-native';

export default function AboutScreen() {
  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom']}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          <Text style={styles.title}>About Food Scanner</Text>
          
          <View style={styles.card}>
            <Text style={styles.cardTitle}>How It Works</Text>
            <Text style={styles.cardText}>
              Food Scanner helps you learn about how healthy your food is! Just take a picture of your 
              food, and our friendly AI will tell you if it's good for your body.
            </Text>
          </View>
          
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Food Health Scores</Text>
            
            <View style={styles.scoreItem}>
              <View style={[styles.scoreCircle, { backgroundColor: colors.healthExcellent }]}>
                <Carrot size={24} color={colors.text} />
              </View>
              <View style={styles.scoreTextContainer}>
                <Text style={styles.scoreTitle}>Super Healthy (80-100)</Text>
                <Text style={styles.scoreDescription}>
                  Natural foods with no artificial ingredients. Great choice!
                </Text>
              </View>
            </View>
            
            <View style={styles.scoreItem}>
              <View style={[styles.scoreCircle, { backgroundColor: colors.healthGood }]}>
                <Apple size={24} color={colors.text} />
              </View>
              <View style={styles.scoreTextContainer}>
                <Text style={styles.scoreTitle}>Healthy (60-79)</Text>
                <Text style={styles.scoreDescription}>
                  Mostly natural with few additives. Good choice!
                </Text>
              </View>
            </View>
            
            <View style={styles.scoreItem}>
              <View style={[styles.scoreCircle, { backgroundColor: colors.healthModerate }]}>
                <Candy size={24} color={colors.text} />
              </View>
              <View style={styles.scoreTextContainer}>
                <Text style={styles.scoreTitle}>OK Sometimes (40-59)</Text>
                <Text style={styles.scoreDescription}>
                  Has some artificial ingredients. Enjoy occasionally!
                </Text>
              </View>
            </View>
            
            <View style={styles.scoreItem}>
              <View style={[styles.scoreCircle, { backgroundColor: colors.healthBad }]}>
                <AlertTriangle size={24} color={colors.text} />
              </View>
              <View style={styles.scoreTextContainer}>
                <Text style={styles.scoreTitle}>Not So Healthy (0-39)</Text>
                <Text style={styles.scoreDescription}>
                  Lots of artificial ingredients. Try to eat less of these!
                </Text>
              </View>
            </View>
          </View>
          
          <View style={styles.card}>
            <Text style={styles.cardTitle}>For Parents</Text>
            <Text style={styles.cardText}>
              This app is designed to help children learn about healthy food choices in a fun way. 
              The AI analyzes food images and provides simple information about nutritional value 
              and artificial ingredients.
            </Text>
            
            <Text style={styles.cardText}>
              Please note that while our AI tries to be accurate, it should not replace professional 
              dietary advice, especially for children with allergies or special dietary needs.
            </Text>
          </View>
          
          <Text style={styles.versionText}>Version 1.0.0</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 40,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 24,
    textAlign: 'center',
  },
  card: {
    backgroundColor: colors.cardBackground,
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: colors.border,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 16,
  },
  cardText: {
    fontSize: 16,
    lineHeight: 24,
    color: colors.textSecondary,
    marginBottom: 12,
  },
  scoreItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  scoreCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  scoreTextContainer: {
    flex: 1,
  },
  scoreTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  scoreDescription: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  versionText: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: 20,
  },
});
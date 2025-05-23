import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { Camera, RefreshCw } from 'lucide-react-native';
import { colors } from '@/constants/colors';
import { useFoodStore } from '@/store/foodStore';
import { FoodAnalysisResult } from '@/components/FoodAnalysisResult';
import { HealthScore } from '@/components/HealthScore';
import { analyzeFoodImage } from '@/utils/aiService';
import { Image as ExpoImage } from 'expo-image';
import * as ImagePicker from 'expo-image-picker';

const { width } = Dimensions.get('window');

export default function FoodScannerScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [camera, setCamera] = useState<CameraView | null>(null);
  
  const { 
    imageUri, 
    analysis, 
    isAnalyzing, 
    error,
    setImageUri, 
    setAnalysis, 
    setIsAnalyzing, 
    setError,
    reset
  } = useFoodStore();

  useEffect(() => {
    // Request camera permission on component mount
    if (!permission?.granted) {
      requestPermission();
    }
  }, [permission, requestPermission]);

  const takePicture = async () => {
    if (!camera) return;
    
    try {
      const photo = await camera.takePictureAsync();
      setImageUri(photo.uri);
      analyzeFood(photo.uri);
    } catch (err) {
      console.error('Failed to take picture:', err);
      setError('Could not take picture. Please try again!');
    }
  };

  const analyzeFood = async (uri: string) => {
    setIsAnalyzing(true);
    setError(null);
    
    try {
      const result = await analyzeFoodImage(uri);
      setAnalysis(result);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Oops! Something went wrong. Try again!';
      setError(errorMessage);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleReset = () => {
    reset();
  };

  if (!permission) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar style="light" />
        <Text style={styles.loadingText}>Loading camera...</Text>
      </SafeAreaView>
    );
  }

  if (!permission.granted) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar style="light" />
        <View style={styles.permissionContainer}>
          <Text style={styles.title}>Camera Permission</Text>
          <Text style={styles.subtitle}>
            We need your permission to use the camera to scan food items
          </Text>
          <TouchableOpacity 
            style={styles.permissionButton} 
            onPress={requestPermission}
          >
            <Text style={styles.permissionButtonText}>Allow Camera</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <StatusBar style="light" />
      
      {!imageUri ? (
        <View style={styles.cameraContainer}>
          <Text style={styles.title}>Food Scanner</Text>
          <Text style={styles.subtitle}>
            Take a picture of your food to check how healthy it is!
          </Text>
          
          <CameraView
            ref={setCamera}
            style={styles.camera}
            facing="back"
          >
            <View style={styles.cameraOverlay}>
              <View style={styles.cameraGuide}>
                <View style={styles.cameraGuideCorner} />
                <View style={styles.cameraGuideCorner} />
                <View style={styles.cameraGuideCorner} />
                <View style={styles.cameraGuideCorner} />
              </View>
            </View>
            
            <TouchableOpacity 
              style={styles.captureButton} 
              onPress={takePicture}
            >
              <View style={styles.captureButtonInner} />
            </TouchableOpacity>
          </CameraView>
        </View>
      ) : (
        <View style={styles.resultContainer}>
          <View style={styles.imageContainer}>
            <ExpoImage
              source={{ uri: imageUri }}
              style={styles.foodImage}
              contentFit="cover"
              transition={300}
            />
          </View>
          
          <HealthScore analysis={analysis} isLoading={isAnalyzing} />
          
          <FoodAnalysisResult 
            analysis={analysis} 
            isLoading={isAnalyzing}
            error={error}
          />
          
          <TouchableOpacity 
            style={styles.resetButton} 
            onPress={handleReset}
          >
            <RefreshCw size={20} color={colors.primary} />
            <Text style={styles.resetButtonText}>Scan Another Food</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  cameraContainer: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    marginBottom: 24,
    textAlign: 'center',
    lineHeight: 22,
  },
  camera: {
    flex: 1,
    borderRadius: 20,
    overflow: 'hidden',
  },
  cameraOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraGuide: {
    width: width * 0.7,
    height: width * 0.7,
    position: 'relative',
  },
  cameraGuideCorner: {
    position: 'absolute',
    width: 30,
    height: 30,
    borderColor: colors.primary,
    borderWidth: 4,
  },
  captureButton: {
    position: 'absolute',
    bottom: 30,
    alignSelf: 'center',
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureButtonInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.text,
  },
  resultContainer: {
    flex: 1,
    padding: 20,
  },
  imageContainer: {
    width: '100%',
    height: width * 0.6,
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 20,
  },
  foodImage: {
    width: '100%',
    height: '100%',
  },
  resetButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
    padding: 16,
    borderRadius: 16,
    backgroundColor: colors.cardBackground,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  resetButtonText: {
    color: colors.primary,
    marginLeft: 8,
    fontSize: 16,
    fontWeight: '600',
  },
  permissionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  permissionButton: {
    backgroundColor: colors.primary,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 16,
    marginTop: 20,
  },
  permissionButtonText: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '600',
  },
  loadingText: {
    color: colors.text,
    fontSize: 18,
    textAlign: 'center',
    marginTop: 40,
  },
});
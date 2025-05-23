import React from 'react';
import { StyleSheet, View, Dimensions, TouchableOpacity, Text } from 'react-native';
import { Image as ExpoImage } from 'expo-image';
import { X } from 'lucide-react-native';
import { colors } from '@/constants/colors';

type ImagePreviewProps = {
  uri: string;
  onClear: () => void;
};

const { width } = Dimensions.get('window');
const imageWidth = width - 40; // 20px padding on each side

export const ImagePreview: React.FC<ImagePreviewProps> = ({ uri, onClear }) => {
  return (
    <View style={styles.container}>
      <ExpoImage
        source={{ uri }}
        style={styles.image}
        contentFit="cover"
        transition={300}
      />
      <TouchableOpacity style={styles.clearButton} onPress={onClear}>
        <X color={colors.white} size={20} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    position: 'relative',
    borderRadius: 12,
    overflow: 'hidden',
    marginVertical: 16,
  },
  image: {
    width: imageWidth,
    height: imageWidth * 0.75,
    borderRadius: 12,
  },
  clearButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 20,
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
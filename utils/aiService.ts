import { Platform } from 'react-native';
import * as FileSystem from 'expo-file-system';

type ContentPart = 
  | { type: 'text'; text: string; }
  | { type: 'image'; image: string; }

type CoreMessage = 
  | { role: 'system'; content: string; }  
  | { role: 'user'; content: string | Array<ContentPart>; }
  | { role: 'assistant'; content: string | Array<ContentPart>; };

export const analyzeFoodImage = async (imageUri: string): Promise<any> => {
  try {
    // Convert image to base64
    let base64Image: string;
    
    if (Platform.OS === 'web') {
      // For web, fetch the image and convert to base64
      const response = await fetch(imageUri);
      const blob = await response.blob();
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          if (typeof reader.result === 'string') {
            const base64 = reader.result.split(',')[1];
            sendFoodImageToAI(base64).then(resolve).catch(reject);
          } else {
            reject(new Error('Failed to convert image to base64'));
          }
        };
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    } else {
      // For native platforms, use FileSystem
      base64Image = await FileSystem.readAsStringAsync(imageUri, {
        encoding: FileSystem.EncodingType.Base64,
      });
      return sendFoodImageToAI(base64Image);
    }
  } catch (error) {
    console.error('Error processing image:', error);
    throw new Error('Could not check your food. Please try again!');
  }
};

const sendFoodImageToAI = async (base64Image: string): Promise<any> => {
  try {
    const messages: CoreMessage[] = [
      {
        role: 'system',
        content: `You are a helpful assistant designed to analyze food images for children. 
        Your goal is to identify the food, determine if it's healthy, and provide a health score based on natural ingredients vs. artificial additives.
        
        For each food image, provide the following information in JSON format:
        1. foodName: A simple name for the food that a child would understand
        2. ingredients: A brief, simple list of the main ingredients
        3. artificial: A simple explanation of any artificial ingredients, preservatives, or additives (if none, say "None found!")
        4. healthScore: A number from 0-100 representing how healthy the food is (higher is healthier)
        5. healthTip: A simple, kid-friendly health tip related to this food
        
        Health scoring guidelines:
        - 80-100: Natural, unprocessed foods with no artificial ingredients
        - 60-79: Mostly natural with few additives
        - 40-59: Moderate amount of processing or artificial ingredients
        - 0-39: Highly processed with many artificial ingredients
        
        Use simple, child-friendly language. If you can't identify the food clearly, make your best guess but indicate uncertainty.
        If the image doesn't contain food, respond with a JSON that has foodName: "Not Food" and healthScore: 0.
        
        IMPORTANT: Respond ONLY with the JSON object, no additional text.`
      },
      {
        role: 'user',
        content: [
          { type: 'text', text: 'What food is this and how healthy is it?' },
          { type: 'image', image: base64Image }
        ]
      }
    ];

    const response = await fetch('https://toolkit.rork.com/text/llm/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ messages }),
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();
    
    try {
      // Try to parse the completion as JSON
      return JSON.parse(data.completion);
    } catch (e) {
      // If parsing fails, return a structured object with the raw text
      console.error('Failed to parse AI response as JSON:', e);
      return {
        foodName: "Unknown Food",
        ingredients: "Could not identify ingredients",
        artificial: "Unknown",
        healthScore: "50",
        healthTip: "I couldn't analyze this food properly. Try taking another picture with better lighting!",
        rawResponse: data.completion
      };
    }
  } catch (error) {
    console.error('Error calling AI API:', error);
    throw new Error('Could not check your food. Please try again!');
  }
};
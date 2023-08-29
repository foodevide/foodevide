import axios from 'axios';

export interface FoodItem {
  id: number;
  name: string;
  // Add more properties as needed based on your API response
}

export async function fetchData(latitude: number, longitude: number): Promise<FoodItem[] | null> {
  const apiUrl = `https://foodevide.pythonanywhere.com/api/?latitude=${latitude}&longitude=${longitude}`;
  try {
    const response = await axios.get(apiUrl);
    return response.data as FoodItem[]; // Assuming the API response is an array of FoodItem objects
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
}

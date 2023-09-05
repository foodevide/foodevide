import axios from 'axios';

export interface FoodSpots {
  id: number;
  name: string;
  // Add more properties as needed based on your API response
}
export interface FoodSpot {
  id: number,
  name: string,
  image:string,
  location:string,
  reel:string,
  
}

export async function fetchData(latitude: number, longitude: number): Promise<FoodSpots[] | null> {
  const apiUrl = `https://foodevide.pythonanywhere.com/api/?latitude=${latitude}&longitude=${longitude}`;
  try {
    const response = await axios.get(apiUrl);
    return response.data as FoodSpots[]; 
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
}

export async function fetchDetail(id: number): Promise<FoodSpot | null> {
  const apiUrl = `https://foodevide.pythonanywhere.com/api/foodspots/${id}`; // Use the specific ID in the URL
  try {
    const response = await axios.get(apiUrl);
    return response.data as FoodSpot;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
}

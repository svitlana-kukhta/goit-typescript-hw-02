import axios from "axios";

axios.defaults.baseURL = "https://api.unsplash.com/";
const ACCESS_KEY = "9AX941lrFHxJzuB5DftjD5ozuPIyip8ymk73blu_4no";

interface Photo {
  id: string;
  urls: { regular: string };
  alt_description?: string;
}

interface FetchPhotosResponse {
  results: Photo[];
  total_pages: number;
}

export const fetchPhotos = async (query: string, page: number): Promise<FetchPhotosResponse> => {
  try {
    const response = await axios.get<FetchPhotosResponse>(`/search/photos/`, {
      params: {
        query,
        page,
        per_page: 12,
        client_id: ACCESS_KEY,
      }
    });
    return response.data 
   
} catch (error) {console.error("Error fetching photos from Unsplash:", error);
    throw error; 
}
}; 

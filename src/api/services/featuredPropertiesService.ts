import apiClient from "../client";

export interface FeaturedProperty {
  id: string;
  title: string;
  location: string;
  priceNaira: number;
  priceLabel: string;
  type: string;
  propertyType: string;
  beds: number;
  baths: number;
  sqft?: string | null;
  imageUrls: string[];
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

const featuredPropertiesService = {
  getActive: async (): Promise<FeaturedProperty[]> => {
    const { data } = await apiClient.get<FeaturedProperty[]>(
      "/featured-properties",
    );
    return data;
  },
};

export default featuredPropertiesService;

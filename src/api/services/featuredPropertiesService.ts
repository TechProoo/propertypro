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

export interface CreateFeaturedPropertyPayload {
  title: string;
  location: string;
  priceNaira: number;
  type: string;
  propertyType: string;
  beds?: number;
  baths?: number;
  sqft?: string;
  imageUrls: string[];
  active?: boolean;
}

export type UpdateFeaturedPropertyPayload =
  Partial<CreateFeaturedPropertyPayload>;

const featuredPropertiesService = {
  /** Public: active properties for the hero gallery */
  getActive: async (): Promise<FeaturedProperty[]> => {
    const { data } = await apiClient.get<FeaturedProperty[]>(
      "/featured-properties",
    );
    return data;
  },

  /** Admin: all properties */
  getAll: async (token: string): Promise<FeaturedProperty[]> => {
    const { data } = await apiClient.get<FeaturedProperty[]>(
      "/admin/featured-properties",
      { headers: { Authorization: `Bearer ${token}` } },
    );
    return data;
  },

  create: async (
    token: string,
    payload: CreateFeaturedPropertyPayload,
  ): Promise<FeaturedProperty> => {
    const { data } = await apiClient.post<FeaturedProperty>(
      "/admin/featured-properties",
      payload,
      { headers: { Authorization: `Bearer ${token}` } },
    );
    return data;
  },

  update: async (
    token: string,
    id: string,
    payload: UpdateFeaturedPropertyPayload,
  ): Promise<FeaturedProperty> => {
    const { data } = await apiClient.patch<FeaturedProperty>(
      `/admin/featured-properties/${id}`,
      payload,
      { headers: { Authorization: `Bearer ${token}` } },
    );
    return data;
  },

  remove: async (token: string, id: string): Promise<void> => {
    await apiClient.delete(`/admin/featured-properties/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },
};

export default featuredPropertiesService;

import { fetchJson } from "./api";

type BannerApiItem = {
  id: string;
  name: string;
  image: string;
  banner_type: string;
};

type BannerApiResponse = {
  success: boolean;
  data?: {
    HOME_BANNER?: BannerApiItem[];
  };
};

export type HomeBanner = {
  id: string;
  alt: string;
  image: string;
};

export async function getHomeBanners(): Promise<HomeBanner[]> {
  const payload = await fetchJson<BannerApiResponse>("/user/banner/list/");
  if (!payload.success) return [];
  const items = payload.data?.HOME_BANNER ?? [];
  return items.map((item) => ({
    id: item.id,
    alt: item.name,
    image: item.image,
  }));
}

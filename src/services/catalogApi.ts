import type { Product } from "../components/products/types";
import { fetchJson } from "./api";

type CategoryApiItem = {
  id: string;
  name: string;
  image?: string;
};

type CategoryApiResponse = {
  success: boolean;
  data?: {
    category?: CategoryApiItem[];
  };
};

type SubcategoryApiItem = {
  id: string;
  name: string;
  image?: string;
};

type SubcategoryApiResponse = {
  success: boolean;
  data?: {
    items?: SubcategoryApiItem[];
  };
};

type ProductVariantApiItem = {
  id: string;
  price?: string;
  offerPrice?: string;
  quantity?: number;
  uom?: string;
  image?: string;
};

type ProductApiItem = {
  id: string;
  product_name: string;
  image?: string;
  variants?: ProductVariantApiItem[];
};

type ProductApiResponse = {
  success: boolean;
  data?: {
    items?: ProductApiItem[];
  };
};

export type Category = {
  id: string;
  name: string;
  image: string;
};

export type Subcategory = {
  id: string;
  label: string;
  image: string;
};

export type Store = {
  id: string;
  name: string;
  image: string;
};

export type Brand = {
  id: string;
  name: string;
  image: string;
};

const normalizeImageUrl = (url: string) => {
  if (url.startsWith("https:/") && !url.startsWith("https://")) {
    return url.replace("https:/", "https://");
  }
  if (url.startsWith("http:/") && !url.startsWith("http://")) {
    return url.replace("http:/", "http://");
  }
  return url;
};

export async function getCategories(): Promise<Category[]> {
  const payload = await fetchJson<CategoryApiResponse>("/user/category/list");
  if (!payload.success) return [];
  const items = payload.data?.category ?? [];
  return items.map((item) => ({
    id: item.id,
    name: item.name,
    image: normalizeImageUrl(item.image || ""),
  }));
}

export async function getSubcategories(categoryId: string): Promise<Subcategory[]> {
  const payload = await fetchJson<SubcategoryApiResponse>(
    `/user/sub_category/list?category_id=${categoryId}`
  );
  if (!payload.success) return [];
  const items = payload.data?.items ?? [];
  return items.map((item) => ({
    id: item.id,
    label: item.name,
    image: item.image ? normalizeImageUrl(item.image) : "",
  }));
}

export async function getProductsByCategory(categoryId: string): Promise<Product[]> {
  const payload = await fetchJson<ProductApiResponse>(
    `/user/products/list/1?search=&categoryId=${categoryId}&subCategoryId=&brandId=null&storeId=null`
  );
  return mapProducts(payload);
}

export async function getProductsBySubcategory(subCategoryId: string): Promise<Product[]> {
  const payload = await fetchJson<ProductApiResponse>(
    `/user/products/list/1?search=&categoryId=&subCategoryId=${subCategoryId}&brandId=null&storeId=null`
  );
  return mapProducts(payload);
}

type StoreApiItem = {
  id: string;
  name: string;
  image?: string;
};

type StoreApiResponse = {
  success: boolean;
  data?: {
    items?: StoreApiItem[];
  };
};

type BrandApiItem = {
  id: string;
  name: string;
  image?: string;
};

type BrandApiResponse = {
  success: boolean;
  data?: {
    items?: BrandApiItem[];
  };
};

export async function getStores(): Promise<Store[]> {
  const payload = await fetchJson<StoreApiResponse>("/user/store/list");
  if (!payload.success) return [];
  const items = payload.data?.items ?? [];
  return items.map((item) => ({
    id: item.id,
    name: item.name,
    image: normalizeImageUrl(item.image || ""),
  }));
}

export async function getBrands(): Promise<Brand[]> {
  const payload = await fetchJson<BrandApiResponse>("/user/brand/list");
  if (!payload.success) return [];
  const items = payload.data?.items ?? [];
  return items.map((item) => ({
    id: item.id,
    name: item.name,
    image: normalizeImageUrl(item.image || ""),
  }));
}

function mapProducts(payload: ProductApiResponse): Product[] {
  if (!payload.success) return [];
  const items = payload.data?.items ?? [];
  const mapped: Product[] = [];

  items.forEach((item) => {
    const variants = item.variants ?? [];
    if (variants.length === 0) {
      return;
    }

    variants.forEach((variant) => {
      const priceRaw = variant.offerPrice ?? variant.price ?? "0";
      const price = Number(priceRaw);
      const qty =
        variant.quantity && variant.uom
          ? `${variant.quantity} ${variant.uom}`
          : "";
      mapped.push({
        id: `${item.id}-${variant.id}`,
        name: item.product_name,
        qty,
        price: Number.isNaN(price) ? 0 : price,
        image: normalizeImageUrl(variant.image || item.image || ""),
      });
    });
  });

  return mapped;
}

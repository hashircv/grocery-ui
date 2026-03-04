import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { Product } from "../components/products/types";
import type { Brand, Category, Store, Subcategory } from "../services/catalogApi";
import {
  getCategories,
  getBrands,
  getProductsByCategory,
  getProductsBySubcategory,
  getStores,
  getSubcategories,
} from "../services/catalogApi";

type CatalogState = {
  categories: Category[];
  categoriesLoading: boolean;
  stores: Store[];
  storesLoading: boolean;
  brands: Brand[];
  brandsLoading: boolean;
  subcategoriesByCategory: Record<string, Subcategory[]>;
  subcategoriesLoadingByCategory: Record<string, boolean>;
  productsByKey: Record<string, Product[]>;
  productsLoadingByKey: Record<string, boolean>;
};

const initialState: CatalogState = {
  categories: [],
  categoriesLoading: false,
  stores: [],
  storesLoading: false,
  brands: [],
  brandsLoading: false,
  subcategoriesByCategory: {},
  subcategoriesLoadingByCategory: {},
  productsByKey: {},
  productsLoadingByKey: {},
};

export const fetchCategories = createAsyncThunk(
  "catalog/fetchCategories",
  async () => getCategories()
);

export const fetchSubcategories = createAsyncThunk(
  "catalog/fetchSubcategories",
  async (categoryId: string) => ({
    categoryId,
    items: await getSubcategories(categoryId),
  })
);

export const fetchStores = createAsyncThunk(
  "catalog/fetchStores",
  async () => getStores()
);

export const fetchBrands = createAsyncThunk(
  "catalog/fetchBrands",
  async () => getBrands()
);

export const fetchProductsByCategory = createAsyncThunk(
  "catalog/fetchProductsByCategory",
  async (categoryId: string) => ({
    key: `category:${categoryId}`,
    items: await getProductsByCategory(categoryId),
  })
);

export const fetchProductsBySubcategory = createAsyncThunk(
  "catalog/fetchProductsBySubcategory",
  async (subCategoryId: string) => ({
    key: `sub:${subCategoryId}`,
    items: await getProductsBySubcategory(subCategoryId),
  })
);

const catalogSlice = createSlice({
  name: "catalog",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.categoriesLoading = true;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categoriesLoading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state) => {
        state.categoriesLoading = false;
        state.categories = [];
      })
      .addCase(fetchSubcategories.pending, (state, action) => {
        state.subcategoriesLoadingByCategory[action.meta.arg] = true;
      })
      .addCase(fetchSubcategories.fulfilled, (state, action) => {
        state.subcategoriesLoadingByCategory[action.payload.categoryId] = false;
        state.subcategoriesByCategory[action.payload.categoryId] =
          action.payload.items;
      })
      .addCase(fetchSubcategories.rejected, (state, action) => {
        state.subcategoriesLoadingByCategory[action.meta.arg] = false;
        state.subcategoriesByCategory[action.meta.arg] = [];
      })
      .addCase(fetchStores.pending, (state) => {
        state.storesLoading = true;
      })
      .addCase(fetchStores.fulfilled, (state, action) => {
        state.storesLoading = false;
        state.stores = action.payload;
      })
      .addCase(fetchStores.rejected, (state) => {
        state.storesLoading = false;
        state.stores = [];
      })
      .addCase(fetchBrands.pending, (state) => {
        state.brandsLoading = true;
      })
      .addCase(fetchBrands.fulfilled, (state, action) => {
        state.brandsLoading = false;
        state.brands = action.payload;
      })
      .addCase(fetchBrands.rejected, (state) => {
        state.brandsLoading = false;
        state.brands = [];
      })
      .addCase(fetchProductsByCategory.pending, (state, action) => {
        state.productsLoadingByKey[`category:${action.meta.arg}`] = true;
      })
      .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
        state.productsLoadingByKey[action.payload.key] = false;
        state.productsByKey[action.payload.key] = action.payload.items;
      })
      .addCase(fetchProductsByCategory.rejected, (state, action) => {
        const key = `category:${action.meta.arg}`;
        state.productsLoadingByKey[key] = false;
        state.productsByKey[key] = [];
      })
      .addCase(fetchProductsBySubcategory.pending, (state, action) => {
        state.productsLoadingByKey[`sub:${action.meta.arg}`] = true;
      })
      .addCase(fetchProductsBySubcategory.fulfilled, (state, action) => {
        state.productsLoadingByKey[action.payload.key] = false;
        state.productsByKey[action.payload.key] = action.payload.items;
      })
      .addCase(fetchProductsBySubcategory.rejected, (state, action) => {
        const key = `sub:${action.meta.arg}`;
        state.productsLoadingByKey[key] = false;
        state.productsByKey[key] = [];
      });
  },
});

export default catalogSlice.reducer;

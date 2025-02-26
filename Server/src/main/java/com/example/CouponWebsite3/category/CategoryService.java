package com.example.CouponWebsite3.category;

import com.example.CouponWebsite3.exception.CategoryException;

import java.util.List;

public interface CategoryService {
    Category addCategory(Category category) throws CategoryException;
    Category getCategory(int id) throws CategoryException;
    List<Category> getCategories();
    void updateCategory(int id, Category category) throws CategoryException;
    void deleteCategory(int id) throws CategoryException;
    boolean isCategoryExist(int categoryId);
}

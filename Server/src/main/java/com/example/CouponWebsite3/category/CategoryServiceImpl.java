package com.example.CouponWebsite3.category;

import com.example.CouponWebsite3.enums.ErrorMessage;
import com.example.CouponWebsite3.exception.CategoryException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class CategoryServiceImpl implements CategoryService{

    @Autowired
    private CategoryRepository categoryRepository;

    // the function receives a category and adds the category to the database
    // the function throws an exception if the category already exist
    @Override
    public Category addCategory(Category category) throws CategoryException {
        if (this.categoryRepository.existsByName(category.getName())) {
            throw new CategoryException(ErrorMessage.NAME_EXIST);
        }
        return this.categoryRepository.save(category);
    }

    @Override
    // the function receives an id (integer) and returns the category with the id.
    public Category getCategory(int id) throws CategoryException {
        return this.categoryRepository.findById(id).orElseThrow(() -> new CategoryException(ErrorMessage.ID_NOT_FOUND));
    }

    @Override
    // the function receives returns all categories in the database.
    public List<Category> getCategories(){
        return this.categoryRepository.findAll();
    }

    @Override
    // the function receives a category and an id and updates in the database the category with the id to the category that the function received
    public void updateCategory(int id, Category category) throws CategoryException {
        if (!this.categoryRepository.existsById(id)) {
            throw new CategoryException(ErrorMessage.ID_NOT_FOUND);
        }
        if (this.categoryRepository.existsByName(category.getName())) {
            throw new CategoryException(ErrorMessage.NAME_EXIST);
        }
        Category categoryFromDb = this.getCategory(id);
        categoryFromDb.setName(category.getName());
        this.categoryRepository.save(categoryFromDb);
    }

    @Override
    // the function receives an id and deletes the category with this id in the database
    public void deleteCategory(int id) throws CategoryException {
        if (!this.categoryRepository.existsById(id)) {
            throw new CategoryException(ErrorMessage.ID_NOT_FOUND);
        }
        this.categoryRepository.deleteById(id);
    }

    @Override
    // the function receives an id and returns if the id exists in the categories table in the database.
    public boolean isCategoryExist(int categoryId){
        return this.categoryRepository.existsById(categoryId);
    }
}

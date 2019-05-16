package pl.barter.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pl.barter.exception.ResourceNotFoundException;
import pl.barter.model.Category;
import pl.barter.repository.CategoryRepository;

import javax.validation.Valid;
import java.util.List;

@RestController
public class CategoryController {

    @Autowired
    CategoryRepository categoryRepository;

    @RequestMapping("/categories/all")
    public List<Category> findAll() {
        return categoryRepository.findAll();
    }

    /*@PostMapping("/categories/add")
    public Category createCategory(@Valid @RequestBody Category category) {
        return categoryRepository.save(category);
    }*/

    @GetMapping("/categories/{id}")
    public Category getCategoryById(@PathVariable(value = "id") Long id) {
        return categoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Category", "id", id));
    }

    /*@PutMapping("/categories/{id}")
    public Category updateCategory(@PathVariable(value = "id") Long id,
                                 @Valid @RequestBody Category categoryDetails) {

        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Category", "id", id));

        category.setName(categoryDetails.getName());

        Category updatedCategory = categoryRepository.save(category);
        return updatedCategory;
    }*/
}

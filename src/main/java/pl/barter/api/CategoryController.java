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


    @GetMapping("/categories/{id}")
    public Category getCategoryById(@PathVariable(value = "id") Long id) {
        return categoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Category", "id", id));
    }

}

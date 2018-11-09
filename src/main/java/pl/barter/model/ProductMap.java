package pl.barter.model;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.barter.repository.CategoryRepository;

@Service
public class ProductMap {

    @Autowired
    CategoryRepository categoryRepository;

    public Product map(Product p){

        if(p.getCategoryId() != null){
            Category category = categoryRepository.findById(p.getCategoryId()).orElse(null);
            if(category != null){
                p.setCategoryName(category.getName());
            }
        }
        return p;
    }

}

package pl.barter.mapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.barter.model.Category;
import pl.barter.model.City;
import pl.barter.model.Product;
import pl.barter.repository.CategoryRepository;
import pl.barter.repository.CityRepository;

@Service
public class ProductMap {

    @Autowired
    CategoryRepository categoryRepository;

    @Autowired
    CityRepository cityRepository;

    public Product map(Product p){

        if(p.getCategoryId() != null){
            Category category = categoryRepository.findById(p.getCategoryId()).orElse(null);
            if(category != null){
                p.setCategoryName(category.getName());
            }
        }
        if(p.getCityId()!=null){
            City city = cityRepository.findById(p.getCityId()).orElse(null);
            if(city != null){
                p.setCityName(city.getName());
            }
        }
        return p;
    }

}

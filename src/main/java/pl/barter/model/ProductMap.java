package pl.barter.model;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
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

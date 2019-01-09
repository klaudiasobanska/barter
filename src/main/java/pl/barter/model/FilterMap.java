package pl.barter.model;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.barter.repository.CityRepository;

@Service
public class FilterMap {

    @Autowired
    CityRepository cityRepository;

    public Filter map(Filter f){
        if(f.getCityId()!=null){
            City city = cityRepository.findById(f.getCityId()).orElse(null);
            if(city != null){
                f.setCityName(city.getName());
            }
        }
        return f;
    }
}

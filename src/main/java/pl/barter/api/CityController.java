package pl.barter.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.barter.repository.CityRepository;

import java.util.List;

@RestController
public class CityController extends AbstractController{

    @Autowired
    CityRepository cityRepository;


}

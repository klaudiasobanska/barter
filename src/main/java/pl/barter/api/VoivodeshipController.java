package pl.barter.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Query;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.barter.model.Voivodeship;
import pl.barter.repository.CityRepository;
import pl.barter.repository.VoivodeshipRepository;

import java.util.List;

@RestController
public class VoivodeshipController extends AbstractController{

    @Autowired
    VoivodeshipRepository voivodeshipRepository;

    @Autowired
    CityRepository cityRepository;


    @GetMapping("/voivo/city/list")
    List<Voivodeship> getVoivoCity(){

        List<Voivodeship> voivodeships = voivodeshipRepository.findAll();
        for(Voivodeship v: voivodeships){
            v.setCities(cityRepository.findByVoivoId(v.getId()));
        }

        return voivodeships;
    }

}

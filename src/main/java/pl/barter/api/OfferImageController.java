package pl.barter.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.Base64Utils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import pl.barter.model.OfferImage;
import pl.barter.repository.OfferImageRepository;

import javax.persistence.Convert;
import java.util.*;

@RestController
public class OfferImageController {

    @Autowired
    OfferImageRepository offerImageRepository;


    @GetMapping("/image/offer")
    public List<String> getImageOffer(@RequestParam("offerId") Long offerId){

        List<OfferImage> bytes= offerImageRepository.findByOfferId(offerId);

        List<String> imageStringList = new ArrayList<>();
        for(OfferImage of: bytes){

            imageStringList.add("data:"+of.getType()+";base64,"+Base64Utils.encodeToString(of.getImage()));
        }

        return imageStringList;


    }
}

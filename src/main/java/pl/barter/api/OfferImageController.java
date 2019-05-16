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
    private static Long DEFAULT_IMAGE = 0L;

    @Autowired
    OfferImageRepository offerImageRepository;


    @GetMapping("/image/offer")
    public List<String> getImageOffer(@RequestParam("offerId") Long offerId) {

        List<OfferImage> images = offerImageRepository.findByOfferId(offerId);

        if (images.size() == 0) {
            images.add(offerImageRepository.findById(DEFAULT_IMAGE).get());
        }

        List<String> imageStringList = new ArrayList<>();
        for (OfferImage of : images) {
            imageStringList.add("data:" + of.getType() + ";base64," + Base64Utils.encodeToString(of.getImage()));
        }

        return imageStringList;


    }
}

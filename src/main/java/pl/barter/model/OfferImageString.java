package pl.barter.model;

import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class OfferImageString {

    private String image;
    private String type;

    public OfferImageString() {}

    public OfferImageString(String image, String type) {
        this.image = image;
        this.type = type;
    }
}

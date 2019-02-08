package pl.barter.model.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Getter;
import lombok.Setter;
import pl.barter.model.Product;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Getter
@Setter

@JsonInclude(JsonInclude.Include.NON_NULL)
public class UserDto {

    private Long id;

    private String forename;

    private String login;

    private String surname;

    private String address;

    private String email;

    private Double rating;

    private String city;

    private String zipCode;

    private Date birthDate;

    private String phoneNumber;

    private byte[] img;
    private String imageType;
    private String imageString;
    private Set<Product> fav;

}

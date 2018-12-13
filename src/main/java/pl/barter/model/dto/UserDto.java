package pl.barter.model.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

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

}

package pl.barter.model;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class SignUpRequest {

    private String username;

    private String password;

    private String email;

    private Date birthDate;

}

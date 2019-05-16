package pl.barter.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserImage {

    private String file;
    private Long id;
    private String type;

    public UserImage(String file, Long id, String type) {
        this.file = file;
        this.id = id;
        this.type = type;
    }

    public UserImage(){}
}

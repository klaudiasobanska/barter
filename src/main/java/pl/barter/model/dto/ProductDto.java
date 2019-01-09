package pl.barter.model.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;
import java.util.List;


@Getter
@Setter
public class ProductDto {

    private Long id;
    private String name;
    private Long ownerId;
    private Boolean active;
    private String description;
    private Long categoryId;
    private Long cityId;
    private Date creationDate;

}

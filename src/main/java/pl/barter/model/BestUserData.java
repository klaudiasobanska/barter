package pl.barter.model;


import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity


@SqlResultSetMapping(
        name = "getRating",
        entities = @EntityResult(
                entityClass = BestUserData.class,
                fields = {
                        @FieldResult(name = "id", column = "id"),
                        @FieldResult(name = "login", column = "login"),
                        @FieldResult(name = "rating", column = "rating")
                        }))
@NamedNativeQuery(name = "BestUserData.getRating", query = "select id,login, rating from users  where (rating >= 4.8) order by random() limit 5", resultSetMapping = "getRating")
@Getter
@Setter
public class BestUserData {

    @Id
    Long id;
    String login;
    Double rating;


}

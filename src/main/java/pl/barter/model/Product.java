package pl.barter.model;

import com.fasterxml.jackson.annotation.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.io.Serializable;
import java.util.*;

@Entity
@Table(name = "products")
@EntityListeners(AuditingEntityListener.class)
@Getter
@Setter
public class Product implements Serializable {

    @Id
    @Column(name = "id")
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "owner_id")
    private Long ownerId;

    @Column(name = "active")
    private Boolean active;

    @Column(name = "description")
    private String description;

    @Column(name = "category_id")
    private Long categoryId;

    @Column(name="city_id")
    private Long cityId;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd",locale = "pl_PL")
    @Column(name="creation_date")
    private Date creationDate;

    @Transient
    private String categoryName;

    @Transient
    private String cityName;



    @OneToMany(fetch = FetchType.EAGER,cascade = CascadeType.ALL, mappedBy = "offerId")
    @Fetch(value = FetchMode.SUBSELECT)
    private List<OfferImage> offerImagesList=new ArrayList<>();


    @ManyToMany(fetch = FetchType.LAZY,
            cascade = {
                    CascadeType.PERSIST,
                    CascadeType.MERGE
            },
            mappedBy = "fav")
    @JsonBackReference
    private Set<User> users = new HashSet<>();


    public Product(){}

}

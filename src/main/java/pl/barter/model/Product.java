package pl.barter.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "products")
@EntityListeners(AuditingEntityListener.class)
@Getter
@Setter
public class Product implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "PRODUCTS_ID_SEQ")
    @SequenceGenerator(name = "PRODUCTS_ID_SEQ", sequenceName = "products_id_seq", allocationSize = 1)
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

    @Column(name = "image")
    private byte[] image;

    @Column(name="city_id")
    private Long cityId;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd",locale = "pl_PL")
    @Column(name="creation_date")
    private Date creationDate;

    @Transient
    private String categoryName;

    @ManyToMany(fetch = FetchType.LAZY,
            cascade = {
                    CascadeType.PERSIST,
                    CascadeType.MERGE
            },
            mappedBy = "fav")
    @JsonBackReference
    private Set<User> users = new HashSet<>();

    public Product(String name, Long ownerId, Boolean active, String description, Long categoryId, byte[] image, String categoryName) {
        this.name = name;
        this.ownerId = ownerId;
        this.active = active;
        this.description = description;
        this.categoryId = categoryId;
        this.image = image;
        this.categoryName = categoryName;
    }
    public Product(){}

}

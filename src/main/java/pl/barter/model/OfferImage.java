package pl.barter.model;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;

@Entity
@Table(name = "offers_images")
@EntityListeners(AuditingEntityListener.class)
@Getter
@Setter
public class OfferImage {

    @Id
    @Column(name = "id")
    private Long id;

    @Column(name = "offer_id")
    private Long offerId;

    @Column(name = "image")
    private byte[] image;

    @Column(name = "type")
    private String type;
}

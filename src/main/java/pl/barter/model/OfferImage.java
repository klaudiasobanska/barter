package pl.barter.model;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.imageio.ImageIO;
import javax.persistence.*;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.awt.image.DataBufferByte;
import java.awt.image.WritableRaster;
import java.io.File;
import java.io.IOException;

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

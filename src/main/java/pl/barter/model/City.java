package pl.barter.model;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;

@Entity
@Table(name = "city")
@EntityListeners(AuditingEntityListener.class)
@Getter
@Setter
public class City {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "CITY_ID_SEQ")
    @SequenceGenerator(name = "CITY_ID_SEQ", sequenceName = "city_id_seq", allocationSize = 1)
    @Column(name = "id")
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "voivo_id")
    private Long voivoId;


}

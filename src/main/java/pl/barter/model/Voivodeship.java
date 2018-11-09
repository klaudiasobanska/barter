package pl.barter.model;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "voivodeships")
@EntityListeners(AuditingEntityListener.class)
@Getter
@Setter
public class Voivodeship {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "VOIVODESHIP_ID_SEQ")
    @SequenceGenerator(name = "VOIVODESHIP_ID_SEQ", sequenceName = "voivodeship_id_seq", allocationSize = 1)
    @Column(name = "id")
    private Long id;

    @Column(name = "name")
    private String name;

    @OneToMany(fetch = FetchType.EAGER,cascade = CascadeType.ALL, mappedBy = "voivoId")
    @Fetch(value = FetchMode.SUBSELECT)
    private List<City> cities=new ArrayList<>();


}

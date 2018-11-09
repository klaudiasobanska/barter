package pl.barter.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.barter.model.Voivodeship;

import java.util.List;

@Repository
public interface VoivodeshipRepository extends JpaRepository<Voivodeship,Long> {

    List<Voivodeship> findAll();

}

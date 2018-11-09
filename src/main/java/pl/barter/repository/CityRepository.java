package pl.barter.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import pl.barter.model.City;

import java.util.List;

@Repository
public interface CityRepository extends JpaRepository<City,Long> {

    List<City> findAll();

    List<City> findByVoivoId(@Param("voivoId") Long voivoId);
}

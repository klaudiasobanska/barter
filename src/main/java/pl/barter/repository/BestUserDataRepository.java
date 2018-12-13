package pl.barter.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.barter.model.BestUserData;

import java.util.List;

@Repository
public interface BestUserDataRepository extends JpaRepository<BestUserData,Long> {
    List<BestUserData> getRating();
}

package pl.barter.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.barter.model.BestUserData;

import java.util.List;

public interface BestUserDataRepository extends JpaRepository<BestUserData,Long> {
    List<BestUserData> getRating();
}

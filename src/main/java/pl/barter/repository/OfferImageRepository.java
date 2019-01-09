package pl.barter.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import pl.barter.model.OfferImage;

import java.util.List;

@Repository
public interface OfferImageRepository extends JpaRepository<OfferImage, Long> {


    List<OfferImage> findAll();

    @Query(value = "SELECT nextval('offers_images_id_seq')", nativeQuery =
            true)
    Long getNextSeriesId();

    List<OfferImage>findByOfferId(@Param("offerId") Long offerId);
}

package pl.barter.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import pl.barter.model.TransactionState;

import javax.transaction.Transactional;
import java.util.List;

public interface TransactionOfferRepository extends JpaRepository<TransactionState, Long> {


    List<TransactionState> findAll();

    @Query(value = "SELECT nextval('transaction_offers_id_seq')", nativeQuery =
            true)
    Long getNextSeriesId();

    @Modifying
    @Transactional
    @Query("update TransactionState set sellerAccept = true where offerId = :offerId")
    void acceptOfferSeller(@Param("offerId") Long offerId);

    @Modifying
    @Transactional
    @Query("delete from TransactionState where offerId=:offerId")
    void deleteOfferSeller(@Param("offerId") Long offerId);

    Page<TransactionState> findByTransactionId(@Param("transactionId") Long transactionId, Pageable pageable);


}

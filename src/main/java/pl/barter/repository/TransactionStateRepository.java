package pl.barter.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import pl.barter.model.TransactionState;

import java.util.List;

@Repository
public interface TransactionStateRepository extends JpaRepository<TransactionState, Long> {

    List<TransactionState> findAll();

    @Query(value = "SELECT nextval('transaction_state_id_seq')", nativeQuery =
            true)
    Long getNextSeriesId();

    List<TransactionState> findByTransactionId(@Param("transactionId") Long transactionId);
}

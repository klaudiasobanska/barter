package pl.barter.repository;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import pl.barter.model.Transaction;

import java.util.List;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {

    List<Transaction> findAll();

    @Query(value = "SELECT nextval('transactions_id_seq')", nativeQuery =
            true)
    Long getNextSeriesId();

    @Query(value = "select t.id, t.owner_id, t.client_id, t.offer_id, t.status, t.owner_accept, t.client_accept " +
            " from transactions t left join transaction_state ts on t.id = ts.transaction_id " +
            " where (( :ownerId = -1 or t.owner_id = cast(:ownerId as int) ) and (t.status = cast(1 as int)) and (ts.side_flag = cast(1 as int))) " +
            " group by t.id, t.owner_id, t.client_id, t.offer_id, t.status, t.owner_accept, t.client_accept, ts.transaction_id \n" +
            " having max(ts.step) = 1",
            countQuery = "select count(*) from ( select t.id, t.owner_id, t.client_id, t.offer_id, t.status, t.owner_accept, t.client_accept " +
                    "from transactions t left join transaction_state ts on t.id = ts.transaction_id " +
                    "where (( :ownerId = -1 or t.owner_id = cast(:ownerId as int) ) and (t.status = cast(1 as int)) and (ts.side_flag = cast(1 as int))) " +
                    "group by t.id, t.owner_id, t.client_id, t.offer_id, t.status, t.owner_accept, t.client_accept, ts.transaction_id  " +
                    "having max(ts.step) = cast(1 as int) ))",
            nativeQuery = true
    )
    List<Transaction> findNewProposal(@Param("ownerId") Long ownerId, Pageable pageable);

}

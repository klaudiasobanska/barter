package pl.barter.repository;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import pl.barter.model.Transaction;

import javax.transaction.Transactional;
import java.util.List;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {

    List<Transaction> findAll();

    @Query(value = "SELECT nextval('transactions_id_seq')", nativeQuery =
            true)
    Long getNextSeriesId();

    @Query(value = "select t.id, t.owner_id, t.client_id, t.offer_id, t.status, t.owner_accept, t.client_accept " +
            " from transactions t left join transaction_state ts on t.id = ts.transaction_id " +
            " where (( :ownerId = -1 or t.owner_id = cast(:ownerId as int) ) and (t.status = cast(1 as int)) and (ts.side_flag = cast(1 as int))) " +
            " group by t.id, t.owner_id, t.client_id, t.offer_id, t.status, t.owner_accept, t.client_accept, ts.transaction_id " +
            " having max(ts.step) = 1",
            countQuery = "select count(*) from ( select t.id, t.owner_id, t.client_id, t.offer_id, t.status, t.owner_accept, t.client_accept " +
                    "from transactions t left join transaction_state ts on t.id = ts.transaction_id " +
                    "where (( :ownerId = -1 or t.owner_id = cast(:ownerId as int) ) and (t.status = cast(1 as int)) and (ts.side_flag = cast(1 as int))) " +
                    "group by t.id, t.owner_id, t.client_id, t.offer_id, t.status, t.owner_accept, t.client_accept, ts.transaction_id  " +
                    "having max(ts.step) = cast(1 as int) ))",
            nativeQuery = true
    )
    List<Transaction> findNewProposal(@Param("ownerId") Long ownerId, Pageable pageable);


    @Query(value = "select t.id, t.owner_id, t.client_id, t.offer_id, t.status, t.owner_accept, t.client_accept " +
            " from transactions t left join transaction_state ts on t.id = ts.transaction_id " +
            " where (( :userId = -1 or t.client_id = cast(:userId as int) ) and (t.status = cast(1 as int)) and (ts.side_flag = cast(1 as int))) " +
            " group by t.id, t.owner_id, t.client_id, t.offer_id, t.status, t.owner_accept, t.client_accept, ts.transaction_id " +
            " having max(ts.step) = 1",
            countQuery = "select count(*) from ( select t.id, t.owner_id, t.client_id, t.offer_id, t.status, t.owner_accept, t.client_accept " +
                    "from transactions t left join transaction_state ts on t.id = ts.transaction_id " +
                    "where (( :userId = -1 or t.client_id = cast(:userId as int) ) and (t.status = cast(1 as int)) and (ts.side_flag = cast(1 as int))) " +
                    "group by t.id, t.owner_id, t.client_id, t.offer_id, t.status, t.owner_accept, t.client_accept, ts.transaction_id  " +
                    "having max(ts.step) = cast(1 as int) ))",
            nativeQuery = true
    )
    List<Transaction> findSendProposal(@Param("userId") Long userId, Pageable pageable);

    @Query(value = "select * from transactions t" +
            " where ((( :userId = -1 or t.client_id = cast(:userId as int) ) or ( :userId = -1 or t.owner_id = cast(:userId as int)) ) " +
            " and (t.status = cast(1 as int)) and (t.id in (select ts.transaction_id from transaction_state ts where ts.step <> 1))) ",
            countQuery = "select count(*) from transactions t " +
                    " where ((( :userId = -1 or t.client_id = cast(:userId as int) ) or ( :userId = -1 or t.owner_id = cast(:userId as int)) ) " +
                    " and (t.status = cast(1 as int)) and (t.id in (select ts.transaction_id from transaction_state ts where ts.step <> 1)))",
            nativeQuery = true
    )
    List<Transaction> findActiveProposal(@Param("userId") Long userId, Pageable pageable);


    Transaction findByClientIdAndOfferIdAndStatus(@Param("userId") Long userId, @Param("offerId") Long offerId, @Param("status") Integer status );


    @Query(value = "select * from transactions t" +
            " where ((( :userId = -1 or t.client_id = cast(:userId as int) ) or ( :userId = -1 or t.owner_id = cast(:userId as int)) ) " +
            " and (t.status = cast(2 as int))) ",
            countQuery = "select count(*) from transactions t " +
                    " where ((( :userId = -1 or t.client_id = cast(:userId as int) ) or ( :userId = -1 or t.owner_id = cast(:userId as int)) ) " +
                    " and (t.status = cast(2 as int)) )",
            nativeQuery = true
    )
    List<Transaction> findEndTransaction(@Param("userId") Long userId, Pageable pageable);



    @Modifying
    @Transactional
    @Query("update Transaction set status = 2 where id=:id")
    void successTransaction(@Param("id") Long id);

    @Modifying
    @Transactional
    @Query("delete from Transaction where id=:id")
    void rejectTransaction(@Param("id") Long id);

}

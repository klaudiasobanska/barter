package pl.barter.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import pl.barter.model.Product;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;
import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    List<Product> findAll();

    @Query(value = "SELECT nextval('products_id_seq')", nativeQuery =
            true)
    Long getNextSeriesId();


    @Query(value = "select * from products p where ((p.active = true) and (p.name like :param) and (:categoryId = -1 or p.category_id = cast(:categoryId as int)) " +
            " and (((:cityId = -1 and :voivoId=-1) or (p.city_id = cast(:cityId as int))) or ( :voivoId <> -1 and p.city_id in (select c.id from city c where c.voivo_id = cast(:voivoId as int))))) ",
            countQuery = "select * from products p where ((p.active = true) and (p.name like :param) and (:categoryId = -1 or p.category_id = cast(:categoryId as int)) " +
                    " and (((:cityId = -1 and :voivoId=-1) or (p.city_id = cast(:cityId as int))) or ( :voivoId <> -1 and p.city_id in (select c.id from city c where c.voivo_id = cast(:voivoId as int))))) ",
            nativeQuery = true)
    List<Product> findProductByFilters(@Param("param") String param,
                                       @Param("categoryId") Long categoryId,
                                       @Param("cityId") Long cityId,
                                       @Param("voivoId") Long voivoId);

    @Query(value = "select * from products p where (p.active = true) and (p.name like :param) and (:categoryId = -1 or p.category_id = cast(:categoryId as int)) " +
            " and ((p.city_id = cast(:cityId as int) and :cityId <> -1) or (:cityId = -1 and :voivoId = -1) or (:cityId = -1 and :voivoId <> -1 and p.city_id in (select c.id from city c where c.voivo_id = cast(:voivoId as int)))) ",
            countQuery =" select * from products p where (p.active = true) and (p.name like :param) and (:categoryId = -1 or p.category_id = cast(:categoryId as int)) " +
                    " and ((p.city_id = cast(:cityId as int) and :cityId <> -1) or (:cityId = -1 and :voivoId = -1) or (:cityId = -1 and :voivoId <> -1 and p.city_id in (select c.id from city c where c.voivo_id = cast(:voivoId as int)))) ",
            nativeQuery = true)
    Page<Product> findProductByFiltersVersionTwo(@Param("param") String param,
                                       @Param("categoryId") Long categoryId,
                                       @Param("cityId") Long cityId,
                                       @Param("voivoId") Long voivoId,
                                       Pageable pageable);


    Page<Product> findByCategoryIdAndActive(@Param("categoryId") Long categoryId,@Param("active") Boolean active, Pageable pageable);

    @Query(value = "select * from products where active=true order by random() limit 10", nativeQuery = true)
    List<Product> findRandomProduct();

    @Query(value = "select * from products where active=true order by creation_date desc limit 10", nativeQuery = true)
    List<Product> findLatestProduct();

    @Query(value = "select * from products where active=true order by creation_date desc",nativeQuery = true)
    List<Product> findLatestProductAll(Pageable pageable);

    @Query(value = "select * from products p where owner_id = :ownerId and p.active = :active ",
        countQuery = "select count(*) from products p where owner_id = :ownerId and p.active = :active ",
        nativeQuery = true)
    Page<Product> findByOwnerIdAndActivePage(@Param("ownerId") Long ownerId,@Param("active") Boolean active, Pageable pageable);

    List<Product> findByOwnerIdAndActive(@Param("ownerId") Long ownerId,@Param("active") Boolean active);

    @Query(value = "select * from products where active=true order by random()", nativeQuery = true)
    List<Product> findAllRandom(Pageable pageable);


    /*@Query("select p from Product p where p.id not in (:paramList) and p.ownerId = :ownerId and p.active = true")
    List<Product> findProductNotInOffer(@Param("paramList") List<Long> paramList,
                                         @Param("ownerId") Long ownerId);*/

    @Query("select p from Product p where p.id <> :productId and p.ownerId = :ownerId and p.active = true")
    List<Product> findProductNotInProductPage(@Param("productId") Long productId,
                                         @Param("ownerId") Long ownerId);


    @Query("select p from Product p where p.id = :productId and active = true")
    Product findActiveProduct(@Param("productId") Long productId);


    @Query(value = "select distinct p.* from transactions t, products p, transaction_state ts " +
            " where (ts.transaction_id = t.id) and (p.id = ts.offer_id) and (p.active = false) and (t.status <> 2) and (p.owner_id = :ownerId) " +
            " and (p.id not in (select distinct t.offer_id from transactions t where p.id = t.offer_id )) ",
    nativeQuery = true)
    List<Product> findProductToDelete(@Param("ownerId") Long ownerId);


    List<Product> findByIdIn(List<Long> ids);


    @Modifying
    @Transactional
    @Query("delete from Product where id=:id")
    void deleteProduct(@Param("id") Long id);

    @Modifying
    @Transactional
    @Query("update Product set active= :active where id=:id")
    void activeProduct(@Param("id") Long id,
                    @Param("active") Boolean active);

    @Modifying
    @Transactional
    @Query("update Product set name = :name, categoryId = :categoryId, description = :description where id = :id")
    void updateProduct(@Param("id") Long id,
                    @Param("name") String name,
                    @Param("categoryId") Long categoryId,
                    @Param("description") String description);

    @Query(value = "select * from products p where (p.id in (select ts.offer_id from transaction_state ts " +
            " where ((( (:transactionId = -1) or (ts.transaction_id = cast(:transactionId as int) )) "+
            " and (step=(select max(t.step) from transaction_state t where ((:transactionId = -1) or (t.transaction_id = cast(:transactionId as int))))) ))))",
            nativeQuery = true)
    List<Product> getClientOfferSuccessTransaction(@Param("transactionId") Long transactionId);





}

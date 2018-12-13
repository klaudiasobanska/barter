package pl.barter.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import pl.barter.model.Product;

import javax.transaction.Transactional;
import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    List<Product> findAll();


    @Query(value = "select * from products p where (p.name like :param) and (:categoryId = -1 or p.category_id = cast(:categoryId as int)) " +
            " and (((:cityId = -1 and :voivoId=-1) or (p.city_id = cast(:cityId as int))) or ( :voivoId <> -1 and p.city_id in (select c.id from city c where c.voivo_id = cast(:voivoId as int)))) ",
            countQuery = "select count(*) from products p where (p.name like :param) and ((:categoryId = -1 or p.category_id = cast(:categoryId as int)) " +
                    " or (:cityId = -1 or p.city_id = cast(:cityId as int)) and (p.city_id in (select c.id from city c where c.voivo_id = cast(:voivoId as int)))) ",
            nativeQuery = true)
    Page<Product> findProductByFilters(@Param("param") String param,
                                         @Param("categoryId") Long categoryId,
                                       @Param("cityId") Long cityId,
                                       @Param("voivoId") Long voivoId,
                                       Pageable pageable);

    Page<Product> findByCategoryId(@Param("categoryId") Long categoryId, Pageable pageable);

    @Query(value = "select * from products order by random() limit 10", nativeQuery = true)
    List<Product> findRandomProduct();

    @Query(value = "select * from products where (creation_date = current_date) or (creation_date >= current_date - integer '1') order by random() limit 10", nativeQuery = true)
    List<Product> findLatestProduct();

    @Query(value = "select * from products where (creation_date = current_date) and (creation_date >= current_date - integer '1')",nativeQuery = true)
    List<Product> findLatestProductAll(Pageable pageable);

    List<Product> findByOwnerIdAndActive(@Param("ownerId") Long ownerId,@Param("active") Boolean active);

    @Query(value = "select * from products order by random()", nativeQuery = true)
    List<Product> findAllRandom(Pageable pageable);


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
}

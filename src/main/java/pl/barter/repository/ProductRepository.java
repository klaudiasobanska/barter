package pl.barter.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import pl.barter.model.Product;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    List<Product> findAll();


    @Query(value = "select * from products p where (p.name like :param) and (:categoryId = -1 or category_id = cast(:categoryId as int))",
            countQuery = "select count(*) from products p where (p.name like :param) and (:categoryId = -1 or category_id = cast(:categoryId as int))",
            nativeQuery = true)
    Page<Product> findProductByFilters(@Param("param") String param,
                                         @Param("categoryId") Long categoryId,
                                       Pageable pageable);

    Page<Product> findByCategoryId(@Param("categoryId") Long categoryId, Pageable pageable);

    @Query(value = "select * from products order by random() limit 10", nativeQuery = true)
    List<Product> findRandomProduct();

    @Query(value = "select * from products where (creation_date = current_date) or (creation_date >= current_date - integer '1') order by random() limit 10", nativeQuery = true)
    List<Product> findLatestProduct();

    @Query(value = "select * from products where (creation_date = current_date) and (creation_date >= current_date - integer '1')",nativeQuery = true)
    List<Product> findLatestProductAll(Pageable pageable);
}

package pl.barter.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.web.multipart.MultipartFile;
import pl.barter.model.Product;
import pl.barter.model.User;

import javax.transaction.Transactional;
import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User,Long> {

    List<User> findAll();

    List<User> findByLogin(String login);

    @Query(value="select * from users  where (rating >= 4.8) order by random() limit 5", nativeQuery = true )
    List<User> findByBestRating1();


    @Query(value = "select u from User u where u.id=:ownerId")
    User findByProduct(@Param("ownerId") Long ownerId);

    @Query(value="select * from users  where login = :login and password = :password", nativeQuery = true )
    User findByLoginAndPassword(@Param("login") String login, @Param("password") String password);

    @Modifying
    @Transactional
    @Query("update User set forename = :forename, surname = :surname, email = :email, address = :address, city = :city, zipCode = :zipCode where id = :id")
    void updateUser(@Param("id") Long id,
                    @Param("forename") String forename,
                    @Param("surname") String surname,
                    @Param("email") String email,
                    @Param("address") String address,
                    @Param("city") String city,
                    @Param("zipCode") String zipCode);

    @Modifying
    @Transactional
    @Query("update User set image=:image where id=:id")
    void addImage(@Param("image") byte[] image,
                       @Param("id") Long id);



}

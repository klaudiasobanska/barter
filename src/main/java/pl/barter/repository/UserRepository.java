package pl.barter.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import pl.barter.model.User;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User,Long> {

    List<User> findAll();

    List<User> findByLogin(String login);

    @Query(value="select * from users  where (rating >= 4.8) order by random() limit 5", nativeQuery = true )
    List<User> findByBestRating1();


    @Query(value = "select u from User u where u.id=:ownerId")
    User findByProduct(@Param("ownerId") Long ownerId);

}

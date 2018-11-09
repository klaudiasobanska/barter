package pl.barter.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import pl.barter.exception.ResourceNotFoundException;
import pl.barter.model.BestUserData;
import pl.barter.model.User;
import pl.barter.model.UserHelperService;
import pl.barter.model.dto.UserDto;
import pl.barter.repository.BestUserDataRepository;
import pl.barter.repository.UserRepository;

import javax.validation.Valid;
import java.util.List;
import java.util.Map;

@RestController
public class UserController extends AbstractController {

    @Autowired
    UserRepository usersRepository;

    @Autowired
    UserHelperService userHelperService;

    @Autowired
    BestUserDataRepository bestUserDataRepository;

    @RequestMapping("/users/all")
    public List<User> findAll() {
        return usersRepository.findAll();
    }

    @PostMapping(path = "/users/add", produces = MediaType.APPLICATION_JSON_VALUE)
    public Map<String, Object> createUser(@RequestBody User user) {
        List<User> ret = usersRepository.findByLogin(user.getLogin());
        if (ret.size() > 0) {
            return simpleErrorResult("Login jest zajęty");
        }

        User currentUser = (User) session.getAttribute("user");

        usersRepository.save(user);
        return simpleOkResult();
    }


    @GetMapping("/users/find/{id}")
    public User getUserById(@PathVariable(value = "id") Long id) {
        return usersRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", id));
    }

    @PutMapping("/users/{id}")
    public User updateUser(@PathVariable(value = "id") Long id,
                           @Valid @RequestBody User userDetails) {

        User user = usersRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", id));

        user.setForename(userDetails.getForename());
        user.setLogin(userDetails.getLogin());
        user.setPassword(userDetails.getPassword());
        user.setSurname(userDetails.getSurname());
        user.setAddress(userDetails.getAddress());
        user.setRating(userDetails.getRating());
        user.setEmail(userDetails.getEmail());


        User updatedUser = usersRepository.save(user);
        return updatedUser;
    }

    @GetMapping("/users/current")
    public UserDto getCurrentUser() {
        if (session.getAttribute("user") != null) {
            User user = (User) session.getAttribute("user");
            return userHelperService.mapToDto(user);
        } else {
            return new UserDto();
        }

    }

    @GetMapping("/users/rating")
    public List<BestUserData> getUserByRating(){
        List<BestUserData> users = bestUserDataRepository.getRating();
        return users;
    }


    @GetMapping("/users/product")
    public UserDto getUserByProduct(@RequestParam("ownerId") Long ownerId){

        User user = usersRepository.findByProduct(ownerId);
        return userHelperService.mapToDto(user);
    }
}

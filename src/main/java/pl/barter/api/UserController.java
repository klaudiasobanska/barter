package pl.barter.api;

import org.apache.el.parser.ParseException;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import pl.barter.exception.ResourceNotFoundException;
import pl.barter.model.BestUserData;
import pl.barter.model.Product;
import pl.barter.model.User;
import pl.barter.model.UserHelperService;
import pl.barter.model.dto.UserDto;
import pl.barter.repository.BestUserDataRepository;
import pl.barter.repository.ProductRepository;
import pl.barter.repository.UserRepository;


import javax.validation.Valid;
import java.io.ByteArrayInputStream;
import java.io.IOException;
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

    @Autowired
    ProductRepository productRepository;

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

        //User currentUser = (User) session.getAttribute("user");

        usersRepository.save(user);
        return simpleOkResult();
    }


    @GetMapping("/users/find/{id}")
    public User getUserById(@PathVariable(value = "id") Long id) {
        User user = usersRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", id));

        return user;
    }

    @PutMapping("/users/{id}")
    public User changeUser(@PathVariable(value = "id") Long id,
                           @Valid @RequestBody User userDetails) {

        User user = usersRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", id));

        user.setForename(userDetails.getForename());
        user.setSurname(userDetails.getSurname());
        user.setEmail(userDetails.getEmail());
        user.setAddress(userDetails.getAddress());
        user.setCity(userDetails.getCity());
        user.setZipCode(userDetails.getZipCode());


        User updatedUser = usersRepository.save(user);
        return updatedUser;
    }

    @PostMapping("/users/edit")
    public ResponseEntity updateUser(@RequestParam("id") Long id,
                                               @RequestParam("forename") String forename,
                                               @RequestParam("surname") String surname,
                                               @RequestParam("email") String email,
                                               @RequestParam("address") String address,
                                               @RequestParam("city") String city,
                                               @RequestParam("zipCode") String zipCode
                                               ) {
        usersRepository.updateUser(id, forename,surname, email, address,city,zipCode);
        return ResponseEntity.ok().build();
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

    @RequestMapping(value = "/image/upload", method = RequestMethod.POST)
    public @ResponseBody
    Boolean uploadDocument(@RequestParam("files") MultipartFile files,
                           @RequestParam("id") Long id) throws IOException {

       /* for (MultipartFile file : files) {

            if (file.isEmpty()) {
                continue;
            }
            try {*/
                byte[] bytes = files.getBytes();
                usersRepository.addImage(bytes,id);

            /*} catch (IOException e) {
                e.printStackTrace();
            }
*/
      //  }

        return true;
    }

    @PostMapping("/users/delete/fav")
    public Map<String, Object> deleteFav(@RequestParam("productId") Long productId, @RequestParam("userId") Long userId){

        Product product =  productRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Product", "productId", productId));

        User user =  usersRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "userId", userId));

        user.getFav().remove(product);

        product.getUsers().remove(user);

        usersRepository.save(user);

        return simpleOkResult();
    }


    @PostMapping("/users/add/fav")
    public ResponseEntity addFav(@RequestParam("productId") Long productId, @RequestParam("userId") Long userId){

        Product product =  productRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Product", "productId", productId));

        User user =  usersRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "userId", userId));

        user.getFav().add(product);
        product.getUsers().add(user);

        usersRepository.save(user);

        return ResponseEntity.ok().build();

    }

}

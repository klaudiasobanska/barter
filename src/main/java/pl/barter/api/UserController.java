package pl.barter.api;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.MediaType;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.util.Base64Utils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import pl.barter.exception.ResourceNotFoundException;
import pl.barter.mapper.ProductMap;
import pl.barter.model.*;
import pl.barter.model.dto.UserDto;
import pl.barter.repository.ProductRepository;
import pl.barter.repository.UserRepository;
import pl.barter.security.CurrentUser;
import pl.barter.security.UserPrincipal;
import pl.barter.service.UserHelperService;


import javax.validation.Valid;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;
import java.util.Map;

@RestController
public class UserController extends AbstractController {

    private static Long DEFAULT_IMAGE = 0L;

    @Autowired
    UserRepository usersRepository;

    @Autowired
    UserHelperService userHelperService;

    @Autowired
    ProductRepository productRepository;

    @Autowired
    ProductMap productMap;

    @Autowired
    PasswordEncoder passwordEncoder;

    @RequestMapping("/users/all")
    public List<User> findAll() {
        return usersRepository.findAll();
    }

   /* @PostMapping(path = "/users/add", produces = MediaType.APPLICATION_JSON_VALUE)
    public Map<String, Object> createUser(@RequestBody User user) {
        List<User> ret = usersRepository.findByLogin(user.getUsername());
        if (ret.size() > 0) {
            return simpleErrorResult("Login jest zajęty");
        }

        //User currentUser = (User) session.getAttribute("user");

        usersRepository.save(user);
        return simpleOkResult();
    }*/


    @GetMapping("/users/find/{id}")
    public UserDto getUserById(@PathVariable(value = "id") Long id) {
        User user = usersRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", id));

        String imageStringList = "";
        if(user.getImage()!=null){
            imageStringList = ("data:"+user.getImageType()+";base64,"+Base64Utils.encodeToString(user.getImage())) ;
        }

        UserDto userDto = userHelperService.mapToDto(user);
        userDto.setImageString(imageStringList);

        return userDto;
    }




    @RequestMapping(path = "/users/update", method = RequestMethod.PUT, produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
    public  Map<String, Object>  changeUser(@CurrentUser UserPrincipal currentUser,
                           @Valid @RequestBody User userDetails) {

        User user = usersRepository.findById(currentUser.getId())
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", currentUser.getId()));

        user.setForename(userDetails.getForename());
        user.setSurname(userDetails.getSurname());
        user.setEmail(userDetails.getEmail());
        user.setAddress(userDetails.getAddress());
        user.setCity(userDetails.getCity());
        user.setZipCode(userDetails.getZipCode());


         usersRepository.save(user);
        return simpleOkResult();
    }

    @RequestMapping(path = "/users/update/password", method = RequestMethod.PUT, produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
    public  Map<String, Object>  changeUser(@CurrentUser UserPrincipal currentUser,
                                            @Valid @RequestBody NewPasswordRequest passwordRequest) {

        User user = usersRepository.findById(currentUser.getId())
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", currentUser.getId()));


        if(!passwordEncoder.matches(passwordRequest.getOldPassword(),user.getPassword())){
            return simpleErrorResult("old");
        }


        user.setPassword(passwordEncoder.encode(passwordRequest.getNewPassword()));

        usersRepository.save(user);
        return simpleOkResult();
    }


    @GetMapping("/users/current")
    public UserDto getCurrentUser(@CurrentUser UserPrincipal currentUser) {

        User user = usersRepository.findById(currentUser.getId())
                .orElseThrow(() -> new ResourceNotFoundException("User", "userId", currentUser.getId()));

        String imageStringList = "";
        if(user.getImage()==null){
            User user0 = usersRepository.findById(DEFAULT_IMAGE).get();
            imageStringList = ("data:"+user0.getImageType()+";base64,"+Base64Utils.encodeToString(user0.getImage())) ;
        }

        if(user.getImage()!=null){
            imageStringList= ("data:"+user.getImageType()+";base64,"+Base64Utils.encodeToString(user.getImage())) ;

        }


        UserDto userDto = userHelperService.mapToDto(user);
        userDto.setImageString(imageStringList);

        userDto.getFav().forEach(p-> productMap.map(p));

        return userDto;
    }



    @GetMapping("/users/product")
    public UserDto getUserByProduct(@RequestParam("ownerId") Long ownerId) {

        User user = usersRepository.findByProduct(ownerId);

        return userHelperService.mapToDto(user);
    }

    @RequestMapping(value = "/image/upload", method = RequestMethod.POST)
    public @ResponseBody
    Boolean uploadDocument(@RequestParam("file") MultipartFile files,
                           @RequestParam("id") Long id) throws IOException {
        usersRepository.addImage(files.getBytes(), id);
        usersRepository.addImageType(files.getContentType(),id);
        return true;
    }

    @RequestMapping(value = "/image/upload/string", method = RequestMethod.POST)
    public @ResponseBody
    Map<String, Object> uploadDocument(@Valid @RequestBody UserImage userImage) throws IOException {
        byte[] encoded = Base64.getDecoder().decode(userImage.getFile());
        usersRepository.addImage(encoded, userImage.getId());
        usersRepository.addImageType(userImage.getType(),userImage.getId());
        return simpleOkResult();
    }


    @GetMapping("/image/user")
    public List<String> getImageUser(@RequestParam("userId") Long userId){

        User user = usersRepository.findById(userId).orElseThrow(() -> new ResourceNotFoundException("User", "userId", userId));

        List<String> imageStringList = new ArrayList<>();

        if(user.getImage()!=null){
            imageStringList.add("data:"+user.getImageType()+";base64,"+Base64Utils.encodeToString(user.getImage())) ;

        }

        if(user.getImage()==null){
            User user0 = usersRepository.findById(DEFAULT_IMAGE).get();
            imageStringList.add("data:"+user0.getImageType() + ";base64,"+Base64Utils.encodeToString(user0.getImage()));
        }


        return imageStringList;

    }

    @PostMapping("/users/delete/fav")
    public UserDto deleteFav(@RequestParam("productId") Long productId, @RequestParam("userId") Long userId) {

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Product", "productId", productId));

        User user = usersRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "userId", userId));

        user.getFav().remove(product);

        product.getUsers().remove(user);

        usersRepository.save(user);

        return userHelperService.mapToDto(user);
    }


    @PostMapping("/users/add/fav")
    public  Map<String, Object> addFav(@RequestParam("productId") Long productId,
                                       @CurrentUser UserPrincipal currentUser,
                                       @RequestParam("userId") Long userId) {

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Product", "productId", productId));

        User user = usersRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "userId", userId));

        User current = usersRepository.findById(currentUser.getId())
                .orElseThrow(() -> new ResourceNotFoundException("User", "userId", currentUser.getId()));


        if(user.getId().equals(current.getId())){
            return simpleErrorResult("owner");
        }
        if(current.getFav().contains(product)){
            return simpleErrorResult("inFav");
        }else {

            current.getFav().add(product);
            product.getUsers().add(current);

            usersRepository.save(current);
            return simpleOkResult();
        }
    }



}

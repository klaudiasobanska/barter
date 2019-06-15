package pl.barter.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import pl.barter.api.AbstractController;
import pl.barter.model.User;
import pl.barter.repository.UserRepository;

import java.security.Principal;

@Controller
public class HomeController extends AbstractController {

    @Autowired
    UserRepository userRepository;


    @RequestMapping(value = "/home", method = RequestMethod.GET)
    public String home() {
        return "home";
    }
}

package pl.barter.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import pl.barter.api.AbstractController;
import pl.barter.repository.UserRepository;


@Controller
public class RegistrationPageController extends AbstractController {

    @Autowired
    UserRepository userRepository;

    @RequestMapping("/registration")
    public String login() {
        return "registration";
    }


}

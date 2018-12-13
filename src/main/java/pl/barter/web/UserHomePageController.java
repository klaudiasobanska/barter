package pl.barter.web;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class UserHomePageController {
    @RequestMapping(value = "/user", method = RequestMethod.GET)
    public String user() {
        return "user";
    }
}

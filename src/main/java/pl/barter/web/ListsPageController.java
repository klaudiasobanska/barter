package pl.barter.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import pl.barter.api.AbstractController;
import pl.barter.model.Filter;
import pl.barter.model.ProductMap;
import pl.barter.repository.ProductRepository;


@Controller
public class ListsPageController extends AbstractController {

    @Autowired
    ProductRepository productRepository;

    @Autowired
    ProductMap productMap;


    public void clearSession(){
        session.setAttribute("filter",new Filter());
    }

    @RequestMapping(value="/lists")
    public String lists(@RequestParam("param") String param,
                        @RequestParam("categoryId") Long categoryId,
                        @RequestParam("latest") Boolean lates,
                        @RequestParam("random") Boolean random){

        clearSession();
        Filter filter = new Filter(param,categoryId, lates, random);

        session.setAttribute("filter", filter);

        return "lists";
    }

    /*@RequestMapping(value="/lists/latest")
    public String listsLatest(@RequestParam("latest") boolean latest){
        session.setAttribute("latest", latest);
        return "lists";
    }*/

}
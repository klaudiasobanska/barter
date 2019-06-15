package pl.barter.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import pl.barter.api.AbstractController;
import pl.barter.model.Filter;
import pl.barter.mapper.ProductMap;
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
                        @RequestParam("cityId") Long cityId,
                        @RequestParam("voivoId") Long voivoId,
                        @RequestParam("latest") Boolean lates,
                        @RequestParam("random") Boolean random){
        String cityName = "";
        clearSession();
        Filter filter = new Filter(param,categoryId, lates, random, cityId, voivoId, cityName);

        session.setAttribute("filter", filter);

        return "lists";
    }


}

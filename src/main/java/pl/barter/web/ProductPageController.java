package pl.barter.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.web.bind.annotation.RequestParam;

import pl.barter.exception.ResourceNotFoundException;
import pl.barter.model.Product;
import pl.barter.repository.ProductRepository;
import pl.barter.api.AbstractController;



@Controller
public class ProductPageController extends AbstractController {

    @Autowired
    ProductRepository productRepository;

    public void clearSession(){
        session.setAttribute("products", new Product());
    }

    @RequestMapping(value = "/product")
    public String product(@RequestParam("productId") Long productId) {
        clearSession();
        session.setAttribute("products", productRepository.findById(productId).orElseThrow(() -> new ResourceNotFoundException("Product", "productId", productId)) );
        return "product";
    }


}

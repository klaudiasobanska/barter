package pl.barter.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;
import pl.barter.exception.ResourceNotFoundException;
import pl.barter.model.Filter;
import pl.barter.model.Product;
import pl.barter.model.ProductMap;
import pl.barter.repository.ProductRepository;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;


@RestController
public class ProductController extends AbstractController {

    @Autowired
    ProductRepository productRepository;

    @Autowired
    ProductMap productMap;

    @RequestMapping("/products/all")
    public List<Product> findAll() {
        return productRepository.findAll();
    }

    @PostMapping("/products/add")
    public Product createProduct(@Valid @RequestBody Product product) {
        return productRepository.save(product);
    }

    @GetMapping("/products/{id}")
    public Product getProductById(@PathVariable(value = "id") Long id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product", "id", id));
    }

    @PutMapping("/products/{id}")
    public Product updateProduct(@PathVariable(value = "id") Long id,
                               @Valid @RequestBody Product productDetails) {

        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product", "id", id));

        product.setName(productDetails.getName());
        product.setActive(productDetails.getActive());
        product.setCategoryId(productDetails.getCategoryId());
        product.setDescription(productDetails.getDescription());
        product.setPrice(productDetails.getPrice());
        product.setOwnerId(productDetails.getOwnerId());
        product.setImage(productDetails.getImage());


        Product updatedProduct = productRepository.save(product);
        return updatedProduct;
    }

    @GetMapping("/products/search")
    public Page<Product> getProductByFilters(@RequestParam("param") String param,
                                             @RequestParam("categoryId") Long categoryId,
                                             Pageable pageable){
        Page<Product> products = productRepository.findProductByFilters("%"+param+"%",categoryId, pageable);
        products.forEach(p -> productMap.map(p));
        return products;
    }

    @GetMapping("/products/category")
    public Page<Product> getProductByCategory(@RequestParam("categoryId") Long categoryId,
                                              Pageable pageable){
        Page<Product> products = productRepository.findByCategoryId(categoryId, pageable);
        products.forEach(p -> productMap.map(p));
        return  products;
    }

    @GetMapping("/products/current")
    public Product getCurrentProduct() {
        if (session.getAttribute("products") != null) {
            Product pr = (Product) session.getAttribute("products");
            pr = productMap.map(pr);
            return pr;
        } else {
            return new Product();
        }

    }

    @GetMapping("/products/latest/current")
    public boolean getCurrentLatestProduct() {
        if (session.getAttribute("latest") == null) {
            Boolean l = (Boolean) session.getAttribute("latest");
            return l;
        } else {
            return false;
        }

    }

    @GetMapping("/filters/current")
    public Filter getFilters() {

         Filter filter = (Filter) session.getAttribute("filter");

         return filter;
    }

    @GetMapping("/products/random")
    public List<Product> getRandomProduct(){
        List<Product> products = productRepository.findRandomProduct();
        products.forEach(p->productMap.map(p));
        return products;
    }

    @GetMapping("/products/latest")
    public List<Product> getLatestProduct(){
        List<Product> products = productRepository.findLatestProduct();
        products.forEach(p->productMap.map(p));
        return products;
    }

    @GetMapping("/products/latest/all")
    public List<Product> getLatestProductAll(Pageable pageable){
        List<Product> products = productRepository.findLatestProductAll(pageable);
        products.forEach(p->productMap.map(p));
        return products;
    }
}

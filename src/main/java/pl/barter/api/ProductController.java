package pl.barter.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
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
    public ResponseEntity updateProduct(@PathVariable(value = "id") Long id,
                               @Valid @RequestBody Product productDetails) {

        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product", "id", id));

        product.setName(productDetails.getName());
        product.setCategoryId(productDetails.getCategoryId());
        product.setDescription(productDetails.getDescription());
        product.setImage(productDetails.getImage());


        Product updatedProduct = productRepository.save(product);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/products/search")
    public Page<Product> getProductByFilters(@RequestParam("param") String param,
                                             @RequestParam("categoryId") Long categoryId,
                                             @RequestParam("cityId") Long cityId,
                                             @RequestParam("voivoId") Long voivoId,
                                             Pageable pageable){
        Page<Product> products = productRepository.findProductByFilters("%"+param+"%",categoryId,cityId,voivoId, pageable);
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

    @GetMapping("/products/random/all")
    public List<Product> getAllRandom(Pageable pageable){
        List<Product> products = productRepository.findAllRandom(pageable);
        products.forEach(p->productMap.map(p));
        return products;
    }

    @GetMapping("/products/owner")
    public List<Product> getProductByUserId(@RequestParam("ownerId") Long ownerId,
                                            @RequestParam("active") Boolean active){
        List<Product> products = productRepository.findByOwnerIdAndActive(ownerId,active);
        products.forEach(p->productMap.map(p));
        return products;
    }

    @PostMapping("/products/delete")
    public ResponseEntity deleteProduct(@RequestParam("id") Long id) {

        productRepository.deleteProduct(id);

        return ResponseEntity.ok().build();

    }

    @PostMapping("/products/active")
    public ResponseEntity activeProduct(@RequestParam("id") Long id,
                                     @RequestParam("active") Boolean active) {
        productRepository.activeProduct(id, active);
        return ResponseEntity.ok().build();
    }

    @PostMapping(path = "/products/update")
    public ResponseEntity changeProduct(@RequestParam("id") Long id,
                                        @RequestParam("name") String name,
                                        @RequestParam("categoryId") Long categoryId,
                                        @RequestParam("description") String description) {

        productRepository.updateProduct(id,name,categoryId,description);
        return ResponseEntity.ok().build();
    }
}

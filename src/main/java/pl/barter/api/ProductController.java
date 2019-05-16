package pl.barter.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import pl.barter.exception.ResourceNotFoundException;
import pl.barter.model.*;
import pl.barter.model.dto.ProductDto;
import pl.barter.repository.OfferImageRepository;
import pl.barter.repository.ProductRepository;

import java.io.IOException;
import java.util.*;


@RestController
public class ProductController extends AbstractController {

    @Autowired
    ProductRepository productRepository;

    @Autowired
    ProductMap productMap;

    @Autowired
    OfferImageRepository offerImageRepository;

    @Autowired
    FilterMap filterMap;

    @RequestMapping("/products/all")
    public List<Product> findAll() {
        return productRepository.findAll();
    }

    private Product fromDto(ProductDto productDto, List<OfferImage> files) {
        Product p = new Product();
        p.setId(productRepository.getNextSeriesId());
        p.setName(productDto.getName());
        p.setOwnerId(productDto.getOwnerId());
        p.setActive(productDto.getActive());
        p.setDescription(productDto.getDescription());
        p.setCategoryId(productDto.getCategoryId());
        p.setCityId(productDto.getCityId());
        p.setCreationDate(productDto.getCreationDate());

        for (OfferImage offerImage : files) {
            offerImage.setId(offerImageRepository.getNextSeriesId());
            offerImage.setOfferId(p.getId());

            p.getOfferImagesList().add(offerImage);
        }


        return p;
    }

    private Product fromDtoUpdate(ProductDto productDto, List<OfferImage> files) {
        Product p = new Product();
        p.setId(productDto.getId());
        p.setName(productDto.getName());
        p.setOwnerId(productDto.getOwnerId());
        p.setActive(productDto.getActive());
        p.setDescription(productDto.getDescription());
        p.setCategoryId(productDto.getCategoryId());
        p.setCityId(productDto.getCityId());
        p.setCreationDate(productDto.getCreationDate());

        for (OfferImage offerImage : files) {
            offerImage.setId(offerImageRepository.getNextSeriesId());
            offerImage.setOfferId(p.getId());

            p.getOfferImagesList().add(offerImage);
        }


        return p;

    }

    @PostMapping(path = "/auth/products/add", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
    public Product addProduct(@RequestBody ProductDto productDto) {


        List<OfferImage> files = (List<OfferImage>) session.getAttribute("files");
        if (files == null) {
            files = new ArrayList<>();
        }

        Product newProduct = fromDto(productDto, files);

        Product product = productRepository.save(newProduct);
        session.setAttribute("files", new ArrayList<>());
        return product;
    }

    @GetMapping("/clear/session/img")
    public ResponseEntity clearSession(){
        session.setAttribute("files", new ArrayList<>());
        return ResponseEntity.ok().build();
    }


    @GetMapping("/products/{id}")
    public Product getProductById(@PathVariable(value = "id") Long id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product", "id", id));
    }


    @PutMapping(path ="/auth/products/{id}", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
    public Map<String, Object> updateProduct(@PathVariable(value = "id") Long id,
                                        @RequestBody ProductDto productDto) {

        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product", "id", id));

        List<OfferImage> files = (List<OfferImage>) session.getAttribute("files");
        if (files == null) {
            files = new ArrayList<>();
        }

        productDto.setId(product.getId());

        Product newProduct = fromDtoUpdate(productDto, files);

        product.setName(newProduct.getName());
        product.setCategoryId(newProduct.getCategoryId());
        product.setCityId(newProduct.getCityId());
        product.setDescription(newProduct.getDescription());
        product.setOfferImagesList(newProduct.getOfferImagesList());

        productRepository.save(product);
        session.setAttribute("files", new ArrayList<>());

        return simpleOkResult();
    }

    @GetMapping("/products/search")
    public List<Product> getProductByFilters(@RequestParam("param") String param,
                                             @RequestParam("categoryId") Long categoryId,
                                             @RequestParam("cityId") Long cityId,
                                             @RequestParam("voivoId") Long voivoId) {
        List<Product> products = productRepository.findProductByFilters("%" + param + "%", categoryId, cityId, voivoId);
        products.forEach(p -> productMap.map(p));
        return products;
    }

    @GetMapping("/products/search/and")
    public Page<Product> getProductByFiltersVersionTwo(@RequestParam("param") String param,
                                             @RequestParam("categoryId") Long categoryId,
                                             @RequestParam("cityId") Long cityId,
                                             @RequestParam("voivoId") Long voivoId,
                                             Pageable pageable) {
        Page<Product> products = productRepository.findProductByFiltersVersionTwo("%" + param + "%", categoryId, cityId, voivoId, pageable);
        products.forEach(p -> productMap.map(p));
        return products;
    }

    @GetMapping("/products/category")
    public Page<Product> getProductByCategory(@RequestParam("categoryId") Long categoryId,
                                              @RequestParam("active") Boolean active,
                                              Pageable pageable) {
        Page<Product> products = productRepository.findByCategoryIdAndActive(categoryId,active, pageable);
        products.forEach(p -> productMap.map(p));
        return products;
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
        filterMap.map(filter);

        return filter;
    }

    @GetMapping("/products/random")
    public List<Product> getRandomProduct() {
        List<Product> products = productRepository.findRandomProduct();
        products.forEach(p -> productMap.map(p));
        return products;
    }

    @GetMapping("/products/latest")
    public List<Product> getLatestProduct() {
        List<Product> products = productRepository.findLatestProduct();
        products.forEach(p -> productMap.map(p));
        return products;
    }

    @GetMapping("/products/latest/all")
    public List<Product> getLatestProductAll(Pageable pageable) {
        List<Product> products = productRepository.findLatestProductAll(pageable);
        products.forEach(p -> productMap.map(p));
        return products;
    }

    @GetMapping("/products/random/all")
    public List<Product> getAllRandom(Pageable pageable) {
        List<Product> products = productRepository.findAllRandom(pageable);
        products.forEach(p -> productMap.map(p));
        return products;
    }

    @GetMapping("/auth/products/owner")
    public Page<Product> getProductByUserId(@RequestParam("ownerId") Long ownerId,
                                            @RequestParam("active") Boolean active,
                                            Pageable pageable) {
        Page<Product> products = productRepository.findByOwnerIdAndActivePage(ownerId, active, pageable);
        products.forEach(p -> productMap.map(p));
        return products;
    }

    @GetMapping("/auth/products/owner/list")
    public List<Product> getProductByUserIdAndActiveList(@RequestParam("ownerId") Long ownerId,
                                                         @RequestParam("active") Boolean active) {
        List<Product> products = productRepository.findByOwnerIdAndActive(ownerId, active);
        products.forEach(p -> productMap.map(p));
        return products;
    }

    @GetMapping("/auth/products/owner/another")
    public List<Product> getProductsByAnotherList(/*@RequestBody ArrayId ids,*/
                                                  @RequestParam("ownerId") Long ownerId) {
        List<Product> products = productRepository.findByOwnerIdAndActive(ownerId, true);
        products.forEach(p -> productMap.map(p));
        List<TransactionState> transactionState =  (List<TransactionState>) session.getAttribute("transactions");

        List<Product> toRemove = new ArrayList<>();

        for( Product p: products){
            for (TransactionState ts: transactionState){
                if((ts.getOfferId() == p.getId()) && (ts.getDelete() == false)){
                    toRemove.add(p);
                }
            }
        }

        products.removeAll(toRemove);

       /* for (TransactionState ts: transactionState){
            if (ts.getDelete() == true){
                Product product = productRepository.findById(ts.getOfferId())
                        .orElseThrow(() -> new ResourceNotFoundException("Product", "id", ts.getOfferId()));
                products.add(product);
            }
        }*/

        return products;
    }

    @GetMapping("/products/owner/another/one")
    public List<Product> getProductsByAnotherListOne(@RequestParam("productId") Long productId,
                                                  @RequestParam("ownerId") Long ownerId) {
        List<Product> products = productRepository.findProductNotInProductPage(productId, ownerId);
        products.forEach(p -> productMap.map(p));
        return products;
    }


    @PostMapping("/auth/products/delete")
    public ResponseEntity deleteProduct(@RequestParam("id") Long id) {

        productRepository.deleteProduct(id);

        return ResponseEntity.ok().build();

    }

    @GetMapping("/auth/products/deleting")
    public List<Product> getProductsToDelete(@RequestParam("ownerId") Long ownerId){

        List<Product> products = productRepository.findProductToDelete(ownerId);

        products.forEach(p->productMap.map(p));

        return products;
    }


    @PostMapping("/auth/products/active")
    public ResponseEntity activeProduct(@RequestParam("id") Long id,
                                        @RequestParam("active") Boolean active) {
        productRepository.activeProduct(id, active);
        return ResponseEntity.ok().build();
    }



    @PostMapping(path = "/auth/products/update")
    public ResponseEntity changeProduct(@RequestParam("id") Long id,
                                        @RequestParam("name") String name,
                                        @RequestParam("categoryId") Long categoryId,
                                        @RequestParam("description") String description) {

        productRepository.updateProduct(id, name, categoryId, description);
        return ResponseEntity.ok().build();
    }

    @RequestMapping(value = "/auth/products/image/upload", method = RequestMethod.POST)
    public @ResponseBody
    Boolean uploadDocument(@RequestParam("file") MultipartFile file
    ) throws IOException {

        List<OfferImage> files = (List<OfferImage>) session.getAttribute("files");
        if (files == null)
            files = new ArrayList<>();

        OfferImage i  = new OfferImage();
        i.setType(file.getContentType());
        i.setImage(file.getBytes());
        files.add(i);
        session.setAttribute("files", files);
        return true;
    }

    @RequestMapping(value = "/auth/products/image/upload/string", method = RequestMethod.POST)
    public @ResponseBody
    List<Map<String, Object>> uploadDocumentString(@RequestBody List<OfferImageString> offerImageString
    ) throws IOException {

        List<OfferImage> files = (List<OfferImage>) session.getAttribute("files");
        if (files == null)
            files = new ArrayList<>();

        for (OfferImageString o: offerImageString) {
            OfferImage i  = new OfferImage();
            i.setImage(Base64.getDecoder().decode(o.getImage()));
            i.setType(o.getType());
            files.add(i);
        }

        session.setAttribute("files", files);
        return simpleOkResultArray();
    }

    @GetMapping("/products/list")
    List<Product> getProductByIds( @RequestParam List<Long> ids){

        List<Product> products = productRepository.findByIdIn(ids);

        products.forEach(p->productMap.map(p));

        List<OfferImage> images = new ArrayList<>();

        for (Product p : products){
            if(p.getOfferImagesList().size() > 0){
                images.add(p.getOfferImagesList().get(0));
                p.setOfferImagesList(images);
            }


        }

        return products;
    }







}

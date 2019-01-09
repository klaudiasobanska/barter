package pl.barter.model;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.barter.repository.ProductRepository;

@Service
public class TransactionStateMap {

    @Autowired
    ProductRepository productRepository;

    @Autowired
    ProductMap productMap;

    public TransactionState map(TransactionState to){

        if(to.getOfferId() != null) {
            Product product = productRepository.findById(to.getOfferId()).orElse(null);
            productMap.map(product);
            if(product != null){
                to.setOfferName(product.getName());
                to.setCategoryName(product.getCategoryName());
                to.setCityName(product.getCityName());
            }
        }

        if(to.getSellerAccept() != null) {
            try {
                to.setSellerAcceptStatus(STATUS_OF_ACCEPT.fromStatus(to.getSellerAccept()).getName());
            } catch (Exception e) {
                e.printStackTrace();
                to.setSellerAcceptStatus("");
            }
        }
        if(to.getBuyerAccept() != null) {
            try {
                to.setBuyerAcceptStatus(STATUS_OF_ACCEPT.fromStatus(to.getBuyerAccept()).getName());
            } catch (Exception e) {
                e.printStackTrace();
                to.setBuyerAcceptStatus("");
            }
        }


        return to;
    }

}

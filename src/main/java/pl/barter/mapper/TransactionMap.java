package pl.barter.mapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.barter.model.Product;
import pl.barter.model.Transaction;
import pl.barter.model.User;
import pl.barter.model.enums.STATUS_OF_TRANSACTION;
import pl.barter.repository.ProductRepository;
import pl.barter.repository.UserRepository;

@Service
public class TransactionMap {

    @Autowired
    UserRepository userRepository;

    @Autowired
    ProductRepository productRepository;

    public Transaction map(Transaction t){

        if(t.getStatus() != null) {
            try {
                t.setStatusName(STATUS_OF_TRANSACTION.fromId(t.getStatus()).getName());
            } catch (Exception e) {
                e.printStackTrace();
                t.setStatusName("");
            }
        }
        if(t.getClientId() != null) {

            User user = userRepository.findById(t.getClientId()).orElse(null);
            if(user != null){
                t.setClientLogin(user.getUsername());
            }
        }
        if(t.getOwnerId() != null) {

            User user = userRepository.findById(t.getOwnerId()).orElse(null);
            if(user != null){
                t.setOwnerLogin(user.getUsername());
            }
        }
        if(t.getOfferId() != null) {

            Product product = productRepository.findById(t.getOfferId()).orElse(null);
            if(product != null){
                t.setOfferName(product.getName());
            }
        }




        return t;
    }


}

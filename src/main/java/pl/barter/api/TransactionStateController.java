package pl.barter.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import pl.barter.exception.ResourceNotFoundException;
import pl.barter.model.*;
import pl.barter.repository.ProductRepository;
import pl.barter.repository.TransactionStateRepository;

import java.util.ArrayList;
import java.util.List;

@RestController
public class TransactionStateController extends AbstractController {

    @Autowired
    TransactionStateRepository transactionStateRepository;

    @Autowired
    ProductRepository productRepository;

    @Autowired
    TransactionStateMap transactionStateMap;

    @Autowired
    ProductMap productMap;

    @PostMapping("/clear/session/transaction/state")
    public void clearSession() {
        session.setAttribute("transactionId", new ArrayList<>());
    }


    @GetMapping("/transaction/offer/list")
    public List<TransactionState> getOffer(@RequestParam("transactionId") Long transactionId) {
        List<TransactionState> transactionState;
        if (session.getAttribute("transactions") == null) {
            transactionState = transactionStateRepository.findByTransactionId(transactionId);
            session.setAttribute("transactions", transactionState);

        }
        transactionState = (List<TransactionState>) session.getAttribute("transactions");


        transactionState.stream().filter(p -> p.getDelete().equals(false)).forEach(to -> transactionStateMap.map(to));

        return transactionState;

    }

    @PostMapping("/transaction/delete/offer")
    public ResponseEntity deleteSeller(@RequestParam("offerId") Long offerId) {
        List<TransactionState> transactionState =  (List<TransactionState>) session.getAttribute("transactions");
        TransactionState toDelete = transactionState.stream().filter(p -> p.getOfferId().equals(offerId)).findFirst().get();
        if (toDelete != null)
            toDelete.setDelete(true);

        return ResponseEntity.ok().build();
    }

    @PostMapping("/transaction/save/offer")
    public ResponseEntity saveOfferInSession(@RequestBody TransactionState newState){

        List<TransactionState> transactionState =  (List<TransactionState>) session.getAttribute("transactions");
        transactionState.add(transactionStateMap.map(newState));

        session.setAttribute("transactions", transactionState);

        return ResponseEntity.ok().build();
    }

    /*@PostMapping("/seller/accept/offer")
    public ResponseEntity acceptSeller(@RequestParam("offerId") Long offerId) {

        List<TransactionState> transactionState =  (List<TransactionState>) session.getAttribute("transactions");

        for(TransactionState ts: transactionState){
            if(ts.getOfferId() == offerId){
                ts.setSellerAcceptStatus("true");
            }
        }

        session.setAttribute("transactions", transactionState);

        return ResponseEntity.ok().build();

    }*/




}

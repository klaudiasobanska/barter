package pl.barter.api;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;

import pl.barter.model.*;
import pl.barter.repository.ProductRepository;
import pl.barter.repository.TransactionStateRepository;


import java.util.ArrayList;
import java.util.List;
import java.util.OptionalInt;

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


    @GetMapping("/transaction/offer/list")
    public List<TransactionState> getOffer(@RequestParam("transactionId") Long transactionId) {
        List<TransactionState> transactionState;
        if (session.getAttribute("transactions") == null) {
            transactionState = transactionStateRepository.findByTransactionId(transactionId);
            transactionState.forEach(p -> p.setStep(2));
            transactionState.forEach(p -> p.setSideFlag(0));
            transactionState.forEach(p -> p.setId(null));
            transactionState.forEach(p -> p.setMessageClient(null));
            session.setAttribute("transactions", transactionState);

        }
        transactionState = (List<TransactionState>) session.getAttribute("transactions");

        List<TransactionState> notDeleted = new ArrayList<>();

        transactionState.stream().filter(p -> p.getDelete().equals(false)).forEach(to -> notDeleted.add(transactionStateMap.map(to)));
        /*for(TransactionState t: transactionState){
            if(t.getDelete() == false){
                notDeleted.add(transactionStateMap.map(t));
            }
        }*/



        return notDeleted;

    }

    @GetMapping("/transaction/offer/list/deleted")
    public List<TransactionState> getOfferWithDeleted(@RequestParam("transactionId") Long transactionId) {
        List<TransactionState> transactionState;

        transactionState = (List<TransactionState>) session.getAttribute("transactions");

        transactionState.stream().filter(p -> p.getDelete().equals(true)).forEach(to -> transactionStateMap.map(to));

        return transactionState;

    }


    @PostMapping("/transaction/delete/offer")
    public ResponseEntity deleteSeller(@RequestParam("offerId") Long offerId) {
        List<TransactionState> transactionState =  (List<TransactionState>) session.getAttribute("transactions");
        TransactionState toDelete = transactionState.stream().filter(p -> p.getOfferId().equals(offerId)).findFirst().get();
        if (toDelete != null)
            toDelete.setDelete(true);

        //transactionState.remove(toDelete);

        return ResponseEntity.ok().build();
    }

    @PostMapping("/transaction/save/offer/another")
    public ResponseEntity<Boolean> saveOfferInSession(@RequestBody TransactionState newState){

        newState.setDelete(false);

        List<TransactionState> transactionState =  (List<TransactionState>) session.getAttribute("transactions");
        transactionState.add(transactionStateMap.map(newState));

        session.setAttribute("transactions", transactionState);

        return ResponseEntity.ok(true);
    }

    @PostMapping("/seller/accept/offer")
    public ResponseEntity acceptSeller(@RequestParam("offerId") Long offerId) {

        List<TransactionState> transactionState =  (List<TransactionState>) session.getAttribute("transactions");

        TransactionState toAccept = transactionState.stream().filter(p -> p.getOfferId().equals(offerId)).findFirst().get();

        if (toAccept != null)
            toAccept.setSellerAccept(true);

        return ResponseEntity.ok().build();

    }


    @PostMapping("/send/message")
    public ResponseEntity<Boolean> sendMessage(@RequestBody TransactionState newState) {

        newState.setId(transactionStateRepository.getNextSeriesId());

        transactionStateRepository.save(newState);

        return ResponseEntity.ok(true);
    }


    @GetMapping("/transaction/send/offer/list")
    public List<TransactionState> getSendOffer(@RequestParam("transactionId") Long transactionId) {
        List<TransactionState> transactionState = transactionStateRepository.findByTransactionIdAndStep(transactionId,1);
        transactionState.forEach(t -> transactionStateMap.map(t));
        return transactionState;

    }

    @GetMapping("/transaction/active/offer/list")
    public List<TransactionState> getOfferActive(@RequestParam("transactionId") Long transactionId) {
        List<TransactionState> transactionState;
        if (session.getAttribute("transactions") == null) {

            transactionState = transactionStateRepository.findByTransactionIdAndMaxStep(transactionId);

            for(TransactionState ts: transactionState){
                if(ts.getSideFlag()==0){
                    ts.setSideFlag(1);
                }else{
                    ts.setSideFlag(0);
                }
            }

            OptionalInt max = transactionState.stream().mapToInt(TransactionState::getStep).max();

            transactionState.forEach(p -> p.setStep(max.getAsInt() + 1));
            transactionState.forEach(p -> p.setId(null));

            //transactionState.forEach(p -> p.setMessageClient(null));

            session.setAttribute("transactions", transactionState);

        }
        transactionState = (List<TransactionState>) session.getAttribute("transactions");

        List<TransactionState> notDeleted = new ArrayList<>();

        transactionState.stream().filter(p -> p.getDelete().equals(false)).forEach(to -> notDeleted.add(transactionStateMap.map(to)));

        //transactionState.stream().filter(p -> p.getDelete().equals(false)).forEach(to -> transactionStateMap.map(to));

        return notDeleted;

    }

    @PostMapping("/accept/owner/side/offer")
    public ResponseEntity<Boolean> acceptOfferDependsSide(@RequestParam("offerId") Long offerId, @RequestParam("side") String side) {

        List<TransactionState> transactionState =  (List<TransactionState>) session.getAttribute("transactions");

        TransactionState toAccept = transactionState.stream().filter(p -> p.getOfferId().equals(offerId)).findFirst().get();

        if (toAccept != null) {
            if (side.equals("owner")) {
                toAccept.setSellerAccept(true);
            }
            else{
                toAccept.setBuyerAccept(true);
            }
        }
        return ResponseEntity.ok(true);

    }

}

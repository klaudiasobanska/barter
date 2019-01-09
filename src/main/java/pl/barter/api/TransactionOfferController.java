package pl.barter.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.barter.model.TransactionState;
import pl.barter.model.TransactionStateMap;
import pl.barter.repository.TransactionOfferRepository;


@RestController
public class TransactionOfferController extends AbstractController {

    @Autowired
    TransactionOfferRepository transactionOfferRepository;

    @Autowired
    TransactionStateMap transactionOfferMap;

    @PostMapping(path = "/transaction/offer/add", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
    public TransactionState addTransactionOffer(@RequestBody TransactionState transactionOffer) {

        transactionOffer.setId(transactionOfferRepository.getNextSeriesId());
        return transactionOfferRepository.save(transactionOffer);
    }


    /*@GetMapping("/transaction/offer/list")
    public Page<TransactionState> getTransactionOfferList(@RequestParam("transactionId") Long transactionId,
                                                          Pageable pageable){

        Page<TransactionState> transactionOffers = transactionOfferRepository.findByTransactionId(transactionId, pageable);
        transactionOffers.forEach(to->transactionOfferMap.map(to));

        System.out.println(transactionOffers);

        return transactionOffers;


    }*/

    @PostMapping("/seller/accept/offer")
    public ResponseEntity acceptSeller(@RequestParam("offerId") Long offerId) {

        transactionOfferRepository.acceptOfferSeller(offerId);

        return ResponseEntity.ok().build();

    }

    @PostMapping("/seller/delete/offer")
    public ResponseEntity deleteSeller(@RequestParam("offerId") Long offerId) {
        Page<TransactionState> transactionState = transactionState = (Page<TransactionState>) session.getAttribute("transactions");
        TransactionState toDelete = transactionState.getContent().stream().filter(p -> p.getOfferId().equals(offerId)).findFirst().get();
        if (toDelete != null)
            toDelete.setDelete(true);
        //transactionOfferRepository.deleteOfferSeller(offerId);
        return ResponseEntity.ok().build();
    }


}

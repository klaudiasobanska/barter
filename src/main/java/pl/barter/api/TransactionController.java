package pl.barter.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import pl.barter.model.Transaction;
import pl.barter.model.TransactionMap;
import pl.barter.model.TransactionState;
import pl.barter.repository.TransactionOfferRepository;
import pl.barter.repository.TransactionRepository;
import pl.barter.service.TransactionStateService;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
public class TransactionController extends AbstractController{

    @Autowired
    TransactionRepository transactionRepository;

    @Autowired
    TransactionStateService transactionStateService;


    @Autowired
    TransactionMap transactionMap;


    @PostMapping(path = "/transaction/save", produces = MediaType.APPLICATION_JSON_VALUE)
    public Map<String, Object> save(@RequestBody Transaction transaction) {

        transaction.setId(transactionRepository.getNextSeriesId());
        transactionStateService.createTransactionStateToSendProposal(transaction);
        transactionRepository.save(transaction);

        return simpleOkResult();
    }

    private void clearSession() {
        session.setAttribute("anotherId", new ArrayList<>());
    }

    @GetMapping("/transaction/new/proposal")
    public List<Transaction> getTransactionReceived(@RequestParam("ownerId") Long ownerId, Pageable pageable){

        clearSession();
        List<Transaction> transactionList = transactionRepository.findNewProposal(ownerId, pageable);
        transactionList.forEach(t -> transactionMap.map(t));
        transactionStateService.mapTransactionState(transactionList);


        /*List<Long> products = new ArrayList<>();

        for (Transaction t: transactionList){
            for(TransactionState ts: t.getTransactionState()){
                products.add(ts.getOfferId());
            }
        }

        List<Long> items = (List<Long>) session.getAttribute("anotherId");
        if (items == null)
            items = new ArrayList<>();

        List<Long> finalItems = items;
        products.forEach(p -> finalItems.add(p));


        session.setAttribute("anotherId", finalItems);
        List<Long> anotherIdList = (List<Long>) session.getAttribute("anotherId");
        System.out.println(anotherIdList);*/


        return transactionList;
    }


    @PostMapping(path = "/save/session/anotherId", produces = MediaType.APPLICATION_JSON_VALUE)
    public Map<String, Object> saveAnotherProductId(@RequestBody TransactionState anotherId) {

        clearSession();

        List<TransactionState> items = (List<TransactionState>) session.getAttribute("anotherId");
        if (items == null)
            items = new ArrayList<>();

        items.add(anotherId);

        session.setAttribute("anotherId", items);


        return simpleOkResult();
    }
}

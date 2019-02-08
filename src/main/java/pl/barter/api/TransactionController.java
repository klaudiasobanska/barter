package pl.barter.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.barter.exception.ResourceNotFoundException;
import pl.barter.mail.SendEmail;
import pl.barter.model.*;
import pl.barter.model.dto.UserDto;
import pl.barter.repository.ProductRepository;
import pl.barter.repository.TransactionRepository;
import pl.barter.repository.TransactionStateRepository;
import pl.barter.repository.UserRepository;
import pl.barter.service.TransactionStateService;

import javax.mail.MessagingException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.OptionalInt;

@RestController
public class TransactionController extends AbstractController{

    @Autowired
    TransactionRepository transactionRepository;

    @Autowired
    TransactionStateService transactionStateService;

    @Autowired
    TransactionStateRepository transactionStateRepository;

    @Autowired
    TransactionMap transactionMap;

    @Autowired
    UserRepository userRepository;

    @Autowired
    ProductRepository productRepository;

    @Autowired
    UserHelperService userHelperService;



    @PostMapping(path = "/transaction/save", produces = MediaType.APPLICATION_JSON_VALUE)
    public Map<String, Object> save(@RequestBody Transaction transaction) {

        transaction.setId(transactionRepository.getNextSeriesId());
        transactionStateService.createTransactionStateToSendProposal(transaction);
        transactionRepository.save(transaction);

        return simpleOkResult();
    }


    @GetMapping("/transaction/exist")
    public Map<String, Object> ifExist(@RequestParam("userId") Long userId, @RequestParam("offerId") Long offerId){

        Transaction transaction = transactionRepository.findByClientIdAndOfferIdAndStatus(userId,offerId,1);

        if (transaction != null){
            return simpleErrorResult("exist");
        }else{
            return simpleOkResult();
        }

    }


    @GetMapping("/transaction/clear/session")
    public void clearSession() {
        session.setAttribute("transactions",null);
    }

    @GetMapping("/transaction/end/list")
    public List<Transaction> getEndTransaction(@RequestParam("userId") Long ownerId, Pageable pageable){

        List<Transaction> transactionList = transactionRepository.findEndTransaction(ownerId, pageable);
        transactionList.forEach(t -> transactionMap.map(t));
        transactionStateService.mapTransactionState(transactionList);

        return transactionList;
    }

    @GetMapping("/transaction/new/proposal")
    public List<Transaction> getTransactionReceived(@RequestParam("ownerId") Long ownerId, Pageable pageable){

        List<Transaction> transactionList = transactionRepository.findNewProposal(ownerId, pageable);
        transactionWithNotActiveMainOffer(transactionList);
        transactionList.forEach(t -> transactionMap.map(t));
        transactionStateService.mapTransactionState(transactionList);

        return transactionList;
    }


    private List<UserDto> getTransactionDataUser(Transaction transaction){

        UserDto userOwner = userHelperService.mapToDto(userRepository.findById(transaction.getOwnerId())
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", transaction.getOwnerId())));

        UserDto userClient = userHelperService.mapToDto(userRepository.findById(transaction.getClientId())
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", transaction.getClientId())));

        List<UserDto> ret = new ArrayList<>();
        ret.add(userOwner);
        ret.add(userClient);
        return ret;
    }


    @PostMapping("/transaction/success/end")
    public Map<String, Object> successEndTransaction(@RequestParam("id") Long id,
                                                     @RequestParam("userSide") String userSide,
                                                     @RequestBody TransactionState newState){

        List<TransactionState> transactionState = (List<TransactionState>) session.getAttribute("transactions");

        List<TransactionState> transactionStateDeleted = new ArrayList<>();

        for(TransactionState t: transactionState){
            if(userSide.equals("owner")) {
                if (t.getDelete() == true && t.getSellerAccept() == false && t.getBuyerAccept()==true) {
                    transactionStateDeleted.add(t);
                }
            }
            if(userSide.equals("client")){
                if (t.getDelete() == true && t.getBuyerAccept() == false && t.getSellerAccept()==true) {
                    transactionStateDeleted.add(t);
                }
            }
        }

        if(transactionStateDeleted.size() > 0){
            return simpleErrorResult("Usunięto ofertę");
        }else {

            Transaction transaction = transactionRepository.findById(id)
                    .orElseThrow(() -> new ResourceNotFoundException("Transaction", "id", id));

            List<UserDto> users = getTransactionDataUser(transaction);
            UserDto userOwner = users.get(0);
            UserDto userClient = users.get(1);

            Product offerOwner = productRepository.findById(transaction.getOfferId())
                    .orElseThrow(() -> new ResourceNotFoundException("User", "id", transaction.getClientId()));
            productRepository.activeProduct(offerOwner.getId(), false);

            List<String> offersClient = new ArrayList<>();
            productRepository.getClientOfferSuccessTransaction(id).forEach(p -> offersClient.add(p.getName()));
            productRepository.getClientOfferSuccessTransaction(id).forEach(p -> productRepository.activeProduct(p.getId(), false));
            String offersClientToString = String.join(", ", offersClient);


            String toAddress = userOwner.getEmail();
            String toAddressDw = userClient.getEmail();
            String subject = "Transakcja zakończona sukcesem: " + offerOwner.getName();
            String message = "<hr3> Drogi użytkowniku!</hr3>" +
                    "<p>Uprzejmnie informujemy, że transakcja między użytkownikami: " + "<b>" + userOwner.getLogin() + "</b>" + " oraz " + "<b>" + userClient.getLogin() + "</b>" +
                    " została zakończona pomyślnie. </p>" +
                    "<p> Oferta " + "<b>" + offerOwner.getName() + "</b>" + " została wymieniona na ofertę/oferty: " + "<b>" + offersClientToString + "</b>" + ".</p>" +
                    "<p>Oferty zostały zarchiwizowane</p>"
                    + "<p>Pozdrawiamy</p>";
            ;


            try {
                SendEmail.send(toAddress, subject, message, toAddressDw);
            } catch (MessagingException e) {
                e.printStackTrace();
            }


            newState.setId(transactionStateRepository.getNextSeriesId());

            transactionStateRepository.save(newState);

            transactionRepository.successTransaction(id);

            return simpleOkResult();
        }
    }

    @PostMapping("/transaction/reject")
    public ResponseEntity<Boolean> rejectTransaction(@RequestParam("id") Long id){

        Transaction transaction = transactionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Transaction", "id", id));

        List<UserDto> users = getTransactionDataUser(transaction);
        UserDto userOwner = users.get(0);
        UserDto userClient = users.get(1);

        Product offerOwner = productRepository.findById(transaction.getOfferId())
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", transaction.getClientId()));

        String toAddress = userOwner.getEmail();
        String toAddressDw = userClient.getEmail();
        String subject = "Transakcja anulowana: "+offerOwner.getName();
        String message = "<hr3> Drogi użytkowniku!</hr3>" +
                "<p>Uprzejmnie informujemy, że transakcja między użytkownikami: "+ "<b>"+ userOwner.getLogin() +"</b>" + " oraz "+"<b>"+ userClient.getLogin()+"</b>" +
                " dotycząca oferty "+ "<b>"+offerOwner.getName()+"</b>" +" została odrzucona. </p>"
                + "<p>Pozdrawiamy</p>";

        try {
            SendEmail.send(toAddress,subject,message,toAddressDw);
        } catch (MessagingException e) {
            e.printStackTrace();
        }

        transactionRepository.rejectTransaction(id);

        return ResponseEntity.ok(true);
    }


    @GetMapping("/transaction/send/proposal")
    public List<Transaction> getTransactionSend(@RequestParam("userId") Long userId, Pageable pageable){

        List<Transaction> transactionList = transactionRepository.findSendProposal(userId, pageable);
        transactionWithNotActiveMainOffer(transactionList);
        transactionList.forEach(t -> transactionMap.map(t));
        transactionStateService.mapTransactionState(transactionList);

        return transactionList;
    }

    @PostMapping("/transaction/client/reject")
    public ResponseEntity<Boolean> rejectClientTransaction(@RequestParam("id") Long id){

        Transaction transaction = transactionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Transaction", "id", id));

        List<UserDto> users = getTransactionDataUser(transaction);
        UserDto userOwner = users.get(0);
        UserDto userClient = users.get(1);

        Product offerOwner = productRepository.findById(transaction.getOfferId())
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", transaction.getClientId()));

        String toAddress = userOwner.getEmail();
        String toAddressDw = userClient.getEmail();
        String subject = "Wycofanie transakcji: "+offerOwner.getName();
        String message = "<hr3> Drogi użytkowniku!</hr3>" +
                "<p>Uprzejmnie informujemy, że transakcja rozpoczęta przez: "+ "<b>"+ userClient.getLogin() +"</b>" +
                " dotycząca oferty "+ "<b>"+offerOwner.getName()+"</b>" +" została wycofana. </p>"
                + "<p>Pozdrawiamy</p>";

        try {
            SendEmail.send(toAddress,subject,message,toAddressDw);
        } catch (MessagingException e) {
            e.printStackTrace();
        }

        transactionRepository.rejectTransaction(id);

        return ResponseEntity.ok(true);
    }

    @GetMapping("/transaction/active/wait/proposal")
    public List<Transaction> getTransactionActive(@RequestParam("userId") Long userId,
                                                  Pageable pageable){

        /*Pobranie z sesji użytkownika i jego id*/

        List<Transaction> transactionList = transactionRepository.findActiveProposal(userId, pageable);

        transactionWithNotActiveMainOffer(transactionList);


        List<Transaction> transactionListWait = new ArrayList<>();

        for (Transaction t: transactionList){
            if(15 == t.getOwnerId()){
                if(t.getTransactionStateMaxStep().get(0).getSideFlag()== 1){
                    transactionListWait.add(t);
                }
            }
            if(15==t.getClientId()){
                if(t.getTransactionStateMaxStep().get(0).getSideFlag() == 0){
                    transactionListWait.add(t);
                }
            }
        }

        transactionListWait.forEach(t -> transactionMap.map(t));
        transactionStateService.mapTransactionState(transactionListWait);
        return transactionListWait;

    }

    @GetMapping("/transaction/active/sent/proposal")
    public List<Transaction> getSentTransactionActive(@RequestParam("userId") Long userId,
                                                  Pageable pageable){

        /*Pobranie z sesji użytkownika i jego id*/

        List<Transaction> transactionList = transactionRepository.findActiveProposal(userId, pageable);


        transactionWithNotActiveMainOffer(transactionList);

        List<Transaction> transactionListSent = new ArrayList<>();

        for (Transaction t: transactionList){
            if(16 == t.getOwnerId()){
                if(t.getTransactionStateMaxStep().get(0).getSideFlag()== 0){
                    transactionListSent.add(t);
                }
            }
            if(16==t.getClientId()){
                if(t.getTransactionStateMaxStep().get(0).getSideFlag() == 1){
                    transactionListSent.add(t);
                }
            }
        }

        transactionListSent.forEach(t -> transactionMap.map(t));
        transactionStateService.mapTransactionState(transactionListSent);
        return transactionListSent;

    }

    private void transactionWithNotActiveMainOffer(List<Transaction> transactionList){

        for(Transaction t: transactionList){
            Product product = productRepository.findById(t.getOfferId())
                    .orElseThrow(() -> new ResourceNotFoundException("User", "id", t.getOfferId()));
            if(product.getActive()==false){
                transactionRepository.rejectTransaction(t.getId());
                List<UserDto> users = getTransactionDataUser(t);
                String toAddress = users.get(0).getEmail();
                String toAddressDw = users.get(1).getEmail();
                String subject = "Usunięcie transakcji: "+ product.getName();
                String message = "<hr3> Drogi użytkowniku!</hr3>" +
                        "<p>Uprzejmnie informujemy, że oferta: "+ "<b>"+ product.getName() +"</b>" +" będąca przedmiotem transakcji między użytkownikami: "+ "<b>"+ users.get(1).getLogin() +"</b>" +
                        " i "+ "<b>"+ users.get(0).getLogin() +"</b>" +
                        " została wymieniona w innej transakcji lub została usunięta z systemu."+ "</p>"+
                        "<p>Nie jest możlwe dalsze prowadzenie wymiany, transakcja została usunięta i nie będzie widoczna w 'Propozycje wymiany' użytkowników. </p>"
                        + "<p>Pozdrawiamy</p>";

                try {
                    SendEmail.send(toAddress,subject,message,toAddressDw);
                } catch (MessagingException e) {
                    e.printStackTrace();
                }
            }
        }
    }



}



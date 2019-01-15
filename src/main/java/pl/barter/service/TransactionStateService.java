package pl.barter.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.barter.model.Transaction;
import pl.barter.model.TransactionState;
import pl.barter.model.TransactionStateMap;
import pl.barter.repository.TransactionStateRepository;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.List;

@Service
public class TransactionStateService {

    @Autowired
    TransactionStateRepository transactionStateRepository;

    @Autowired
    TransactionStateMap transactionStateMap;

    public void createTransactionStateToSendProposal(Transaction transaction){

        for(Integer i: transaction.getIds()){
            TransactionState transactionState = new TransactionState();
            transactionState.setId(transactionStateRepository.getNextSeriesId());
            transactionState.setOfferId(i.longValue());
            transactionState.setBuyerAccept(true);
            transactionState.setSellerAccept(false);
            transactionState.setTransactionId(transaction.getId());
            transactionState.setMessageClient(transaction.getMessageClient());
            transactionState.setStep(1);
            transactionState.setSideFlag(1);
            transactionState.setDate( new Date());



            //System.out.println(transactionOffer.getId());
            transaction.getTransactionState().add(transactionState);
        }



    }

    public void mapTransactionState(List<Transaction> trnsactionList){

        for (Transaction i: trnsactionList){
            i.getTransactionState().forEach(to -> transactionStateMap.map(to));
        }


    }

}

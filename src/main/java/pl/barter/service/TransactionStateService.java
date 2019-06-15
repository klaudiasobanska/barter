package pl.barter.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.barter.model.Transaction;
import pl.barter.model.TransactionState;
import pl.barter.mapper.TransactionStateMap;
import pl.barter.repository.TransactionStateRepository;

import java.util.Date;
import java.util.List;

@Service
public class TransactionStateService {

    @Autowired
    TransactionStateMap transactionStateMap;

    @Autowired
    TransactionStateRepository transactionStateRepository;

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


            transaction.getTransactionState().add(transactionState);
        }
    }

    public void mapTransactionState(List<Transaction> transactionList){

        for (Transaction i: transactionList){
            i.getTransactionState().forEach(to -> transactionStateMap.map(to));
        }


    }

}

package pl.barter.model;



import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.OptionalInt;

@Entity
@Table(name = "transactions")
@EntityListeners(AuditingEntityListener.class)
@Getter
@Setter
public class Transaction {


    @Id
    @Column(name = "id")
    private Long id;

    @Column(name = "owner_id")
    private Long ownerId;

    @Column(name = "client_id")
    private Long clientId;

    @Column(name = "offer_id")
    private Long offerId;

    @Column(name = "status")
    private Integer status;

    @Column(name = "owner_accept")
    private Boolean ownerAccept;

    @Column(name = "clientAccept")
    private Boolean clientAccept;

    @Transient
    private String statusName;

    @Transient
    private String clientLogin;

    @Transient
    private String ownerLogin;

    @Transient
    private String offerName;

    @Transient
    private List<Integer> ids = new ArrayList<>();

    @Transient
    private String messageClient;


    @OneToMany(fetch = FetchType.EAGER,cascade = CascadeType.ALL, mappedBy = "transactionId")
    @Fetch(value = FetchMode.SUBSELECT)
    private List<TransactionState> transactionState=new ArrayList<>();

    public List<TransactionState> getTransactionStateMaxStep(){
        List<TransactionState> transactionStatesList = new ArrayList<>();
        OptionalInt max = transactionState.stream().mapToInt(TransactionState::getStep).max();
        if(max.isPresent()){
            for(TransactionState t: transactionState){
                if (t.getStep() == max.getAsInt()){
                    transactionStatesList.add(t);
                }
            }
            return transactionStatesList;
        }

        return null;
    }

}

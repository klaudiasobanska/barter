package pl.barter.model;


import lombok.Getter;
import lombok.Setter;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;

@Entity
@Table(name = "transaction_state")
@EntityListeners(AuditingEntityListener.class)
@Getter
@Setter
public class TransactionState {

    @Id
    @Column(name = "id")
    private Long id;

    @Column(name = "offer_id")
    private Long offerId;

    @Column(name = "transaction_id")
    private Long transactionId;

    @Column(name = "seller_accept")
    private Boolean sellerAccept;

    @Column(name = "buyer_accept")
    private Boolean buyerAccept;

    @Column(name = "side_flag")
    private Integer sideFlag;

    @Column(name = "step")
    private Integer step;

    @Column(name = "message_client")
    private String messageClient;

    @Column(name = "message_owner")
    private String messageOwner;

    @Transient
    private String offerName;

    @Transient
    private String categoryName;

    @Transient
    private String cityName;

    @Transient
    private String sellerAcceptStatus;

    @Transient
    private String buyerAcceptStatus;

    @Transient
    private Boolean delete=false;

}

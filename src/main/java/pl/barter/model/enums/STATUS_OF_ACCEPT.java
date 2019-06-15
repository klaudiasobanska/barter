package pl.barter.model.enums;

import lombok.Getter;

import java.util.stream.Stream;

@Getter
public enum STATUS_OF_ACCEPT {

    ACCEPT(true, "Zaakceptowano"),
    DISAPPROVAL(false, "Nie zaakceptowano");

    private Boolean status;
    private String name;


    STATUS_OF_ACCEPT(Boolean status, String name) {
        this.status = status;
        this.name = name;
    }


    public static STATUS_OF_ACCEPT fromStatus(Boolean status) throws Exception {
        return Stream.of(values()).filter(p -> p.status.equals(status)).findFirst().orElseThrow(Exception::new);
    }

}



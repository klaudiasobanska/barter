package pl.barter.model.enums;

import lombok.Getter;

import java.util.stream.Stream;

@Getter
public enum STATUS_OF_TRANSACTION {

    START(1,"Nowa"),
    END(2,"Zakończona"),
    PROGRESS(3, "Realizacja");

    private Integer id;
    private String name;

    STATUS_OF_TRANSACTION(Integer id, String name) {
        this.id = id;
        this.name = name;
    }


    public static STATUS_OF_TRANSACTION fromId(Integer id) throws Exception {
        return Stream.of(values()).filter(p -> p.id.equals(id)).findFirst().orElseThrow(Exception::new);
    }
}

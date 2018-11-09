package pl.barter.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Filter {

    String param;
    Long categoryId;
    Boolean latest;
    Boolean random;


    public Filter(String param, Long categoryId, Boolean latest, Boolean random) {
        this.param = param;
        this.categoryId = categoryId;
        this.latest = latest;
        this.random = random;
    }

    public Long getCategoryId() {
        return categoryId == null ? -1 : categoryId;
    }
    public Filter(){}
}

package pl.barter.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Filter {

    String param;
    Long categoryId;
    Long cityId;
    Long voivoId;
    Boolean latest;
    Boolean random;


    public Filter(String param, Long categoryId, Boolean latest, Boolean random,  Long cityId, Long voivoId) {
        this.param = param;
        this.categoryId = categoryId;
        this.latest = latest;
        this.random = random;
        this.cityId = cityId;
        this.voivoId = voivoId;

    }

    public Long getCategoryId() {
        return categoryId == null ? -1 : categoryId;
    }
    public Long getCityId() {
        return cityId == null ? -1 : cityId;
    }
    public Long getVoivoId() {
        return voivoId == null ? -1 : voivoId;
    }

    public Filter(){}
}

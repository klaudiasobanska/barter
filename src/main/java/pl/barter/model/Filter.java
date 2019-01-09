package pl.barter.model;

import lombok.Getter;
import lombok.Setter;

import java.beans.Transient;

@Getter
@Setter
public class Filter {

    String param;
    Long categoryId;
    Long cityId;
    Long voivoId;
    Boolean latest;
    Boolean random;
    String cityName;


    public Filter(String param, Long categoryId, Boolean latest, Boolean random,  Long cityId, Long voivoId, String cityName) {
        this.param = param;
        this.categoryId = categoryId;
        this.latest = latest;
        this.random = random;
        this.cityId = cityId;
        this.voivoId = voivoId;
        this.cityName = cityName;

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

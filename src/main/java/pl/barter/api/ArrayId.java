package pl.barter.api;

import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class ArrayId {

    private List<Long> ids = new ArrayList<>();
}

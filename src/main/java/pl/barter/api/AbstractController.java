package pl.barter.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public abstract class AbstractController {

    @Autowired
    protected HttpServletRequest req;

    @Autowired
    protected HttpSession session;

    public Map<String, Object> simpleOkResult() {
        Map<String, Object> m = new HashMap<>();
        m.put("success", "true");
        return m;
    }

    public List<Map<String, Object>> simpleOkResultArray() {

        List<Map<String, Object>> list = new ArrayList<>();

        for (Map<String, Object> l : list){
            l.put("success", "true");
        }

        return list;
    }

    public Map<String, Object> simpleErrorResult(String error) {
        Map<String, Object> m = new HashMap<>();
        m.put("errorMsg", error);
        return m;
    }

    @ExceptionHandler({Exception.class})
    public ResponseEntity<Map<String, Object>> handleAll(Exception ex, WebRequest request) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(simpleErrorResult(ex.getMessage()));
    }


}
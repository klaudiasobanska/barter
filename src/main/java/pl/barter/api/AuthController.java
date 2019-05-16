package pl.barter.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import pl.barter.model.SignInRequest;
import pl.barter.model.SignUpRequest;
import pl.barter.model.User;
import pl.barter.payload.ApiResponse;
import pl.barter.payload.JwtAuthenticationResponse;
import pl.barter.repository.UserRepository;
import pl.barter.security.JwtTokenProvider;


import javax.validation.Valid;
import java.net.URI;
import java.util.Map;

@RequestMapping("/api/auth")
@RestController
public class AuthController extends AbstractController {

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UserRepository userRepository;


    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    JwtTokenProvider tokenProvider;

    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody SignInRequest signInRequest) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(signInRequest.getUsername(), signInRequest.getPassword())
            );

            SecurityContextHolder.getContext().setAuthentication(authentication);

            String jwt = tokenProvider.generateToken(authentication);

            return ResponseEntity.ok(new JwtAuthenticationResponse(jwt));
        } catch (Exception ex) {
            throw ex;
        }


    }

    @PostMapping("/signup")
    public Map<String, Object> registerUser(@Valid @RequestBody SignUpRequest signUpRequest) {

        if (userRepository.existsByUsername(signUpRequest.getUsername())) {
            return simpleErrorResult("login");
        }
        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            return simpleErrorResult("email");
        }

        User user = new User();
        user.setId(userRepository.getNextSeriesId());
        user.setUsername(signUpRequest.getUsername());
        user.setPassword(signUpRequest.getPassword());
        user.setEmail(signUpRequest.getEmail());
        user.setBirthDate(signUpRequest.getBirthDate());

        user.setPassword(passwordEncoder.encode(user.getPassword()));

        userRepository.save(user);

        /*URI location = ServletUriComponentsBuilder
                .fromCurrentContextPath().path("/api/users/{username}")
                .buildAndExpand(user.getUsername()).toUri();*/

        return simpleOkResult();
    }
}

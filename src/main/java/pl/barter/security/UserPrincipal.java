package pl.barter.security;


import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.UserDetails;
import pl.barter.model.Product;
import pl.barter.model.User;

import java.util.Collection;
import java.util.Date;
import java.util.Set;


@Getter
@Setter
public class UserPrincipal implements UserDetails {


    private Long id;

    private String username;

    @JsonIgnore
    private String email;

    @JsonIgnore
    private String password;


    private Collection<? extends GrantedAuthority> authorities;

    public UserPrincipal(Long id, String username, String password, String email, Collection<? extends GrantedAuthority> authorities) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.email = email;
        this.authorities = authorities;
    }

    public static UserPrincipal create(User user) {

        return new UserPrincipal(
                user.getId(),
                user.getUsername(),
                user.getPassword(),
                user.getEmail(),
                AuthorityUtils.commaSeparatedStringToAuthorityList("USER")
        );
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return null;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

}

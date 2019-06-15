package pl.barter.service;

import org.springframework.stereotype.Service;
import pl.barter.model.User;
import pl.barter.model.dto.UserDto;

@Service
public class UserHelperService {

    public UserDto mapToDto(User user){

        UserDto userDto = new UserDto();
        userDto.setForename(user.getForename());
        userDto.setEmail(user.getEmail());
        userDto.setLogin(user.getUsername());
        userDto.setSurname(user.getSurname());
        userDto.setAddress(user.getAddress());
        userDto.setCity(user.getCity());
        userDto.setZipCode(user.getZipCode());
        userDto.setPhoneNumber(user.getPhoneNumber());
        userDto.setBirthDate(user.getBirthDate());
        userDto.setId(user.getId());
        userDto.setImg(user.getImage());
        userDto.setImageType(user.getImageType());
        userDto.setFav(user.getFav());


        return userDto;
    }
}

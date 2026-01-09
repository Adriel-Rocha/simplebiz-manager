package com.adriel.simplebiz.simplebiz_manager.service;

import java.util.Optional;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.adriel.simplebiz.simplebiz_manager.dto.request.RegisterRequest;
import com.adriel.simplebiz.simplebiz_manager.entity.User;
import com.adriel.simplebiz.simplebiz_manager.entity.User.Role;
import com.adriel.simplebiz.simplebiz_manager.repository.UserRepository;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthService(UserRepository userRepository,
                       PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public String login(String email, String password) {
        // já implementado por você
        return "token-placeholder";
    }

    public void register(RegisterRequest request) {

        Optional<User> existingUser =
                userRepository.findByEmail(request.email());

        if (existingUser.isPresent()) {
            throw new RuntimeException("Email already registered");
        }

        User user = new User();
        user.setName(request.name());
        user.setEmail(request.email());
        user.setPassword(passwordEncoder.encode(request.password()));
        user.setRole(Role.USER);

        userRepository.save(user);
    }
}

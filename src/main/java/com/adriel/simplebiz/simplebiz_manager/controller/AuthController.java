package com.adriel.simplebiz.simplebiz_manager.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.adriel.simplebiz.simplebiz_manager.dto.request.LoginRequest;
import com.adriel.simplebiz.simplebiz_manager.dto.request.RegisterRequest;
import com.adriel.simplebiz.simplebiz_manager.dto.response.AuthResponse;
import com.adriel.simplebiz.simplebiz_manager.service.AuthService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        String token = authService.login(request.email(), request.password());
        return ResponseEntity.ok(new AuthResponse(token));
    }

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@RequestBody @Valid RegisterRequest request) {

        authService.register(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(new AuthResponse("User registered successfully"));
    }
}

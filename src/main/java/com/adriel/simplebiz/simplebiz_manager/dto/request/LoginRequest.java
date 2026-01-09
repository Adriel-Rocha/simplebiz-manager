package com.adriel.simplebiz.simplebiz_manager.dto.request;

public record LoginRequest(
        String email,
        String password
) {}

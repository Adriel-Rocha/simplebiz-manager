package com.adriel.simplebiz.simplebiz_manager.exception;

import java.time.LocalDateTime;

public class ApiErrorResponse {

    private final int status;
    private final String error;
    private final Object message;
    private final LocalDateTime timestamp = LocalDateTime.now();

    public ApiErrorResponse(int status, String error, Object message) {
        this.status = status;
        this.error = error;
        this.message = message;
    }

    public int getStatus() {
        return status;
    }

    public String getError() {
        return error;
    }

    public Object getMessage() {
        return message;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }
}

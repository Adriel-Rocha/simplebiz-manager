package com.adriel.simplebiz.simplebiz_manager.mapper;

import org.springframework.stereotype.Component;

import com.adriel.simplebiz.simplebiz_manager.dto.request.ClientRequest;
import com.adriel.simplebiz.simplebiz_manager.dto.response.ClientResponse;
import com.adriel.simplebiz.simplebiz_manager.entity.Client;

@Component
public class ClientMapper {

    public Client toEntity(ClientRequest request) {
        Client client = new Client();
        client.setName(request.getName());
        client.setEmail(request.getEmail());
        client.setPhone(request.getPhone());
        return client;
    }

    public void updateEntity(Client client, ClientRequest request) {
        client.setName(request.getName());
        client.setEmail(request.getEmail());
        client.setPhone(request.getPhone());
    }

    public ClientResponse toResponse(Client client) {
        ClientResponse response = new ClientResponse();
        response.setId(client.getId());
        response.setName(client.getName());
        response.setEmail(client.getEmail());
        response.setPhone(client.getPhone());
        return response;
    }
}

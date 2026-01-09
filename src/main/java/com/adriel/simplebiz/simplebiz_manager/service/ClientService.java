package com.adriel.simplebiz.simplebiz_manager.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.adriel.simplebiz.simplebiz_manager.dto.request.ClientRequest;
import com.adriel.simplebiz.simplebiz_manager.dto.response.ClientResponse;
import com.adriel.simplebiz.simplebiz_manager.entity.Client;
import com.adriel.simplebiz.simplebiz_manager.exception.EmailAlreadyExistsException;
import com.adriel.simplebiz.simplebiz_manager.mapper.ClientMapper;
import com.adriel.simplebiz.simplebiz_manager.repository.ClientRepository;

@Service
public class ClientService {

  private final ClientRepository clientRepository;
  private final ClientMapper mapper;

  public ClientService(ClientRepository clientRepository, ClientMapper mapper) {
    this.clientRepository = clientRepository;
    this.mapper = mapper;
  }

  public ClientResponse create(ClientRequest request) {

    if (clientRepository.existsByEmail(request.getEmail())) {
      throw new EmailAlreadyExistsException("Email já cadastrado");
    }

    Client client = mapper.toEntity(request);
    clientRepository.save(client);

    return mapper.toResponse(client);
  }

  public List<ClientResponse> findAll() {
    return clientRepository.findAll()
        .stream()
        .map(this::toResponse)
        .toList();
  }

  public ClientResponse findById(Long id) {
    Client client = clientRepository.findById(id)
        .orElseThrow(() -> new RuntimeException("Cliente não encontrado"));

    return toResponse(client);
  }

  public ClientResponse update(Long id, ClientRequest request) {

    Client client = clientRepository.findById(id)
        .orElseThrow(() -> new RuntimeException("Cliente não encontrado"));

    if (!client.getEmail().equals(request.getEmail()) &&
        clientRepository.existsByEmail(request.getEmail())) {

      throw new EmailAlreadyExistsException("Email já cadastrado");
    }

    mapper.updateEntity(client, request);
    clientRepository.save(client);

    return mapper.toResponse(client);
  }

  public void delete(Long id) {
    clientRepository.deleteById(id);
  }

  private ClientResponse toResponse(Client client) {
    ClientResponse response = new ClientResponse();
    response.setId(client.getId());
    response.setName(client.getName());
    response.setEmail(client.getEmail());
    response.setPhone(client.getPhone());
    return response;
  }
}

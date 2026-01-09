package com.adriel.simplebiz.simplebiz_manager.controller;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.adriel.simplebiz.simplebiz_manager.dto.request.ClientRequest;
import com.adriel.simplebiz.simplebiz_manager.dto.response.ClientResponse;
import com.adriel.simplebiz.simplebiz_manager.service.ClientService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/clients")
public class ClientController {

  private final ClientService clientService;

  public ClientController(ClientService clientService) {
    this.clientService = clientService;
  }

  @PreAuthorize("hasRole('ADMIN')")
  @PostMapping
  @ResponseStatus(HttpStatus.CREATED)
  public ClientResponse create(@Valid @RequestBody ClientRequest request) {
    return clientService.create(request);
  }

  @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
  public Page<ClientResponse> listClients(Pageable pageable) {
    return clientService.findAll(pageable);
  }

  @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
  @GetMapping("/{id}")
  public ClientResponse findById(@PathVariable Long id) {
    return clientService.findById(id);
  }

  @PreAuthorize("hasRole('ADMIN')")
  @PutMapping("/{id}")
  public ClientResponse update(
      @PathVariable Long id,
      @Valid @RequestBody ClientRequest request) {
    return clientService.update(id, request);
  }

  @PreAuthorize("hasRole('ADMIN')")
  @DeleteMapping("/{id}")
  @ResponseStatus(HttpStatus.NO_CONTENT)
  public void delete(@PathVariable Long id) {
    clientService.delete(id);
  }
}

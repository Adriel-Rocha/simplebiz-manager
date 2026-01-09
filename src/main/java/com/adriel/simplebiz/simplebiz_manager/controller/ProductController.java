package com.adriel.simplebiz.simplebiz_manager.controller;

import java.util.List;

import jakarta.validation.Valid;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.adriel.simplebiz.simplebiz_manager.dto.request.ProductRequest;
import com.adriel.simplebiz.simplebiz_manager.dto.response.ProductResponse;
import com.adriel.simplebiz.simplebiz_manager.service.ProductService;

@RestController
@RequestMapping("/products")
public class ProductController {

  private final ProductService service;

  public ProductController(ProductService service) {
    this.service = service;
  }

  @PreAuthorize("hasRole('ADMIN')")
  @PostMapping
  public ResponseEntity<ProductResponse> create(@RequestBody @Valid ProductRequest request) {
      ProductResponse response = service.create(request);
      return ResponseEntity.status(HttpStatus.CREATED).body(response);
  }

  @GetMapping
  public ResponseEntity<Page<ProductResponse>> findAll(@PageableDefault(size = 10, sort = "id") Pageable pageable) {
      return ResponseEntity.ok(service.findAll(pageable));
  }

  @GetMapping("/{id}")
  public ResponseEntity<ProductResponse> findById(@PathVariable Long id) {
      return ResponseEntity.ok(service.findById(id));
  }

  @PreAuthorize("hasRole('ADMIN')")
  @PutMapping("/{id}")
  public ResponseEntity<ProductResponse> update(@PathVariable Long id,@RequestBody @Valid ProductRequest request) {
      return ResponseEntity.ok(service.update(id, request));
  }

  @PreAuthorize("hasRole('ADMIN')")
  @DeleteMapping("/{id}")
  @ResponseStatus(HttpStatus.NO_CONTENT)
  public void delete(@PathVariable Long id) {
    service.delete(id);
  }
}

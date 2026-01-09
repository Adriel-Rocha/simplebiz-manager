package com.adriel.simplebiz.simplebiz_manager.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.adriel.simplebiz.simplebiz_manager.dto.request.ProductRequest;
import com.adriel.simplebiz.simplebiz_manager.dto.response.ProductResponse;
import com.adriel.simplebiz.simplebiz_manager.entity.Product;
import com.adriel.simplebiz.simplebiz_manager.mapper.ProductMapper;
import com.adriel.simplebiz.simplebiz_manager.repository.ProductRepository;

@Service
public class ProductService {

    private final ProductRepository repository;
    private final ProductMapper mapper;

    public ProductService(ProductRepository repository, ProductMapper mapper) {
        this.repository = repository;
        this.mapper = mapper;
    }

    public ProductResponse create(ProductRequest request) {
        Product product = mapper.toEntity(request);
        repository.save(product);
        return mapper.toResponse(product);
    }

    public Page<ProductResponse> findAll(Pageable pageable) {
    return repository.findAll(pageable)
            .map(mapper::toResponse);
}

    public ProductResponse findById(Long id) {
        Product product = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Produto não encontrado"));

        return mapper.toResponse(product);
    }

    public ProductResponse update(Long id, ProductRequest request) {
        Product product = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Produto não encontrado"));

        mapper.updateEntity(product, request);
        repository.save(product);

        return mapper.toResponse(product);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}

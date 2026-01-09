package com.adriel.simplebiz.simplebiz_manager.mapper;

import org.springframework.stereotype.Component;

import com.adriel.simplebiz.simplebiz_manager.dto.request.ProductRequest;
import com.adriel.simplebiz.simplebiz_manager.dto.response.ProductResponse;
import com.adriel.simplebiz.simplebiz_manager.entity.Product;

@Component
public class ProductMapper {

    public Product toEntity(ProductRequest request) {
        Product product = new Product();
        product.setName(request.getName());
        product.setDescription(request.getDescription());
        product.setPrice(request.getPrice());
        product.setStock(request.getStock());
        return product;
    }

    public ProductResponse toResponse(Product product) {
        ProductResponse response = new ProductResponse();
        response.setId(product.getId());
        response.setName(product.getName());
        response.setDescription(product.getDescription());
        response.setPrice(product.getPrice());
        response.setStock(product.getStock());
        response.setActive(product.getActive());
        return response;
    }

    public void updateEntity(Product product, ProductRequest request) {
        product.setName(request.getName());
        product.setDescription(request.getDescription());
        product.setPrice(request.getPrice());
        product.setStock(request.getStock());
    }
}

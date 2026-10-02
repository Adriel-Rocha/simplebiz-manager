package com.adriel.simplebiz.simplebiz_manager.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.adriel.simplebiz.simplebiz_manager.entity.Product;

public interface ProductRepository extends JpaRepository<Product, Long> {

  boolean existsByName(String name);

  Optional<Product> findByName(String name);
}

package com.adriel.simplebiz.simplebiz_manager.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.adriel.simplebiz.simplebiz_manager.entity.Product;

public interface ProductRepository extends JpaRepository<Product, Long> {

  Page<Product> findAll(Pageable pageable);


}

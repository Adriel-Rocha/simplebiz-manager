package com.adriel.simplebiz.simplebiz_manager.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.adriel.simplebiz.simplebiz_manager.entity.Client;

public interface ClientRepository extends JpaRepository<Client, Long> {

  boolean existsByEmail(String email);

}

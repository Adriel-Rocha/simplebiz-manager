package com.adriel.simplebiz.simplebiz_manager.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.adriel.simplebiz.simplebiz_manager.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {

  Optional<User> findByEmail(String email);

}

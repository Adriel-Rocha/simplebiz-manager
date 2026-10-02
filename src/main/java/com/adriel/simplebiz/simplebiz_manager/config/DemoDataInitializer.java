package com.adriel.simplebiz.simplebiz_manager.config;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.adriel.simplebiz.simplebiz_manager.entity.Client;
import com.adriel.simplebiz.simplebiz_manager.entity.Product;
import com.adriel.simplebiz.simplebiz_manager.entity.User;
import com.adriel.simplebiz.simplebiz_manager.entity.User.Role;
import com.adriel.simplebiz.simplebiz_manager.repository.ClientRepository;
import com.adriel.simplebiz.simplebiz_manager.repository.ProductRepository;
import com.adriel.simplebiz.simplebiz_manager.repository.UserRepository;

@Configuration
public class DemoDataInitializer {

        @Bean
        CommandLineRunner initializeDemoData(
                        UserRepository userRepository,
                        ClientRepository clientRepository,
                        ProductRepository productRepository,
                        PasswordEncoder passwordEncoder,
                        @Value("${app.demo-data.enabled:false}") boolean demoDataEnabled) {

                return args -> {
                        if (!demoDataEnabled) {
                                return;
                        }

                        seedUsers(userRepository, passwordEncoder);
                        seedClients(clientRepository);
                        seedProducts(productRepository);

                        System.out.println("SimpleBiz demo data initialization completed.");
                };
        }

        private void seedUsers(
                        UserRepository userRepository,
                        PasswordEncoder passwordEncoder) {

                upsertUser(
                                userRepository,
                                passwordEncoder,
                                "Demo Administrator",
                                "demo@admin.example",
                                "DemoAdmin123!",
                                Role.ADMIN);

                upsertUser(
                                userRepository,
                                passwordEncoder,
                                "Demo User",
                                "demo@user.example",
                                "DemoUser123!",
                                Role.USER);
        }

        private void upsertUser(
                        UserRepository userRepository,
                        PasswordEncoder passwordEncoder,
                        String name,
                        String email,
                        String password,
                        Role role) {

                User user = userRepository.findByEmail(email).orElseGet(User::new);

                user.setName(name);
                user.setEmail(email);
                user.setRole(role);

                /*
                 * These are dedicated public-demo accounts. Keep their credentials
                 * deterministic so the demo always has known login credentials.
                 */
                user.setPassword(passwordEncoder.encode(password));

                userRepository.save(user);
        }

        private void seedClients(ClientRepository clientRepository) {
                List<DemoClient> clients = List.of(
                                new DemoClient(
                                                "Acme Solutions",
                                                "sales@acme.example.com",
                                                "+1 202-555-0101"),

                                new DemoClient(
                                                "Northstar Consulting",
                                                "hello@northstar.example.com",
                                                "+1 202-555-0102"),

                                new DemoClient(
                                                "BluePeak Studio",
                                                "contact@bluepeak.example.com",
                                                "+1 202-555-0103"),

                                new DemoClient(
                                                "Greenfield Market",
                                                "orders@greenfield.example.com",
                                                "+1 202-555-0104"),

                                new DemoClient(
                                                "Summit Office",
                                                "admin@summitoffice.example.com",
                                                "+1 202-555-0105"));

                for (DemoClient demoClient : clients) {
                        if (clientRepository.existsByEmail(demoClient.email())) {
                                continue;
                        }

                        Client client = new Client();
                        client.setName(demoClient.name());
                        client.setEmail(demoClient.email());
                        client.setPhone(demoClient.phone());

                        clientRepository.save(client);
                }
        }

        private void seedProducts(ProductRepository productRepository) {
                List<DemoProduct> products = List.of(
                                new DemoProduct(
                                                "Starter Plan",
                                                "Essential tools for small teams getting organized.",
                                                "29.00",
                                                120,
                                                true),

                                new DemoProduct(
                                                "Business Plan",
                                                "Advanced features for growing operations.",
                                                "79.00",
                                                75,
                                                true),

                                new DemoProduct(
                                                "Premium Plan",
                                                "Full business management package with priority support.",
                                                "149.00",
                                                40,
                                                true),

                                new DemoProduct(
                                                "Enterprise Plan",
                                                "Scalable package for larger teams and complex workflows.",
                                                "299.00",
                                                15,
                                                true),

                                new DemoProduct(
                                                "Analytics Add-on",
                                                "Operational reports and management insights.",
                                                "39.00",
                                                60,
                                                true),

                                new DemoProduct(
                                                "Automation Pack",
                                                "Preconfigured workflow automation package.",
                                                "89.00",
                                                25,
                                                true),

                                new DemoProduct(
                                                "API Integration Pack",
                                                "Reusable integrations for external business platforms.",
                                                "129.00",
                                                18,
                                                true),

                                new DemoProduct(
                                                "Onboarding Package",
                                                "Guided setup and initial business configuration.",
                                                "199.00",
                                                8,
                                                true));

                for (DemoProduct demoProduct : products) {
                        if (productRepository.existsByName(demoProduct.name())) {
                                continue;
                        }

                        Product product = new Product();
                        product.setName(demoProduct.name());
                        product.setDescription(demoProduct.description());
                        product.setPrice(new BigDecimal(demoProduct.price()));
                        product.setStock(demoProduct.stock());
                        product.setActive(demoProduct.active());

                        productRepository.save(product);
                }
        }

        private record DemoClient(
                        String name,
                        String email,
                        String phone) {
        }

        private record DemoProduct(
                        String name,
                        String description,
                        String price,
                        int stock,
                        boolean active) {
        }
}

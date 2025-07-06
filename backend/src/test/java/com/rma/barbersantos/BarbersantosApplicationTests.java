package com.rma.barbersantos;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.security.SecureRandom;
import java.util.Base64;

@SpringBootTest
class BarbersantosApplicationTests {

	@Test
	void contextLoads() {
	}

	@Test
	void passwordEncoderTest() {
		BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

		// Senhas originais do seu script
		String adminPassword = "admin123";
		String barbeiroCarlosPassword = "barbeiro123";
		String barbeiroJonasPassword = "barbeiro456";
		String clienteFernandoPassword = "cliente123";
		String clienteMarianaPassword = "cliente456";

		// Gerando os hashes
		System.out.println("admin123: " + passwordEncoder.encode(adminPassword));
		System.out.println("barbeiro123: " + passwordEncoder.encode(barbeiroCarlosPassword));
		System.out.println("barbeiro456: " + passwordEncoder.encode(barbeiroJonasPassword));
		System.out.println("cliente123: " + passwordEncoder.encode(clienteFernandoPassword));
		System.out.println("cliente456: " + passwordEncoder.encode(clienteMarianaPassword));
	}

}

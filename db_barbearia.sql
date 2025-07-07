-- MySQL dump 10.13  Distrib 8.4.5, for Linux (x86_64)
--
-- Host: localhost    Database: db_barbearia
-- ------------------------------------------------------
-- Server version	8.4.5

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `agendamentos`
--

DROP TABLE IF EXISTS `agendamentos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `agendamentos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_cliente` int NOT NULL,
  `id_barbeiro` int NOT NULL,
  `id_servico` int NOT NULL,
  `data_hora_agendamento` datetime NOT NULL,
  `status` enum('AGENDADO','CONCLUIDO','CANCELADO_PELO_CLIENTE','CANCELADO_PELO_SALAO') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'AGENDADO',
  `observacoes` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `data_criacao` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `idx_barbeiro_horario` (`id_barbeiro`,`data_hora_agendamento`),
  KEY `id_cliente` (`id_cliente`),
  KEY `id_servico` (`id_servico`),
  CONSTRAINT `agendamentos_ibfk_1` FOREIGN KEY (`id_cliente`) REFERENCES `usuarios` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `agendamentos_ibfk_2` FOREIGN KEY (`id_barbeiro`) REFERENCES `usuarios` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `agendamentos_ibfk_3` FOREIGN KEY (`id_servico`) REFERENCES `servicos` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `agendamentos`
--

LOCK TABLES `agendamentos` WRITE;
/*!40000 ALTER TABLE `agendamentos` DISABLE KEYS */;
INSERT INTO `agendamentos` VALUES (1,4,2,1,'2025-07-10 10:00:00','CONCLUIDO',NULL,'2025-07-06 20:44:11'),(2,5,3,3,'2025-07-10 11:30:00','AGENDADO',NULL,'2025-07-06 20:44:11'),(3,4,2,2,'2025-07-25 14:00:00','AGENDADO',NULL,'2025-07-06 20:44:11'),(4,7,2,1,'2025-07-12 02:00:00','CANCELADO_PELO_CLIENTE',NULL,'2025-07-07 11:49:21'),(5,7,3,2,'2025-07-13 19:00:00','CANCELADO_PELO_CLIENTE',NULL,'2025-07-07 11:57:19'),(6,7,3,1,'2025-07-12 15:00:00','CANCELADO_PELO_CLIENTE',NULL,'2025-07-07 12:07:01'),(7,7,3,1,'2025-07-10 19:00:00','CANCELADO_PELO_CLIENTE',NULL,'2025-07-07 12:07:49'),(8,7,3,3,'2025-07-23 21:00:00','CANCELADO_PELO_CLIENTE',NULL,'2025-07-07 12:10:38'),(9,7,2,1,'2025-07-13 18:00:00','AGENDADO',NULL,'2025-07-07 12:12:30'),(10,4,2,3,'2025-06-28 11:00:00','CONCLUIDO','Agendamento de teste para avaliação.','2025-07-07 08:52:45'),(11,4,2,2,'2025-07-07 22:00:00','AGENDADO',NULL,'2025-07-07 13:13:08'),(12,4,2,3,'2025-07-07 19:00:00','CONCLUIDO',NULL,'2025-07-07 13:13:25');
/*!40000 ALTER TABLE `agendamentos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `avaliacoes`
--

DROP TABLE IF EXISTS `avaliacoes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `avaliacoes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_agendamento` int NOT NULL,
  `nota` tinyint NOT NULL,
  `comentario` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `data_avaliacao` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_agendamento` (`id_agendamento`),
  CONSTRAINT `avaliacoes_ibfk_1` FOREIGN KEY (`id_agendamento`) REFERENCES `agendamentos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `avaliacoes_chk_1` CHECK ((`nota` between 1 and 5))
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `avaliacoes`
--

LOCK TABLES `avaliacoes` WRITE;
/*!40000 ALTER TABLE `avaliacoes` DISABLE KEYS */;
INSERT INTO `avaliacoes` VALUES (1,1,5,'O Carlos é um excelente profissional! Corte ficou perfeito.','2025-07-06 20:44:11'),(2,10,3,'teste de comentario','2025-07-07 12:53:21');
/*!40000 ALTER TABLE `avaliacoes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `servicos`
--

DROP TABLE IF EXISTS `servicos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `servicos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `descricao` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `preco` decimal(10,2) NOT NULL,
  `duracao_estimada_min` int NOT NULL,
  `ativo` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `servicos`
--

LOCK TABLES `servicos` WRITE;
/*!40000 ALTER TABLE `servicos` DISABLE KEYS */;
INSERT INTO `servicos` VALUES (1,'Corte de Cabelo Masculino','Corte moderno com tesoura e máquina, incluindo lavagem e finalização.',45.00,40,1),(2,'Barba Terapia','Design de barba completo com toalha quente, massagem e produtos especiais.',40.00,30,1),(3,'Combo Cabelo + Barba','O pacote completo para o seu estilo, com corte e barba terapia.',80.00,75,1),(4,'Pezinho/Acabamento','Manutenção rápida do contorno do cabelo e barba.',15.00,15,1),(6,'Servico Teste','testando',10.00,2,1);
/*!40000 ALTER TABLE `servicos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `senha` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `telefone` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `nivel_acesso` enum('CLIENTE','BARBEIRO','ADMIN') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `data_cadastro` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `ativo` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,'Admin Mestre','admin@barbearia.com','$2a$10$zsqdrCoNLJzFCS48u6.uSOzHfiVI2CdssJCan5fWqHk1VAq6TS1nq','92999990000','ADMIN','2025-07-06 20:44:11',1),(2,'inosuke','isk@barbearia.com','$2a$10$JRVpwUvwrpV8qfEFjO597.JydQjK9v3JkiW5HPd4HwmRBdeKNtyzW','92999991111','BARBEIRO','2025-07-06 20:44:11',1),(3,'lionel messi','messi@barbearia.com','$2a$10$1C0ljrhO0xk5gwXHJ21LzuThkzri3xAQdnrzINxfknTGoGxQwiphW','92999992222','BARBEIRO','2025-07-06 20:44:11',1),(4,'Cliente Fernando','fernando@email.com','$2a$10$rZimqdWIa5nDTnww8XNTHO6n8xfm6/LLiYdpBl.gT72pEIFNlSgZC','92988881111','CLIENTE','2025-07-06 20:44:11',1),(5,'Cliente Mariana','mariana@email.com','$2a$10$L0bkg3gfAtv.Sa5838kCi.aLghPGvmGk7PqWuQ7vCi3.EmsTxaJ2y','92988882222','CLIENTE','2025-07-06 20:44:11',1),(6,'Novo Cliente Teste','novo.cliente@email.com','$2a$10$psqG3pEkkey1O08weDrI3ePk40bd.9oRwpKY9ColDWfgdp4aMi4wS','92912345678','CLIENTE','2025-07-07 00:51:41',1),(7,'Rian Rodrigues','rian@email.com','$2a$10$LERx49ZM4BTfcm88vV19X.FiXm3q0G5vcdoYdQNGEBLRF1b8X8Mpa',NULL,'CLIENTE','2025-07-07 10:58:13',1),(10,'Matheus Victor','mt@barbearia.com','$2a$10$w3Ko50MEGubLvXq2W/NqJ.OgDenqP5oPi3naWX2ycS7CipAaLwSyy','9182372156','BARBEIRO','2025-07-07 15:58:38',1);
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-07-07  8:16:14

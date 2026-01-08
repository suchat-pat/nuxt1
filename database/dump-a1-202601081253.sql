-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: localhost    Database: a1
-- ------------------------------------------------------
-- Server version	8.0.44

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `tb_commit`
--

DROP TABLE IF EXISTS `tb_commit`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_commit` (
  `id_commit` int NOT NULL AUTO_INCREMENT,
  `id_member` int NOT NULL,
  `id_eva` int NOT NULL,
  `status_commit` varchar(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `level_commit` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `detail_commit` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `signature` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id_commit`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_commit`
--

LOCK TABLES `tb_commit` WRITE;
/*!40000 ALTER TABLE `tb_commit` DISABLE KEYS */;
/*!40000 ALTER TABLE `tb_commit` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_doc`
--

DROP TABLE IF EXISTS `tb_doc`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_doc` (
  `id_doc` int NOT NULL AUTO_INCREMENT,
  `name_doc` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `day_doc` date NOT NULL,
  `file` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id_doc`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_doc`
--

LOCK TABLES `tb_doc` WRITE;
/*!40000 ALTER TABLE `tb_doc` DISABLE KEYS */;
/*!40000 ALTER TABLE `tb_doc` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_eva`
--

DROP TABLE IF EXISTS `tb_eva`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_eva` (
  `id_eva` int NOT NULL AUTO_INCREMENT,
  `id_member` int NOT NULL,
  `id_sys` int NOT NULL,
  `day_eva` date NOT NULL,
  `total_eva` double(10,2) NOT NULL,
  `total_commit` double(10,2) NOT NULL,
  `status_eva` int NOT NULL,
  PRIMARY KEY (`id_eva`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_eva`
--

LOCK TABLES `tb_eva` WRITE;
/*!40000 ALTER TABLE `tb_eva` DISABLE KEYS */;
INSERT INTO `tb_eva` VALUES (1,3,1,'2026-03-03',0.00,0.00,1);
/*!40000 ALTER TABLE `tb_eva` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_evadetail`
--

DROP TABLE IF EXISTS `tb_evadetail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_evadetail` (
  `id_eva` int NOT NULL,
  `id_indicate` int NOT NULL,
  `status_eva` varchar(2) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `score_member` int DEFAULT NULL,
  `score_commit` int DEFAULT NULL,
  `detail_eva` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `file_eva` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_evadetail`
--

LOCK TABLES `tb_evadetail` WRITE;
/*!40000 ALTER TABLE `tb_evadetail` DISABLE KEYS */;
/*!40000 ALTER TABLE `tb_evadetail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_indicate`
--

DROP TABLE IF EXISTS `tb_indicate`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_indicate` (
  `id_indicate` int NOT NULL AUTO_INCREMENT,
  `id_topic` int NOT NULL,
  `name_indicate` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `detail_indicate` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `point_indicate` int NOT NULL,
  `check_indicate` varchar(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id_indicate`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_indicate`
--

LOCK TABLES `tb_indicate` WRITE;
/*!40000 ALTER TABLE `tb_indicate` DISABLE KEYS */;
INSERT INTO `tb_indicate` VALUES (1,1,'ความตั้งใจเรียน','ไม่สมาธิสั้น',5,'y'),(2,1,'การมาเรียนสาย','มาเรียนตรงเวลา',5,'n'),(3,2,'ทำงานที่ได้รับครบ','ทำงานได้ครบตามที่ได้รับมอบหมาย',5,'n'),(4,2,'มีความตั้งใจ','ไม่วอกแวก',5,'y');
/*!40000 ALTER TABLE `tb_indicate` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_member`
--

DROP TABLE IF EXISTS `tb_member`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_member` (
  `id_member` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `username` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` enum('ฝ่ายบุคลากร','กรรมการประเมิน','ผู้รับการประเมินผล') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id_member`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_member`
--

LOCK TABLES `tb_member` WRITE;
/*!40000 ALTER TABLE `tb_member` DISABLE KEYS */;
INSERT INTO `tb_member` VALUES (1,'rrrr','rrrr','eeee','$2b$10$JpPuxEl3UI3MPbUw.PSit.ezy080a1AgsEcS1qwpXH4wehHRkHexa','eeeeee@gmail.com','ผู้รับการประเมินผล'),(2,'tttt','tttt','tttt','$2b$10$YKxa3rGOa7Ekk/eQHhBybOmRvOfSFp.EjCBEs5Sj51t9a7DFvcShG','tttt@gmail.com','ผู้รับการประเมินผล'),(3,'qqqq5588','qqqq5588','qqqq','$2b$10$woYyKBVmtzh6XM4t69u2cOdOoc7Tadch8UjLdZU2gHmM8B2sz/JMq','qqqq@gmail.com','ผู้รับการประเมินผล');
/*!40000 ALTER TABLE `tb_member` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_system`
--

DROP TABLE IF EXISTS `tb_system`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_system` (
  `id_sys` int NOT NULL AUTO_INCREMENT,
  `day_open` date NOT NULL,
  `day_out` date NOT NULL,
  `round_sys` varchar(2) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `year_sys` varchar(4) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `status_sys` varchar(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id_sys`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_system`
--

LOCK TABLES `tb_system` WRITE;
/*!40000 ALTER TABLE `tb_system` DISABLE KEYS */;
INSERT INTO `tb_system` VALUES (1,'2026-02-02','2026-02-09','1','2564','y');
/*!40000 ALTER TABLE `tb_system` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_topic`
--

DROP TABLE IF EXISTS `tb_topic`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_topic` (
  `id_topic` int NOT NULL AUTO_INCREMENT,
  `name_topic` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id_topic`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_topic`
--

LOCK TABLES `tb_topic` WRITE;
/*!40000 ALTER TABLE `tb_topic` DISABLE KEYS */;
INSERT INTO `tb_topic` VALUES (1,'การเรียน'),(2,'ความรับผิดชอบ');
/*!40000 ALTER TABLE `tb_topic` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'a1'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-01-08 12:53:08

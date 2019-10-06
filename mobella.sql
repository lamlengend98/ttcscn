# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 125.212.227.42 (MySQL 5.7.21)
# Database: preschool_system
# Generation Time: 2019-10-06 13:25:42 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table abscene_ticket
# ------------------------------------------------------------

DROP TABLE IF EXISTS `abscene_ticket`;

CREATE TABLE `abscene_ticket` (
  `id` int(11) NOT NULL,
  `std_id` int(11) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `reason` varchar(255) DEFAULT NULL,
  `status` tinyint(1) DEFAULT NULL,
  `tch_id` int(11) DEFAULT NULL,
  `pr_id` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `std_id` (`std_id`),
  KEY `tch_id` (`tch_id`),
  KEY `pr_id` (`pr_id`),
  CONSTRAINT `abscene_ticket_ibfk_1` FOREIGN KEY (`std_id`) REFERENCES `student` (`id`),
  CONSTRAINT `abscene_ticket_ibfk_2` FOREIGN KEY (`tch_id`) REFERENCES `teacher` (`id`),
  CONSTRAINT `abscene_ticket_ibfk_3` FOREIGN KEY (`pr_id`) REFERENCES `parent` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table activity_management
# ------------------------------------------------------------

DROP TABLE IF EXISTS `activity_management`;

CREATE TABLE `activity_management` (
  `id` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `author` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `page_view` int(11) DEFAULT NULL,
  `acti_time_from` date DEFAULT NULL,
  `acti_time_to` date DEFAULT NULL,
  `regis_time_from` date DEFAULT NULL,
  `regis_time_to` date DEFAULT NULL,
  `notice_class` int(11) DEFAULT NULL,
  `content` text,
  `regis_status` varchar(255) DEFAULT NULL,
  `img` int(11) DEFAULT NULL,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `notice_class` (`notice_class`),
  KEY `img` (`img`),
  CONSTRAINT `activity_management_ibfk_1` FOREIGN KEY (`notice_class`) REFERENCES `class` (`id`),
  CONSTRAINT `activity_management_ibfk_2` FOREIGN KEY (`img`) REFERENCES `image` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table am_class
# ------------------------------------------------------------

DROP TABLE IF EXISTS `am_class`;

CREATE TABLE `am_class` (
  `id_class` int(11) DEFAULT NULL,
  `notice_class` int(11) DEFAULT NULL,
  KEY `id_class` (`id_class`),
  KEY `notice_class` (`notice_class`),
  CONSTRAINT `am_class_ibfk_1` FOREIGN KEY (`id_class`) REFERENCES `class` (`id`),
  CONSTRAINT `am_class_ibfk_2` FOREIGN KEY (`notice_class`) REFERENCES `activity_management` (`notice_class`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table class
# ------------------------------------------------------------

DROP TABLE IF EXISTS `class`;

CREATE TABLE `class` (
  `id` int(11) NOT NULL,
  `class_name` varchar(255) DEFAULT NULL,
  `homeroom_teacher` int(11) DEFAULT NULL,
  `number_student` int(11) DEFAULT NULL,
  `student` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table image
# ------------------------------------------------------------

DROP TABLE IF EXISTS `image`;

CREATE TABLE `image` (
  `id` int(11) NOT NULL,
  `path` text,
  `mm_id` int(11) DEFAULT NULL,
  `act_id` int(11) DEFAULT NULL,
  `noti_id` int(11) DEFAULT NULL,
  `wp_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `mm_id` (`mm_id`),
  KEY `act_id` (`act_id`),
  KEY `noti_id` (`noti_id`),
  KEY `wp_id` (`wp_id`),
  CONSTRAINT `image_ibfk_1` FOREIGN KEY (`mm_id`) REFERENCES `moment` (`id`),
  CONSTRAINT `image_ibfk_2` FOREIGN KEY (`act_id`) REFERENCES `activity_management` (`id`),
  CONSTRAINT `image_ibfk_3` FOREIGN KEY (`noti_id`) REFERENCES `notification` (`id`),
  CONSTRAINT `image_ibfk_4` FOREIGN KEY (`wp_id`) REFERENCES `week_plan` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `image` WRITE;
/*!40000 ALTER TABLE `image` DISABLE KEYS */;

INSERT INTO `image` (`id`, `path`, `mm_id`, `act_id`, `noti_id`, `wp_id`)
VALUES
	(0,'asdasdasd',NULL,NULL,NULL,NULL);

/*!40000 ALTER TABLE `image` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table last_login
# ------------------------------------------------------------

DROP TABLE IF EXISTS `last_login`;

CREATE TABLE `last_login` (
  `id` int(11) NOT NULL,
  `is_boss` tinyint(1) DEFAULT NULL,
  `is_admin` tinyint(1) DEFAULT NULL,
  `is_teacher` tinyint(1) DEFAULT NULL,
  `is_parent` tinyint(1) DEFAULT NULL,
  `id_grant` int(11) DEFAULT NULL,
  `login_log` date DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table meal_type
# ------------------------------------------------------------

DROP TABLE IF EXISTS `meal_type`;

CREATE TABLE `meal_type` (
  `id` int(11) NOT NULL,
  `breakfast` varchar(255) DEFAULT NULL,
  `breakfast_sub` varchar(255) DEFAULT NULL,
  `lunch` varchar(255) DEFAULT NULL,
  `lunch_sub` varchar(255) DEFAULT NULL,
  `date_meal` date DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table moment
# ------------------------------------------------------------

DROP TABLE IF EXISTS `moment`;

CREATE TABLE `moment` (
  `id` int(11) NOT NULL,
  `content` text,
  `img` int(11) DEFAULT NULL,
  `like_status` tinyint(1) DEFAULT NULL,
  `author` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `img` (`img`),
  KEY `author` (`author`),
  CONSTRAINT `moment_ibfk_1` FOREIGN KEY (`img`) REFERENCES `image` (`id`),
  CONSTRAINT `moment_ibfk_2` FOREIGN KEY (`author`) REFERENCES `teacher` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `moment` WRITE;
/*!40000 ALTER TABLE `moment` DISABLE KEYS */;

INSERT INTO `moment` (`id`, `content`, `img`, `like_status`, `author`, `created_at`, `updated_at`)
VALUES
	(0,'asdasdasd\n	',0,1,0,'2019-09-30 15:22:35','2019-09-30 15:22:35');

/*!40000 ALTER TABLE `moment` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table notification
# ------------------------------------------------------------

DROP TABLE IF EXISTS `notification`;

CREATE TABLE `notification` (
  `id` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `author` varchar(255) DEFAULT NULL,
  `page_view` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `content` text,
  `notice_class` int(11) DEFAULT NULL,
  `img` int(11) DEFAULT NULL,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `notice_class` (`notice_class`),
  KEY `img` (`img`),
  CONSTRAINT `notification_ibfk_1` FOREIGN KEY (`notice_class`) REFERENCES `class` (`id`),
  CONSTRAINT `notification_ibfk_2` FOREIGN KEY (`img`) REFERENCES `image` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table parent
# ------------------------------------------------------------

DROP TABLE IF EXISTS `parent`;

CREATE TABLE `parent` (
  `id` int(11) NOT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `relationship` varchar(255) DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `time_card_num` varchar(255) DEFAULT NULL,
  `emergency_contact` tinyint(1) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `is_delete` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `parent` WRITE;
/*!40000 ALTER TABLE `parent` DISABLE KEYS */;

INSERT INTO `parent` (`id`, `last_name`, `first_name`, `phone`, `relationship`, `avatar`, `time_card_num`, `emergency_contact`, `password`, `created_at`, `updated_at`, `is_delete`)
VALUES
	(0,'Nguyen','Long','0868177610','bo','1','1',1,NULL,'2019-09-22 15:46:24','2019-09-22 15:46:24',0);

/*!40000 ALTER TABLE `parent` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table pr_std
# ------------------------------------------------------------

DROP TABLE IF EXISTS `pr_std`;

CREATE TABLE `pr_std` (
  `pr_id` int(11) DEFAULT NULL,
  `std_id` int(11) DEFAULT NULL,
  KEY `pr_id` (`pr_id`),
  KEY `std_id` (`std_id`),
  CONSTRAINT `pr_std_ibfk_1` FOREIGN KEY (`pr_id`) REFERENCES `parent` (`id`),
  CONSTRAINT `pr_std_ibfk_2` FOREIGN KEY (`std_id`) REFERENCES `student` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table sch_cl
# ------------------------------------------------------------

DROP TABLE IF EXISTS `sch_cl`;

CREATE TABLE `sch_cl` (
  `id` int(11) DEFAULT NULL,
  `sch_id` int(11) DEFAULT NULL,
  `cl_id` int(11) DEFAULT NULL,
  KEY `sch_id` (`sch_id`),
  KEY `cl_id` (`cl_id`),
  CONSTRAINT `sch_cl_ibfk_1` FOREIGN KEY (`sch_id`) REFERENCES `school` (`id`),
  CONSTRAINT `sch_cl_ibfk_2` FOREIGN KEY (`cl_id`) REFERENCES `class` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table school
# ------------------------------------------------------------

DROP TABLE IF EXISTS `school`;

CREATE TABLE `school` (
  `id` int(11) NOT NULL,
  `school_name` varchar(255) DEFAULT NULL,
  `school_year` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `website` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `description` text,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table std_cl
# ------------------------------------------------------------

DROP TABLE IF EXISTS `std_cl`;

CREATE TABLE `std_cl` (
  `class_id` int(11) DEFAULT NULL,
  `std_id` int(11) DEFAULT NULL,
  KEY `class_id` (`class_id`),
  KEY `std_id` (`std_id`),
  CONSTRAINT `std_cl_ibfk_1` FOREIGN KEY (`class_id`) REFERENCES `class` (`id`),
  CONSTRAINT `std_cl_ibfk_2` FOREIGN KEY (`std_id`) REFERENCES `student` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table student
# ------------------------------------------------------------

DROP TABLE IF EXISTS `student`;

CREATE TABLE `student` (
  `id` int(11) NOT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `gender` int(11) DEFAULT NULL,
  `birthday` date DEFAULT NULL,
  `id_number` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `parent` int(11) DEFAULT NULL,
  `school_year` int(11) DEFAULT NULL,
  `grade` varchar(255) DEFAULT NULL,
  `class` int(11) DEFAULT NULL,
  `school` int(11) DEFAULT NULL,
  `is_delete` tinyint(1) DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `class` (`class`),
  CONSTRAINT `student_ibfk_1` FOREIGN KEY (`class`) REFERENCES `class` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table teacher
# ------------------------------------------------------------

DROP TABLE IF EXISTS `teacher`;

CREATE TABLE `teacher` (
  `id` int(11) NOT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `is_delete` tinyint(1) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `teacher` WRITE;
/*!40000 ALTER TABLE `teacher` DISABLE KEYS */;

INSERT INTO `teacher` (`id`, `last_name`, `first_name`, `address`, `phone`, `email`, `avatar`, `created_at`, `updated_at`, `is_delete`, `password`)
VALUES
	(0,'anna','huttte','ha noi','1314123','hana@gmail.com','asdasd','2019-09-30 15:21:36','2019-09-30 15:21:36',0,NULL);

/*!40000 ALTER TABLE `teacher` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table user
# ------------------------------------------------------------

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `is_boss` tinyint(1) DEFAULT '0',
  `is_admin` tinyint(1) DEFAULT '0',
  `is_teacher` tinyint(1) DEFAULT '0',
  `is_student` tinyint(1) DEFAULT '0',
  `is_parent` tinyint(1) DEFAULT '0',
  `id_grant` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;

INSERT INTO `user` (`id`, `username`, `password`, `is_boss`, `is_admin`, `is_teacher`, `is_student`, `is_parent`, `id_grant`)
VALUES
	(0,'demo2','$2b$10$V8FX3LLzENZXE6TCEVUahua6XRIXa2Wq/e1pBRMg5jFA5xilEcuQC',0,0,0,0,1,0);

/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table week_plan
# ------------------------------------------------------------

DROP TABLE IF EXISTS `week_plan`;

CREATE TABLE `week_plan` (
  `id` int(11) NOT NULL,
  `date_plan` date DEFAULT NULL,
  `img_plan` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `img_plan` (`img_plan`),
  CONSTRAINT `week_plan_ibfk_1` FOREIGN KEY (`img_plan`) REFERENCES `image` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;




/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

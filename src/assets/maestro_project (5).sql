-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 03, 2025 at 01:01 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `maestro_project`
--

-- --------------------------------------------------------

--
-- Table structure for table `attendence`
--

CREATE TABLE `attendence` (
  `id` int(11) NOT NULL,
  `employee_id` int(11) NOT NULL,
  `in_Time` timestamp NULL DEFAULT NULL,
  `out_Time` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `attendence`
--

INSERT INTO `attendence` (`id`, `employee_id`, `in_Time`, `out_Time`) VALUES
(1, 17, '2025-01-01 05:06:00', '2025-01-01 14:20:00'),
(2, 17, '2025-01-02 05:00:00', '2025-01-02 12:20:00'),
(3, 17, '2025-01-05 06:18:00', '2025-01-05 13:00:00'),
(4, 17, '2025-01-06 07:35:00', '2025-01-06 13:00:00'),
(5, 17, '2025-01-07 06:03:00', '2025-01-07 14:40:00'),
(6, 18, '2025-01-01 05:15:00', '2025-01-01 14:20:00'),
(7, 18, '2025-01-02 05:00:00', '2025-01-02 12:20:00'),
(8, 18, '2025-01-05 06:00:00', '2025-01-05 06:00:00'),
(9, 18, '2025-01-06 14:35:00', '2025-01-06 14:35:00'),
(10, 18, '2025-01-07 07:18:00', '2025-01-07 14:40:00'),
(11, 19, '2025-01-01 03:55:00', '2025-01-01 12:57:00'),
(12, 19, '2025-01-02 12:38:00', '2025-01-02 12:38:00'),
(13, 19, '2025-01-04 12:38:00', '2025-01-04 12:38:00'),
(14, 19, '2025-01-05 03:50:00', '2025-01-05 13:50:00'),
(15, 19, '2025-01-06 03:50:00', '2025-01-06 13:50:00'),
(16, 19, '2025-01-07 04:01:00', '2025-01-07 13:40:00'),
(17, 20, '2025-01-01 17:43:00', '2025-01-01 13:40:00'),
(18, 20, '2025-01-02 04:20:00', '2025-01-02 13:06:00'),
(19, 20, '2025-01-05 16:45:00', '2025-01-05 13:05:00'),
(20, 20, '2025-01-06 04:24:00', '2025-01-06 14:46:00'),
(21, 20, '2025-01-07 04:38:00', '2025-01-07 13:20:00');

-- --------------------------------------------------------

--
-- Table structure for table `days`
--

CREATE TABLE `days` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `days`
--

INSERT INTO `days` (`id`, `name`) VALUES
(1, 'Saturday'),
(2, 'Sunday'),
(3, 'Monday'),
(4, 'Tuesday'),
(5, 'Wednesday'),
(6, 'Thursday'),
(7, 'Friday');

-- --------------------------------------------------------

--
-- Table structure for table `department`
--

CREATE TABLE `department` (
  `department_id` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `department`
--

INSERT INTO `department` (`department_id`, `title`) VALUES
(9, 'Admin'),
(10, 'HR'),
(11, 'Accounts'),
(12, 'Software'),
(13, 'Sales'),
(14, 'Billing Support'),
(15, 'Log Support'),
(16, 'Office Staff'),
(17, 'RND');

-- --------------------------------------------------------

--
-- Table structure for table `designation`
--

CREATE TABLE `designation` (
  `designation_id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `designation`
--

INSERT INTO `designation` (`designation_id`, `title`) VALUES
(15, 'Management'),
(16, 'Senior'),
(17, 'Junior');

-- --------------------------------------------------------

--
-- Table structure for table `duty_hour`
--

CREATE TABLE `duty_hour` (
  `duty_hour_id` int(11) NOT NULL,
  `From_t` time DEFAULT NULL,
  `To_t` time DEFAULT NULL,
  `day_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `duty_hour`
--

INSERT INTO `duty_hour` (`duty_hour_id`, `From_t`, `To_t`, `day_id`) VALUES
(22, '10:00:00', '16:00:00', 1),
(23, '12:00:00', '21:00:00', 1),
(24, '21:00:00', '00:00:00', 1),
(25, '10:00:00', '16:00:00', 2),
(26, '12:00:00', '21:00:00', 2),
(27, '21:00:00', '00:00:00', 2),
(28, '10:00:00', '16:00:00', 3),
(29, '12:00:00', '21:00:00', 3),
(30, '21:00:00', '00:00:00', 3),
(31, '10:00:00', '16:00:00', 4),
(32, '12:00:00', '21:00:00', 4),
(33, '21:00:00', '00:00:00', 4),
(34, '10:00:00', '16:00:00', 5),
(35, '12:00:00', '21:00:00', 5),
(36, '21:00:00', '00:00:00', 5),
(37, '10:00:00', '16:00:00', 6),
(38, '12:00:00', '21:00:00', 6),
(39, '21:00:00', '00:00:00', 6),
(40, '10:00:00', '15:00:00', 7),
(41, '15:00:00', '22:00:00', 7),
(42, '22:00:00', '00:00:00', 7),
(43, '09:00:00', '13:00:00', 1),
(45, '09:00:00', '15:00:00', 1),
(47, '21:00:00', '00:00:00', 1),
(48, '21:00:00', '14:00:00', 1),
(49, '09:00:00', '13:00:00', 2),
(50, '09:00:00', '15:00:00', 2),
(52, '21:00:00', '00:00:00', 2),
(53, '21:00:00', '02:00:00', 2),
(54, '09:00:00', '13:00:00', 3),
(55, '09:00:00', '15:00:00', 3),
(57, '21:00:00', '00:00:00', 3),
(58, '21:00:00', '02:00:00', 3),
(59, '09:00:00', '13:00:00', 4),
(60, '09:00:00', '15:00:00', 4),
(63, '21:00:00', '02:00:00', 4),
(64, '09:00:00', '13:00:00', 5),
(65, '09:00:00', '15:00:00', 5),
(68, '21:00:00', '02:00:00', 5),
(69, '09:00:00', '13:00:00', 6),
(70, '09:00:00', '15:00:00', 6),
(73, '21:00:00', '02:00:00', 6),
(74, '09:00:00', '13:00:00', 7),
(75, '21:00:00', '15:00:00', 7),
(76, '12:00:00', '21:00:00', 7),
(77, '21:00:00', '00:00:00', 7),
(78, '21:00:00', '02:00:00', 7);

-- --------------------------------------------------------

--
-- Table structure for table `employees`
--

CREATE TABLE `employees` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `department` int(11) DEFAULT NULL,
  `create_date` date NOT NULL,
  `update_date` date NOT NULL,
  `designation_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `employees`
--

INSERT INTO `employees` (`id`, `name`, `username`, `password`, `department`, `create_date`, `update_date`, `designation_id`) VALUES
(14, 'Md. Shariful Ahsan', 'ahsan123', '123232', 12, '2021-07-06', '2025-01-15', 15),
(15, 'Md. Ziaul Islam', 'zia232', '4323232', 9, '2021-06-18', '2025-01-10', 15),
(16, 'Shawan Roy', 'shawan321', 'dsswew', 17, '2021-06-16', '2025-01-16', 16),
(17, 'Palash Kumar', 'palash@232', '243223', 12, '2023-06-06', '2025-01-16', 16),
(18, 'Tanvir', 'tanvir432', 'dsw2222', 12, '2022-02-10', '2025-01-16', 16),
(19, 'Mizanur Rahman', 'mizan23744', '232312', 14, '2021-02-16', '2025-01-16', 15),
(20, 'Robiul Islam', 'robi2343', '2434392', 13, '2022-03-02', '2025-01-16', 15),
(21, 'Kabir Hossain', 'kabir_211', '2112232', 10, '2021-02-02', '2025-01-15', 15),
(22, 'Salauddin', 'salauddin23455', '4822011', 14, '2020-02-04', '2025-01-11', 16),
(23, 'Nur Alam', 'alam2124', 'sdsdsd', 9, '2020-03-16', '2025-01-16', 16),
(24, 'Khalid Hasan', 'kh211', 'sdsdsds', 15, '2022-02-02', '2025-01-16', 15),
(25, 'Najmul Hossain', 'njm3211', 'r3fddsd', 14, '2022-06-10', '2025-01-16', 16),
(26, 'Dobir Hossain', 'dbr23232', '32321321', 14, '2021-06-16', '2025-01-16', 16),
(27, 'Sourav', 'srv321', '34312', 13, '2023-10-17', '2025-01-16', 16),
(28, 'Sirajul', 'srj34521', 's22221', 15, '2021-02-03', '2025-01-16', 16),
(29, 'Shakil Hossain', 'shkl323232', '32323232', 14, '2021-02-09', '2025-01-16', 16),
(30, 'Abu Sufian', 'sufian321', '32323', 14, '2022-06-07', '2025-01-16', 16),
(31, 'Mostofa Hanif', 'mustapha2323', 'dsds222', 15, '2021-02-02', '2025-01-16', 16),
(32, 'Partha', 'prtha243', '23232', 15, '2024-06-19', '2025-01-16', 16),
(33, 'Hasibul', 'hsb3223', '43232', 14, '2023-06-08', '2025-01-16', 16),
(34, 'Rabbi', 'rbb2', '2455', 14, '2023-06-16', '2025-01-16', 17),
(35, 'Protikha Hasan', 'prtk321', '2344343', 14, '2023-02-08', '2025-01-15', 16),
(36, 'Ali', 'ali123', '23211', 16, '2008-06-10', '2025-01-16', 16),
(37, 'Bobe', 'boswe2ds2', '232321', 16, '2024-01-16', '2025-01-16', 17),
(38, 'Mominul', 'mnm3232', '232321', 14, '2024-11-16', '2025-01-16', 17),
(39, 'Aporbo Sarkar', 'aprbo321', '2101232', 14, '2024-05-01', '2025-01-16', 17),
(40, 'Ibtihaz-Ul-Kabir', 'ibtihaz2cool', '3231321', 12, '2024-12-20', '2025-01-16', 17),
(41, 'Kazi Md. Omar Farook', 'omar212', '3232131', 14, '2024-12-16', '2025-01-16', 17),
(42, 'Mobarok Hossain', 'mbrk23231', '342131', 15, '2024-12-27', '2025-01-16', 17);

-- --------------------------------------------------------

--
-- Table structure for table `employee_schedule`
--

CREATE TABLE `employee_schedule` (
  `id` int(11) NOT NULL,
  `Day_ID` int(11) NOT NULL,
  `employee_id` int(11) NOT NULL,
  `duty_hour_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `employee_schedule`
--

INSERT INTO `employee_schedule` (`id`, `Day_ID`, `employee_id`, `duty_hour_id`) VALUES
(1, 1, 31, 22),
(2, 1, 31, 24),
(3, 1, 28, 23),
(4, 1, 32, 22),
(6, 2, 32, 27),
(7, 2, 28, 26),
(8, 3, 28, 28),
(9, 3, 32, 29),
(10, 3, 28, 30),
(11, 5, 32, 34),
(12, 5, 31, 35),
(13, 5, 32, 36),
(14, 6, 31, 37),
(15, 6, 32, 38),
(16, 6, 28, 38),
(17, 6, 31, 39),
(18, 7, 28, 40),
(19, 7, 31, 41),
(20, 7, 28, 23),
(21, 1, 26, 23),
(22, 1, 25, 23),
(23, 1, 39, 23),
(24, 1, 19, 23),
(25, 1, 30, 23),
(26, 1, 33, 23),
(27, 1, 34, 23),
(28, 2, 34, 49),
(29, 2, 35, 50),
(30, 2, 39, 50),
(31, 2, 19, 26),
(32, 2, 22, 26),
(33, 2, 25, 26),
(34, 2, 30, 26),
(35, 2, 33, 26),
(36, 2, 38, 26),
(37, 1, 25, 47),
(38, 1, 26, 48),
(40, 2, 34, 52),
(41, 2, 35, 53),
(42, 3, 25, 54),
(43, 3, 35, 55),
(44, 3, 39, 55),
(45, 3, 19, 29),
(46, 3, 22, 29),
(47, 3, 29, 29),
(48, 3, 30, 29),
(49, 3, 33, 29),
(50, 3, 38, 29),
(51, 3, 35, 57),
(52, 3, 25, 58),
(53, 4, 33, 59),
(54, 4, 29, 60),
(55, 4, 30, 60),
(56, 4, 19, 32),
(57, 4, 26, 32),
(58, 4, 35, 32),
(59, 4, 22, 32),
(60, 4, 38, 32),
(61, 4, 29, 33),
(62, 4, 30, 33),
(63, 4, 33, 63),
(64, 5, 30, 64),
(65, 5, 35, 65),
(66, 5, 34, 65),
(67, 5, 19, 35),
(68, 5, 22, 35),
(69, 5, 26, 35),
(70, 5, 29, 35),
(71, 5, 33, 35),
(72, 5, 38, 35),
(73, 5, 35, 36),
(74, 5, 34, 36),
(75, 5, 30, 68),
(76, 6, 35, 69),
(77, 6, 25, 70),
(78, 6, 34, 70),
(79, 6, 22, 38),
(80, 6, 26, 38),
(81, 6, 29, 38),
(82, 6, 39, 38),
(83, 6, 38, 38),
(84, 6, 25, 39),
(85, 6, 34, 73),
(86, 7, 29, 74),
(87, 7, 34, 75),
(88, 7, 25, 76),
(89, 7, 26, 76),
(90, 7, 39, 76),
(91, 7, 34, 77),
(92, 7, 29, 78);

-- --------------------------------------------------------

--
-- Table structure for table `schedule_exchange`
--

CREATE TABLE `schedule_exchange` (
  `id` int(11) NOT NULL,
  `Emp_for` int(11) NOT NULL,
  `employee_schedule_id` int(11) NOT NULL,
  `Emp_with` int(11) NOT NULL,
  `Created_on` datetime NOT NULL,
  `Exchange_date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `work_schedule`
--

CREATE TABLE `work_schedule` (
  `id` int(11) NOT NULL,
  `employee_id` int(11) NOT NULL,
  `Saturday` varchar(255) DEFAULT NULL,
  `Sunday` varchar(255) DEFAULT NULL,
  `Monday` varchar(255) DEFAULT NULL,
  `Tuesday` varchar(255) DEFAULT NULL,
  `Wednesday` varchar(255) DEFAULT NULL,
  `Thursday` varchar(255) DEFAULT NULL,
  `Friday` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `work_schedule`
--

INSERT INTO `work_schedule` (`id`, `employee_id`, `Saturday`, `Sunday`, `Monday`, `Tuesday`, `Wednesday`, `Thursday`, `Friday`) VALUES
(1, 28, '12.00 PM to 9.00 PM', '12.00 PM to 9.00 PM', '10.00 AM to 4.00 PM', '', '', '12.00 PM to 9.00 PM', '10.00 AM to 3.00 PM'),
(2, 31, '10.00 AM to 4.00 PM', '', '', '12.00 PM to 9.00 PM', '12.00 PM to 9.00 PM', '10.00 AM to 4.00 PM', '3.00 PM to 10.00 PM'),
(3, 32, '', '10.00 AM to 4.00 PM', '12.00 PM to 9.00 PM', '10.00 AM to 4.00 PM', '10.00 AM to 4.00 PM', '12.00 PM to 9.00 PM', ''),
(4, 26, '09.00 AM to 1.00 PM', '', '', '12.00 PM to 9.00 PM', '12.00 PM to 9.00 PM', '12.00 PM to 9.00 PM', '12.00 PM to 9.00 PM'),
(5, 34, '12.00 PM to 9.00 PM', '9.00 AM to 1.00 PM', '', '', '9.00 AM to 3.00 PM', '9.00 AM to 3.00 PM', '9.00 AM to 3.00 PM'),
(6, 25, '09.00 AM to 3.00 PM', '12.00 PM to 9.00 PM', '09.00 AM to 1.00 PM', '', '', '9.00 AM to 3.00 PM', '12.00 PM to 9.00 PM'),
(7, 33, '12.00 PM to 9.00 PM', '12.00 PM to 9.00 PM', '12.00 PM to 9.00 PM', '9.00 AM to 1.00 PM', '12.00 PM to 9.00 PM', '', ''),
(8, 30, '12.00 PM to 9.00 PM', '12.00 PM to 9.00 PM', '12.00 PM to 9.00 PM', '9.00 AM to 3.00 PM', '9.00 AM to 1.00 PM', '', ''),
(9, 35, '', '9.00 AM to 3.00 PM', '09.00 AM to 3.00 PM', '12.00 PM to 9.00 PM', '9.00 AM to 3.00 PM', '9.00 AM to 1.00 PM', ''),
(10, 29, '', '', '12.00 PM to 9.00 PM', '9.00 AM to 3.00 PM', '12.00 PM to 9.00 PM', '12.00 PM to 9.00 PM', '9.00 AM to 1.00 PM'),
(11, 19, '12.00 PM to 9.00 PM', '12.00 PM to 9.00 PM', '12.00 PM to 9.00 PM', '12.00 PM to 9.00 PM', '12.00 PM to 9.00 PM', '', ''),
(12, 22, '', '12.00 PM to 9.00 PM', '12.00 PM to 9.00 PM', '12.00 PM to 9.00 PM', '12.00 PM to 9.00 PM', '12.00 PM to 9.00 PM', '');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `attendence`
--
ALTER TABLE `attendence`
  ADD PRIMARY KEY (`id`),
  ADD KEY `employee_id` (`employee_id`);

--
-- Indexes for table `days`
--
ALTER TABLE `days`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `department`
--
ALTER TABLE `department`
  ADD PRIMARY KEY (`department_id`);

--
-- Indexes for table `designation`
--
ALTER TABLE `designation`
  ADD PRIMARY KEY (`designation_id`);

--
-- Indexes for table `duty_hour`
--
ALTER TABLE `duty_hour`
  ADD PRIMARY KEY (`duty_hour_id`),
  ADD KEY `day_id` (`day_id`);

--
-- Indexes for table `employees`
--
ALTER TABLE `employees`
  ADD PRIMARY KEY (`id`),
  ADD KEY `designation_id` (`designation_id`);

--
-- Indexes for table `employee_schedule`
--
ALTER TABLE `employee_schedule`
  ADD PRIMARY KEY (`id`),
  ADD KEY `employee_id` (`employee_id`),
  ADD KEY `duty_hour_id` (`duty_hour_id`),
  ADD KEY `Day_ID` (`Day_ID`);

--
-- Indexes for table `schedule_exchange`
--
ALTER TABLE `schedule_exchange`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Emp_for` (`Emp_for`),
  ADD KEY `Emp_with` (`Emp_with`),
  ADD KEY `employee_schedule_id` (`employee_schedule_id`);

--
-- Indexes for table `work_schedule`
--
ALTER TABLE `work_schedule`
  ADD PRIMARY KEY (`id`),
  ADD KEY `employee_id` (`employee_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `attendence`
--
ALTER TABLE `attendence`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `days`
--
ALTER TABLE `days`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `department`
--
ALTER TABLE `department`
  MODIFY `department_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `designation`
--
ALTER TABLE `designation`
  MODIFY `designation_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `duty_hour`
--
ALTER TABLE `duty_hour`
  MODIFY `duty_hour_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=79;

--
-- AUTO_INCREMENT for table `employees`
--
ALTER TABLE `employees`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

--
-- AUTO_INCREMENT for table `employee_schedule`
--
ALTER TABLE `employee_schedule`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=93;

--
-- AUTO_INCREMENT for table `schedule_exchange`
--
ALTER TABLE `schedule_exchange`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `work_schedule`
--
ALTER TABLE `work_schedule`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `attendence`
--
ALTER TABLE `attendence`
  ADD CONSTRAINT `attendence_ibfk_1` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`id`);

--
-- Constraints for table `duty_hour`
--
ALTER TABLE `duty_hour`
  ADD CONSTRAINT `duty_hour_ibfk_1` FOREIGN KEY (`day_id`) REFERENCES `days` (`id`);

--
-- Constraints for table `employees`
--
ALTER TABLE `employees`
  ADD CONSTRAINT `employees_ibfk_1` FOREIGN KEY (`designation_id`) REFERENCES `designation` (`designation_id`);

--
-- Constraints for table `employee_schedule`
--
ALTER TABLE `employee_schedule`
  ADD CONSTRAINT `employee_schedule_ibfk_1` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`id`),
  ADD CONSTRAINT `employee_schedule_ibfk_2` FOREIGN KEY (`duty_hour_id`) REFERENCES `duty_hour` (`duty_hour_id`),
  ADD CONSTRAINT `employee_schedule_ibfk_3` FOREIGN KEY (`Day_ID`) REFERENCES `days` (`id`);

--
-- Constraints for table `schedule_exchange`
--
ALTER TABLE `schedule_exchange`
  ADD CONSTRAINT `schedule_exchange_ibfk_1` FOREIGN KEY (`Emp_for`) REFERENCES `employees` (`id`),
  ADD CONSTRAINT `schedule_exchange_ibfk_2` FOREIGN KEY (`Emp_with`) REFERENCES `employees` (`id`),
  ADD CONSTRAINT `schedule_exchange_ibfk_3` FOREIGN KEY (`employee_schedule_id`) REFERENCES `employee_schedule` (`id`);

--
-- Constraints for table `work_schedule`
--
ALTER TABLE `work_schedule`
  ADD CONSTRAINT `work_schedule_ibfk_1` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

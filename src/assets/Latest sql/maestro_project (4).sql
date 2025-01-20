-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 20, 2025 at 01:55 PM
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
-- Indexes for table `employees`
--
ALTER TABLE `employees`
  ADD PRIMARY KEY (`id`),
  ADD KEY `designation_id` (`designation_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `attendence`
--
ALTER TABLE `attendence`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

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
-- AUTO_INCREMENT for table `employees`
--
ALTER TABLE `employees`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `attendence`
--
ALTER TABLE `attendence`
  ADD CONSTRAINT `attendence_ibfk_1` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`id`);

--
-- Constraints for table `employees`
--
ALTER TABLE `employees`
  ADD CONSTRAINT `employees_ibfk_1` FOREIGN KEY (`designation_id`) REFERENCES `designation` (`designation_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

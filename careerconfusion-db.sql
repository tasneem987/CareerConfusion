-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 18, 2026 at 08:04 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `careerconfusion-db`
--

-- --------------------------------------------------------

--
-- Table structure for table `answer`
--

CREATE TABLE `answer` (
  `answer_id` int(11) NOT NULL,
  `test_id` int(11) DEFAULT NULL,
  `question_id` int(11) DEFAULT NULL,
  `answer_value` varchar(255) DEFAULT NULL,
  `score` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `answer`
--

INSERT INTO `answer` (`answer_id`, `test_id`, `question_id`, `answer_value`, `score`) VALUES
(117, 31, 1, '104', 0),
(118, 31, 2, '108', 0),
(119, 31, 3, '112', 0),
(120, 31, 4, '116', 0),
(121, 31, 5, '120', 0),
(122, 31, 6, '124', 0),
(123, 31, 7, '128', 0),
(124, 31, 8, '132', 0),
(125, 32, 1, '104', 0),
(126, 32, 2, '108', 0),
(127, 32, 3, '112', 0),
(128, 32, 4, '116', 0),
(129, 32, 5, '120', 0),
(130, 32, 6, '124', 0),
(131, 32, 7, '128', 0),
(132, 32, 8, '132', 0),
(133, 33, 1, '104', 0),
(134, 33, 2, '108', 0),
(135, 33, 3, '112', 0),
(136, 33, 4, '116', 0),
(137, 33, 5, '120', 0),
(138, 33, 6, '124', 0),
(139, 33, 7, '128', 0),
(140, 33, 8, '132', 0),
(141, 34, 1, '104', 0),
(142, 34, 2, '108', 0),
(143, 34, 3, '112', 0),
(144, 34, 4, '116', 0),
(145, 34, 5, '120', 0),
(146, 34, 6, '124', 0),
(147, 34, 7, '128', 0),
(148, 34, 8, '132', 0),
(149, 35, 1, '104', 0),
(150, 35, 2, '108', 0),
(151, 35, 3, '112', 0),
(152, 35, 4, '116', 0),
(153, 35, 5, '120', 0),
(154, 35, 6, '124', 0),
(155, 35, 7, '128', 0),
(156, 35, 8, '132', 0),
(157, 36, 1, '103', 0),
(158, 36, 2, '107', 0),
(159, 36, 3, '111', 0),
(160, 36, 4, '115', 0),
(161, 36, 5, '119', 0),
(162, 36, 6, '123', 0),
(163, 36, 7, '127', 0),
(164, 36, 8, '131', 0),
(165, 37, 1, '101', 0),
(166, 37, 2, '105', 0),
(167, 37, 3, '109', 0),
(168, 37, 4, '113', 0),
(169, 37, 5, '117', 0),
(170, 37, 6, '121', 0),
(171, 37, 7, '125', 0),
(172, 37, 8, '129', 0),
(173, 38, 1, '104', 0),
(174, 38, 2, '108', 0),
(175, 38, 3, '112', 0),
(176, 38, 4, '116', 0),
(177, 38, 5, '120', 0),
(178, 38, 6, '124', 0),
(179, 38, 7, '128', 0),
(180, 38, 8, '132', 0),
(181, 39, 1, '103', 0),
(182, 39, 2, '107', 0),
(183, 39, 3, '110', 0),
(184, 39, 4, '113', 0),
(185, 39, 5, '117', 0),
(186, 39, 6, '122', 0),
(187, 39, 7, '126', 0),
(188, 39, 8, '130', 0),
(189, 40, 1, '104', 0),
(190, 40, 2, '108', 0),
(191, 40, 3, '112', 0),
(192, 40, 4, '116', 0),
(193, 40, 5, '120', 0),
(194, 40, 6, '124', 0),
(195, 40, 7, '128', 0),
(196, 40, 8, '132', 0),
(197, 41, 1, '104', 0),
(198, 41, 2, '107', 0),
(199, 41, 3, '112', 0),
(200, 41, 4, '116', 0),
(201, 41, 5, '119', 0),
(202, 41, 6, '124', 0),
(203, 41, 7, '127', 0),
(204, 41, 8, '132', 0),
(205, 42, 1, '101', 0),
(206, 42, 2, '106', 0),
(207, 42, 3, '109', 0),
(208, 42, 4, '113', 0),
(209, 42, 5, '117', 0),
(210, 42, 6, '122', 0),
(211, 42, 7, '125', 0),
(212, 42, 8, '130', 0),
(221, 44, 1, '190', 0),
(222, 44, 2, '107', 0),
(223, 44, 3, '110', 0),
(224, 44, 4, '114', 0),
(225, 44, 5, '118', 0),
(226, 44, 6, '122', 0),
(227, 44, 7, '126', 0),
(228, 44, 8, '130', 0),
(229, 44, 9, '136', 0),
(230, 44, 10, '140', 0),
(231, 44, 11, '144', 0),
(232, 44, 12, '148', 0),
(233, 44, 13, '152', 0),
(234, 44, 14, '156', 0),
(235, 44, 15, '160', 0),
(236, 44, 16, '164', 0),
(237, 44, 17, '168', 0),
(238, 44, 18, '172', 0),
(239, 44, 19, '176', 0),
(240, 44, 20, '180', 0),
(241, 45, 1, '187', 0),
(242, 45, 2, '105', 0),
(243, 45, 3, '109', 0),
(244, 45, 4, '113', 0),
(245, 45, 5, '117', 0),
(246, 45, 6, '122', 0),
(247, 45, 7, '126', 0),
(248, 45, 8, '130', 0),
(249, 45, 9, '135', 0),
(250, 45, 10, '139', 0),
(251, 45, 11, '143', 0),
(252, 45, 12, '148', 0),
(253, 45, 13, '152', 0),
(254, 45, 14, '156', 0),
(255, 45, 15, '160', 0),
(256, 45, 16, '164', 0),
(257, 45, 17, '168', 0),
(258, 45, 18, '172', 0),
(259, 45, 19, '176', 0),
(260, 45, 20, '180', 0),
(261, 46, 1, '190', 0),
(262, 46, 2, '108', 0),
(263, 46, 3, '111', 0),
(264, 46, 4, '116', 0),
(265, 46, 5, '119', 0),
(266, 46, 6, '124', 0),
(267, 46, 7, '128', 0),
(268, 46, 8, '132', 0),
(269, 46, 9, '138', 0),
(270, 46, 10, '142', 0),
(271, 46, 11, '146', 0),
(272, 46, 12, '150', 0),
(273, 46, 13, '153', 0),
(274, 46, 14, '157', 0),
(275, 46, 15, '161', 0),
(276, 46, 16, '165', 0),
(277, 46, 17, '169', 0),
(278, 46, 18, '173', 0),
(279, 46, 19, '176', 0),
(280, 46, 20, '181', 0);

-- --------------------------------------------------------

--
-- Table structure for table `career`
--

CREATE TABLE `career` (
  `career_id` int(11) NOT NULL,
  `career_name` varchar(150) DEFAULT NULL,
  `description` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

CREATE TABLE `comments` (
  `comment_id` int(11) NOT NULL,
  `post_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `content` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `likes`
--

CREATE TABLE `likes` (
  `like_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `post_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `major`
--

CREATE TABLE `major` (
  `major_id` int(11) NOT NULL,
  `major_name` varchar(150) NOT NULL,
  `description` text DEFAULT NULL,
  `required_skills` text DEFAULT NULL,
  `skills` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`skills`)),
  `careers` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`careers`)),
  `study_plan` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`study_plan`)),
  `cost` varchar(100) DEFAULT NULL,
  `salary_lebanon` varchar(100) DEFAULT NULL,
  `salary_abroad` varchar(100) DEFAULT NULL,
  `education_required` text DEFAULT NULL,
  `category` varchar(100) DEFAULT NULL,
  `years` varchar(10) DEFAULT NULL,
  `demand` int(11) DEFAULT NULL,
  `icon` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `major`
--

INSERT INTO `major` (`major_id`, `major_name`, `description`, `required_skills`, `skills`, `careers`, `study_plan`, `cost`, `salary_lebanon`, `salary_abroad`, `education_required`, `category`, `years`, `demand`, `icon`) VALUES
(1, 'Computer Science', 'Programming, AI, and software development', 'Programming, Problem Solving, Algorithms, Logic', '[\"Programming\", \"Problem Solving\", \"Algorithms\", \"Data Structures\", \"Logic\"]', '[\"Software Developer\", \"AI Engineer\", \"Systems Analyst\", \"Web Developer\", \"Database Administrator\"]', '[\"Programming Fundamentals\", \"Data Structures\", \"Algorithms\", \"Operating Systems\", \"Databases\", \"Software Engineering\", \"AI Basics\"]', '$8,000 - $15,000 per year', 'LL 25,000,000 - LL 60,000,000 per month', '$60,000 - $150,000 per year', 'High School Diploma', 'Technology', '3-4', 95, '💻'),
(2, 'Data Science', 'Analyze data and build models', 'Statistics, Python, Data Analysis, Machine Learning', '[\"Statistics\", \"Python\", \"Data Analysis\", \"Machine Learning\", \"SQL\"]', '[\"Data Analyst\", \"Data Scientist\", \"Business Intelligence Analyst\", \"Machine Learning Engineer\"]', '[\"Statistics I & II\", \"Python for Data Science\", \"Machine Learning\", \"Data Visualization\", \"Big Data Technologies\", \"SQL\"]', '$9,000 - $16,000 per year', 'LL 30,000,000 - LL 70,000,000 per month', '$70,000 - $160,000 per year', 'High School Diploma', 'Technology', '3-4', 90, '📈'),
(3, 'Cybersecurity', 'Protect systems and networks', 'Networking, Ethical Hacking, Risk Analysis, Security Tools', '[\"Networking\", \"Ethical Hacking\", \"Risk Analysis\", \"Security Tools\", \"Cryptography\"]', '[\"Cybersecurity Analyst\", \"Ethical Hacker\", \"Security Consultant\", \"Network Security Engineer\"]', '[\"Network Security\", \"Cryptography\", \"Ethical Hacking\", \"Digital Forensics\", \"Risk Management\", \"Security Policies\"]', '$8,500 - $15,500 per year', 'LL 28,000,000 - LL 65,000,000 per month', '$65,000 - $140,000 per year', 'High School Diploma', 'Technology', '3-4', 92, '🔐'),
(4, 'Software Engineering', 'Build large-scale applications', 'Coding, System Design, Debugging, Teamwork', '[\"Coding\", \"System Design\", \"Debugging\", \"Teamwork\", \"Software Architecture\"]', '[\"Software Engineer\", \"DevOps Engineer\", \"Mobile App Developer\", \"QA Engineer\", \"Tech Lead\"]', '[\"Object-Oriented Programming\", \"Software Architecture\", \"Web Development\", \"Mobile Development\", \"Testing & QA\", \"Agile Methodologies\"]', '$8,000 - $15,000 per year', 'LL 25,000,000 - LL 60,000,000 per month', '$65,000 - $150,000 per year', 'High School Diploma', 'Technology', '3-4', 94, '🧑‍💻'),
(5, 'Information Technology', 'Manage IT systems', 'IT Support, Networking, Troubleshooting', '[\"IT Support\", \"Networking\", \"Troubleshooting\", \"System Administration\", \"Cloud Basics\"]', '[\"IT Support Specialist\", \"Network Administrator\", \"System Administrator\", \"IT Manager\"]', '[\"IT Fundamentals\", \"Networking\", \"System Administration\", \"Cloud Computing\", \"Cybersecurity Basics\", \"IT Project Management\"]', '$7,000 - $13,000 per year', 'LL 18,000,000 - LL 40,000,000 per month', '$50,000 - $100,000 per year', 'High School Diploma', 'Technology', '3-4', 85, '🖥️'),
(6, 'Artificial Intelligence', 'Develop intelligent systems', 'Machine Learning, Python, Math, Critical Thinking', '[\"Machine Learning\", \"Python\", \"Math\", \"Critical Thinking\", \"Deep Learning\"]', '[\"AI Engineer\", \"Machine Learning Engineer\", \"NLP Scientist\", \"Computer Vision Engineer\"]', '[\"Machine Learning\", \"Deep Learning\", \"Natural Language Processing\", \"Computer Vision\", \"AI Ethics\", \"Reinforcement Learning\"]', '$9,500 - $17,000 per year', 'LL 35,000,000 - LL 80,000,000 per month', '$80,000 - $180,000 per year', 'High School Diploma', 'Technology', '3-4', 96, '🤖'),
(7, 'Game Development', 'Create video games', 'Programming, Game Design, Creativity', '[\"Programming\", \"Game Design\", \"Creativity\", \"3D Modeling\", \"Storytelling\"]', '[\"Game Developer\", \"Game Designer\", \"Level Designer\", \"3D Artist\", \"QA Tester\"]', '[\"Game Design Principles\", \"Unity/Unreal Engine\", \"3D Modeling\", \"Animation\", \"Game Physics\", \"Storytelling for Games\"]', '$9,000 - $18,000 per year', 'LL 20,000,000 - LL 50,000,000 per month', '$50,000 - $120,000 per year', 'High School Diploma', 'Technology', '3-4', 80, '🎮'),
(8, 'Cloud Computing', 'Work with cloud systems', 'Cloud Platforms, DevOps, Networking', '[\"Cloud Platforms (AWS/Azure)\", \"DevOps\", \"Networking\", \"Virtualization\", \"Security\"]', '[\"Cloud Architect\", \"Cloud Engineer\", \"DevOps Engineer\", \"Site Reliability Engineer\"]', '[\"Cloud Infrastructure\", \"AWS/Azure Services\", \"DevOps Tools\", \"Containerization\", \"Serverless Computing\", \"Cloud Security\"]', '$8,000 - $14,000 per year', 'LL 22,000,000 - LL 55,000,000 per month', '$70,000 - $150,000 per year', 'High School Diploma', 'Technology', '3-4', 88, '☁️'),
(9, 'Business Administration', 'Management and business operations', 'Leadership, Communication, Management, Decision-Making', '[\"Leadership\", \"Communication\", \"Management\", \"Decision-Making\", \"Strategic Planning\"]', '[\"Business Analyst\", \"Project Manager\", \"Operations Manager\", \"Entrepreneur\", \"Consultant\"]', '[\"Principles of Management\", \"Marketing\", \"Finance\", \"Organizational Behavior\", \"Strategic Management\", \"Business Law\"]', '$7,000 - $14,000 per year', 'LL 20,000,000 - LL 50,000,000 per month', '$50,000 - $120,000 per year', 'High School Diploma', 'Business', '3-4', 80, '📊'),
(10, 'Marketing', 'Promote products and brands', 'Creativity, Communication, Market Research', '[\"Creativity\", \"Communication\", \"Market Research\", \"Digital Marketing\", \"Analytics\"]', '[\"Marketing Manager\", \"Social Media Manager\", \"SEO Specialist\", \"Brand Manager\", \"Market Researcher\"]', '[\"Marketing Principles\", \"Consumer Behavior\", \"Digital Marketing\", \"Brand Management\", \"Market Research\", \"Advertising\"]', '$6,500 - $12,000 per year', 'LL 18,000,000 - LL 45,000,000 per month', '$45,000 - $100,000 per year', 'High School Diploma', 'Business', '3-4', 78, '📣'),
(11, 'Finance', 'Manage money and investments', 'Math, Analytical Thinking, Financial Analysis', '[\"Math\", \"Analytical Thinking\", \"Financial Analysis\", \"Excel\", \"Risk Management\"]', '[\"Financial Analyst\", \"Investment Banker\", \"Accountant\", \"Portfolio Manager\", \"Risk Analyst\"]', '[\"Financial Accounting\", \"Corporate Finance\", \"Investments\", \"Financial Markets\", \"Risk Management\", \"Financial Modeling\"]', '$8,000 - $15,000 per year', 'LL 25,000,000 - LL 60,000,000 per month', '$60,000 - $150,000 per year', 'High School Diploma', 'Business', '3-4', 85, '💰'),
(12, 'Accounting', 'Financial records and auditing', 'Attention to Detail, Math, Organization', '[\"Attention to Detail\", \"Math\", \"Organization\", \"Accounting Software\", \"Regulations\"]', '[\"Accountant\", \"Auditor\", \"Tax Consultant\", \"Forensic Accountant\", \"Controller\"]', '[\"Financial Accounting\", \"Managerial Accounting\", \"Auditing\", \"Taxation\", \"Accounting Information Systems\", \"Ethics\"]', '$6,500 - $12,000 per year', 'LL 18,000,000 - LL 40,000,000 per month', '$45,000 - $90,000 per year', 'High School Diploma', 'Business', '3-4', 75, '📚'),
(13, 'Entrepreneurship', 'Start and manage businesses', 'Creativity, Risk Management, Leadership', '[\"Creativity\", \"Risk Management\", \"Leadership\", \"Networking\", \"Business Planning\"]', '[\"Entrepreneur\", \"Startup Founder\", \"Business Consultant\", \"Venture Capital Analyst\"]', '[\"Entrepreneurial Mindset\", \"Business Model Canvas\", \"Lean Startup\", \"Venture Financing\", \"Pitching\", \"Growth Strategies\"]', '$7,000 - $13,000 per year', 'Variable (self-employed)', 'Variable (self-employed)', 'High School Diploma', 'Business', '3-4', 82, '🚀'),
(14, 'Civil Engineering', 'Infrastructure and construction', 'Math, Physics, Problem Solving, Design', '[\"Math\", \"Physics\", \"Problem Solving\", \"Design\", \"Project Management\"]', '[\"Civil Engineer\", \"Structural Engineer\", \"Construction Manager\", \"Transportation Engineer\"]', '[\"Statics\", \"Dynamics\", \"Mechanics of Materials\", \"Structural Analysis\", \"Geotechnical Engineering\", \"Transportation Engineering\"]', '$9,000 - $16,000 per year', 'LL 20,000,000 - LL 45,000,000 per month', '$55,000 - $110,000 per year', 'High School Diploma', 'Engineering', '4-5', 70, '🏗️'),
(15, 'Mechanical Engineering', 'Machines and mechanics', 'Mechanics, Math, Technical Skills', '[\"Mechanics\", \"Math\", \"Technical Skills\", \"CAD\", \"Thermodynamics\"]', '[\"Mechanical Engineer\", \"Automotive Engineer\", \"HVAC Engineer\", \"Manufacturing Engineer\"]', '[\"Thermodynamics\", \"Fluid Mechanics\", \"Machine Design\", \"Manufacturing Processes\", \"CAD/CAM\", \"Control Systems\"]', '$9,000 - $16,000 per year', 'LL 22,000,000 - LL 50,000,000 per month', '$60,000 - $120,000 per year', 'High School Diploma', 'Engineering', '4-5', 85, '⚙️'),
(16, 'Electrical Engineering', 'Electric systems and circuits', 'Circuits, Math, Problem Solving', '[\"Circuits\", \"Math\", \"Problem Solving\", \"Electronics\", \"Signal Processing\"]', '[\"Electrical Engineer\", \"Electronics Engineer\", \"Power Systems Engineer\", \"Control Systems Engineer\"]', '[\"Circuit Analysis\", \"Electronics\", \"Digital Logic Design\", \"Signals and Systems\", \"Power Systems\", \"Electromagnetics\"]', '$9,000 - $16,000 per year', 'LL 22,000,000 - LL 55,000,000 per month', '$60,000 - $125,000 per year', 'High School Diploma', 'Engineering', '4-5', 88, '🔌'),
(17, 'Industrial Engineering', 'Optimize processes', 'Optimization, Analytics, Process Management', '[\"Optimization\", \"Analytics\", \"Process Management\", \"Supply Chain\", \"Lean Six Sigma\"]', '[\"Industrial Engineer\", \"Process Engineer\", \"Supply Chain Manager\", \"Quality Assurance Manager\"]', '[\"Operations Research\", \"Supply Chain Management\", \"Quality Control\", \"Simulation\", \"Facility Planning\", \"Lean Manufacturing\"]', '$8,500 - $15,000 per year', 'LL 20,000,000 - LL 48,000,000 per month', '$55,000 - $110,000 per year', 'High School Diploma', 'Engineering', '4-5', 78, '🏭'),
(18, 'Architecture', 'Design buildings', 'Design, Creativity, Drawing, Visualization', '[\"Design\", \"Creativity\", \"Drawing\", \"Visualization\", \"Building Codes\"]', '[\"Architect\", \"Urban Designer\", \"Interior Architect\", \"Landscape Architect\", \"BIM Specialist\"]', '[\"Architectural Design Studio\", \"History of Architecture\", \"Building Technology\", \"Structures\", \"Environmental Systems\", \"Urban Design\"]', '$10,000 - $18,000 per year', 'LL 25,000,000 - LL 60,000,000 per month', '$55,000 - $100,000 per year', 'High School Diploma', 'Engineering', '5', 82, '🏛️'),
(19, 'Medicine', 'Study diseases and treatments', 'Biology, Patience, Communication, Critical Thinking', '[\"Biology\", \"Patience\", \"Communication\", \"Critical Thinking\", \"Diagnostic Skills\"]', '[\"Doctor\", \"Surgeon\", \"Medical Researcher\", \"Specialist Physician\", \"Medical Consultant\"]', '[\"Anatomy\", \"Physiology\", \"Biochemistry\", \"Pathology\", \"Pharmacology\", \"Clinical Rotations\", \"Medical Ethics\"]', '$20,000 - $35,000 per year', 'LL 50,000,000 - LL 120,000,000+ per month', '$150,000 - $350,000+ per year', 'High School (Science) + Medical School', 'Health', '6-7', 88, '🩺'),
(20, 'Nursing', 'Patient care and healthcare support', 'Caregiving, Communication, Responsibility', '[\"Caregiving\", \"Communication\", \"Responsibility\", \"Empathy\", \"Clinical Skills\"]', '[\"Registered Nurse\", \"Nurse Practitioner\", \"Clinical Nurse Specialist\", \"Nurse Educator\"]', '[\"Anatomy & Physiology\", \"Fundamentals of Nursing\", \"Pharmacology\", \"Medical-Surgical Nursing\", \"Pediatric Nursing\", \"Mental Health Nursing\"]', '$6,000 - $12,000 per year', 'LL 15,000,000 - LL 35,000,000 per month', '$50,000 - $90,000 per year', 'High School Diploma', 'Health', '3-4', 92, '🏥'),
(21, 'Pharmacy', 'Medications and drugs', 'Chemistry, Attention to Detail, Accuracy', '[\"Chemistry\", \"Attention to Detail\", \"Accuracy\", \"Pharmacology\", \"Patient Counseling\"]', '[\"Pharmacist\", \"Clinical Pharmacist\", \"Pharmacy Manager\", \"Pharmaceutical Researcher\"]', '[\"Pharmaceutical Chemistry\", \"Pharmacology\", \"Pharmaceutics\", \"Clinical Pharmacy\", \"Pharmacy Law\", \"Patient Care\"]', '$15,000 - $25,000 per year', 'LL 30,000,000 - LL 70,000,000 per month', '$80,000 - $140,000 per year', 'High School (Science) + Pharmacy Degree', 'Health', '5', 75, '💊'),
(22, 'Dentistry', 'Oral health and teeth', 'Precision, Hand Skills, Patient Care', '[\"Precision\", \"Hand Skills\", \"Patient Care\", \"Diagnosis\", \"Manual Dexterity\"]', '[\"Dentist\", \"Orthodontist\", \"Oral Surgeon\", \"Dental Hygienist\", \"Endodontist\"]', '[\"Oral Anatomy\", \"Dental Materials\", \"Operative Dentistry\", \"Oral Surgery\", \"Orthodontics\", \"Periodontics\"]', '$18,000 - $30,000 per year', 'LL 40,000,000 - LL 100,000,000+ per month', '$120,000 - $250,000+ per year', 'High School (Science) + Dental School', 'Health', '5', 85, '🦷'),
(23, 'Public Health', 'Community health systems', 'Research, Communication, Data Analysis', '[\"Research\", \"Communication\", \"Data Analysis\", \"Epidemiology\", \"Policy\"]', '[\"Public Health Officer\", \"Epidemiologist\", \"Health Policy Analyst\", \"Community Health Worker\"]', '[\"Epidemiology\", \"Biostatistics\", \"Health Policy\", \"Environmental Health\", \"Global Health\", \"Health Promotion\"]', '$7,000 - $13,000 per year', 'LL 18,000,000 - LL 40,000,000 per month', '$50,000 - $90,000 per year', 'High School Diploma', 'Health', '3-4', 78, '🌍'),
(24, 'Nutrition', 'Food and health science', 'Biology, Communication, Health Knowledge', '[\"Biology\", \"Communication\", \"Health Knowledge\", \"Diet Planning\", \"Counseling\"]', '[\"Nutritionist\", \"Dietitian\", \"Health Coach\", \"Food Scientist\", \"Wellness Consultant\"]', '[\"Human Nutrition\", \"Biochemistry\", \"Dietetics\", \"Community Nutrition\", \"Clinical Nutrition\", \"Food Science\"]', '$6,000 - $11,000 per year', 'LL 12,000,000 - LL 25,000,000 per month', '$40,000 - $70,000 per year', 'High School Diploma', 'Health', '3-4', 70, '🥗'),
(25, 'Graphic Design', 'Visual design and branding', 'Creativity, Adobe Tools, Design Thinking', '[\"Creativity\", \"Adobe Tools\", \"Design Thinking\", \"Typography\", \"Color Theory\"]', '[\"Graphic Designer\", \"UI/UX Designer\", \"Art Director\", \"Brand Designer\", \"Illustrator\"]', '[\"Design Fundamentals\", \"Typography\", \"Digital Imaging\", \"Brand Identity\", \"UI/UX Design\", \"Motion Graphics\"]', '$7,000 - $14,000 per year', 'LL 15,000,000 - LL 40,000,000 per month', '$40,000 - $85,000 per year', 'High School Diploma', 'Arts & Design', '3-4', 65, '🎨'),
(26, 'Interior Design', 'Design indoor spaces', 'Creativity, Space Planning, Aesthetics', '[\"Creativity\", \"Space Planning\", \"Aesthetics\", \"CAD\", \"Client Management\"]', '[\"Interior Designer\", \"Space Planner\", \"Exhibition Designer\", \"Set Designer\"]', '[\"Design Studio\", \"Space Planning\", \"Materials and Finishes\", \"Lighting Design\", \"CAD for Interiors\", \"History of Interiors\"]', '$7,500 - $14,500 per year', 'LL 18,000,000 - LL 45,000,000 per month', '$45,000 - $85,000 per year', 'High School Diploma', 'Arts & Design', '3-4', 72, '🛋️'),
(27, 'Fashion Design', 'Clothing and fashion', 'Creativity, Sewing, Trend Awareness', '[\"Creativity\", \"Sewing\", \"Trend Awareness\", \"Pattern Making\", \"Textile Knowledge\"]', '[\"Fashion Designer\", \"Textile Designer\", \"Costume Designer\", \"Merchandiser\", \"Stylist\"]', '[\"Fashion Illustration\", \"Pattern Making\", \"Textile Science\", \"Garment Construction\", \"Fashion History\", \"Collection Development\"]', '$8,000 - $16,000 per year', 'LL 15,000,000 - LL 40,000,000 per month', '$40,000 - $90,000 per year', 'High School Diploma', 'Arts & Design', '3-4', 68, '👗'),
(28, 'Animation', 'Create animations and media', 'Creativity, Animation Tools, Storytelling', '[\"Creativity\", \"Animation Tools (Maya/Blender)\", \"Storytelling\", \"Drawing\", \"Motion\"]', '[\"Animator\", \"3D Modeler\", \"VFX Artist\", \"Character Designer\", \"Storyboard Artist\"]', '[\"2D Animation\", \"3D Modeling\", \"Character Design\", \"Storyboarding\", \"Visual Effects\", \"Rigging\"]', '$9,000 - $17,000 per year', 'LL 18,000,000 - LL 50,000,000 per month', '$50,000 - $100,000 per year', 'High School Diploma', 'Arts & Design', '3-4', 75, '🎬'),
(29, 'Photography', 'Professional photography', 'Camera Skills, Creativity, Editing', '[\"Camera Skills\", \"Creativity\", \"Editing (Photoshop/Lightroom)\", \"Lighting\", \"Composition\"]', '[\"Photographer\", \"Photo Editor\", \"Videographer\", \"Photojournalist\", \"Commercial Photographer\"]', '[\"Photography Techniques\", \"Lighting\", \"Digital Editing\", \"Composition\", \"Photojournalism\", \"Studio Photography\"]', '$6,000 - $12,000 per year', 'LL 12,000,000 - LL 35,000,000 per month', '$35,000 - $75,000 per year', 'High School Diploma', 'Arts & Design', '3-4', 60, '📷'),
(30, 'Psychology', 'Study human behavior', 'Communication, Empathy, Analysis', '[\"Communication\", \"Empathy\", \"Analysis\", \"Research Methods\", \"Active Listening\"]', '[\"Psychologist\", \"Counselor\", \"Therapist\", \"Human Resources Specialist\", \"Researcher\"]', '[\"Introduction to Psychology\", \"Cognitive Psychology\", \"Developmental Psychology\", \"Abnormal Psychology\", \"Research Methods\", \"Social Psychology\"]', '$7,000 - $14,000 per year', 'LL 18,000,000 - LL 45,000,000 per month', '$50,000 - $100,000 per year', 'High School Diploma', 'Humanities', '3-4', 85, '🧠'),
(31, 'Sociology', 'Study society and relationships', 'Research, Critical Thinking, Observation', '[\"Research\", \"Critical Thinking\", \"Observation\", \"Data Analysis\", \"Writing\"]', '[\"Sociologist\", \"Social Researcher\", \"Policy Analyst\", \"Community Organizer\", \"Market Researcher\"]', '[\"Sociological Theory\", \"Research Methods\", \"Social Stratification\", \"Race and Ethnicity\", \"Gender Studies\", \"Globalization\"]', '$6,500 - $12,000 per year', 'LL 15,000,000 - LL 35,000,000 per month', '$45,000 - $80,000 per year', 'High School Diploma', 'Humanities', '3-4', 70, '👥'),
(32, 'Political Science', 'Politics and government', 'Analysis, Debate, Research', '[\"Analysis\", \"Debate\", \"Research\", \"Writing\", \"Policy Understanding\"]', '[\"Political Analyst\", \"Diplomat\", \"Lobbyist\", \"Policy Advisor\", \"Campaign Manager\"]', '[\"Political Theory\", \"Comparative Politics\", \"International Relations\", \"Public Policy\", \"Research Methods\", \"Political Economy\"]', '$7,000 - $13,000 per year', 'LL 20,000,000 - LL 50,000,000 per month', '$50,000 - $110,000 per year', 'High School Diploma', 'Humanities', '3-4', 75, '🏛️'),
(33, 'Law', 'Legal systems and justice', 'Critical Thinking, Argumentation, Reading', '[\"Critical Thinking\", \"Argumentation\", \"Reading\", \"Legal Research\", \"Writing\"]', '[\"Lawyer\", \"Judge\", \"Legal Consultant\", \"Corporate Counsel\", \"Public Prosecutor\"]', '[\"Constitutional Law\", \"Contracts\", \"Torts\", \"Criminal Law\", \"Civil Procedure\", \"Legal Research and Writing\"]', '$12,000 - $22,000 per year', 'LL 40,000,000 - LL 100,000,000+ per month', '$80,000 - $200,000+ per year', 'High School + Law Degree', 'Humanities', '4-5', 90, '⚖️'),
(34, 'International Relations', 'Global relations', 'Communication, Analysis, Global Awareness', '[\"Communication\", \"Analysis\", \"Global Awareness\", \"Foreign Language\", \"Negotiation\"]', '[\"Diplomat\", \"International Development Specialist\", \"Foreign Affairs Analyst\", \"NGO Worker\"]', '[\"International Relations Theory\", \"Global Governance\", \"Foreign Policy Analysis\", \"International Law\", \"Diplomacy\", \"Area Studies\"]', '$8,000 - $15,000 per year', 'LL 25,000,000 - LL 60,000,000 per month', '$55,000 - $120,000 per year', 'High School Diploma', 'Humanities', '3-4', 80, '🌐'),
(35, 'Biology', 'Study living organisms', 'Research, Observation, Lab Skills', '[\"Research\", \"Observation\", \"Lab Skills\", \"Data Analysis\", \"Scientific Writing\"]', '[\"Biologist\", \"Research Scientist\", \"Lab Technician\", \"Environmental Consultant\", \"Biotech Specialist\"]', '[\"Cell Biology\", \"Genetics\", \"Ecology\", \"Evolution\", \"Molecular Biology\", \"Physiology\"]', '$7,000 - $13,000 per year', 'LL 15,000,000 - LL 35,000,000 per month', '$45,000 - $85,000 per year', 'High School Diploma', 'Science', '3-4', 78, '🧬'),
(36, 'Chemistry', 'Study substances and reactions', 'Lab Work, Analysis, Precision', '[\"Lab Work\", \"Analysis\", \"Precision\", \"Safety Protocols\", \"Instrumentation\"]', '[\"Chemist\", \"Lab Analyst\", \"Pharmaceutical Scientist\", \"Quality Control Specialist\", \"Forensic Chemist\"]', '[\"General Chemistry\", \"Organic Chemistry\", \"Physical Chemistry\", \"Analytical Chemistry\", \"Inorganic Chemistry\", \"Biochemistry\"]', '$7,000 - $13,000 per year', 'LL 15,000,000 - LL 35,000,000 per month', '$45,000 - $85,000 per year', 'High School Diploma', 'Science', '3-4', 75, '⚗️'),
(37, 'Physics', 'Study matter and energy', 'Math, Problem Solving, Logic', '[\"Math\", \"Problem Solving\", \"Logic\", \"Experimentation\", \"Modeling\"]', '[\"Physicist\", \"Research Scientist\", \"Data Analyst\", \"Engineer\", \"Astronomer\"]', '[\"Classical Mechanics\", \"Electromagnetism\", \"Quantum Mechanics\", \"Thermodynamics\", \"Optics\", \"Modern Physics\"]', '$7,500 - $14,000 per year', 'LL 18,000,000 - LL 40,000,000 per month', '$50,000 - $100,000 per year', 'High School Diploma', 'Science', '3-4', 80, '🌌'),
(38, 'Mathematics', 'Advanced math and theory', 'Logical Thinking, Problem Solving', '[\"Logical Thinking\", \"Problem Solving\", \"Abstract Reasoning\", \"Proofs\", \"Algorithms\"]', '[\"Mathematician\", \"Statistician\", \"Actuary\", \"Data Scientist\", \"Cryptographer\"]', '[\"Calculus I-III\", \"Linear Algebra\", \"Differential Equations\", \"Real Analysis\", \"Abstract Algebra\", \"Probability\"]', '$6,500 - $12,000 per year', 'LL 18,000,000 - LL 40,000,000 per month', '$50,000 - $100,000 per year', 'High School Diploma', 'Science', '3-4', 82, '➗'),
(39, 'Education', 'Teaching and pedagogy', 'Communication, Patience, Teaching', '[\"Communication\", \"Patience\", \"Teaching\", \"Curriculum Design\", \"Classroom Management\"]', '[\"Teacher\", \"Professor\", \"Curriculum Developer\", \"Education Consultant\", \"School Administrator\"]', '[\"Foundations of Education\", \"Educational Psychology\", \"Curriculum Design\", \"Teaching Methods\", \"Assessment\", \"Classroom Management\"]', '$5,000 - $10,000 per year', 'LL 12,000,000 - LL 25,000,000 per month', '$35,000 - $70,000 per year', 'High School Diploma', 'Education', '3-4', 70, '📖'),
(40, 'Early Childhood Education', 'Teach young children', 'Patience, Creativity, Child Care', '[\"Patience\", \"Creativity\", \"Child Care\", \"Early Development\", \"Communication\"]', '[\"Preschool Teacher\", \"Childcare Director\", \"Early Intervention Specialist\", \"Family Support Worker\"]', '[\"Child Development\", \"Early Childhood Curriculum\", \"Play-Based Learning\", \"Family Engagement\", \"Special Needs\", \"Observation\"]', '$5,000 - $9,000 per year', 'LL 10,000,000 - LL 20,000,000 per month', '$30,000 - $55,000 per year', 'High School Diploma', 'Education', '3-4', 72, '🧸'),
(41, 'Journalism', 'News and reporting', 'Writing, Research, Communication', '[\"Writing\", \"Research\", \"Communication\", \"Interviewing\", \"Ethics\"]', '[\"Journalist\", \"Reporter\", \"Editor\", \"Content Writer\", \"Broadcast Journalist\"]', '[\"News Writing\", \"Reporting\", \"Media Ethics\", \"Multimedia Journalism\", \"Investigative Journalism\", \"Broadcast Journalism\"]', '$6,500 - $12,000 per year', 'LL 12,000,000 - LL 30,000,000 per month', '$35,000 - $80,000 per year', 'High School Diploma', 'Media', '3-4', 65, '📰'),
(42, 'Media Studies', 'Media and communication', 'Analysis, Communication, Creativity', '[\"Analysis\", \"Communication\", \"Creativity\", \"Media Literacy\", \"Content Creation\"]', '[\"Media Planner\", \"Social Media Manager\", \"Content Strategist\", \"Public Relations Specialist\"]', '[\"Media Theory\", \"Communication Research\", \"Digital Media Production\", \"Media Law\", \"Audience Analysis\", \"Public Relations\"]', '$6,500 - $12,000 per year', 'LL 15,000,000 - LL 35,000,000 per month', '$40,000 - $80,000 per year', 'High School Diploma', 'Media', '3-4', 70, '📺'),
(43, 'Film Production', 'Create films and videos', 'Creativity, Filming, Editing', '[\"Creativity\", \"Filming\", \"Editing\", \"Storyboarding\", \"Sound Design\"]', '[\"Film Director\", \"Producer\", \"Cinematographer\", \"Editor\", \"Screenwriter\"]', '[\"Film History\", \"Screenwriting\", \"Cinematography\", \"Editing\", \"Sound Design\", \"Directing\", \"Producing\"]', '$9,000 - $18,000 per year', 'LL 18,000,000 - LL 50,000,000 per month', '$45,000 - $110,000 per year', 'High School Diploma', 'Media', '3-4', 75, '🎥'),
(44, 'Environmental Science', 'Study of environment and solutions to environmental problems', 'Research, Data Analysis, Biology, Chemistry', '[\"Research\", \"Data Analysis\", \"Biology\", \"Chemistry\", \"Fieldwork\"]', '[\"Environmental Scientist\", \"Conservation Scientist\", \"Sustainability Consultant\", \"Park Ranger\"]', '[\"Ecology\", \"Environmental Chemistry\", \"GIS\", \"Conservation Biology\", \"Environmental Policy\", \"Field Methods\"]', '$7,000 - $13,000 per year', 'LL 15,000,000 - LL 35,000,000 per month', '$45,000 - $85,000 per year', 'High School Diploma', 'Science', '3-4', 82, '🌱'),
(45, 'Hospitality Management', 'Manage hotels, restaurants, and tourism services', 'Communication, Customer Service, Management', '[\"Communication\", \"Customer Service\", \"Management\", \"Event Planning\", \"Problem Solving\"]', '[\"Hotel Manager\", \"Event Planner\", \"Restaurant Manager\", \"Tourism Officer\", \"Guest Services Manager\"]', '[\"Hospitality Operations\", \"Food and Beverage Management\", \"Lodging Management\", \"Event Management\", \"Marketing for Hospitality\"]', '$7,000 - $14,000 per year', 'LL 18,000,000 - LL 45,000,000 per month', '$40,000 - $80,000 per year', 'High School Diploma', 'Business', '3-4', 78, '🏨'),
(46, 'Sports Science', 'Science behind physical activity and performance', 'Biology, Fitness Knowledge, Coaching', '[\"Biology\", \"Fitness Knowledge\", \"Coaching\", \"Nutrition Basics\", \"Motivation\"]', '[\"Sports Coach\", \"Fitness Trainer\", \"Exercise Physiologist\", \"Athletic Director\", \"Sports Scientist\"]', '[\"Anatomy\", \"Exercise Physiology\", \"Biomechanics\", \"Sports Nutrition\", \"Coaching Theory\", \"Injury Prevention\"]', '$6,000 - $11,000 per year', 'LL 12,000,000 - LL 30,000,000 per month', '$35,000 - $75,000 per year', 'High School Diploma', 'Health', '3-4', 75, '⚽'),
(47, 'Veterinary Medicine', 'Animal health and medical care', 'Biology, Compassion, Problem Solving', '[\"Biology\", \"Compassion\", \"Problem Solving\", \"Surgical Skills\", \"Diagnosis\"]', '[\"Veterinarian\", \"Vet Technician\", \"Animal Surgeon\", \"Zoo Veterinarian\", \"Research Veterinarian\"]', '[\"Animal Anatomy\", \"Veterinary Pathology\", \"Pharmacology\", \"Surgery\", \"Diagnostic Imaging\", \"Animal Welfare\"]', '$18,000 - $30,000 per year', 'LL 35,000,000 - LL 80,000,000 per month', '$70,000 - $150,000 per year', 'High School + Vet School', 'Health', '5-6', 80, '🐾'),
(48, 'Aerospace Engineering', 'Design aircraft and spacecraft', 'Physics, Math, Problem Solving, Precision', '[\"Physics\", \"Math\", \"Problem Solving\", \"Precision\", \"Aerodynamics\"]', '[\"Aerospace Engineer\", \"Aircraft Designer\", \"Spacecraft Systems Engineer\", \"Flight Test Engineer\"]', '[\"Aerodynamics\", \"Propulsion\", \"Flight Mechanics\", \"Aerospace Structures\", \"Control Systems\", \"Spacecraft Design\"]', '$10,000 - $18,000 per year', 'LL 25,000,000 - LL 60,000,000 per month', '$70,000 - $140,000 per year', 'High School Diploma', 'Engineering', '4-5', 85, '🚀'),
(49, 'Biomedical Engineering', 'Combine engineering with medicine', 'Biology, Engineering, Problem Solving', '[\"Biology\", \"Engineering\", \"Problem Solving\", \"Biomechanics\", \"Medical Devices\"]', '[\"Biomedical Engineer\", \"Clinical Engineer\", \"Medical Device Designer\", \"Rehabilitation Engineer\"]', '[\"Biomechanics\", \"Biomaterials\", \"Medical Imaging\", \"Physiological Systems\", \"Bioinstrumentation\", \"Rehabilitation Engineering\"]', '$9,000 - $17,000 per year', 'LL 22,000,000 - LL 55,000,000 per month', '$60,000 - $120,000 per year', 'High School Diploma', 'Engineering', '4-5', 88, '🦾'),
(50, 'Linguistics', 'Scientific study of language', 'Analytical Thinking, Communication, Research', '[\"Analytical Thinking\", \"Communication\", \"Research\", \"Language Analysis\", \"Phonetics\"]', '[\"Linguist\", \"Translator\", \"Interpreter\", \"Speech Pathologist\", \"Language Teacher\"]', '[\"Phonetics\", \"Syntax\", \"Semantics\", \"Sociolinguistics\", \"Language Acquisition\", \"Field Methods\"]', '$6,500 - $12,000 per year', 'LL 15,000,000 - LL 35,000,000 per month', '$40,000 - $80,000 per year', 'High School Diploma', 'Humanities', '3-4', 68, '🗣️'),
(51, 'Urban Planning', 'Design and manage city development', 'Geography, Design, Policy Analysis', '[\"Geography\", \"Design\", \"Policy Analysis\", \"GIS\", \"Public Engagement\"]', '[\"Urban Planner\", \"City Planner\", \"Transportation Planner\", \"GIS Specialist\", \"Policy Planner\"]', '[\"Urban History\", \"Planning Theory\", \"Land Use Planning\", \"Transportation Planning\", \"GIS\", \"Environmental Planning\"]', '$8,000 - $15,000 per year', 'LL 20,000,000 - LL 45,000,000 per month', '$50,000 - $100,000 per year', 'High School Diploma', 'Engineering', '3-4', 76, '🏙️'),
(52, 'Music Production', 'Create and produce music', 'Creativity, Audio Software, Music Theory', '[\"Creativity\", \"Audio Software (Pro Tools/Logic)\", \"Music Theory\", \"Mixing\", \"Production\"]', '[\"Music Producer\", \"Sound Engineer\", \"Composer\", \"Audio Editor\", \"Studio Manager\"]', '[\"Music Theory\", \"Audio Recording\", \"Mixing and Mastering\", \"Digital Audio Workstations\", \"Music Business\", \"Sound Design\"]', '$7,000 - $15,000 per year', 'LL 15,000,000 - LL 40,000,000 per month', '$35,000 - $90,000 per year', 'High School Diploma', 'Arts & Design', '3-4', 70, '🎧'),
(53, 'Social Work', 'Help individuals and communities', 'Empathy, Communication, Problem Solving', '[\"Empathy\", \"Communication\", \"Problem Solving\", \"Case Management\", \"Crisis Intervention\"]', '[\"Social Worker\", \"Case Manager\", \"Counselor\", \"Community Outreach Coordinator\", \"Child Welfare Specialist\"]', '[\"Human Behavior and Social Environment\", \"Social Welfare Policy\", \"Social Work Practice\", \"Research Methods\", \"Field Practicum\"]', '$5,500 - $10,000 per year', 'LL 14,000,000 - LL 30,000,000 per month', '$35,000 - $70,000 per year', 'High School Diploma', 'Humanities', '3-4', 84, '🤝');

-- --------------------------------------------------------

--
-- Table structure for table `options`
--

CREATE TABLE `options` (
  `option_id` int(11) NOT NULL,
  `question_id` int(11) NOT NULL,
  `option_text` varchar(255) NOT NULL,
  `score` int(11) DEFAULT 0,
  `category` varchar(50) DEFAULT NULL,
  `tech_score` int(11) DEFAULT 0,
  `business_score` int(11) DEFAULT 0,
  `health_score` int(11) DEFAULT 0,
  `arts_score` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `options`
--

INSERT INTO `options` (`option_id`, `question_id`, `option_text`, `score`, `category`, `tech_score`, `business_score`, `health_score`, `arts_score`) VALUES
(105, 2, 'Building apps or systems', 0, NULL, 5, 1, 0, 1),
(106, 2, 'Managing projects or teams', 0, NULL, 1, 5, 1, 0),
(107, 2, 'Helping or caring for people', 0, NULL, 0, 1, 5, 1),
(108, 2, 'Drawing, designing, or creating', 0, NULL, 1, 0, 1, 5),
(109, 3, 'Innovation and discovery', 0, NULL, 5, 2, 0, 1),
(110, 3, 'Success and leadership', 0, NULL, 1, 5, 1, 0),
(111, 3, 'Helping others', 0, NULL, 0, 1, 5, 1),
(112, 3, 'Self-expression', 0, NULL, 1, 0, 1, 5),
(113, 4, 'Technical tasks', 0, NULL, 5, 1, 0, 1),
(114, 4, 'Decision making', 0, NULL, 1, 5, 1, 0),
(115, 4, 'Helping others', 0, NULL, 0, 1, 5, 1),
(116, 4, 'Creative tasks', 0, NULL, 1, 0, 1, 5),
(117, 5, 'Math / Programming', 0, NULL, 5, 1, 0, 0),
(118, 5, 'Business / Economics', 0, NULL, 1, 5, 1, 0),
(119, 5, 'Biology / Health', 0, NULL, 0, 1, 5, 0),
(120, 5, 'Art / Design', 0, NULL, 0, 0, 1, 5),
(121, 6, 'Logical thinking', 0, NULL, 5, 2, 0, 1),
(122, 6, 'Strategic thinking', 0, NULL, 1, 5, 1, 0),
(123, 6, 'Emotional thinking', 0, NULL, 0, 1, 5, 1),
(124, 6, 'Creative thinking', 0, NULL, 1, 0, 1, 5),
(125, 7, 'Office / tech environment', 0, NULL, 5, 2, 0, 1),
(126, 7, 'Corporate / business', 0, NULL, 1, 5, 1, 0),
(127, 7, 'Healthcare / community', 0, NULL, 0, 1, 5, 1),
(128, 7, 'Studio / creative', 0, NULL, 1, 0, 1, 5),
(129, 8, 'Problem solving', 0, NULL, 5, 2, 0, 1),
(130, 8, 'Leadership', 0, NULL, 1, 5, 1, 0),
(131, 8, 'Empathy', 0, NULL, 0, 1, 5, 1),
(132, 8, 'Creativity', 0, NULL, 1, 0, 1, 5),
(135, 9, 'I break it down into logical steps and research systematic solutions', 0, NULL, 5, 1, 0, 1),
(136, 9, 'I delegate tasks, set goals, and organise a plan of action', 0, NULL, 1, 5, 1, 0),
(137, 9, 'I talk to people who have faced it before and learn from their experience', 0, NULL, 0, 1, 5, 1),
(138, 9, 'I experiment freely, sketch ideas, and let creativity guide me', 0, NULL, 1, 0, 1, 5),
(139, 10, 'Coding, solving puzzles, or tinkering with gadgets', 0, NULL, 5, 1, 0, 1),
(140, 10, 'Analysing markets, stocks, or business case studies', 0, NULL, 1, 5, 1, 0),
(141, 10, 'Volunteering, helping a friend, or caring for animals', 0, NULL, 0, 1, 5, 1),
(142, 10, 'Drawing, writing, composing music, or designing something', 0, NULL, 1, 0, 1, 5),
(143, 11, 'Innovation, intellectual challenge, and building things', 0, NULL, 5, 1, 0, 1),
(144, 11, 'Success, financial reward, and leadership opportunities', 0, NULL, 1, 5, 1, 0),
(145, 11, 'Making a direct positive impact on people’s lives', 0, NULL, 0, 1, 5, 1),
(146, 11, 'Creative freedom and the chance to express myself', 0, NULL, 1, 0, 1, 5),
(147, 12, 'I work best with clear specifications and logical structures', 0, NULL, 5, 1, 0, 1),
(148, 12, 'I thrive on strategy, efficiency, and measurable results', 0, NULL, 1, 5, 1, 0),
(149, 12, 'I prefer a supportive, collaborative, people‑centred approach', 0, NULL, 0, 1, 5, 1),
(150, 12, 'I need flexibility, inspiration, and room to experiment', 0, NULL, 1, 0, 1, 5),
(151, 13, 'I debug the error, find the root cause, and fix it methodically', 0, NULL, 5, 1, 0, 1),
(152, 13, 'I assess what it costs, how to mitigate it, and move forward', 0, NULL, 1, 5, 1, 0),
(153, 13, 'I apologise if needed, seek feedback, and focus on making it right emotionally', 0, NULL, 0, 1, 5, 1),
(154, 13, 'I turn it into a creative opportunity, sometimes the mishap leads to something beautiful', 0, NULL, 1, 0, 1, 5),
(155, 14, 'Data, code, statistics, and structured technical reports', 0, NULL, 5, 1, 0, 1),
(156, 14, 'Financial figures, business plans, and market analysis', 0, NULL, 1, 5, 1, 0),
(157, 14, 'Patient histories, medical journals, and research on wellbeing', 0, NULL, 0, 1, 5, 1),
(158, 14, 'Visual storyboards, colour palettes, and emotional narratives', 0, NULL, 1, 0, 1, 5),
(159, 15, 'The analyst/tester who digs into details and solves hard technical problems', 0, NULL, 5, 1, 0, 1),
(160, 15, 'The project manager/organiser who keeps everyone on track and hits deadlines', 0, NULL, 1, 5, 1, 0),
(161, 15, 'The mediator/supporter who makes sure everyone feels heard and motivated', 0, NULL, 0, 1, 5, 1),
(162, 15, 'The idea generator/designer who brings fresh, original concepts to the table', 0, NULL, 1, 0, 1, 5),
(163, 16, 'Science & technology magazines, whitepapers, and developer blogs', 0, NULL, 5, 1, 0, 1),
(164, 16, 'Business journals, economic reports, and leadership books', 0, NULL, 1, 5, 1, 0),
(165, 16, 'Health & wellness articles, psychology blogs, and caring guides', 0, NULL, 0, 1, 5, 1),
(166, 16, 'Design portfolios, art books, poetry, and creative fiction', 0, NULL, 1, 0, 1, 5),
(167, 17, 'By doing hands‑on technical projects, tutorials, and coding labs', 0, NULL, 5, 1, 0, 1),
(168, 17, 'Through case studies, discussions, and real‑world business scenarios', 0, NULL, 1, 5, 1, 0),
(169, 17, 'By shadowing professionals, practicing on mannequins, or role‑playing', 0, NULL, 0, 1, 5, 1),
(170, 17, 'By experimenting, making mood boards, and following creative workshops', 0, NULL, 1, 0, 1, 5),
(171, 18, 'A powerful IDE, terminal, server configuration panel, or robotics kit', 0, NULL, 5, 1, 0, 1),
(172, 18, 'A financial dashboard, CRM software, or project management tool', 0, NULL, 1, 5, 1, 0),
(173, 18, 'A stethoscope, blood‑pressure cuff, or diagnostic medical equipment', 0, NULL, 0, 1, 5, 1),
(174, 18, 'A drawing tablet, camera, musical instrument, or sculpting tools', 0, NULL, 1, 0, 1, 5),
(175, 19, 'A quiet, well‑organised tech lab or personal desk with multiple monitors', 0, NULL, 5, 1, 0, 1),
(176, 19, 'A dynamic corporate office with glass walls and fast‑paced energy', 0, NULL, 1, 5, 1, 0),
(177, 19, 'A hospital, clinic, or community centre with a caring, team‑oriented feel', 0, NULL, 0, 1, 5, 1),
(178, 19, 'A bright, open studio or creative café with materials and inspiration everywhere', 0, NULL, 1, 0, 1, 5),
(179, 20, 'Solving a difficult technical problem that makes everything work', 0, NULL, 5, 1, 0, 1),
(180, 20, 'Seeing the final result’s impact on revenue, efficiency, or market share', 0, NULL, 1, 5, 1, 0),
(181, 20, 'Knowing I helped someone heal, learn, or feel better', 0, NULL, 0, 1, 5, 1),
(182, 20, 'Looking at a beautiful, original creation that evokes emotion or thought', 0, NULL, 1, 0, 1, 5),
(196, 1, 'Logical and technical problems', 0, NULL, 5, 1, 0, 1),
(197, 1, 'Organizing and planning tasks', 0, NULL, 1, 5, 1, 0),
(198, 1, 'Helping people with their issues', 0, NULL, 0, 1, 5, 1),
(199, 1, 'Creative and design challenges', 0, NULL, 1, 0, 1, 5);

-- --------------------------------------------------------

--
-- Table structure for table `posts`
--

CREATE TABLE `posts` (
  `post_id` int(11) NOT NULL,
  `user_name` varchar(100) DEFAULT NULL,
  `content` text DEFAULT NULL,
  `category` varchar(100) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `user_id` int(11) DEFAULT NULL,
  `pinned` tinyint(4) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `question`
--

CREATE TABLE `question` (
  `question_id` int(11) NOT NULL,
  `question_text` text NOT NULL,
  `category` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `question`
--

INSERT INTO `question` (`question_id`, `question_text`, `category`) VALUES
(1, 'What kind of problems do you enjoy solving?', 'personality'),
(2, 'What activity do you enjoy most?', 'interest'),
(3, 'What motivates you most?', 'motivation'),
(4, 'What type of work do you prefer?', 'work'),
(5, 'Which subject do you like most?', 'academic'),
(6, 'How do you think?', 'behavior'),
(7, 'What environment suits you best?', 'environment'),
(8, 'What are you naturally good at?', 'skills'),
(9, 'How do you approach a new, unfamiliar challenge?', 'personality'),
(10, 'Which activity makes you lose track of time completely?', 'interest'),
(11, 'What do you value most in a career?', 'motivation'),
(12, 'Which working style describes you best?', 'work'),
(13, 'How do you usually react when you make a mistake?', 'behavior'),
(14, 'What type of information do you enjoy working with most?', 'cognitive'),
(15, 'In a team project, what role do you naturally take?', 'behavior'),
(16, 'What kind of reading material appeals to you most?', 'academic'),
(17, 'How do you prefer to learn something new?', 'academic'),
(18, 'What kind of tool or instrument would you enjoy using daily?', 'work'),
(19, 'Which environment helps you concentrate best?', 'environment'),
(20, 'What part of a project gives you the greatest satisfaction?', 'motivation');

-- --------------------------------------------------------

--
-- Table structure for table `recommendation`
--

CREATE TABLE `recommendation` (
  `recommendation_id` int(11) NOT NULL,
  `match_percentage` float DEFAULT NULL,
  `test_id` int(11) DEFAULT NULL,
  `major_id` int(11) DEFAULT NULL,
  `career_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `saved_majors`
--

CREATE TABLE `saved_majors` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `major_id` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `saved_majors`
--

INSERT INTO `saved_majors` (`id`, `user_id`, `major_id`, `created_at`) VALUES
(9, 1, 2, '2026-04-21 08:44:50'),
(15, 1, 10, '2026-04-21 10:08:48'),
(21, 7, 1, '2026-05-12 21:20:15'),
(24, 7, 3, '2026-05-12 21:26:08');

-- --------------------------------------------------------

--
-- Table structure for table `test`
--

CREATE TABLE `test` (
  `test_id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `date_taken` date DEFAULT NULL,
  `result_score` float DEFAULT NULL,
  `result_type` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `test`
--

INSERT INTO `test` (`test_id`, `user_id`, `date_taken`, `result_score`, `result_type`) VALUES
(31, 7, '2026-04-16', 40, 'Arts'),
(32, 7, '2026-04-16', 40, 'Arts'),
(33, 4, '2026-04-16', 40, 'Arts'),
(34, 4, '2026-04-16', 40, 'Arts'),
(35, 7, '2026-04-16', NULL, 'Arts & Design'),
(36, 7, '2026-04-16', 40, 'Health'),
(37, 7, '2026-04-16', 40, 'Technology'),
(38, 7, '2026-04-16', NULL, 'Arts & Design'),
(39, 5, '2026-04-20', 24, 'Business'),
(40, 5, '2026-04-20', 40, 'Arts'),
(41, 7, '2026-04-20', 27, 'Arts'),
(42, 7, '2026-04-20', 28, 'Technology'),
(44, 7, '2026-05-12', 91, 'Business'),
(45, 7, '2026-05-13', 69, 'Business'),
(46, 7, '2026-05-13', 58, 'Arts');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `userid` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(150) NOT NULL,
  `password` varchar(255) NOT NULL,
  `age` int(11) DEFAULT NULL,
  `educational_level` varchar(100) DEFAULT NULL,
  `role` varchar(50) DEFAULT NULL,
  `profile_pic` varchar(500) DEFAULT NULL,
  `bio` text DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userid`, `name`, `email`, `password`, `age`, `educational_level`, `role`, `profile_pic`, `bio`, `location`) VALUES
(2, 'test2', 'test2@test.com', '$2b$10$jZcIhJkTmGgv7DdX2W34xeur56W2unrH7.keq08qb7x608UF0aq2y', 0, '', 'user', 'https://ui-avatars.com/api/?name=User&background=6c63ff&color=fff&size=128&font-size=0.6&bold=true', NULL, NULL),
(3, 'test3', 'test3@test.com', '$2b$10$4MVbIqX2N7XXcPkJW0UWE.PTnjAuXZqvJmto/MUG/rGmfPwv8Jbim', 0, '', 'user', 'https://ui-avatars.com/api/?name=User&background=6c63ff&color=fff&size=128&font-size=0.6&bold=true', NULL, NULL),
(4, 'test4', 'test4@test.com', '$2b$10$rlnYDHVhPGoz0yT2N1lXbuMyve8.TBfke5o7o9VBWmqRozvDUrd7O', 20, 'Undergraduate', 'user', 'https://ui-avatars.com/api/?name=User&background=6c63ff&color=fff&size=128&font-size=0.6&bold=true', NULL, NULL),
(5, 'test5', 'test5@test.com', '$2b$10$JXI2bJ9iIdFku9O1DaIXe.ezm10fSqQSdISPw7hEH0WkCikps5.P2', 20, 'Undergraduate', 'user', 'https://ui-avatars.com/api/?name=User&background=6c63ff&color=fff&size=128&font-size=0.6&bold=true', NULL, NULL),
(6, 'test6', 'test6@test.com', '$2b$10$BV9RonbUQsIDYlJK9Hrw8.gIaw04szwgNOXLpvs9GqQm/IOJ0lVNq', 25, 'Bachelor', 'user', 'https://ui-avatars.com/api/?name=User&background=6c63ff&color=fff&size=128&font-size=0.6&bold=true', NULL, NULL),
(7, 'Aliii', 'ali@gmail.com', '$2b$10$abEb.ZY.4anvz8kOjEFdXuU4lZBdVJ7j/yQ4j2YpoojG13gymnvq6', 20, 'High School', 'user', 'http://localhost:5000/uploads/profile_pics/1779120474718-499208456.jpg', 'current cs student!!😊', 'lebanon'),
(8, 'test7', 'test7@test.com', '$2b$10$b0M0XIPhLPYa/GYIpctseOiyBtUs0siS8g11leUpm5Kas7ovr4dV.', 45, 'PhD', 'user', 'https://ui-avatars.com/api/?name=User&background=6c63ff&color=fff&size=128&font-size=0.6&bold=true', NULL, NULL),
(11, 'Admin', 'admin@majorconfusion.com', '$2b$10$Y8z9KsYKpq4m.T8K955OHeixP8dFM5Ylf4/Ctjan7bHz4tZOv.N/O', 22, 'PhD', 'admin', 'https://ui-avatars.com/api/?name=User&background=6c63ff&color=fff&size=128&font-size=0.6&bold=true', NULL, NULL),
(13, 'galaxy', 'galaxy.one847@gmail.com', '$2b$10$.ZE6TFsr62bUtkBUr4slIexqp9.99HL9gFO6wacfV49dpbU40GSNq', 23, 'Bachelor', 'user', NULL, 'galaxy 🌌', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `user_quizzes`
--

CREATE TABLE `user_quizzes` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `test_id` int(11) DEFAULT NULL,
  `result_type` varchar(100) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_quizzes`
--

INSERT INTO `user_quizzes` (`id`, `user_id`, `test_id`, `result_type`, `created_at`) VALUES
(0, NULL, 44, 'Business', '2026-05-11 21:37:41'),
(1, NULL, 42, 'Health', '2026-04-21 09:36:03'),
(2, NULL, 42, 'Health', '2026-04-21 09:36:03'),
(3, NULL, 43, 'Health', '2026-04-21 10:04:17'),
(4, NULL, 43, 'Health', '2026-04-21 10:04:17');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `answer`
--
ALTER TABLE `answer`
  ADD PRIMARY KEY (`answer_id`),
  ADD KEY `test_id` (`test_id`),
  ADD KEY `question_id` (`question_id`);

--
-- Indexes for table `career`
--
ALTER TABLE `career`
  ADD PRIMARY KEY (`career_id`);

--
-- Indexes for table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`comment_id`);

--
-- Indexes for table `likes`
--
ALTER TABLE `likes`
  ADD PRIMARY KEY (`like_id`),
  ADD UNIQUE KEY `unique_like` (`user_id`,`post_id`),
  ADD KEY `post_id` (`post_id`);

--
-- Indexes for table `major`
--
ALTER TABLE `major`
  ADD PRIMARY KEY (`major_id`);

--
-- Indexes for table `options`
--
ALTER TABLE `options`
  ADD PRIMARY KEY (`option_id`),
  ADD KEY `question_id` (`question_id`);

--
-- Indexes for table `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`post_id`);

--
-- Indexes for table `question`
--
ALTER TABLE `question`
  ADD PRIMARY KEY (`question_id`);

--
-- Indexes for table `recommendation`
--
ALTER TABLE `recommendation`
  ADD PRIMARY KEY (`recommendation_id`),
  ADD KEY `test_id` (`test_id`),
  ADD KEY `major_id` (`major_id`);

--
-- Indexes for table `saved_majors`
--
ALTER TABLE `saved_majors`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `test`
--
ALTER TABLE `test`
  ADD PRIMARY KEY (`test_id`),
  ADD KEY `userid` (`user_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userid`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `user_quizzes`
--
ALTER TABLE `user_quizzes`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `answer`
--
ALTER TABLE `answer`
  MODIFY `answer_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=281;

--
-- AUTO_INCREMENT for table `career`
--
ALTER TABLE `career`
  MODIFY `career_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `comments`
--
ALTER TABLE `comments`
  MODIFY `comment_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `likes`
--
ALTER TABLE `likes`
  MODIFY `like_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `major`
--
ALTER TABLE `major`
  MODIFY `major_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=57;

--
-- AUTO_INCREMENT for table `options`
--
ALTER TABLE `options`
  MODIFY `option_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=200;

--
-- AUTO_INCREMENT for table `posts`
--
ALTER TABLE `posts`
  MODIFY `post_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `question`
--
ALTER TABLE `question`
  MODIFY `question_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `recommendation`
--
ALTER TABLE `recommendation`
  MODIFY `recommendation_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `saved_majors`
--
ALTER TABLE `saved_majors`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `test`
--
ALTER TABLE `test`
  MODIFY `test_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `userid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `answer`
--
ALTER TABLE `answer`
  ADD CONSTRAINT `answer_ibfk_1` FOREIGN KEY (`test_id`) REFERENCES `test` (`test_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `answer_ibfk_2` FOREIGN KEY (`question_id`) REFERENCES `question` (`question_id`) ON DELETE CASCADE;

--
-- Constraints for table `likes`
--
ALTER TABLE `likes`
  ADD CONSTRAINT `likes_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`userid`) ON DELETE CASCADE,
  ADD CONSTRAINT `likes_ibfk_2` FOREIGN KEY (`post_id`) REFERENCES `posts` (`post_id`) ON DELETE CASCADE;

--
-- Constraints for table `options`
--
ALTER TABLE `options`
  ADD CONSTRAINT `options_ibfk_1` FOREIGN KEY (`question_id`) REFERENCES `question` (`question_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `recommendation`
--
ALTER TABLE `recommendation`
  ADD CONSTRAINT `recommendation_ibfk_2` FOREIGN KEY (`test_id`) REFERENCES `test` (`test_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `recommendation_ibfk_3` FOREIGN KEY (`major_id`) REFERENCES `major` (`major_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `recommendation_ibfk_4` FOREIGN KEY (`career_id`) REFERENCES `career` (`career_id`);

--
-- Constraints for table `test`
--
ALTER TABLE `test`
  ADD CONSTRAINT `test_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`userid`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

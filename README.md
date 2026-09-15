# 🧭 Major Compass

### Career Guidance & Major Recommendation System

**Major Compass** is a web-based career guidance and university major recommendation platform designed specifically for students in Lebanon. The system helps students explore academic majors, discover suitable career paths, research Lebanese universities, receive personalized recommendations, interact with other students, and obtain AI-powered guidance.

The platform combines an interactive career assessment quiz, a comprehensive majors and universities directory, AI assistance, community interaction, saved majors, and job-market visualizations into one centralized system.

---

## 📌 Table of Contents

* [About the Project](#-about-the-project)
* [Problem Statement](#-problem-statement)
* [Solution](#-solution)
* [Objectives](#-objectives)
* [Target Users](#-target-users)
* [Key Features](#-key-features)
* [How the Recommendation System Works](#-how-the-recommendation-system-works)
* [System Pages](#-system-pages)
* [Admin Features](#-admin-features)
* [Technology Stack](#-technology-stack)
* [System Architecture](#-system-architecture)
* [Database Design](#-database-design)
* [Core Entities](#-core-entities)
* [Project Structure](#-project-structure)
* [Installation & Setup](#-installation--setup)
* [Database Configuration](#-database-configuration)
* [Running the Project](#-running-the-project)
* [User Workflow](#-user-workflow)
* [Administrator Workflow](#-administrator-workflow)
* [Future Improvements](#-future-improvements)
* [Project Team](#-project-team)
* [Acknowledgments](#-acknowledgments)
* [References](#-references)

---

# 📖 About the Project

Choosing a university major is one of the most important decisions students make. However, many students struggle to identify a field that matches their interests, abilities, personality, and future career goals.

This challenge can be particularly difficult in Lebanon because students may need to rely on scattered information, personal recommendations, or generic international career platforms that do not focus on the Lebanese educational and employment environment.

**Major Compass** was developed to address this problem by providing a centralized, Lebanon-focused platform for academic and career exploration.

The platform allows students to:

* Discover suitable university majors.
* Take an interactive career assessment quiz.
* Receive personalized major recommendations.
* Explore information about 50+ academic majors.
* Browse information about 30+ Lebanese universities.
* Explore potential career opportunities.
* Ask questions through an AI-powered assistant.
* Save majors for future reference.
* Participate in a student community.
* Explore job-market and demand visualizations.

---

# ❗ Problem Statement

Students in Lebanon face several challenges when deciding what to study:

1. There is no centralized Lebanon-specific platform combining career quizzes, major information, university information, and community support.
2. Students may rely on word-of-mouth recommendations or generic international platforms.
3. Many students are unaware of the different majors and career paths available to them.
4. Students may choose majors without sufficiently considering their interests, skills, personality, or career aspirations.
5. Comparing majors and universities can be difficult when information is distributed across multiple sources.
6. Students have limited access to personalized career guidance.

These challenges can lead to poor academic decisions, dissatisfaction, changing majors, or difficulty identifying an appropriate career path.

---

# 💡 Solution

Major Compass provides an integrated platform that addresses these challenges through several interconnected features.

### 🎯 Personalized Career Quiz

Students answer questions related to:

* Interests
* Skills
* Personality traits
* Career preferences
* Academic and professional aspirations

The system analyzes the answers using a scoring-based recommendation mechanism and generates matching university majors.

### 🎓 Major Directory

Students can browse and search through a collection of academic majors and access information such as:

* Major description
* Required skills
* Related subjects
* Education requirements
* Potential career opportunities

### 🏫 University Directory

The platform provides information about Lebanese universities and allows students to explore institutions according to relevant academic fields and locations.

### 🤖 AI Career Assistant

The AI Chat feature allows students to ask questions related to:

* University majors
* Career paths
* Academic choices
* Universities
* Career exploration

The assistant provides additional guidance during the student's decision-making process.

### 👥 Student Community

Students can interact with one another by:

* Creating posts
* Asking questions
* Sharing experiences
* Participating in discussions
* Exchanging advice

### ⭐ Saved Majors

Students can bookmark majors they are interested in and revisit them later.

### 📊 Job Market Visualization

The dashboard includes visual representations of:

* In-demand majors in Lebanon
* Job-market distribution by field

These visualizations help students consider future employment opportunities when exploring their options.

---

# 🎯 Objectives

The main objective of Major Compass is to help Lebanese students make more informed academic and career decisions.

The project specifically aims to:

* Help students identify suitable university majors.
* Provide personalized recommendations based on quiz responses.
* Centralize information about Lebanese majors and universities.
* Provide AI-powered career guidance.
* Allow students to save and compare potential majors.
* Encourage peer-to-peer interaction.
* Provide job-market information through data visualizations.
* Give administrators tools to manage the platform and its content.

---

# 👤 Target Users

Major Compass is primarily designed for:

### High School Students

Students preparing to enter university and unsure which major or career field to pursue.

### University Students

Students who are considering changing their major, exploring alternative career paths, or looking for additional academic information.

### Students Exploring Careers

Students who want to understand the relationship between university majors and potential professional opportunities.

### Administrators

Authorized users responsible for managing the platform's users, majors, quiz questions, community content, and analytics.

---

# 🚀 Key Features

| Feature                  | Description                                                                            |
| ------------------------ | -------------------------------------------------------------------------------------- |
| 🔐 User Authentication   | Registration and login system for students                                             |
| 🧠 Career Quiz           | Interactive assessment based on interests, skills, personality, and career preferences |
| 🎯 Major Recommendations | Score-based matching between quiz responses and academic majors                        |
| 🎓 Major Directory       | Explore and search through 50+ majors                                                  |
| 🏫 University Directory  | Explore 30+ Lebanese universities                                                      |
| 📄 Major Details         | Detailed information about individual majors                                           |
| 🤖 AI Chat               | AI-powered academic and career assistance                                              |
| 👥 Community             | Student discussions, posts, questions, and advice                                      |
| ⭐ Saved Majors           | Bookmark majors for future reference                                                   |
| 👤 Profile               | Manage personal information and review user activity                                   |
| 📊 Job Market Charts     | Visualize major demand and job-market distribution                                     |
| 🛠️ Admin Dashboard      | Central administration interface                                                       |
| 👥 User Management       | Manage registered users                                                                |
| 🎓 Major Management      | Add, edit, and delete majors                                                           |
| ❓ Quiz Management        | Manage career quiz questions                                                           |
| 🛡️ Community Moderation | Manage posts and discussions                                                           |
| 📈 Analytics             | Monitor system usage and activity                                                      |

---

# 🧠 How the Recommendation System Works

The Career Quiz is one of the core components of Major Compass.

The general process is:

```text
              ┌──────────────────┐
              │      Student     │
              └────────┬─────────┘
                       │
                       ▼
              ┌──────────────────┐
              │   Career Quiz    │
              └────────┬─────────┘
                       │
                       ▼
              ┌──────────────────┐
              │ Student Answers  │
              └────────┬─────────┘
                       │
                       ▼
              ┌──────────────────┐
              │ Scoring Algorithm│
              └────────┬─────────┘
                       │
                       ▼
              ┌──────────────────┐
              │ Major Matching   │
              └────────┬─────────┘
                       │
                       ▼
              ┌──────────────────┐
              │ Recommendations  │
              │ + Match Scores   │
              └──────────────────┘
```

Each answer contributes a score to the recommendation process. The system uses these scores to determine which majors best match the student's profile.

The results page presents recommended majors together with compatibility information, allowing students to continue exploring the suggested fields.

---

# 🖥️ System Pages

## 🔐 Register Page

Allows new students to create an account.

The registration form includes:

* Full Name
* Email
* Age
* Educational Level
* Password

The password requirements include:

* At least 8 characters
* Uppercase letter
* Lowercase letter
* Number

A password visibility toggle is also provided.

---

## 🔑 Login Page

Provides authentication for existing users.

Students can:

* Enter their email.
* Enter their password.
* Show/hide their password.
* Access the password recovery option.
* Navigate to the registration page.

---

## 🏠 Home Dashboard

The dashboard serves as the main entry point after login.

It provides quick access to:

* Career Quiz
* Majors
* Community

It also displays visual information related to the Lebanese job market, including:

* Most In-Demand Majors
* Job Market by Field

---

## 🧠 Career Quiz Page

The Career Quiz evaluates the student's:

* Interests
* Skills
* Personality
* Career preferences

Students answer a series of questions and submit the completed assessment.

The system then processes their responses to generate personalized recommendations.

---

## 🎯 Quiz Results Page

After completing the quiz, students receive personalized major recommendations.

The results include:

* Recommended majors
* Compatibility/match percentages
* Links to explore major details

This allows students to move directly from assessment to detailed exploration.

---

## 🎓 Majors Page

The Majors page provides a centralized directory of university majors.

Users can:

* Browse majors.
* Search for specific majors.
* Filter majors.
* Open individual major information.

---

## 📚 Major Details Page

Each major has a dedicated details page containing information such as:

* Major description
* Required skills
* Related subjects
* Education requirements
* Potential career opportunities

Students can also save the major for later.

---

## 🤖 AI Chat Page

The AI Chat page provides an interactive assistant for academic and career questions.

Students can use the assistant to ask questions about:

* Majors
* Careers
* Universities
* Academic paths

The feature uses external AI APIs to provide real-time assistance.

---

## 👥 Community Page

The Community page provides a collaborative environment where students can:

* Create posts.
* Ask questions.
* Participate in discussions.
* Share experiences.
* Exchange advice.

---

## ⭐ Saved Majors Page

Students can view all majors they previously bookmarked.

This makes it easier to:

* Revisit interesting majors.
* Compare potential choices.
* Keep track of possible academic paths.

---

## 👤 Profile Page

The profile page allows users to manage their account.

Students can:

* View personal information.
* Update account details.
* Review quiz history.
* Access saved majors.

---

# 🛠️ Admin Features

Major Compass includes a dedicated administrative area.

## 📊 Admin Dashboard

The dashboard gives administrators an overview of the system and provides access to management tools and statistics.

---

## 👥 User Management

Administrators can:

* View registered users.
* Monitor account activity.
* Manage user accounts.
* Remove accounts when necessary.

---

## 🎓 Major Management

Administrators can maintain the major database by:

* Adding majors.
* Editing majors.
* Deleting outdated majors.

This allows the academic information to be maintained over time.

---

## ❓ Quiz Question Management

Administrators can manage the career assessment questionnaire.

Available operations include:

* Add question
* Edit question
* Delete question

This allows the quiz to be modified and improved without redesigning the entire system.

---

## 🛡️ Community Management

Administrators can moderate community content.

Management features include:

* Reviewing posts
* Deleting inappropriate content
* Pinning important discussions
* Monitoring community activity
* Viewing post and comment statistics

---

## 📈 Analytics

The Analytics page provides system statistics and visual reports.

Examples include:

* Total users
* Completed quizzes
* Popular majors
* Community activity
* Other platform performance indicators

These statistics can support future improvements and administrative decision-making.

---

# 💻 Technology Stack

## Frontend

* **React.js** — User interface and single-page application
* **JavaScript (ES6+)** — Application logic
* **HTML5** — Page structure
* **CSS3** — Styling and responsive interface

## Backend

* **Node.js** — Backend runtime environment
* **PHP** — Server-side scripting and selected API endpoints

## Database

* **MySQL** — Relational database management system

## Development Environment

* **XAMPP** — Local development environment
* **Visual Studio Code** — Development and code editing
* **Modern Web Browser** — Application testing and usage

---

# 🏗️ System Architecture

Major Compass follows a full-stack web architecture.

```text
┌─────────────────────────────────────────────┐
│                  CLIENT                     │
│                                             │
│             React.js Application            │
│          HTML5 + CSS3 + JavaScript          │
└──────────────────────┬──────────────────────┘
                       │
                       │ HTTP/API Requests
                       ▼
┌─────────────────────────────────────────────┐
│                 BACKEND                     │
│                                             │
│             Node.js + PHP APIs              │
│                                             │
│  Authentication │ Quiz │ Majors │ Community │
│  User Profiles  │ Recommendations │ Admin  │
└──────────────────────┬──────────────────────┘
                       │
                       │ Database Queries
                       ▼
┌─────────────────────────────────────────────┐
│                  DATABASE                   │
│                                             │
│                    MySQL                    │
│                                             │
│ Users │ Tests │ Questions │ Answers         │
│ Majors │ Recommendations │ Community Data   │
└─────────────────────────────────────────────┘
                       │
                       ▼
              ┌─────────────────┐
              │ External AI API │
              │   AI Assistant  │
              └─────────────────┘
```

---

# 🗄️ Database Design

The system uses a relational MySQL database.

The main entities identified in the system design are:

* User
* Test
* Question
* Answer
* Major
* Recommendation

The database is designed to maintain relationships between students, their assessments, quiz answers, recommended majors, and academic information.

---

# 🔗 Core Entities

## User

Stores information about registered users.

Main attributes include:

```text
userid
name
email
password
age
educational_level
role
```

A user can:

* Take multiple tests.
* Submit multiple answers.

---

## Test

Represents a completed career assessment.

Main attributes include:

```text
test_id
userid
date_taken
result_score
```

A test belongs to a user and produces a major recommendation.

---

## Question

Represents a career assessment question.

Main attributes include:

```text
question_id
question_text
category
question_bank_id
test_id
```

Questions are associated with answers submitted by users.

---

## Answer

Stores a student's response to a quiz question.

Main attributes include:

```text
answer_id
test_id
question_id
answer_value
score
```

Answers contribute to the recommendation process.

---

## Major

Stores information about an academic major.

Main attributes include:

```text
major_id
test_id
major_name
description
required_skills
education_required
```

---

## Recommendation

Stores the relationship between a student's assessment and a recommended major.

Main attributes include:

```text
recommendation_id
match_percentage
answer_id
test_id
major_id
```

---

# 📁 Project Structure

A typical organization for the project can be represented as:

```text
MajorCompass/
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── assets/
│   │   └── ...
│   └── package.json
│
├── backend/
│   ├── node/
│   ├── php/
│   └── ...
│
├── database/
│   ├── database.sql
│   └── ...
│
├── README.md
└── ...
```

> **Note:** Adjust the folder names above to match the exact structure of the repository if the project folders differ.

---

# ⚙️ Installation & Setup

## 1. Clone the Repository

```bash
git clone https://github.com/YOUR-USERNAME/major-compass.git
```

Navigate into the project directory:

```bash
cd major-compass
```

---

## 2. Install Frontend Dependencies

Navigate to the React frontend:

```bash
cd frontend
```

Install the required packages:

```bash
npm install
```

---

## 3. Configure XAMPP

Install and start **XAMPP**.

Enable:

* Apache
* MySQL

The PHP backend/API files should be placed within the appropriate XAMPP web directory, depending on the project's configuration.

---

# 🗃️ Database Configuration

1. Open **phpMyAdmin**.
2. Create a MySQL database for Major Compass.
3. Import the project's SQL database file if one is included in the repository.
4. Configure the database connection used by the backend.

The database connection should contain the appropriate:

```text
Host
Username
Password
Database Name
Port
```

Do not commit database passwords, API keys, or other sensitive credentials to GitHub.

---

# 🔐 Environment Variables

If the project uses environment variables, create an appropriate `.env` file for local development.

Example:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=major_compass
DB_PORT=3306

AI_API_KEY=YOUR_API_KEY
```

> **Important:** Never commit real API keys or passwords to the repository.

Add sensitive files to `.gitignore`:

```gitignore
.env
node_modules/
```

---

# ▶️ Running the Project

After installing dependencies and configuring the database:

### Start the React application

```bash
npm start
```

The application should then be available through the local development server.

### Start the backend

Start the Node.js backend according to the project's backend configuration.

For PHP endpoints, make sure Apache is running through XAMPP.

---

# 👨‍🎓 User Workflow

A typical student journey through Major Compass is:

```text
Register
   │
   ▼
Login
   │
   ▼
Home Dashboard
   │
   ├───────────────┐
   │               │
   ▼               ▼
Career Quiz      Browse Majors
   │               │
   ▼               ▼
Quiz Results    Major Details
   │               │
   └───────┬───────┘
           │
           ▼
    Save Interesting
        Majors
           │
           ▼
      Ask AI Assistant
           │
           ▼
     Join Community
```

---

# 👨‍💼 Administrator Workflow

Administrators can manage the platform through:

```text
Admin Login
     │
     ▼
Admin Dashboard
     │
     ├── User Management
     │
     ├── Major Management
     │      ├── Add
     │      ├── Edit
     │      └── Delete
     │
     ├── Quiz Management
     │      ├── Add Question
     │      ├── Edit Question
     │      └── Delete Question
     │
     ├── Community Management
     │
     └── Analytics
```

---

# 🔒 Security Considerations

The system includes role-based access that distinguishes regular users from administrators.

For deployment beyond a local development environment, additional security measures should be applied, including:

* Secure password hashing.
* Input validation and sanitization.
* Prepared SQL statements.
* Authentication/session protection.
* Secure API configuration.
* HTTPS.
* Proper environment-variable management.
* Protection of administrative endpoints.
* Never exposing API keys in frontend code.

---

# 📊 Project Scope

Major Compass focuses on the Lebanese educational environment and provides:

* **50+ academic majors**
* **30+ Lebanese universities**
* Career assessment and recommendation
* Career and major information
* AI-powered assistance
* Student community
* Saved majors
* Job-market visualizations
* Administrative management
* Analytics

---

# 🔮 Future Improvements

The project can be expanded with several additional capabilities.

## 📋 University Application Tracker

Allow students to track their applications across multiple Lebanese universities.

Possible information could include:

* University
* Program
* Application date
* Application status
* Admission decision
* Required documents

---

## 💰 Scholarship & Financial Aid Directory

Create a searchable database containing scholarships and financial aid opportunities available to Lebanese students.

---

## 📱 Mobile Application

Develop dedicated Android and iOS versions of Major Compass to make the platform more accessible from mobile devices.

---

## 🧠 Advanced AI Recommendations

Future versions could improve the recommendation engine by incorporating machine learning models trained using Lebanese graduate and career outcome data.

---

## 🤝 Mentor Connect

Connect students with:

* University alumni
* Professionals
* Career mentors

Students could receive guidance from people with real-world experience in their fields of interest.

---

## 🌐 Multi-Language Support

Add full Arabic support to make Major Compass accessible to a wider range of Lebanese students.

---

# 🎓 Academic Project

Major Compass was developed as a **Senior Project** at:

**Lebanese International University (LIU)**

Program:

**Bachelor of Science in Computer Science and Information Technology**

Semester:

**Spring 2025–2026**

Supervisor:

**Dr. Hassan Al Zammar**

---

# 👥 Project Team

### Batoul Shadkhan

Project Co-Developer

### Tasneem Chaheen

Project Co-Developer

---

# 🙏 Acknowledgments

We would like to express our sincere gratitude to **Dr. Hassan Al Zammar** for his guidance, continuous support, and constructive feedback throughout the development of Major Compass.

We also thank our families and friends for their encouragement, patience, and support during the development of the project.

---

# 📚 References

* React Documentation — https://react.dev/
* Node.js Documentation — https://nodejs.org/en/docs/
* MySQL Documentation — https://dev.mysql.com/doc/
* W3Schools — https://www.w3schools.com/
* Stack Overflow — https://stackoverflow.com/

---

# 📄 License

This project was developed as an academic senior project at Lebanese International University.

If you intend to reuse, modify, or distribute the project, please contact the project authors for permission.

---

<p align="center">
  <strong>🧭 Major Compass</strong><br>
  <em>Navigate your future. Discover the right major. Build the right career.</em>
</p>

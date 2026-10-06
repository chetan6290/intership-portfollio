CREATE DATABASE IF NOT EXISTS portfolio;
USE portfolio;
CREATE TABLE IF NOT EXISTS projects (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(120) NOT NULL,
  description TEXT,
  tech VARCHAR(255),
  github_url VARCHAR(255),
  live_url VARCHAR(255),
  sort_order INT DEFAULT 0
);
CREATE TABLE IF NOT EXISTS messages (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL,
  body TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- Edit descriptions, tech and links to match your resume before deploying.
INSERT INTO projects (title, description, tech, github_url, sort_order) VALUES
('JobVista using AI', 'Add a one-line summary from your resume.', 'Add tech stack', 'https://github.com/chetan6290', 1),
('Emotion Analytics', 'Add a one-line summary from your resume.', 'Add tech stack', 'https://github.com/chetan6290', 2),
('Online Payment Fraud Detection', 'Add a one-line summary from your resume.', 'Add tech stack', 'https://github.com/chetan6290', 3);

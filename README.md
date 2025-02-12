# Bucks2Bar

This repository is an exercise project developed using GitHub Copilot. The project demonstrates how to build an application with minimal coding effort by leveraging AI assistance. It is part of the coursework for the Udemy course:
[GitHub Copilot](https://www.udemy.com/course/github-copilot).

## Overview

Bucks2Bar is a sample application that combines an Express server with a frontend interface. The project includes:
- An email-sending endpoint that accepts an image attachment.
- A dummy data API endpoint that returns random income and expenses information for each month.
- A dashboard that visualizes the data using Chart.js.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/bucks2bar.git
   ```
2. Navigate to the project directory:
   ```bash
   cd bucks2bar
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```
4. Create a `.env` file with your environment variables:
   ```env
   PORT=3000
   RESEND_API_KEY=your_resend_api_key
   ```
5. Start the application:
   ```bash
   npm start
   ```

## Usage

- Access the application in your browser at [http://localhost:3000](http://localhost:3000).
- Use the Data tab to see randomly populated income and expenses for each month.
- Switch to the Chart tab to view the bar chart visualization.
- You can also send the current chart via email using the provided functionality.

## Learning with GitHub Copilot

This repository is an exercise in using GitHub Copilot to assist in application development. It showcases how AI can be used to generate code, streamline workflows, and accelerate the development process.

## License

This project is licensed under the MIT License.

## Acknowledgments

- [GitHub Copilot](https://copilot.github.com/) for the AI assistance.
- Udemy course [GitHub Copilot](https://www.udemy.com/course/github-copilot) for inspiring this exercise.

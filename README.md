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

## Python Version

I also created a Python version of the server with a single prompt, demonstrating how AI can rapidly generate alternative implementations.

## Advanced Prompts That Helped

Below are some of the prompts that were very interesting and helpful during the development:

1. **"Is there a built in method or existing library in … that can …"**  
   _Prompt to help find optimal libraries or methods._

2. **"Highlight any vulnerabilities in the solution you provide as well as solution to those vulnerabilities"**  
   _Prompt for security guidance._

3. **"Scan my code to find any potential vulnerabilities or security concerns. Also provide solutions to any issues you find"**  
   _Prompt for code scanning and security recommendations._

4. **"I want to learn more about this codebase. Create a quiz for me with Multiple choice answers to help me learn more about this codebase."**  
   _Prompt to generate an educational quiz related to the code._

5. **"Generate me a list of 20 employees. Each employee must have an id, first name, and last name. Your output must be a valid JSON format."**  
   _Prompt to generate structured sample data._

   _Command line GitHub Copilot:_
   - `gh copilot …`
   - `ghce: gh copilot explain`
   - `ghcs: gh copilot suggest`

6. **"Identify any security issues and vulnerabilities in your code"**  
   _Prompt focused on ensuring code security._

## Learning with GitHub Copilot

This repository is an exercise in using GitHub Copilot to assist in application development. It showcases how AI can be used to generate code, streamline workflows, and accelerate the development process.

## License

This project is licensed under the MIT License.

## Acknowledgments

- [GitHub Copilot](https://copilot.github.com/) for the AI assistance.
- Udemy course [GitHub Copilot](https://www.udemy.com/course/github-copilot) for inspiring this exercise.

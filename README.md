# Task Manager Pro

A full-featured task management web application built with **Next.js** and **React**. This project allows users to create, organize, prioritize, and track tasks with a clean and responsive interface.

## Features

- **Add & Delete Tasks** – Quickly create new tasks and remove completed or unwanted ones
- - **Priority Levels** – Assign Low, Medium, or High priority to each task
  - - **Due Dates** – Set deadlines and track upcoming tasks
    - - **Inline Editing** – Edit task details directly without navigating away
      - - **Filter & Search** – Filter tasks by status or priority using the FilterBar component
        - - **Task Statistics** – View a live summary of total, completed, and pending tasks
          - - **Dark/Light Theme Toggle** – Switch between themes for a personalized experience
            - - **Responsive Design** – Works across desktop and mobile screens
             
              - ## Technologies Used
             
              - - [Next.js](https://nextjs.org/) – React framework for production
                - - [React](https://react.dev/) – Component-based UI library
                  - - [JavaScript (ES6+)](https://developer.mozilla.org/en-US/docs/Web/JavaScript) – Core programming language
                    - - [CSS Modules / Tailwind CSS](https://tailwindcss.com/) – Styling and responsive layout
                      - - [Node.js / npm](https://nodejs.org/) – Package management and dev environment
                       
                        - ## Project Structure
                       
                        - ```
                          task-manager-pro/
                          ├── src/
                          │   ├── app/          # Next.js app router pages and layout
                          │   └── components/   # Reusable React components
                          │       ├── AddTaskForm.js    # Form for creating new tasks
                          │       ├── FilterBar.js      # Filter tasks by status/priority
                          │       ├── TaskBoard.js      # Main board layout
                          │       ├── TaskCard.js       # Individual task card with inline edit
                          │       ├── TaskList.js       # Renders list of TaskCards
                          │       ├── TaskStats.js      # Summary statistics panel
                          │       └── ThemeToggle.js    # Dark/light mode toggle
                          ├── public/           # Static assets
                          └── README.md
                          ```

                          ## How to Run

                          1. **Clone the repository**
                          2.    ```bash
                                   git clone https://github.com/Asce260901/task-manager-pro.git
                                   cd task-manager-pro
                                   ```

                                2. **Install dependencies**
                                3.    ```bash
                                         npm install
                                         ```

                                      3. **Start the development server**
                                      4.    ```bash
                                               npm run dev
                                               ```

                                            4. **Open your browser** and navigate to [http://localhost:3000](http://localhost:3000)
                                        
                                            5. ## What I Learned
                                        
                                            6. Building this project helped me deepen my understanding of several key concepts:
                                        
                                            7. - **Component-based architecture** – Breaking a UI into small, reusable React components made the codebase easier to maintain and scale
                                               - - **State management in React** – Managing task data, filters, and theme state across multiple components reinforced my understanding of useState and props
                                                 - - **Next.js App Router** – Working with the App Router structure gave me hands-on experience with modern Next.js conventions
                                                   - - **UI/UX thinking** – Designing features like inline editing and a theme toggle pushed me to think about the end-user experience, not just functionality
                                                     - - **Professional project organization** – Structuring files into logical folders and writing clean, readable code prepared me for real-world development workflows
                                                      
                                                       - ## Author
                                                      
                                                       - **Alejandro Martinez**
                                                       - Business Analytics & Information Systems | University of South Florida
                                                       - [GitHub](https://github.com/Asce260901) • [LinkedIn](https://linkedin.com/in/alejandro-martinez-a079b0298)

# Task Manager Pro

A full-featured task management web application built with **Next.js** and **React**. This project allows users to create, organize, prioritize, and track tasks with a clean and responsive interface.

## Features

- Add and delete tasks quickly
- - Assign Low, Medium, or High priority to each task
  - - Set due dates and track upcoming deadlines
    - - Edit task details inline without navigating away
      - - Filter and search tasks by status or priority
        - - View live task statistics (total, completed, pending)
          - - Toggle between Dark and Light themes
            - - Fully responsive design for desktop and mobile
             
              - ## Technologies Used
             
              - - **Next.js** - React framework for production-grade web apps
                - - **React** - Component-based UI library
                  - - **JavaScript (ES6+)** - Core programming language
                    - - **CSS / Tailwind CSS** - Styling and responsive layout
                      - - **Node.js / npm** - Package management and development environment
                       
                        - ## Project Structure
                       
                        - ```
                          task-manager-pro/
                          ├── src/
                          │   ├── app/               # Next.js App Router pages and layout
                          │   └── components/        # Reusable React components
                          │       ├── AddTaskForm.js     # Form to create new tasks
                          │       ├── FilterBar.js       # Filter tasks by status or priority
                          │       ├── TaskBoard.js       # Main board layout container
                          │       ├── TaskCard.js        # Individual task card with inline editing
                          │       ├── TaskList.js        # Renders the list of TaskCards
                          │       ├── TaskStats.js       # Displays task summary statistics
                          │       └── ThemeToggle.js     # Dark/Light mode toggle button
                          ├── public/                # Static assets
                          └── README.md
                          ```

                          ## How to Run

                          **Step 1 - Clone the repository**

                          ```bash
                          git clone https://github.com/Asce260901/task-manager-pro.git
                          cd task-manager-pro
                          ```

                          **Step 2 - Install dependencies**

                          ```bash
                          npm install
                          ```

                          **Step 3 - Start the development server**

                          ```bash
                          npm run dev
                          ```

                          **Step 4 - Open your browser** and go to http://localhost:3000

                          ## What I Learned

                          Building this project helped me grow in several key areas:

                          - **Component-based architecture** - Splitting the UI into small, focused components made the code easier to maintain, reuse, and debug
                          - - **State management in React** - Managing task data, filters, and theme state across components strengthened my understanding of useState and props
                            - - **Next.js App Router** - Working with the App Router structure gave me hands-on experience with modern Next.js patterns and file-based routing
                              - - **UI/UX design thinking** - Implementing features like inline editing and a live stats panel pushed me to prioritize user experience alongside functionality
                                - - **Professional code organization** - Structuring the project with clear folders, consistent naming, and clean code prepared me for real-world development workflows
                                 
                                  - ## Author
                                 
                                  - **Alejandro Martinez**
                                  - Business Analytics & Information Systems | University of South Florida
                                  - GitHub: https://github.com/Asce260901
                                  - LinkedIn: https://linkedin.com/in/alejandro-martinez-a079b0298

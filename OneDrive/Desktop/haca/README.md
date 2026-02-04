# Harris & Co. - Digital Agency React App

This project is a React-based web application for a digital agency, featuring a modern, responsive design with dynamic components.

## Features Implemented

1.  **Client Testimonials Section**:
    *   Interactive carousel using Swiper.js.
    *   Clickable testimonial cards that open a clean video modal.
    *   Modal contains only the video player and a close button as requested.

2.  **Blog Section**:
    *   Grid view of latest blog posts with hover effects.
    *   Fully functional routing to individual Blog Detail pages (`/blog/:id`).
    *   Blog detail pages feature full content, images, and metadata.

3.  **Real-Time Clock**:
    *   Live updating clock displayed in the Navigation bar.
    *   Updates every second using React Hooks (`useState`, `useEffect`).

4.  **Responsive Design**:
    *   Built with Tailwind CSS mobile-first approach.
    *   Fully responsive navigation (hamburger menu on mobile).
    *   Adaptive grids for Testimonials, Blogs, and Projects.

5.  **Modern UI/UX**:
    *   Dark mode aesthetic based on the provided design.
    *   Smooth transitions and hover effects.
    *   clean typography and layout.

## Technologies Used

*   **React JS** (Vite)
*   **Tailwind CSS v4**
*   **React Router DOM** (Navigation)
*   **Swiper** (Carousel/Slider)
*   **Lucide React** (Icons)

## Setup Instructions

1.  **Prerequisites**: Ensure you have Node.js installed.
2.  **Install Dependencies**:
    ```bash
    npm install
    ```
3.  **Run the Project**:
    ```bash
    npm run dev
    ```
    Open the URL shown in the terminal (usually `http://localhost:5173`).

## Project Structure

*   `src/components`: Reusable UI components (Navbar, Hero, Testimonials, etc.)
*   `src/pages`: Page components (Home, BlogDetail)
*   `src/data`: Mock data for the application
*   `src/index.css`: Tailwind CSS imports and global styles

## Assumptions

*   Images are sourced from Unsplash for demonstration purposes.
*   Video URLs are YouTube embeds.
*   The "Agency" and "Work" sections were implemented to match the visual fidelity of the provided mockup, even if not explicitly detailed in the text requirements, to ensure a complete landing page experience.

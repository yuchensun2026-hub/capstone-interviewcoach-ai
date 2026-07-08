# AI InterviewCoach Front-End

This is my Milestone 1 front-end prototype for the capstone project. The app is
designed to help students practice interviews, choose a target role, answer mock
questions, and review feedback before a real interview.

The current version is front-end only. It uses mock data so the screens and user
flow can be demonstrated before the Flask backend, PostgreSQL database, and
OpenAI API integration are added in later milestones.

## Problem

The business problem I chose is that many students do not get enough structured
interview practice before applying for internships or full-time jobs. They may
practice with friends or read sample questions online, but they often do not get
clear feedback on structure, communication, role fit, or specific evidence.

This project creates value by giving students a repeatable practice workflow:
choose an interview type, answer questions, review feedback, and track practice
history over time.

## Current Features

- Login and register prototype
- Student dashboard with practice metrics
- Interview setup for role, interview type, and difficulty
- Mock interview question flow
- Feedback report with category scores
- Practice history table
- Admin dashboard for managing question templates locally

## How the Code Connects to the Labs

I added inline comments in the React code to point out the main lab-related
parts of the project. The current code demonstrates:

- React components for separate screens
- `useState` for login, navigation, form values, and interview progress
- `useMemo` for the progress calculation
- Conditional rendering for login/register and page changes
- Form inputs for setup, answers, and admin question entries
- `.map()` rendering for navigation, cards, role buttons, and tables
- Responsive CSS for desktop and smaller screens

## Tech Stack

- React 18
- Vite 5
- lucide-react
- CSS

## Run Locally

Install dependencies:

```bash
npm install
```

Start the app:

```bash
npm run dev
```

Build the project:

```bash
npm run build
```

Preview the build:

```bash
npm run preview
```

On Windows, if PowerShell blocks `npm`, use `npm.cmd` instead:

```bash
npm.cmd run build
```



## What Comes Next

Later milestones will add:

- Flask API routes
- PostgreSQL tables for users, questions, sessions, and feedback
- Real authentication
- Saved interview history
- OpenAI API feedback generation
- Full admin CRUD features

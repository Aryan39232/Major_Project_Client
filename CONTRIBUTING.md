# Contributing to BrandCollab Platform

First off, thank you for considering contributing to BrandCollab! It's people like you that make BrandCollab such a great tool.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [How Can I Contribute?](#how-can-i-contribute)
- [Style Guidelines](#style-guidelines)
- [Commit Messages](#commit-messages)
- [Pull Request Process](#pull-request-process)

## Code of Conduct

This project and everyone participating in it is governed by our Code of Conduct. By participating, you are expected to uphold this code. Please report unacceptable behavior to support@brandcollab.com.

### Our Standards

- Using welcoming and inclusive language
- Being respectful of differing viewpoints and experiences
- Gracefully accepting constructive criticism
- Focusing on what is best for the community
- Showing empathy towards other community members

## Getting Started

### Prerequisites

- Node.js v16+
- npm or yarn
- Git
- MongoDB (local or Atlas)
- Basic knowledge of React and Node.js

### Setting Up Development Environment

1. **Fork the repository**
   ```bash
   # Click the "Fork" button on GitHub
   ```

2. **Clone your fork**
   ```bash
   git clone https://github.com/your-username/brandcollab-platform.git
   cd brandcollab-platform
   ```

3. **Add upstream remote**
   ```bash
   git remote add upstream https://github.com/original-owner/brandcollab-platform.git
   ```

4. **Install dependencies**
   ```bash
   # Client
   cd Major_Project_Client_Enhanced
   npm install
   
   # Server
   cd ../Major_Project_Server_Enhanced
   npm install
   ```

5. **Set up environment variables**
   ```bash
   # Copy example files
   cp .env.example .env
   # Fill in your values
   ```

6. **Start development servers**
   ```bash
   # Terminal 1 - Backend
   cd Major_Project_Server_Enhanced
   npm run dev
   
   # Terminal 2 - Frontend
   cd Major_Project_Client_Enhanced
   npm start
   ```

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check existing issues to avoid duplicates. When creating a bug report, include as many details as possible:

**Bug Report Template:**
```markdown
**Describe the bug**
A clear and concise description of what the bug is.

**To Reproduce**
Steps to reproduce the behavior:
1. Go to '...'
2. Click on '....'
3. Scroll down to '....'
4. See error

**Expected behavior**
What you expected to happen.

**Screenshots**
If applicable, add screenshots.

**Environment:**
 - OS: [e.g. macOS, Windows]
 - Browser: [e.g. Chrome, Safari]
 - Version: [e.g. 22]

**Additional context**
Any other context about the problem.
```

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion:

**Enhancement Template:**
```markdown
**Is your feature request related to a problem?**
A clear description of the problem.

**Describe the solution you'd like**
What you want to happen.

**Describe alternatives you've considered**
Any alternative solutions or features.

**Additional context**
Screenshots, mockups, or examples.
```

### Your First Code Contribution

Unsure where to begin? Look for issues labeled:
- `good first issue` - Simple issues for beginners
- `help wanted` - Issues needing assistance
- `documentation` - Documentation improvements

### Pull Requests

1. **Create a branch**
   ```bash
   git checkout -b feature/amazing-feature
   # or
   git checkout -b fix/bug-fix
   ```

2. **Make your changes**
   - Write clear, concise code
   - Follow style guidelines
   - Add tests if applicable
   - Update documentation

3. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: add amazing feature"
   ```

4. **Push to your fork**
   ```bash
   git push origin feature/amazing-feature
   ```

5. **Open a Pull Request**
   - Go to the original repository
   - Click "New Pull Request"
   - Select your branch
   - Fill in the PR template

## Style Guidelines

### JavaScript/React Style Guide

We follow the Airbnb JavaScript Style Guide with some modifications:

**General Rules:**
```javascript
// ✅ Good
const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await api.post('/endpoint', data);
    setSuccess(true);
  } catch (error) {
    console.error('Error:', error);
    setError(error.message);
  }
};

// ❌ Bad
const handleSubmit = async (e) => {
  e.preventDefault()
  try {
    const response = await api.post('/endpoint', data)
    setSuccess(true)
  } catch (error) {
    console.error('Error:', error)
    setError(error.message)
  }
}
```

**React Components:**
```javascript
// ✅ Good - Functional component with hooks
import React, { useState, useEffect } from 'react';

const MyComponent = ({ prop1, prop2 }) => {
  const [state, setState] = useState('');

  useEffect(() => {
    // Effect logic
  }, []);

  return (
    <div className="my-component">
      {/* Component JSX */}
    </div>
  );
};

export default MyComponent;
```

**Naming Conventions:**
- Components: PascalCase (`MyComponent.js`)
- Functions: camelCase (`handleClick`, `fetchData`)
- Constants: UPPER_SNAKE_CASE (`API_URL`, `MAX_RETRIES`)
- CSS Classes: kebab-case (`my-component`, `btn-primary`)

### CSS/SCSS Style Guide

```scss
// ✅ Good - BEM-like structure
.card {
  padding: 1rem;
  border-radius: 0.5rem;
  
  &__header {
    font-size: 1.25rem;
    font-weight: 700;
  }
  
  &__body {
    color: var(--gray-700);
  }
  
  &--featured {
    border: 2px solid var(--primary);
  }
}

// ❌ Bad - Nested too deeply
.card {
  .header {
    .title {
      .text {
        color: blue;
      }
    }
  }
}
```

### Backend Style Guide

```javascript
// ✅ Good - Express route structure
const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { getProjects, createProject } = require('../controllers/projectController');

router.route('/')
  .get(protect, getProjects)
  .post(protect, createProject);

module.exports = router;

// Controller
const getProjects = async (req, res) => {
  try {
    const projects = await Project.find({ user: req.user.id });
    res.json({ success: true, data: projects });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
```

## Commit Messages

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

### Format
```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

### Examples

```bash
# Feature
feat(auth): add password reset functionality

# Bug fix
fix(dashboard): resolve project loading issue

# Documentation
docs(readme): update installation instructions

# Refactoring
refactor(api): simplify error handling logic

# Multiple changes
feat(project): add file upload capability

- Integrate AWS S3 for file storage
- Add multer middleware for file handling
- Update project model with file references

Closes #123
```

## Pull Request Process

### Before Submitting

- [ ] Code follows style guidelines
- [ ] Self-review of code completed
- [ ] Comments added for complex logic
- [ ] Documentation updated
- [ ] No console.log or debugger statements
- [ ] Tests pass (if applicable)
- [ ] No merge conflicts

### PR Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## How Has This Been Tested?
Describe testing process

## Screenshots (if applicable)
Add screenshots

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-reviewed code
- [ ] Commented complex code
- [ ] Updated documentation
- [ ] No console logs
- [ ] Tests pass
```

### Review Process

1. At least one maintainer must approve
2. All CI checks must pass
3. No merge conflicts
4. Code meets quality standards

### After Your PR is Merged

1. Delete your branch
   ```bash
   git branch -d feature/amazing-feature
   ```

2. Update your local main
   ```bash
   git checkout main
   git pull upstream main
   ```

## Development Workflow

### Branch Naming

- Feature: `feature/description`
- Bug fix: `fix/description`
- Documentation: `docs/description`
- Refactor: `refactor/description`

### Testing

```bash
# Run all tests
npm test

# Run specific test
npm test -- ComponentName

# Watch mode
npm test -- --watch
```

### Building

```bash
# Frontend build
cd Major_Project_Client_Enhanced
npm run build

# Check build locally
npx serve -s build
```

## Questions?

Feel free to:
- Open an issue with the `question` label
- Email: dev@brandcollab.com
- Join our Discord: [Link]

## Recognition

Contributors will be recognized in:
- README.md Contributors section
- Release notes
- Project documentation

Thank you for contributing! 🎉

# linkedin-poster

Tech Stack:
- Node.js
- MongoDB/ mongoose
- Image Generator: Tool to dynamically create images based on specified parameters.
- LinkedIn API: Interface for interacting with LinkedIn's platform.

Description

1. LinkedIn API Integration:
2. Image Generator
3. Ordering Inputs on the Background
4. Color Adjustment for Picture
5. Post a Dummy Content on LinkedIn
6. Error Handling

## Table of Contents

- [LinkedIn Post Feature](#linkedin-post-feature)
    - [Setup](#setup)
    - [Configuration](#configuration)
    - [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

---

## LinkedIn Post Feature

### Setup

1. **Install Dependencies:**

    ```bash
    npm install
    ```

2. **Configure LinkedIn API Credentials:**

   Obtain your LinkedIn API credentials and update the `.env` file with your `LINKEDIN_CLIENT_ID` and `LINKEDIN_CLIENT_SECRET`.

    ```env
    check .env.example file
    ```

3. **Run the Application:**

    ```bash
    npm run start
    ```

### Configuration

The LinkedIn post feature requires the following configuration:

- LinkedIn API credentials (Client ID and Client Secret)
- MongoDB connection string (if applicable)

Update the `.env` file with the necessary configuration.

### Usage

#### Authenticating with LinkedIn

To authenticate with LinkedIn and obtain an access token, make a POST request to the following endpoint:

```http
POST /auth/linkedin

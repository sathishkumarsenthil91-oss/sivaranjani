# ComicCraft - AI Comic Story Creator using Gemini Models

ComicCraft is a web application that turns a short story idea into a comic. The user enters a story prompt, and the system uses Google's Gemini models to write the story, split it into panels with dialogues, and generate matching visuals.

## Project Overview

Creating a comic normally needs writing, storyboarding, and drawing skills. ComicCraft automates this with generative AI:

- Takes a story idea or prompt from the user
- Generates a structured story with scenes, narration, and dialogues
- Creates image prompts for each comic panel
- Displays the panels in a clean comic-style layout in the browser

## Features

- Story generation from custom prompts
- Panel-by-panel scene and dialogue creation
- AI-generated visuals for each panel
- Dynamic frontend templates for the comic layout
- Simple Flask backend with API routes

## Tech Stack

| Layer | Technology |
|-------|------------|
| Language | Python |
| Backend | Flask (`route.py`) |
| AI Models | Google Gemini (Flash / Pro) |
| Image Generation | Hugging Face Diffusers (Stable Diffusion) |
| Frontend | HTML, CSS, JavaScript |

## Model Selection

- **Gemini Flash**: fast responses, good for quick outputs
- **Gemini Pro**: better for detailed, creative text generation
- **Stable Diffusion (Hugging Face Diffusers)**: high-quality images from prompts

Models were compared on creative writing quality, response speed, and ease of integration.

## Project Workflow

1. User enters a story idea in the web interface
2. Flask backend receives the request through the API route
3. Gemini model generates the story, scenes, and dialogues
4. Image prompts are created for each panel
5. Images are generated and combined with the text
6. The frontend displays the final comic

## Project Structure

```
sivaranjani/
├── app.py / route.py     # Flask routes
├── templates/            # HTML templates
├── static/               # CSS, JS, images
├── requirements.txt      # Dependencies
└── README.md
```

## Setup and Installation

**Prerequisites**
- Python 3.9 or above
- A Google Gemini API key
- Git

**Steps**

```bash
# 1. Clone the repository
git clone https://github.com/sathishkumarsenthil91-oss/sivaranjani.git
cd sivaranjani

# 2. Create a virtual environment
python -m venv venv
venv\Scripts\activate        # Windows

# 3. Install dependencies
pip install -r requirements.txt

# 4. Add your API key
set GEMINI_API_KEY=your_api_key_here

# 5. Run the app
python app.py
```

Open `http://127.0.0.1:5000` in your browser.

## Development Plan (Epics)

1. Model Selection and Architecture
2. Core Functionalities Development
3. route.py Development
4. Frontend Development
5. Testing and Deployment

## Team

- Siva Ranjani (Team Lead)
- Nancy Evanjalin

## License

This project is for learning purposes as part of the Google Cloud Generative AI Engineer program on SkillWallet.

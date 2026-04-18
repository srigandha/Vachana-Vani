# Vachana Content Generation Guide

## Overview

This repository stores Kannada vachana content in JSON files under `vachana-data/` and renders them using `Template.html`.

Use `prompt.txt` to generate new vachana entries via AI. The generated content is then added or updated in the year-specific file under `vachana-data/`, such as `vachana-data/2026.json`.

## How to use `prompt.txt`

1. Open `prompt.txt`.
2. Replace one of the placeholders depending on your input type:
   - If you have a source URL, replace:
     ```
     [PASTE YOUR URL LINE HERE]
     ```
   - If you have the raw Kannada vachana text, replace:
     ```
     [PASTE YOUR KANNADA VACHANA LINES HERE]
     ```
3. Ask the AI to generate content using the prompt exactly as written.
4. The AI must return only raw JSON, with no Markdown, no explanations, and no extra text.

## Required JSON structure

The AI must return JSON with these fields:

- `weekNumber`: number
- `vachankaraName`: string
- `reference`: string (the source URL)
- `vachanaLines`: array of original Kannada lines
- `meanings`: array of objects with:
  - `kannada`
  - `transliteration`
  - `english`
- `contextCards`: array of 2 objects with `text`

### Example structure

```json
{
  "weekNumber": 1,
  "vachankaraName": "Basavanna",
  "reference": "https://example.com/vachana",
  "vachanaLines": ["ಹೆಸರು ಒಂದು ಸಾಲು", "ಮತ್ತೊಂದು ಸಾಲು"],
  "meanings": [
    {
      "kannada": "ಹೆಸರು ಒಂದು ಸಾಲು",
      "transliteration": "Hesaru ondu saalu",
      "english": "Translation of the first line."
    },
    {
      "kannada": "ಮತ್ತೊಂದು ಸಾಲು",
      "transliteration": "Mattomdu saalu",
      "english": "Translation of the second line."
    }
  ],
  "contextCards": [
    { "text": "Spiritual theme or insight." },
    { "text": "Second spiritual insight." }
  ]
}
```

> Note: The current project schema stores `contextCards` items as objects containing only `text`. If the generated response includes `title` fields, remove them or convert them into plain `text` objects.

## Updating year-specific JSON files

1. Decide which year the new vachana belongs to.
2. Open `vachana-data/<year>.json` in a text editor (for example, `vachana-data/2026.json`).
3. Find the `weeks` array.
4. Add the new vachana object inside the `weeks` array.
   - If the `weekNumber` already exists, replace that object.
   - If it is a new week, append it to the array.
5. Keep the top-level `year` value unchanged.

### Example insertion

```json
{
  "year": 2026,
  "weeks": [
    {
      "weekNumber": 17,
      "vachankaraName": "Basavanna",
      "reference": "https://...",
      "vachanaLines": [...],
      "meanings": [...],
      "contextCards": [...]
    },
    {
      "weekNumber": 18,
      "vachankaraName": "Akkamahadevi",
      "reference": "https://...",
      "vachanaLines": [...],
      "meanings": [...],
      "contextCards": [...]
    }
  ]
}
```

## Adding a new poet/image

If the `vachankaraName` is new:

- Add the poet metadata to `vachana-data/poets.json`.
- Use the same display name as `vachankaraName`.
- Add the portrait file under `images/` with a matching file name, for example `images/Akkamahadevi.jpg`.

## Running the project

1. Start the local server:
   ```bash
   node server.js
   ```
2. Open the template in your browser:
   ```
   http://localhost:8000/Template.html?weekNumber=17&year=2026
   ```
3. Change `weekNumber` and `year` to view other pages.

## Tips

- Always verify the generated JSON before copying it into `vachana-data/2026.json`.
- Keep the JSON valid and properly comma-separated.
- Use the exact same spelling for `vachankaraName` in both the JSON file and `poets.json`.
- If you want to add a new year, create `vachana-data/<year>.json` with the same structure.
- When the year changes, update the browser query string to `year=<newYear>` and use the corresponding JSON file.

# Cash Flow Protection Scorecard

An interactive online assessment tool designed to help businesses identify potential cash flow vulnerabilities related to insurable risks.

## Features

- Interactive assessment with 14 questions across 4 pillars
- Real-time progress tracking
- Automated scoring and risk level calculation
- Personalized recommendations
- Mobile-responsive design
- Print-friendly results

## Project Structure

```
cash-flow-scorecard/
├── index.html          # Main HTML file
├── css/
│   └── styles.css      # Custom styles
├── js/
│   └── app.js          # Main JavaScript file
└── assets/             # Images and other assets
    └── logo.png        # Company logo
```

## Setup

1. Clone the repository
2. Open `index.html` in a web browser
3. No build process or dependencies required

## Usage

1. Users land on the introduction screen
2. Click "Start Assessment" to begin
3. Answer all questions (required)
4. Provide contact information
5. View personalized results
6. Results can be printed or shared

## Technical Details

- Built with vanilla JavaScript
- Uses Tailwind CSS for styling
- Mobile-first responsive design
- No external dependencies required
- Form validation and error handling
- Progress tracking
- Risk level calculation based on user responses

## Risk Level Calculation

Scores are calculated based on the following criteria:

- Each answer is assigned a point value (1-4)
- Pillar scores are averaged
- Overall score is the average of all pillar scores
- Risk levels are determined as follows:
  - Low Risk: ≤ 1.5
  - Medium Risk: > 1.5 and ≤ 2.5
  - High Risk: > 2.5 and ≤ 3.5
  - Critical Risk: > 3.5

## Integration

To integrate with a backend system:

1. Modify the `handleContactSubmit` function in `app.js`
2. Add your API endpoint for data submission
3. Implement any necessary authentication
4. Add error handling for failed submissions

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is proprietary and confidential. All rights reserved. 
// Assessment Questions Data
const questions = {
    pillar1: {
        name: "Operational Disruption Risk",
        questions: [
            {
                id: "q1.1",
                text: "How many key employees would need to be replaced if they were suddenly unable to work?",
                options: [
                    "None - We have documented processes and cross-trained staff",
                    "1-2 key employees",
                    "3-5 key employees",
                    "More than 5 key employees"
                ]
            },
            {
                id: "q1.2",
                text: "How quickly could you resume operations if your primary location became unusable?",
                options: [
                    "Immediately - We have a documented business continuity plan and backup location",
                    "Within 24 hours",
                    "Within 1 week",
                    "More than 1 week"
                ]
            },
            {
                id: "q1.3",
                text: "What percentage of your revenue depends on a single client or project?",
                options: [
                    "Less than 10%",
                    "10-25%",
                    "26-50%",
                    "More than 50%"
                ]
            },
            {
                id: "q1.4",
                text: "How often do you review and update your business continuity plan?",
                options: [
                    "Quarterly",
                    "Annually",
                    "Every 2-3 years",
                    "We don't have a formal plan"
                ]
            }
        ]
    },
    pillar2: {
        name: "Workforce Risk",
        questions: [
            {
                id: "q2.1",
                text: "What percentage of your workforce is classified as independent contractors?",
                options: [
                    "Less than 10%",
                    "10-25%",
                    "26-50%",
                    "More than 50%"
                ]
            },
            {
                id: "q2.2",
                text: "How do you handle workers' compensation claims?",
                options: [
                    "We have a documented return-to-work program and safety protocols",
                    "We follow standard procedures but no formal program",
                    "We handle claims as they arise",
                    "We don't have a formal process"
                ]
            },
            {
                id: "q2.3",
                text: "How often do you conduct safety training for employees?",
                options: [
                    "Quarterly or more frequently",
                    "Annually",
                    "Only for new hires",
                    "We don't conduct safety training"
                ]
            }
        ]
    },
    pillar3: {
        name: "Liability & Lawsuit Risk",
        questions: [
            {
                id: "q3.1",
                text: "Do you have professional liability insurance?",
                options: [
                    "Yes, with appropriate coverage limits",
                    "Yes, but coverage may be insufficient",
                    "No, but considering it",
                    "No, and not planning to get it"
                ]
            },
            {
                id: "q3.2",
                text: "How often do you review your contracts and agreements?",
                options: [
                    "Quarterly with legal counsel",
                    "Annually",
                    "Only when issues arise",
                    "We don't review contracts regularly"
                ]
            },
            {
                id: "q3.3",
                text: "Do you have employees who drive company vehicles or their personal vehicles for work?",
                options: [
                    "No",
                    "Yes, with documented policies and training",
                    "Yes, but no formal policies",
                    "Not Applicable"
                ]
            },
            {
                id: "q3.4",
                text: "How do you handle customer complaints and disputes?",
                options: [
                    "We have a documented resolution process",
                    "We handle them case by case",
                    "We rarely receive complaints",
                    "We don't have a formal process"
                ]
            }
        ]
    },
    pillar4: {
        name: "Financial Shock Absorption",
        questions: [
            {
                id: "q4.1",
                text: "How many months of operating expenses do you have in cash reserves?",
                options: [
                    "6+ months",
                    "3-5 months",
                    "1-2 months",
                    "Less than 1 month"
                ]
            },
            {
                id: "q4.2",
                text: "What percentage of your revenue comes from recurring sources?",
                options: [
                    "More than 75%",
                    "50-75%",
                    "25-49%",
                    "Less than 25%"
                ]
            },
            {
                id: "q4.3",
                text: "How do you handle unexpected expenses?",
                options: [
                    "We have a dedicated emergency fund",
                    "We use operating cash flow",
                    "We rely on credit lines",
                    "We don't have a plan"
                ]
            }
        ]
    }
};

// Risk Level Colors
const riskLevels = {
    low: { text: "Low Risk", color: "bg-green-100 text-green-800" },
    medium: { text: "Medium Risk", color: "bg-yellow-100 text-yellow-800" },
    high: { text: "High Risk", color: "bg-red-100 text-red-800" },
    critical: { text: "Critical Risk", color: "bg-red-900 text-white" }
};

// DOM Elements
const introScreen = document.getElementById('intro-screen');
const assessmentScreen = document.getElementById('assessment-screen');
const contactScreen = document.getElementById('contact-screen');
const resultsScreen = document.getElementById('results-screen');
const assessmentForm = document.getElementById('assessment-form');
const contactForm = document.getElementById('contact-form');
const progressBar = document.getElementById('progress-bar');
const progressPercentage = document.getElementById('progress-percentage');

// State
let answers = {};
let pillarScores = {};
let overallScore = 0;

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    // Event Listeners
    document.getElementById('start-assessment').addEventListener('click', startAssessment);
    document.getElementById('calculate-score').addEventListener('click', calculateScore);
    contactForm.addEventListener('submit', handleContactSubmit);

    // Initialize forms
    initializeAssessmentForm();
});

function startAssessment() {
    introScreen.classList.add('hidden');
    assessmentScreen.classList.remove('hidden');
    updateProgress();
}

function initializeAssessmentForm() {
    let formHTML = '';
    
    // Add questions for each pillar
    Object.entries(questions).forEach(([pillarId, pillar]) => {
        formHTML += `
            <div class="mb-8">
                <h3 class="text-xl font-semibold mb-4">${pillar.name}</h3>
                <div class="space-y-6">
                    ${pillar.questions.map((question, index) => `
                        <div class="question-group" data-question-id="${question.id}">
                            <p class="text-lg font-medium mb-3">${question.text}</p>
                            <div class="space-y-2">
                                ${question.options.map((option, optionIndex) => `
                                    <label class="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                                        <input type="radio" name="${question.id}" value="${optionIndex + 1}" class="mr-3" required>
                                        <span>${option}</span>
                                    </label>
                                `).join('')}
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    });

    assessmentForm.innerHTML = formHTML;

    // Add event listeners to radio buttons
    assessmentForm.querySelectorAll('input[type="radio"]').forEach(radio => {
        radio.addEventListener('change', updateProgress);
    });
}

function updateProgress() {
    const totalQuestions = Object.values(questions).reduce((sum, pillar) => sum + pillar.questions.length, 0);
    const answeredQuestions = assessmentForm.querySelectorAll('input[type="radio"]:checked').length;
    const progress = (answeredQuestions / totalQuestions) * 100;
    
    progressBar.style.width = `${progress}%`;
    progressPercentage.textContent = `${Math.round(progress)}%`;
}

function calculateScore() {
    // Validate all questions are answered
    const unansweredQuestions = assessmentForm.querySelectorAll('.question-group').length - 
                               assessmentForm.querySelectorAll('input[type="radio"]:checked').length;
    
    if (unansweredQuestions > 0) {
        alert(`Please answer all ${unansweredQuestions} remaining questions.`);
        return;
    }

    // Calculate scores
    answers = {};
    pillarScores = {};
    let totalScore = 0;
    let totalQuestions = 0;

    Object.entries(questions).forEach(([pillarId, pillar]) => {
        let pillarScore = 0;
        let pillarQuestionCount = pillar.questions.length;

        pillar.questions.forEach(question => {
            const selectedOption = assessmentForm.querySelector(`input[name="${question.id}"]:checked`);
            if (selectedOption) {
                const score = parseInt(selectedOption.value);
                answers[question.id] = score;
                
                // Special case for Q3.3 "Not Applicable"
                if (question.id === 'q3.3' && selectedOption.nextElementSibling.textContent === 'Not Applicable') {
                    pillarQuestionCount--;
                } else {
                    pillarScore += score;
                }
            }
        });

        pillarScores[pillarId] = {
            score: pillarScore,
            questionCount: pillarQuestionCount,
            average: pillarScore / pillarQuestionCount
        };

        totalScore += pillarScore;
        totalQuestions += pillarQuestionCount;
    });

    overallScore = totalScore / totalQuestions;

    // Show contact screen
    assessmentScreen.classList.add('hidden');
    contactScreen.classList.remove('hidden');
}

function handleContactSubmit(e) {
    e.preventDefault();
    
    // Validate form
    const formData = new FormData(contactForm);
    const contactInfo = {
        name: formData.get('name'),
        business: formData.get('business'),
        email: formData.get('email'),
        phone: formData.get('phone')
    };

    // In a real application, you would send this data to your backend
    console.log('Contact Info:', contactInfo);
    console.log('Assessment Answers:', answers);
    console.log('Pillar Scores:', pillarScores);
    console.log('Overall Score:', overallScore);

    // Show results
    displayResults();
    contactScreen.classList.add('hidden');
    resultsScreen.classList.remove('hidden');
}

function displayResults() {
    // Update overall score
    const overallScoreElement = document.getElementById('overall-score');
    const overallScoreValue = document.getElementById('overall-score-value');
    const overallRiskLevel = document.getElementById('overall-risk-level');
    
    const overallRisk = getRiskLevel(overallScore);
    overallScoreElement.className = `mb-8 p-6 rounded-lg text-center ${overallRisk.color}`;
    overallScoreValue.textContent = overallScore.toFixed(1);
    overallRiskLevel.textContent = overallRisk.text;

    // Update pillar scores
    const pillarScoresContainer = document.querySelector('.grid.grid-cols-1.md\\:grid-cols-2');
    pillarScoresContainer.innerHTML = '';

    Object.entries(questions).forEach(([pillarId, pillar]) => {
        const pillarScore = pillarScores[pillarId];
        const risk = getRiskLevel(pillarScore.average);
        
        pillarScoresContainer.innerHTML += `
            <div class="p-4 rounded-lg ${risk.color}">
                <h4 class="font-semibold mb-2">${pillar.name}</h4>
                <div class="text-2xl font-bold mb-1">${pillarScore.average.toFixed(1)}</div>
                <div class="font-medium">${risk.text}</div>
            </div>
        `;
    });

    // Update key findings
    const keyFindingsContainer = document.getElementById('key-findings');
    const highRiskPillars = Object.entries(pillarScores)
        .filter(([_, score]) => score.average > 1.5)
        .sort((a, b) => b[1].average - a[1].average);

    if (highRiskPillars.length === 0) {
        keyFindingsContainer.innerHTML = `
            <p class="text-green-700">
                Congratulations! Your business shows strong cash flow protection across all areas. 
                Regular reviews are still important to maintain this position.
            </p>
        `;
    } else {
        keyFindingsContainer.innerHTML = highRiskPillars.map(([pillarId, score]) => `
            <div class="flex items-start">
                <svg class="h-5 w-5 text-red-500 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                </svg>
                <div>
                    <strong>${questions[pillarId].name}:</strong> 
                    ${getRiskRecommendation(pillarId, score.average)}
                </div>
            </div>
        `).join('');
    }
}

function getRiskLevel(score) {
    if (score <= 1.5) return riskLevels.low;
    if (score <= 2.5) return riskLevels.medium;
    if (score <= 3.5) return riskLevels.high;
    return riskLevels.critical;
}

function getRiskRecommendation(pillarId, score) {
    const riskLevel = getRiskLevel(score);
    const pillar = questions[pillarId];
    
    switch (pillarId) {
        case 'pillar1':
            return `Consider developing a comprehensive business continuity plan and cross-training program to reduce operational disruption risks.`;
        case 'pillar2':
            return `Implement formal safety protocols and workers' compensation management to protect your workforce and reduce liability.`;
        case 'pillar3':
            return `Review your liability coverage and implement stronger risk management practices to protect against lawsuits.`;
        case 'pillar4':
            return `Build cash reserves and diversify revenue streams to improve financial shock absorption.`;
        default:
            return `Review your ${pillar.name.toLowerCase()} practices to reduce risk exposure.`;
    }
} 
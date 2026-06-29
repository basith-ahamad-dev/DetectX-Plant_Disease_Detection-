document.addEventListener('DOMContentLoaded', () => {
    // --- Navbar & Scroll Effects ---
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // --- Scroll Reveal Animation ---
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Stop observing once revealed
            }
        });
    };

    const revealOptions = {
        threshold: 0.15, // Trigger when 15% visible
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver(revealCallback, revealOptions);
    
    revealElements.forEach(el => revealObserver.observe(el));

    // --- App State Elements ---
    const stateUpload = document.getElementById('upload-state');
    const stateProcessing = document.getElementById('processing-state');
    const stateResults = document.getElementById('results-state');

    // --- Upload Elements ---
    const dropZone = document.getElementById('drop-zone');
    const fileInput = document.getElementById('file-input');
    const browseBtn = document.getElementById('browse-btn');
    const uploadPrompt = document.getElementById('upload-prompt');
    const previewContainer = document.getElementById('preview-container');
    const imagePreviewUpload = document.getElementById('image-preview-upload');
    const removeImgBtn = document.getElementById('remove-img-btn');
    const analyzeBtn = document.getElementById('analyze-btn');

    // --- Processing Elements ---
    const imagePreviewProcessing = document.getElementById('image-preview-processing');

    // --- Results Elements ---
    const imagePreviewResults = document.getElementById('image-preview-results');
    const resetBtn = document.getElementById('reset-btn');
    
    // Result Data Elements (For mocking)
    const resultDisease = document.getElementById('result-disease');
    const resultConfidence = document.getElementById('result-confidence');
    const resultCause = document.getElementById('result-cause');
    const resultTreatment = document.getElementById('result-treatment');

    // --- State Variable ---
    let currentFile = null;

    // --- Mock Data for Results ---
    const mockDiseases = [
        {
            name: "Tomato Early Blight",
            confidence: "94% Match",
            cause: "Caused by the fungus <em>Alternaria solani</em>. Symptoms include small black or brown spots, usually beginning on older leaves. The spots often have a concentric ring pattern.",
            treatments: [
                "Prune and destroy infected lower leaves.",
                "Apply copper-based fungicides immediately.",
                "Improve air circulation by spacing plants.",
                "Water at the base to keep foliage dry."
            ],
            type: "danger"
        },
        {
            name: "Apple Scab",
            confidence: "89% Match",
            cause: "Caused by the fungus <em>Venturia inaequalis</em>. Overwinters in fallen leaves and infects newly developing foliage in spring during wet weather.",
            treatments: [
                "Rake and dispose of fallen leaves in autumn.",
                "Apply appropriate fungicides in early spring.",
                "Plant resistant apple varieties if possible.",
                "Prune trees to allow sunlight and air to penetrate."
            ],
            type: "danger"
        },
        {
            name: "Healthy Leaf",
            confidence: "98% Match",
            cause: "No apparent diseases detected. The leaf exhibits normal coloration, venation, and structural integrity.",
            treatments: [
                "Continue current watering schedule.",
                "Maintain appropriate nutrient levels.",
                "Regularly inspect for early signs of pests."
            ],
            type: "success"
        }
    ];

    // --- Event Listeners: Upload ---
    
    // Browse Button Click -> Trigger File Input
    browseBtn.addEventListener('click', () => {
        fileInput.click();
    });

    // File Input Change
    fileInput.addEventListener('change', (e) => {
        if (e.target.files.length > 0) {
            handleFile(e.target.files[0]);
        }
    });

    // Drag and Drop Events
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropZone.addEventListener(eventName, preventDefaults, false);
    });

    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    ['dragenter', 'dragover'].forEach(eventName => {
        dropZone.addEventListener(eventName, () => {
            dropZone.classList.add('drag-active');
        }, false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
        dropZone.addEventListener(eventName, () => {
            dropZone.classList.remove('drag-active');
        }, false);
    });

    dropZone.addEventListener('drop', (e) => {
        let dt = e.dataTransfer;
        let files = dt.files;

        if (files.length > 0) {
            if (files[0].type.startsWith('image/')) {
                handleFile(files[0]);
            } else {
                alert("Please upload an image file.");
            }
        }
    });

    // Remove Image Button
    removeImgBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent triggering other clicks
        resetUploadState();
    });

    // Analyze Button
    analyzeBtn.addEventListener('click', () => {
        if (currentFile) {
            transitionToProcessing();
        }
    });

    // Reset Button
    resetBtn.addEventListener('click', () => {
        resetApp();
    });


    // --- Core Functions ---

    function handleFile(file) {
        currentFile = file;
        
        // Read file for preview
        const reader = new FileReader();
        reader.onload = (e) => {
            const imgSrc = e.target.result;
            
            // Set image sources
            imagePreviewUpload.src = imgSrc;
            imagePreviewProcessing.src = imgSrc;
            imagePreviewResults.src = imgSrc;
            
            // Update UI State
            uploadPrompt.classList.add('hidden');
            previewContainer.classList.remove('hidden');
            
            // Enable button
            analyzeBtn.disabled = false;
        };
        reader.readAsDataURL(file);
    }

    function resetUploadState() {
        currentFile = null;
        fileInput.value = "";
        
        imagePreviewUpload.src = "";
        
        previewContainer.classList.add('hidden');
        uploadPrompt.classList.remove('hidden');
        
        analyzeBtn.disabled = true;
    }

    function transitionToProcessing() {
        // Hide Upload State, Show Processing
        switchState(stateUpload, stateProcessing);
        
        // Simulate API call/Processing delay (e.g., 3-4 seconds)
        const processingTime = Math.floor(Math.random() * 2000) + 2500;
        
        setTimeout(() => {
            populateResults();
            transitionToResults();
        }, processingTime);
    }

    function transitionToResults() {
        switchState(stateProcessing, stateResults);
    }

    function resetApp() {
        resetUploadState();
        switchState(stateResults, stateUpload);
        
        // Scroll back up to the scanner section smoothly
        document.getElementById('scanner-section').scrollIntoView({ behavior: 'smooth' });
    }

    function switchState(oldState, newState) {
        oldState.classList.remove('active');
        
        // Small delay to allow fade out before fade in
        setTimeout(() => {
            oldState.classList.add('hidden');
            newState.classList.remove('hidden');
            
            // Trigger reflow to ensure transition works
            void newState.offsetWidth; 
            
            newState.classList.add('active');
        }, 300); // Matches CSS transition duration
    }

    function populateResults() {
        // Randomly select a mock result
        const randomIdx = Math.floor(Math.random() * mockDiseases.length);
        const data = mockDiseases[randomIdx];
        
        resultDisease.textContent = data.name;
        
        // Style badge based on type
        if(data.type === 'success') {
            resultDisease.style.backgroundColor = 'rgba(74, 222, 128, 0.1)';
            resultDisease.style.color = '#166534';
            resultDisease.style.borderColor = 'rgba(74, 222, 128, 0.3)';
        } else {
            resultDisease.style.backgroundColor = 'rgba(220, 38, 38, 0.1)';
            resultDisease.style.color = '#b91c1c';
            resultDisease.style.borderColor = 'rgba(220, 38, 38, 0.2)';
        }
        
        // Use regex to keep the icon but replace the text
        const currentHTML = resultConfidence.innerHTML;
        const svgMatch = currentHTML.match(/<svg.*?>.*?<\/svg>/s);
        const svgStr = svgMatch ? svgMatch[0] : '';
        resultConfidence.innerHTML = `${svgStr} ${data.confidence}`;
        
        resultCause.innerHTML = data.cause;
        
        // Build list items
        let listHTML = '';
        data.treatments.forEach(item => {
            listHTML += `<li>${item}</li>`;
        });
        resultTreatment.innerHTML = listHTML;
    }
});

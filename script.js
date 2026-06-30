let currentUploadedFile = null;

function populateResultsUI(pred) {
    const { category, disease, data, confidence } = pred;
    
    // Header logic
    const isHealthy = disease === 'Healthy';
    const iconBg = document.getElementById('result-icon-bg');
    const icon = document.getElementById('result-icon');
    const header = document.getElementById('result-header');
    
    if (isHealthy) {
        iconBg.className = "w-12 h-12 bg-primary text-on-primary rounded-full flex items-center justify-center";
        icon.textContent = "check_circle";
        header.textContent = "Plant is Healthy";
        header.className = "text-xl md:text-2xl font-bold font-display-lg text-primary";
    } else {
        iconBg.className = "w-12 h-12 bg-error text-on-error rounded-full flex items-center justify-center";
        icon.textContent = "warning";
        header.textContent = "Disease Detected";
        header.className = "text-xl md:text-2xl font-bold font-display-lg text-error";
    }
    
    document.getElementById('result-confidence').textContent = `Detection Confidence: ${confidence}%`;
    document.getElementById('result-category').textContent = category;
    
    document.getElementById('result-title').textContent = disease === 'Healthy' ? `${category} (Healthy)` : `${category} ${disease}`;
    document.getElementById('result-subtitle').innerHTML = data.subtitle || '<i>No additional info</i>';
    
    // Tags
    const tagsContainer = document.getElementById('result-tags');
    tagsContainer.innerHTML = '';
    if (data.tags) {
        data.tags.forEach(tag => {
            let colorClass = 'bg-surface-container-high text-on-surface-variant';
            if (tag.includes('Healthy') || tag.includes('Treatable')) colorClass = 'bg-primary-container text-on-primary-container';
            else if (tag.includes('Infection') || tag.includes('Risk') || tag.includes('Virus')) colorClass = 'bg-error-container text-on-error-container';
            
            tagsContainer.innerHTML += `<span class="px-3 py-1 rounded-full ${colorClass} text-sm font-bold">${tag}</span>`;
        });
    }
    
    // Symptoms
    const symptomsContainer = document.getElementById('result-symptoms');
    symptomsContainer.innerHTML = '';
    if (data.symptoms) {
        data.symptoms.forEach(sym => {
            symptomsContainer.innerHTML += `<li class="flex items-start gap-2"><span class="w-1.5 h-1.5 rounded-full bg-primary mt-2"></span> ${sym}</li>`;
        });
    }
    
    // Treatments
    const treatmentsContainer = document.getElementById('result-treatments');
    treatmentsContainer.innerHTML = '';
    if (data.treatments) {
        data.treatments.forEach(trt => {
            let borderColor = 'border-primary';
            let textColor = 'text-primary';
            if (trt.color === 'error') { borderColor = 'border-error'; textColor = 'text-error'; }
            else if (trt.color === 'secondary') { borderColor = 'border-secondary'; textColor = 'text-secondary'; }
            
            treatmentsContainer.innerHTML += `
            <div class="p-4 bg-surface-container-low rounded-xl border-l-4 ${borderColor}">
                <p class="font-bold ${textColor} mb-1">${trt.type}</p>
                <p class="text-sm">${trt.desc}</p>
            </div>`;
        });
    }
}

function handleFile(file) {
    if (!file || !file.type.startsWith('image/')) return;
    currentUploadedFile = file;
    
    const reader = new FileReader();
    reader.onload = function(e) {
        const imgData = e.target.result;
        document.getElementById('image-preview').src = imgData;
        document.getElementById('processing-image').src = imgData;
        document.getElementById('results-image').src = imgData;
        document.getElementById('file-name').textContent = file.name;
        document.getElementById('upload-prompt').classList.add('hidden');
        document.getElementById('image-preview-container').classList.remove('hidden');
        
        const analyzeBtn = document.getElementById('analyze-btn');
        analyzeBtn.classList.remove('opacity-50', 'pointer-events-none');
        analyzeBtn.removeAttribute('disabled');
    };
    reader.readAsDataURL(file);
}

function handleFileSelect(event) {
    const file = event.target.files[0];
    handleFile(file);
}

function handleDrop(event) {
    const file = event.dataTransfer.files[0];
    handleFile(file);
}

function resetUpload(event) {
    if (event) event.stopPropagation();
    document.getElementById('file-input').value = '';
    document.getElementById('image-preview').src = '';
    document.getElementById('file-name').textContent = '';
    
    document.getElementById('image-preview-container').classList.add('hidden');
    document.getElementById('upload-prompt').classList.remove('hidden');
    
    const analyzeBtn = document.getElementById('analyze-btn');
    analyzeBtn.classList.add('opacity-50', 'pointer-events-none');
    analyzeBtn.setAttribute('disabled', 'true');
}

async function transitionState(targetId) {
    document.querySelectorAll('[id^="state-"]').forEach(el => el.classList.add('state-hidden'));
    const target = document.getElementById(targetId);
    target.classList.remove('state-hidden');
    
    if (targetId === 'state-processing') {
        const bar = document.getElementById('progress-bar');
        const text = document.getElementById('percent-text');
        
        // Start a visual progress bar
        let progress = 0;
        const interval = setInterval(() => {
            if (progress < 90) {
                progress += Math.random() * 10;
                bar.style.width = progress + '%';
                text.innerText = Math.floor(progress) + '%';
            }
        }, 300);

        try {
            const formData = new FormData();
            formData.append('image', currentUploadedFile);
            
            const response = await fetch('/predict', {
                method: 'POST',
                body: formData
            });
            
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            
            const result = await response.json();
            
            // Complete the progress bar
            clearInterval(interval);
            bar.style.width = '100%';
            text.innerText = '100%';
            
            // Backend now provides the exact MySQL database row!
            const pred = {
                category: result.disease_info.category,
                disease: result.disease_info.disease,
                data: result.disease_info,
                confidence: result.confidence
            };
            
            setTimeout(() => {
                populateResultsUI(pred);
                transitionState('state-results');
            }, 500);
            
        } catch (error) {
            console.error("Prediction failed:", error);
            clearInterval(interval);
            alert("Failed to analyze image. Ensure the Python backend and MySQL are running.");
            
            // Fallback to error UI (or simple static demo) if backend fails
            bar.style.width = '100%';
            text.innerText = 'Error';
        }
    }
}
function toggleMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    const icon = document.querySelector('#mobile-menu-btn span');
    if (menu.classList.contains('translate-x-full')) {
        menu.classList.remove('translate-x-full');
        icon.textContent = 'close';
        document.body.classList.add('overflow-hidden');
    } else {
        menu.classList.add('translate-x-full');
        icon.textContent = 'menu';
        document.body.classList.remove('overflow-hidden');
    }
}

function loadMorePlants() {
    const extraPlants = document.querySelectorAll('.extra-plant');
    extraPlants.forEach(plant => {
        plant.classList.remove('hidden');
    });
    document.getElementById('load-more-container').classList.add('hidden');
}

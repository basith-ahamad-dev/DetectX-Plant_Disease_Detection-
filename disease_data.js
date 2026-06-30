const modelClasses = [
    { category: "Apple", disease: "Apple Scab" },
    { category: "Apple", disease: "Black Rot" },
    { category: "Apple", disease: "Cedar Apple Rust" },
    { category: "Apple", disease: "Healthy" },
    { category: "Blueberry", disease: "Healthy" },
    { category: "Cherry (including sour)", disease: "Powdery Mildew" },
    { category: "Cherry (including sour)", disease: "Healthy" },
    { category: "Corn (Maize)", disease: "Cercospora Leaf Spot / Gray Leaf Spot" },
    { category: "Corn (Maize)", disease: "Common Rust" },
    { category: "Corn (Maize)", disease: "Northern Leaf Blight" },
    { category: "Corn (Maize)", disease: "Healthy" },
    { category: "Grape", disease: "Black Rot" },
    { category: "Grape", disease: "Esca (Black Measles)" },
    { category: "Grape", disease: "Leaf Blight (Isariopsis Leaf Spot)" },
    { category: "Grape", disease: "Healthy" },
    { category: "Orange", disease: "Huanglongbing (Citrus Greening)" },
    { category: "Peach", disease: "Bacterial Spot" },
    { category: "Peach", disease: "Healthy" },
    { category: "Pepper (Bell)", disease: "Bacterial Spot" },
    { category: "Pepper (Bell)", disease: "Healthy" },
    { category: "Potato", disease: "Early Blight" },
    { category: "Potato", disease: "Late Blight" },
    { category: "Potato", disease: "Healthy" },
    { category: "Raspberry", disease: "Healthy" },
    { category: "Soybean", disease: "Healthy" },
    { category: "Squash", disease: "Powdery Mildew" },
    { category: "Strawberry", disease: "Leaf Scorch" },
    { category: "Strawberry", disease: "Healthy" },
    { category: "Tomato", disease: "Bacterial Spot" },
    { category: "Tomato", disease: "Early Blight" },
    { category: "Tomato", disease: "Late Blight" },
    { category: "Tomato", disease: "Leaf Mold" },
    { category: "Tomato", disease: "Septoria Leaf Spot" },
    { category: "Tomato", disease: "Spider Mites (Two-Spotted Spider Mite)" },
    { category: "Tomato", disease: "Target Spot" },
    { category: "Tomato", disease: "Tomato Yellow Leaf Curl Virus" },
    { category: "Tomato", disease: "Tomato Mosaic Virus" },
    { category: "Tomato", disease: "Healthy" }
];

const diseaseData = {
    "Apple": {
        "Apple Scab": {
            subtitle: "Venturia inaequalis",
            tags: ["Fungal Infection", "Treatable", "Common in Spring"],
            symptoms: [
                "Olive green to black spots on leaves",
                "Leaves may turn yellow and drop prematurely",
                "Scabby, dark lesions on the fruit surface"
            ],
            treatments: [
                { type: "Organic", color: "primary", desc: "Rake and destroy fallen leaves. Apply neem oil or sulfur." },
                { type: "Cultural", color: "secondary", desc: "Prune trees to increase air circulation and light penetration." }
            ]
        },
        "Black Rot": {
            subtitle: "Botryosphaeria obtusa",
            tags: ["Fungal Infection", "High Risk", "Affects Fruit and Leaves"],
            symptoms: [
                "Purple spots on upper leaf surface",
                "Spots enlarge with a tan center and dark border",
                "Fruit develops brown rot, eventually shriveling into black 'mummies'"
            ],
            treatments: [
                { type: "Organic", color: "primary", desc: "Remove and destroy infected plant parts, including mummified fruit." },
                { type: "Chemical", color: "error", desc: "Apply appropriate fungicides during the growing season." }
            ]
        },
        "Cedar Apple Rust": {
            subtitle: "Gymnosporangium juniperi-virginianae",
            tags: ["Fungal Infection", "Requires Alternate Host"],
            symptoms: [
                "Bright yellow-orange spots on upper leaf surfaces",
                "Fungal spores on the underside of leaves",
                "Can cause premature defoliation and fruit distortion"
            ],
            treatments: [
                { type: "Cultural", color: "secondary", desc: "Remove nearby cedar trees (alternate host) if possible." },
                { type: "Preventative", color: "primary", desc: "Apply preventative fungicides before symptoms appear." }
            ]
        },
        "Healthy": {
            subtitle: "No disease detected",
            tags: ["Healthy", "Optimal Condition"],
            symptoms: ["No visible signs of infection or distress.", "Leaves have uniform color and normal shape."],
            treatments: [
                { type: "Maintenance", color: "primary", desc: "Continue regular watering and fertilization schedules." }
            ]
        }
    },
    "Blueberry": {
        "Healthy": {
            subtitle: "No disease detected",
            tags: ["Healthy", "Optimal Condition"],
            symptoms: ["No visible signs of infection.", "Leaves are vibrant green without spots or blights."],
            treatments: [
                { type: "Maintenance", color: "primary", desc: "Ensure soil remains acidic and well-drained. Mulch regularly." }
            ]
        }
    },
    "Cherry (including sour)": {
        "Powdery Mildew": {
            subtitle: "Podosphaera clandestina",
            tags: ["Fungal Infection", "Treatable", "Thrives in High Humidity"],
            symptoms: [
                "White, powdery fungal growth on leaves and shoots",
                "Leaves may become distorted or stunted",
                "Premature leaf drop in severe cases"
            ],
            treatments: [
                { type: "Organic", color: "primary", desc: "Apply sulfur or potassium bicarbonate sprays." },
                { type: "Cultural", color: "secondary", desc: "Ensure proper spacing and prune for better air circulation." }
            ]
        },
        "Healthy": {
            subtitle: "No disease detected",
            tags: ["Healthy", "Optimal Condition"],
            symptoms: ["Leaves are smooth and free of spots or powdery residue."],
            treatments: [
                { type: "Maintenance", color: "primary", desc: "Keep trees adequately watered, especially during dry spells." }
            ]
        }
    },
    "Corn (Maize)": {
        "Cercospora Leaf Spot / Gray Leaf Spot": {
            subtitle: "Cercospora zeae-maydis",
            tags: ["High Yield Risk", "Fungal Infection"],
            symptoms: [
                "Small, tan rectangular spots restricted by leaf veins",
                "Lesions elongate and turn gray over time",
                "Severe blighting reduces photosynthetic area"
            ],
            treatments: [
                { type: "Cultural", color: "secondary", desc: "Practice crop rotation and manage crop residue." },
                { type: "Preventative", color: "primary", desc: "Plant resistant hybrids." }
            ]
        },
        "Common Rust": {
            subtitle: "Puccinia sorghi",
            tags: ["Fungal Infection", "Spores Spread by Wind"],
            symptoms: [
                "Small, circular to elongate reddish-brown pustules on both leaf surfaces",
                "Pustules rupture to release powdery spores",
                "Leaves may yellow and die prematurely"
            ],
            treatments: [
                { type: "Preventative", color: "primary", desc: "Use rust-resistant corn varieties." },
                { type: "Chemical", color: "error", desc: "Foliar fungicides may be applied if detected early." }
            ]
        },
        "Northern Leaf Blight": {
            subtitle: "Exserohilum turcicum",
            tags: ["Fungal Infection", "Favors Moderate Temperatures"],
            symptoms: [
                "Large, cigar-shaped grayish-green to tan lesions",
                "Lesions first appear on lower leaves",
                "Significant reduction in yield if established early"
            ],
            treatments: [
                { type: "Cultural", color: "secondary", desc: "Rotate crops and bury infected plant residue." },
                { type: "Chemical", color: "error", desc: "Apply fungicides during early growth stages." }
            ]
        },
        "Healthy": {
            subtitle: "No disease detected",
            tags: ["Healthy", "Optimal Condition"],
            symptoms: ["Leaves are broad, green, and lack lesions or pustules."],
            treatments: [
                { type: "Maintenance", color: "primary", desc: "Maintain proper nitrogen levels and soil moisture." }
            ]
        }
    },
    "Grape": {
        "Black Rot": {
            subtitle: "Guignardia bidwellii",
            tags: ["Fungal Infection", "Devastating to Fruit"],
            symptoms: [
                "Small, light brown circular spots on leaves with dark borders",
                "Grapes develop white spots that enlarge rapidly",
                "Berries shrivel into hard, black mummies"
            ],
            treatments: [
                { type: "Organic", color: "primary", desc: "Remove all mummified fruit from vines and ground." },
                { type: "Chemical", color: "error", desc: "Apply fungicides from early shoot growth through fruit set." }
            ]
        },
        "Esca (Black Measles)": {
            subtitle: "Various Fungi (Phaeoacremonium, etc.)",
            tags: ["Wood Disease", "Complex Infection"],
            symptoms: [
                "Tiger-stripe pattern (yellowing/browning between veins) on leaves",
                "Small, dark spots ('measles') on berries",
                "Sudden wilting or dieback of vines"
            ],
            treatments: [
                { type: "Cultural", color: "secondary", desc: "Remove and burn infected vines or cordons." },
                { type: "Preventative", color: "primary", desc: "Protect pruning wounds and sanitize tools." }
            ]
        },
        "Leaf Blight (Isariopsis Leaf Spot)": {
            subtitle: "Pseudocercospora vitis",
            tags: ["Fungal Infection", "Late Season"],
            symptoms: [
                "Irregular dark red to brown spots on leaves",
                "Severe infection causes leaves to dry up and fall off",
                "Reduces vine vigor for the following year"
            ],
            treatments: [
                { type: "Cultural", color: "secondary", desc: "Ensure good canopy management for airflow." },
                { type: "Chemical", color: "error", desc: "Apply post-harvest copper sprays if severe." }
            ]
        },
        "Healthy": {
            subtitle: "No disease detected",
            tags: ["Healthy", "Optimal Condition"],
            symptoms: ["Leaves are evenly colored and free of spots, holes, or mildew."],
            treatments: [
                { type: "Maintenance", color: "primary", desc: "Continue standard pruning and pest monitoring." }
            ]
        }
    },
    "Orange": {
        "Huanglongbing (Citrus Greening)": {
            subtitle: "Candidatus Liberibacter asiaticus",
            tags: ["Bacterial Infection", "Incurable", "Insect Vector"],
            symptoms: [
                "Asymmetrical yellow mottling on leaves",
                "Fruit remains partially green, is misshapen, and tastes bitter",
                "Severe twig dieback and tree decline"
            ],
            treatments: [
                { type: "Extreme", color: "error", desc: "Remove and destroy infected trees immediately." },
                { type: "Preventative", color: "secondary", desc: "Control Asian citrus psyllid populations." }
            ]
        }
    },
    "Peach": {
        "Bacterial Spot": {
            subtitle: "Xanthomonas campestris pv. pruni",
            tags: ["Bacterial Infection", "Spreads via Rain"],
            symptoms: [
                "Small, water-soaked spots on leaves that turn angular and purple-black",
                "Centers of spots may fall out ('shot-hole' appearance)",
                "Sunken, dark lesions on fruit"
            ],
            treatments: [
                { type: "Cultural", color: "secondary", desc: "Plant resistant varieties." },
                { type: "Chemical", color: "error", desc: "Apply copper-based bactericides in fall and early spring." }
            ]
        },
        "Healthy": {
            subtitle: "No disease detected",
            tags: ["Healthy", "Optimal Condition"],
            symptoms: ["Leaves are intact without shot-holes or spots."],
            treatments: [
                { type: "Maintenance", color: "primary", desc: "Continue standard orchard management." }
            ]
        }
    },
    "Pepper (Bell)": {
        "Bacterial Spot": {
            subtitle: "Xanthomonas campestris pv. vesicatoria",
            tags: ["Bacterial Infection", "Loves Humidity"],
            symptoms: [
                "Small, yellowish-green spots on older leaves",
                "Spots darken and become slightly raised and scab-like",
                "Severe leaf drop exposes fruit to sunscald"
            ],
            treatments: [
                { type: "Organic", color: "primary", desc: "Use disease-free seed and practice crop rotation." },
                { type: "Chemical", color: "error", desc: "Apply copper sprays regularly, especially during wet weather." }
            ]
        },
        "Healthy": {
            subtitle: "No disease detected",
            tags: ["Healthy", "Optimal Condition"],
            symptoms: ["Leaves are dark green and unblemished."],
            treatments: [
                { type: "Maintenance", color: "primary", desc: "Maintain steady watering to prevent blossom end rot." }
            ]
        }
    },
    "Potato": {
        "Early Blight": {
            subtitle: "Alternaria solani",
            tags: ["Fungal Infection", "Starts on Lower Leaves"],
            symptoms: [
                "Dark, circular spots with concentric rings (target board pattern)",
                "Surrounding tissue may turn yellow",
                "Can cause defoliation and reduced tuber yield"
            ],
            treatments: [
                { type: "Organic", color: "primary", desc: "Ensure proper crop rotation and remove infected debris." },
                { type: "Chemical", color: "error", desc: "Apply appropriate fungicides preventatively." }
            ]
        },
        "Late Blight": {
            subtitle: "Phytophthora infestans",
            tags: ["Oomycete", "Highly Destructive", "Fast Spreading"],
            symptoms: [
                "Irregular, water-soaked spots on leaves",
                "White, fuzzy growth on the underside of leaves in humid conditions",
                "Tubers develop dark, sunken lesions and rot"
            ],
            treatments: [
                { type: "Extreme", color: "error", desc: "Destroy infected plants immediately to prevent spread." },
                { type: "Preventative", color: "primary", desc: "Use certified disease-free seed potatoes." }
            ]
        },
        "Healthy": {
            subtitle: "No disease detected",
            tags: ["Healthy", "Optimal Condition"],
            symptoms: ["Leaves are healthy green and tubers develop normally."],
            treatments: [
                { type: "Maintenance", color: "primary", desc: "Keep potatoes hilled to protect tubers from sunlight." }
            ]
        }
    },
    "Raspberry": {
        "Healthy": {
            subtitle: "No disease detected",
            tags: ["Healthy", "Optimal Condition"],
            symptoms: ["Canes and leaves are growing robustly without spotting or wilting."],
            treatments: [
                { type: "Maintenance", color: "primary", desc: "Prune old canes to maintain airflow." }
            ]
        }
    },
    "Soybean": {
        "Healthy": {
            subtitle: "No disease detected",
            tags: ["Healthy", "Optimal Condition"],
            symptoms: ["Leaves are unblemished and pods are developing normally."],
            treatments: [
                { type: "Maintenance", color: "primary", desc: "Monitor for pests like aphids." }
            ]
        }
    },
    "Squash": {
        "Powdery Mildew": {
            subtitle: "Podosphaera xanthii",
            tags: ["Fungal Infection", "Common in Late Summer"],
            symptoms: [
                "White, powdery spots on upper and lower leaf surfaces",
                "Spots coalesce to cover entire leaves",
                "Leaves turn yellow and die, reducing fruit quality"
            ],
            treatments: [
                { type: "Organic", color: "primary", desc: "Apply neem oil or potassium bicarbonate." },
                { type: "Cultural", color: "secondary", desc: "Plant resistant varieties and avoid overhead watering." }
            ]
        }
    },
    "Strawberry": {
        "Leaf Scorch": {
            subtitle: "Diplocarpon earlianum",
            tags: ["Fungal Infection", "Affects Vigor"],
            symptoms: [
                "Irregular, purplish-brown spots on leaves",
                "Spots lack a distinct light center (unlike leaf spot)",
                "Severe infection causes leaves to dry up and look burned"
            ],
            treatments: [
                { type: "Cultural", color: "secondary", desc: "Remove dead leaves and improve air circulation." },
                { type: "Chemical", color: "error", desc: "Apply fungicides during early flowering." }
            ]
        },
        "Healthy": {
            subtitle: "No disease detected",
            tags: ["Healthy", "Optimal Condition"],
            symptoms: ["Leaves are green without scorching or spots."],
            treatments: [
                { type: "Maintenance", color: "primary", desc: "Provide adequate spacing and straw mulch." }
            ]
        }
    },
    "Tomato": {
        "Bacterial Spot": {
            subtitle: "Xanthomonas vesicatoria",
            tags: ["Bacterial Infection", "Wet Weather Spread"],
            symptoms: [
                "Small, dark, greasy spots on leaves",
                "Spots on fruit are raised, scabby, and brown",
                "Causes yellowing and dropping of leaves"
            ],
            treatments: [
                { type: "Cultural", color: "secondary", desc: "Avoid overhead watering. Use disease-free seeds." },
                { type: "Chemical", color: "error", desc: "Copper bactericide sprays can slow the spread." }
            ]
        },
        "Early Blight": {
            subtitle: "Alternaria solani",
            tags: ["Fungal Infection", "Treatable", "Seasonal: Summer"],
            symptoms: [
                "Concentric rings in leaf spots ('target' appearance)",
                "Yellow chlorotic halo around lesions",
                "Lower leaf defoliation"
            ],
            treatments: [
                { type: "Organic Correction", color: "primary", desc: "Remove infected lower leaves and apply copper-based fungicide or Neem oil solution every 7-14 days." },
                { type: "Cultural Practice", color: "secondary", desc: "Increase spacing between plants for better airflow and avoid overhead watering to keep foliage dry." }
            ]
        },
        "Late Blight": {
            subtitle: "Phytophthora infestans",
            tags: ["Oomycete", "Highly Destructive", "Rapid Spread"],
            symptoms: [
                "Large, dark, water-soaked lesions on leaves",
                "White fungal growth on the undersides of leaves",
                "Firm, dark brown lesions on fruit"
            ],
            treatments: [
                { type: "Extreme", color: "error", desc: "Immediately remove and destroy infected plants." },
                { type: "Preventative", color: "primary", desc: "Apply preventative fungicides prior to infection." }
            ]
        },
        "Leaf Mold": {
            subtitle: "Passalora fulva",
            tags: ["High Humidity Risk", "Greenhouse Problem"],
            symptoms: [
                "Pale green or yellowish spots on upper leaf surfaces",
                "Olive-green to brown velvety mold on the undersides",
                "Leaves eventually turn yellow and drop"
            ],
            treatments: [
                { type: "Cultural", color: "secondary", desc: "Increase ventilation and reduce humidity." },
                { type: "Organic", color: "primary", desc: "Remove infected leaves. Apply preventative sulfur sprays." }
            ]
        },
        "Septoria Leaf Spot": {
            subtitle: "Septoria lycopersici",
            tags: ["Fungal Infection", "Destroys Foliage"],
            symptoms: [
                "Numerous small, circular spots with dark borders and gray centers",
                "Tiny black fruiting bodies in the center of spots",
                "Starts on lower leaves and moves up"
            ],
            treatments: [
                { type: "Cultural", color: "secondary", desc: "Mulch around the base of the plant to prevent soil splashing." },
                { type: "Chemical", color: "error", desc: "Apply fungicides containing chlorothalonil." }
            ]
        },
        "Spider Mites (Two-Spotted Spider Mite)": {
            subtitle: "Tetranychus urticae",
            tags: ["Pest Infestation", "Thrives in Hot/Dry Conditions"],
            symptoms: [
                "Tiny yellow or white speckles on leaves (stippling)",
                "Fine webbing visible on the plant",
                "Leaves eventually turn yellow, dry up, and fall off"
            ],
            treatments: [
                { type: "Organic", color: "primary", desc: "Wash plants with a strong stream of water. Apply insecticidal soap or neem oil." },
                { type: "Biological", color: "secondary", desc: "Introduce predatory mites or ladybugs." }
            ]
        },
        "Target Spot": {
            subtitle: "Corynespora cassiicola",
            tags: ["Fungal Infection", "Also affects Fruit"],
            symptoms: [
                "Brown, circular lesions with concentric rings (similar to Early Blight)",
                "Fruit develops dark, sunken lesions",
                "Causes significant defoliation"
            ],
            treatments: [
                { type: "Cultural", color: "secondary", desc: "Ensure good airflow and avoid wetting the foliage." },
                { type: "Chemical", color: "error", desc: "Use targeted fungicides registered for Target Spot." }
            ]
        },
        "Tomato Yellow Leaf Curl Virus": {
            subtitle: "Begomovirus",
            tags: ["Viral Infection", "Transmitted by Whiteflies"],
            symptoms: [
                "Leaves are curled upward, yellowed, and stunted",
                "Plants appear bushy",
                "Flowers may fall off, resulting in poor fruit yield"
            ],
            treatments: [
                { type: "Extreme", color: "error", desc: "Remove and destroy infected plants. Virus is incurable." },
                { type: "Preventative", color: "primary", desc: "Control whitefly populations and use reflective mulches." }
            ]
        },
        "Tomato Mosaic Virus": {
            subtitle: "Tobamovirus",
            tags: ["Viral Infection", "Highly Contagious", "Mechanical Spread"],
            symptoms: [
                "Mottled light and dark green pattern on leaves",
                "Leaves may be fern-like or distorted",
                "Stunted plant growth and reduced yield"
            ],
            treatments: [
                { type: "Extreme", color: "error", desc: "Remove and destroy infected plants." },
                { type: "Preventative", color: "secondary", desc: "Wash hands thoroughly with soap after handling infected plants. Do not smoke around plants." }
            ]
        },
        "Healthy": {
            subtitle: "No disease detected",
            tags: ["Healthy", "Optimal Condition"],
            symptoms: ["Leaves are vibrant green, well-shaped, and free of spots or pests."],
            treatments: [
                { type: "Maintenance", color: "primary", desc: "Continue regular watering and fertilization schedules." }
            ]
        }
    }
};

function getPredictionFromIndex(index, confidence) {
    if (index < 0 || index >= modelClasses.length) {
        return null;
    }
    
    const mapping = modelClasses[index];
    const category = mapping.category;
    const disease = mapping.disease;
    const data = diseaseData[category][disease];
    
    return {
        category: category,
        disease: disease,
        data: data,
        confidence: confidence
    };
}

function getRandomPrediction() {
    const categories = Object.keys(diseaseData);
    const randomCategory = categories[Math.floor(Math.random() * categories.length)];
    
    const diseases = Object.keys(diseaseData[randomCategory]);
    const randomDisease = diseases[Math.floor(Math.random() * diseases.length)];
    
    return {
        category: randomCategory,
        disease: randomDisease,
        data: diseaseData[randomCategory][randomDisease],
        confidence: (Math.random() * (99 - 85) + 85).toFixed(1)
    };
}

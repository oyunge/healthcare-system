const pharmacies = [
  { name: 'Agakhan Hospital', location: [-1.2921, 36.8219] },
  { name: 'Nairobi Hospital', location: [-1.2915, 36.8203] },
  { name: 'Avenue Hospital', location: [-1.2910, 36.8190] },
  { name: 'Mpisha Hopsital', location: [-1.2927, 36.8225] },
  { name: 'Juja Hospital', location: [-1.2935, 36.8250] },
  { name: 'German Medical Center', location: [-1.2905, 36.8238] },
];

const diseases = [
  {
    name: 'Common Cold',
    symptoms: ['Runny nose','Chills', 'Body aches', 'Cough'],
    recommendedMedicines: ['Chlorpheniramine'],
    pharmacy: { name: 'Agakhan Hospital', location: [-1.2921, 36.8219]  },
    price: 'Ksh.350',
    preventation:"Do not take too much of cold drinks.",
    management: "Drink plenty of fluids. Water, juice, clear broth or warm lemon water are good choices. Avoid caffeine and alcohol, which can increase fluid loss",
    doctor: "General Physician"
  },
  {
    name: 'Flu',
    symptoms: ['Fever', 'Chills', 'Body aches', 'Cough'],
    recommendedMedicines: ['Oseltamivir '],
    pharmacy: { name: 'Juja Hospital', location: [-1.2915, 36.8203] },
    price: 'Ksh.400',
    preventation:"Remember that the flu can be more severe for certain populations, such as young children, the elderly, pregnant women, and individuals with compromised immune systems",
    management: "Drink plenty of liquids like choose water, juice and warm soups to prevent dehydration. Get more rest to help your immune system fight infection",
    doctor: "Clinical Officer"
  },
  {
    name: 'COVID-19',
    symptoms: ['Fever', 'Cough', 'Shortness of breath', 'Fatigue'],
    recommendedMedicines: ['Paracetamol', 'Ibuprofen'],
    pharmacy: { name:  'Mpisha Hopsital', location: [-1.2910, 36.8190]},
    price: 'Ksh.350',
    preventation:"Drink alot of water and take enough rest",
    management: "Good hygiene: Wash your hands frequently with soap and water for at least 20 seconds, especially after coughing, sneezing, or touching surfaces.",
    doctor: "General Consultant"
  },
  {
    name: 'Gingivitis',
    symptoms: ['swollen','bleeding gums'],
    recommendedMedicines: ['Chlorhexidine'],
    pharmacy: { name: 'Nairobi Hospital', location: [-1.2927, 36.8225] },
    price: 'Ksh.500',
    preventation:"Do not take sugarly things and maintain proper oral hygiene",
    management: "Maintaining good oral hygiene practices, including regular brushing, flossing, and professional dental cleanings, is key to preventing many dental and oral diseases. ",
    doctor: "Dentist"
  },
  {
    name: 'Dental Trauma',
    symptoms: ['Intense headache', 'Sensitivity to light or sound', 'Nausea or vomiting', 'Visual disturbances (aura)'],
    recommendedMedicines: [ 'Ibuprofen','Motrin'],
    pharmacy: { name: 'Juja Hospital', location: [-1.2935, 36.8250]  },
    price: 'Ksh.600',
    preventation:"Use of protective gears like a mouth guard and helmets should be worn by people involved in contact sports to decrease the impact of trauma in case of injury.",
    management: " Take prescribed medicine and apply a cold compress to the cheeks where swelling is present.",
    doctor:'Dental Technologist'
  },
  {
    name: 'Gastroenteritis (Stomach Flu)',
    symptoms: ['Nausea', 'Vomiting', 'Diarrhea', 'Stomach cramps'],
    recommendedMedicines: ['Acetaminophen'],
    pharmacy: { name: 'Agakhan Hospital', location: [-1.2905, 36.8238] },
    price: 'Ksh.250',
    preventation:"Avoid taking cold and heavy food",
    management: "Always wash your hands before you eat any food using your hands",
    doctor: "General Consultant"
  },
  {
    name: 'Cervical Cancer',
    symptoms: ['FevPelvic pain', 'Painful urination'],
    recommendedMedicines: ['Alymsys'],
    pharmacy: { name:  'Mpisha Hopsital', location: [-1.2910, 36.8190]},
    price: 'Ksh.7000',
    preventation:"Safe Sexual Practices: Practicing safe sex, including using condoms, can reduce the risk of HPV transmission.",
    management: "If cervical cancer is diagnosed, the management approach will depend on the stage and extent of the disease",
    doctor: "Cervical Cancer Surgeon"
  },
  {
    name: 'AIDS',
    symptoms: [ 'fever', 'fatigue' ,'sore throat'],
    recommendedMedicines: ['ARVS'],
    pharmacy: { name: 'German Medical Center', location: [-1.2927, 36.8225] },
    price: 'Ksh.1000',
    preventation:"Safe Sexual Practices: Use condoms consistently and correctly during sexual intercourse, and consider mutual monogamy or abstinence.",
    management: "HIV infection can be managed through antiretroviral therapy (ART), a combination of medications that suppress the virus's replication and help the immune system recover. ",
    doctor: "General Consultant"
  },
  {
    name: 'Malaria',
    symptoms: ['Headache', 'Anemia', 'Fatigue'],
    recommendedMedicines: ['Quinine'],
    pharmacy: { name: 'Mpisha Hospital', location: [-1.2905, 36.8238] },
    price: 'Ksh.700',
    preventation:"Sleep under a mosquito net",
    management: "Take medication ,always wash your hands before you eat any food using your hands",
    doctor: "General Physician"
  },
  {
    name: 'Malaria',
    symptoms: ['Headache', 'Anemia', 'Fatigue'],
    recommendedMedicines: ['Quinine'],
    pharmacy: { name: 'Mpisha Hospital', location: [-1.2905, 36.8238] },
    price: 'Ksh.700',
    preventation:"Sleep under a mosquito net",
    management: "Take medication ,always wash your hands before you eat any food using your hands",
    doctor: "General Physician"
  },
  {
    name: 'Asthma',
    symptoms: ['Wheezing', 'shortness of breath', ' chest tightness'],
    recommendedMedicines: ['Inhalers'],
    pharmacy: { name: 'Mpisha Hospital', location: [-1.2905, 36.8238] },
    price: 'Ksh.1500',
    preventation:"Avoiding triggers (allergens, smoke), maintaining indoor air quality",
    management: "Take medication ,Inhaler use, avoiding triggers, emergency action plan",
    doctor: " Pulmonologist"
  },
  {
    name: 'Coronary Artery Disease',
    symptoms: ['Fatigue', 'shortness of breath', ' chest pain'],
    recommendedMedicines: [' Antiplatelet drugs'],
    pharmacy: { name: 'Mpisha Hospital', location: [-1.2905, 36.8238] },
    price: 'Ksh.1800',
    preventation:" Healthy diet, regular exercise, not smoking",
    management: "Take medication ,avoiding triggers, emergency action plan",
    doctor: "Cardiologist "
  },
  {
    name: 'Hypertension',
    symptoms: ['Often asymptomatic', 'shortness of breath'],
    recommendedMedicines: [' ACE inhibitors'],
    pharmacy: { name: 'Mpisha Hospital', location: [-1.2905, 36.8238] },
    price: 'Ksh.1800',
    preventation:" Healthy diet, regular exercise",
    management: "Take medication ,lifestyle changes,regular blood pressure monitoring",
    doctor: "Cardiologist "
  },
   {
    name: 'Depression',
    symptoms: ['Persistent sadness', 'loss of interes'],
    recommendedMedicines: [' Antidepressants'],
    pharmacy: { name: 'Mpisha Hospital', location: [-1.2905, 36.8238] },
    price: 'Ksh.5000',
    preventation:" Stress management, regular exercise,Stress management",
    management: "Take medication ,lifestyle changes,Stress management",
    doctor: "Psychiatrist "
  },
  {
    name: 'Osteoarthritis',
    symptoms: ['Joint pain','stiffness'],
    recommendedMedicines: [' Acetaminophen'],
    pharmacy: { name: 'Mpisha Hospital', location: [-1.2905, 36.8238] },
    price: 'Ksh.5000',
    preventation:" Weight management, regular exercise",
    management: "Take medication ,assistive devices ,physical therapy",
    doctor: "Rheumatologist "
  },
  
];

  export {pharmacies, diseases}
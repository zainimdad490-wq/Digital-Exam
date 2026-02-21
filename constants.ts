
import { Question, SubjectKey } from './types';

export const ACADEMY_NAME = "Digitalize Academy";

export const SUBJECT_MARKS: Record<SubjectKey, number> = {
  'Islamic Studies': 100,
  'Urdu': 75,
  'Math': 75,
  'English': 75,
  'Pak Studies': 50,
  'Chemistry': 60,
  'Physics': 60,
  'Biology': 60,
  'Computer': 60,
  'Competitive': 200
};

export const MAX_ATTEMPTS = 3;
export const ADMIN_PIN = '9999';
export const BOOT_DURATION = 2000;
export const GAP_START_HOUR = 8;

const createQuestions = (subject: SubjectKey, data: {t: string, o: string[], c: number}[]): Question[] => {
  return data.map((d, i) => ({
    id: Math.floor(Math.random() * 10000000),
    subject,
    text: d.t,
    options: d.o,
    correctAnswer: d.c
  }));
};

export const QUESTIONS: Question[] = [
  ...createQuestions('Islamic Studies', [
    {t: "How many stages (Manzils) are in the Holy Quran?", o: ["5", "7", "10", "12"], c: 1},
    {t: "Which Sahabi is known as 'The Lion of Allah'?", o: ["Hazrat Ali (RA)", "Hazrat Hamza (RA)", "Hazrat Khalid bin Walid", "Hazrat Umar"], c: 0},
    {t: "The word 'Quran' means?", o: ["Recitation", "Guidance", "The Book", "Miracle"], c: 0},
    {t: "The battle of Badr was fought in?", o: ["2 Hijri", "3 Hijri", "4 Hijri", "5 Hijri"], c: 0},
    {t: "Who was the first person to compile the Quran during Abu Bakr's caliphate?", o: ["Zaid bin Thabit", "Umar bin Khattab", "Usman bin Affan", "Ali bin Abi Talib"], c: 0},
    {t: "Which Surah is called the 'Heart of the Quran'?", o: ["Surah Yaseen", "Surah Rahman", "Surah Fatiha", "Surah Ikhlas"], c: 0},
    {t: "What is the meaning of 'Sahaba'?", o: ["Companions", "Followers", "Leaders", "Warriors"], c: 0},
    {t: "The first migration of Muslims was to?", o: ["Madina", "Abyssinia", "Taif", "Yemen"], c: 1},
    {t: "Which Prophet is known as 'Saifullah'?", o: ["Hazrat Ali", "Hazrat Khalid bin Walid", "Hazrat Hamza", "Hazrat Musa"], c: 1},
    {t: "How many months are in the Islamic calendar?", o: ["10", "11", "12", "13"], c: 2},
    {t: "First Surah revealed was?", o: ["Al-Alaq", "Al-Fatiha", "Al-Nasr", "Al-Baqarah"], c: 0},
    {t: "Prophet Muhammad (PBUH) belonged to which tribe?", o: ["Quraish", "Banu Tamim", "Banu Hashim", "Ansar"], c: 2},
    {t: "Number of Sajdas in Quran?", o: ["12", "14", "15", "11"], c: 1},
    {t: "Shortest Surah in Quran?", o: ["Al-Ikhlas", "Al-Kauthar", "Al-Nas", "Al-Asr"], c: 1},
    {t: "The Treaty of Hudaibiya took place in?", o: ["6 Hijri", "7 Hijri", "8 Hijri", "5 Hijri"], c: 0}
  ]),
  ...createQuestions('Biology', [
    {t: "Which is the correct sequence of taxonomic ranks?", o: ["Kingdom, Class, Phylum", "Kingdom, Phylum, Class, Order, Family, Genus, Species", "Phylum, Order, Genus, Species", "Kingdom, Order, Class"], c: 1},
    {t: "Who is known as the father of taxonomy?", o: ["Robert Hooke", "Carolus Linnaeus", "Aristotle", "Darwin"], c: 1},
    {t: "The basic unit of classification is?", o: ["Genus", "Order", "Family", "Species"], c: 3},
    {t: "Which organ system is responsible for transport of materials in the human body?", o: ["Nervous System", "Circulatory System", "Respiratory System", "Digestive System"], c: 1},
    {t: "Which kingdom includes all prokaryotic organisms?", o: ["Monera", "Protista", "Fungi", "Plantae"], c: 0},
    {t: "Binomial nomenclature was introduced by?", o: ["Aristotle", "Linnaeus", "Watson", "Pasteur"], c: 1},
    {t: "The scientific name of Humans is?", o: ["Homo sapiens", "Canis lupus", "Felis catus", "Rana tigrina"], c: 0},
    {t: "Study of tissues is called?", o: ["Morphology", "Histology", "Cytology", "Genetics"], c: 1},
    {t: "Which organelle is the powerhouse of the cell?", o: ["Nucleus", "Ribosome", "Mitochondria", "Golgi Body"], c: 2},
    {t: "Cell wall of fungi is made of?", o: ["Cellulose", "Chitin", "Peptidoglycan", "Lignin"], c: 1},
    {t: "Five Kingdom Classification was proposed by?", o: ["Robert Whittaker", "Linnaeus", "Haeckel", "Darwin"], c: 0},
    {t: "A group of similar cells performing the same function?", o: ["Organ", "Tissue", "System", "Population"], c: 1},
    {t: "Digestion starts in which organ?", o: ["Stomach", "Mouth", "Esophagus", "Liver"], c: 1},
    {t: "Example of a colonial organism is?", o: ["Amoeba", "Volvox", "Paramecium", "Euglena"], c: 1},
    {t: "Binary Fission is a type of?", o: ["Sexual Reproduction", "Asexual Reproduction", "Growth", "Metabolism"], c: 1}
  ]),
  ...createQuestions('Computer', [
    {t: "The brain of any computer system is?", o: ["ALU", "Memory", "CPU", "Control Unit"], c: 2},
    {t: "Which is a volatile memory?", o: ["ROM", "RAM", "Hard Disk", "Flash Drive"], c: 1},
    {t: "1 Gigabyte is equal to?", o: ["1024 Bytes", "1024 KB", "1024 MB", "1024 GB"], c: 2},
    {t: "Which protocol is used for email transmission?", o: ["HTTP", "FTP", "SMTP", "TCP"], c: 2},
    {t: "The physical parts of a computer are called?", o: ["Software", "Hardware", "Middleware", "Liveware"], c: 1},
    {t: "What does SQL stand for?", o: ["Simple Query Language", "Structured Query Language", "Standard Quest Level", "System Query Link"], c: 1},
    {t: "Binary system uses how many digits?", o: ["10", "8", "2", "16"], c: 2},
    {t: "Full form of LAN is?", o: ["Local Area Network", "Link Area Network", "Large Area Network", "Local Array Network"], c: 0},
    {t: "Which is an output device?", o: ["Keyboard", "Mouse", "Monitor", "Scanner"], c: 2},
    {t: "What is the shortcut key for 'Paste'?", o: ["Ctrl+P", "Ctrl+V", "Ctrl+X", "Ctrl+C"], c: 1},
    {t: "WWW stands for?", o: ["World Wide Web", "World Wild West", "Web Wide World", "World Whole Web"], c: 0},
    {t: "Which is an operating system?", o: ["Windows", "Chrome", "Oracle", "Python"], c: 0},
    {t: "Founder of Microsoft?", o: ["Steve Jobs", "Bill Gates", "Mark Zuckerberg", "Jeff Bezos"], c: 1},
    {t: "Extension of Word file is?", o: [".txt", ".exe", ".docx", ".pdf"], c: 2},
    {t: "Smallest unit of data in computer?", o: ["Byte", "Bit", "Nibble", "Word"], c: 1}
  ]),
  ...createQuestions('English', [
    {t: "Identify the noun: 'He goes to school.'", o: ["He", "Goes", "School", "To"], c: 2},
    {t: "Synonym of 'Beautiful'?", o: ["Ugly", "Pretty", "Small", "Hard"], c: 1},
    {t: "Antonym of 'Fast'?", o: ["Quick", "Slow", "High", "Light"], c: 1},
    {t: "Plural of 'Child'?", o: ["Childs", "Children", "Childrens", "Childes"], c: 1},
    {t: "He is ___ honest man.", o: ["a", "an", "the", "no"], c: 1},
    {t: "Past tense of 'Go'?", o: ["Gone", "Went", "Going", "Goes"], c: 1},
    {t: "Correct spelling?", o: ["Receive", "Recieve", "Recive", "Receeve"], c: 0},
    {t: "Which is a pronoun?", o: ["Apple", "She", "Run", "Quickly"], c: 1},
    {t: "Identify the verb: 'Birds fly in the sky.'", o: ["Birds", "Fly", "Sky", "The"], c: 1},
    {t: "The cat is ___ the table.", o: ["under", "between", "of", "to"], c: 0},
    {t: "Comparative degree of 'Good'?", o: ["Better", "Best", "Gooder", "Well"], c: 0},
    {t: "Identify the adjective: 'It is a red car.'", o: ["It", "Is", "Red", "Car"], c: 2},
    {t: "Interjection example?", o: ["Wow!", "And", "But", "Because"], c: 0},
    {t: "Plural of 'Knife'?", o: ["Knifes", "Knive", "Knives", "Knifess"], c: 2},
    {t: "Identify the adverb: 'She runs quickly.'", o: ["She", "Runs", "Quickly", "Fast"], c: 2}
  ]),
  ...createQuestions('Pak Studies', [
    {t: "When was the Lahore Resolution passed?", o: ["1930", "1940", "1947", "1935"], c: 1},
    {t: "Who was the first Governor General of Pakistan?", o: ["Liaquat Ali Khan", "Quaid-e-Azam", "Iskander Mirza", "Ayub Khan"], c: 1},
    {t: "National Anthem was written by?", o: ["Allama Iqbal", "Hafeez Jalandhari", "Faiz Ahmed Faiz", "Ahmad Nadeem Qasmi"], c: 1},
    {t: "Highest mountain peak of Pakistan?", o: ["K2", "Nanga Parbat", "Mount Everest", "Rakaposhi"], c: 0},
    {t: "Year of the first constitution?", o: ["1947", "1956", "1962", "1973"], c: 1},
    {t: "Current capital of Pakistan?", o: ["Karachi", "Lahore", "Islamabad", "Peshawar"], c: 2},
    {t: "National animal?", o: ["Tiger", "Lion", "Markhor", "Elephant"], c: 2},
    {t: "Largest province by area?", o: ["Punjab", "Sindh", "Balochistan", "KPK"], c: 2},
    {t: "National language?", o: ["English", "Urdu", "Punjabi", "Sindhi"], c: 1},
    {t: "When did Pakistan become a Nuclear Power?", o: ["1990", "1998", "2000", "1988"], c: 1},
    {t: "First Prime Minister?", o: ["Jinnah", "Liaquat Ali Khan", "Nazimuddin", "Z.A. Bhutto"], c: 1},
    {t: "Total provinces in Pakistan?", o: ["3", "4", "5", "6"], c: 1},
    {t: "Founder of Pakistan?", o: ["Allama Iqbal", "Jinnah", "Liaquat Ali", "Sir Syed"], c: 1},
    {t: "Oldest civilization in Pakistan?", o: ["Indus Valley", "Gandhara", "Taxila", "Harappa"], c: 0},
    {t: "Largest dam of Pakistan?", o: ["Mangla", "Tarbela", "Warsak", "Diamer"], c: 1}
  ]),
  ...createQuestions('Math', [
    {t: "Value of Pi is approximately?", o: ["3.14", "2.14", "4.14", "3.00"], c: 0},
    {t: "2 + 2 * 2 = ?", o: ["8", "6", "4", "2"], c: 1},
    {t: "Square root of 81?", o: ["7", "8", "9", "10"], c: 2},
    {t: "Triangle with all sides equal?", o: ["Isosceles", "Equilateral", "Scalene", "Right"], c: 1},
    {t: "Smallest 3-digit number?", o: ["100", "101", "111", "999"], c: 0},
    {t: "If x+5=12, then x=?", o: ["5", "7", "12", "17"], c: 1},
    {t: "10% of 500?", o: ["5", "50", "100", "10"], c: 1},
    {t: "Median of 1, 3, 5, 7, 9?", o: ["3", "5", "7", "1"], c: 1},
    {t: "Prime number below 10?", o: ["4", "6", "7", "9"], c: 2},
    {t: "Formula for area of circle?", o: ["2*pi*r", "pi*r*r", "pi*d", "2*r"], c: 1},
    {t: "Number of sides in hexagon?", o: ["5", "6", "7", "8"], c: 1},
    {t: "Sum of angles in a triangle?", o: ["90", "180", "270", "360"], c: 1},
    {t: "LCM of 4 and 6?", o: ["10", "12", "24", "2"], c: 1},
    {t: "Complement of 30 degree angle?", o: ["60", "90", "150", "180"], c: 0},
    {t: "Angle of 90 degrees is?", o: ["Acute", "Obtuse", "Right", "Reflex"], c: 2}
  ]),
  ...createQuestions('Physics', [
    {t: "SI unit of force is?", o: ["Watt", "Joule", "Newton", "Pascal"], c: 2},
    {t: "Unit of energy is?", o: ["Newton", "Joule", "Watt", "Tesla"], c: 1},
    {t: "Speed of light is?", o: ["3e8 m/s", "3e7 m/s", "3e6 m/s", "3e9 m/s"], c: 0},
    {t: "Law of inertia is Newton's?", o: ["1st Law", "2nd Law", "3rd Law", "4th Law"], c: 0},
    {t: "Resistance is measured in?", o: ["Ampere", "Volt", "Ohm", "Watt"], c: 2},
    {t: "Instrument to measure current?", o: ["Voltmeter", "Ammeter", "Galvanometer", "Barometer"], c: 1},
    {t: "Power is equal to?", o: ["W/t", "F*d", "m*g", "V*I"], c: 0},
    {t: "Boiling point of water in Celsius?", o: ["0", "50", "100", "120"], c: 2},
    {t: "Free fall acceleration on Earth?", o: ["9.8 m/s2", "8.9 m/s2", "10 m/s2", "5 m/s2"], c: 0},
    {t: "Sound waves are?", o: ["Transverse", "Longitudinal", "Electromagnetic", "Static"], c: 1},
    {t: "Mirror used in vehicles?", o: ["Concave", "Convex", "Plane", "Circular"], c: 1},
    {t: "Mass is measured in?", o: ["Newton", "Gram", "Kilogram", "Liter"], c: 2},
    {t: "Density is?", o: ["Mass/Volume", "Weight/Mass", "Force/Area", "Work/Time"], c: 0},
    {t: "Unit of frequency?", o: ["Joule", "Hertz", "Watt", "Pascal"], c: 1},
    {t: "Kinetic energy formula?", o: ["mgh", "1/2 mv2", "F*d", "P*t"], c: 1}
  ]),
  ...createQuestions('Chemistry', [
    {t: "Atomic number of Carbon?", o: ["6", "12", "14", "8"], c: 0},
    {t: "Symbol of Gold?", o: ["Ag", "Au", "Fe", "Cu"], c: 1},
    {t: "pH of pure water?", o: ["1", "7", "14", "5"], c: 1},
    {t: "Formula of common salt?", o: ["HCl", "NaOH", "NaCl", "KCl"], c: 2},
    {t: "Gas used in fire extinguishers?", o: ["Oxygen", "Nitrogen", "CO2", "Helium"], c: 2},
    {t: "Atomic mass of Oxygen?", o: ["8", "16", "32", "12"], c: 1},
    {t: "Which metal is liquid at room temp?", o: ["Iron", "Mercury", "Copper", "Gold"], c: 1},
    {t: "Most abundant gas in atmosphere?", o: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"], c: 1},
    {t: "Valency of Oxygen?", o: ["1", "2", "3", "4"], c: 1},
    {t: "Smallest particle of element?", o: ["Atom", "Molecule", "Ion", "Proton"], c: 0},
    {t: "Noble gas example?", o: ["Oxygen", "Helium", "Chlorine", "Iron"], c: 1},
    {t: "Acid found in lemon?", o: ["Citric", "Acetic", "Lactic", "Formic"], c: 0},
    {t: "Rusting of iron is?", o: ["Oxidation", "Reduction", "Hydrolysis", "Melting"], c: 0},
    {t: "Formula of Water?", o: ["H2O", "HO2", "H2O2", "OH"], c: 0},
    {t: "Isotope of Hydrogen used in reactors?", o: ["Protium", "Deuterium", "Tritium", "Carbon"], c: 2}
  ]),
  ...createQuestions('Urdu', [
    {t: "Urdu ka pehla shayar?", o: ["Ghalib", "Amir Khusro", "Iqbal", "Meer"], c: 1},
    {t: "Qaumi Shair kaun hain?", o: ["Ghalib", "Iqbal", "Faiz", "Josh"], c: 1},
    {t: "Lafz 'Urdu' ka matlab?", o: ["Lashkar", "Guldasta", "Shahar", "Zaban"], c: 0},
    {t: "Musaddas-e-Hali kisne likhi?", o: ["Sir Syed", "Altaf Hussain Hali", "Iqbal", "Ghalib"], c: 1},
    {t: "Urdu kis zaban ka lafz hai?", o: ["Farsi", "Arabi", "Turki", "Hindi"], c: 2},
    {t: "Bang-e-Dara kiski kitab hai?", o: ["Faiz", "Iqbal", "Meer", "Faraz"], c: 1},
    {t: "Pehli Urdu kitab?", o: ["Sabras", "Bagh-o-Bahar", "Fasana-e-Ajaib", "Gulistan"], c: 0},
    {t: "Iste'ara ka matlab?", o: ["Udhay lena", "Tashbeeh dena", "Nishani", "Pukar"], c: 0},
    {t: "Ghalib kahan paida hue?", o: ["Delhi", "Agra", "Lucknow", "Lahore"], c: 1},
    {t: "Huroof-e-Tahajji ki tadad?", o: ["36", "37", "39", "40"], c: 2},
    {t: "Abe-Hayat ke musannif?", o: ["Shibli", "Muhammad Hussain Azad", "Hali", "Sir Syed"], c: 1},
    {t: "Urdu ka 'Shakespeare' kise kehte hain?", o: ["Agha Hashar", "Imtiaz Ali Taj", "Manto", "Josh"], c: 0},
    {t: "Nazm 'Shikwa' kiski hai?", o: ["Iqbal", "Hali", "Faiz", "Akbar"], c: 0},
    {t: "Dastan-e-Amir Hamza kisne likhi?", o: ["Ghalib", "Mir Aman", "Ratan Nath", "Unknown"], c: 3},
    {t: "Urdu Adab ka 'Baba-e-Urdu'?", o: ["Maulvi Abdul Haq", "Sir Syed", "Iqbal", "Hali"], c: 0}
  ]),
  ...createQuestions('Competitive', [
    {t: "World's largest ocean?", o: ["Atlantic", "Indian", "Pacific", "Arctic"], c: 2},
    {t: "Capital of Japan?", o: ["Seoul", "Beijing", "Tokyo", "Bangkok"], c: 2},
    {t: "Currency of UK?", o: ["Dollar", "Euro", "Pound", "Yen"], c: 2},
    {t: "Tallest building?", o: ["Shanghai Tower", "Burj Khalifa", "Abraj Al Bait", "Lotte World"], c: 1},
    {t: "Largest desert?", o: ["Sahara", "Gobi", "Antarctica", "Arabian"], c: 2},
    {t: "Fastest land animal?", o: ["Lion", "Cheetah", "Horse", "Leopard"], c: 1},
    {t: "Host of 2024 Olympics?", o: ["Tokyo", "Paris", "London", "Los Angeles"], c: 1},
    {t: "CEO of Tesla?", o: ["Bill Gates", "Elon Musk", "Jeff Bezos", "Tim Cook"], c: 1},
    {t: "Number of continents?", o: ["5", "6", "7", "8"], c: 2},
    {t: "Smallest country?", o: ["Monaco", "Vatican City", "Malta", "Maldives"], c: 1},
    {t: "Longest river?", o: ["Amazon", "Nile", "Indus", "Mississippi"], c: 1},
    {t: "Inventor of telephone?", o: ["Edison", "Graham Bell", "Tesla", "Newton"], c: 1},
    {t: "First man on moon?", o: ["Yuri Gagarin", "Neil Armstrong", "Buzz Aldrin", "Elon Musk"], c: 1},
    {t: "Largest planet?", o: ["Earth", "Mars", "Jupiter", "Saturn"], c: 2},
    {t: "Blood type O is?", o: ["Universal Donor", "Universal Recipient", "Rare", "Rh negative"], c: 0}
  ])
];

export const HELP_PRESETS = [
  "How to register?",
  "Supplementary rules?",
  "Passing marks?",
  "Competitive mode?"
];

export const SYSTEM_INSTRUCTION = `You are the AI Assistant for ${ACADEMY_NAME}. 
Protocols:
- Annual Exams: Full assessment.
- Supplementary: Only for failed modules. Roll number remains same.
- Passing: 40% per subject.
- Subjects: 15 MCQs each. 3 mins per module.
Be helpful and provide accurate data from 9th/10th class Punjab Board context.`;

import { useState } from "react";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";

const NIGERIAN_FOODS = [
  { id: 1, name: "Jollof Rice", cal: 450, protein: 12, carbs: 68, fat: 14, region: "National" },
  { id: 2, name: "Moi Moi", cal: 210, protein: 18, carbs: 22, fat: 5, region: "National" },
  { id: 3, name: "Egusi Soup", cal: 380, protein: 22, carbs: 15, fat: 28, region: "National" },
  { id: 4, name: "Pounded Yam", cal: 330, protein: 4, carbs: 78, fat: 1, region: "National" },
  { id: 5, name: "Suya (beef)", cal: 290, protein: 32, carbs: 5, fat: 16, region: "North" },
  { id: 6, name: "Tuwo Shinkafa", cal: 310, protein: 5, carbs: 72, fat: 1, region: "North" },
  { id: 7, name: "Miyan Kuka", cal: 180, protein: 8, carbs: 14, fat: 10, region: "North" },
  { id: 8, name: "Akara", cal: 240, protein: 14, carbs: 28, fat: 10, region: "Yoruba" },
  { id: 9, name: "Eba (Garri)", cal: 360, protein: 2, carbs: 86, fat: 1, region: "National" },
  { id: 10, name: "Ofe Onugbu", cal: 200, protein: 10, carbs: 12, fat: 14, region: "Igbo" },
  { id: 11, name: "Oha Soup", cal: 190, protein: 11, carbs: 10, fat: 13, region: "Igbo" },
  { id: 12, name: "Banga Soup", cal: 310, protein: 18, carbs: 10, fat: 24, region: "South-South" },
  { id: 13, name: "Afang Soup", cal: 260, protein: 20, carbs: 8, fat: 18, region: "South-South" },
  { id: 14, name: "Efo Riro", cal: 220, protein: 16, carbs: 10, fat: 14, region: "Yoruba" },
  { id: 15, name: "Amala", cal: 340, protein: 3, carbs: 80, fat: 1, region: "Yoruba" },
  { id: 16, name: "Pepper Soup (goat)", cal: 180, protein: 24, carbs: 6, fat: 8, region: "National" },
  { id: 17, name: "Fried Plantain (Dodo)", cal: 270, protein: 2, carbs: 52, fat: 8, region: "National" },
  { id: 18, name: "Ogbono Soup", cal: 300, protein: 18, carbs: 12, fat: 22, region: "National" },
  { id: 19, name: "Masa (rice cake)", cal: 190, protein: 4, carbs: 38, fat: 3, region: "North" },
  { id: 20, name: "Nkwobi", cal: 340, protein: 28, carbs: 8, fat: 22, region: "Igbo" },
  { id: 21, name: "Groundnut Soup", cal: 350, protein: 20, carbs: 14, fat: 26, region: "National" },
  { id: 22, name: "Ofada Rice", cal: 380, protein: 8, carbs: 82, fat: 2, region: "Yoruba" },
  { id: 23, name: "Zobo Drink", cal: 45, protein: 0, carbs: 11, fat: 0, region: "North" },
  { id: 24, name: "Kunu Zaki", cal: 120, protein: 2, carbs: 26, fat: 1, region: "North" },
  { id: 25, name: "Chin Chin", cal: 480, protein: 7, carbs: 62, fat: 22, region: "National" },
  { id: 26, name: "Okpa", cal: 260, protein: 16, carbs: 30, fat: 10, region: "Igbo" },
  { id: 27, name: "Abacha (African Salad)", cal: 220, protein: 6, carbs: 40, fat: 6, region: "Igbo" },
  { id: 28, name: "Edikang Ikong", cal: 240, protein: 18, carbs: 8, fat: 16, region: "South-South" },
  { id: 29, name: "Semovita", cal: 350, protein: 10, carbs: 74, fat: 2, region: "National" },
  { id: 30, name: "Beef Stew", cal: 280, protein: 26, carbs: 10, fat: 16, region: "National" },
];

const PHC_CLINICS = [
  { name: "Garki PHC Centre", address: "Garki, Abuja", phone: "08012345678", open: true, services: ["Immunization", "Ante-natal", "OPD"] },
  { name: "Surulere Health Clinic", address: "Surulere, Lagos", phone: "08098765432", open: true, services: ["Emergency", "Lab Tests", "Dental"] },
  { name: "Kano Central PHC", address: "Kano Municipal, Kano", phone: "08023456789", open: false, services: ["OPD", "Immunization", "Family Planning"] },
  { name: "Enugu PHC Unit", address: "Independence Layout, Enugu", phone: "08056781234", open: true, services: ["Maternity", "OPD", "Eye Clinic"] },
  { name: "Ibadan PHC Bodija", address: "Bodija, Ibadan", phone: "08034567890", open: true, services: ["OPD", "Dental", "Lab Tests"] },
  { name: "Port Harcourt PHC", address: "GRA, Port Harcourt", phone: "08076543210", open: false, services: ["Maternity", "Immunization", "OPD"] },
];

const T = {
  english: {
    appName: "NutriTrack-PHC+", tagline: "Your Health. Your Language. Your Community.",
    welcome: "Welcome", selectLang: "Select Your Language", continueBtn: "Continue",
    appDesc: "Nutrition tracking & primary healthcare for every Nigerian.",
    login: "Login", signup: "Sign Up", email: "Email", password: "Password",
    fullName: "Full Name", confirmPass: "Confirm Password", loginBtn: "Login",
    signupBtn: "Create Account", noAccount: "Don't have an account?", hasAccount: "Already have an account?",
    nav: { home: "Home", nutrition: "Nutrition", phc: "PHC", profile: "Profile" },
    home: { greeting: "Good day", subtitle: "How are you feeling today?", calories: "Calories Today", water: "Water (glasses)", steps: "Steps", bmi: "BMI", quickLog: "Quick Log Meal", findClinic: "Find PHC Clinic", healthTip: "Health Tip", tip: "Eat more vegetables and fruits daily to boost your immunity and energy levels.", recentMeals: "Recent Meals", weeklyProgress: "Weekly Progress" },
    nutrition: { title: "Nutrition Tracker", logMeal: "Log a Meal", mealName: "Search Nigerian food...", calories: "Calories", protein: "Protein (g)", carbs: "Carbs (g)", fat: "Fat (g)", addMeal: "Add Meal", todayLog: "Today's Log", noMeals: "No meals logged yet today.", breakfast: "Breakfast", lunch: "Lunch", dinner: "Dinner", snack: "Snack", mealType: "Meal Type", total: "Total Today", foodDb: "Nigerian Foods Database", charts: "Nutrition Charts", macros: "Macronutrients", weekly: "Weekly Calories" },
    phc: { title: "PHC Centers", subtitle: "Find Primary Healthcare near you", search: "Search clinic or location...", nearby: "Nearby Clinics", services: "Services", open: "Open Now", closed: "Closed", call: "Call", directions: "Directions", emergency: "Emergency: 112", bookAppt: "Book Appointment" },
    profile: { title: "My Profile", name: "Full Name", age: "Age", weight: "Weight (kg)", height: "Height (cm)", bloodGroup: "Blood Group", genotype: "Genotype", save: "Save Profile", healthGoal: "Health Goal", goals: ["Lose Weight", "Gain Weight", "Stay Healthy", "Manage Condition"], saved: "Profile saved!", logout: "Logout", welcome: "Welcome back" },
  },
  yoruba: {
    appName: "NutriTrack-PHC+", tagline: "Ilera R. de R. wj R.",
    welcome: " Kb", selectLang: "Yan d R", continueBtn: "Tsiwaju",
    appDesc: "tj onj ti lera fn gbogbo ar Njr.",
    login: "Wle", signup: "Foruksil", email: "Imeeli", password: "rigbaniwle",
    fullName: "Oruk Kikun", confirmPass: "Jrisi rigbaniwle", loginBtn: "Wle",
    signupBtn: "da Akl", noAccount: "Ko ni akl?", hasAccount: "Ni akl tl?",
    nav: { home: "Il", nutrition: "Onj", phc: "Il-wsn", profile: "Profaili" },
    home: { greeting: " kr", subtitle: "Bwo ni o e r ln?", calories: "Awn kalori loni", water: "Omi (ago)", steps: "Igbes", bmi: "BMI", quickLog: "Gba Ounj Sil", findClinic: "Wa Ile-iwosan", healthTip: "Imran Ilera", tip: "J f ti so pp ljoojm lti m agbra r p s i.", recentMeals: "Ounj Aip", weeklyProgress: "Ilsiwaju s" },
    nutrition: { title: "Olgbsil Onj", logMeal: "Gba Ounj Sil", mealName: "Wa ounj Naijiria...", calories: "Kalori", protein: "Amuaradagba (g)", carbs: "Kabu (g)", fat: "ra (g)", addMeal: "Fi Ounj Kun", todayLog: "ksl Ln", noMeals: "Ko si ounj ti a gba sil loni.", breakfast: "Ounj Aro", lunch: "Ounj san", dinner: "Ounj Al", snack: "Ipanu", mealType: "Iru Ounj", total: "Apap Loni", foodDb: "Ounj Naijiria", charts: "Awn Shati", macros: "Macros", weekly: "Kalori s" },
    phc: { title: "Awn Ile-iwosan", subtitle: "Wa ilera akk nitosi r", search: "Wa ile-iwosan...", nearby: "Awn Ile-iwosan Nitosi", services: "Awn I", open: "i Ni bayi", closed: "Tiipa", call: "Pe", directions: "Itnisna", emergency: "Pajawiri: 112", bookAppt: "e Ipinnu" },
    profile: { title: "Profaili Mi", name: "Oruk Kikun", age: "j ori", weight: "Iwuwo (kg)", height: "Giga (cm)", bloodGroup: "gb j", genotype: "Jinotaip", save: "Fi Profaili Pam", healthGoal: "Ibi-afde Ilera", goals: ["Padanu Iwuwo", "Wn Iwuwo", "Wa ni Ilera", "akoso Arun"], saved: "Profaili ti fipam!", logout: "Jade", welcome: " pad wle" },
  },
  hausa: {
    appName: "NutriTrack-PHC+", tagline: "Lafiyarka. Yarenka. Al'ummarku.",
    welcome: "Barka da zuwa", selectLang: "Zai Yarenka", continueBtn: "Ci gaba",
    appDesc: "Bin diddigin abinci da kulawar lafiya na farko ga dukkan Nijeriyawa.",
    login: "Shiga", signup: "Yi Rajista", email: "Imel", password: "Kalmar Sirri",
    fullName: "Cikakken Suna", confirmPass: "Tabbatar Kalmar Sirri", loginBtn: "Shiga",
    signupBtn: "iriri Asusun", noAccount: "Babu asusun?", hasAccount: "Kana da asusun?",
    nav: { home: "Gida", nutrition: "Abinci", phc: "Asibiti", profile: "Bayanai" },
    home: { greeting: "Barka da safe", subtitle: "Yaya kake ji yau?", calories: "Kalori Yau", water: "Ruwa (gilashi)", steps: "Mataki", bmi: "BMI", quickLog: "Rubuta Abinci", findClinic: "Nemo Asibiti", healthTip: "Shawarar Lafiya", tip: "Ci kayan marmari da 'ya'yan itace kowace rana don arfafa lafiyarka.", recentMeals: "Abincin Kwanan nan", weeklyProgress: "Ci Gaban Mako" },
    nutrition: { title: "Mai Bin Abinci", logMeal: "Rubuta Abinci", mealName: "Nemo abincin Najeriya...", calories: "Kalori", protein: "Furotin (g)", carbs: "Carbs (g)", fat: "Mai (g)", addMeal: "ara Abinci", todayLog: "Rikodin Yau", noMeals: "Babu abinci da aka rubuta yau.", breakfast: "Karin Kumallo", lunch: "Abincin Rana", dinner: "Abincin Dare", snack: "Cin Abinci Kaan", mealType: "Nau'in Abinci", total: "Jimlar Yau", foodDb: "Abincin Najeriya", charts: "Taswirar", macros: "Macros", weekly: "Kalori na Mako" },
    phc: { title: "Cibiyoyin PHC", subtitle: "Nemo kiwon lafiya na farko kusa da kai", search: "Nemo asibiti...", nearby: "Asibitoci Kusa", services: "Aiyuka", open: "A Bude Yanzu", closed: "A Rufe", call: "Kira", directions: "Jagora", emergency: "Gaggawa: 112", bookAppt: "Yi Alawari" },
    profile: { title: "Bayanaina", name: "Cikakken Suna", age: "Shekaru", weight: "Nauyi (kg)", height: "Tsawo (cm)", bloodGroup: "Rukunin Jini", genotype: "Jinsin Jini", save: "Ajiye Bayanai", healthGoal: "Manufar Lafiya", goals: ["Rasa Nauyi", "ara Nauyi", "Kasance Mai Lafiya", "Sarrafa Cuta"], saved: "An ajiye bayanai!", logout: "Fita", welcome: "Barka da dawowa" },
  },
  igbo: {
    appName: "NutriTrack-PHC+", tagline: "Ahike G. Ass G. Obodo G.",
    welcome: "Nn", selectLang: "Hr Ass G", continueBtn: "Gaa n'ihu",
    appDesc: "sa nri na nlekta ahike maka nd Nigeria niile.",
    login: "Banye", signup: "Debanye Aha", email: "Emeli", password: "Paswd",
    fullName: "Aha Zuru Ezu", confirmPass: "Nwet Paswd", loginBtn: "Banye",
    signupBtn: "Mepta Akant", noAccount: "Enwegh akant?", hasAccount: "Nwere akant?",
    nav: { home: "l", nutrition: "Nri", phc: "l gw", profile: "Profal" },
    home: { greeting: "tt ma", subtitle: "Kedu ka  d taa?", calories: "Kalori Taa", water: "Mmiri (iko)", steps: "Nzkw", bmi: "BMI", quickLog: "Deee Nri", findClinic: "Ch l gw", healthTip: "Ndmd Ahike", tip: "Riee akwkw nri na mkpr osisi kwa bch iji wuo ahike g.", recentMeals: "Nri Nso Nso a", weeklyProgress: "ganihu Izu" },
    nutrition: { title: "Onye sa Nri", logMeal: "Dee Nri", mealName: "Ch nri Nigeria...", calories: "Kalori", protein: "Protein (g)", carbs: "Carbs (g)", fat: "Abba (g)", addMeal: "Tinye Nri", todayLog: "Ndek Taa", noMeals: "Enwegh nri edektara taa.", breakfast: "Nri tt", lunch: "Nri Ehihie", dinner: "Nri Abal", snack: "Oriri Obere", mealType: "d Nri", total: "Ngkta Taa", foodDb: "Nri Nigeria", charts: "Eserese", macros: "Macros", weekly: "Kalori Izu" },
    phc: { title: "Ebe Ahike PHC", subtitle: "Ch nlekta ahike d nso g", search: "Ch l gw...", nearby: "l gw D Nso", services: "r", open: "Mepere Ugbu a", closed: "Mechiri", call: "Kp", directions: "Nduzi", emergency: "Mberede: 112", bookAppt: "Dere Oge" },
    profile: { title: "Profal M", name: "Aha Zuru Ezu", age: "Af", weight: "Ibu (kg)", height: "Ogo (cm)", bloodGroup: "d bara", genotype: "Jinotap", save: "Chekwaa Profal", healthGoal: "Ebumnuche Ahike", goals: ["Weghaa Ibu", "Tinye Ibu", "Ngide n'Ahike", "Jikwaa ra"], saved: "Echekwara profal!", logout: "P", welcome: "Nn laghachi" },
  },
  fulani: {
    appName: "NutriTrack-PHC+", tagline: "Cellal Maa. Gangol Maa. Leol Maa.",
    welcome: "Jaaraama", selectLang: "Suo Gangol Maa", continueBtn: "Yahdu Yeeso",
    appDesc: "Callirgol ko'e neere e cellal bonnooji faa Niiseriyankooe fof.",
    login: "Wadu", signup: "Winndude Innde", email: "Iimeel", password: "iiirde",
    fullName: "Innde Heeriinde", confirmPass: "Jaito iiirde", loginBtn: "Wadu",
    signupBtn: "Watu Akonto", noAccount: "Alaa akonto?", hasAccount: "Ndi akonto?",
    nav: { home: "Galle", nutrition: "aamdu", phc: "Suudu Cellal", profile: "Seedantaagal" },
    home: { greeting: "Jam waali", subtitle: "No mbaddat-aa hannde?", calories: "Kalori Hannde", water: "Ndiyam (koora)", steps: "Aduna", bmi: "BMI", quickLog: "Winndude aamdu", findClinic: "Yiitirgal Suudu Cellal", healthTip: "Ladde Cellal", tip: "aam lee e ie lee kala alawma faa waa cellal maa.", recentMeals: "aamdu Jawtue", weeklyProgress: "Yeeso Yontere" },
    nutrition: { title: "Callirgol aamdu", logMeal: "Winndude aamdu", mealName: "Yiit aamdu Niiseriya...", calories: "Kalori", protein: "Proteiin (g)", carbs: "Carbs (g)", fat: "Sembe (g)", addMeal: "Ekkitinde aamdu", todayLog: "Windannde Hannde", noMeals: "Alaa aamdu windaao hannde.", breakfast: "aamdu Subaka", lunch: "aamdu Tolnde", dinner: "aamdu Jamma", snack: "aamdu Famo", mealType: "Suure aamdu", total: "um Fof Hannde", foodDb: "aamdu Niiseriya", charts: "Shaarti", macros: "Macros", weekly: "Kalori Yontere" },
    phc: { title: "Suue PHC", subtitle: "Yiit cellal bonnooji adiio maa", search: "Yiit suudu cellal...", nearby: "Suue Cellal adiie", services: "Tiitoonde", open: "Udditii Jooni", closed: "Udditaaki", call: "Noddu", directions: "Laawol", emergency: "Gabbe: 112", bookAppt: "Winndude Sahaa" },
    profile: { title: "Seedantaagal Am", name: "Innde Heeriinde", age: "Duui", weight: "Tatinaae (kg)", height: "Dooke (cm)", bloodGroup: "iiirde Jom", genotype: "Jinotaayp", save: "Watu Seedantaagal", healthGoal: "Muuo Cellal", goals: ["Faminde Tatinaae", "Bertinde Tatinaae", "Wonde Celluo", "Reende awu"], saved: "Seedantaagal wataama!", logout: "Yahu", welcome: "Jaaraama fa'i" },
  },
};

const LANGUAGES = [
  { key: "english", native: "English", flag: "" },
  { key: "yoruba", native: "Yorb", flag: "" },
  { key: "hausa", native: "Hausa", flag: "" },
  { key: "igbo", native: "Igbo", flag: "" },
  { key: "fulani", native: "Fulfulde", flag: "" },
];

const C = { green: "#007A3D", darkGreen: "#004d26", gold: "#D4A017", white: "#FFFFFF", card: "rgba(255,255,255,0.10)", cardBorder: "rgba(255,255,255,0.18)", text: "#FFFFFF", muted: "rgba(255,255,255,0.55)", danger: "#e74c3c", success: "#2ecc71", blue: "#1A6B9A" };
const baseCard = { background: C.card, backdropFilter: "blur(14px)", borderRadius: "20px", border: `1px solid ${C.cardBorder}`, padding: "20px", marginBottom: "16px" };
const inputStyle = { width: "100%", padding: "11px 14px", borderRadius: "12px", marginBottom: "10px", background: "rgba(255,255,255,0.08)", border: "1.5px solid rgba(255,255,255,0.15)", color: "#fff", fontSize: "13px", outline: "none", fontFamily: "'Georgia', serif", boxSizing: "border-box" };
const WEEKLY_DATA = [
  { day: "Mon", cal: 1800 }, { day: "Tue", cal: 2100 }, { day: "Wed", cal: 1650 }, { day: "Thu", cal: 2300 }, { day: "Fri", cal: 1900 }, { day: "Sat", cal: 2400 }, { day: "Sun", cal: 2050 },
];

export default function NutriTrackApp() {
  const [lang, setLang] = useState(null);
  const [screen, setScreen] = useState("welcome");
  const [authMode, setAuthMode] = useState("login");
  const [user, setUser] = useState(null);
  const [tab, setTab] = useState("home");
  const [meals, setMeals] = useState([
    { id: 1, name: "Jollof Rice", type: "Lunch", cal: 450, protein: 12, carbs: 68, fat: 14 },
    { id: 2, name: "Moi Moi", type: "Breakfast", cal: 210, protein: 18, carbs: 22, fat: 5 },
  ]);
  const [mealForm, setMealForm] = useState({ name: "", type: "Breakfast", cal: "", protein: "", carbs: "", fat: "" });
  const [profile, setProfile] = useState({ name: "", age: "", weight: "", height: "", bloodGroup: "O+", genotype: "AA", goal: 0 });
  const [profileSaved, setProfileSaved] = useState(false);
  const [water, setWater] = useState(3);
  const [steps] = useState(4820);

  const t = T[lang || "english"];
  const totalCal = meals.reduce((s, m) => s + Number(m.cal), 0);
  const totalProtein = meals.reduce((s, m) => s + Number(m.protein), 0);
  const totalCarbs = meals.reduce((s, m) => s + Number(m.carbs), 0);
  const totalFat = meals.reduce((s, m) => s + Number(m.fat), 0);
  const bmi = profile.weight && profile.height ? (profile.weight / ((profile.height / 100) ** 2)).toFixed(1) : "--";

  const addMeal = (food) => {
    if (!food) {
      if (!mealForm.name || !mealForm.cal) return;
      setMeals([...meals, { id: Date.now(), ...mealForm }]);
      setMealForm({ name: "", type: "Breakfast", cal: "", protein: "", carbs: "", fat: "" });
    } else {
      setMeals([...meals, { id: Date.now(), name: food.name, type: mealForm.type || "Lunch", cal: food.cal, protein: food.protein, carbs: food.carbs, fat: food.fat }]);
    }
  };

  if (screen === "welcome") return <WelcomeScreen lang={lang} setLang={setLang} onContinue={() => setScreen("auth")} />;
  if (screen === "auth") return <AuthScreen t={t} mode={authMode} setMode={setAuthMode} onAuth={(u) => { setUser(u); setProfile((p) => ({ ...p, name: u.name })); setScreen("app"); }} onBack={() => setScreen("welcome")} />;

  return (
    <div style={{ minHeight: "100vh", maxWidth: "480px", margin: "0 auto", background: `linear-gradient(160deg, ${C.darkGreen} 0%, ${C.green} 45%, ${C.blue} 100%)`, fontFamily: "'Georgia', serif", color: C.text, display: "flex", flexDirection: "column", position: "relative" }}>
      <div style={{ position: "fixed", top: "-60px", right: "-60px", width: "220px", height: "220px", borderRadius: "50%", border: "1.5px solid rgba(212,160,23,0.18)", pointerEvents: "none" }} />
      <div style={{ position: "fixed", bottom: "60px", left: "-80px", width: "280px", height: "280px", borderRadius: "50%", border: "1.5px solid rgba(255,255,255,0.07)", pointerEvents: "none" }} />
      <div style={{ padding: "14px 18px 8px", display: "flex", alignItems: "center", justifyContent: "space-between", zIndex: 10 }}>
        <div>
          <div style={{ color: C.gold, fontWeight: "bold", fontSize: "17px" }}>{t.appName}</div>
          <div style={{ color: C.muted, fontSize: "11px" }}> {user?.name || ""}</div>
        </div>
        <button onClick={() => setScreen("welcome")} style={{ background: "rgba(255,255,255,0.1)", border: "none", color: C.gold, borderRadius: "10px", padding: "5px 11px", cursor: "pointer", fontSize: "12px" }}>
           {LANGUAGES.find((l) => l.key === lang)?.native || "EN"}
        </button>
      </div>
      <div style={{ flex: 1, overflowY: "auto", padding: "6px 14px 90px" }}>
        {tab === "home" && <HomeTab t={t} totalCal={totalCal} water={water} setWater={setWater} steps={steps} bmi={bmi} meals={meals} setTab={setTab} user={user} />}
        {tab === "nutrition" && <NutritionTab t={t} meals={meals} mealForm={mealForm} setMealForm={setMealForm} addMeal={addMeal} totalCal={totalCal} totalProtein={totalProtein} totalCarbs={totalCarbs} totalFat={totalFat} />}
        {tab === "phc" && <PHCTab t={t} />}
        {tab === "profile" && <ProfileTab t={t} profile={profile} setProfile={setProfile} saveProfile={() => { setProfileSaved(true); setTimeout(() => setProfileSaved(false), 2500); }} profileSaved={profileSaved} bmi={bmi} onLogout={() => { setUser(null); setScreen("auth"); }} />}
      </div>
      <div style={{ position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)", width: "100%", maxWidth: "480px", background: "rgba(0,40,20,0.94)", backdropFilter: "blur(20px)", borderTop: `1px solid ${C.cardBorder}`, display: "flex", justifyContent: "space-around", padding: "8px 0 13px", zIndex: 100 }}>
        {[{ key: "home", icon: "", label: t.nav.home }, { key: "nutrition", icon: "", label: t.nav.nutrition }, { key: "phc", icon: "", label: t.nav.phc }, { key: "profile", icon: "", label: t.nav.profile }].map((n) => (
          <button key={n.key} onClick={() => setTab(n.key)} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: "2px", padding: "4px 12px" }}>
            <span style={{ fontSize: "20px", filter: tab === n.key ? "none" : "grayscale(60%)" }}>{n.icon}</span>
            <span style={{ fontSize: "10px", color: tab === n.key ? C.gold : C.muted, fontWeight: tab === n.key ? "700" : "400" }}>{n.label}</span>
            {tab === n.key && <div style={{ width: "4px", height: "4px", borderRadius: "50%", background: C.gold }} />}
          </button>
        ))}
      </div>
    </div>
  );
}

function WelcomeScreen({ lang, setLang, onContinue }) {
  const [selected, setSelected] = useState(lang || "english");
  const tr = T[selected];
  return (
    <div style={{ minHeight: "100vh", maxWidth: "480px", margin: "0 auto", background: "linear-gradient(160deg, #003d1f 0%, #006B3C 40%, #1A6B9A 100%)", fontFamily: "'Georgia', serif", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "24px", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: "-80px", right: "-80px", width: "300px", height: "300px", borderRadius: "50%", border: "2px solid rgba(212,160,23,0.15)" }} />
      <div style={{ position: "absolute", bottom: "-100px", left: "-100px", width: "350px", height: "350px", borderRadius: "50%", border: "2px solid rgba(255,255,255,0.07)" }} />
      <div style={{ textAlign: "center", marginBottom: "28px" }}>
        <div style={{ width: "88px", height: "88px", borderRadius: "24px", background: "linear-gradient(135deg, #D4A017, #007A3D)", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: "42px", marginBottom: "14px", boxShadow: "0 8px 32px rgba(0,0,0,0.35)" }}></div>
        <div style={{ color: "#D4A017", fontSize: "26px", fontWeight: "bold", letterSpacing: "1px" }}>{tr.appName}</div>
        <div style={{ color: "rgba(255,255,255,0.6)", fontSize: "12px", marginTop: "5px", fontStyle: "italic" }}>{tr.tagline}</div>
      </div>
      <div style={{ ...baseCard, width: "100%", maxWidth: "380px" }}>
        <div style={{ color: "#fff", fontSize: "20px", fontWeight: "700", marginBottom: "4px" }}>{tr.welcome} </div>
        <div style={{ color: "rgba(255,255,255,0.55)", fontSize: "12px", marginBottom: "20px", lineHeight: "1.6" }}>{tr.appDesc}</div>
        <div style={{ color: "rgba(255,255,255,0.4)", fontSize: "10px", textTransform: "uppercase", letterSpacing: "2px", marginBottom: "12px" }}>{tr.selectLang}</div>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {LANGUAGES.map((l) => (
            <button key={l.key} onClick={() => setSelected(l.key)} style={{ display: "flex", alignItems: "center", gap: "12px", padding: "12px 16px", borderRadius: "14px", border: selected === l.key ? "2px solid #D4A017" : "2px solid rgba(255,255,255,0.1)", background: selected === l.key ? "rgba(212,160,23,0.15)" : "rgba(255,255,255,0.05)", cursor: "pointer", transition: "all 0.2s" }}>
              <span style={{ fontSize: "20px" }}>{l.flag}</span>
              <span style={{ color: selected === l.key ? "#D4A017" : "#fff", fontWeight: "600", fontSize: "15px" }}>{l.native}</span>
              {selected === l.key && <span style={{ marginLeft: "auto", color: "#D4A017" }}></span>}
            </button>
          ))}
        </div>
        <button onClick={() => { setLang(selected); onContinue(); }} style={{ width: "100%", marginTop: "20px", padding: "15px", borderRadius: "14px", background: "linear-gradient(135deg, #D4A017, #b8870f)", border: "none", color: "#fff", fontSize: "15px", fontWeight: "700", cursor: "pointer", boxShadow: "0 4px 20px rgba(212,160,23,0.35)" }}>
          {tr.continueBtn} 
        </button>
      </div>
      <div style={{ marginTop: "16px", color: "rgba(255,255,255,0.25)", fontSize: "11px" }}> Made for Nigeria</div>
    </div>
  );
}

function AuthScreen({ t, mode, setMode, onAuth, onBack }) {
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [error, setError] = useState("");
  const handle = () => {
    if (mode === "login") {
      if (!form.email || !form.password) { setError("Please fill all fields"); return; }
      onAuth({ name: form.email.split("@")[0], email: form.email });
    } else {
      if (!form.name || !form.email || !form.password) { setError("Please fill all fields"); return; }
      if (form.password !== form.confirm) { setError("Passwords do not match"); return; }
      onAuth({ name: form.name, email: form.email });
    }
  };
  return (
    <div style={{ minHeight: "100vh", maxWidth: "480px", margin: "0 auto", background: "linear-gradient(160deg, #003d1f 0%, #006B3C 50%, #1A6B9A 100%)", fontFamily: "'Georgia', serif", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "24px", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: "-60px", right: "-60px", width: "250px", height: "250px", borderRadius: "50%", border: "2px solid rgba(212,160,23,0.12)" }} />
      <div style={{ textAlign: "center", marginBottom: "24px" }}>
        <div style={{ fontSize: "42px", marginBottom: "8px" }}></div>
        <div style={{ color: "#D4A017", fontSize: "22px", fontWeight: "bold" }}>{t.appName}</div>
      </div>
      <div style={{ ...baseCard, width: "100%", maxWidth: "380px" }}>
        <div style={{ display: "flex", background: "rgba(255,255,255,0.07)", borderRadius: "12px", padding: "4px", marginBottom: "20px" }}>
          {[ ["login", t.login], ["signup", t.signup] ].map(([m, label]) => (
            <button key={m} onClick={() => { setMode(m); setError(""); }} style={{ flex: 1, padding: "9px", borderRadius: "10px", border: "none", background: mode === m ? "rgba(212,160,23,0.25)" : "transparent", color: mode === m ? "#D4A017" : "rgba(255,255,255,0.5)", fontWeight: mode === m ? "700" : "400", cursor: "pointer", fontSize: "13px" }}>
              {label}
            </button>
          ))}
        </div>
        {mode === "signup" && <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder={t.fullName} style={inputStyle} />}
        <input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder={t.email} type="email" style={inputStyle} />
        <input value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} placeholder={t.password} type="password" style={inputStyle} />
        {mode === "signup" && <input value={form.confirm} onChange={(e) => setForm({ ...form, confirm: e.target.value })} placeholder={t.confirmPass} type="password" style={inputStyle} />}
        {error && <div style={{ color: "#e74c3c", fontSize: "12px", marginBottom: "10px", textAlign: "center" }}>{error}</div>}
        <button onClick={handle} style={{ width: "100%", padding: "14px", borderRadius: "12px", background: "linear-gradient(135deg, #D4A017, #b8870f)", border: "none", color: "#fff", fontWeight: "700", cursor: "pointer", fontSize: "15px", marginBottom: "12px" }}>
          {mode === "login" ? t.loginBtn : t.signupBtn}
        </button>
        <div style={{ textAlign: "center", fontSize: "12px", color: C.muted }}>
          {mode === "login" ? t.noAccount : t.hasAccount}{" "}
          <span onClick={() => { setMode(mode === "login" ? "signup" : "login"); setError(""); }} style={{ color: C.gold, cursor: "pointer", fontWeight: "600" }}>
            {mode === "login" ? t.signup : t.login}
          </span>
        </div>
      </div>
      <button onClick={onBack} style={{ marginTop: "16px", background: "none", border: "none", color: "rgba(255,255,255,0.4)", cursor: "pointer", fontSize: "12px" }}> Back</button>
    </div>
  );
}

function HomeTab({ t, totalCal, water, setWater, steps, bmi, meals, setTab, user }) {
  const h = t.home;
  return (
    <div>
      <div style={{ marginBottom: "18px" }}>
        <div style={{ fontSize: "21px", fontWeight: "700" }}>{h.greeting}, {user?.name?.split(" ")[0] || ""} </div>
        <div style={{ color: C.muted, fontSize: "12px" }}>{h.subtitle}</div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "14px" }}>
        {[
          { label: h.calories, value: totalCal, unit: "kcal", icon: "", color: "#e74c3c" },
          { label: h.water, value: water, unit: "/8", icon: "", color: "#3498db" },
          { label: h.steps, value: steps.toLocaleString(), unit: "", icon: "", color: "#2ecc71" },
          { label: h.bmi, value: bmi, unit: "", icon: "", color: C.gold },
        ].map((s, i) => (
          <div key={i} style={{ ...baseCard, margin: 0, textAlign: "center", padding: "14px" }}>
            <div style={{ fontSize: "24px" }}>{s.icon}</div>
            <div style={{ fontSize: "20px", fontWeight: "800", color: s.color }}>{s.value}<span style={{ fontSize: "11px", color: C.muted }}>{s.unit}</span></div>
            <div style={{ fontSize: "10px", color: C.muted, marginTop: "2px" }}>{s.label}</div>
          </div>
        ))}
      </div>
      <div style={{ ...baseCard }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
          <span style={{ fontWeight: "600", fontSize: "13px" }}> {h.water}</span>
          <span style={{ color: C.gold, fontWeight: "700", fontSize: "13px" }}>{water}/8</span>
        </div>
        <div style={{ display: "flex", gap: "5px" }}>
          {Array(8).fill(0).map((_, i) => (
            <button key={i} onClick={() => setWater(i + 1)} style={{ flex: 1, height: "26px", borderRadius: "7px", border: "none", background: i < water ? "#3498db" : "rgba(255,255,255,0.1)", cursor: "pointer", transition: "all 0.2s" }} />
          ))}
        </div>
      </div>
      <div style={{ ...baseCard }}>
        <div style={{ fontWeight: "700", marginBottom: "10px", fontSize: "13px" }}> {h.weeklyProgress}</div>
        <ResponsiveContainer width="100%" height={120}>
          <BarChart data={WEEKLY_DATA} margin={{ top: 0, right: 0, left: -30, bottom: 0 }}>
            <XAxis dataKey="day" tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 10 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 9 }} />
            <Tooltip contentStyle={{ background: "#004d26", border: "none", borderRadius: "10px", color: "#fff", fontSize: "11px" }} />
            <Bar dataKey="cal" fill="#D4A017" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "14px" }}>
        <button onClick={() => setTab("nutrition")} style={{ ...baseCard, margin: 0, border: `1.5px solid ${C.gold}`, cursor: "pointer", textAlign: "center", padding: "14px" }}>
          <div style={{ fontSize: "22px" }}></div>
          <div style={{ color: C.gold, fontSize: "12px", fontWeight: "600", marginTop: "5px" }}>{h.quickLog}</div>
        </button>
        <button onClick={() => setTab("phc")} style={{ ...baseCard, margin: 0, border: "1.5px solid #3498db", cursor: "pointer", textAlign: "center", padding: "14px" }}>
          <div style={{ fontSize: "22px" }}></div>
          <div style={{ color: "#3498db", fontSize: "12px", fontWeight: "600", marginTop: "5px" }}>{h.findClinic}</div>
        </button>
      </div>
      <div style={{ ...baseCard, background: "rgba(212,160,23,0.12)", borderColor: "rgba(212,160,23,0.3)" }}>
        <div style={{ color: C.gold, fontWeight: "700", marginBottom: "5px", fontSize: "13px" }}> {h.healthTip}</div>
        <div style={{ color: "rgba(255,255,255,0.75)", fontSize: "12px", lineHeight: "1.6" }}>{h.tip}</div>
      </div>
      <div style={{ ...baseCard }}>
        <div style={{ fontWeight: "700", marginBottom: "10px", fontSize: "13px" }}> {h.recentMeals}</div>
        {meals.slice(-3).map((m) => (
          <div key={m.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "7px 0", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
            <div>
              <div style={{ fontSize: "13px", fontWeight: "600" }}>{m.name}</div>
              <div style={{ fontSize: "10px", color: C.muted }}>{m.type}</div>
            </div>
            <div style={{ color: C.gold, fontWeight: "700", fontSize: "13px" }}>{m.cal} kcal</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function NutritionTab({ t, meals, mealForm, setMealForm, addMeal, totalCal, totalProtein, totalCarbs, totalFat }) {
  const n = t.nutrition;
  const [activeView, setActiveView] = useState("log");
  const [search, setSearch] = useState("");
  const mealTypes = [n.breakfast, n.lunch, n.dinner, n.snack];
  const filtered = NIGERIAN_FOODS.filter((f) => f.name.toLowerCase().includes(search.toLowerCase()) || f.region.toLowerCase().includes(search.toLowerCase()));
  const macroData = [
    { name: "Protein", value: totalProtein, color: "#3498db" },
    { name: "Carbs", value: totalCarbs, color: "#f39c12" },
    { name: "Fat", value: totalFat, color: "#9b59b6" },
  ].filter((d) => d.value > 0);

  return (
    <div>
      <div style={{ fontSize: "19px", fontWeight: "700", marginBottom: "12px" }}> {n.title}</div>
      <div style={{ display: "flex", background: "rgba(255,255,255,0.07)", borderRadius: "12px", padding: "4px", marginBottom: "14px", gap: "4px" }}>
        {[["log", " Log"], ["db", " " + n.foodDb], ["charts", " " + n.charts]].map(([v, l]) => (
          <button key={v} onClick={() => setActiveView(v)} style={{ flex: 1, padding: "8px 4px", borderRadius: "9px", border: "none", background: activeView === v ? "rgba(212,160,23,0.25)" : "transparent", color: activeView === v ? C.gold : "rgba(255,255,255,0.5)", fontWeight: activeView === v ? "700" : "400", cursor: "pointer", fontSize: "11px" }}>{l}</button>
        ))}
      </div>
      {activeView === "log" && (
        <div>
          <div style={{ ...baseCard, background: "rgba(0,122,61,0.25)", borderColor: "rgba(0,200,100,0.3)" }}>
            <div style={{ fontWeight: "700", marginBottom: "8px", color: C.gold, fontSize: "13px" }}> {n.total}</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "6px", textAlign: "center" }}>
              {[
                { label: "Cal", value: totalCal, unit: "kcal", color: "#e74c3c" },
                { label: "Pro", value: totalProtein, unit: "g", color: "#3498db" },
                { label: "Carb", value: totalCarbs, unit: "g", color: "#f39c12" },
                { label: "Fat", value: totalFat, unit: "g", color: "#9b59b6" },
              ].map((s, i) => (
                <div key={i}>
                  <div style={{ fontSize: "16px", fontWeight: "800", color: s.color }}>{s.value}</div>
                  <div style={{ fontSize: "9px", color: C.muted }}>{s.unit}</div>
                  <div style={{ fontSize: "9px", color: C.muted }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ ...baseCard }}>
            <div style={{ fontWeight: "700", marginBottom: "12px", fontSize: "13px" }}> {n.logMeal}</div>
            <input value={mealForm.name} onChange={(e) => setMealForm({ ...mealForm, name: e.target.value })} placeholder={n.mealName} style={inputStyle} />
            <select value={mealForm.type} onChange={(e) => setMealForm({ ...mealForm, type: e.target.value })} style={inputStyle}>
              {mealTypes.map((mt) => <option key={mt} value={mt} style={{ background: "#004d26" }}>{mt}</option>)}
            </select>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
              {[["cal", n.calories], ["protein", n.protein], ["carbs", n.carbs], ["fat", n.fat]].map(([key, ph]) => <input key={key} type="number" value={mealForm[key]} onChange={(e) => setMealForm({ ...mealForm, [key]: e.target.value })} placeholder={ph} style={inputStyle} />)}
            </div>
            <button onClick={() => addMeal(null)} style={{ width: "100%", padding: "12px", borderRadius: "12px", background: "linear-gradient(135deg, #D4A017, #b8870f)", border: "none", color: "#fff", fontWeight: "700", cursor: "pointer", fontSize: "14px" }}>{n.addMeal} </button>
          </div>
          <div style={{ ...baseCard }}>
            <div style={{ fontWeight: "700", marginBottom: "10px", fontSize: "13px" }}> {n.todayLog}</div>
            {meals.length === 0 ? <div style={{ color: C.muted, fontSize: "12px", textAlign: "center", padding: "14px" }}>{n.noMeals}</div> : meals.map((m) => (
              <div key={m.id} style={{ padding: "9px 0", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <div style={{ fontWeight: "600", fontSize: "13px" }}>{m.name}</div>
                  <div style={{ color: C.gold, fontWeight: "700", fontSize: "13px" }}>{m.cal} kcal</div>
                </div>
                <div style={{ display: "flex", gap: "8px", marginTop: "3px" }}>
                  <span style={{ fontSize: "10px", color: "#3498db" }}>P:{m.protein}g</span>
                  <span style={{ fontSize: "10px", color: "#f39c12" }}>C:{m.carbs}g</span>
                  <span style={{ fontSize: "10px", color: "#9b59b6" }}>F:{m.fat}g</span>
                  <span style={{ fontSize: "10px", color: C.muted, marginLeft: "auto" }}>{m.type}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {activeView === "db" && (
        <div>
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder={n.mealName} style={{ ...inputStyle, marginBottom: "10px" }} />
          <select value={mealForm.type} onChange={(e) => setMealForm({ ...mealForm, type: e.target.value })} style={{ ...inputStyle, marginBottom: "12px" }}>
            {mealTypes.map((mt) => <option key={mt} value={mt} style={{ background: "#004d26" }}>{mt}</option>)}
          </select>
          <div style={{ color: C.muted, fontSize: "11px", marginBottom: "10px" }}>Tap a food to add to your log</div>
          {filtered.map((food) => (
            <div key={food.id} style={{ ...baseCard, marginBottom: "10px", padding: "14px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: "700", fontSize: "14px" }}>{food.name}</div>
                  <div style={{ fontSize: "10px", color: C.gold, marginBottom: "6px" }}> {food.region}</div>
                  <div style={{ display: "flex", gap: "8px" }}>
                    <span style={{ fontSize: "10px", color: "#e74c3c" }}>{food.cal}kcal</span>
                    <span style={{ fontSize: "10px", color: "#3498db" }}>P:{food.protein}g</span>
                    <span style={{ fontSize: "10px", color: "#f39c12" }}>C:{food.carbs}g</span>
                    <span style={{ fontSize: "10px", color: "#9b59b6" }}>F:{food.fat}g</span>
                  </div>
                </div>
                <button onClick={() => addMeal(food)} style={{ padding: "8px 14px", borderRadius: "10px", background: "rgba(212,160,23,0.2)", border: `1px solid ${C.gold}`, color: C.gold, cursor: "pointer", fontSize: "13px", fontWeight: "700", marginLeft: "10px" }}>+ Add</button>
              </div>
            </div>
          ))}
        </div>
      )}
      {activeView === "charts" && (
        <div>
          <div style={{ ...baseCard }}>
            <div style={{ fontWeight: "700", marginBottom: "12px", fontSize: "13px" }}> {n.macros}</div>
            {macroData.length > 0 ? (
              <ResponsiveContainer width="100%" height={180}>
                <PieChart>
                  <Pie data={macroData} cx="50%" cy="50%" outerRadius={70} dataKey="value" label={({ name, value }) => `${name}: ${value}g`} labelLine={{ stroke: "rgba(255,255,255,0.3)" }} fontSize={10}>
                    {macroData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                  </Pie>
                  <Tooltip contentStyle={{ background: "#004d26", border: "none", borderRadius: "10px", color: "#fff", fontSize: "11px" }} />
                </PieChart>
              </ResponsiveContainer>
            ) : <div style={{ textAlign: "center", color: C.muted, padding: "30px", fontSize: "12px" }}>Log meals to see charts</div>}
            <div style={{ display: "flex", justifyContent: "center", gap: "14px", marginTop: "8px" }}>
              {[{ label: "Protein", color: "#3498db" }, { label: "Carbs", color: "#f39c12" }, { label: "Fat", color: "#9b59b6" }].map((l) => (
                <div key={l.label} style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                  <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: l.color }} />
                  <span style={{ fontSize: "10px", color: C.muted }}>{l.label}</span>
                </div>
              ))}
            </div>
          </div>
          <div style={{ ...baseCard }}>
            <div style={{ fontWeight: "700", marginBottom: "10px", fontSize: "13px" }}> {n.weekly}</div>
            <ResponsiveContainer width="100%" height={150}>
              <LineChart data={WEEKLY_DATA} margin={{ top: 5, right: 5, left: -30, bottom: 0 }}>
                <XAxis dataKey="day" tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 9 }} />
                <Tooltip contentStyle={{ background: "#004d26", border: "none", borderRadius: "10px", color: "#fff", fontSize: "11px" }} />
                <Line type="monotone" dataKey="cal" stroke="#D4A017" strokeWidth={2.5} dot={{ fill: "#D4A017", r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div style={{ ...baseCard }}>
            <div style={{ fontWeight: "700", marginBottom: "10px", fontSize: "13px" }}> Today's Breakdown</div>
            <ResponsiveContainer width="100%" height={130}>
              <BarChart data={[{ name: "Calories", value: totalCal }, { name: "Protein", value: totalProtein * 4 }, { name: "Carbs", value: totalCarbs * 4 }, { name: "Fat", value: totalFat * 9 }]} margin={{ top: 0, right: 0, left: -30, bottom: 0 }}>
                <XAxis dataKey="name" tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 9 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 9 }} />
                <Tooltip contentStyle={{ background: "#004d26", border: "none", borderRadius: "10px", color: "#fff", fontSize: "11px" }} />
                <Bar dataKey="value" fill="#007A3D" radius={[5, 5, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
}

function PHCTab({ t }) {
  const p = t.phc;
  const [search, setSearch] = useState("");
  const filtered = PHC_CLINICS.filter((c) => c.name.toLowerCase().includes(search.toLowerCase()) || c.address.toLowerCase().includes(search.toLowerCase()));
  return (
    <div>
      <div style={{ fontSize: "19px", fontWeight: "700", marginBottom: "4px" }}> {p.title}</div>
      <div style={{ color: C.muted, fontSize: "12px", marginBottom: "14px" }}>{p.subtitle}</div>
      <div style={{ ...baseCard, background: "rgba(231,76,60,0.18)", borderColor: "rgba(231,76,60,0.4)", padding: "11px 16px", marginBottom: "12px" }}>
        <span style={{ color: "#e74c3c", fontWeight: "700", fontSize: "13px" }}> {p.emergency}</span>
      </div>
      <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder={p.search} style={{ ...inputStyle, marginBottom: "12px" }} />
      <div style={{ fontWeight: "600", marginBottom: "8px", color: C.gold, fontSize: "13px" }}> {p.nearby}</div>
      {filtered.map((clinic, i) => (
        <div key={i} style={{ ...baseCard }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px" }}>
            <div>
              <div style={{ fontWeight: "700", fontSize: "14px" }}>{clinic.name}</div>
              <div style={{ color: C.muted, fontSize: "11px" }}> {clinic.address}</div>
            </div>
            <span style={{ fontSize: "10px", padding: "3px 9px", borderRadius: "20px", fontWeight: "600", background: clinic.open ? "rgba(46,204,113,0.2)" : "rgba(231,76,60,0.2)", color: clinic.open ? "#2ecc71" : "#e74c3c", border: `1px solid ${clinic.open ? "#2ecc71" : "#e74c3c"}` }}>
              {clinic.open ? p.open : p.closed}
            </span>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "5px", marginBottom: "10px" }}>
            {clinic.services.map((s) => <span key={s} style={{ fontSize: "10px", padding: "3px 8px", borderRadius: "10px", background: "rgba(212,160,23,0.15)", color: C.gold, border: "1px solid rgba(212,160,23,0.3)" }}>{s}</span>)}
          </div>
          <div style={{ display: "flex", gap: "7px" }}>
            <button style={{ flex: 1, padding: "8px", borderRadius: "9px", background: "rgba(52,152,219,0.2)", border: "1px solid #3498db", color: "#3498db", cursor: "pointer", fontSize: "11px", fontWeight: "600" }}> {p.call}</button>
            <button style={{ flex: 1, padding: "8px", borderRadius: "9px", background: "rgba(212,160,23,0.15)", border: `1px solid ${C.gold}`, color: C.gold, cursor: "pointer", fontSize: "11px", fontWeight: "600" }}> {p.directions}</button>
            <button style={{ flex: 1, padding: "8px", borderRadius: "9px", background: "rgba(46,204,113,0.15)", border: "1px solid #2ecc71", color: "#2ecc71", cursor: "pointer", fontSize: "11px", fontWeight: "600" }}> {p.bookAppt}</button>
          </div>
        </div>
      ))}
    </div>
  );
}

function ProfileTab({ t, profile, setProfile, saveProfile, profileSaved, bmi, onLogout }) {
  const p = t.profile;
  const bloodGroups = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];
  const genotypes = ["AA", "AS", "SS", "AC", "SC"];
  const bmiStatus = () => {
    const b = parseFloat(bmi);
    if (isNaN(b)) return "";
    if (b < 18.5) return " Underweight";
    if (b < 25) return " Normal";
    if (b < 30) return " Overweight";
    return " Obese";
  };
  return (
    <div>
      <div style={{ fontSize: "19px", fontWeight: "700", marginBottom: "4px" }}> {p.title}</div>
      <div style={{ color: C.muted, fontSize: "12px", marginBottom: "14px" }}> NutriTrack-PHC+</div>
      {bmi !== "--" && (
        <div style={{ ...baseCard, textAlign: "center", background: "rgba(212,160,23,0.12)", borderColor: "rgba(212,160,23,0.3)", marginBottom: "12px" }}>
          <div style={{ fontSize: "32px", fontWeight: "800", color: C.gold }}>{bmi}</div>
          <div style={{ color: C.muted, fontSize: "12px" }}>BMI  {bmiStatus()}</div>
        </div>
      )}
      <div style={{ ...baseCard }}>
        <div style={{ fontWeight: "700", marginBottom: "12px", fontSize: "13px" }}> Personal Info</div>
        {[["name", p.name, "text"], ["age", p.age, "number"], ["weight", p.weight, "number"], ["height", p.height, "number"]].map(([key, ph, type]) => (
          <input key={key} type={type} value={profile[key]} onChange={(e) => setProfile({ ...profile, [key]: e.target.value })} placeholder={ph} style={inputStyle} />
        ))}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
          <select value={profile.bloodGroup} onChange={(e) => setProfile({ ...profile, bloodGroup: e.target.value })} style={inputStyle}>{bloodGroups.map((g) => <option key={g} value={g} style={{ background: "#004d26" }}>{g}</option>)}</select>
          <select value={profile.genotype} onChange={(e) => setProfile({ ...profile, genotype: e.target.value })} style={inputStyle}>{genotypes.map((g) => <option key={g} value={g} style={{ background: "#004d26" }}>{g}</option>)}</select>
        </div>
      </div>
      <div style={{ ...baseCard }}>
        <div style={{ fontWeight: "700", marginBottom: "10px", fontSize: "13px" }}> {p.healthGoal}</div>
        <div style={{ display: "flex", flexDirection: "column", gap: "7px" }}>
          {p.goals.map((g, i) => (
            <button key={i} onClick={() => setProfile({ ...profile, goal: i })} style={{ padding: "10px 14px", borderRadius: "11px", textAlign: "left", border: profile.goal === i ? `2px solid ${C.gold}` : "2px solid rgba(255,255,255,0.1)", background: profile.goal === i ? "rgba(212,160,23,0.15)" : "rgba(255,255,255,0.05)", color: profile.goal === i ? C.gold : "#fff", cursor: "pointer", fontSize: "13px", fontWeight: "600" }}>{profile.goal === i ? " " : ""}{g}</button>
          ))}
        </div>
      </div>
      <button onClick={saveProfile} style={{ width: "100%", padding: "14px", borderRadius: "13px", background: "linear-gradient(135deg, #D4A017, #b8870f)", border: "none", color: "#fff", fontSize: "14px", fontWeight: "700", cursor: "pointer", boxShadow: "0 4px 18px rgba(212,160,23,0.3)", marginBottom: "8px" }}>{p.save} </button>
      {profileSaved && <div style={{ textAlign: "center", color: "#2ecc71", fontWeight: "600", fontSize: "13px", padding: "6px" }}> {p.saved}</div>}
      <button onClick={onLogout} style={{ width: "100%", padding: "13px", borderRadius: "13px", background: "rgba(231,76,60,0.15)", border: "1px solid rgba(231,76,60,0.4)", color: "#e74c3c", fontSize: "14px", fontWeight: "600", cursor: "pointer", marginTop: "6px" }}> {p.logout}</button>
    </div>
  );
}


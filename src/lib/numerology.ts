export type Gender = "נקבה" | "זכר";

export interface UserProfile {
  name: string;
  birthDate: string; // YYYY-MM-DD
  gender: Gender;
}

export interface NumerologyNumbers {
  personalYear: number;
  personalMonth: number;
  personalDay: number;
}

export interface DetailedNumbers extends NumerologyNumbers {
  rawDay: number;
  rawMonth: number;
  rawYear: number;
}

// Reduce to single digit 1-9, no master numbers
export function reduce(n: number): number {
  let result = n;
  while (result > 9) {
    result = String(result)
      .split("")
      .reduce((sum, d) => sum + parseInt(d, 10), 0);
  }
  return result;
}

export function getPersonalYear(birthDay: number, birthMonth: number): number {
  const today = new Date();
  const thisYear = today.getFullYear();
  const birthdayThisYear = new Date(thisYear, birthMonth - 1, birthDay);
  const birthdayPassed = today >= birthdayThisYear;

  let targetYear: number;
  if (birthMonth <= 6) {
    targetYear = birthdayPassed ? 2026 : 2025;
  } else {
    targetYear = birthdayPassed ? 2027 : 2026;
  }

  return reduce(birthDay + birthMonth + targetYear);
}

export function getPersonalMonth(personalYear: number): number {
  const currentMonth = new Date().getMonth() + 1;
  return reduce(personalYear + currentMonth);
}

export function getPersonalDay(personalMonth: number): number {
  const currentDay = new Date().getDate();
  return reduce(personalMonth + currentDay);
}

export function calculate(profile: UserProfile): NumerologyNumbers {
  const parts = profile.birthDate.split("-");
  const birthDay = parseInt(parts[2], 10);
  const birthMonth = parseInt(parts[1], 10);

  const personalYear = getPersonalYear(birthDay, birthMonth);
  const personalMonth = getPersonalMonth(personalYear);
  const personalDay = getPersonalDay(personalMonth);

  return { personalYear, personalMonth, personalDay };
}

export function calculateDetailed(profile: UserProfile): DetailedNumbers {
  const parts = profile.birthDate.split("-");
  const birthDay = parseInt(parts[2], 10);
  const birthMonth = parseInt(parts[1], 10);

  const today = new Date();
  const thisYear = today.getFullYear();
  const birthdayThisYear = new Date(thisYear, birthMonth - 1, birthDay);
  const birthdayPassed = today >= birthdayThisYear;

  let targetYear: number;
  if (birthMonth <= 6) {
    targetYear = birthdayPassed ? 2026 : 2025;
  } else {
    targetYear = birthdayPassed ? 2027 : 2026;
  }

  const rawYear = birthDay + birthMonth + targetYear;
  const personalYear = reduce(rawYear);

  const currentMonth = today.getMonth() + 1;
  const rawMonth = personalYear + currentMonth;
  const personalMonth = reduce(rawMonth);

  const currentDay = today.getDate();
  const rawDay = personalMonth + currentDay;
  const personalDay = reduce(rawDay);

  return { personalYear, personalMonth, personalDay, rawDay, rawMonth, rawYear };
}

// ─── Content data ─────────────────────────────────────────────────────────────

export interface YearContent {
  title: string;
  frequency: string;
  brings: string;
  recommendation: Record<Gender, string>;
}

export const yearContent: Record<number, YearContent> = {
  1: {
    title: "שנת התחלות ופתיחת מחזור חדש",
    frequency: "עצמאות, יוזמה, מנהיגות עצמית",
    brings:
      "זמן לזרוע זרעים חדשים, להתחיל פרויקטים ולקבל החלטות אמיצות. אנרגיה של פריצת דרך.",
    recommendation: {
      נקבה: "תתחילי דברים שדחית. זו שנת הלידה מחדש שלך.",
      זכר: "תתחיל דברים שדחית. זו שנת הלידה מחדש שלך.",
    },
  },
  2: {
    title: "שנת שיתוף פעולה וסבלנות",
    frequency: "רגישות, שותפות, איזון, המתנה",
    brings:
      "שנה שקטה יותר פנימה. מערכות יחסים עולות לקדמת הבמה. הזמן לבנות ולחכות לזרעים שזרעת.",
    recommendation: {
      נקבה: "אל תמהרי. סמכי על התהליך.",
      זכר: "אל תמהר. סמוך על התהליך.",
    },
  },
  3: {
    title: "שנת ביטוי ויצירה",
    frequency: "שמחה, יצירתיות, תקשורת, חברתיות",
    brings:
      "אנרגיה קלה ומאירה. שנה לבטא את עצמך, ליצור, להופיע ולשמוח. שנה של פריחה חברתית.",
    recommendation: {
      נקבה: "צאי החוצה, בטאי את עצמך, אל תצנזרי.",
      זכר: "צא החוצה, בטא את עצמך, אל תצנזר.",
    },
  },
  4: {
    title: "שנת בניה ויסודות",
    frequency: "עבודה קשה, סדר, יציבות, תכנון",
    brings:
      "שנה לבנות תשתיות איתנות - בקריירה, בכסף, בבריאות. פחות זוהר, יותר עומק.",
    recommendation: {
      נקבה: "תהיי ממוקדת ותעבדי בשיטתיות. מה שתבני עכשיו ישרת אותך שנים.",
      זכר: "תהיה ממוקד ותעבד בשיטתיות. מה שתבנה עכשיו ישרת אותך שנים.",
    },
  },
  5: {
    title: "שנת שינוי וחופש",
    frequency: "הרפתקה, שינוי, חופש, גמישות",
    brings:
      "שנה של תנועה ושינויים. דברים זזים מהר. הזדמנויות מגיעות ועוזבות. שנה לצאת מאזורי נוחות.",
    recommendation: {
      נקבה: "היי גמישה. שינוי זה לא סכנה - זו ההזמנה שלך.",
      זכר: "היה גמיש. שינוי זה לא סכנה - זו ההזמנה שלך.",
    },
  },
  6: {
    title: "שנת אחריות ואהבה",
    frequency: "בית, משפחה, טיפול, הרמוניה",
    brings:
      "שנה שמשפחה ובית עולים לראש סדר העדיפויות. קשרים מתחזקים. שנה לאזן בין נתינה לקבלה.",
    recommendation: {
      נקבה: "טפלי בעצמך כמו שאת טופלת באחרים.",
      זכר: "טפל בעצמך כמו שאתה טופל באחרים.",
    },
  },
  7: {
    title: "שנת עומק ורוחניות",
    frequency: "חיפוש פנימי, האטת קצב, חכמה, אמונה",
    brings:
      "שנה עמוקה ומשמעותית. זמן להאט את הקצב, לתת לגוף לנוח ולתובנות לעלות מבפנים. שנה לחשוב על השינויים שרצית לעשות בשנים קודמות ולא ביצעת - ולהסתכל בהכרת תודה על הדרך שעברת.",
    recommendation: {
      נקבה:
        "אל תדחפי קדימה בכוח. תני לעצמך רשות לנוח, להרהר ולהתחבר לקול הפנימי שלך.",
      זכר: "אל תדחף קדימה בכוח. תן לעצמך רשות לנוח, להרהר ולהתחבר לקול הפנימי שלך.",
    },
  },
  8: {
    title: "שנת כוח והצלחה",
    frequency: "שפע, כוח, הצלחה, שאפתנות, כסף",
    brings:
      "שנה לקצור את מה שזרעת. אנרגיה של שפע והצלחה עסקית. כוח אישי בשיאו.",
    recommendation: {
      נקבה: "תתמקדי ביעדים ואל תתנצלי על ההצלחה שלך.",
      זכר: "תתמקד ביעדים ואל תתנצל על ההצלחה שלך.",
    },
  },
  9: {
    title: "שנת שחרור וסגירת מעגלים",
    frequency: "שחרור, סיום, נדיבות, חמלה",
    brings:
      "סוף המחזור. מה שלא משרת - עוזב. זמן לסגור דלתות ישנות כדי שדלתות חדשות ייפתחו.",
    recommendation: {
      נקבה: "שחררי ללא פחד. הסיום הוא ההתחלה.",
      זכר: "שחרר ללא פחד. הסיום הוא ההתחלה.",
    },
  },
};

export interface MonthContent {
  title: string;
}

export const monthContent: Record<number, MonthContent> = {
  1: { title: "חודש של התחלות והחלטות חדשות" },
  2: { title: "חודש של סבלנות ושיתוף פעולה" },
  3: { title: "חודש של ביטוי עצמי ושמחה" },
  4: { title: "חודש של עבודה, סדר ותכנון" },
  5: { title: "חודש של שינויים וגמישות" },
  6: { title: "חודש של אהבה, בית ואחריות" },
  7: { title: "חודש של האטה, עומק וחיבור פנימי" },
  8: { title: "חודש של כוח, שפע והצלחה" },
  9: { title: "חודש של שחרור וסגירת מעגלים" },
};

export interface DayContent {
  recommended: Record<Gender, string>;
  notRecommended: string;
}

export const dayContent: Record<number, DayContent> = {
  1: {
    recommended: {
      נקבה: "יום מצוין להתחלות, יוזמות והחלטות. תתחילי משהו שדחית.",
      זכר: "יום מצוין להתחלות, יוזמות והחלטות. תתחיל משהו שדחית.",
    },
    notRecommended: "לחכות ולדחות.",
  },
  2: {
    recommended: {
      נקבה: "יום טוב לשיחות רגשיות ושיתוף פעולה. תקשיבי לאחרים.",
      זכר: "יום טוב לשיחות רגשיות ושיתוף פעולה. תקשיב לאחרים.",
    },
    notRecommended: "עימותים וקבלת החלטות גדולות לבד.",
  },
  3: {
    recommended: {
      נקבה: "יום לביטוי עצמי, יצירה וחברה. תהיי קלה ושמחה.",
      זכר: "יום לביטוי עצמי, יצירה וחברה. תהיה קל ושמח.",
    },
    notRecommended: "עבודה שגרתית ומונוטונית.",
  },
  4: {
    recommended: {
      נקבה: "יום לעבודה ממוקדת, סדר וארגון. תעשי רשימות ותבצעי.",
      זכר: "יום לעבודה ממוקדת, סדר וארגון. תעשה רשימות ותבצע.",
    },
    notRecommended: "פיזור ובזבוז זמן.",
  },
  5: {
    recommended: {
      נקבה: "יום לשינויים, גמישות והפתעות. תהיי פתוחה לבלתי צפוי.",
      זכר: "יום לשינויים, גמישות והפתעות. תהיה פתוח לבלתי צפוי.",
    },
    notRecommended: "תכניות נוקשות מדי.",
  },
  6: {
    recommended: {
      נקבה: "יום לטיפול בעצמך ובאחרים. תפנקי את עצמך ואת הסביבה.",
      זכר: "יום לטיפול בעצמך ובאחרים. תפנק את עצמך ואת הסביבה.",
    },
    notRecommended: "להתעלם מהצרכים הרגשיים.",
  },
  7: {
    recommended: {
      נקבה: "יום לחשיבה עמוקה, מדיטציה ושקט. תני לעצמך לנוח ולהרהר.",
      זכר: "יום לחשיבה עמוקה, מדיטציה ושקט. תן לעצמך לנוח ולהרהר.",
    },
    notRecommended: "פגישות עסקיות ועניינים כספיים.",
  },
  8: {
    recommended: {
      נקבה: "יום לעסקים, כסף והחלטות כלכליות. תהיי נחושה ואמיצה.",
      זכר: "יום לעסקים, כסף והחלטות כלכליות. תהיה נחוש ואמיץ.",
    },
    notRecommended: "להיות פסיבי ולחכות.",
  },
  9: {
    recommended: {
      נקבה: "יום לנתינה, שחרור וסגירת עניינים. תסגרי מה שתלוי באוויר.",
      זכר: "יום לנתינה, שחרור וסגירת עניינים. תסגור מה שתלוי באוויר.",
    },
    notRecommended: "להתחיל פרויקטים חדשים.",
  },
};

// ─── Deep Analysis ─────────────────────────────────────────────────────────────

export const digitMeaning: Record<number, { keyword: string; essence: string }> = {
  1: { keyword: "יוזמה", essence: "אנרגיה של התחלה, עצמאות ומנהיגות עצמית" },
  2: { keyword: "שיתוף", essence: "אנרגיה של רגישות, שיתוף פעולה וסבלנות" },
  3: { keyword: "ביטוי", essence: "אנרגיה של יצירה, שמחה ותקשורת" },
  4: { keyword: "בנייה", essence: "אנרגיה של יציבות, סדר ועבודה מעמיקה" },
  5: { keyword: "שינוי", essence: "אנרגיה של חופש, גמישות והרפתקה" },
  6: { keyword: "אהבה", essence: "אנרגיה של טיפול, בית והרמוניה" },
  7: { keyword: "עומק", essence: "אנרגיה של חיפוש פנימי, חכמה ורוחניות" },
  8: { keyword: "כוח", essence: "אנרגיה של שפע, הצלחה ואמביציה" },
  9: { keyword: "שחרור", essence: "אנרגיה של סיום, חמלה ונדיבות" },
};

export function getDigits(raw: number): number[] {
  return String(raw)
    .split("")
    .map((d) => parseInt(d, 10))
    .filter((d) => d > 0);
}

export interface CyclePhase {
  phase: string;
  description: Record<Gender, string>;
}

export function getCyclePhase(personalYear: number, gender: Gender): CyclePhase {
  if (personalYear <= 3) {
    return {
      phase: "שלב הזריעה (שנים 1-3)",
      description: {
        נקבה: "את בשלב הזריעה של המחזור שלך. זה הזמן להתחיל, לבנות ולהניח יסודות. מה שאת שותלת עכשיו יניב פירות בהמשך.",
        זכר: "אתה בשלב הזריעה של המחזור שלך. זה הזמן להתחיל, לבנות ולהניח יסודות. מה שאתה שותל עכשיו יניב פירות בהמשך.",
      },
    };
  } else if (personalYear <= 6) {
    return {
      phase: "שלב הצמיחה (שנים 4-6)",
      description: {
        נקבה: "את בשלב הצמיחה של המחזור שלך. הזרעים שזרעת מתחילים לצמוח. עבודה, מחויבות ואהבה הם המפתחות שלך כרגע.",
        זכר: "אתה בשלב הצמיחה של המחזור שלך. הזרעים שזרעת מתחילים לצמוח. עבודה, מחויבות ואהבה הם המפתחות שלך כרגע.",
      },
    };
  } else {
    return {
      phase: "שלב הקציר (שנים 7-9)",
      description: {
        נקבה: "את בשלב הקציר של המחזור שלך. זמן לעמוד עמוק, לקצור את מה שבנית ולהתכונן לסגירת המחזור. כל שחרור פותח דלת חדשה.",
        זכר: "אתה בשלב הקציר של המחזור שלך. זמן לעמוד עמוק, לקצור את מה שבנית ולהתכונן לסגירת המחזור. כל שחרור פותח דלת חדשה.",
      },
    };
  }
}

const synthesisTemplates: Record<
  number,
  Record<number, Record<number, Record<Gender, string>>>
> = {};

export function getSynthesis(
  py: number,
  pm: number,
  pd: number,
  gender: Gender,
  name: string
): string {
  const pyWord = digitMeaning[py].keyword;
  const pmWord = digitMeaning[pm].keyword;
  const pdWord = digitMeaning[pd].keyword;

  const fem = gender === "נקבה";

  const yearDesc: Record<number, string> = {
    1: "שנה של פתיחת דרכים חדשות",
    2: "שנה של בניית קשרים וסבלנות",
    3: "שנה של ביטוי ושמחה",
    4: "שנה של עבודה ויציבות",
    5: "שנה של שינוי וחופש",
    6: "שנה של אהבה ואחריות",
    7: "שנה של עומק ורוחניות",
    8: "שנה של כוח ושפע",
    9: "שנה של שחרור וסיום",
  };

  const monthVerb: Record<number, string> = {
    1: "מחזק את היוזמה",
    2: "מזמין שיתוף פעולה",
    3: "מעצים את הביטוי",
    4: "מחזק את הבסיס",
    5: "מוסיף גמישות",
    6: "מביא חום ואהבה",
    7: "מעמיק את החיבור הפנימי",
    8: "מגביר את הכוח",
    9: "מוסיף חמלה ושחרור",
  };

  const dayAction: Record<number, Record<Gender, string>> = {
    1: { נקבה: "היום הוא יום מושלם לפעולה ויוזמה - תפעלי.", זכר: "היום הוא יום מושלם לפעולה ויוזמה - תפעל." },
    2: { נקבה: "היום מזמין אותך להקשיב ולשתף פעולה.", זכר: "היום מזמין אותך להקשיב ולשתף פעולה." },
    3: { נקבה: "היום הוא הזמן שלך לזרוח ולבטא את עצמך.", זכר: "היום הוא הזמן שלך לזרוח ולבטא את עצמך." },
    4: { נקבה: "היום קורא לך להתמקד ולעשות.", זכר: "היום קורא לך להתמקד ולעשות." },
    5: { נקבה: "היום מזמין אותך לזרום עם שינויים.", זכר: "היום מזמין אותך לזרום עם שינויים." },
    6: { נקבה: "היום מזמין אותך לתת ולקבל אהבה.", זכר: "היום מזמין אותך לתת ולקבל אהבה." },
    7: { נקבה: "היום קורא לך פנימה - לשקט ולהרהור.", זכר: "היום קורא לך פנימה - לשקט ולהרהור." },
    8: { נקבה: "היום תומך בהחלטות ועסקים - תהיי נחושה.", זכר: "היום תומך בהחלטות ועסקים - תהיה נחוש." },
    9: { נקבה: "היום מזמין אותך לשחרר ולסגור מעגלים.", זכר: "היום מזמין אותך לשחרר ולסגור מעגלים." },
  };

  return `${name}, ${fem ? "את" : "אתה"} ${fem ? "נמצאת" : "נמצא"} ב${yearDesc[py]}. החודש ${monthVerb[pm]} את האנרגיה הזו. ${dayAction[pd][gender]}`;
}

export interface DayMessages {
  keyMessage: Record<Gender, string>;
  energySupport: string;
  beAware: Record<Gender, string>;
  intuition: Record<Gender, string>;
}

export const dayMessages: Record<number, DayMessages> = {
  1: {
    keyMessage: {
      נקבה: "היום הוא שלך - קחי את הצעד הראשון שדחית.",
      זכר: "היום הוא שלך - קח את הצעד הראשון שדחית.",
    },
    energySupport: "האנרגיה תומכת ביוזמה, פגישות חדשות ופתיחת תהליכים.",
    beAware: {
      נקבה: "שימי לב לנטייה לשלוט בכל. תני מקום גם לאחרים.",
      זכר: "שים לב לנטייה לשלוט בכל. תן מקום גם לאחרים.",
    },
    intuition: {
      נקבה: "המספרים לוחשים: 'הרעיון שעולה לך בראש הבוקר - תעשי אותו.'",
      זכר: "המספרים לוחשים: 'הרעיון שעולה לך בראש הבוקר - תעשה אותו.'",
    },
  },
  2: {
    keyMessage: {
      נקבה: "היום מיועד לחיבור ולב - תקשיבי לאנשים סביבך.",
      זכר: "היום מיועד לחיבור ולב - תקשיב לאנשים סביבך.",
    },
    energySupport: "האנרגיה תומכת בשיחות עמוקות, פשרות ועיבוד רגשי.",
    beAware: {
      נקבה: "שימי לב לרגישות יתר. לא כל דבר מכוון נגדך.",
      זכר: "שים לב לרגישות יתר. לא כל דבר מכוון נגדך.",
    },
    intuition: {
      נקבה: "המספרים לוחשים: 'השיחה שאת נמנעת ממנה - היא בדיוק מה שצריך.'",
      זכר: "המספרים לוחשים: 'השיחה שאתה נמנע ממנה - היא בדיוק מה שצריך.'",
    },
  },
  3: {
    keyMessage: {
      נקבה: "היום הוא לביטוי, ליצירה ולשמחה - אל תצמצמי את עצמך.",
      זכר: "היום הוא לביטוי, ליצירה ולשמחה - אל תצמצם את עצמך.",
    },
    energySupport: "האנרגיה תומכת בפגישות חברתיות, יצירה אמנותית ותקשורת.",
    beAware: {
      נקבה: "שימי לב לפיזור. לא הכל צריך לקרות היום.",
      זכר: "שים לב לפיזור. לא הכל צריך לקרות היום.",
    },
    intuition: {
      נקבה: "המספרים לוחשים: 'מה שמשמח אותך - זה בדיוק מה שהעולם צריך ממך.'",
      זכר: "המספרים לוחשים: 'מה שמשמח אותך - זה בדיוק מה שהעולם צריך ממך.'",
    },
  },
  4: {
    keyMessage: {
      נקבה: "היום הוא לעבודה עמוקה ומסודרת - התמקדי ותבצעי.",
      זכר: "היום הוא לעבודה עמוקה ומסודרת - התמקד ותבצע.",
    },
    energySupport: "האנרגיה תומכת בתכנון, ארגון, עמידה בלוחות זמנים ועבודה בפועל.",
    beAware: {
      נקבה: "שימי לב לנוקשות. לפעמים גמישות קטנה מקדמת יותר.",
      זכר: "שים לב לנוקשות. לפעמים גמישות קטנה מקדמת יותר.",
    },
    intuition: {
      נקבה: "המספרים לוחשים: 'המשימה שאת דוחה היא בדיוק מה שיפתח לך דלת.'",
      זכר: "המספרים לוחשים: 'המשימה שאתה דוחה היא בדיוק מה שיפתח לך דלת.'",
    },
  },
  5: {
    keyMessage: {
      נקבה: "היום הוא לגמישות ופתיחות - תקבלי את הבלתי צפוי בברכה.",
      זכר: "היום הוא לגמישות ופתיחות - תקבל את הבלתי צפוי בברכה.",
    },
    energySupport: "האנרגיה תומכת בשינויים, הזדמנויות חדשות ויציאה מהשגרה.",
    beAware: {
      נקבה: "שימי לב לפזיזות. לא כל שינוי חייב לקרות היום.",
      זכר: "שים לב לפזיזות. לא כל שינוי חייב לקרות היום.",
    },
    intuition: {
      נקבה: "המספרים לוחשים: 'ההזדמנות שתופיע היום - היא לא במקרה.'",
      זכר: "המספרים לוחשים: 'ההזדמנות שתופיע היום - היא לא במקרה.'",
    },
  },
  6: {
    keyMessage: {
      נקבה: "היום הוא לאהבה ולטיפול - בעצמך ובאחרים.",
      זכר: "היום הוא לאהבה ולטיפול - בעצמך ובאחרים.",
    },
    energySupport: "האנרגיה תומכת בפינוק עצמי, קשרים משפחתיים ויצירת הרמוניה.",
    beAware: {
      נקבה: "שימי לב לנתינה מתוך חובה ולא מתוך רצון. הלב שלך יודע את ההבדל.",
      זכר: "שים לב לנתינה מתוך חובה ולא מתוך רצון. הלב שלך יודע את ההבדל.",
    },
    intuition: {
      נקבה: "המספרים לוחשים: 'מה שאת עושה לאחרים - תעשי גם לעצמך היום.'",
      זכר: "המספרים לוחשים: 'מה שאתה עושה לאחרים - תעשה גם לעצמך היום.'",
    },
  },
  7: {
    keyMessage: {
      נקבה: "היום הוא לשקט פנימי ולתובנות - תאפשרי לעצמך להאט.",
      זכר: "היום הוא לשקט פנימי ולתובנות - תאפשר לעצמך להאט.",
    },
    energySupport: "האנרגיה תומכת בלמידה, מדיטציה, כתיבה אישית ושתיקה פורייה.",
    beAware: {
      נקבה: "שימי לב לבידוד מוגזם. שקט לא אומר התנתקות מהכל.",
      זכר: "שים לב לבידוד מוגזם. שקט לא אומר התנתקות מהכל.",
    },
    intuition: {
      נקבה: "המספרים לוחשים: 'התשובה שאת מחפשת נמצאת בפנים - תשבי ברגע שקט.'",
      זכר: "המספרים לוחשים: 'התשובה שאתה מחפש נמצאת בפנים - תשב ברגע שקט.'",
    },
  },
  8: {
    keyMessage: {
      נקבה: "היום הוא לכוח ולהחלטות - אל תתנצלי על ההצלחה שלך.",
      זכר: "היום הוא לכוח ולהחלטות - אל תתנצל על ההצלחה שלך.",
    },
    energySupport: "האנרגיה תומכת בעסקים, מו\"מ, השקעות ומימוש פוטנציאל כלכלי.",
    beAware: {
      נקבה: "שימי לב לשאיפה לשלמות. לפעמים 'טוב' עדיף על 'מושלם שלא יצא לפועל'.",
      זכר: "שים לב לשאיפה לשלמות. לפעמים 'טוב' עדיף על 'מושלם שלא יצא לפועל'.",
    },
    intuition: {
      נקבה: "המספרים לוחשים: 'את ראויה לכל מה שאת שואפת אליו - תבקשי את זה.'",
      זכר: "המספרים לוחשים: 'אתה ראוי לכל מה שאתה שואף אליו - תבקש את זה.'",
    },
  },
  9: {
    keyMessage: {
      נקבה: "היום הוא לנדיבות ושחרור - מה שתשחררי יפנה מקום לחדש.",
      זכר: "היום הוא לנדיבות ושחרור - מה שתשחרר יפנה מקום לחדש.",
    },
    energySupport: "האנרגיה תומכת בסגירת מעגלים, ותרנות וסיום תהליכים תקועים.",
    beAware: {
      נקבה: "שימי לב לאגירת דברים שכבר לא משרתים. שחרור הוא חוזקה.",
      זכר: "שים לב לאגירת דברים שכבר לא משרתים. שחרור הוא חוזקה.",
    },
    intuition: {
      נקבה: "המספרים לוחשים: 'מה שאת מחזיקה בחוזקה - הגיע הזמן לשחרר אותו באהבה.'",
      זכר: "המספרים לוחשים: 'מה שאתה מחזיק בחוזקה - הגיע הזמן לשחרר אותו באהבה.'",
    },
  },
};

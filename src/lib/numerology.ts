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

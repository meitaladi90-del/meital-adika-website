import { Resend } from "resend";

export const resend = new Resend(process.env.RESEND_API_KEY);

export const CONTACT_EMAIL = process.env.CONTACT_EMAIL ?? "meital.adika.consulting@gmail.com";

export async function sendContactEmail(data: {
  name: string;
  email: string;
  phone?: string;
  message: string;
}) {
  return resend.emails.send({
    from: "אתר מיטל עדיקה <noreply@meitaladika.co.il>",
    to: [CONTACT_EMAIL],
    subject: `פנייה חדשה מ-${data.name}`,
    html: `
      <div dir="rtl" style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #5a3e28;">פנייה חדשה מהאתר</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 8px; font-weight: bold;">שם:</td><td style="padding: 8px;">${data.name}</td></tr>
          <tr><td style="padding: 8px; font-weight: bold;">דואר אלקטרוני:</td><td style="padding: 8px;">${data.email}</td></tr>
          <tr><td style="padding: 8px; font-weight: bold;">טלפון:</td><td style="padding: 8px;">${data.phone ?? "לא צוין"}</td></tr>
          <tr><td style="padding: 8px; font-weight: bold; vertical-align: top;">הודעה:</td><td style="padding: 8px;">${data.message}</td></tr>
        </table>
      </div>
    `,
  });
}

export async function sendRegistrationConfirmation(data: {
  name: string;
  email: string;
  workshop: string;
}) {
  return resend.emails.send({
    from: "מיטל עדיקה <noreply@meitaladika.co.il>",
    to: [data.email],
    reply_to: CONTACT_EMAIL,
    subject: `אישור הרשמה - ${data.workshop}`,
    html: `
      <div dir="rtl" style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f5f0e8; padding: 32px; border-radius: 12px;">
        <h1 style="color: #5a3e28; text-align: center;">ברוכה הבאה, ${data.name}! ✨</h1>
        <p style="color: #5a3e28; font-size: 16px; line-height: 1.8;">
          שמחה לאשר את הרשמתך ל<strong>${data.workshop}</strong>.
        </p>
        <p style="color: #5a3e28; font-size: 16px; line-height: 1.8;">
          אשלח לך את כל הפרטים הנוספים בקרוב. בינתיים, אם יש לך שאלות — אני כאן בשבילך!
        </p>
        <div style="text-align: center; margin-top: 32px;">
          <a href="https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}"
             style="background: #25D366; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-size: 16px;">
            צרי קשר בוואטסאפ
          </a>
        </div>
        <p style="color: #7a5540; font-size: 14px; margin-top: 32px; text-align: center;">
          מיטל עדיקה | נומרולוגיה &amp; העצמת נשים
        </p>
      </div>
    `,
  });
}

export async function sendRegistrationNotification(data: {
  name: string;
  email: string;
  phone: string;
  workshop: string;
  message?: string;
}) {
  return resend.emails.send({
    from: "אתר מיטל עדיקה <noreply@meitaladika.co.il>",
    to: [CONTACT_EMAIL],
    subject: `הרשמה חדשה - ${data.workshop}`,
    html: `
      <div dir="rtl" style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #5a3e28;">הרשמה חדשה לסדנה!</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 8px; font-weight: bold;">שם:</td><td style="padding: 8px;">${data.name}</td></tr>
          <tr><td style="padding: 8px; font-weight: bold;">דואר אלקטרוני:</td><td style="padding: 8px;">${data.email}</td></tr>
          <tr><td style="padding: 8px; font-weight: bold;">טלפון:</td><td style="padding: 8px;">${data.phone}</td></tr>
          <tr><td style="padding: 8px; font-weight: bold;">סדנה:</td><td style="padding: 8px;">${data.workshop}</td></tr>
          ${data.message ? `<tr><td style="padding: 8px; font-weight: bold; vertical-align: top;">הודעה:</td><td style="padding: 8px;">${data.message}</td></tr>` : ""}
        </table>
      </div>
    `,
  });
}

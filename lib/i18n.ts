export const LANGS = ["en", "th"] as const;
export type Lang = (typeof LANGS)[number];
export const DEFAULT_LANG: Lang = "en";

/** ข้อความที่มีทั้ง 2 ภาษา ใช้กับ data ใน component (เช่น projects, employment) */
export type Localized = Record<Lang, string>;

const en = {
    nav: {
        home: "Home",
        resume: "Resume",
        contact: "Contact",
        toggleMenu: "Toggle menu",
        toggleTheme: "Toggle theme",
        toggleLang: "Switch language",
    },
    home: {
        greeting: "Hi,",
        role: "I'm a Full-Stack Developer from Thailand.",
        subtitle: "now I'm still working in Frontend Developer role, but I have Backend experience",
    },
    projects: {
        heading: "My Projects",
        goToSlide: "Go to project",
        prevImage: "Previous image",
        nextImage: "Next image",
        prevProject: "Previous project",
        nextProject: "Next project",
    },
    certificates: {
        heading: "Certificates",
    },
    employment: {
        heading: "Where I've worked.",
        now: "Now",
    },
    skills: {
        heading: "Tools I work with.",
    },
    resume: {
        heading: "My Resume",
        download: "Download",
        meta: "PDF English Version · Updated 2024",
    },
    contact: {
        heading: "Contact",
        subtitle: "Have a project in mind or just want to say hi? Feel free to reach out.",
        available: "Available for freelance project",
        findMe: "Find me on",
        sendMessage: "Send a message",
    },
    form: {
        email: "Your Email",
        emailRequired: "Email is required.",
        emailInvalid: "Invalid email address.",
        subject: "Subject",
        subjectPlaceholder: "What's this about?",
        subjectRequired: "Subject is required.",
        message: "Message",
        messagePlaceholder: "Tell me something...",
        messageRequired: "Message is required.",
        messageMin: "Message must be at least 10 characters.",
        sending: "Sending...",
        submit: "Send Message",
        success: "Message sent! I'll get back to you soon.",
        failed: "Failed to send.",
        error: "Something went wrong.",
    },
};

export type Dictionary = typeof en;

const th: Dictionary = {
    nav: {
        home: "หน้าแรก",
        resume: "เรซูเม่",
        contact: "ติดต่อฉัน",
        toggleMenu: "เปิด/ปิดเมนู",
        toggleTheme: "สลับธีม",
        toggleLang: "เปลี่ยนภาษา",
    },
    home: {
        greeting: "สวัสดี,",
        role: "ฉันเป็น Full-Stack Developer จากประเทศไทย",
        subtitle: "ปัจจุบันทำงานในตำแหน่ง Frontend Developer และมีประสบการณ์ด้าน Backend",
    },
    projects: {
        heading: "ผลงาน",
        goToSlide: "ไปยังโปรเจกต์ที่",
        prevImage: "ภาพก่อนหน้า",
        nextImage: "ภาพถัดไป",
        prevProject: "โปรเจกต์ก่อนหน้า",
        nextProject: "โปรเจกต์ถัดไป",
    },
    certificates: {
        heading: "ใบรับรอง",
    },
    employment: {
        heading: "ประสบการณ์ทำงาน",
        now: "ปัจจุบัน",
    },
    skills: {
        heading: "เครื่องมือที่ใช้",
    },
    resume: {
        heading: "เรซูเม่",
        download: "ดาวน์โหลด",
        meta: "PDF English Version · อัปเดตล่าสุด 2024",
    },
    contact: {
        heading: "ติดต่อ",
        subtitle: "มีโปรเจกต์ในใจ หรืออยากทักทาย? ติดต่อมาได้เลย",
        available: "พร้อมรับงานฟรีแลนซ์",
        findMe: "ช่องทางติดต่อ",
        sendMessage: "ส่งข้อความ",
    },
    form: {
        email: "อีเมลของคุณ",
        emailRequired: "กรุณากรอกอีเมล",
        emailInvalid: "รูปแบบอีเมลไม่ถูกต้อง",
        subject: "หัวข้อ",
        subjectPlaceholder: "เกี่ยวกับเรื่องอะไร?",
        subjectRequired: "กรุณากรอกหัวข้อ",
        message: "ข้อความ",
        messagePlaceholder: "เล่าให้ฟังหน่อย...",
        messageRequired: "กรุณากรอกข้อความ",
        messageMin: "ข้อความต้องมีอย่างน้อย 10 ตัวอักษร",
        sending: "กำลังส่ง...",
        submit: "ส่งข้อความ",
        success: "ส่งข้อความเรียบร้อย! จะรีบติดต่อกลับโดยเร็ว",
        failed: "ส่งไม่สำเร็จ",
        error: "เกิดข้อผิดพลาด",
    },
};

export const dictionaries: Record<Lang, Dictionary> = { en, th };

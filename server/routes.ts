
import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import bcrypt from "bcrypt";
import session from "express-session";
import OpenAI from "openai";

// Groq API client (OpenAI-compatible)
let groqClient: OpenAI | null = null;

function getGroqClient(): OpenAI | null {
  // Try getting key from environment/secrets first, fallback to hardcoded ONLY if absolutely necessary for persistent remixing
  const apiKey = process.env.GROQ_API_KEY || "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";
  if (!apiKey) {
    return null;
  }
  if (!groqClient) {
    groqClient = new OpenAI({ 
      apiKey,
      baseURL: "https://api.groq.com/openai/v1"
    });
  }
  return groqClient;
}

const AEROASSIST_SYSTEM_PROMPT = `You are "AeroAssist Lite", the official AI assistant for the AkashVahini Landing Page.

Your ONLY job:
• Help users understand ALL sections and content on the landing page
• Answer questions ONLY using the EXACT DATA provided below
• Help users navigate the website
• Answer queries about AkashVahini's purpose, identity, team, vision, journey, and features
• Explain website features like theme modes and moon phase display

CRITICAL: You must ONLY use the information provided in this prompt. Do NOT make up any information. If asked about something not listed here, say "I don't have that specific information on our landing page."

=== OFFICIAL AKASHVAHINI DATA ===

COMPANY OVERVIEW:
- Name: AkashVahini
- Tagline: "Where Intelligence Meets the Sky"
- Focus: Aerial innovation and intelligent drone systems
- Vision: Shaping a smarter aerial future through engineering excellence
- Description: AkashVahini is a next-generation aerospace innovation initiative focused on building intelligent, future-ready aerial systems. We combine engineering, research and purposeful design to push what's possible in the skies.

FOUNDERS (The Founding Team):
- Akshaya - Founder & CEO: Vision, Engineering Direction, System Architecture. Philosophy: "Building what others only imagine."
- Shashank - Co-Founder & CTO: Autonomy, AI Models, Mission Logic. Philosophy: "Teaching the sky to think."

FOUNDER'S MESSAGE:
"AkashVahini is not just a project. It is a vision created with curiosity, discipline and an obsession for solving real-world challenges through engineering. Every line of code, every research paper and every design sketch reflects our commitment to shaping a smarter aerial future."

TEAM MEMBERS (Complete List of 10):
1. Akshaya - Founder & CEO, Chief Executive Officer, Vision, Engineering Direction, System Architecture. Philosophy: "Building what others only imagine."
2. Shashank - Co-Founder & CTO, Chief Technology Officer, Autonomy, AI Models, Mission Logic. Philosophy: "Teaching the sky to think."
3. CFO Advisor - CFO, Chief Financial Officer, Financial Strategy & Compliance. Philosophy: "Numbers tell the story of possibilities."
4. Abhaya Samuddar - Active Operations Lead, Head of Active Operations, End-to-End Project Execution
5. Purna - Hardware Lead, Head of Hardware Engineering, Assembly & Flight Systems
6. Subham - Fabrication Lead, Head of Fabrication, Precision Build & Material Engineering
7. Biswa - IOT/Embedded Lead, Head of IoT & Embedded Systems, Onboard Computing & Sensor Sync
8. OP - Operations Manager, Head of Operations, Logistics & Field Testing
9. Amit - Media & Comms, Head of Media & Communications, Visual Storytelling & Content
10. Jeet - Documentation & Research, Head of Documentation, Standards & Compliance Papers

MENTORS (Advisory Team - 3 Distinguished Mentors):
1. Manoranjan Mahapatra - Technical Mentor
   - Expertise: Aerospace Engineering, Systems Design, Innovation
   - Description: A visionary leader guiding our technical direction with decades of experience in aerospace innovation and engineering excellence.
   - Quote: "Excellence is not a destination but a continuous journey of learning and improvement."

2. Peramjeet - Strategic Mentor
   - Expertise: Business Strategy, Project Management, Leadership
   - Description: An experienced strategist providing invaluable guidance on business development and organizational growth strategies.
   - Quote: "Success comes to those who dare to dream and have the courage to pursue their vision."

3. Bikram Adatiya - Industry Mentor
   - Expertise: Industry Relations, Technology Transfer, Research
   - Description: A distinguished mentor bridging the gap between academia and industry, fostering collaborations and technological advancement.
   - Quote: "Innovation thrives where passion meets purpose and determination meets opportunity."

=== LANDING PAGE SECTIONS (COMPLETE DETAILS) ===

1. HERO SECTION:
   - Welcome message with company name "AkashVahini"
   - Tagline: "A New Era Begins"
   - Main Heading: "A New Era of Aerial Innovation"
   - Sub Heading: "Where Intelligence Meets the Sky"
   - Features animated typewriter effect
   - CTA Button: "Discover Our Vision" linking to About section

2. ABOUT SECTION ("Who We Are"):
   - Title: "About AkashVahini"
   - Description: AkashVahini is a next-generation aerospace innovation initiative focused on building intelligent, future-ready aerial systems.
   - Core Values (4 Interactive Cards):
     * Innovation: Pushing boundaries with cutting-edge technology
     * Engineering: Precision engineering and robust design
     * Research: Deep research-driven development
     * Purpose: Mission-focused aerial solutions

3. VISION & MISSION SECTION ("Our Vision"):
   - Vision: "To create intelligent aerial solutions that redefine how the world observes, responds and evolves."
   - Mission: "To engineer advanced airborne systems that deliver clarity, speed and insight to the world below."
   - Philosophy: "A drone isn't just a machine. It is a network. A guardian. A perspective. A future waiting to be built."

4. FOUNDERS SECTION ("From the Founders"):
   - Features message from the founding team (Akshaya & Shashank)
   - Emphasizes vision, curiosity, discipline and commitment to innovation

5. MENTORS SECTION:
   - Showcases 3 Distinguished Mentors with profiles, expertise areas, and inspiring quotes
   - Interactive cards with hover effects

6. TEAM SECTION:
   - Interactive grid displaying 10 core team members
   - Each card shows: Name, Role, Title, Responsibility, Philosophy
   - Features hover effects and member profiles

7. JOURNEY SECTION ("Our Startup Journey" - Building the Future):
   Timeline of Milestones:
   - Feb 2025: The Beginning - AkashVahini was founded with a vision to revolutionize aerial technology
   - Mar 2025: Team Formation - Core team of 9 brilliant minds assembled across engineering, operations & media
   - Apr-Jul 2025: Research Phase - Deep dive into autonomous systems, flight dynamics & material science
   - Aug-Oct 2025: Development - Building prototypes, testing components & iterating on designs
   - Nov 2025: Current Phase - Ongoing research, system integration & preparing for next milestones

8. CTA/CONTACT SECTION ("Ready to explore the future?"):
   - Call-to-action encouraging users to connect
   - Description: "Join us on our mission to redefine what's possible in the skies."
   - Contact Options:
     * Email: assist.akashvahini@gmail.com
     * WhatsApp Community: Available for joining
     * About Us link

9. FOOTER:
   - Company Info: AkashVahini - A Private Startup
   - Quick Links: Home, About, Technology, Products, Team, Contact
   - Location: Bhubaneswar, Odisha, India
   - Social Media links (LinkedIn, X/Twitter, Instagram, YouTube)

=== WEBSITE FEATURES ===

1. THEME/DISPLAY MODES:
   - Day Mode: Features animated sun with rays, bright sky background
   - Night Mode: Features realistic moon with phase display, stars in background
   - Deep Black Mode: Features galaxy system with stars

2. MOON PHASE DISPLAY (Night Mode):
   - Shows real-time moon phase based on user's timezone
   - Displays current time and date
   - Shows moon phase name (New Moon, Waxing Crescent, First Quarter, Full Moon, etc.)
   - Shows illumination percentage
   - Realistic curved terminator (shadow line) matching actual moon appearance

3. NAVIGATION:
   - Navbar with links to all sections
   - Smooth scrolling between sections
   - Mobile-responsive design

4. CHATBOT (AeroAssist Lite):
   - AI assistant to help users navigate the website
   - Can answer questions about company, team, mentors, vision, journey
   - Available as floating chat button

=== RESPONSE RULES ===

1. ONLY use the data above. Never invent names, roles, or details.
2. If asked "who is the founder" - Answer: Akshaya (Founder & CEO) and Shashank (Co-Founder & CTO)
3. If asked about team - List from the 10 members shown above
4. If asked about mentors - List from the 3 mentors shown above
5. If asked about sections - Describe what each section contains
6. If asked about website features - Explain theme modes, moon display, navigation
7. Use perfect grammar, spelling, and punctuation
8. Keep responses concise (1-3 paragraphs max)
9. Never reveal technical drone details, internal systems, or business secrets
10. For security questions, say: "For security reasons, I cannot provide that information."
11. Be helpful and friendly while staying accurate to the data provided

Contact: assist.akashvahini@gmail.com
WhatsApp Community: Available for joining`;

const rateLimitStore = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_MAX = 20;
const RATE_LIMIT_WINDOW = 60 * 1000;

function getRateLimitKey(req: any): string {
  return req.ip || req.connection?.remoteAddress || 'unknown';
}

function checkRateLimit(key: string): { allowed: boolean; remaining: number } {
  const now = Date.now();
  const record = rateLimitStore.get(key);
  
  if (!record || now > record.resetTime) {
    rateLimitStore.set(key, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return { allowed: true, remaining: RATE_LIMIT_MAX - 1 };
  }
  
  if (record.count >= RATE_LIMIT_MAX) {
    return { allowed: false, remaining: 0 };
  }
  
  record.count++;
  return { allowed: true, remaining: RATE_LIMIT_MAX - record.count };
}

function sanitizeInput(input: string): string {
  return input
    .trim()
    .slice(0, 1000)
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '');
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Configure session middleware
  app.use(
    session({
      secret: process.env.SESSION_SECRET || "akashvahini-secret-key-2025",
      resave: false,
      saveUninitialized: false,
      cookie: {
        secure: process.env.NODE_ENV === "production",
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000, // 24 hours
      },
    })
  );

  // Admin login endpoint
  app.post("/api/admin/login", async (req, res) => {
    try {
      const { password } = req.body;

      if (!password) {
        return res.status(400).json({ message: "Password is required" });
      }

      // Get admin credentials from storage
      const adminUser = await storage.getAdminUser();
      
      if (!adminUser) {
        return res.status(500).json({ message: "Admin user not configured" });
      }

      // Verify password
      const isValid = await bcrypt.compare(password, adminUser.password);

      if (!isValid) {
        return res.status(401).json({ message: "Invalid password" });
      }

      // Set session
      (req.session as any).isAuthenticated = true;
      (req.session as any).userId = adminUser.id;

      res.json({ success: true, message: "Login successful" });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Admin logout endpoint
  app.post("/api/admin/logout", (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: "Logout failed" });
      }
      res.json({ success: true, message: "Logout successful" });
    });
  });

  // Check authentication status
  app.get("/api/admin/status", (req, res) => {
    const isAuthenticated = (req.session as any).isAuthenticated || false;
    res.json({ isAuthenticated });
  });

  // Middleware to protect admin routes
  const requireAuth = (req: any, res: any, next: any) => {
    if (!(req.session as any).isAuthenticated) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    next();
  };

  // Protected admin routes example
  app.get("/api/admin/data", requireAuth, async (req, res) => {
    res.json({ message: "Protected admin data" });
  });

  // AeroAssist Lite Chatbot API endpoint
  app.post("/api/chat", async (req, res) => {
    try {
      const rateLimitKey = getRateLimitKey(req);
      const { allowed, remaining } = checkRateLimit(rateLimitKey);
      
      res.setHeader('X-RateLimit-Remaining', remaining.toString());
      
      if (!allowed) {
        return res.status(429).json({ 
          error: "Too many requests",
          response: "You've sent too many messages. Please wait a moment before trying again."
        });
      }

      const { message, history } = req.body;

      if (!message || typeof message !== 'string') {
        return res.status(400).json({ error: "Message is required" });
      }

      const sanitizedMessage = sanitizeInput(message);
      
      if (sanitizedMessage.length === 0) {
        return res.status(400).json({ error: "Invalid message" });
      }

      const groq = getGroqClient();
      if (!groq) {
        return res.status(500).json({ 
          error: "Chat service unavailable",
          response: "I'm currently unavailable. Please contact us via email at assist.akashvahini@gmail.com for assistance."
        });
      }

      // Build conversation history for Groq
      const messages: { role: "system" | "user" | "assistant"; content: string }[] = [
        { role: "system", content: AEROASSIST_SYSTEM_PROMPT }
      ];
      
      if (history && Array.isArray(history)) {
        for (const msg of history.slice(-6)) {
          if (msg.role === 'user' || msg.role === 'assistant') {
            messages.push({
              role: msg.role as "user" | "assistant",
              content: typeof msg.content === 'string' ? sanitizeInput(msg.content) : ''
            });
          }
        }
      }

      messages.push({ role: "user", content: sanitizedMessage });

      const completion = await groq.chat.completions.create({
        model: "llama-3.1-8b-instant",
        messages: messages,
        max_tokens: 500,
        temperature: 0.7,
      });

      const assistantMessage = completion.choices[0]?.message?.content || 
        "I couldn't process your request. Please try asking about the AkashVahini landing page.";

      res.json({ response: assistantMessage });
    } catch (error: any) {
      console.error("Chat API error:", error);
      
      if (error?.status === 429) {
        if (error?.code === 'insufficient_quota') {
          return res.status(503).json({ 
            error: "API quota exceeded",
            response: "The chat service is temporarily unavailable due to API limits. Please contact us via email at assist.akashvahini@gmail.com for assistance."
          });
        }
        return res.status(429).json({ 
          error: "Service busy",
          response: "I'm receiving many requests right now. Please try again in a moment."
        });
      }
      
      res.status(500).json({ 
        error: "Failed to process chat request",
        response: "I'm experiencing technical difficulties. Please try again later or contact us via email."
      });
    }
  });

  return httpServer;
}

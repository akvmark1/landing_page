# AkashVahini - Premium 3D Landing Page

## Overview
AkashVahini is a world-class 3D landing page for an aerospace innovation company. The page features premium Apple-level animations, interactive team showcases, and a mysterious yet professional brand identity.

## Current State
The landing page is fully functional with:
- Cinematic 3D hero section with floating particles and glow effects
- Interactive team section with 9 members and philosophy quotes
- Premium scroll-triggered animations using GSAP
- Responsive design for all screen sizes

## Project Architecture

### Frontend Structure
```
client/src/
├── components/
│   ├── 3d/                    # Three.js 3D components
│   │   ├── Scene3D.tsx        # Main 3D scene with particles, orbs, rings
│   │   ├── ParticleField.tsx  # Animated particle system
│   │   ├── FloatingOrbs.tsx   # Glowing floating spheres
│   │   ├── GlowingRings.tsx   # Rotating orbital rings
│   │   └── WaveGrid.tsx       # Animated wave grid
│   ├── sections/              # Page sections
│   │   ├── HeroSection.tsx    # Main hero with AkashVahini branding
│   │   ├── AboutSection.tsx   # About and values
│   │   ├── VisionSection.tsx  # Vision and mission statements
│   │   ├── FounderSection.tsx # Founder message
│   │   ├── TeamSection.tsx    # Interactive 9-member team grid
│   │   ├── JourneySection.tsx # Journey begins section
│   │   ├── CTASection.tsx     # Call to action
│   │   └── Footer.tsx         # Footer with company info
│   ├── icons/
│   │   └── RoleIcons.tsx      # Animated role icons (compass, neural network, etc.)
│   ├── ui/
│   │   └── Navbar.tsx         # Navigation bar
│   └── LandingPage.tsx        # Main landing page component
├── App.tsx                    # Root component
├── main.tsx                   # Entry point
└── index.css                  # Global styles and animations
```

### Key Technologies
- **React 18** - UI framework
- **Three.js / React Three Fiber** - 3D graphics
- **React Three Drei** - 3D helpers
- **React Three Postprocessing** - Visual effects (Bloom, Vignette)
- **GSAP** - Scroll-triggered animations
- **Framer Motion** - UI animations
- **Tailwind CSS** - Styling

### Team Members Structure
1. **Leadership Row**: CEO (Akshaya), CTO (Shashank), CFO
2. **Core Engineering Row**: Hardware Lead (Purna), Fabrication Lead (Subham), IoT Lead (Biswa)
3. **Operations Row**: Operations Manager (OP), Media & Comms (Amit), Documentation (Jeet)

Each team member has:
- Animated role icon
- Silhouette-to-reveal hover effect
- Philosophy quote on hover
- Color-coded gradient

## Design Principles
- **Dark Theme**: Black background with cyan/blue accents
- **Premium Typography**: Outfit and Space Grotesk fonts
- **Mysterious Vibe**: No product details revealed
- **Apple-Level Animations**: Smooth, subtle, tasteful

## Development Commands
- `npm run dev` - Start development server
- `npm run build` - Build for production

## Vercel Deployment Settings
To deploy this project successfully to Vercel, use the following settings:
- **Framework Preset**: `Other` (Do not select Vite, as this is a custom Express/Vite hybrid)
- **Root Directory**: `./`
- **Build Command**: `npm run build`
- **Output Directory**: `dist/public`
- **Install Command**: `npm install`

### Important Notes
- The project uses a custom build script (`script/build.ts`) which is triggered by `npm run build`.
- The frontend is served by an Express server in production, but the `dist/public` directory contains the static assets for Vercel's edge network if you are deploying as a static site.
- If you encounter an "envPrefix" error, ensure you are not using a `vercel.json` with an invalid `envPrefix` property (this has been removed from the current configuration).
- Added AeroAssist AI Chatbot:
  - Floating chat button in bottom-right corner of landing page
  - Animated chat window with framer-motion transitions
  - OpenAI-powered conversational AI with custom AeroAssist persona
  - Professional drone analytics assistant identity focused on:
    - Dashboard features explanation
    - Mission planning guidance
    - DGCA compliance information
    - Troubleshooting support
    - Subscription and billing help
  - Features: message history, suggested questions, loading states, error handling
  - Zustand store for chat state management (client/src/lib/stores/useChatbot.tsx)
  - Server endpoint: POST /api/chat with lazy-initialized OpenAI client
  - Responsive design for mobile and desktop
  - Environment: OPENAI_API_KEY required for chat functionality

### December 04, 2025
- Navbar Improvements:
  - Removed search button from navigation
  - Hamburger menu now only visible on mobile (hidden on desktop)
  - Desktop shows full navigation links, mobile uses hamburger menu
- Footer Redesign:
  - "AkashVahini Private Limited" displayed on left side with company tagline
  - Embedded Google Map on right side showing location (22°14'43.6"N 84°48'55.7"E)
  - Interactive map with zoom level 15, rounded corners, and border styling
  - Coordinates link below map opens full Google Maps in new tab
- Professional Mode Selection Dropdown:
  - Redesigned DayNightToggle from simple toggle to professional dropdown menu
  - Click-to-open dropdown with icons, labels, and descriptions for each mode
  - Mode options: Day Mode (Bright and vibrant), Night Mode (Calm and peaceful), Deep Space (Explore the cosmos)
  - Includes current time, date, moon phase with illumination, and timezone info
  - Click-outside to close functionality
  - Smooth animations with colored backgrounds for each mode
  - Chevron indicator for dropdown state
- Deep Space Mode Planet:
  - Replaced event horizon/black hole with a beautiful purple Exoplanet
  - Saturn-like rings with gradient effects and slow rotation animation
  - Planet surface with atmospheric bands, storm spots, and highlights
  - Ambient violet glow with pulsating effects
  - Orbiting particles around the planet
  - Label changed from "Event Horizon" to "Exoplanet"

### December 03, 2025
- Implemented 3-Mode Viewing System with Smooth Celestial Animations:
  - Expanded from 2 modes (Day/Night) to 3 modes (Day, Night, Deep Black)
  - useDayNight store now supports 'day', 'night', 'deepBlack' modes with cycleMode function
  - DayNightToggle component cycles through all 3 modes with animated icons:
    - Day Mode: Golden sun with animated rays
    - Night Mode: Moon with realistic phase shadows
    - Deep Black Mode: Animated black hole with violet accretion glow
  - SpaceBackgroundFull updated with mode-specific backgrounds:
    - Day: Blue sky gradient with sun
    - Night: Purple/blue cosmic gradient with stars and moon
    - Deep Black: Pure black gradient with faint violet stars, nebulae, and black hole
  - All celestial bodies follow consistent circular motion animation (rise from right, set to left)
  - Spring physics animations for smooth 1.5s transitions
  - Hover tooltip shows current mode, time, date, moon phase, and illumination
  - Removed ThemeSelector component (cleaned up unused code)

### December 02, 2025
- Added Day/Night Mode Toggle with Realistic Moon Phase:
  - Created useDayNight store with timezone-based moon phase calculation
  - DayNightToggle component with animated sun/moon transition
  - Moon phase calculated accurately using known new moon date (Jan 6, 2000)
  - Moon illumination displays correct waxing/waning phases
  - Background transitions from night sky (stars, moon) to day sky (clouds, sun)
  - Hover tooltip shows current time, date, timezone, moon phase, and illumination
  - Added to Navbar next to theme selector
- Added Mentor Section with 3 Distinguished Mentors:
  - Manoranjan Mahapatra (Technical Mentor) - Aerospace Engineering, Systems Design
  - Peramjeet (Strategic Mentor) - Business Strategy, Project Management
  - Bikram Adatiya (Industry Mentor) - Industry Relations, Technology Transfer
  - Each mentor card has animated role icon, expertise tags, quote, and hover effects
  - Section accessible via "Mentors" link in navigation
- Updated SpaceBackgroundFull to respond to day/night mode:
  - Night mode: Stars with twinkling animation, realistic moon with phase shadows
  - Day mode: Blue sky gradient, sun with animated rays, floating clouds
  - Smooth transition animations between modes

### December 02, 2025 (Earlier)
- Replaced rocket with premium 3D drone illustration:
  - Large responsive drone (400px-700px) with realistic 3D appearance
  - Carbon fiber arms with metallic gradients and depth shadows
  - Detailed motor housings with spinning propeller animations
  - Camera gimbal with realistic lens reflections
  - LED status lights with glow effects (green front, red rear)
  - Landing gear and antenna with subtle animations
  - Scanning beam animation on mouse hover (does not follow pointer)
  - Takeoff animation when user scrolls - drone flies up and fades away
  - Dynamic shadow that responds to drone state
  - HeroSection updated to pass scroll progress for takeoff trigger

### December 02, 2025 (Earlier)
- Complete landing page UI redesign with space-themed aesthetic:
  - New SpaceBackground component with purple/blue gradient, twinkling stars, planet accent, and layered clouds
  - Hero section redesigned with left-aligned content and illustration on the right
  - Updated Navbar with hamburger menu toggle, search button, and uppercase nav links
  - Scroll indicator at bottom with animated chevron
  - Preserved all original content: "AkashVahini" branding, "A New Era of Aerial Innovation" subtitle, "Where Intelligence Meets the Sky" tagline
  - CTA buttons: "Discover Our Vision" and "Meet the Team"
  - Responsive design: illustration hidden on mobile, adapts for all screen sizes

### December 02, 2025 (Earlier)
- Integrated team photos directly into existing TeamSection:
  - Generated AI professional portraits for all 10 team members (including new member Abhaya Samuddar)
  - Team photos stored in client/public/images/team/
  - Photos displayed on team member cards with hover effects
  - New team member: Abhaya Samuddar - Head of Active Operations (id 4)
  - Added ActiveHubIcon for Abhaya's role with animated central hub and spokes
  - Reorganized team layout:
    1. Leadership & Active Operations: 4 members (Akshaya, Shashank, CFO, Abhaya)
    2. Core Engineering: 3 members (Purna, Subham, Biswa)
    3. Operations & Creative: 3 members (OP, Amit, Jeet)
  - Updated TeamMemberData interface to include 'photo' field and 'activehub' iconType
  - Responsive grid: sm:2-cols, lg:4-cols for leadership row

### November 30, 2025
- Integrated Supabase for Coming Soon page email notifications:
  - Added @supabase/supabase-js client library
  - Created Supabase client utility (client/src/lib/supabase.ts)
  - Updated ComingSoon page to save emails to notify_gmail table
  - Added loading state and error handling for form submissions
  - Environment variables: VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY

### November 29, 2025
- Fixed team card hover overlap: Motto panel now contained inside card (320px height, bottom-4 positioning)
- Redesigned Journey section with GitHub-style timeline:
  - Correct dates: Feb 2025 (founding) through Nov 2025 (current phase)
  - Alternating left/right cards on desktop
  - Contribution counts per milestone
  - Active badge with pulsing animation for current phase
  - Team avatars showing 9 members at bottom
- Fixed mobile timeline alignment (dot at left-[24px], line at left-[31px])

### November 29, 2025 (Earlier)
- Updated header: AkashVahini logo now larger and bolder, navigation links with improved styling
- Changed "Philosophy" to "Motto" on team member cards
- Created new CircuitIcon for Purna (Hardware Lead) - electronic circuit design with animated connections
- Added "Meet the Team" button with email (assist.akashvahini@gmail.com)
- Added WhatsApp button with group link for community joining

### Previous
- Initial creation of premium 3D landing page
- All 9 team members with interactive cards
- Scroll-triggered GSAP animations
- Responsive mobile navigation

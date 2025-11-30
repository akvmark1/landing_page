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

## Recent Changes

### November 30, 2025 (Latest)
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

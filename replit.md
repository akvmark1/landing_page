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
- Initial creation of premium 3D landing page
- All 9 team members with interactive cards
- Scroll-triggered GSAP animations
- Responsive mobile navigation

const fs = require('fs');
const path = require('path');

const filepath = path.join(__dirname, 'src', 'data', 'clubs.ts');
let content = fs.readFileSync(filepath, 'utf8');

// 1. Add nexus link to some random clubs (or we can just leave it for now, and let them add it, but wait the user says "Also add Nexus (aitnexus.in) link for clubs along with the instagram link")
// This means every club should probably get a generic nexus link or we can just append it to socials if they have an instagram link.
content = content.replace(/instagram:\s*"([^"]+)"\s*}/g, 'instagram: "$1", nexus: "https://aitnexus.in" }');

// 2. Add extended properties to events.
content = content.replace(/isUpcoming:\s*(true|false)\s*}/g, (match, isUpcoming) => {
  return `isUpcoming: ${isUpcoming},
        description: "Join us for this exciting event where you will learn new skills and connect with peers.",
        eligibility: "Open to all AIT students from FE to BE.",
        rules: ["Bring your ID card", "Maintain discipline", "Be punctual"],
        registrationSteps: ["Fill the form below", "Join the WhatsApp group", "Show up on time!"],
        registrationLink: "https://docs.google.com/forms"
      }`;
});

// 3. Add cycling club.
const cyclingClub = `
  {
    id: "cycling-club",
    name: "AIT Cycling Club",
    category: "Sports & Fitness",
    tagline: "Promotes fitness and community through regular cycling meetups and long rides.",
    logoUrl: "https://images.unsplash.com/photo-1541625602330-2277a4c46182?w=150&h=150&fit=crop&q=80",
    themeColor: "emerald",
    socials: { instagram: "@ait_cycling_club", nexus: "https://aitnexus.in" },
    secretaries: generateMocks(['Kshitij Kumar'], 'Secretary', 'ARE'),
    jointSecs: generateMocks(['Anshika Yadav'], 'Joint Secretary', 'ARE'),
    beMembers: generateMocks(2, 'BE Mentor'),
    teMembers: generateMocks(4, 'TE Member'),
    recruitmentStatus: 'Open',
    interviews: [
      { role: "FE Member", criteria: "Interest in cycling and fitness", dates: "12-14 Sept", venue: "Sports Complex", link: "https://forms.gle/test" }
    ],
    keyActivities: [
      { title: "Weekend rides", description: "Regular weekend rides to nearby scenic spots.", imageUrl: "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=800&q=80" },
      { title: "Long-distance trails", description: "Endurance building long trails.", imageUrl: "https://images.unsplash.com/photo-1534787238916-9ac68dba0314?w=800&q=80" },
      { title: "Cycling awareness events", description: "Promoting green transport on campus.", imageUrl: "https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?w=800&q=80" }
    ],
    events: [
      { id: "cyc1", title: "Sunday Morning Ride", date: "2026-10-10", time: "05:30 AM", venue: "Main Gate", isUpcoming: true, description: "A 20km ride around Dighi hills.", eligibility: "Open to all", rules: ["Helmet mandatory", "Bring water"], registrationSteps: ["Turn up at 5:30 AM"], registrationLink: "https://forms.gle/test" }
    ],
    achievements: [
      { id: "a1", title: "Pune to Lonavala Ride", description: "Successfully completed a 120km round trip.", date: "2026-08-15" }
    ],
    news: [
      { id: "n1", title: "New Bicycles Added", date: "2026-09-01", content: "College added 10 new geared cycles for members." }
    ]
  },`;

content = content.replace(/export const CLUBS: Club\[\] = \[/, `export const CLUBS: Club[] = [${cyclingClub}`);

fs.writeFileSync(filepath, content, 'utf8');
console.log('Finished updating clubs.ts');

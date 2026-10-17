const fs = require('fs');
const path = require('path');

const filepath = path.join(__dirname, 'src', 'data', 'clubs.ts');
let content = fs.readFileSync(filepath, 'utf8');

// Replace interface definition
content = content.replace(
  /export interface Club \{[\s\S]*?keyActivities: string\[\];/m,
  (match) => {
    return match.replace(
      'keyActivities: string[];',
      `keyActivities: { title: string; description: string; imageUrl: string; }[];`
    );
  }
);

const images = [
  "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&auto=format&fit=crop&q=60"
];

// Replace all keyActivities instances
content = content.replace(/keyActivities: \[([^\]]+)\]/g, (match, itemsStr) => {
  if (itemsStr.includes('{')) return match; // Already objects

  const items = itemsStr.split(',').map(s => s.trim().replace(/^"|"$/g, ''));
  
  const formattedItems = items.map((item, index) => {
    const title = item;
    const desc = `Join us for ${item}, an exciting initiative to collaborate and learn.`;
    const image = images[index % images.length];
    return `{ title: "${title}", description: "${desc}", imageUrl: "${image}" }`;
  });

  return `keyActivities: [\n      ${formattedItems.join(',\n      ')}\n    ]`;
});

// Also add a few hardcoded events to EVERY club so the calendar doesn't look empty
const eventsStr = `events: [
      { id: "ev1", title: "Monthly Orientation", date: "2026-10-05", time: "05:00 PM", venue: "Main Auditorium", isUpcoming: true },
      { id: "ev2", title: "Guest Lecture Series", date: "2026-10-12", time: "11:00 AM", venue: "Seminar Hall 2", isUpcoming: true },
      { id: "ev3", title: "Weekly Meetup", date: "2026-10-18", time: "04:30 PM", venue: "Club Room", isUpcoming: true },
      { id: "ev4", title: "Project Review", date: "2026-09-28", time: "02:00 PM", venue: "Lab 1", isUpcoming: false }
    ]`;

content = content.replace(/events: \[([\s\S]*?)\](, achievements)/g, (match, inner, rest) => {
  if (inner.includes('Monthly Orientation')) return match; // already added
  return `${eventsStr}${rest}`;
});

fs.writeFileSync(filepath, content, 'utf8');
console.log('Finished updating clubs.ts');

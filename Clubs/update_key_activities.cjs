const fs = require('fs');
const path = require('path');

const filepath = path.join(__dirname, 'src', 'data', 'clubs.ts');
let content = fs.readFileSync(filepath, 'utf8');

// Update Club interface
content = content.replace(
  /keyActivities:\s*\{\s*title:\s*string;\s*description:\s*string;\s*imageUrl:\s*string;\s*\}(?:\[\]|\[\];)/,
  `keyActivities: { title: string; description: string; imageUrl: string; eligibility?: string; rules?: string[]; registrationSteps?: string[]; registrationLink?: string; }[];`
);

// We need to inject these fields into all keyActivities in CLUBS array.
// Instead of a simple regex which might be tricky across lines, we can match keyActivity blocks
content = content.replace(/imageUrl:\s*"([^"]+)"\s*\}/g, (match, url) => {
  return `imageUrl: "${url}",
        eligibility: "Open to all students.",
        rules: ["Must carry college ID", "Pre-registration is required"],
        registrationSteps: ["Fill the google form", "Join the community group"],
        registrationLink: "https://docs.google.com/forms"
      }`;
});

fs.writeFileSync(filepath, content, 'utf8');
console.log('Finished updating clubs.ts keyActivities');

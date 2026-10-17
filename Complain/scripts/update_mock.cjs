const fs = require('fs');

let content = fs.readFileSync('src/data/mock.js', 'utf8');

if (!content.includes('report_count:')) {
  // Add base fields
  content = content.replace(/upvoted_by:\s*\[/g, 'report_count: 0,\n    report_status: \'none\',\n    reported_by: [],\n    reports: [],\n    upvoted_by: [');

  // Seed AIT-2026-0245 with 2 reports (1 report away from review!)
  content = content.replace(/(id:\s*'AIT-2026-0245'[\s\S]*?)report_count:\s*0,\s*report_status:\s*'none',\s*reported_by:\s*\[\],\s*reports:\s*\[\]/,
    `$1report_count: 2,
    report_status: 'none',
    reported_by: ['STU-DEMO-1', 'STU-DEMO-2'],
    reports: [
      { studentId: 'STU-DEMO-1', reason: 'Abusive or personal attack', note: 'Unfair target on mess staff', created_at: new Date(Date.now() - 7200000).toISOString() },
      { studentId: 'STU-DEMO-2', reason: 'Not relevant to the college', note: '', created_at: new Date(Date.now() - 3600000).toISOString() }
    ]`);

  // Seed AIT-2026-0275 with 2 reports (1 report away from review!)
  content = content.replace(/(id:\s*'AIT-2026-0275'[\s\S]*?)report_count:\s*0,\s*report_status:\s*'none',\s*reported_by:\s*\[\],\s*reports:\s*\[\]/,
    `$1report_count: 2,
    report_status: 'none',
    reported_by: ['STU-DEMO-3', 'STU-DEMO-4'],
    reports: [
      { studentId: 'STU-DEMO-3', reason: 'Duplicate of another complaint', note: 'Same as ditch issue', created_at: new Date(Date.now() - 5400000).toISOString() },
      { studentId: 'STU-DEMO-4', reason: 'Not a complaint (joke, spam, advertisement)', note: '', created_at: new Date(Date.now() - 1800000).toISOString() }
    ]`);

  // Seed AIT-2026-0290 with 3 reports (under review!)
  content = content.replace(/(id:\s*'AIT-2026-0290'[\s\S]*?)report_count:\s*0,\s*report_status:\s*'none',\s*reported_by:\s*\[\],\s*reports:\s*\[\]/,
    `$1report_count: 3,
    report_status: 'under_review',
    reported_by: ['STU-DEMO-5', 'STU-DEMO-6', 'STU-DEMO-7'],
    reports: [
      { studentId: 'STU-DEMO-5', reason: 'Names or targets a person', note: 'Staff member named without proof', created_at: new Date(Date.now() - 9000000).toISOString() },
      { studentId: 'STU-DEMO-6', reason: 'Abusive or personal attack', note: '', created_at: new Date(Date.now() - 7200000).toISOString() },
      { studentId: 'STU-DEMO-7', reason: 'Other', note: 'Already settled with canteen supervisor', created_at: new Date(Date.now() - 3600000).toISOString() }
    ]`);

  fs.writeFileSync('src/data/mock.js', content, 'utf8');
  console.log('Successfully injected report fields into mock.js');
} else {
  console.log('mock.js already has report_count:');
}

/**
 * ============================================================================
 * Aakriti Championship Hub - Interactive Architecture & State Machine
 * Army Institute of Technology (AIT Pune)
 * Flagships: Sports Aakriti | Cultural Aakriti | Technical Aakriti
 * Branches: Comp | IT | E&TC | Mech-ARE
 * ============================================================================
 */

(function () {
  'use strict';

  // --------------------------------------------------------------------------
  // 1. DATA FIXTURES: Competing Branches & Reigning Champions
  // --------------------------------------------------------------------------
  const BRANCHES = {
    'Comp': {
      code: 'Comp',
      name: 'Computer Engineering',
      color: '#2563eb',
      lightBg: '#eff6ff',
      badgeClass: 'badge-comp',
      motto: 'Code. Concur. Conquer.',
      reigningShieldRank: 2
    },
    'IT': {
      code: 'IT',
      name: 'Information Technology',
      color: '#0284c7',
      lightBg: '#f0f9ff',
      badgeClass: 'badge-it',
      motto: 'Innovate. Transform. Triumph.',
      reigningShieldRank: 4
    },
    'E&TC': {
      code: 'E&TC',
      name: 'Electronics & Telecommunication',
      color: '#d97706',
      lightBg: '#fffbeb',
      badgeClass: 'badge-etc',
      motto: 'Signal. System. Supremacy.',
      reigningShieldRank: 1
    },
    'Mech-ARE': {
      code: 'Mech-ARE',
      name: 'Mechanical & Automation Robotics',
      color: '#059669',
      lightBg: '#ecfdf5',
      badgeClass: 'badge-mech',
      motto: 'Torque. Precision. Power.',
      reigningShieldRank: 3
    }
  };

  const REIGNING_CHAMPIONS = {
    'overview': {
      tagline: 'DEFENDING ANNUAL SHIELD CHAMPIONS • PREVIOUS YEAR OVERALL WINNER',
      branch: 'E&TC',
      branchFull: 'Electronics & Telecommunication',
      points: '1,505 Pts',
      medals: '24 Gold 🥇 • 17 Silver 🥈',
      margin: '+225 Pts ahead of Comp (Runner-up)',
      heroTrophy: './images/trophy_gold.jpg'
    },
    'sports': {
      tagline: 'DEFENDING SPORTS CHAMPIONS • PREVIOUS YEAR WINNER',
      branch: 'E&TC',
      branchFull: 'Electronics & Telecommunication',
      points: '510 Pts',
      medals: '9 Gold 🥇 • 5 Silver 🥈',
      margin: '+60 Pts ahead of IT (Runner-up)',
      heroTrophy: './images/trophy_gold.jpg'
    },
    'cultural': {
      tagline: 'DEFENDING CULTURAL CHAMPIONS • PREVIOUS YEAR WINNER',
      branch: 'E&TC',
      branchFull: 'Electronics & Telecommunication',
      points: '520 Pts',
      medals: '9 Gold 🥇 • 6 Silver 🥈',
      margin: '+60 Pts ahead of Mech-ARE (Runner-up)',
      heroTrophy: './images/trophy_gold.jpg'
    },
    'technical': {
      tagline: 'DEFENDING TECHNICAL CHAMPIONS • PREVIOUS YEAR WINNER',
      branch: 'COMP',
      branchFull: 'Computer Engineering',
      points: '540 Pts',
      medals: '10 Gold 🥇 • 4 Silver 🥈',
      margin: '+65 Pts ahead of E&TC',
      heroTrophy: './images/trophy_gold.jpg'
    }
  };

  // Live Standings Data across Comp, IT, E&TC, Mech-ARE
  const STANDINGS_DATA = {
    'overview': [
      { branch: 'E&TC', name: 'Electronics & Telecomm.', points: 1505, gold: 24, silver: 17, bronze: 10, rank: 1 },
      { branch: 'Comp', name: 'Computer Engineering', points: 1280, gold: 18, silver: 14, bronze: 13, rank: 2 },
      { branch: 'Mech-ARE', name: 'Mechanical & Auto Robotics', points: 1240, gold: 15, silver: 14, bronze: 14, rank: 3 },
      { branch: 'IT', name: 'Information Technology', points: 1230, gold: 14, silver: 16, bronze: 16, rank: 4 }
    ],
    'sports': [
      { branch: 'E&TC', name: 'Electronics & Telecomm.', points: 510, gold: 9, silver: 5, bronze: 3, rank: 1 },
      { branch: 'IT', name: 'Information Technology', points: 450, gold: 6, silver: 7, bronze: 4, rank: 2 },
      { branch: 'Mech-ARE', name: 'Mechanical & Auto Robotics', points: 400, gold: 5, silver: 5, bronze: 5, rank: 3 },
      { branch: 'Comp', name: 'Computer Engineering', points: 330, gold: 3, silver: 4, bronze: 6, rank: 4 }
    ],
    'cultural': [
      { branch: 'E&TC', name: 'Electronics & Telecomm.', points: 520, gold: 9, silver: 6, bronze: 3, rank: 1 },
      { branch: 'Mech-ARE', name: 'Mechanical & Auto Robotics', points: 460, gold: 7, silver: 5, bronze: 4, rank: 2 },
      { branch: 'Comp', name: 'Computer Engineering', points: 410, gold: 5, silver: 6, bronze: 5, rank: 3 },
      { branch: 'IT', name: 'Information Technology', points: 340, gold: 3, silver: 4, bronze: 7, rank: 4 }
    ],
    'technical': [
      { branch: 'Comp', name: 'Computer Engineering', points: 540, gold: 10, silver: 4, bronze: 2, rank: 1 },
      { branch: 'E&TC', name: 'Electronics & Telecomm.', points: 475, gold: 6, silver: 6, bronze: 4, rank: 2 },
      { branch: 'IT', name: 'Information Technology', points: 440, gold: 5, silver: 5, bronze: 5, rank: 3 },
      { branch: 'Mech-ARE', name: 'Mechanical & Auto Robotics', points: 380, gold: 3, silver: 4, bronze: 4, rank: 4 }
    ]
  };

  // --------------------------------------------------------------------------
  // 2. SPORTS AAKRITI: Unified 9 Sports Catalog
  // --------------------------------------------------------------------------
  const SPORTS_DATA = [
    {
      id: 'sport-tennis',
      title: 'Lawn Tennis',
      icon: 'fa-table-tennis-paddle-ball',
      categoryGroup: 'Racket Sports',
      categories: ['Boys', 'Girls'],
      shieldPoints: '100 Pts Shield Max',
      venue: 'Synthetic Tennis Complex, Courts 1 & 2',
      trialDate: 'Oct 28–29, 2026 • 06:30 AM',
      description: 'Single knockout tournament featuring singles and doubles rallies. Fast-paced baseline battles on ITF standard synthetic courts.',
      rulebook: 'Standard ITF 3-set matches. Deuce sudden death on preliminary rounds. Match balls provided by AIT Sports Council.',
      inCharges: [
        { name: 'Arjun Singhania', role: 'Student Secretary', branch: 'Comp', phone: '+91 98230 44101', email: 'arjun.singhania@aitpune.edu.in' },
        { name: 'Sneha Deshmukh', role: 'Joint Secretary', branch: 'IT', phone: '+91 97120 33812', email: 'sneha.deshmukh@aitpune.edu.in' }
      ],
      referees: [
        { name: 'Col. R. S. Pathania (Retd.)', role: 'Chief Tennis Referee', affiliation: 'MSLTA Certified Official' },
        { name: 'Prof. J. B. Jawale', role: 'Faculty Sports Officer', affiliation: 'Physical Education Dept.' }
      ],
      scorecard: {
        'Boys': {
          gold: 'Comp', silver: 'Mech-ARE', bronze: 'IT', fourth: 'E&TC',
          finalScore: 'Comp won 2 sets to 1 (6–4, 4–6, 7–5)',
          highlights: 'Aditya Rao (Comp) scored 11 aces against Rohan Verma (Mech-ARE) in a grueling 2-hour thriller.',
          stats: [
            { metric: 'Aces / Double Faults', val1: '11 / 2 (Comp)', val2: '6 / 5 (Mech-ARE)' },
            { metric: 'First Serve Win %', val1: '78%', val2: '64%' },
            { metric: 'Break Points Converted', val1: '4 of 7', val2: '3 of 8' }
          ]
        },
        'Girls': {
          gold: 'IT', silver: 'Comp', bronze: 'E&TC', fourth: 'Mech-ARE',
          finalScore: 'IT won 2 sets to 0 (6–2, 6–3)',
          highlights: 'Pooja Nair (IT) displayed immaculate cross-court passing shots against Comp.',
          stats: [
            { metric: 'Aces / Double Faults', val1: '7 / 1 (IT)', val2: '2 / 4 (Comp)' },
            { metric: 'First Serve Win %', val1: '82%', val2: '58%' },
            { metric: 'Break Points Converted', val1: '5 of 6', val2: '1 of 4' }
          ]
        }
      }
    },
    {
      id: 'sport-table-tennis',
      title: 'Table Tennis',
      icon: 'fa-ping-pong-paddle-ball',
      categoryGroup: 'Racket Sports',
      categories: ['Boys', 'Girls', 'Mixed Doubles'],
      shieldPoints: '100 Pts Shield Max',
      venue: 'Indoor Sports Hall, TT Arena',
      trialDate: 'Oct 27–28, 2026 • 05:00 PM',
      description: 'Rapid reflex table tennis tournament on Stag Olympic-grade tables. Includes dynamic Mixed Doubles category.',
      rulebook: 'Best of 5 games (11 points each). ITTF service rules enforced. Rubber inspection strictly verified before matches.',
      inCharges: [
        { name: 'Kunal Joshi', role: 'Sports Coordinator', branch: 'E&TC', phone: '+91 99221 44521', email: 'kunal.joshi@aitpune.edu.in' },
        { name: 'Ritika Sharma', role: 'Girls Captain', branch: 'Comp', phone: '+91 98223 88102', email: 'ritika.sharma@aitpune.edu.in' }
      ],
      referees: [
        { name: 'Mr. Pradeep Ghorpade', role: 'National TT Umpire', affiliation: 'Maharashtra TT Association' },
        { name: 'Dr. S. R. Dhore', role: 'Faculty Advisor', affiliation: 'Sports Board AIT' }
      ],
      scorecard: {
        'Boys': {
          gold: 'Comp', silver: 'IT', bronze: 'Mech-ARE', fourth: 'E&TC',
          finalScore: 'Comp won 3–2 (11–9, 8–11, 11–7, 9–11, 11–8)',
          highlights: 'Harshvardhan (Comp) clawed back from 6-8 down in the deciding set with blistering top-spins.',
          stats: [
            { metric: 'Smash Winners', val1: '24 (Comp)', val2: '19 (IT)' },
            { metric: 'Longest Rally', val1: '32 shots', val2: '32 shots' },
            { metric: 'Unforced Errors', val1: '14', val2: '18' }
          ]
        },
        'Girls': {
          gold: 'E&TC', silver: 'IT', bronze: 'Comp', fourth: 'Mech-ARE',
          finalScore: 'E&TC won 3–1 (11–7, 11–8, 6–11, 11–9)',
          highlights: 'Ananya Kulkarni (E&TC) dominated the baseline with defensive chop block technique.',
          stats: [
            { metric: 'Smash Winners', val1: '18 (E&TC)', val2: '14 (IT)' },
            { metric: 'Longest Rally', val1: '26 shots', val2: '26 shots' },
            { metric: 'Unforced Errors', val1: '9', val2: '15' }
          ]
        },
        'Mixed Doubles': {
          gold: 'Comp', silver: 'E&TC', bronze: 'Mech-ARE', fourth: 'IT',
          finalScore: 'Comp won 3–0 (11–8, 11–6, 11–9)',
          highlights: 'Rohan & Ritika (Comp) delivered synchronized tandem movement and counter-attacks.',
          stats: [
            { metric: 'Smash Winners', val1: '21 (Comp)', val2: '12 (E&TC)' },
            { metric: 'Longest Rally', val1: '28 shots', val2: '28 shots' },
            { metric: 'Unforced Errors', val1: '7', val2: '16' }
          ]
        }
      }
    },
    {
      id: 'sport-basketball',
      title: 'Basketball',
      icon: 'fa-basketball',
      categoryGroup: 'Ball & Team Games',
      categories: ['Boys', 'Girls'],
      shieldPoints: '120 Pts Shield Max',
      venue: 'Floodlit Outdoor Basketball Court',
      trialDate: 'Oct 29–30, 2026 • 05:30 PM',
      description: 'High-intensity 5v5 full-court basketball with FIBA regulations. High-flying layups, dunks, and sharp 3-point perimeter shooting.',
      rulebook: '4 quarters of 10 minutes each. 24-second shot clock. Bonus free throws on 5th team foul per quarter.',
      inCharges: [
        { name: 'Devendra Rathore', role: 'Team Captain', branch: 'Mech-ARE', phone: '+91 94220 11928', email: 'devendra.rathore@aitpune.edu.in' },
        { name: 'Kavya Pillai', role: 'Vice Captain', branch: 'IT', phone: '+91 98211 44093', email: 'kavya.pillai@aitpune.edu.in' }
      ],
      referees: [
        { name: 'Mr. Arvind Shelar', role: 'BFI Official Referee', affiliation: 'Basketball Federation of India' },
        { name: 'Subedar M. K. Yadav', role: 'Physical Training Officer', affiliation: 'Army Physical Training Corps' }
      ],
      scorecard: {
        'Boys': {
          gold: 'Mech-ARE', silver: 'Comp', bronze: 'IT', fourth: 'E&TC',
          finalScore: 'Mech-ARE 74 – 69 Comp (OT)',
          highlights: 'Devendra (Mech-ARE) dropped 28 points including a clutch 3-pointer with 4.2 seconds remaining to force overtime.',
          stats: [
            { metric: 'Field Goal %', val1: '48% (Mech-ARE)', val2: '44% (Comp)' },
            { metric: '3-Pointers Made', val1: '9 of 21', val2: '7 of 24' },
            { metric: 'Rebounds (Off/Def)', val1: '42 (14/28)', val2: '36 (10/26)' }
          ]
        },
        'Girls': {
          gold: 'Comp', silver: 'IT', bronze: 'Mech-ARE', fourth: 'E&TC',
          finalScore: 'Comp 52 – 46 IT',
          highlights: 'Simran Kaur (Comp) commanded the paint with 18 points, 14 rebounds, and 4 blocks.',
          stats: [
            { metric: 'Field Goal %', val1: '45% (Comp)', val2: '41% (IT)' },
            { metric: 'Fast Break Points', val1: '16', val2: '10' },
            { metric: 'Turnovers Forced', val1: '12', val2: '8' }
          ]
        }
      }
    },
    {
      id: 'sport-kabaddi',
      title: 'Kabaddi',
      icon: 'fa-people-group',
      categoryGroup: 'Combat/Field',
      categories: ['Boys', 'Girls'],
      shieldPoints: '110 Pts Shield Max',
      venue: 'Main Ground Kabaddi Clay Pit',
      trialDate: 'Oct 30–31, 2026 • 04:30 PM',
      description: 'Traditional contact combat sport combining agility, raw power, and tactical raid strategies on standardized matting.',
      rulebook: '2 halves of 20 minutes with 5 min break. Super Raid and Super Tackle rules active. Bonus line active on 6+ defenders.',
      inCharges: [
        { name: 'Virendra Singh', role: 'Kabaddi In-Charge', branch: 'Mech-ARE', phone: '+91 97233 11849', email: 'virendra.singh@aitpune.edu.in' },
        { name: 'Pooja Chahar', role: 'Girls Lead', branch: 'Comp', phone: '+91 98210 55671', email: 'pooja.chahar@aitpune.edu.in' }
      ],
      referees: [
        { name: 'Havildar Balwan Singh', role: 'Senior Kabaddi Coach', affiliation: 'Services Kabaddi Contingent' },
        { name: 'Prof. Sandeep Samleti', role: 'Jury In-Charge', affiliation: 'Sports Board' }
      ],
      scorecard: {
        'Boys': {
          gold: 'Mech-ARE', silver: 'Comp', bronze: 'E&TC', fourth: 'IT',
          finalScore: 'Mech-ARE 42 – 38 Comp',
          highlights: 'Manish Rawat (Mech-ARE) executed a sensational 4-point Super Raid in the 36th minute to overturn a deficit.',
          stats: [
            { metric: 'Raid Points', val1: '26 (Mech-ARE)', val2: '24 (Comp)' },
            { metric: 'Tackle Points', val1: '12 (Mech-ARE)', val2: '10 (Comp)' },
            { metric: 'All-Outs Inflicted', val1: '2', val2: '1' }
          ]
        },
        'Girls': {
          gold: 'Comp', silver: 'Mech-ARE', bronze: 'IT', fourth: 'E&TC',
          finalScore: 'Comp 36 – 31 Mech-ARE',
          highlights: 'Pooja Chahar scored 14 touch points with lightning-fast toe touches and ankle holds.',
          stats: [
            { metric: 'Raid Points', val1: '22 (Comp)', val2: '18 (Mech-ARE)' },
            { metric: 'Tackle Points', val1: '11 (Comp)', val2: '9 (Mech-ARE)' },
            { metric: 'All-Outs Inflicted', val1: '1', val2: '1' }
          ]
        }
      }
    },
    {
      id: 'sport-squash',
      title: 'Squash',
      icon: 'fa-baseball',
      categoryGroup: 'Racket Sports',
      categories: ['Boys', 'Girls'],
      shieldPoints: '90 Pts Shield Max',
      venue: 'Indoor Glass Back Squash Court',
      trialDate: 'Nov 01, 2026 • 07:00 AM',
      description: 'Intense 4-wall high-velocity squash duels. Tests cardiovascular endurance, anticipation, and delicate drop-shot placement.',
      rulebook: 'PAR (Point-A-Rally) scoring to 11 points. Best of 5 games. Standard double yellow dot ball.',
      inCharges: [
        { name: 'Aditya Mathur', role: 'Squash Convener', branch: 'Comp', phone: '+91 99230 77112', email: 'aditya.mathur@aitpune.edu.in' },
        { name: 'Tanvi Gokhale', role: 'Girls Captain', branch: 'IT', phone: '+91 98221 66453', email: 'tanvi.gokhale@aitpune.edu.in' }
      ],
      referees: [
        { name: 'Major Vikram Sen (Retd.)', role: 'Certified Squash Referee', affiliation: 'Squash Rackets Federation of India' },
        { name: 'Dr. G. M. Karve', role: 'Faculty In-Charge', affiliation: 'Gymkhana Committee' }
      ],
      scorecard: {
        'Boys': {
          gold: 'Comp', silver: 'E&TC', bronze: 'IT', fourth: 'Mech-ARE',
          finalScore: 'Comp won 3–1 (11–8, 9–11, 11–6, 11–7)',
          highlights: 'Aditya (Comp) wore down E&TC with relentless boast shots and tight front-court drops.',
          stats: [
            { metric: 'Drop Shot Winners', val1: '16 (Comp)', val2: '9 (E&TC)' },
            { metric: 'Longest Rally', val1: '48 seconds', val2: '48 seconds' },
            { metric: 'Tin Violations', val1: '5', val2: '11' }
          ]
        },
        'Girls': {
          gold: 'IT', silver: 'Comp', bronze: 'Mech-ARE', fourth: 'E&TC',
          finalScore: 'IT won 3–0 (11–7, 11–5, 11–8)',
          highlights: 'Tanvi (IT) delivered clean length rails down the nick wall to secure a clean sweep.',
          stats: [
            { metric: 'Drop Shot Winners', val1: '14 (IT)', val2: '6 (Comp)' },
            { metric: 'First Serve Points', val1: '72%', val2: '54%' },
            { metric: 'Tin Violations', val1: '4', val2: '9' }
          ]
        }
      }
    },
    {
      id: 'sport-football',
      title: 'Football',
      icon: 'fa-futbol',
      categoryGroup: 'Ball & Team Games',
      categories: ['Boys', 'Girls'],
      shieldPoints: '130 Pts Shield Max',
      venue: 'Main Campus Football Stadium Turf',
      trialDate: 'Nov 02–03, 2026 • 04:00 PM',
      description: 'The premier college 11v11 football derby. Fierce departmental rivalries, tactical formations, and passionate pitch atmospheres.',
      rulebook: 'FIFA 90-minute regulation (two 45m halves). Direct penalty shootouts in case of draw in knockout rounds. Maximum 5 substitutions.',
      inCharges: [
        { name: 'Sahil Tanwar', role: 'Football Captain', branch: 'Comp', phone: '+91 98234 11099', email: 'sahil.tanwar@aitpune.edu.in' },
        { name: 'Ananya Roy', role: 'Girls Football Head', branch: 'IT', phone: '+91 97110 55432', email: 'ananya.roy@aitpune.edu.in' }
      ],
      referees: [
        { name: 'Mr. Nelson Fernandes', role: 'AIFF Level 2 Referee', affiliation: 'All India Football Federation' },
        { name: 'Subedar Major K. K. Thapa', role: 'Head Referee', affiliation: '1 Gorkha Rifles / AIT PE' }
      ],
      scorecard: {
        'Boys': {
          gold: 'IT', silver: 'Comp', bronze: 'Mech-ARE', fourth: 'E&TC',
          finalScore: 'IT 2 – 1 Comp (Full Time)',
          highlights: 'Pranav Saxena (IT 34\') and Joshua D\'Souza (IT 82\') netted decisive goals after Comp took an early lead via Sahil Tanwar (Comp 12\').',
          stats: [
            { metric: 'Shots (On Target)', val1: '14 (8) - IT', val2: '11 (6) - Comp' },
            { metric: 'Possession', val1: '54%', val2: '46%' },
            { metric: 'Corner Kicks', val1: '6', val2: '4' }
          ]
        },
        'Girls': {
          gold: 'Comp', silver: 'Mech-ARE', bronze: 'IT', fourth: 'E&TC',
          finalScore: 'Comp 1 – 0 Mech-ARE',
          highlights: 'Pooja Singh headed in a pinpoint corner from Ananya in the 68th minute.',
          stats: [
            { metric: 'Shots (On Target)', val1: '9 (5) - Comp', val2: '7 (3) - Mech-ARE' },
            { metric: 'Possession', val1: '51%', val2: '49%' },
            { metric: 'Corner Kicks', val1: '5', val2: '3' }
          ]
        }
      }
    },
    {
      id: 'sport-cricket',
      title: 'Cricket',
      icon: 'fa-baseball-bat-ball',
      categoryGroup: 'Ball & Team Games',
      categories: ['Boys', 'Girls'],
      shieldPoints: '130 Pts Shield Max',
      venue: 'AIT Main Cricket Oval (Pavilion End)',
      trialDate: 'Nov 04–05, 2026 • 07:30 AM',
      description: 'The flagship T20 departmental cricket clash. Electrifying powerplays, precision death bowling, and roaring boundary roars.',
      rulebook: 'BCCI T20 Playing Conditions. 20 overs per side, maximum 4 overs per bowler. Powerplay in overs 1-6. White Kookaburra balls.',
      inCharges: [
        { name: 'Rohit Kulkarni', role: 'Cricket Secretary', branch: 'Comp', phone: '+91 98220 99401', email: 'rohit.kulkarni@aitpune.edu.in' },
        { name: 'Siddharth Nair', role: 'Vice Captain', branch: 'Mech-ARE', phone: '+91 97660 44211', email: 'siddharth.nair@aitpune.edu.in' }
      ],
      referees: [
        { name: 'Mr. Dilip Vengsarkar Academy Official', role: 'Chief Cricket Umpire', affiliation: 'Maharashtra Cricket Association' },
        { name: 'Prof. R. S. Verma', role: 'Faculty Match Referee', affiliation: 'Sports Council' }
      ],
      scorecard: {
        'Boys': {
          gold: 'Comp', silver: 'Mech-ARE', bronze: 'IT', fourth: 'E&TC',
          finalScore: 'Comp 168/5 (20.0 ov) def. Mech-ARE 162/8 (20.0 ov) by 6 runs',
          highlights: 'Akshat Sharma smashed 74 off 46 balls (6 fours, 4 sixes) for Comp. Mech-ARE needed 12 off the final over, but Shresth bagged 2 wickets for just 5 runs.',
          stats: [
            { metric: 'Top Batsman', val1: 'Akshat S. 74(46) - Comp', val2: 'Kartik T. 58(38) - Mech-ARE' },
            { metric: 'Best Bowler', val1: 'Shresth 3/24 (4 ov) - Comp', val2: 'Abhishek 2/31 (4 ov) - Mech-ARE' },
            { metric: 'Total Sixes Hit', val1: '7 Sixes', val2: '5 Sixes' }
          ]
        },
        'Girls': {
          gold: 'Mech-ARE', silver: 'Comp', bronze: 'E&TC', fourth: 'IT',
          finalScore: 'Mech-ARE 112/4 (15.0 ov) def. Comp 108/6 (15.0 ov) by 4 runs',
          highlights: 'Priyanka Shekhawat scored an unbeaten 48 and bowled a tight 2/18 spell for Mech-ARE.',
          stats: [
            { metric: 'Top Batsman', val1: 'Priyanka 48*(35) - Mech-ARE', val2: 'Neha 39(32) - Comp' },
            { metric: 'Best Bowler', val1: 'Priyanka 2/18 (3 ov)', val2: 'Ritika 2/22 (3 ov)' },
            { metric: 'Dot Balls Bowled', val1: '38 balls', val2: '32 balls' }
          ]
        }
      }
    },
    {
      id: 'sport-volleyball',
      title: 'Volleyball',
      icon: 'fa-volleyball',
      categoryGroup: 'Ball & Team Games',
      categories: ['Boys', 'Girls'],
      shieldPoints: '100 Pts Shield Max',
      venue: 'Volleyball Arena, Court 1 & 2',
      trialDate: 'Nov 06, 2026 • 04:30 PM',
      description: 'Dynamic 6v6 aerial spikes, impenetrable two-man blocks, and acrobatic libero digs on standard clay surface.',
      rulebook: 'FIVB rules. Best of 3 sets in qualifiers, best of 5 in Finals. Rotation and libero interchange rules strictly observed.',
      inCharges: [
        { name: 'Amit Choudhary', role: 'Volleyball Captain', branch: 'Mech-ARE', phone: '+91 98219 00411', email: 'amit.choudhary@aitpune.edu.in' },
        { name: 'Bhavna Sharma', role: 'Girls Captain', branch: 'Comp', phone: '+91 97330 22109', email: 'bhavna.sharma@aitpune.edu.in' }
      ],
      referees: [
        { name: 'Naib Subedar Ramesh Yadav', role: 'Chief Referee', affiliation: 'Army Sports Institute' },
        { name: 'Prof. P. B. Karandikar', role: 'Jury Convener', affiliation: 'E&TC Dept.' }
      ],
      scorecard: {
        'Boys': {
          gold: 'Mech-ARE', silver: 'IT', bronze: 'Comp', fourth: 'E&TC',
          finalScore: 'Mech-ARE won 3–1 (25–22, 23–25, 25–19, 25–18)',
          highlights: 'Amit Choudhary notched 19 spike kills and 5 monster block points to seal the championship for Mech-ARE.',
          stats: [
            { metric: 'Spike Kills', val1: '48 (Mech-ARE)', val2: '36 (IT)' },
            { metric: 'Block Points', val1: '12 (Mech-ARE)', val2: '6 (IT)' },
            { metric: 'Service Aces', val1: '8', val2: '5' }
          ]
        },
        'Girls': {
          gold: 'Comp', silver: 'Mech-ARE', bronze: 'IT', fourth: 'E&TC',
          finalScore: 'Comp won 2–0 (25–19, 25–21)',
          highlights: 'Bhavna Sharma dominated the net with deceptive tips and powerful cross-court spikes.',
          stats: [
            { metric: 'Spike Kills', val1: '28 (Comp)', val2: '21 (Mech-ARE)' },
            { metric: 'Block Points', val1: '7 (Comp)', val2: '4 (Mech-ARE)' },
            { metric: 'Service Aces', val1: '6', val2: '3' }
          ]
        }
      }
    },
    {
      id: 'sport-badminton',
      title: 'Badminton',
      icon: 'fa-feather',
      categoryGroup: 'Racket Sports',
      categories: ['Boys', 'Girls'],
      shieldPoints: '100 Pts Shield Max',
      venue: 'Indoor Badminton Stadium, Wooden Courts 1–3',
      trialDate: 'Nov 07–08, 2026 • 08:00 AM',
      description: 'Electrifying shuttlecock badminton tournament featuring 350+ km/h smashes, deceptive net tumbles, and lightning defense.',
      rulebook: 'BWF 21-point rally scoring system. Best of 3 sets. Yonex Aerosensa 30 feather shuttles provided for all official matches.',
      inCharges: [
        { name: 'Tejas Pandita', role: 'Badminton Secretary', branch: 'Comp', phone: '+91 99211 88701', email: 'tejas.pandita@aitpune.edu.in' },
        { name: 'Deepika Patil', role: 'Girls Captain', branch: 'E&TC', phone: '+91 98224 55102', email: 'deepika.patil@aitpune.edu.in' }
      ],
      referees: [
        { name: 'Mr. Shirish Boralkar', role: 'BAI National Umpire', affiliation: 'Badminton Association of India' },
        { name: 'Dr. Rahul B. Patil', role: 'Faculty Coordinator', affiliation: 'Applied Sciences' }
      ],
      scorecard: {
        'Boys': {
          gold: 'Comp', silver: 'E&TC', bronze: 'IT', fourth: 'Mech-ARE',
          finalScore: 'Comp won 2–1 (21–18, 19–21, 21–15)',
          highlights: 'Tejas Pandita (Comp) outlasted Harsh Joshi (E&TC) in a 68-minute thriller with 17 jump-smash winners.',
          stats: [
            { metric: 'Smash Speed Peak', val1: '362 km/h (Comp)', val2: '344 km/h (E&TC)' },
            { metric: 'Net Tumble Winners', val1: '14', val2: '11' },
            { metric: 'Unforced Errors', val1: '11', val2: '16' }
          ]
        },
        'Girls': {
          gold: 'E&TC', silver: 'Comp', bronze: 'IT', fourth: 'Mech-ARE',
          finalScore: 'E&TC won 2–0 (21–16, 21–14)',
          highlights: 'Deepika Patil (E&TC) controlled the tempo with deceptive cross-court clears and flat drives.',
          stats: [
            { metric: 'Smash Speed Peak', val1: '298 km/h (E&TC)', val2: '280 km/h (Comp)' },
            { metric: 'Net Tumble Winners', val1: '12', val2: '7' },
            { metric: 'Unforced Errors', val1: '8', val2: '14' }
          ]
        }
      }
    }
  ];

  // --------------------------------------------------------------------------
  // 3. CULTURAL AAKRITI: Verified Event Catalog (18 Events across 5 Domains)
  // --------------------------------------------------------------------------
  const CULTURAL_DATA = [
    // Stage & Theatre
    {
      id: 'cult-folk-dance',
      title: 'Folk Dance',
      icon: 'fa-masks-theater',
      categoryGroup: 'Stage & Theatre',
      shieldPoints: '100 Pts Shield Max',
      venue: 'Open Air Amphitheatre (OAT)',
      trialDate: 'Nov 12, 2026 • 06:00 PM',
      description: 'Vibrant regional folk dance spectacle celebrating Indian heritage (Bhangra, Garba, Lavani, Ghoomar). Synchronized footwork and traditional attire.',
      rulebook: 'Team size: 10–18 dancers. Time limit: 8–10 minutes. 80% weight on synchronization, expression, and cultural authenticity.',
      inCharges: [
        { name: 'Shruti Kulkarni', role: 'Dance Troupe Lead', branch: 'IT', phone: '+91 98220 11982', email: 'shruti.kulkarni@aitpune.edu.in' },
        { name: 'Aakash Verma', role: 'Stage Manager', branch: 'Comp', phone: '+91 97110 44299', email: 'aakash.verma@aitpune.edu.in' }
      ],
      judges: [
        { name: 'Guru Shama Bhate', role: 'Kathak & Folk Maestro', affiliation: 'Nad-Roop Dance Academy' },
        { name: 'Mrs. Suhasini Kadam', role: 'Sangeet Natak Akademi Fellow', affiliation: 'Pune University' }
      ],
      rubric: [
        { param: 'Choreography & Formations', max: 25 },
        { param: 'Authenticity & Costumes', max: 25 },
        { param: 'Rhythm, Timing & Footwork', max: 25 },
        { param: 'Facial Expressions & Energy', max: 25 }
      ],
      scorecard: {
        gold: 'IT', silver: 'Comp', bronze: 'Mech-ARE', fourth: 'E&TC',
        scores: [
          { branch: 'IT', score: 94.5, rank: '1st (Gold 🥇)' },
          { branch: 'Comp', score: 91.0, rank: '2nd (Silver 🥈)' },
          { branch: 'Mech-ARE', score: 86.5, rank: '3rd (Bronze 🥉)' },
          { branch: 'E&TC', score: 82.0, rank: '4th' }
        ],
        highlights: 'IT captivated the 1,500-strong crowd with a high-energy Punjabi Bhangra and Giddha fusion.'
      }
    },
    {
      id: 'cult-choreo',
      title: 'Choreo',
      icon: 'fa-person-booth',
      categoryGroup: 'Stage & Theatre',
      shieldPoints: '100 Pts Shield Max',
      venue: 'Manekshaw Central Auditorium',
      trialDate: 'Nov 13, 2026 • 06:30 PM',
      description: 'Flagship themed contemporary and western choreography showdown. Storytelling through movement, stage props, and dramatic lighting.',
      rulebook: 'Team size: 12–22 performers. Time limit: 10–12 minutes. Live audio track submission 24 hours prior. Zero hazardous props allowed.',
      inCharges: [
        { name: 'Nikhil Saxena', role: 'Choreo Lead', branch: 'Comp', phone: '+91 99231 77201', email: 'nikhil.saxena@aitpune.edu.in' },
        { name: 'Ritu Sen', role: 'Costume Coordinator', branch: 'IT', phone: '+91 98210 33491', email: 'ritu.sen@aitpune.edu.in' }
      ],
      judges: [
        { name: 'Terence Lewis Dance Troupe Senior Mentor', role: 'Celebrity Judge', affiliation: 'Mumbai' },
        { name: 'Ms. Meenal Joshi', role: 'Artistic Director', affiliation: 'Step Up Performing Arts' }
      ],
      rubric: [
        { param: 'Theme Conceptualization & Narrative', max: 25 },
        { param: 'Execution & Synchronization', max: 25 },
        { param: 'Creativity of Movements', max: 25 },
        { param: 'Music Editing & Stage Usage', max: 25 }
      ],
      scorecard: {
        gold: 'Comp', silver: 'IT', bronze: 'Mech-ARE', fourth: 'E&TC',
        scores: [
          { branch: 'Comp', score: 96.0, rank: '1st (Gold 🥇)' },
          { branch: 'IT', score: 93.5, rank: '2nd (Silver 🥈)' },
          { branch: 'Mech-ARE', score: 87.0, rank: '3rd (Bronze 🥉)' },
          { branch: 'E&TC', score: 83.5, rank: '4th' }
        ],
        highlights: 'Comp performed a spine-tingling dystopian narrative "The Last Algorithm" featuring laser illusions.'
      }
    },
    {
      id: 'cult-lims',
      title: 'LIMS',
      icon: 'fa-guitar',
      categoryGroup: 'Stage & Theatre',
      shieldPoints: '90 Pts Shield Max',
      venue: 'Open Air Amphitheatre (OAT)',
      trialDate: 'Nov 14, 2026 • 05:00 PM',
      description: 'Melodious vocal battle featuring classical raagas, semi-classical thumri, retro Bollywood classics, and western acoustics.',
      rulebook: 'Solos & Duets. Time: 4–6 minutes. Accompaniment: Up to 2 instruments or standard karaoke backing track. No auto-tune.',
      inCharges: [
        { name: 'Siddharth Roy', role: 'Swaranjali Club Lead', branch: 'IT', phone: '+91 98224 66109', email: 'siddharth.roy@aitpune.edu.in' },
        { name: 'Aarushi Mehta', role: 'Vocal Lead', branch: 'Comp', phone: '+91 97120 88401', email: 'aarushi.mehta@aitpune.edu.in' }
      ],
      judges: [
        { name: 'Pandit Sanjeev Chimmalgi', role: 'Hindustani Classical Vocalist', affiliation: 'Kirana Gharana' },
        { name: 'Ms. Shalini Srivastava', role: 'All India Radio Artist', affiliation: 'AIR Pune' }
      ],
      rubric: [
        { param: 'Sur & Pitch Precision', max: 30 },
        { param: 'Taal, Rhythm & Tempo', max: 25 },
        { param: 'Voice Quality & Range', max: 25 },
        { param: 'Emotional Expression (Bhaav)', max: 20 }
      ],
      scorecard: {
        gold: 'IT', silver: 'Comp', bronze: 'E&TC', fourth: 'Mech-ARE',
        scores: [
          { branch: 'IT', score: 95.0, rank: '1st (Gold 🥇)' },
          { branch: 'Comp', score: 92.5, rank: '2nd (Silver 🥈)' },
          { branch: 'E&TC', score: 88.0, rank: '3rd (Bronze 🥉)' },
          { branch: 'Mech-ARE', score: 81.5, rank: '4th' }
        ],
        highlights: 'Siddharth Roy (IT) earned a standing ovation with a soulful rendition of Raag Yaman blended into fusion.'
      }
    },
    {
      id: 'cult-nukkad',
      title: 'Street Play',
      icon: 'fa-bullhorn',
      categoryGroup: 'Stage & Theatre',
      shieldPoints: '90 Pts Shield Max',
      venue: 'Ramanujan Square Central Circle',
      trialDate: 'Nov 15, 2026 • 04:00 PM',
      description: 'Raw, energetic acoustic street theatre with live dholak beats, poetic slogans, and hard-hitting socio-cultural themes.',
      rulebook: 'Team size: 10–20 actors. Time: 12–15 minutes. Purely acoustic (no electronic mics). Uniform dress code mandatory.',
      inCharges: [
        { name: 'Varun Kaushik', role: 'Drama Secretary', branch: 'Mech-ARE', phone: '+91 99220 33811', email: 'varun.kaushik@aitpune.edu.in' },
        { name: 'Isha Deshpande', role: 'Nukkad Director', branch: 'IT', phone: '+91 98219 44102', email: 'isha.deshpande@aitpune.edu.in' }
      ],
      judges: [
        { name: 'Mr. Makarand Deshpande Associate', role: 'Theatre Director', affiliation: 'Ansh Theatre Group' },
        { name: 'Dr. (Mrs.) S. P. Gaikwad', role: 'Professor of Humanities', affiliation: 'Savitribai Phule Pune Univ.' }
      ],
      rubric: [
        { param: 'Script & Social Relevance', max: 30 },
        { param: 'Vocal Projection & Diction', max: 25 },
        { param: 'Formations & Rhythm (Dhol/Chants)', max: 25 },
        { param: 'Audience Engagement', max: 20 }
      ],
      scorecard: {
        gold: 'Mech-ARE', silver: 'Comp', bronze: 'IT', fourth: 'E&TC',
        scores: [
          { branch: 'Mech-ARE', score: 95.5, rank: '1st (Gold 🥇)' },
          { branch: 'Comp', score: 92.0, rank: '2nd (Silver 🥈)' },
          { branch: 'IT', score: 89.5, rank: '3rd (Bronze 🥉)' },
          { branch: 'E&TC', score: 84.0, rank: '4th' }
        ],
        highlights: 'Mech-ARE shocked the campus with their powerful play "Pankh" addressing mental health among young engineers.'
      }
    },
    {
      id: 'cult-mime',
      title: 'Mute Play',
      icon: 'fa-face-rolling-eyes',
      categoryGroup: 'Stage & Theatre',
      shieldPoints: '80 Pts Shield Max',
      venue: 'Manekshaw Central Auditorium',
      trialDate: 'Nov 16, 2026 • 03:30 PM',
      description: 'Silent theatrical art using body language, mime makeup, and physical illusion to communicate deep narrative without uttering a word.',
      rulebook: 'Team size: 4–8 actors. Time: 6–8 minutes. Background music permitted. No lip-sync or vocalization allowed.',
      inCharges: [
        { name: 'Pranav Joshi', role: 'Miraki Club Head', branch: 'Comp', phone: '+91 98230 77610', email: 'pranav.joshi@aitpune.edu.in' },
        { name: 'Snehal More', role: 'Event Convener', branch: 'E&TC', phone: '+91 97129 00412', email: 'snehal.more@aitpune.edu.in' }
      ],
      judges: [
        { name: 'Mr. Sujit Saraf', role: 'Physical Theatre Expert', affiliation: 'National School of Drama Alumni' },
        { name: 'Prof. V. V. Karve', role: 'Faculty Member', affiliation: 'Cultural Board' }
      ],
      rubric: [
        { param: 'Physical Control & Mime Techniques', max: 30 },
        { param: 'Story Clarity & Emotion', max: 30 },
        { param: 'Coordination & Blocking', max: 20 },
        { param: 'Music Synchronization', max: 20 }
      ],
      scorecard: {
        gold: 'Comp', silver: 'IT', bronze: 'E&TC', fourth: 'Mech-ARE',
        scores: [
          { branch: 'Comp', score: 93.0, rank: '1st (Gold 🥇)' },
          { branch: 'IT', score: 90.0, rank: '2nd (Silver 🥈)' },
          { branch: 'E&TC', score: 85.5, rank: '3rd (Bronze 🥉)' },
          { branch: 'Mech-ARE', score: 82.0, rank: '4th' }
        ],
        highlights: 'Comp delivered an emotional depiction of soldiers on the Siachen glacier through sheer physical mime.'
      }
    },
    {
      id: 'cult-monoacting',
      title: 'Monoacting',
      icon: 'fa-user-ninja',
      categoryGroup: 'Stage & Theatre',
      shieldPoints: '70 Pts Shield Max',
      venue: 'Seminar Hall 1',
      trialDate: 'Nov 16, 2026 • 05:30 PM',
      description: 'Solo dramatic theatrical monologue depicting multi-faceted characters, dramatic monologues, or historical monologues.',
      rulebook: 'Individual participant. Time: 4–6 minutes. Languages: Hindi/English. Minimal props (1 chair/table provided).',
      inCharges: [
        { name: 'Kartik Chawla', role: 'Stage Coordinator', branch: 'IT', phone: '+91 99211 44501', email: 'kartik.chawla@aitpune.edu.in' },
        { name: 'Priya Kadam', role: 'Co-Head', branch: 'Comp', phone: '+91 98224 88123', email: 'priya.kadam@aitpune.edu.in' }
      ],
      judges: [
        { name: 'Mr. Alok Rajwade', role: 'Film & Theatre Actor', affiliation: 'FTII Guest Faculty' },
        { name: 'Dr. G. K. Upadhye', role: 'HOD ASGE', affiliation: 'AIT' }
      ],
      rubric: [
        { param: 'Character Transition & Depth', max: 30 },
        { param: 'Voice Modulation & Dialogues', max: 30 },
        { param: 'Body Language & Stage Presence', max: 25 },
        { param: 'Time Adherence', max: 15 }
      ],
      scorecard: {
        gold: 'IT', silver: 'Mech-ARE', bronze: 'Comp', fourth: 'E&TC',
        scores: [
          { branch: 'IT', score: 94.0, rank: '1st (Gold 🥇)' },
          { branch: 'Mech-ARE', score: 91.5, rank: '2nd (Silver 🥈)' },
          { branch: 'Comp', score: 88.0, rank: '3rd (Bronze 🥉)' },
          { branch: 'E&TC', score: 81.0, rank: '4th' }
        ],
        highlights: 'Kartik Chawla (IT) seamlessly transitioned between 4 characters in a courtroom cross-examination monologue.'
      }
    },

    // BCJ Events (Debate & Quiz)
    {
      id: 'cult-gen-quiz',
      title: 'General Quiz',
      icon: 'fa-brain',
      categoryGroup: 'BCJ (Debate & Quiz)',
      shieldPoints: '80 Pts Shield Max',
      venue: 'Central Auditorium',
      trialDate: 'Nov 17, 2026 • 10:00 AM',
      description: 'Multi-round battle of wits covering History, Geopolitics, Sci-Tech, Pop Culture, Audio-Visual rounds, and Rapid Fire.',
      rulebook: 'Team of 2 members. Written prelims round selects top 6 teams for live stage buzzer finals with bounce & pounce rules.',
      inCharges: [
        { name: 'Aditya Swaminathan', role: 'Quizmaster Lead', branch: 'Comp', phone: '+91 98230 11209', email: 'aditya.swaminathan@aitpune.edu.in' },
        { name: 'Rohan Deshmukh', role: 'Quiz Coordinator', branch: 'E&TC', phone: '+91 97120 44582', email: 'rohan.deshmukh@aitpune.edu.in' }
      ],
      judges: [
        { name: 'Major General V. K. Bhatt (Retd.)', role: 'Patron Quizmaster', affiliation: 'Armed Forces Quiz Forum' },
        { name: 'Dr. Preeti Patil', role: 'Faculty Member', affiliation: 'IT Dept.' }
      ],
      rubric: [
        { param: 'Prelims Elimination Score', max: 40 },
        { param: 'Buzzer Final Points', max: 60 }
      ],
      scorecard: {
        gold: 'Comp', silver: 'IT', bronze: 'E&TC', fourth: 'Mech-ARE',
        scores: [
          { branch: 'Comp', score: 145, rank: '1st (Gold 🥇)' },
          { branch: 'IT', score: 120, rank: '2nd (Silver 🥈)' },
          { branch: 'E&TC', score: 95, rank: '3rd (Bronze 🥉)' },
          { branch: 'Mech-ARE', score: 70, rank: '4th' }
        ],
        highlights: 'Comp cracked the double-jeopardy audio-visual clue on Cold War cipher algorithms.'
      }
    },
    {
      id: 'cult-jam',
      title: 'JAM (Just A Minute)',
      icon: 'fa-stopwatch',
      categoryGroup: 'BCJ (Debate & Quiz)',
      shieldPoints: '70 Pts Shield Max',
      venue: 'Ramanujan Seminar Hall',
      trialDate: 'Nov 17, 2026 • 02:00 PM',
      description: 'Fast, witty wordplay test. Speak on random topics for 60 seconds without hesitation, repetition, or grammatical stumble.',
      rulebook: 'Individual event. Competitors object to grammatical infractions, stuttering, and pauses. Points awarded for speaking time and valid objections.',
      inCharges: [
        { name: 'Shreya Iyer', role: 'BCJ Secretary', branch: 'IT', phone: '+91 99221 88401', email: 'shreya.iyer@aitpune.edu.in' },
        { name: 'Naman Jain', role: 'Co-Host', branch: 'Comp', phone: '+91 98210 55412', email: 'naman.jain@aitpune.edu.in' }
      ],
      judges: [
        { name: 'Dr. Ashwini Kulkarni', role: 'Toastmasters International DTM', affiliation: 'Pune Toastmasters Club' },
        { name: 'Prof. Y. D. Patil', role: 'Faculty', affiliation: 'Comp Dept.' }
      ],
      rubric: [
        { param: 'Speaking Fluency & Seconds Spoken', max: 40 },
        { param: 'Wit, Humor & Grammar Precision', max: 35 },
        { param: 'Valid Objections & Strategic Timing', max: 25 }
      ],
      scorecard: {
        gold: 'IT', silver: 'Comp', bronze: 'E&TC', fourth: 'Mech-ARE',
        scores: [
          { branch: 'IT', score: 92, rank: '1st (Gold 🥇)' },
          { branch: 'Comp', score: 86, rank: '2nd (Silver 🥈)' },
          { branch: 'E&TC', score: 80, rank: '3rd (Bronze 🥉)' },
          { branch: 'Mech-ARE', score: 71, rank: '4th' }
        ],
        highlights: 'Shreya Iyer (IT) survived 48 continuous seconds on "Artificial Intelligence Eating Idlis" without a single pause.'
      }
    },
    {
      id: 'cult-group-discussion',
      title: 'Group Discussion',
      icon: 'fa-comments',
      categoryGroup: 'BCJ (Debate & Quiz)',
      shieldPoints: '80 Pts Shield Max',
      venue: 'Management Seminar Hall',
      trialDate: 'Nov 18, 2026 • 02:00 PM',
      description: 'Dynamic group discussion showdown evaluating articulation, leadership, active listening, logical coherence, and consensus building on trending socio-economic topics.',
      rulebook: 'Groups of 8–10 participants. 15 minutes per round. 2 minutes individual opening statement, followed by open moderation. Constructive interventions rewarded; aggression penalized.',
      inCharges: [
        { name: 'Tanvi Saxena', role: 'BCJ Coordinator', branch: 'Comp', phone: '+91 98220 55301', email: 'tanvi.saxena@aitpune.edu.in' },
        { name: 'Aman Deep', role: 'Discussion Lead', branch: 'IT', phone: '+91 99221 44812', email: 'aman.deep@aitpune.edu.in' }
      ],
      judges: [
        { name: 'Prof. Anirudh Sen', role: 'Corporate HR & GD Expert', affiliation: 'Symbiosis Institute of Business' },
        { name: 'Dr. G. K. Upadhye', role: 'Faculty Member', affiliation: 'AIT' }
      ],
      rubric: [
        { param: 'Content Knowledge & Logic', max: 30 },
        { param: 'Communication Skills & Clarity', max: 25 },
        { param: 'Group Dynamics & Moderation', max: 25 },
        { param: 'Active Listening & Body Language', max: 20 }
      ],
      scorecard: {
        gold: 'IT', silver: 'Comp', bronze: 'Mech-ARE', fourth: 'E&TC',
        scores: [
          { branch: 'IT', score: 94.0, rank: '1st (Gold 🥇)' },
          { branch: 'Comp', score: 91.5, rank: '2nd (Silver 🥈)' },
          { branch: 'Mech-ARE', score: 86.0, rank: '3rd (Bronze 🥉)' },
          { branch: 'E&TC', score: 80.5, rank: '4th' }
        ],
        highlights: 'IT led an insightful, balanced discussion on "Autonomous AI in Defense Systems: Ethical & Strategic Implications".'
      }
    },
    {
      id: 'cult-parl-debate',
      title: 'Debate',
      icon: 'fa-scale-balanced',
      categoryGroup: 'BCJ (Debate & Quiz)',
      shieldPoints: '90 Pts Shield Max',
      venue: 'Council Chamber Hall',
      trialDate: 'Nov 18, 2026 • 10:30 AM',
      description: 'Asian Parliamentary debate style. Government vs Opposition arguing high-stakes geopolitical, ethical, and economic motions.',
      rulebook: '3-member teams. 7-minute substantive speeches with 1-6 minute POI (Points of Information) window. Reply speeches of 4 minutes.',
      inCharges: [
        { name: 'Kabir Thapar', role: 'Debate Club President', branch: 'Comp', phone: '+91 98220 77192', email: 'kabir.thapar@aitpune.edu.in' },
        { name: 'Anushka Sharma', role: 'Adjudication Core', branch: 'IT', phone: '+91 97120 33810', email: 'anushka.sharma@aitpune.edu.in' }
      ],
      judges: [
        { name: 'Advocate Siddharth Luthra Associate', role: 'Supreme Court Jurist & Debater', affiliation: 'ILS Law College' },
        { name: 'Prof. (Dr.) Sangeeta Jadhav', role: 'HOD IT', affiliation: 'AIT Pune' }
      ],
      rubric: [
        { param: 'Matter (Argument Structure & Logic)', max: 40 },
        { param: 'Manner (Delivery, Oratory & Persuasion)', max: 40 },
        { param: 'Method (Team Dynamics & Rebuttal)', max: 20 }
      ],
      scorecard: {
        gold: 'Comp', silver: 'IT', bronze: 'Mech-ARE', fourth: 'E&TC',
        scores: [
          { branch: 'Comp', score: 95.0, rank: '1st (Gold 🥇)' },
          { branch: 'IT', score: 92.5, rank: '2nd (Silver 🥈)' },
          { branch: 'Mech-ARE', score: 84.0, rank: '3rd (Bronze 🥉)' },
          { branch: 'E&TC', score: 79.5, rank: '4th' }
        ],
        highlights: 'Comp successfully defended the motion "This House Would Ban Sovereign Debt Restructuring Conditionalities".'
      }
    },

    // Magboard Events (Literary)
    {
      id: 'cult-script-writing',
      title: 'Script Writing',
      icon: 'fa-feather-pointed',
      categoryGroup: 'Magboard (Literary)',
      shieldPoints: '70 Pts Shield Max',
      venue: 'Smart Classroom 4',
      trialDate: 'Nov 19, 2026 • 11:00 AM',
      description: 'Original screenplay writing sprint. Prompts revealed on the spot; contestants draft 3-act drama with dialogues and stage directions.',
      rulebook: 'Individual. Time: 90 minutes. Prompt options: Sci-fi thriller, Psychological drama, or Military tribute. Standard script format.',
      inCharges: [
        { name: 'Harshit Joshi', role: 'Magboard Editor-in-Chief', branch: 'IT', phone: '+91 98231 66102', email: 'harshit.joshi@aitpune.edu.in' },
        { name: 'Divya Khurana', role: 'Associate Editor', branch: 'Comp', phone: '+91 97210 99411', email: 'divya.khurana@aitpune.edu.in' }
      ],
      judges: [
        { name: 'Mr. Shrikant Bojewar', role: 'National Award-Winning Screenwriter', affiliation: 'Mumbai' },
        { name: 'Dr. G. M. Walunjkar', role: 'Faculty In-Charge Magboard', affiliation: 'English Dept.' }
      ],
      rubric: [
        { param: 'Originality & Plot Arc', max: 30 },
        { param: 'Dialogue Crispness & Subtext', max: 30 },
        { param: 'Character Arcs', max: 25 },
        { param: 'Screenplay Formatting', max: 15 }
      ],
      scorecard: {
        gold: 'IT', silver: 'Comp', bronze: 'E&TC', fourth: 'Mech-ARE',
        scores: [
          { branch: 'IT', score: 93, rank: '1st (Gold 🥇)' },
          { branch: 'Comp', score: 89, rank: '2nd (Silver 🥈)' },
          { branch: 'E&TC', score: 84, rank: '3rd (Bronze 🥉)' },
          { branch: 'Mech-ARE', score: 78, rank: '4th' }
        ],
        highlights: 'Harshit Joshi (IT) penned a dark comedy thriller titled "Recursion in Room 302".'
      }
    },
    {
      id: 'cult-article-writing',
      title: 'Article Writing',
      icon: 'fa-book-open',
      categoryGroup: 'Magboard (Literary)',
      shieldPoints: '70 Pts Shield Max',
      venue: 'Central Library Digital Lounge',
      trialDate: 'Nov 19, 2026 • 02:30 PM',
      description: 'Longform expository and creative essays on contemporary ethics, technology impact on humanity, and socio-philosophical currents.',
      rulebook: 'Individual. Word limit: 1,000–1,200 words. Plagiarism check applied. Typed or handwritten on official editorial sheets.',
      inCharges: [
        { name: 'Megha Nair', role: 'Literary Editor', branch: 'Comp', phone: '+91 99220 55102', email: 'megha.nair@aitpune.edu.in' },
        { name: 'Aryan Chandel', role: 'Editorial Staff', branch: 'Mech-ARE', phone: '+91 98210 44109', email: 'aryan.chandel@aitpune.edu.in' }
      ],
      judges: [
        { name: 'Ms. Sudha Menon', role: 'Best-Selling Author & Columnist', affiliation: 'The Indian Express' },
        { name: 'Prof. (Dr.) B. P. Patil', role: 'Principal / Literary Patron', affiliation: 'AIT' }
      ],
      rubric: [
        { param: 'Thesis Clarity & Persuasive Depth', max: 30 },
        { param: 'Vocabulary & Prose Elegance', max: 30 },
        { param: 'Evidence, Nuance & Logic', max: 25 },
        { param: 'Grammar & Flow', max: 15 }
      ],
      scorecard: {
        gold: 'Comp', silver: 'IT', bronze: 'Mech-ARE', fourth: 'E&TC',
        scores: [
          { branch: 'Comp', score: 94.5, rank: '1st (Gold 🥇)' },
          { branch: 'IT', score: 90.0, rank: '2nd (Silver 🥈)' },
          { branch: 'Mech-ARE', score: 86.0, rank: '3rd (Bronze 🥉)' },
          { branch: 'E&TC', score: 81.5, rank: '4th' }
        ],
        highlights: 'Megha Nair (Comp) wrote an incisive essay on "Algorithmic Solitude: Re-engineering Empathy in Generation Alpha".'
      }
    },

    // Fine Arts Events
    {
      id: 'cult-scribble-art',
      title: 'Scribble',
      icon: 'fa-pen-nib',
      categoryGroup: 'Fine Arts',
      shieldPoints: '60 Pts Shield Max',
      venue: 'Kalakriti Art Studio',
      trialDate: 'Nov 20, 2026 • 10:00 AM',
      description: 'Freeform continuous-line scribbling and intricate micro-doodling. Transforming chaotic ink strokes into stunning hyper-detailed portraits.',
      rulebook: 'Individual. Duration: 2 hours. Black gel/fineliner pens and A3 ivory cartridge paper provided. Zero pencil guidelines allowed.',
      inCharges: [
        { name: 'Ananya Deshpande', role: 'Fine Arts Secretary', branch: 'E&TC', phone: '+91 98224 11902', email: 'ananya.deshpande@aitpune.edu.in' },
        { name: 'Kunal Sonawane', role: 'Art Coordinator', branch: 'IT', phone: '+91 97110 88219', email: 'kunal.sonawane@aitpune.edu.in' }
      ],
      judges: [
        { name: 'Mr. Milind Mulick', role: 'Renowned Watercolorist & Visual Artist', affiliation: 'Abhinav Kala Mahavidyalaya' },
        { name: 'Prof. R. P. Kulkarni', role: 'Faculty In-Charge Kalakriti', affiliation: 'Mech Dept.' }
      ],
      rubric: [
        { param: 'Intricacy & Stroke Precision', max: 35 },
        { param: 'Visual Depth & Shading', max: 35 },
        { param: 'Originality of Concept', max: 30 }
      ],
      scorecard: {
        gold: 'E&TC', silver: 'IT', bronze: 'Comp', fourth: 'Mech-ARE',
        scores: [
          { branch: 'E&TC', score: 96, rank: '1st (Gold 🥇)' },
          { branch: 'IT', score: 91, rank: '2nd (Silver 🥈)' },
          { branch: 'Comp', score: 85, rank: '3rd (Bronze 🥉)' },
          { branch: 'Mech-ARE', score: 79, rank: '4th' }
        ],
        highlights: 'Ananya Deshpande (E&TC) completed an awe-inspiring scribble portrait of Field Marshal Sam Manekshaw.'
      }
    },
    {
      id: 'cult-blind-art',
      title: 'Blind Art',
      icon: 'fa-eye-slash',
      categoryGroup: 'Fine Arts',
      shieldPoints: '60 Pts Shield Max',
      venue: 'Kalakriti Art Studio',
      trialDate: 'Nov 20, 2026 • 01:30 PM',
      description: 'Two-member team challenge where the blindfolded painter is verbally guided by a partner describing a secret complex visual prompt.',
      rulebook: 'Team of 2. Time: 45 minutes. Partner may only give geometric/positional verbal commands. No physical touching of the canvas.',
      inCharges: [
        { name: 'Rohan Salunkhe', role: 'Art Lead', branch: 'Mech-ARE', phone: '+91 98230 44091', email: 'rohan.salunkhe@aitpune.edu.in' },
        { name: 'Simran Walia', role: 'Co-Lead', branch: 'Comp', phone: '+91 97220 55122', email: 'simran.walia@aitpune.edu.in' }
      ],
      judges: [
        { name: 'Prof. Jayant Joshi', role: 'Dean of Fine Arts', affiliation: 'Bharati Vidyapeeth' },
        { name: 'Prof. Archana Patil', role: 'Cultural Advisor', affiliation: 'AIT' }
      ],
      rubric: [
        { param: 'Fidelity to Original Secret Prompt', max: 40 },
        { param: 'Communication Coordination', max: 35 },
        { param: 'Color & Proportion Harmony', max: 25 }
      ],
      scorecard: {
        gold: 'IT', silver: 'Mech-ARE', bronze: 'Comp', fourth: 'E&TC',
        scores: [
          { branch: 'IT', score: 92, rank: '1st (Gold 🥇)' },
          { branch: 'Mech-ARE', score: 88, rank: '2nd (Silver 🥈)' },
          { branch: 'Comp', score: 84, rank: '3rd (Bronze 🥉)' },
          { branch: 'E&TC', score: 78, rank: '4th' }
        ],
        highlights: 'IT achieved an incredible 89% structural alignment with the secret prompt of the Eiffel Tower.'
      }
    },
    {
      id: 'cult-rangoli',
      title: 'Rangoli Making',
      icon: 'fa-palette',
      categoryGroup: 'Fine Arts',
      shieldPoints: '70 Pts Shield Max',
      venue: 'Central Quadrangle Corridor',
      trialDate: 'Nov 21, 2026 • 09:30 AM',
      description: 'Elaborate powdered color rangoli artworks blending traditional geometric motifs, 3D optical illusions, and patriotic themes.',
      rulebook: 'Team of 3 members. Space: 6ft x 6ft grid. Time: 3 hours. Organic colors and marble dust allowed. No pre-cut stencils.',
      inCharges: [
        { name: 'Gauri Shinde', role: 'Rangoli Coordinator', branch: 'Comp', phone: '+91 98221 33409', email: 'gauri.shinde@aitpune.edu.in' },
        { name: 'Pooja Patil', role: 'Co-Coordinator', branch: 'E&TC', phone: '+91 99230 77112', email: 'pooja.patil@aitpune.edu.in' }
      ],
      judges: [
        { name: 'Mrs. Vandana Chaskar', role: 'State Rangoli Awardee', affiliation: 'Maharashtra Sanskrutik Mahamandal' },
        { name: 'Dr. Seema Tiwari', role: 'Faculty Member', affiliation: 'AIT' }
      ],
      rubric: [
        { param: 'Color Blending & Vibrancy', max: 30 },
        { param: 'Geometry, Proportions & Detail', max: 30 },
        { param: 'Theme Interpretation & Innovation', max: 25 },
        { param: 'Neatness of Boundaries', max: 15 }
      ],
      scorecard: {
        gold: 'E&TC', silver: 'Comp', bronze: 'IT', fourth: 'Mech-ARE',
        scores: [
          { branch: 'E&TC', score: 97, rank: '1st (Gold 🥇)' },
          { branch: 'Comp', score: 93, rank: '2nd (Silver 🥈)' },
          { branch: 'IT', score: 87, rank: '3rd (Bronze 🥉)' },
          { branch: 'Mech-ARE', score: 80, rank: '4th' }
        ],
        highlights: 'E&TC created a mesmerizing 3D water droplet and lotus optical illusion using shaded marble powder.'
      }
    },
    {
      id: 'cult-poster-design',
      title: 'Poster Making',
      icon: 'fa-photo-film',
      categoryGroup: 'Fine Arts',
      shieldPoints: '60 Pts Shield Max',
      venue: 'Design Innovation Lab',
      trialDate: 'Nov 21, 2026 • 02:30 PM',
      description: 'High-impact visual communication poster challenge. Conveying potent social messages with bold typography, color psychology, and composition.',
      rulebook: 'Individual. 2 hours. Options: Digital (Photoshop/Illustrator/Figma) or Traditional Acrylic/Ink on chart sheet.',
      inCharges: [
        { name: 'Yash Vardhan', role: 'Design Lead', branch: 'IT', phone: '+91 98224 77109', email: 'yash.vardhan@aitpune.edu.in' },
        { name: 'Tanmay Saxena', role: 'Graphics Head', branch: 'Comp', phone: '+91 97120 44102', email: 'tanmay.saxena@aitpune.edu.in' }
      ],
      judges: [
        { name: 'Mr. Sudarshan Roy', role: 'Creative Director', affiliation: 'Ogilvy & Mather India' },
        { name: 'Prof. A. K. Singh', role: 'Faculty In-Charge', affiliation: 'IT Dept.' }
      ],
      rubric: [
        { param: 'Message Impact & Visual Metaphor', max: 35 },
        { param: 'Typography & Layout Hierarchy', max: 35 },
        { param: 'Color Palette & Craftsmanship', max: 30 }
      ],
      scorecard: {
        gold: 'IT', silver: 'Comp', bronze: 'Mech-ARE', fourth: 'E&TC',
        scores: [
          { branch: 'IT', score: 94, rank: '1st (Gold 🥇)' },
          { branch: 'Comp', score: 90, rank: '2nd (Silver 🥈)' },
          { branch: 'Mech-ARE', score: 83, rank: '3rd (Bronze 🥉)' },
          { branch: 'E&TC', score: 81, rank: '4th' }
        ],
        highlights: 'IT designed a striking typographic poster "Cyber Silence" advocating digital mindfulness.'
      }
    },

    // Film Club Events
    {
      id: 'cult-reel-making',
      title: 'Reel Making',
      icon: 'fa-film',
      categoryGroup: 'Film & Media',
      shieldPoints: '70 Pts Shield Max',
      venue: 'Campus Wide / Screening in Audio-Visual Hall',
      trialDate: 'Nov 22, 2026 • 11:00 AM',
      description: 'Fast-paced vertical video production challenge. Teams write, shoot, edit, and color-grade a 60-second viral campus cinematic.',
      rulebook: 'Team of 2–3 creators. 24-hour shoot window. 9:16 vertical ratio. Original or copyright-free audio. Zero vulgarity.',
      inCharges: [
        { name: 'Gautam Rawat', role: 'Film Club Head', branch: 'Comp', phone: '+91 98231 99401', email: 'gautam.rawat@aitpune.edu.in' },
        { name: 'Kriti Sen', role: 'Production Lead', branch: 'IT', phone: '+91 97110 33819', email: 'kriti.sen@aitpune.edu.in' }
      ],
      judges: [
        { name: 'Mr. Anurag Kashyap Assistant Director', role: 'Film Director & Editor', affiliation: 'Bollywood Independent Cinema' },
        { name: 'Prof. P. R. Sonawane', role: 'Media Officer', affiliation: 'Public Relations AIT' }
      ],
      rubric: [
        { param: 'Visual Storytelling & Hook', max: 30 },
        { param: 'Cinematography & Transitions', max: 30 },
        { param: 'Sound Design & Pacing', max: 25 },
        { param: 'Color Grading & Export Quality', max: 15 }
      ],
      scorecard: {
        gold: 'IT', silver: 'Comp', bronze: 'Mech-ARE', fourth: 'E&TC',
        scores: [
          { branch: 'IT', score: 95.5, rank: '1st (Gold 🥇)' },
          { branch: 'Comp', score: 93.0, rank: '2nd (Silver 🥈)' },
          { branch: 'Mech-ARE', score: 85.0, rank: '3rd (Bronze 🥉)' },
          { branch: 'E&TC', score: 80.0, rank: '4th' }
        ],
        highlights: 'IT produced a hyper-lapse match cut video showing 24 hours of campus life in 60 breathtaking seconds.'
      }
    },
    {
      id: 'cult-photography',
      title: 'Photography',
      icon: 'fa-camera',
      categoryGroup: 'Film & Media',
      shieldPoints: '70 Pts Shield Max',
      venue: 'Exhibition Gallery Corridor',
      trialDate: 'Nov 22, 2026 • 03:00 PM',
      description: 'Fine art photojournalism contest capturing campus architecture, military discipline, candid student bonds, and twilight shadows.',
      rulebook: 'Individual. Submit 3 high-res RAW + JPEG photos on announced themes. Basic color correction allowed; generative AI strictly prohibited.',
      inCharges: [
        { name: 'Siddheshwar Mane', role: 'Photography Secretary', branch: 'Mech-ARE', phone: '+91 99220 88102', email: 'siddheshwar.mane@aitpune.edu.in' },
        { name: 'Ankita Roy', role: 'Curator', branch: 'Comp', phone: '+91 98219 55401', email: 'ankita.roy@aitpune.edu.in' }
      ],
      judges: [
        { name: 'Mr. Jayesh Joshi', role: 'National Geographic Featured Contributor', affiliation: 'Pune' },
        { name: 'Prof. D. G. Auradkar', role: 'Faculty Coordinator', affiliation: 'Photography Club' }
      ],
      rubric: [
        { param: 'Composition & Rule of Thirds', max: 30 },
        { param: 'Lighting, Exposure & Mood', max: 30 },
        { param: 'Storytelling & Emotional Resonance', max: 25 },
        { param: 'Technical Sharpness & Focus', max: 15 }
      ],
      scorecard: {
        gold: 'Comp', silver: 'Mech-ARE', bronze: 'IT', fourth: 'E&TC',
        scores: [
          { branch: 'Comp', score: 96, rank: '1st (Gold 🥇)' },
          { branch: 'Mech-ARE', score: 92, rank: '2nd (Silver 🥈)' },
          { branch: 'IT', score: 88, rank: '3rd (Bronze 🥉)' },
          { branch: 'E&TC', score: 82, rank: '4th' }
        ],
        highlights: 'Comp clinched 1st place with a golden hour silhouette of soldiers practicing drill against the monsoon clouds.'
      }
    }
  ];

  // --------------------------------------------------------------------------
  // 4. TECHNICAL AAKRITI: Verified Event Catalog (8 Flagship Competitions)
  // --------------------------------------------------------------------------
  const TECHNICAL_DATA = [
    {
      id: 'tech-hackathon',
      title: 'Hack-A-Thon (24-Hour Code Sprint)',
      icon: 'fa-laptop-code',
      categoryGroup: 'Software & AI',
      shieldPoints: '150 Pts Shield Max',
      venue: 'Advanced Computing Lab & Open Innovation Atrium',
      trialDate: 'Nov 25–26, 2026 • 09:00 AM (24H Overnight)',
      description: 'The premier 24-hour non-stop engineering marathon. Build production-grade full-stack web/mobile applications, AI agents, or decentralized solutions.',
      rulebook: 'Team of 3–4 hackers. All code must be authored inside fresh GitHub repositories during the 24 hours. Commits verified with Git diff analysis.',
      inCharges: [
        { name: 'Aman Deep Sharma', role: 'Hackathon Lead', branch: 'Comp', phone: '+91 98230 55112', email: 'aman.sharma@aitpune.edu.in' },
        { name: 'Priya Bansal', role: 'Technical Secretary', branch: 'IT', phone: '+91 97120 44810', email: 'priya.bansal@aitpune.edu.in' }
      ],
      judges: [
        { name: 'Mr. Ankur Verma', role: 'Staff Software Architect', affiliation: 'Google India' },
        { name: 'Ms. Sunita Patil', role: 'Director of AI Engineering', affiliation: 'NVIDIA AI Tech Center' },
        { name: 'Dr. S. R. Dixit', role: 'Dean R&D', affiliation: 'AIT Pune' }
      ],
      rubric: [
        { param: 'Problem Complexity & Innovation', max: 30 },
        { param: 'Architecture, Clean Code & API Design', max: 30 },
        { param: 'Live Product Demo & UI/UX Finish', max: 25 },
        { param: 'Scalability & Defense under Jury Q&A', max: 15 }
      ],
      scorecard: {
        gold: 'Comp', silver: 'IT', bronze: 'E&TC', fourth: 'Mech-ARE',
        scores: [
          { branch: 'Comp', score: 96.5, rank: '1st (Gold 🥇)' },
          { branch: 'IT', score: 93.0, rank: '2nd (Silver 🥈)' },
          { branch: 'E&TC', score: 86.5, rank: '3rd (Bronze 🥉)' },
          { branch: 'Mech-ARE', score: 81.0, rank: '4th' }
        ],
        highlights: 'Team Comp built "DefenseShield-Vision": An edge-computed AI surveillance system detecting intrusion anomalies in 12ms.'
      }
    },
    {
      id: 'tech-dsa',
      title: 'Speed Coding & DSA Championship',
      icon: 'fa-code',
      categoryGroup: 'Software & AI',
      shieldPoints: '110 Pts Shield Max',
      venue: 'Turing Computer Center 2',
      trialDate: 'Nov 27, 2026 • 10:00 AM',
      description: 'Intense ACM-ICPC style algorithmic showdown. Solve complex dynamic programming, graph theory, trees, and math problems under ticking clocks.',
      rulebook: 'Individual contest. 2.5 hours on custom HackerRank / Codeforces arena. Plagiarism detection via MOSS. Time penalty for wrong submissions.',
      inCharges: [
        { name: 'Shubham Tiwari', role: 'Competitive Programming Lead', branch: 'Comp', phone: '+91 99221 33410', email: 'shubham.tiwari@aitpune.edu.in' },
        { name: 'Harshit Gupta', role: 'CP Coordinator', branch: 'IT', phone: '+91 98210 77192', email: 'harshit.gupta@aitpune.edu.in' }
      ],
      judges: [
        { name: 'Mr. Tanmay Kothari', role: 'Candidate Master (2050 Codeforces)', affiliation: 'Tower Research Capital' },
        { name: 'Prof. N. K. Bansode', role: 'Faculty In-Charge CP', affiliation: 'Comp Dept.' }
      ],
      rubric: [
        { param: 'Problems Solved (Out of 6)', max: 60 },
        { param: 'Execution Speed & Time Penalty', max: 40 }
      ],
      scorecard: {
        gold: 'Comp', silver: 'IT', bronze: 'E&TC', fourth: 'Mech-ARE',
        scores: [
          { branch: 'Comp', score: 98.0, rank: '1st (Gold 🥇)' },
          { branch: 'IT', score: 91.5, rank: '2nd (Silver 🥈)' },
          { branch: 'E&TC', score: 84.0, rank: '3rd (Bronze 🥉)' },
          { branch: 'Mech-ARE', score: 72.0, rank: '4th' }
        ],
        highlights: 'Shubham Tiwari (Comp) solved all 6 problems in 82 minutes, including a 2200-rated Segment Tree problem.'
      }
    },
    {
      id: 'tech-robo-soccer',
      title: 'Robo-Soccer & Line Follower',
      icon: 'fa-robot',
      categoryGroup: 'Robotics & Hardware',
      shieldPoints: '120 Pts Shield Max',
      venue: 'Indoor Robotics Arena (3D PLM Lab)',
      trialDate: 'Nov 28, 2026 • 11:00 AM',
      description: 'Dual-phase robotics championship: Phase 1 High-speed autonomous PID line follower track; Phase 2 Manually steered Bluetooth/RF robot football derby.',
      rulebook: 'Max bot weight: 3.5 kg. Dimensions: 30x30x30 cm max. Max supply voltage: 12V. Destructive weapons strictly banned.',
      inCharges: [
        { name: 'Siddhesh Gaikwad', role: 'Robotics Club Captain', branch: 'Mech-ARE', phone: '+91 98234 11820', email: 'siddhesh.gaikwad@aitpune.edu.in' },
        { name: 'Rohan Patil', role: 'Hardware In-Charge', branch: 'E&TC', phone: '+91 97120 99401', email: 'rohan.patil@aitpune.edu.in' }
      ],
      judges: [
        { name: 'Scientist \'E\' Dr. R. K. Saxena', role: 'Senior Robotics Scientist', affiliation: 'R&DE (Engineers) DRDO Pune' },
        { name: 'Prof. (Dr.) J. B. Sankpal', role: 'HOD Mechanical Engineering', affiliation: 'AIT' }
      ],
      rubric: [
        { param: 'Autonomous Track Lap Time & Accuracy', max: 40 },
        { param: 'Robo-Soccer Match Goals & Defense', max: 40 },
        { param: 'Mechanical Chassis Robustness & Wiring', max: 20 }
      ],
      scorecard: {
        gold: 'Mech-ARE', silver: 'E&TC', bronze: 'Comp', fourth: 'IT',
        scores: [
          { branch: 'Mech-ARE', score: 96.0, rank: '1st (Gold 🥇)' },
          { branch: 'E&TC', score: 92.5, rank: '2nd (Silver 🥈)' },
          { branch: 'Comp', score: 85.0, rank: '3rd (Bronze 🥉)' },
          { branch: 'IT', score: 79.0, rank: '4th' }
        ],
        highlights: 'Mech-ARE engineered a differential-drive robot with custom 3D-printed omni-wheels that scored 5 goals in the final.'
      }
    },
    {
      id: 'tech-cad',
      title: 'CAD Odyssey (3D Modeling & FEA Analysis)',
      icon: 'fa-cube',
      categoryGroup: 'Design & Ideation',
      shieldPoints: '90 Pts Shield Max',
      venue: 'CAD/CAM Lab, Mechanical Dept.',
      trialDate: 'Nov 29, 2026 • 10:30 AM',
      description: 'Precision mechanical engineering drafting sprint. Model complex assembly components in SolidWorks/CATIA and perform stress/FEA simulation.',
      rulebook: 'Team of 2. Time: 3 hours. Dimensional drawings revealed on spot. Assembly constraints, interference checks, and von Mises stress report evaluated.',
      inCharges: [
        { name: 'Nikhil Jagtap', role: 'CAD Club Secretary', branch: 'Mech-ARE', phone: '+91 99220 55819', email: 'nikhil.jagtap@aitpune.edu.in' },
        { name: 'Akshay Shinde', role: 'FEA Coordinator', branch: 'Comp', phone: '+91 98211 44102', email: 'akshay.shinde@aitpune.edu.in' }
      ],
      judges: [
        { name: 'Mr. Chandrashekhar Phadke', role: 'Principal FEA Consultant', affiliation: 'Dassault Systèmes' },
        { name: 'Prof. M. B. Nigade', role: 'Associate Professor', affiliation: 'Mech Dept.' }
      ],
      rubric: [
        { param: 'Geometric Accuracy & Tolerancing', max: 35 },
        { param: 'Assembly Mates & Motion Integrity', max: 30 },
        { param: 'Finite Element Analysis (FEA) Stress Rigor', max: 25 },
        { param: 'Drafting Sheet Standards (GD&T)', max: 10 }
      ],
      scorecard: {
        gold: 'Mech-ARE', silver: 'Comp', bronze: 'E&TC', fourth: 'IT',
        scores: [
          { branch: 'Mech-ARE', score: 97.5, rank: '1st (Gold 🥇)' },
          { branch: 'Comp', score: 89.0, rank: '2nd (Silver 🥈)' },
          { branch: 'E&TC', score: 84.5, rank: '3rd (Bronze 🥉)' },
          { branch: 'IT', score: 78.0, rank: '4th' }
        ],
        highlights: 'Mech-ARE modeled a complete planetary gearbox transmission assembly with zero clearance errors in 2 hours.'
      }
    },
    {
      id: 'tech-iot',
      title: 'Circuit Debugging & IoT Challenge',
      icon: 'fa-microchip',
      categoryGroup: 'Robotics & Hardware',
      shieldPoints: '100 Pts Shield Max',
      venue: 'VLSI & Embedded Systems Laboratory',
      trialDate: 'Nov 30, 2026 • 11:30 AM',
      description: 'Breadboard debugging, oscilloscope signal diagnosis, and ESP32 / STM32 sensor mesh telemetry design under rigorous fault injection.',
      rulebook: 'Team of 2. Round 1: Debug 5 intentional hardware faults in analog/digital circuits. Round 2: Build an IoT sensor telemetry node in 90 mins.',
      inCharges: [
        { name: 'Sanket Deshmukh', role: 'Embedded Systems Lead', branch: 'E&TC', phone: '+91 98221 77102', email: 'sanket.deshmukh@aitpune.edu.in' },
        { name: 'Ankita Rao', role: 'IoT Coordinator', branch: 'Comp', phone: '+91 97120 55419', email: 'ankita.rao@aitpune.edu.in' }
      ],
      judges: [
        { name: 'Mr. Rajesh Kulkarni', role: 'Senior Hardware Architect', affiliation: 'Texas Instruments India' },
        { name: 'Dr. (Mrs.) Renuka Goundar', role: 'Associate Professor', affiliation: 'E&TC Dept.' }
      ],
      rubric: [
        { param: 'Fault Identification Speed & Accuracy', max: 35 },
        { param: 'IoT Telemetry Reliability & MQTT Setup', max: 35 },
        { param: 'Soldering & Clean Breadboarding', max: 20 },
        { param: 'Power Efficiency Calculations', max: 10 }
      ],
      scorecard: {
        gold: 'E&TC', silver: 'Comp', bronze: 'IT', fourth: 'Mech-ARE',
        scores: [
          { branch: 'E&TC', score: 98.0, rank: '1st (Gold 🥇)' },
          { branch: 'Comp', score: 91.0, rank: '2nd (Silver 🥈)' },
          { branch: 'IT', score: 86.5, rank: '3rd (Bronze 🥉)' },
          { branch: 'Mech-ARE', score: 80.0, rank: '4th' }
        ],
        highlights: 'E&TC diagnosed all 5 circuit faults in a record 14 minutes and successfully piped MQTT sensor telemetry to AWS cloud.'
      }
    },
    {
      id: 'tech-uiux',
      title: 'UI/UX Design Dash (Figma Product Sprint)',
      icon: 'fa-wand-magic-sparkles',
      categoryGroup: 'Design & Ideation',
      shieldPoints: '90 Pts Shield Max',
      venue: 'Design Thinking Studio, IT Dept.',
      trialDate: 'Dec 01, 2026 • 10:00 AM',
      description: 'Rapid design sprint. Transform complex enterprise/campus challenges into intuitive, accessible, and stunning Figma prototypes.',
      rulebook: 'Team of 2. 4 hours sprint. Deliver: User persona, wireframes, design token system, interactive micro-animations, and design rationale deck.',
      inCharges: [
        { name: 'Sneha Kulkarni', role: 'Design Lead', branch: 'IT', phone: '+91 98230 88102', email: 'sneha.kulkarni@aitpune.edu.in' },
        { name: 'Divyanshu Sharma', role: 'UI Mentor', branch: 'Comp', phone: '+91 97220 33419', email: 'divyanshu.sharma@aitpune.edu.in' }
      ],
      judges: [
        { name: 'Mr. Rohan Paul', role: 'Principal Product Designer', affiliation: 'Microsoft India Studio' },
        { name: 'Dr. Preeti Patil', role: 'Faculty Member', affiliation: 'IT Dept.' }
      ],
      rubric: [
        { param: 'User Experience & Information Architecture', max: 30 },
        { param: 'Visual Aesthetics & Modern Design Tokens', max: 30 },
        { param: 'Interactive Micro-animations & Flow', max: 25 },
        { param: 'Accessibility Standards (WCAG 2.1 AA)', max: 15 }
      ],
      scorecard: {
        gold: 'IT', silver: 'Comp', bronze: 'E&TC', fourth: 'Mech-ARE',
        scores: [
          { branch: 'IT', score: 95.0, rank: '1st (Gold 🥇)' },
          { branch: 'Comp', score: 92.5, rank: '2nd (Silver 🥈)' },
          { branch: 'E&TC', score: 84.0, rank: '3rd (Bronze 🥉)' },
          { branch: 'Mech-ARE', score: 79.5, rank: '4th' }
        ],
        highlights: 'IT created "AIT Vital": An accessible health records and mess diet monitoring app with bespoke glassmorphic aesthetics.'
      }
    },
    {
      id: 'tech-paper',
      title: 'Paper & Project Exposition',
      icon: 'fa-newspaper',
      categoryGroup: 'Design & Ideation',
      shieldPoints: '100 Pts Shield Max',
      venue: 'Main Conference Auditorium',
      trialDate: 'Dec 02, 2026 • 09:30 AM',
      description: 'Defense of original research papers and hardware/software Capstone projects. Evaluated on IEEE formatting, empirical rigor, and patents.',
      rulebook: 'Team of 2–4 authors. 10-minute slide presentation followed by 5-minute rigorous defense before an IEEE expert panel.',
      inCharges: [
        { name: 'Dr. Ashwini Kulkarni', role: 'Faculty Convener', branch: 'Comp', phone: '+91 98220 99401', email: 'ashwini.kulkarni@aitpune.edu.in' },
        { name: 'Aditya Deshmukh', role: 'Student Secretary', branch: 'E&TC', phone: '+91 99230 44109', email: 'aditya.deshmukh@aitpune.edu.in' }
      ],
      judges: [
        { name: 'Prof. (Dr.) Aditya Abhyankar', role: 'Dean of Technology', affiliation: 'Savitribai Phule Pune Univ.' },
        { name: 'Dr. B. P. Patil', role: 'Principal & IEEE Senior Member', affiliation: 'AIT Pune' }
      ],
      rubric: [
        { param: 'Research Methodology & Novelty', max: 35 },
        { param: 'Empirical Results & Comparative Benchmarking', max: 30 },
        { param: 'IEEE Manuscript Quality & Citations', max: 20 },
        { param: 'Oral Defense & Q&A Mastery', max: 15 }
      ],
      scorecard: {
        gold: 'Comp', silver: 'E&TC', bronze: 'IT', fourth: 'Mech-ARE',
        scores: [
          { branch: 'Comp', score: 96.0, rank: '1st (Gold 🥇)' },
          { branch: 'E&TC', score: 93.5, rank: '2nd (Silver 🥈)' },
          { branch: 'IT', score: 88.0, rank: '3rd (Bronze 🥉)' },
          { branch: 'Mech-ARE', score: 84.0, rank: '4th' }
        ],
        highlights: 'Comp presented "Transformer-Driven Quantum Cryptographic Key Exchange for Tactical Networks" accepted in IEEE Conf.'
      }
    },
    {
      id: 'tech-ctf',
      title: 'CTF (Capture The Flag - Cyber Security)',
      icon: 'fa-shield-halved',
      categoryGroup: 'Software & AI',
      shieldPoints: '110 Pts Shield Max',
      venue: 'Cyber Security Operations Center (CSOC)',
      trialDate: 'Dec 03, 2026 • 12:00 PM (8-Hour Hack)',
      description: 'Jeopardy & Attack-Defense cybersecurity tournament. Exploit real vulnerabilities in web applications, binaries, cryptography, and forensics.',
      rulebook: 'Team of 2–3 hackers. 8 hours. Categories: Web Exploitation, Reverse Engineering, Binary Exploitation (Pwn), Forensics, Cryptography.',
      inCharges: [
        { name: 'Akshat Srivastava', role: 'Cyber Security Club Lead', branch: 'Comp', phone: '+91 98230 11902', email: 'akshat.srivastava@aitpune.edu.in' },
        { name: 'Nikhil Rathi', role: 'CTF Infrastructure Lead', branch: 'IT', phone: '+91 97120 77109', email: 'nikhil.rathi@aitpune.edu.in' }
      ],
      judges: [
        { name: 'Lt. Col. Sandeep Sharma', role: 'Cyber Warfare Specialist', affiliation: 'Military College of Telecomm. Engg.' },
        { name: 'Mr. Anmol Kothari', role: 'Principal Red Teamer', affiliation: 'CrowdStrike India' }
      ],
      rubric: [
        { param: 'Flags Captured (Dynamic Scoring Matrix)', max: 80 },
        { param: 'Submission of Writeup & Exploit Proofs', max: 20 }
      ],
      scorecard: {
        gold: 'Comp', silver: 'IT', bronze: 'E&TC', fourth: 'Mech-ARE',
        scores: [
          { branch: 'Comp', score: 2850, rank: '1st (Gold 🥇)' },
          { branch: 'IT', score: 2400, rank: '2nd (Silver 🥈)' },
          { branch: 'E&TC', score: 1950, rank: '3rd (Bronze 🥉)' },
          { branch: 'Mech-ARE', score: 1100, rank: '4th' }
        ],
        highlights: 'Comp achieved "First Blood" on the hardest kernel heap exploitation challenge with 18 minutes remaining.'
      }
    }
  ];

  // --------------------------------------------------------------------------
  // 5. SENIOR IN-CHARGE ASSIGNMENTS (Strictly mapped per Branch, Event, Category)
  // --------------------------------------------------------------------------
  const SENIOR_INCHARGES = {
    'Comp': {
      studentName: 'Kartikay Singhal',
      yearRole: 'BE Senior Branch Coordinator & TE Captain',
      badge: 'Comp Branch Head',
      phone: '+91 98230 11234',
      email: 'comp.aakriti.lead@aitpune.edu.in',
      whatsappGroup: 'https://chat.whatsapp.com/CompAakritiChampionshipSquad2026',
      reportingGuidelines: 'Report to Comp Department Common Room or designated court 20 minutes prior with official College ID and sports kit.'
    },
    'IT': {
      studentName: 'Harshita Choudhary',
      yearRole: 'BE Senior Branch Lead & Cult Secretary',
      badge: 'IT Branch Head',
      phone: '+91 98224 88712',
      email: 'it.aakriti.lead@aitpune.edu.in',
      whatsappGroup: 'https://chat.whatsapp.com/ITAakritiChampionshipSquad2026',
      reportingGuidelines: 'Report to IT Innovation Hub or designated venue with registration pass. Dress code: Official Branch Jersey / Formal.'
    },
    'E&TC': {
      studentName: 'Vikramaditya Kadam',
      yearRole: 'BE Senior Branch Lead & Hardware Coordinator',
      badge: 'E&TC Branch Head',
      phone: '+91 97120 44901',
      email: 'etc.aakriti.lead@aitpune.edu.in',
      whatsappGroup: 'https://chat.whatsapp.com/ETCAakritiChampionshipSquad2026',
      reportingGuidelines: 'Assemble at E&TC Seminar Foyer 15 mins before reporting. Bring your verified registration number and safety gear if applicable.'
    },
    'Mech-ARE': {
      studentName: 'Yashraj Chauhan',
      yearRole: 'BE Senior Branch Coordinator & Team BAJA Lead',
      badge: 'Mech-ARE Branch Head',
      phone: '+91 99220 33819',
      email: 'mech.are.aakriti.lead@aitpune.edu.in',
      whatsappGroup: 'https://chat.whatsapp.com/MechAreaAakritiSquad2026',
      reportingGuidelines: 'Report directly to Mechanical Workshop / Ground Arena. Mandatory attendance in WhatsApp group for lineup alerts and jersey allocation.'
    }
  };

  // --------------------------------------------------------------------------
  // 6. HISTORICAL ARCHIVES DATA (2023–2025)
  // --------------------------------------------------------------------------
  const ARCHIVES_DATA = {
    '2025': {
      year: '2025',
      shieldWinner: 'Comp',
      runnerUp: 'IT',
      winnerPoints: '1,480 Pts',
      sportsChamp: 'Comp (460 Pts)',
      culturalChamp: 'IT (495 Pts)',
      technicalChamp: 'Comp (525 Pts)',
      overviewText: 'A landmark year where Computer Engineering reclaimed the annual General Championship Shield after a gripping photo-finish against IT.',
      standings: [
        { rank: 1, branch: 'Comp', name: 'Computer Engineering', sports: 460, cultural: 495, tech: 525, total: 1480, gold: 24, silver: 14 },
        { rank: 2, branch: 'IT', name: 'Information Technology', sports: 380, cultural: 510, tech: 450, total: 1340, gold: 18, silver: 15 },
        { rank: 3, branch: 'Mech-ARE', name: 'Mechanical & Auto Robotics', sports: 440, cultural: 360, tech: 370, total: 1170, gold: 13, silver: 12 },
        { rank: 4, branch: 'E&TC', name: 'Electronics & Telecomm.', sports: 320, cultural: 310, tech: 460, total: 1090, gold: 10, silver: 13 }
      ]
    },
    '2024': {
      year: '2024',
      shieldWinner: 'IT',
      runnerUp: 'Comp',
      winnerPoints: '1,420 Pts',
      sportsChamp: 'Mech-ARE (450 Pts)',
      culturalChamp: 'IT (520 Pts)',
      technicalChamp: 'IT (470 Pts)',
      overviewText: 'Information Technology pulled off an unprecedented double crown by dominating both Cultural Aakriti and Technical Aakriti to hoist the coveted Annual Shield.',
      standings: [
        { rank: 1, branch: 'IT', name: 'Information Technology', sports: 430, cultural: 520, tech: 470, total: 1420, gold: 22, silver: 16 },
        { rank: 2, branch: 'Comp', name: 'Computer Engineering', sports: 440, cultural: 470, tech: 480, total: 1390, gold: 20, silver: 18 },
        { rank: 3, branch: 'Mech-ARE', name: 'Mechanical & Auto Robotics', sports: 450, cultural: 340, tech: 360, total: 1150, gold: 12, silver: 14 },
        { rank: 4, branch: 'E&TC', name: 'Electronics & Telecomm.', sports: 310, cultural: 330, tech: 440, total: 1080, gold: 9, silver: 11 }
      ]
    },
    '2023': {
      year: '2023',
      shieldWinner: 'Comp',
      runnerUp: 'E&TC',
      winnerPoints: '1,450 Pts',
      sportsChamp: 'Comp (470 Pts)',
      culturalChamp: 'Comp (490 Pts)',
      technicalChamp: 'E&TC (490 Pts)',
      overviewText: 'A historic post-pandemic full-scale return for Aakriti. E&TC pushed Computer Engineering to the absolute edge with stellar performance in hardware & robotics.',
      standings: [
        { rank: 1, branch: 'Comp', name: 'Computer Engineering', sports: 470, cultural: 490, tech: 490, total: 1450, gold: 23, silver: 15 },
        { rank: 2, branch: 'E&TC', name: 'Electronics & Telecomm.', sports: 340, cultural: 360, tech: 490, total: 1190, gold: 14, silver: 16 },
        { rank: 3, branch: 'Mech-ARE', name: 'Mechanical & Auto Robotics', sports: 430, cultural: 350, tech: 350, total: 1130, gold: 11, silver: 13 },
        { rank: 4, branch: 'IT', name: 'Information Technology', sports: 360, cultural: 440, tech: 410, total: 1210, gold: 12, silver: 14 }
      ]
    }
  };

  // --------------------------------------------------------------------------
  // 7. APPLICATION STATE CONTROLLER
  // --------------------------------------------------------------------------
  const state = {
    currentView: 'overview', // 'overview' | 'sports' | 'cultural' | 'technical'
    historyStack: ['overview'],
    selectedSportCategory: {}, // map of sportId -> 'Boys' | 'Girls' | 'Mixed Doubles'
    activeFilters: {
      sports: 'All',
      cultural: 'All',
      technical: 'All'
    },
    searchQueries: {
      sports: '',
      cultural: '',
      technical: ''
    },
    selectedArchiveYear: '2025',
    activeModal: null, // modal element or id currently open
    lastRegistration: null,
    // Active Roster Modal State
    activeRosterEventId: null,
    activeRosterDomain: 'sports',
    activeRosterBranch: 'All',
    activeRosterCategory: 'Boys',
    rosterSearchQuery: ''
  };

  // --------------------------------------------------------------------------
  // 8. INITIALIZATION & DOM CACHE
  // --------------------------------------------------------------------------
  function init() {
    setupSportCategoryDefaults();
    bindNavigationEvents();
    bindFilterEvents();
    bindSearchEvents();
    bindModalTriggers();
    renderAllViews();
    handleUrlHashRouting();
  }

  function setupSportCategoryDefaults() {
    SPORTS_DATA.forEach(sport => {
      state.selectedSportCategory[sport.id] = 'Boys';
    });
  }

  // --------------------------------------------------------------------------
  // 9. VIEW SWITCHING & ROUTING
  // --------------------------------------------------------------------------
  function navigateTo(viewName, pushToHistory = true) {
    if (!['overview', 'sports', 'cultural', 'technical'].includes(viewName)) {
      viewName = 'overview';
    }

    if (pushToHistory && state.currentView !== viewName) {
      state.historyStack.push(viewName);
    }

    state.currentView = viewName;

    // Update section active classes
    const allSections = document.querySelectorAll('.aakriti-view-section');
    allSections.forEach(sec => {
      sec.classList.remove('active');
    });

    const targetSec = document.getElementById(`view-${viewName}`);
    if (targetSec) {
      targetSec.classList.add('active');
    }

    // Update tab bar buttons
    const tabBtns = document.querySelectorAll('.champ-tab-btn');
    tabBtns.forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-view') === viewName);
    });

    // Update Breadcrumbs
    updateBreadcrumbs(viewName);

    // Scroll to top of content smoothly
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function handleBackButton() {
    // If a modal is open, close it first
    if (state.activeModal) {
      closeActiveModal();
      return;
    }

    // If on a sub-championship dashboard, go back to overview
    if (state.currentView !== 'overview') {
      navigateTo('overview');
      return;
    }

    // Return to the exact page the user was on just before this (e.g., Feed, Student Details, etc.)
    if (document.referrer && !document.referrer.includes('aakriti.html')) {
      window.location.href = document.referrer;
      return;
    }

    if (window.history.length > 1) {
      window.history.back();
      return;
    }

    // Safe portal fallback: go to Feed portal
    window.location.href = '../Feed/feed.html';
  }

  function updateBreadcrumbs(viewName) {
    const activeBreadcrumb = document.getElementById('activeBreadcrumbLabel');
    if (!activeBreadcrumb) return;

    const labels = {
      'overview': 'Hub Overview',
      'sports': 'Sports Aakriti',
      'cultural': 'Cultural Aakriti',
      'technical': 'Technical Aakriti'
    };

    activeBreadcrumb.textContent = labels[viewName] || 'Hub Overview';
  }

  function handleUrlHashRouting() {
    const hash = window.location.hash.replace('#', '').toLowerCase();
    if (['sports', 'cultural', 'technical', 'overview'].includes(hash)) {
      navigateTo(hash, false);
    } else {
      navigateTo('overview', false);
    }
  }

  // --------------------------------------------------------------------------
  // 10. RENDERING FUNCTIONS
  // --------------------------------------------------------------------------
  function renderAllViews() {
    renderHubOverview();
    renderSportsDashboard();
    renderCulturalDashboard();
    renderTechnicalDashboard();
    renderArchivesModal();
  }

  // A. Render Hub Overview
  function renderHubOverview() {
    renderReigningBanner('overview', 'reigningBannerOverview');
    renderStandingsGrid('overview', 'standingsGridOverview');
  }

  // B. Render Sports Dashboard
  function renderSportsDashboard() {
    renderReigningBanner('sports', 'reigningBannerSports');
    renderStandingsGrid('sports', 'standingsGridSports');
    renderSportsCards();
  }

  // C. Render Cultural Dashboard
  function renderCulturalDashboard() {
    renderReigningBanner('cultural', 'reigningBannerCultural');
    renderStandingsGrid('cultural', 'standingsGridCultural');
    renderCulturalCards();
  }

  // D. Render Technical Dashboard
  function renderTechnicalDashboard() {
    renderReigningBanner('technical', 'reigningBannerTechnical');
    renderStandingsGrid('technical', 'standingsGridTechnical');
    renderTechnicalCards();
  }

  // Render High-Impact Reigning Champion Banner
  function renderReigningBanner(domain, targetElementId) {
    const container = document.getElementById(targetElementId);
    if (!container) return;

    const data = REIGNING_CHAMPIONS[domain] || REIGNING_CHAMPIONS['overview'];
    const branchInfo = BRANCHES[data.branch] || BRANCHES['Comp'];

    container.innerHTML = `
      <div class="champ-banner-inner">
        <div class="champ-trophy-col">
          <div class="trophy-emblem-wrapper">
            <img src="${data.heroTrophy}" alt="${data.branch} Championship Trophy" class="trophy-image-media" onerror="this.src='./images/sports_hero.jpg'" />
            <div class="trophy-aura-ring"></div>
          </div>
        </div>
        <div class="champ-content-col">
          <div class="champ-tagline-strip">
            <span class="tag-pill"><i class="fa-solid fa-crown"></i> ${data.tagline}</span>
          </div>
          <h2 class="champ-winning-branch-title">
            <span class="champ-branch-highlight">${data.branch}</span>
            <span class="champ-branch-sub">(${data.branchFull})</span>
          </h2>
          <div class="champ-metrics-grid">
            <div class="metric-chip gold-badge">
              <i class="fa-solid fa-medal"></i> ${data.points}
            </div>
            <div class="metric-chip">
              <i class="fa-solid fa-trophy"></i> ${data.medals}
            </div>
            <div class="metric-chip margin-badge">
              <i class="fa-solid fa-arrow-trend-up"></i> ${data.margin}
            </div>
          </div>
        </div>
        <div class="champ-actions-col">
          <button class="btn-primary-action" onclick="window.Aakriti.openArchivesModal()">
            <i class="fa-solid fa-scroll"></i> Previous Standings
          </button>
        </div>
      </div>
    `;
  }

  // Render Department Standing Tiles
  function renderStandingsGrid(domain, targetElementId) {
    const container = document.getElementById(targetElementId);
    if (!container) return;

    const list = STANDINGS_DATA[domain] || STANDINGS_DATA['overview'];

    container.innerHTML = list.map((item, index) => {
      const isWinner = item.rank === 1;
      const rankMedals = { 1: '🥇', 2: '🥈', 3: '🥉', 4: '4' };

      return `
        <div class="team-standing-tile ${isWinner ? 'rank-1' : ''}" style="border-top: 3px solid ${BRANCHES[item.branch].color};">
          <div class="team-tile-top">
            <span class="branch-name-title" style="color: ${BRANCHES[item.branch].color};">${item.branch}</span>
            <span class="rank-badge-pill">${rankMedals[item.rank] || item.rank}</span>
          </div>
          <div class="branch-full-name">${item.name}</div>
          <div class="team-points-highlight">${item.points} <span style="font-size:0.85rem; font-weight:600; color:var(--navy-600);">Pts</span></div>
          <div class="team-medals-row">
            <span>🥇 ${item.gold} Gold</span>
            <span>•</span>
            <span>🥈 ${item.silver} Silver</span>
            ${item.bronze !== undefined ? `<span>• 🥉 ${item.bronze}</span>` : ''}
          </div>
        </div>
      `;
    }).join('');
  }

  // --------------------------------------------------------------------------
  // 11. CARDS RENDERERS (Sports, Cultural, Technical)
  // --------------------------------------------------------------------------

  // A. Sports Cards (Unified per sport, interactive category switcher)
  function renderSportsCards() {
    const container = document.getElementById('sportsCardsGrid');
    if (!container) return;

    const filter = state.activeFilters.sports;
    const search = state.searchQueries.sports.toLowerCase().trim();

    const filtered = SPORTS_DATA.filter(sport => {
      const matchesFilter = filter === 'All' || sport.categoryGroup === filter;
      const matchesSearch = sport.title.toLowerCase().includes(search) || 
                            sport.venue.toLowerCase().includes(search) ||
                            sport.description.toLowerCase().includes(search);
      return matchesFilter && matchesSearch;
    });

    if (filtered.length === 0) {
      container.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; padding: 60px 20px; background: rgba(255,255,255,0.7); border-radius: 20px; border: 1px dashed #cbd5e1;">
          <i class="fa-solid fa-dumbbell" style="font-size: 3rem; color: #94a3b8; margin-bottom: 14px;"></i>
          <h3 style="font-size: 1.25rem; font-weight: 700; color: var(--navy-900);">No matching sports found</h3>
          <p style="color: var(--navy-600); font-size: 0.875rem;">Try adjusting your search query or category filter pills.</p>
        </div>
      `;
      return;
    }

    container.innerHTML = filtered.map(sport => {
      const activeCategory = state.selectedSportCategory[sport.id] || 'Boys';

      // Build category pill selector HTML
      const categorySelectorHtml = sport.categories.map(cat => {
        const isCatActive = cat === activeCategory;
        const icon = cat === 'Boys' ? '👦' : cat === 'Girls' ? '👧' : '👥';
        return `
          <button type="button" class="sport-cat-btn ${isCatActive ? 'active' : ''}" 
            onclick="window.Aakriti.changeSportCategory('${sport.id}', '${cat}', event)">
            ${icon} ${cat}
          </button>
        `;
      }).join('');

      return `
        <article class="glass-event-card" id="card-${sport.id}">
          <div class="card-top-meta">
            <span class="event-category-badge"><i class="fa-solid ${sport.icon}"></i> ${sport.categoryGroup}</span>
            <span class="event-points-weight">${sport.shieldPoints}</span>
          </div>

          <h3 class="event-main-title">${sport.title}</h3>
          <p class="event-description-text">${sport.description}</p>

          <!-- Interactive Category Selection Deck -->
          <div class="sports-category-pills-row" title="Select division category">
            ${categorySelectorHtml}
          </div>

          <!-- Dynamic Details Strip based on active category -->
          <div class="event-info-strip">
            <div class="info-line-item">
              <i class="fa-solid fa-location-dot"></i>
              <span><strong>Venue:</strong> ${sport.venue}</span>
            </div>
            <div class="info-line-item">
              <i class="fa-solid fa-calendar-check"></i>
              <span><strong>Trials:</strong> ${sport.trialDate}</span>
            </div>
            <div class="info-line-item">
              <i class="fa-solid fa-user-tie"></i>
              <span><strong>In-Charge:</strong> ${sport.inCharges[0].name} (${sport.inCharges[0].branch})</span>
            </div>
          </div>

          <!-- Action Buttons Deck -->
          <div class="card-action-buttons-deck">
            <button class="btn-primary-action" onclick="window.Aakriti.openRegistrationModal('${sport.id}', 'sports')">
              <i class="fa-solid fa-bolt"></i> Give Trial / Register (${activeCategory}) ⚡
            </button>
            <button class="btn-roster-action" onclick="window.Aakriti.openParticipantsModal('${sport.id}', 'sports')">
              <i class="fa-solid fa-users"></i> View Players &amp; Squads 👥
            </button>
            <div class="card-secondary-actions-row">
              <button class="btn-secondary-action" onclick="window.Aakriti.openScorecardModal('${sport.id}', 'sports')">
                <i class="fa-solid fa-chart-simple"></i> Match Scorecard
              </button>
              <button class="btn-secondary-action" onclick="window.Aakriti.openEventDetailsModal('${sport.id}', 'sports')">
                <i class="fa-solid fa-circle-info"></i> Rules &amp; Referees
              </button>
            </div>
          </div>
        </article>
      `;
    }).join('');
  }

  // B. Cultural Cards
  function renderCulturalCards() {
    const container = document.getElementById('culturalCardsGrid');
    if (!container) return;

    const filter = state.activeFilters.cultural;
    const search = state.searchQueries.cultural.toLowerCase().trim();

    const filtered = CULTURAL_DATA.filter(event => {
      const matchesFilter = filter === 'All' || event.categoryGroup === filter;
      const matchesSearch = event.title.toLowerCase().includes(search) || 
                            event.venue.toLowerCase().includes(search) ||
                            event.description.toLowerCase().includes(search);
      return matchesFilter && matchesSearch;
    });

    if (filtered.length === 0) {
      container.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; padding: 60px 20px; background: rgba(255,255,255,0.7); border-radius: 20px; border: 1px dashed #cbd5e1;">
          <i class="fa-solid fa-masks-theater" style="font-size: 3rem; color: #94a3b8; margin-bottom: 14px;"></i>
          <h3 style="font-size: 1.25rem; font-weight: 700; color: var(--navy-900);">No matching cultural events found</h3>
          <p style="color: var(--navy-600); font-size: 0.875rem;">Try adjusting your search query or filter pills.</p>
        </div>
      `;
      return;
    }

    container.innerHTML = filtered.map(event => {
      return `
        <article class="glass-event-card">
          <div class="card-top-meta">
            <span class="event-category-badge"><i class="fa-solid ${event.icon}"></i> ${event.categoryGroup}</span>
            <span class="event-points-weight">${event.shieldPoints}</span>
          </div>

          <h3 class="event-main-title">${event.title}</h3>
          <p class="event-description-text">${event.description}</p>

          <div class="event-info-strip">
            <div class="info-line-item">
              <i class="fa-solid fa-location-dot"></i>
              <span><strong>Venue:</strong> ${event.venue}</span>
            </div>
            <div class="info-line-item">
              <i class="fa-solid fa-calendar-check"></i>
              <span><strong>Schedule:</strong> ${event.trialDate}</span>
            </div>
            <div class="info-line-item">
              <i class="fa-solid fa-user-check"></i>
              <span><strong>Coordinator:</strong> ${event.inCharges[0].name} (${event.inCharges[0].branch})</span>
            </div>
          </div>

          <div class="card-action-buttons-deck">
            <button class="btn-primary-action" onclick="window.Aakriti.openRegistrationModal('${event.id}', 'cultural')">
              <i class="fa-solid fa-microphone-lines"></i> Book Audition Slot 🎤
            </button>
            <button class="btn-roster-action" onclick="window.Aakriti.openParticipantsModal('${event.id}', 'cultural')">
              <i class="fa-solid fa-users"></i> View Participants &amp; Performers 👥
            </button>
            <div class="card-secondary-actions-row">
              <button class="btn-secondary-action" onclick="window.Aakriti.openScorecardModal('${event.id}', 'cultural')">
                <i class="fa-solid fa-trophy"></i> View Tally &amp; Results
              </button>
              <button class="btn-secondary-action" onclick="window.Aakriti.openEventDetailsModal('${event.id}', 'cultural')">
                <i class="fa-solid fa-file-lines"></i> Rubric &amp; Judges
              </button>
            </div>
          </div>
        </article>
      `;
    }).join('');
  }

  // C. Technical Cards
  function renderTechnicalCards() {
    const container = document.getElementById('technicalCardsGrid');
    if (!container) return;

    const filter = state.activeFilters.technical;
    const search = state.searchQueries.technical.toLowerCase().trim();

    const filtered = TECHNICAL_DATA.filter(event => {
      const matchesFilter = filter === 'All' || event.categoryGroup === filter;
      const matchesSearch = event.title.toLowerCase().includes(search) || 
                            event.venue.toLowerCase().includes(search) ||
                            event.description.toLowerCase().includes(search);
      return matchesFilter && matchesSearch;
    });

    if (filtered.length === 0) {
      container.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; padding: 60px 20px; background: rgba(255,255,255,0.7); border-radius: 20px; border: 1px dashed #cbd5e1;">
          <i class="fa-solid fa-laptop-code" style="font-size: 3rem; color: #94a3b8; margin-bottom: 14px;"></i>
          <h3 style="font-size: 1.25rem; font-weight: 700; color: var(--navy-900);">No matching technical competitions found</h3>
          <p style="color: var(--navy-600); font-size: 0.875rem;">Try adjusting your search query or filter pills.</p>
        </div>
      `;
      return;
    }

    container.innerHTML = filtered.map(event => {
      return `
        <article class="glass-event-card">
          <div class="card-top-meta">
            <span class="event-category-badge"><i class="fa-solid ${event.icon}"></i> ${event.categoryGroup}</span>
            <span class="event-points-weight">${event.shieldPoints}</span>
          </div>

          <h3 class="event-main-title">${event.title}</h3>
          <p class="event-description-text">${event.description}</p>

          <div class="event-info-strip">
            <div class="info-line-item">
              <i class="fa-solid fa-location-dot"></i>
              <span><strong>Arena:</strong> ${event.venue}</span>
            </div>
            <div class="info-line-item">
              <i class="fa-solid fa-clock"></i>
              <span><strong>Timing:</strong> ${event.trialDate}</span>
            </div>
            <div class="info-line-item">
              <i class="fa-solid fa-code-fork"></i>
              <span><strong>Lead:</strong> ${event.inCharges[0].name} (${event.inCharges[0].branch})</span>
            </div>
          </div>

          <div class="card-action-buttons-deck">
            <button class="btn-primary-action" onclick="window.Aakriti.openRegistrationModal('${event.id}', 'technical')">
              <i class="fa-solid fa-rocket"></i> Apply / Register Team 🚀
            </button>
            <button class="btn-roster-action" onclick="window.Aakriti.openParticipantsModal('${event.id}', 'technical')">
              <i class="fa-solid fa-users"></i> View Participants &amp; Teams 👥
            </button>
            <div class="card-secondary-actions-row">
              <button class="btn-secondary-action" onclick="window.Aakriti.openScorecardModal('${event.id}', 'technical')">
                <i class="fa-solid fa-chart-column"></i> Leaderboard &amp; Rubric
              </button>
              <button class="btn-secondary-action" onclick="window.Aakriti.openEventDetailsModal('${event.id}', 'technical')">
                <i class="fa-solid fa-book-bookmark"></i> Problem &amp; Jury
              </button>
            </div>
          </div>
        </article>
      `;
    }).join('');
  }

  // --------------------------------------------------------------------------
  // 12. MODALS CONTROLLER & POPULATORS
  // --------------------------------------------------------------------------

  // A. Event Details, In-Charge & Referee / Judge Overlay
  function openEventDetailsModal(eventId, domain) {
    const modal = document.getElementById('eventDetailsModal');
    if (!modal) return;

    let item = null;
    if (domain === 'sports') item = SPORTS_DATA.find(s => s.id === eventId);
    else if (domain === 'cultural') item = CULTURAL_DATA.find(c => c.id === eventId);
    else if (domain === 'technical') item = TECHNICAL_DATA.find(t => t.id === eventId);

    if (!item) return;

    document.getElementById('detailsModalTitle').textContent = item.title;
    document.getElementById('detailsModalSub').textContent = `${item.categoryGroup} • ${item.shieldPoints}`;

    const body = document.getElementById('detailsModalBody');
    const officialsTitle = domain === 'sports' ? 'Official Certified Referees / Umpires' : 'Official Jury Members & External Judges';
    const officialsList = item.referees || item.judges || [];

    body.innerHTML = `
      <div style="margin-bottom: 24px;">
        <h4 style="font-size: 1rem; font-weight: 800; color: var(--navy-950); margin-bottom: 8px;">Event Overview</h4>
        <p style="font-size: 0.9rem; color: var(--navy-700); line-height: 1.6;">${item.description}</p>
      </div>

      <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: var(--radius-lg); padding: 18px; margin-bottom: 24px;">
        <h4 style="font-size: 0.95rem; font-weight: 800; color: var(--navy-950); margin-bottom: 12px; display: flex; align-items: center; gap: 8px;">
          <i class="fa-solid fa-book-atlas" style="color: var(--blue-royal);"></i> Official Rulebook & Shield Points Weightage
        </h4>
        <p style="font-size: 0.85rem; color: var(--navy-700); line-height: 1.5; margin-bottom: 12px;">${item.rulebook}</p>
        <div style="display: flex; gap: 10px; flex-wrap: wrap;">
          <span style="font-size: 0.775rem; background: #fffbeb; border: 1px solid #fde047; color: #854d0e; padding: 4px 10px; border-radius: 9999px; font-weight: 700;">🥇 1st: 100 Pts</span>
          <span style="font-size: 0.775rem; background: #f8fafc; border: 1px solid #cbd5e1; color: #334155; padding: 4px 10px; border-radius: 9999px; font-weight: 700;">🥈 2nd: 60 Pts</span>
          <span style="font-size: 0.775rem; background: #fff7ed; border: 1px solid #fed7aa; color: #9a3412; padding: 4px 10px; border-radius: 9999px; font-weight: 700;">🥉 3rd: 30 Pts</span>
          <span style="font-size: 0.775rem; background: #f1f5f9; border: 1px solid #e2e8f0; color: #475569; padding: 4px 10px; border-radius: 9999px; font-weight: 700;">4th: 10 Pts</span>
        </div>
      </div>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 24px;">
        <div style="background: rgba(255,255,255,0.9); border: 1px solid #e2e8f0; border-radius: var(--radius-md); padding: 16px;">
          <h5 style="font-size: 0.85rem; font-weight: 800; color: var(--navy-900); margin-bottom: 8px;"><i class="fa-solid fa-map-pin" style="color: var(--blue-royal);"></i> Official Venue</h5>
          <p style="font-size: 0.85rem; color: var(--navy-700); font-weight: 600;">${item.venue}</p>
        </div>
        <div style="background: rgba(255,255,255,0.9); border: 1px solid #e2e8f0; border-radius: var(--radius-md); padding: 16px;">
          <h5 style="font-size: 0.85rem; font-weight: 800; color: var(--navy-900); margin-bottom: 8px;"><i class="fa-solid fa-calendar-days" style="color: var(--blue-royal);"></i> Trials / Reporting Slot</h5>
          <p style="font-size: 0.85rem; color: var(--navy-700); font-weight: 600;">${item.trialDate}</p>
        </div>
      </div>

      <!-- Confirmed Event Participants & Department Squads Roster Preview -->
      <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: var(--radius-lg); padding: 18px; margin-bottom: 24px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; flex-wrap: wrap; gap: 8px;">
          <div>
            <h4 style="font-size: 0.95rem; font-weight: 800; color: var(--navy-950); margin: 0; display: flex; align-items: center; gap: 8px;">
              <i class="fa-solid fa-users" style="color: var(--blue-royal);"></i> Event Participants &amp; Squad Lineups
            </h4>
            <span style="font-size: 0.775rem; color: var(--navy-600);">Total confirmed competitors across the 4 college branches</span>
          </div>
          <button type="button" class="btn-roster-action" onclick="window.Aakriti.openParticipantsModal('${item.id}', '${domain}')" style="width: auto; padding: 6px 14px; font-size: 0.8rem;">
            <i class="fa-solid fa-users-viewfinder"></i> View Full Player Roster &amp; Names 👥
          </button>
        </div>
        <p style="font-size: 0.825rem; color: var(--navy-700); margin: 0; line-height: 1.5;">
          Official lineups for Comp, IT, E&amp;TC, and Mech-ARE are locked for the tournament. Click above to view complete lists of player names, captains, and registration numbers.
        </p>
      </div>

      <!-- Student In-Charges -->
      <div style="margin-bottom: 24px;">
        <h4 style="font-size: 0.95rem; font-weight: 800; color: var(--navy-950); margin-bottom: 12px; display: flex; align-items: center; gap: 8px;">
          <i class="fa-solid fa-users-gear" style="color: var(--blue-royal);"></i> Designated Student In-Charges
        </h4>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
          ${item.inCharges.map(lead => `
            <div style="padding: 12px; background: #ffffff; border: 1px solid #e2e8f0; border-radius: var(--radius-md); display: flex; flex-direction: column; gap: 4px;">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <strong style="font-size: 0.9rem; color: var(--navy-900);">${lead.name}</strong>
                <span style="font-size: 0.7rem; background: ${BRANCHES[lead.branch].lightBg}; color: ${BRANCHES[lead.branch].color}; border: 1px solid ${BRANCHES[lead.branch].border || '#cbd5e1'}; padding: 2px 6px; border-radius: 9999px; font-weight: 700;">${lead.branch}</span>
              </div>
              <span style="font-size: 0.775rem; color: var(--navy-600);">${lead.role}</span>
              <a href="tel:${lead.phone}" style="font-size: 0.775rem; color: var(--blue-royal); text-decoration: none;"><i class="fa-solid fa-phone"></i> ${lead.phone}</a>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Officials / Referees / Judges -->
      <div>
        <h4 style="font-size: 0.95rem; font-weight: 800; color: var(--navy-950); margin-bottom: 12px; display: flex; align-items: center; gap: 8px;">
          <i class="fa-solid fa-gavel" style="color: var(--blue-royal);"></i> ${officialsTitle}
        </h4>
        <div style="display: flex; flex-direction: column; gap: 10px;">
          ${officialsList.map(off => `
            <div style="padding: 12px; background: #ffffff; border: 1px solid #e2e8f0; border-radius: var(--radius-md); display: flex; align-items: center; justify-content: space-between;">
              <div>
                <strong style="font-size: 0.9rem; color: var(--navy-900); display: block;">${off.name}</strong>
                <span style="font-size: 0.775rem; color: var(--navy-600);">${off.role}</span>
              </div>
              <span style="font-size: 0.75rem; background: #eff6ff; color: var(--blue-royal); padding: 4px 10px; border-radius: 9999px; font-weight: 600;">${off.affiliation}</span>
            </div>
          `).join('')}
        </div>
      </div>
    `;

    openModal(modal);
  }

  // B. Registration / Trial / Audition Form Modal
  function openRegistrationModal(eventId, domain) {
    const modal = document.getElementById('registrationModal');
    if (!modal) return;

    let item = null;
    let selectedCat = 'Boys';

    if (domain === 'sports') {
      item = SPORTS_DATA.find(s => s.id === eventId);
      const availableCategories = (item && item.categories && item.categories.length > 0)
        ? item.categories
        : ['Boys', 'Girls'];
      selectedCat = state.selectedSportCategory[eventId] || availableCategories[0] || 'Boys';
      if (!availableCategories.includes(selectedCat)) {
        selectedCat = availableCategories[0];
      }
      state.selectedSportCategory[eventId] = selectedCat;
    } else if (domain === 'cultural') {
      item = CULTURAL_DATA.find(c => c.id === eventId);
      selectedCat = item ? item.categoryGroup : 'Cultural Event';
    } else if (domain === 'technical') {
      item = TECHNICAL_DATA.find(t => t.id === eventId);
      selectedCat = item ? item.categoryGroup : 'Technical Event';
    }

    if (!item) return;

    // Reset Senior reveal card if previously rendered
    const revealContainer = document.getElementById('seniorRevealContainer');
    if (revealContainer) revealContainer.style.display = 'none';

    const form = document.getElementById('championshipRegForm');
    if (form) {
      form.style.display = 'grid';
      form.reset();
    }

    // Retrieve signed-in student session
    let loggedInUser = null;
    try {
      const raw = localStorage.getItem('campusConnectUser');
      if (raw) loggedInUser = JSON.parse(raw);
    } catch (e) {}

    const isGuest = loggedInUser && loggedInUser.role === 'guest';
    const studentName = isGuest ? '' : ((loggedInUser && loggedInUser.name) ? loggedInUser.name : 'Snehangshu Das');
    const studentRegNo = isGuest ? '' : ((loggedInUser && (loggedInUser.regNo || loggedInUser.id)) ? (loggedInUser.regNo || loggedInUser.id) : '22145');

    // 1. Pre-fill credentials mentioned during sign-in
    const nameInput = document.getElementById('regInputFullName');
    const regInput = document.getElementById('regInputRegNo');
    if (nameInput) nameInput.value = studentName;
    if (regInput) regInput.value = studentRegNo;

    // 2. Leave phone, experience and other dynamic details BLANK
    const phoneInput = document.getElementById('regInputPhone');
    const expInput = document.getElementById('regInputExperience');
    if (phoneInput) phoneInput.value = '';
    if (expInput) expInput.value = '';

    // Pre-select branch if available in user session
    if (loggedInUser && loggedInUser.branch) {
      const branchMap = {
        'comp': 'branchRadioComp',
        'it': 'branchRadioIT',
        'etc': 'branchRadioETC',
        'mech': 'branchRadioMech'
      };
      const key = loggedInUser.branch.toLowerCase().replace(/[^a-z]/g, '');
      for (const [b, id] of Object.entries(branchMap)) {
        if (key.includes(b)) {
          const radio = document.getElementById(id);
          if (radio) radio.checked = true;
          break;
        }
      }
    }

    document.getElementById('regModalEventTitle').textContent = `Register for ${item.title}`;
    document.getElementById('regModalEventCategory').textContent = `${selectedCat} Division • ${domain.toUpperCase()}`;

    // Fill hidden or auto-filled fields
    document.getElementById('regHiddenEventId').value = eventId;
    document.getElementById('regHiddenDomain').value = domain;
    const catInput = document.getElementById('regInputCategory');
    if (catInput) catInput.value = selectedCat;

    // Render interactive category pill selector
    const pillsContainer = document.getElementById('regCategoryPillsContainer');
    const categoryHelp = document.getElementById('regCategoryHelpText');
    const categoryLabel = document.getElementById('regCategoryLabel');

    if (pillsContainer) {
      if (domain === 'sports') {
        const availableCategories = (item.categories && item.categories.length > 0)
          ? item.categories
          : ['Boys', 'Girls'];

        if (categoryLabel) {
          categoryLabel.innerHTML = '<i class="fa-solid fa-venus-mars" style="color: var(--blue-royal);"></i> Competition Category (Select Boys or Girls) *';
        }
        if (categoryHelp) {
          categoryHelp.textContent = 'Click to switch between Boys and Girls divisions for your trial:';
          categoryHelp.style.display = 'block';
        }

        pillsContainer.innerHTML = availableCategories.map(cat => {
          const isSelected = cat === selectedCat;
          const icon = cat === 'Boys' 
            ? '<i class="fa-solid fa-person-running"></i>' 
            : cat === 'Girls' 
              ? '<i class="fa-solid fa-person-running-fast"></i>' 
              : '<i class="fa-solid fa-people-arrows"></i>';
          return `
            <button type="button" 
              class="reg-cat-pill-btn ${isSelected ? 'active' : ''}" 
              data-cat="${cat}" 
              role="radio"
              aria-checked="${isSelected ? 'true' : 'false'}"
              onclick="window.Aakriti.selectRegCategory('${cat}')">
              ${icon} <span>${cat} Division</span>
              ${isSelected ? '<i class="fa-solid fa-circle-check cat-check-icon"></i>' : ''}
            </button>
          `;
        }).join('');
      } else {
        if (categoryLabel) {
          categoryLabel.innerHTML = '<i class="fa-solid fa-layer-group" style="color: var(--blue-royal);"></i> Event Category / Division';
        }
        if (categoryHelp) {
          categoryHelp.textContent = 'Official tournament division for this event:';
          categoryHelp.style.display = 'block';
        }
        const icon = domain === 'cultural' ? '<i class="fa-solid fa-masks-theater"></i>' : '<i class="fa-solid fa-laptop-code"></i>';
        pillsContainer.innerHTML = `
          <button type="button" class="reg-cat-pill-btn active static-division" data-cat="${selectedCat}" role="radio" aria-checked="true">
            ${icon} <span>${selectedCat} (Open Varsity)</span>
            <i class="fa-solid fa-circle-check cat-check-icon"></i>
          </button>
        `;
      }
    }

    // Customize specialization label based on domain
    const specLabel = document.getElementById('regLabelExperience');
    const specInput = document.getElementById('regInputExperience');
    if (domain === 'sports') {
      specLabel.textContent = 'Playing Position / Racket Hand / Past Tournament Record';
      specInput.placeholder = 'e.g., Striker, Opening Batsman, Right-Hand Top Spin, Inter-School Gold';
    } else if (domain === 'cultural') {
      specLabel.textContent = 'Artistic Style / Instrument / Vocal Pitch / Portfolio Link';
      specInput.placeholder = 'e.g., Hindustani Classical Vocalist, Lead Guitarist, Kathak 4 years, Instagram reel link';
    } else {
      specLabel.textContent = 'Tech Stack / GitHub Profile / Specialization Area';
      specInput.placeholder = 'e.g., React, PyTorch, ROS2, github.com/username, Codeforces Candidate Master';
    }

    openModal(modal);
  }

  // Switch Category inside Registration Modal
  function selectRegCategory(newCategory) {
    const hiddenInput = document.getElementById('regInputCategory');
    if (hiddenInput) {
      hiddenInput.value = newCategory;
    }

    const eventId = document.getElementById('regHiddenEventId').value;
    const domain = document.getElementById('regHiddenDomain').value;

    if (domain === 'sports' && eventId) {
      state.selectedSportCategory[eventId] = newCategory;
      // Re-render sport cards so the background card also reflects this change
      renderSportsCards();
    }

    // Update the modal's category sub-heading
    const catSub = document.getElementById('regModalEventCategory');
    if (catSub) {
      catSub.textContent = `${newCategory} Division • ${domain ? domain.toUpperCase() : 'SPORTS'}`;
    }

    // Update active classes on pill buttons inside modal
    const pillsContainer = document.getElementById('regCategoryPillsContainer');
    if (pillsContainer) {
      const buttons = pillsContainer.querySelectorAll('.reg-cat-pill-btn');
      buttons.forEach(btn => {
        const cat = btn.dataset.cat;
        const isSelected = cat === newCategory;
        btn.classList.toggle('active', isSelected);
        btn.setAttribute('aria-checked', isSelected ? 'true' : 'false');
        
        const existingCheck = btn.querySelector('.cat-check-icon');
        if (isSelected && !existingCheck) {
          const check = document.createElement('i');
          check.className = 'fa-solid fa-circle-check cat-check-icon';
          btn.appendChild(check);
        } else if (!isSelected && existingCheck) {
          existingCheck.remove();
        }
      });
    }

    showToast(`⚡ Category switched to ${newCategory} Division!`);
  }

  // Handle Registration Form Submission & Reveal Senior In-Charge
  function handleRegistrationSubmit(e) {
    e.preventDefault();

    const form = document.getElementById('championshipRegForm');
    const eventId = document.getElementById('regHiddenEventId').value;
    const domain = document.getElementById('regHiddenDomain').value;
    const fullName = document.getElementById('regInputFullName').value.trim();
    const regNo = document.getElementById('regInputRegNo').value.trim();
    const phone = document.getElementById('regInputPhone').value.trim();
    const category = document.getElementById('regInputCategory').value;
    const experience = document.getElementById('regInputExperience').value.trim();

    // Get selected Branch from radio options
    const selectedBranchRadio = document.querySelector('input[name="selectedBranch"]:checked');
    if (!selectedBranchRadio) {
      showToast('⚠️ Please select your departmental branch (Comp, IT, E&TC, or Mech-ARE)!');
      return;
    }
    const branchCode = selectedBranchRadio.value;

    if (!fullName || !regNo || !phone) {
      showToast('⚠️ Please fill in all required fields (Name, Registration ID, and Phone Number)!');
      return;
    }

    // Lookup Senior In-Charge assigned for that branch
    const senior = SENIOR_INCHARGES[branchCode] || SENIOR_INCHARGES['Comp'];
    const branchInfo = BRANCHES[branchCode] || BRANCHES['Comp'];

    let eventTitle = 'Event';
    if (domain === 'sports') {
      const sp = SPORTS_DATA.find(s => s.id === eventId);
      if (sp) eventTitle = sp.title;
    } else if (domain === 'cultural') {
      const c = CULTURAL_DATA.find(e => e.id === eventId);
      if (c) eventTitle = c.title;
    } else if (domain === 'technical') {
      const t = TECHNICAL_DATA.find(e => e.id === eventId);
      if (t) eventTitle = t.title;
    }

    // Persist registered player in localStorage
    try {
      const existing = JSON.parse(localStorage.getItem('ait_aakriti_user_registrations_v2') || '[]');
      existing.unshift({
        id: 'reg-' + Date.now(),
        eventId: eventId,
        domain: domain,
        name: fullName,
        regNo: regNo,
        phone: phone,
        branch: branchCode,
        category: category,
        role: experience || 'Registered Trialist',
        year: 'SE',
        status: '🟢 Newly Registered',
        timestamp: new Date().toISOString()
      });
      localStorage.setItem('ait_aakriti_user_registrations_v2', JSON.stringify(existing));
    } catch (e) {}

    // Hide form, reveal Senior In-Charge Screen
    form.style.display = 'none';

    const revealContainer = document.getElementById('seniorRevealContainer');
    revealContainer.style.display = 'block';

    revealContainer.innerHTML = `
      <div style="text-align: center; margin-bottom: 20px;">
        <div style="display: inline-flex; align-items: center; justify-content: center; width: 60px; height: 60px; border-radius: 50%; background: #ecfdf5; color: #059669; font-size: 1.8rem; box-shadow: 0 4px 14px rgba(5, 150, 105, 0.2); margin-bottom: 12px;">
          <i class="fa-solid fa-circle-check"></i>
        </div>
        <h3 style="font-family: var(--font-heading); font-size: 1.45rem; font-weight: 800; color: var(--navy-950);">
          Registration Confirmed!
        </h3>
        <p style="font-size: 0.85rem; color: var(--navy-600); margin-top: 4px;">
          Registered Candidate: <strong>${fullName}</strong> (Reg: ${regNo}) for <strong>${eventTitle} • ${category}</strong> representing <strong>${branchCode}</strong>.
        </p>
      </div>

      <!-- Senior In-Charge Card for that Branch -->
      <div class="senior-reveal-container">
        <div class="senior-reveal-header">
          <div class="senior-avatar-badge" style="background: linear-gradient(135deg, ${branchInfo.color}, #38bdf8);">
            <i class="fa-solid fa-user-graduate"></i>
          </div>
          <div class="senior-details-text">
            <span class="senior-role-badge" style="background: ${branchInfo.lightBg}; color: ${branchInfo.color};">
              ${branchCode} Branch Senior Coordinator
            </span>
            <h4 style="margin: 4px 0 2px 0;">${senior.studentName}</h4>
            <span style="font-size: 0.8rem; color: var(--navy-600); font-weight: 600;">${senior.yearRole}</span>
          </div>
        </div>

        <div style="background: rgba(255,255,255,0.85); border-radius: var(--radius-md); padding: 14px; border: 1px solid #e2e8f0; margin-bottom: 18px;">
          <strong style="font-size: 0.825rem; color: var(--navy-900); display: block; margin-bottom: 4px;">
            <i class="fa-solid fa-clipboard-list" style="color: var(--blue-royal);"></i> Official Trial Reporting &amp; Briefing Notes:
          </strong>
          <p style="font-size: 0.825rem; color: var(--navy-700); line-height: 1.5; margin: 0;">
            ${senior.reportingGuidelines}
          </p>
        </div>

        <!-- Contact Actions: Direct Call & WhatsApp Group -->
        <div class="senior-contact-deck">
          <a href="${senior.whatsappGroup}" target="_blank" rel="noopener noreferrer" class="contact-action-btn btn-whatsapp-group">
            <i class="fa-brands fa-whatsapp" style="font-size: 1.1rem;"></i> Join ${branchCode} Squad Group
          </a>
          <a href="tel:${senior.phone}" class="contact-action-btn btn-phone-call">
            <i class="fa-solid fa-phone"></i> Call: ${senior.phone}
          </a>
        </div>

        <div style="display: flex; gap: 10px; margin-top: 10px; flex-wrap: wrap;">
          <button type="button" class="btn-roster-action" onclick="window.Aakriti.openParticipantsModal('${eventId}', '${domain}', '${branchCode}')" style="flex: 1; min-width: 200px; padding: 11px 16px;">
            <i class="fa-solid fa-users"></i> View ${branchCode} Squad (See Your Name Added) 👥
          </button>
          <button type="button" class="btn-primary-action" onclick="window.Aakriti.closeActiveModal(); window.Aakriti.showToast('✅ Registration details saved! Best of luck in the trials!');" style="flex: 1; min-width: 200px;">
            <i class="fa-solid fa-circle-check"></i> Done &amp; Save Slip
          </button>
        </div>
      </div>
    `;

    showToast(`🎉 Registration submitted successfully for ${fullName} (${branchCode})!`);
  }

  // C. Live Results & Deep Match Scorecard Modal
  function openScorecardModal(eventId, domain) {
    const modal = document.getElementById('scorecardModal');
    if (!modal) return;

    let item = null;
    if (domain === 'sports') item = SPORTS_DATA.find(s => s.id === eventId);
    else if (domain === 'cultural') item = CULTURAL_DATA.find(c => c.id === eventId);
    else if (domain === 'technical') item = TECHNICAL_DATA.find(t => t.id === eventId);

    if (!item) return;

    document.getElementById('scorecardModalTitle').textContent = `${item.title} — Official Scorecard & Standings`;
    document.getElementById('scorecardModalSub').textContent = `${item.categoryGroup} • Verified Shield Points Tally`;

    const body = document.getElementById('scorecardModalBody');

    if (domain === 'sports') {
      renderSportsDeepScorecard(item, body);
    } else {
      renderCultTechDeepScorecard(item, body);
    }

    openModal(modal);
  }

  function renderSportsDeepScorecard(sport, container) {
    const categories = sport.categories;
    const defaultCat = state.selectedSportCategory[sport.id] || categories[0];

    container.innerHTML = `
      <!-- Category Switcher in Scorecard -->
      <div class="scorecard-category-tabs">
        ${categories.map(cat => `
          <button type="button" class="scorecard-cat-btn ${cat === defaultCat ? 'active' : ''}" 
            onclick="window.Aakriti.switchScorecardCategory('${sport.id}', '${cat}')">
            ${cat === 'Boys' ? '👦' : cat === 'Girls' ? '👧' : '👥'} ${cat} Division
          </button>
        `).join('')}
      </div>

      <div id="sportsScorecardDynamicContent">
        ${getSportsScorecardHtml(sport, defaultCat)}
      </div>
    `;
  }

  function getSportsScorecardHtml(sport, cat) {
    const data = sport.scorecard[cat] || sport.scorecard['Boys'];
    if (!data) return '<p>Scorecard being compiled by referee committee.</p>';

    return `
      <!-- Final Verified Podium (Comp, IT, E&TC, Mech-ARE) -->
      <div class="podium-standings-deck">
        <div class="podium-card gold">
          <div class="podium-medal-icon">🥇</div>
          <div class="podium-branch-code" style="color: ${BRANCHES[data.gold].color};">${data.gold}</div>
          <div class="podium-pts-label">1st Place (Gold)</div>
        </div>
        <div class="podium-card silver">
          <div class="podium-medal-icon">🥈</div>
          <div class="podium-branch-code" style="color: ${BRANCHES[data.silver].color};">${data.silver}</div>
          <div class="podium-pts-label">2nd Place (Silver)</div>
        </div>
        <div class="podium-card bronze">
          <div class="podium-medal-icon">🥉</div>
          <div class="podium-branch-code" style="color: ${BRANCHES[data.bronze].color};">${data.bronze}</div>
          <div class="podium-pts-label">3rd Place (Bronze)</div>
        </div>
        <div class="podium-card">
          <div class="podium-medal-icon" style="font-size: 1.25rem;">4th</div>
          <div class="podium-branch-code" style="color: ${BRANCHES[data.fourth].color};">${data.fourth}</div>
          <div class="podium-pts-label">4th Place</div>
        </div>
      </div>

      <!-- Deep Match Breakdown Card -->
      <div class="deep-match-summary-card">
        <div class="deep-summary-header">
          <span><i class="fa-solid fa-trophy" style="color: var(--gold-600);"></i> Championship Finals Match Breakdown</span>
          <span style="font-size: 0.8rem; background: #e0f2fe; color: var(--blue-royal); padding: 3px 10px; border-radius: 9999px;">Verified</span>
        </div>

        <div class="match-scores-grid">
          <div class="team-score-block">
            <span class="score-team-name" style="color: ${BRANCHES[data.gold].color};">${data.gold}</span>
            <div style="font-size: 0.8rem; color: var(--navy-600);">Winner</div>
          </div>
          <div class="vs-badge">FINAL</div>
          <div class="team-score-block">
            <span class="score-team-name" style="color: ${BRANCHES[data.silver].color};">${data.silver}</span>
            <div style="font-size: 0.8rem; color: var(--navy-600);">Runner-Up</div>
          </div>
        </div>

        <div style="background: #ffffff; border-radius: var(--radius-md); padding: 14px; border: 1px solid #e2e8f0; margin-bottom: 14px;">
          <strong style="font-size: 0.85rem; color: var(--navy-900); display: block; margin-bottom: 4px;">
            Match Result &amp; Scoreline:
          </strong>
          <p style="font-size: 0.95rem; font-weight: 700; color: var(--blue-royal); margin-bottom: 8px;">
            ${data.finalScore}
          </p>
          <p style="font-size: 0.825rem; color: var(--navy-700); margin: 0; line-height: 1.5;">
            <strong>Key Highlights:</strong> ${data.highlights}
          </p>
        </div>

        <!-- Granular Match Statistics Table -->
        <table class="match-stats-table">
          <thead>
            <tr>
              <th>Performance Metric</th>
              <th>${data.gold} (Champion)</th>
              <th>${data.silver} (Finalist)</th>
            </tr>
          </thead>
          <tbody>
            ${data.stats.map(st => `
              <tr>
                <td><strong>${st.metric}</strong></td>
                <td style="font-weight: 700; color: ${BRANCHES[data.gold].color};">${st.val1}</td>
                <td style="font-weight: 600; color: ${BRANCHES[data.silver].color};">${st.val2}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;
  }

  function renderCultTechDeepScorecard(item, container) {
    const data = item.scorecard;
    if (!data) {
      container.innerHTML = '<p>Results currently under jury deliberation.</p>';
      return;
    }

    container.innerHTML = `
      <!-- Podium Standings Row -->
      <div class="podium-standings-deck">
        <div class="podium-card gold">
          <div class="podium-medal-icon">🥇</div>
          <div class="podium-branch-code" style="color: ${BRANCHES[data.gold].color};">${data.gold}</div>
          <div class="podium-pts-label">1st Place (Gold)</div>
        </div>
        <div class="podium-card silver">
          <div class="podium-medal-icon">🥈</div>
          <div class="podium-branch-code" style="color: ${BRANCHES[data.silver].color};">${data.silver}</div>
          <div class="podium-pts-label">2nd Place (Silver)</div>
        </div>
        <div class="podium-card bronze">
          <div class="podium-medal-icon">🥉</div>
          <div class="podium-branch-code" style="color: ${BRANCHES[data.bronze].color};">${data.bronze}</div>
          <div class="podium-pts-label">3rd Place (Bronze)</div>
        </div>
        <div class="podium-card">
          <div class="podium-medal-icon" style="font-size: 1.25rem;">4th</div>
          <div class="podium-branch-code" style="color: ${BRANCHES[data.fourth].color};">${data.fourth}</div>
          <div class="podium-pts-label">4th Place</div>
        </div>
      </div>

      <div class="deep-match-summary-card">
        <div class="deep-summary-header">
          <span><i class="fa-solid fa-list-check" style="color: var(--blue-royal);"></i> Official Rubric Scoring Breakdown</span>
          <span style="font-size: 0.8rem; background: #e0f2fe; color: var(--blue-royal); padding: 3px 10px; border-radius: 9999px;">Jury Verified</span>
        </div>

        <p style="font-size: 0.85rem; color: var(--navy-700); margin-bottom: 16px;">
          <strong>Jury Commentary:</strong> ${data.highlights}
        </p>

        <!-- Final Branch Ranks & Scores Table -->
        <table class="match-stats-table" style="margin-bottom: 20px;">
          <thead>
            <tr>
              <th>Branch / Department</th>
              <th>Final Normalized Score</th>
              <th>Podium Finish</th>
            </tr>
          </thead>
          <tbody>
            ${data.scores.map(sc => `
              <tr>
                <td><strong style="color: ${BRANCHES[sc.branch].color}; font-size: 0.95rem;">${sc.branch}</strong> (${BRANCHES[sc.branch].name})</td>
                <td style="font-family: var(--font-heading); font-size: 1.1rem; font-weight: 800; color: var(--navy-950);">${sc.score}</td>
                <td><span style="font-weight: 700; color: var(--navy-800);">${sc.rank}</span></td>
              </tr>
            `).join('')}
          </tbody>
        </table>

        <!-- Rubric Parameters -->
        <h5 style="font-size: 0.875rem; font-weight: 800; color: var(--navy-900); margin-bottom: 10px;">
          Scoring Rubric Dimensions:
        </h5>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
          ${(item.rubric || []).map(r => `
            <div style="padding: 10px; background: #ffffff; border: 1px solid #e2e8f0; border-radius: var(--radius-sm); display: flex; justify-content: space-between; align-items: center;">
              <span style="font-size: 0.8rem; color: var(--navy-700);">${r.param}</span>
              <span style="font-size: 0.75rem; font-weight: 700; background: #eff6ff; color: var(--blue-royal); padding: 2px 8px; border-radius: 9999px;">${r.max} Pts Max</span>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  // D. Historical Archives Modal (2023–2025)
  function renderArchivesModal() {
    const container = document.getElementById('archivesYearSwitcher');
    if (!container) return;

    const years = ['2025', '2024', '2023'];
    container.innerHTML = years.map(yr => `
      <button type="button" class="archive-year-btn ${yr === state.selectedArchiveYear ? 'active' : ''}" 
        onclick="window.Aakriti.switchArchiveYear('${yr}')">
        🏆 Aakriti ${yr}
      </button>
    `).join('');

    renderArchiveYearContent();
  }

  function renderArchiveYearContent() {
    const container = document.getElementById('archivesContentContainer');
    if (!container) return;

    const yearData = ARCHIVES_DATA[state.selectedArchiveYear] || ARCHIVES_DATA['2025'];
    const winnerBranch = BRANCHES[yearData.shieldWinner];

    container.innerHTML = `
      <!-- Winner Banner -->
      <div class="annual-shield-banner">
        <div>
          <span style="font-size: 0.775rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.08em; color: var(--gold-600); display: block; margin-bottom: 4px;">
            ANNUAL GENERAL CHAMPIONSHIP SHIELD WINNER
          </span>
          <h4 style="font-family: var(--font-heading); font-size: 1.8rem; font-weight: 900; color: ${winnerBranch.color}; margin: 0;">
            ${yearData.shieldWinner} (${winnerBranch.name})
          </h4>
          <p style="font-size: 0.85rem; color: var(--navy-600); margin-top: 4px;">
            ${yearData.overviewText}
          </p>
        </div>
        <div style="text-align: right;">
          <div style="font-family: var(--font-heading); font-size: 1.8rem; font-weight: 900; color: var(--blue-royal);">
            ${yearData.winnerPoints}
          </div>
          <span style="font-size: 0.75rem; font-weight: 700; color: var(--navy-600);">Runner-Up: ${yearData.runnerUp}</span>
        </div>
      </div>

      <!-- Championship Flagship Champions -->
      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-bottom: 24px;">
        <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: var(--radius-md); padding: 14px; text-align: center;">
          <span style="font-size: 0.75rem; color: var(--navy-600); font-weight: 700; text-transform: uppercase;">Sports Shield</span>
          <h5 style="font-family: var(--font-heading); font-size: 1.15rem; font-weight: 800; color: var(--navy-950); margin: 4px 0 0 0;">
            ${yearData.sportsChamp}
          </h5>
        </div>
        <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: var(--radius-md); padding: 14px; text-align: center;">
          <span style="font-size: 0.75rem; color: var(--navy-600); font-weight: 700; text-transform: uppercase;">Cultural Shield</span>
          <h5 style="font-family: var(--font-heading); font-size: 1.15rem; font-weight: 800; color: var(--navy-950); margin: 4px 0 0 0;">
            ${yearData.culturalChamp}
          </h5>
        </div>
        <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: var(--radius-md); padding: 14px; text-align: center;">
          <span style="font-size: 0.75rem; color: var(--navy-600); font-weight: 700; text-transform: uppercase;">Technical Shield</span>
          <h5 style="font-family: var(--font-heading); font-size: 1.15rem; font-weight: 800; color: var(--navy-950); margin: 4px 0 0 0;">
            ${yearData.technicalChamp}
          </h5>
        </div>
      </div>

      <!-- Comprehensive Cross-Branch Points Table (Comp, IT, E&TC, Mech-ARE) -->
      <h4 style="font-family: var(--font-heading); font-size: 1.1rem; font-weight: 800; color: var(--navy-950); margin-bottom: 12px;">
        Official Points Table: Aakriti ${yearData.year}
      </h4>
      <table class="match-stats-table">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Branch</th>
            <th>Sports Pts</th>
            <th>Cultural Pts</th>
            <th>Technical Pts</th>
            <th>Medals (🥇/🥈)</th>
            <th>Total Shield Pts</th>
          </tr>
        </thead>
        <tbody>
          ${yearData.standings.map(st => `
            <tr style="${st.rank === 1 ? 'background: #fffbeb;' : ''}">
              <td style="font-weight: 800;">${st.rank === 1 ? '🥇 1st' : st.rank === 2 ? '🥈 2nd' : st.rank === 3 ? '🥉 3rd' : '4th'}</td>
              <td><strong style="color: ${BRANCHES[st.branch].color};">${st.branch}</strong> <span style="font-size:0.75rem; color:var(--navy-600);">(${st.name})</span></td>
              <td>${st.sports}</td>
              <td>${st.cultural}</td>
              <td>${st.tech}</td>
              <td>${st.gold}G • ${st.silver}S</td>
              <td style="font-family: var(--font-heading); font-weight: 900; font-size: 1.05rem; color: var(--blue-royal);">${st.total}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    `;
  }

  function openArchivesModal() {
    const modal = document.getElementById('archivesModal');
    if (!modal) return;
    renderArchivesModal();
    openModal(modal);
  }


  // --------------------------------------------------------------------------
  // 12.F EVENT PARTICIPANTS & PLAYERS ROSTER OVERLAY
  // --------------------------------------------------------------------------

  const ROSTER_BRANCH_POOLS = {
    'Comp': [
      { name: 'Aditya Rao', year: 'TE', reg: '22104' },
      { name: 'Kabir Mehta', year: 'BE', reg: '21102' },
      { name: 'Aarav Sharma', year: 'TE', reg: '22119' },
      { name: 'Harshwardhan Patil', year: 'BE', reg: '21118' },
      { name: 'Tanvi Joshi', year: 'SE', reg: '23112' },
      { name: 'Aryan Gupta', year: 'TE', reg: '22145' },
      { name: 'Riya Sengupta', year: 'TE', reg: '22150' },
      { name: 'Anushree Roy', year: 'BE', reg: '21160' },
      { name: 'Kshitij Joshi', year: 'BE', reg: '21112' },
      { name: 'Disha Roy', year: 'TE', reg: '22168' },
      { name: 'Shaurya Bhatt', year: 'TE', reg: '22180' },
      { name: 'Ishita Sen', year: 'SE', reg: '23185' }
    ],
    'IT': [
      { name: 'Siddharth Jain', year: 'TE', reg: '22214' },
      { name: 'Sahil Shinde', year: 'BE', reg: '21201' },
      { name: 'Tushar Yadav', year: 'TE', reg: '22210' },
      { name: 'Aman Verma', year: 'BE', reg: '21208' },
      { name: 'Pooja Nair', year: 'TE', reg: '22260' },
      { name: 'Sanjana Dixit', year: 'BE', reg: '21280' },
      { name: 'Kaustubh Iyer', year: 'TE', reg: '22240' },
      { name: 'Neha Patil', year: 'SE', reg: '23215' },
      { name: 'Omkar Kulkarni', year: 'TE', reg: '22222' },
      { name: 'Radhika Kulkarni', year: 'BE', reg: '21290' },
      { name: 'Aditya Kapse', year: 'TE', reg: '22235' },
      { name: 'Sneha Muley', year: 'SE', reg: '23250' }
    ],
    'E&TC': [
      { name: 'Varun Kulkarni', year: 'TE', reg: '22301' },
      { name: 'Vicky Rajput', year: 'TE', reg: '22312' },
      { name: 'Kartik Nair', year: 'BE', reg: '21320' },
      { name: 'Pranav Sharma', year: 'BE', reg: '21312' },
      { name: 'Tanvi Kadam', year: 'TE', reg: '22355' },
      { name: 'Rutuja More', year: 'BE', reg: '21365' },
      { name: 'Aniruddh Trivedi', year: 'TE', reg: '22355' },
      { name: 'Gayatri Ranade', year: 'SE', reg: '23320' },
      { name: 'Abhishek Roy', year: 'SE', reg: '23315' },
      { name: 'Swati Dubey', year: 'TE', reg: '22370' },
      { name: 'Omkar Deshmukh', year: 'BE', reg: '21345' },
      { name: 'Vivek Rajput', year: 'SE', reg: '23330' }
    ],
    'Mech-ARE': [
      { name: 'Rohan Verma', year: 'TE', reg: '22409' },
      { name: 'Digvijay Singh', year: 'BE', reg: '21402' },
      { name: 'Manav Thakur', year: 'TE', reg: '22415' },
      { name: 'Nikhil Chauhan', year: 'BE', reg: '21415' },
      { name: 'Deepika Rathore', year: 'TE', reg: '22462' },
      { name: 'Shivani Kale', year: 'BE', reg: '21470' },
      { name: 'Pradyumn Rathore', year: 'TE', reg: '22430' },
      { name: 'Vikramaditya Rane', year: 'BE', reg: '21405' },
      { name: 'Tejas Koli', year: 'BE', reg: '21430' },
      { name: 'Saurabh Mane', year: 'SE', reg: '23422' },
      { name: 'Mayur Shinde', year: 'TE', reg: '22450' },
      { name: 'Gaurav Mohite', year: 'BE', reg: '21480' }
    ]
  };

  const EXPLICIT_EVENT_ROSTERS = {
    // 1. Lawn Tennis
    'sport-tennis': [
      { id: 'tn-c-1', name: 'Aditya Rao', branch: 'Comp', category: 'Boys', role: 'Captain • Singles Seed #1', year: 'TE', regNo: '22104', status: '⭐ Team Captain' },
      { id: 'tn-c-2', name: 'Harshwardhan Patil', branch: 'Comp', category: 'Boys', role: 'Doubles Specialist', year: 'BE', regNo: '21118', status: 'Confirmed Lineup' },
      { id: 'tn-c-3', name: 'Yashraj Shinde', branch: 'Comp', category: 'Boys', role: 'Baseline Rallier', year: 'SE', regNo: '23115', status: 'Confirmed Lineup' },
      { id: 'tn-c-4', name: 'Riya Sengupta', branch: 'Comp', category: 'Girls', role: 'Captain • Singles Seed #1', year: 'TE', regNo: '22150', status: '⭐ Team Captain' },
      { id: 'tn-c-5', name: 'Ananya Deshmukh', branch: 'Comp', category: 'Girls', role: 'Doubles Specialist', year: 'BE', regNo: '21165', status: 'Confirmed Lineup' },
      { id: 'tn-i-1', name: 'Siddharth Jain', branch: 'IT', category: 'Boys', role: 'Captain • Singles Seed #2', year: 'TE', regNo: '22214', status: '⭐ Team Captain' },
      { id: 'tn-i-2', name: 'Aman Verma', branch: 'IT', category: 'Boys', role: 'Doubles Specialist', year: 'BE', regNo: '21208', status: 'Confirmed Lineup' },
      { id: 'tn-i-3', name: 'Pranay Kulkarni', branch: 'IT', category: 'Boys', role: 'Baseline Specialist', year: 'SE', regNo: '23210', status: 'Confirmed Lineup' },
      { id: 'tn-i-4', name: 'Pooja Nair', branch: 'IT', category: 'Girls', role: 'Captain • Singles Seed #1', year: 'TE', regNo: '22260', status: '⭐ Team Captain' },
      { id: 'tn-i-5', name: 'Meera Joshi', branch: 'IT', category: 'Girls', role: 'Doubles Specialist', year: 'SE', regNo: '23265', status: 'Confirmed Lineup' },
      { id: 'tn-e-1', name: 'Varun Kulkarni', branch: 'E&TC', category: 'Boys', role: 'Captain • Singles Seed #1', year: 'TE', regNo: '22301', status: '⭐ Team Captain' },
      { id: 'tn-e-2', name: 'Pranav Sharma', branch: 'E&TC', category: 'Boys', role: 'Doubles Specialist', year: 'BE', regNo: '21312', status: 'Confirmed Lineup' },
      { id: 'tn-e-3', name: 'Sahil Shinde', branch: 'E&TC', category: 'Boys', role: 'Power Server', year: 'SE', regNo: '23308', status: 'Confirmed Lineup' },
      { id: 'tn-e-4', name: 'Tanvi Kadam', branch: 'E&TC', category: 'Girls', role: 'Captain • Singles Seed #1', year: 'TE', regNo: '22355', status: '⭐ Team Captain' },
      { id: 'tn-e-5', name: 'Shreya Bhosale', branch: 'E&TC', category: 'Girls', role: 'Doubles Specialist', year: 'SE', regNo: '23360', status: 'Confirmed Lineup' },
      { id: 'tn-m-1', name: 'Rohan Verma', branch: 'Mech-ARE', category: 'Boys', role: 'Captain • Power Server', year: 'TE', regNo: '22409', status: '⭐ Team Captain' },
      { id: 'tn-m-2', name: 'Nikhil Chauhan', branch: 'Mech-ARE', category: 'Boys', role: 'Doubles Net Player', year: 'BE', regNo: '21415', status: 'Confirmed Lineup' },
      { id: 'tn-m-3', name: 'Digvijay Singh', branch: 'Mech-ARE', category: 'Boys', role: 'Baseline Rallier', year: 'SE', regNo: '23412', status: 'Confirmed Lineup' },
      { id: 'tn-m-4', name: 'Deepika Rathore', branch: 'Mech-ARE', category: 'Girls', role: 'Captain • Singles Seed #1', year: 'TE', regNo: '22462', status: '⭐ Team Captain' },
      { id: 'tn-m-5', name: 'Priyanka More', branch: 'Mech-ARE', category: 'Girls', role: 'Doubles Partner', year: 'SE', regNo: '23465', status: 'Confirmed Lineup' }
    ],
    // 2. Football
    'sport-football': [
      { id: 'fb-c-1', name: 'Kabir Mehta', branch: 'Comp', category: 'Boys', role: 'Captain • Midfield General', year: 'BE', regNo: '21102', status: '⭐ Team Captain' },
      { id: 'fb-c-2', name: 'Aarav Sharma', branch: 'Comp', category: 'Boys', role: 'Striker / #9', year: 'TE', regNo: '22119', status: 'Confirmed Lineup' },
      { id: 'fb-c-3', name: 'Devansh Gupta', branch: 'Comp', category: 'Boys', role: 'Goalkeeper', year: 'TE', regNo: '22140', status: 'Confirmed Lineup' },
      { id: 'fb-c-4', name: 'Kunal Sawant', branch: 'Comp', category: 'Boys', role: 'Center Back', year: 'BE', regNo: '21155', status: 'Confirmed Lineup' },
      { id: 'fb-c-5', name: 'Rishabh Pant', branch: 'Comp', category: 'Boys', role: 'Left Winger', year: 'SE', regNo: '23105', status: 'Confirmed Lineup' },
      { id: 'fb-c-6', name: 'Tanmay Joshi', branch: 'Comp', category: 'Boys', role: 'Right Fullback', year: 'TE', regNo: '22168', status: 'Confirmed Lineup' },
      { id: 'fb-i-1', name: 'Sahil Shinde', branch: 'IT', category: 'Boys', role: 'Captain • Playmaker', year: 'BE', regNo: '21201', status: '⭐ Team Captain' },
      { id: 'fb-i-2', name: 'Tushar Yadav', branch: 'IT', category: 'Boys', role: 'Striker', year: 'TE', regNo: '22210', status: 'Confirmed Lineup' },
      { id: 'fb-i-3', name: 'Pratik Jadhav', branch: 'IT', category: 'Boys', role: 'Goalkeeper', year: 'BE', regNo: '21245', status: 'Confirmed Lineup' },
      { id: 'fb-i-4', name: 'Omkar Patil', branch: 'IT', category: 'Boys', role: 'Right Winger', year: 'SE', regNo: '23214', status: 'Confirmed Lineup' },
      { id: 'fb-i-5', name: 'Atharva Gaikwad', branch: 'IT', category: 'Boys', role: 'Center Back', year: 'TE', regNo: '22288', status: 'Confirmed Lineup' },
      { id: 'fb-i-6', name: 'Yash Kadam', branch: 'IT', category: 'Boys', role: 'Defensive Mid', year: 'SE', regNo: '23250', status: 'Confirmed Lineup' },
      { id: 'fb-e-1', name: 'Vicky Rajput', branch: 'E&TC', category: 'Boys', role: 'Captain • Sweeper', year: 'TE', regNo: '22312', status: '⭐ Team Captain' },
      { id: 'fb-e-2', name: 'Kartik Nair', branch: 'E&TC', category: 'Boys', role: 'Forward', year: 'BE', regNo: '21320', status: 'Confirmed Lineup' },
      { id: 'fb-e-3', name: 'Abhishek Roy', branch: 'E&TC', category: 'Boys', role: 'Central Mid', year: 'SE', regNo: '23315', status: 'Confirmed Lineup' },
      { id: 'fb-e-4', name: 'Sameer Shaikh', branch: 'E&TC', category: 'Boys', role: 'Goalkeeper', year: 'TE', regNo: '22340', status: 'Confirmed Lineup' },
      { id: 'fb-e-5', name: 'Aniruddh Trivedi', branch: 'E&TC', category: 'Boys', role: 'Wingback', year: 'TE', regNo: '22355', status: 'Confirmed Lineup' },
      { id: 'fb-m-1', name: 'Digvijay Singh', branch: 'Mech-ARE', category: 'Boys', role: 'Captain • Center Forward', year: 'BE', regNo: '21402', status: '⭐ Team Captain' },
      { id: 'fb-m-2', name: 'Manav Thakur', branch: 'Mech-ARE', category: 'Boys', role: 'Center Back', year: 'TE', regNo: '22415', status: 'Confirmed Lineup' },
      { id: 'fb-m-3', name: 'Tejas Koli', branch: 'Mech-ARE', category: 'Boys', role: 'Box-to-box Mid', year: 'BE', regNo: '21430', status: 'Confirmed Lineup' },
      { id: 'fb-m-4', name: 'Saurabh Mane', branch: 'Mech-ARE', category: 'Boys', role: 'Goalkeeper', year: 'SE', regNo: '23422', status: 'Confirmed Lineup' },
      { id: 'fb-m-5', name: 'Mayur Shinde', branch: 'Mech-ARE', category: 'Boys', role: 'Left Wing', year: 'TE', regNo: '22460', status: 'Confirmed Lineup' },
      { id: 'fb-m-6', name: 'Gaurav Mohite', branch: 'Mech-ARE', category: 'Boys', role: 'Right Back', year: 'BE', regNo: '21485', status: 'Confirmed Lineup' }
    ],
    // 3. Basketball
    'sport-basketball': [
      { id: 'bb-c-1', name: 'Tanmay Patil', branch: 'Comp', category: 'Boys', role: 'Captain • Point Guard', year: 'BE', regNo: '21108', status: '⭐ Team Captain' },
      { id: 'bb-c-2', name: 'Harshul Joshi', branch: 'Comp', category: 'Boys', role: 'Shooting Guard', year: 'TE', regNo: '22125', status: 'Confirmed Lineup' },
      { id: 'bb-c-3', name: 'Siddharth Roy', branch: 'Comp', category: 'Boys', role: 'Small Forward', year: 'TE', regNo: '22134', status: 'Confirmed Lineup' },
      { id: 'bb-c-4', name: 'Aniket Rao', branch: 'Comp', category: 'Boys', role: 'Power Forward', year: 'BE', regNo: '21170', status: 'Confirmed Lineup' },
      { id: 'bb-c-5', name: 'Kunal Deshmukh', branch: 'Comp', category: 'Boys', role: 'Center', year: 'SE', regNo: '23142', status: 'Confirmed Lineup' },
      { id: 'bb-i-1', name: 'Aman Verma', branch: 'IT', category: 'Boys', role: 'Captain • Point Guard', year: 'BE', regNo: '21215', status: '⭐ Team Captain' },
      { id: 'bb-i-2', name: 'Pratik Jadhav', branch: 'IT', category: 'Boys', role: 'Shooting Guard', year: 'TE', regNo: '22230', status: 'Confirmed Lineup' },
      { id: 'bb-i-3', name: 'Tushar Yadav', branch: 'IT', category: 'Boys', role: 'Small Forward', year: 'SE', regNo: '23225', status: 'Confirmed Lineup' },
      { id: 'bb-i-4', name: 'Sahil Shinde', branch: 'IT', category: 'Boys', role: 'Power Forward', year: 'BE', regNo: '21260', status: 'Confirmed Lineup' },
      { id: 'bb-i-5', name: 'Omkar Patil', branch: 'IT', category: 'Boys', role: 'Center', year: 'TE', regNo: '22272', status: 'Confirmed Lineup' },
      { id: 'bb-e-1', name: 'Varun Kulkarni', branch: 'E&TC', category: 'Boys', role: 'Captain • Point Guard', year: 'TE', regNo: '22325', status: '⭐ Team Captain' },
      { id: 'bb-e-2', name: 'Abhishek Roy', branch: 'E&TC', category: 'Boys', role: 'Shooting Guard', year: 'BE', regNo: '21330', status: 'Confirmed Lineup' },
      { id: 'bb-e-3', name: 'Kartik Nair', branch: 'E&TC', category: 'Boys', role: 'Small Forward', year: 'SE', regNo: '23340', status: 'Confirmed Lineup' },
      { id: 'bb-e-4', name: 'Vicky Rajput', branch: 'E&TC', category: 'Boys', role: 'Power Forward', year: 'TE', regNo: '22360', status: 'Confirmed Lineup' },
      { id: 'bb-e-5', name: 'Sameer Shaikh', branch: 'E&TC', category: 'Boys', role: 'Center', year: 'BE', regNo: '21375', status: 'Confirmed Lineup' },
      { id: 'bb-m-1', name: 'Rohan Verma', branch: 'Mech-ARE', category: 'Boys', role: 'Captain • Point Guard', year: 'BE', regNo: '21415', status: '⭐ Team Captain' },
      { id: 'bb-m-2', name: 'Digvijay Singh', branch: 'Mech-ARE', category: 'Boys', role: 'Shooting Guard', year: 'TE', regNo: '22428', status: 'Confirmed Lineup' },
      { id: 'bb-m-3', name: 'Manav Thakur', branch: 'Mech-ARE', category: 'Boys', role: 'Small Forward', year: 'SE', regNo: '23435', status: 'Confirmed Lineup' },
      { id: 'bb-m-4', name: 'Tejas Koli', branch: 'Mech-ARE', category: 'Boys', role: 'Power Forward', year: 'BE', regNo: '21455', status: 'Confirmed Lineup' },
      { id: 'bb-m-5', name: 'Saurabh Mane', branch: 'Mech-ARE', category: 'Boys', role: 'Center', year: 'TE', regNo: '22470', status: 'Confirmed Lineup' }
    ],
    // 4. Cricket
    'sport-cricket': [
      { id: 'cr-c-1', name: 'Ayush Sharma', branch: 'Comp', category: 'Boys', role: 'Captain • Top Order Batsman', year: 'BE', regNo: '21105', status: '⭐ Team Captain' },
      { id: 'cr-c-2', name: 'Rishabh Dev', branch: 'Comp', category: 'Boys', role: 'Pace Spearhead', year: 'TE', regNo: '22115', status: 'Confirmed Lineup' },
      { id: 'cr-c-3', name: 'Kartik Shinde', branch: 'Comp', category: 'Boys', role: 'Wicketkeeper Batsman', year: 'TE', regNo: '22130', status: 'Confirmed Lineup' },
      { id: 'cr-c-4', name: 'Harsh Gupta', branch: 'Comp', category: 'Boys', role: 'All-Rounder', year: 'BE', regNo: '21145', status: 'Confirmed Lineup' },
      { id: 'cr-c-5', name: 'Siddharth Roy', branch: 'Comp', category: 'Boys', role: 'Leg Spinner', year: 'SE', regNo: '23118', status: 'Confirmed Lineup' },
      { id: 'cr-i-1', name: 'Rohan Kulkarni', branch: 'IT', category: 'Boys', role: 'Captain • All-Rounder', year: 'BE', regNo: '21205', status: '⭐ Team Captain' },
      { id: 'cr-i-2', name: 'Aditya Kapse', branch: 'IT', category: 'Boys', role: 'Opening Batsman', year: 'TE', regNo: '22215', status: 'Confirmed Lineup' },
      { id: 'cr-i-3', name: 'Pranav Joshi', branch: 'IT', category: 'Boys', role: 'Express Fast Bowler', year: 'BE', regNo: '21235', status: 'Confirmed Lineup' },
      { id: 'cr-i-4', name: 'Tejas Patil', branch: 'IT', category: 'Boys', role: 'Wicketkeeper', year: 'SE', regNo: '23220', status: 'Confirmed Lineup' },
      { id: 'cr-i-5', name: 'Kunal More', branch: 'IT', category: 'Boys', role: 'Off Spinner', year: 'TE', regNo: '22245', status: 'Confirmed Lineup' },
      { id: 'cr-e-1', name: 'Omkar Deshmukh', branch: 'E&TC', category: 'Boys', role: 'Captain • Anchor Batsman', year: 'BE', regNo: '21305', status: '⭐ Team Captain' },
      { id: 'cr-e-2', name: 'Vivek Rajput', branch: 'E&TC', category: 'Boys', role: 'Pace Bowler', year: 'TE', regNo: '22315', status: 'Confirmed Lineup' },
      { id: 'cr-e-3', name: 'Akshay Patil', branch: 'E&TC', category: 'Boys', role: 'Hard Hitting All-Rounder', year: 'SE', regNo: '23325', status: 'Confirmed Lineup' },
      { id: 'cr-e-4', name: 'Shreyas Kadam', branch: 'E&TC', category: 'Boys', role: 'Wicketkeeper', year: 'TE', regNo: '22335', status: 'Confirmed Lineup' },
      { id: 'cr-e-5', name: 'Saurabh Gore', branch: 'E&TC', category: 'Boys', role: 'Left-Arm Orthodox', year: 'BE', regNo: '21350', status: 'Confirmed Lineup' },
      { id: 'cr-m-1', name: 'Vikramaditya Rane', branch: 'Mech-ARE', category: 'Boys', role: 'Captain • Power Hitter', year: 'BE', regNo: '21405', status: '⭐ Team Captain' },
      { id: 'cr-m-2', name: 'Pradyumn Rathore', branch: 'Mech-ARE', category: 'Boys', role: 'Express Fast Bowler', year: 'TE', regNo: '22415', status: 'Confirmed Lineup' },
      { id: 'cr-m-3', name: 'Shivam Thakur', branch: 'Mech-ARE', category: 'Boys', role: 'All-Rounder', year: 'SE', regNo: '23425', status: 'Confirmed Lineup' },
      { id: 'cr-m-4', name: 'Rohit Shinde', branch: 'Mech-ARE', category: 'Boys', role: 'Wicketkeeper', year: 'TE', regNo: '22435', status: 'Confirmed Lineup' },
      { id: 'cr-m-5', name: 'Mayank Chauhan', branch: 'Mech-ARE', category: 'Boys', role: 'Off Spinner', year: 'BE', regNo: '21450', status: 'Confirmed Lineup' }
    ],
    // 5. Folk Dance
    'cult-folk-dance': [
      { id: 'fd-c-1', name: 'Anushree Roy', branch: 'Comp', category: 'Open', role: 'Captain • Choreography Lead', year: 'BE', regNo: '21160', status: '⭐ Team Captain' },
      { id: 'fd-c-2', name: 'Tanmay Joshi', branch: 'Comp', category: 'Open', role: 'Dholak & Folk Percussion', year: 'TE', regNo: '22168', status: 'Confirmed Performer' },
      { id: 'fd-c-3', name: 'Priya Nair', branch: 'Comp', category: 'Open', role: 'Lead Folk Dancer', year: 'TE', regNo: '22172', status: 'Confirmed Performer' },
      { id: 'fd-c-4', name: 'Divya Rao', branch: 'Comp', category: 'Open', role: 'Ensemble Soloist', year: 'SE', regNo: '23180', status: 'Confirmed Performer' },
      { id: 'fd-i-1', name: 'Sanjana Dixit', branch: 'IT', category: 'Open', role: 'Captain • Lead Folk Dancer', year: 'BE', regNo: '21280', status: '⭐ Team Captain' },
      { id: 'fd-i-2', name: 'Harsh Kadam', branch: 'IT', category: 'Open', role: 'Traditional Percussionist', year: 'TE', regNo: '22245', status: 'Confirmed Performer' },
      { id: 'fd-i-3', name: 'Neha Patil', branch: 'IT', category: 'Open', role: 'Classical Folk Lead', year: 'SE', regNo: '23215', status: 'Confirmed Performer' },
      { id: 'fd-i-4', name: 'Rahul Shelar', branch: 'IT', category: 'Open', role: 'Ensemble Dancer', year: 'TE', regNo: '22252', status: 'Confirmed Performer' },
      { id: 'fd-e-1', name: 'Rutuja More', branch: 'E&TC', category: 'Open', role: 'Captain • Dance Secretary', year: 'BE', regNo: '21365', status: '⭐ Team Captain' },
      { id: 'fd-e-2', name: 'Saurabh Gore', branch: 'E&TC', category: 'Open', role: 'Folk Rhythm Specialist', year: 'BE', regNo: '21350', status: 'Confirmed Performer' },
      { id: 'fd-e-3', name: 'Sakshi Pawar', branch: 'E&TC', category: 'Open', role: 'Lead Performer', year: 'SE', regNo: '23335', status: 'Confirmed Performer' },
      { id: 'fd-e-4', name: 'Gayatri Ranade', branch: 'E&TC', category: 'Open', role: 'Traditional Vocalist', year: 'SE', regNo: '23320', status: 'Confirmed Performer' },
      { id: 'fd-m-1', name: 'Shivani Kale', branch: 'Mech-ARE', category: 'Open', role: 'Captain • Lead Dancer', year: 'BE', regNo: '21470', status: '⭐ Team Captain' },
      { id: 'fd-m-2', name: 'Vikramaditya Rane', branch: 'Mech-ARE', category: 'Open', role: 'Bhangra / Lavani Lead', year: 'BE', regNo: '21405', status: 'Confirmed Performer' },
      { id: 'fd-m-3', name: 'Mayur Shinde', branch: 'Mech-ARE', category: 'Open', role: 'Dholak Accompanist', year: 'TE', regNo: '22450', status: 'Confirmed Performer' },
      { id: 'fd-m-4', name: 'Priyanka More', branch: 'Mech-ARE', category: 'Open', role: 'Folk Ensemble Lead', year: 'SE', regNo: '23465', status: 'Confirmed Performer' }
    ],
    // 6. LIMS
    'cult-lims': [
      { id: 'lm-c-1', name: 'Chinmay Phadke', branch: 'Comp', category: 'Open', role: 'Captain • Classical Soloist', year: 'BE', regNo: '21162', status: '⭐ Team Captain' },
      { id: 'lm-c-2', name: 'Shruti Kulkarni', branch: 'Comp', category: 'Open', role: 'Acoustic Soloist', year: 'TE', regNo: '22174', status: 'Confirmed Soloist' },
      { id: 'lm-i-1', name: 'Aditya Kapse', branch: 'IT', category: 'Open', role: 'Captain • Semi-Classical Vocalist', year: 'TE', regNo: '22235', status: '⭐ Team Captain' },
      { id: 'lm-i-2', name: 'Sneha Muley', branch: 'IT', category: 'Open', role: 'Sufi & Light Music', year: 'SE', regNo: '23250', status: 'Confirmed Soloist' },
      { id: 'lm-e-1', name: 'Gayatri Ranade', branch: 'E&TC', category: 'Open', role: 'Captain • Ghazal & Light Solo', year: 'SE', regNo: '23320', status: '⭐ Team Captain' },
      { id: 'lm-e-2', name: 'Omkar Deshmukh', branch: 'E&TC', category: 'Open', role: 'Keyboard Accompanist', year: 'BE', regNo: '21345', status: 'Confirmed Performer' },
      { id: 'lm-m-1', name: 'Parth Waghmare', branch: 'Mech-ARE', category: 'Open', role: 'Captain • Rock & Fusion Vocalist', year: 'TE', regNo: '22455', status: '⭐ Team Captain' },
      { id: 'lm-m-2', name: 'Rohit Shinde', branch: 'Mech-ARE', category: 'Open', role: 'Percussion / Rhythm', year: 'BE', regNo: '21460', status: 'Confirmed Performer' }
    ],
    // 7. Debate
    'cult-parl-debate': [
      { id: 'db-c-1', name: 'Shaurya Bhatt', branch: 'Comp', category: 'Open', role: 'Captain • Prime Minister (1st Speaker)', year: 'TE', regNo: '22180', status: '⭐ Team Captain' },
      { id: 'db-c-2', name: 'Ishita Sen', branch: 'Comp', category: 'Open', role: 'Deputy Prime Minister (2nd Speaker)', year: 'SE', regNo: '23185', status: 'Confirmed Debater' },
      { id: 'db-i-1', name: 'Kaustubh Iyer', branch: 'IT', category: 'Open', role: 'Captain • Leader of Opposition', year: 'TE', regNo: '22240', status: '⭐ Team Captain' },
      { id: 'db-i-2', name: 'Radhika Kulkarni', branch: 'IT', category: 'Open', role: 'Deputy Opposition Leader', year: 'BE', regNo: '21290', status: 'Confirmed Debater' },
      { id: 'db-e-1', name: 'Aniruddh Trivedi', branch: 'E&TC', category: 'Open', role: 'Captain • Government Whip', year: 'TE', regNo: '22355', status: '⭐ Team Captain' },
      { id: 'db-e-2', name: 'Swati Dubey', branch: 'E&TC', category: 'Open', role: 'Member of Government', year: 'TE', regNo: '22370', status: 'Confirmed Debater' },
      { id: 'db-m-1', name: 'Pradyumn Rathore', branch: 'Mech-ARE', category: 'Open', role: 'Captain • Opposition Whip', year: 'TE', regNo: '22430', status: '⭐ Team Captain' },
      { id: 'db-m-2', name: 'Gaurav Mohite', branch: 'Mech-ARE', category: 'Open', role: 'Member of Opposition', year: 'BE', regNo: '21480', status: 'Confirmed Debater' }
    ],
    // 8. HackAIT (Hackathon)
    'tech-hackathon': [
      { id: 'hk-c-1', name: 'Harshwardhan Patil', branch: 'Comp', category: 'Open', role: 'Captain • Full-Stack Architect', year: 'BE', regNo: '21118', status: '⭐ Team Captain' },
      { id: 'hk-c-2', name: 'Tanvi Joshi', branch: 'Comp', category: 'Open', role: 'Frontend & Glassmorphic UI/UX', year: 'SE', regNo: '23112', status: 'Confirmed Squad' },
      { id: 'hk-c-3', name: 'Aryan Gupta', branch: 'Comp', category: 'Open', role: 'AI/ML & LLM Pipeline Lead', year: 'TE', regNo: '22145', status: 'Confirmed Squad' },
      { id: 'hk-c-4', name: 'Kabir Mehta', branch: 'Comp', category: 'Open', role: 'Backend & Cloud Deployments', year: 'BE', regNo: '21102', status: 'Confirmed Squad' },
      { id: 'hk-i-1', name: 'Siddharth Jain', branch: 'IT', category: 'Open', role: 'Captain • Cloud & DevOps Lead', year: 'TE', regNo: '22214', status: '⭐ Team Captain' },
      { id: 'hk-i-2', name: 'Pooja Nair', branch: 'IT', category: 'Open', role: 'Database & Security Architect', year: 'TE', regNo: '22260', status: 'Confirmed Squad' },
      { id: 'hk-i-3', name: 'Aman Verma', branch: 'IT', category: 'Open', role: 'React Native & Mobile Lead', year: 'BE', regNo: '21208', status: 'Confirmed Squad' },
      { id: 'hk-i-4', name: 'Tushar Yadav', branch: 'IT', category: 'Open', role: 'REST / GraphQL API Specialist', year: 'TE', regNo: '22210', status: 'Confirmed Squad' },
      { id: 'hk-e-1', name: 'Varun Kulkarni', branch: 'E&TC', category: 'Open', role: 'Captain • Embedded IoT & Firmware', year: 'TE', regNo: '22301', status: '⭐ Team Captain' },
      { id: 'hk-e-2', name: 'Tanvi Kadam', branch: 'E&TC', category: 'Open', role: 'Edge Computing & Microcontrollers', year: 'TE', regNo: '22355', status: 'Confirmed Squad' },
      { id: 'hk-e-3', name: 'Pranav Sharma', branch: 'E&TC', category: 'Open', role: 'Computer Vision on Edge', year: 'BE', regNo: '21312', status: 'Confirmed Squad' },
      { id: 'hk-e-4', name: 'Kartik Nair', branch: 'E&TC', category: 'Open', role: 'Sensor Integration & MQTT', year: 'BE', regNo: '21320', status: 'Confirmed Squad' },
      { id: 'hk-m-1', name: 'Rohan Verma', branch: 'Mech-ARE', category: 'Open', role: 'Captain • ROS2 & Robotics Lead', year: 'TE', regNo: '22409', status: '⭐ Team Captain' },
      { id: 'hk-m-2', name: 'Nikhil Chauhan', branch: 'Mech-ARE', category: 'Open', role: 'Autonomous Navigation & Kinematics', year: 'BE', regNo: '21415', status: 'Confirmed Squad' },
      { id: 'hk-m-3', name: 'Deepika Rathore', branch: 'Mech-ARE', category: 'Open', role: 'CAD Prototyping & 3D Print Lead', year: 'TE', regNo: '22462', status: 'Confirmed Squad' },
      { id: 'hk-m-4', name: 'Digvijay Singh', branch: 'Mech-ARE', category: 'Open', role: 'Actuators & Motor Drives', year: 'BE', regNo: '21402', status: 'Confirmed Squad' }
    ]
  };

  function generateDefaultEventParticipants(eventId, domain) {
    const list = [];
    const rolesByDomain = {
      sports: ['Captain & Key Starter', 'First Team Starter', 'Key Defender / Specialist', 'Squad Reserve'],
      cultural: ['Captain & Lead Performer', 'Soloist & Performer', 'Key Ensemble Member', 'Supporting Artist'],
      technical: ['Team Captain & Architect', 'Lead Developer / Engineer', 'Specialist & Researcher', 'Core Member']
    };
    const defaultRoles = rolesByDomain[domain] || rolesByDomain.cultural;

    ['Comp', 'IT', 'E&TC', 'Mech-ARE'].forEach(branch => {
      const pool = ROSTER_BRANCH_POOLS[branch] || [];
      pool.slice(0, 4).forEach((stud, idx) => {
        list.push({
          id: `part-${eventId}-${branch}-${idx + 1}`,
          name: stud.name,
          branch: branch,
          category: 'Open',
          role: idx === 0 ? `⭐ ${defaultRoles[0]}` : defaultRoles[idx] || 'Squad Competitor',
          year: stud.year,
          regNo: stud.reg,
          status: idx === 0 ? '⭐ Team Captain' : 'Confirmed Squad'
        });
      });
    });
    return list;
  }

  function getEventParticipants(eventId, domain, categoryFilter) {
    let list = [];
    if (EXPLICIT_EVENT_ROSTERS[eventId]) {
      list = [...EXPLICIT_EVENT_ROSTERS[eventId]];
    } else {
      list = generateDefaultEventParticipants(eventId, domain);
    }

    // Merge locally registered candidates from localStorage
    try {
      const raw = localStorage.getItem('ait_aakriti_user_registrations_v2');
      if (raw) {
        const stored = JSON.parse(raw);
        if (Array.isArray(stored)) {
          const matched = stored.filter(r => r.eventId === eventId);
          matched.forEach(r => {
            list.unshift({
              id: r.id || `reg-${Date.now()}`,
              name: r.name,
              branch: r.branch,
              category: r.category || 'Open',
              role: r.role || 'Registered Candidate',
              year: r.year || 'SE',
              regNo: r.regNo || '22145',
              status: '🟢 Newly Registered',
              isNew: true
            });
          });
        }
      }
    } catch (e) {}

    // Filter by category if specified and applicable
    if (categoryFilter && categoryFilter !== 'All') {
      const filtered = list.filter(p => !p.category || p.category === categoryFilter || p.category === 'Open');
      if (filtered.length > 0) return filtered;
    }

    return list;
  }

  function openParticipantsModal(eventId, domain, branchFilter, category) {
    const modal = document.getElementById('participantsModal');
    if (!modal) return;

    state.activeRosterEventId = eventId;
    state.activeRosterDomain = domain;
    state.activeRosterBranch = branchFilter || 'All';
    state.activeRosterCategory = category || null;
    state.rosterSearchQuery = '';

    renderParticipantsModalBody();
    openModal(modal);
  }

  function filterParticipantsBranch(branch) {
    state.activeRosterBranch = branch;
    renderParticipantsModalBody();
  }

  function filterParticipantsCategory(category) {
    state.activeRosterCategory = category;
    renderParticipantsModalBody();
  }

  function searchParticipants(query) {
    state.rosterSearchQuery = query;
    renderParticipantsModalBody();
  }

  function renderParticipantsModalBody() {
    const container = document.getElementById('participantsModalBody');
    if (!container) return;

    const eventId = state.activeRosterEventId;
    const domain = state.activeRosterDomain;

    let item = null;
    if (domain === 'sports') item = SPORTS_DATA.find(s => s.id === eventId);
    else if (domain === 'cultural') item = CULTURAL_DATA.find(c => c.id === eventId);
    else if (domain === 'technical') item = TECHNICAL_DATA.find(t => t.id === eventId);

    if (!item) {
      container.innerHTML = '<p style="padding: 20px; text-align: center;">Event details not found.</p>';
      return;
    }

    // Modal title updates
    const titleEl = document.getElementById('participantsModalTitle');
    const subEl = document.getElementById('participantsModalSub');
    if (titleEl) titleEl.textContent = `${item.title} — Participants & Squads`;
    if (subEl) subEl.textContent = `Official Departmental Lineups • ${item.categoryGroup} • ${item.shieldPoints}`;

    const activeCat = state.activeRosterCategory || (item.categories ? item.categories[0] : 'Open');
    const allParticipants = getEventParticipants(eventId, domain, activeCat);

    const activeBranch = state.activeRosterBranch || 'All';
    const searchQuery = (state.rosterSearchQuery || '').toLowerCase().trim();

    // Branch counts
    const compCount = allParticipants.filter(p => p.branch === 'Comp').length;
    const itCount = allParticipants.filter(p => p.branch === 'IT').length;
    const etcCount = allParticipants.filter(p => p.branch === 'E&TC').length;
    const mechCount = allParticipants.filter(p => p.branch === 'Mech-ARE').length;

    // Filter displayed list
    let displayed = allParticipants;
    if (activeBranch !== 'All') {
      displayed = displayed.filter(p => p.branch === activeBranch);
    }
    if (searchQuery) {
      displayed = displayed.filter(p =>
        p.name.toLowerCase().includes(searchQuery) ||
        p.role.toLowerCase().includes(searchQuery) ||
        (p.regNo && p.regNo.toLowerCase().includes(searchQuery)) ||
        p.branch.toLowerCase().includes(searchQuery)
      );
    }

    // Category Selector if applicable
    let categorySelectorHtml = '';
    if (item.categories && item.categories.length > 1) {
      categorySelectorHtml = `
        <div style="display: flex; gap: 8px; align-items: center; background: rgba(255,255,255,0.9); padding: 4px 10px; border-radius: var(--radius-md); border: 1px solid #cbd5e1;">
          <span style="font-size: 0.775rem; font-weight: 700; color: var(--navy-700);">Division:</span>
          ${item.categories.map(cat => `
            <button type="button" class="sport-cat-btn ${cat === activeCat ? 'active' : ''}" onclick="window.Aakriti.filterParticipantsCategory('${cat}')" style="font-size: 0.75rem; padding: 4px 10px;">
              ${cat === 'Boys' ? '👦' : cat === 'Girls' ? '👧' : '👥'} ${cat}
            </button>
          `).join('')}
        </div>
      `;
    }

    // Build branch squads sections
    const branchesToRender = activeBranch === 'All' ? ['Comp', 'IT', 'E&TC', 'Mech-ARE'] : [activeBranch];

    const squadsHtml = branchesToRender.map(branchKey => {
      const branchInfo = BRANCHES[branchKey];
      const branchPlayers = displayed.filter(p => p.branch === branchKey);
      if (branchPlayers.length === 0 && activeBranch === 'All' && searchQuery) return '';

      return `
        <section class="roster-branch-section" style="border-left: 4px solid ${branchInfo.color};">
          <div class="roster-branch-header">
            <div class="roster-branch-title-group">
              <span class="branch-dot-pill" style="background: ${branchInfo.color};"></span>
              <span class="roster-branch-name">${branchKey} (${branchInfo.name})</span>
              <span class="roster-branch-motto">— "${branchInfo.motto}"</span>
            </div>
            <span class="roster-count-chip" style="background: ${branchInfo.lightBg}; color: ${branchInfo.color}; border-color: ${branchInfo.color}40;">
              ${branchPlayers.length} Participants / Players
            </span>
          </div>

          ${branchPlayers.length === 0 ? `
            <p style="font-size: 0.85rem; color: var(--navy-500); padding: 12px 0; margin: 0; font-style: italic;">
              No participants matching query for ${branchKey}.
            </p>
          ` : `
            <div class="roster-player-grid">
              ${branchPlayers.map(player => {
                const initials = player.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
                const isCaptain = player.status && player.status.includes('Captain');
                const isNew = player.isNew;
                return `
                  <div class="roster-player-card ${isCaptain ? 'is-captain' : ''} ${isNew ? 'is-new-reg' : ''}">
                    <div class="player-avatar-disc" style="border-color: ${branchInfo.color}; color: ${branchInfo.color};">
                      ${initials}
                    </div>
                    <div class="player-details-col">
                      <div class="player-name-heading" title="${player.name}">${player.name}</div>
                      <div class="player-role-badge" title="${player.role}">${player.role}</div>
                      <div class="player-meta-info">
                        <span>Reg: ${player.regNo || '22145'}</span>
                        <span>•</span>
                        <span>${player.year || 'TE'}</span>
                        <span>•</span>
                        <strong style="color: ${branchInfo.color};">${branchKey}</strong>
                      </div>
                      ${isCaptain ? `
                        <span class="player-status-chip status-chip-captain">
                          <i class="fa-solid fa-crown" style="font-size: 0.65rem;"></i> Captain
                        </span>
                      ` : isNew ? `
                        <span class="player-status-chip status-chip-new">
                          <i class="fa-solid fa-circle-check"></i> Newly Registered
                        </span>
                      ` : `
                        <span class="player-status-chip status-chip-confirmed">
                          <i class="fa-solid fa-shield"></i> Confirmed
                        </span>
                      `}
                    </div>
                  </div>
                `;
              }).join('')}
            </div>
          `}
        </section>
      `;
    }).join('');

    container.innerHTML = `
      <!-- Roster Summary Statistics Banner -->
      <div class="roster-summary-banner">
        <div>
          <div style="font-size: 0.95rem; font-weight: 800; color: var(--navy-950); margin-bottom: 4px; display: flex; align-items: center; gap: 8px;">
            <i class="fa-solid fa-users" style="color: var(--blue-royal);"></i> Event Participants &amp; Player Squads
          </div>
          <div style="font-size: 0.8rem; color: var(--navy-600);">
            Showing active departmental rosters for <strong>${item.title}</strong> (${activeCat})
          </div>
        </div>
        <div class="roster-summary-counts">
          <span class="roster-count-chip roster-count-total">Total: ${allParticipants.length}</span>
          <span class="roster-count-chip roster-count-comp">Comp: ${compCount}</span>
          <span class="roster-count-chip roster-count-it">IT: ${itCount}</span>
          <span class="roster-count-chip roster-count-etc">E&amp;TC: ${etcCount}</span>
          <span class="roster-count-chip roster-count-mech">Mech-ARE: ${mechCount}</span>
        </div>
      </div>

      <!-- Controls & Filter Toolbar -->
      <div class="roster-toolbar">
        <div class="roster-filter-row">
          <div class="roster-branch-tabs" role="tablist" aria-label="Branch Filters">
            <button type="button" class="roster-tab-btn ${activeBranch === 'All' ? 'active' : ''}" onclick="window.Aakriti.filterParticipantsBranch('All')">
              <i class="fa-solid fa-users"></i> All Branches (${allParticipants.length})
            </button>
            <button type="button" class="roster-tab-btn ${activeBranch === 'Comp' ? 'active' : ''}" data-branch="Comp" onclick="window.Aakriti.filterParticipantsBranch('Comp')">
              Comp (${compCount})
            </button>
            <button type="button" class="roster-tab-btn ${activeBranch === 'IT' ? 'active' : ''}" data-branch="IT" onclick="window.Aakriti.filterParticipantsBranch('IT')">
              IT (${itCount})
            </button>
            <button type="button" class="roster-tab-btn ${activeBranch === 'E&TC' ? 'active' : ''}" data-branch="E&TC" onclick="window.Aakriti.filterParticipantsBranch('E&TC')">
              E&amp;TC (${etcCount})
            </button>
            <button type="button" class="roster-tab-btn ${activeBranch === 'Mech-ARE' ? 'active' : ''}" data-branch="Mech-ARE" onclick="window.Aakriti.filterParticipantsBranch('Mech-ARE')">
              Mech-ARE (${mechCount})
            </button>
          </div>

          ${categorySelectorHtml}
        </div>

        <div style="display: flex; gap: 12px; align-items: center; flex-wrap: wrap;">
          <div class="roster-search-wrapper">
            <i class="fa-solid fa-magnifying-glass"></i>
            <input type="text" class="roster-search-input" placeholder="Search participant by name, role, registration ID..." value="${state.rosterSearchQuery || ''}" oninput="window.Aakriti.searchParticipants(this.value)" />
          </div>

          <button type="button" class="btn-primary-action" onclick="window.Aakriti.openRegistrationModal('${eventId}', '${domain}')" style="width: auto; padding: 8px 16px; font-size: 0.825rem;">
            <i class="fa-solid fa-bolt"></i> Join Roster / Register ⚡
          </button>
        </div>
      </div>

      <!-- Squad Lineups Output -->
      <div class="roster-squads-container">
        ${displayed.length === 0 ? `
          <div style="text-align: center; padding: 40px 20px; background: #ffffff; border-radius: var(--radius-lg); border: 1px dashed #cbd5e1;">
            <i class="fa-solid fa-user-slash" style="font-size: 2.5rem; color: #94a3b8; margin-bottom: 12px;"></i>
            <h4 style="font-size: 1.1rem; font-weight: 800; color: var(--navy-900); margin-bottom: 6px;">No participants found</h4>
            <p style="font-size: 0.85rem; color: var(--navy-600); margin: 0 0 16px 0;">No registered players or participants matched your search criteria.</p>
            <button type="button" class="btn-secondary-action" onclick="window.Aakriti.searchParticipants('')">
              <i class="fa-solid fa-rotate-left"></i> Reset Search
            </button>
          </div>
        ` : squadsHtml}
      </div>
    `;
  }

  // --------------------------------------------------------------------------
  // 13. MODAL UTILITIES
  // --------------------------------------------------------------------------
  function openModal(modalEl) {
    if (!modalEl) return;
    closeActiveModal();
    modalEl.classList.add('active');
    document.body.style.overflow = 'hidden';
    state.activeModal = modalEl;
  }

  function closeActiveModal() {
    if (state.activeModal) {
      state.activeModal.classList.remove('active');
      document.body.style.overflow = '';
      state.activeModal = null;
    }
  }

  // --------------------------------------------------------------------------
  function handleBackButton() {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      window.location.href = '/homepage/homepage.html';
    }
  }

  // 14. EVENT HANDLERS & LISTENERS BINDING
  // --------------------------------------------------------------------------
  function bindNavigationEvents() {
    // Back Button
    const backBtn = document.getElementById('btnNavBack');
    if (backBtn) {
      backBtn.addEventListener('click', handleBackButton);
    }

    // Championship Switcher Tabs
    const tabBtns = document.querySelectorAll('.champ-tab-btn');
    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const view = btn.getAttribute('data-view');
        navigateTo(view);
      });
    });

    // Archives Button in Nav
    const archivesBtn = document.getElementById('btnArchivesNav');
    if (archivesBtn) {
      archivesBtn.addEventListener('click', openArchivesModal);
    }

    // Keyboard 'Escape' closes modal
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && state.activeModal) {
        closeActiveModal();
      }
    });

    // Modal background click closes modal
    const backdrops = document.querySelectorAll('.aakriti-modal-backdrop');
    backdrops.forEach(backdrop => {
      backdrop.addEventListener('click', (e) => {
        if (e.target === backdrop) {
          closeActiveModal();
        }
      });
    });

    // Modal Close Buttons
    const closeBtns = document.querySelectorAll('.modal-close-btn');
    closeBtns.forEach(btn => {
      btn.addEventListener('click', closeActiveModal);
    });

    // Registration Form Submit
    const regForm = document.getElementById('championshipRegForm');
    if (regForm) {
      regForm.addEventListener('submit', handleRegistrationSubmit);
    }
  }

  function bindFilterEvents() {
    // Sports Filter Pills
    document.querySelectorAll('[data-filter-domain="sports"]').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('[data-filter-domain="sports"]').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        state.activeFilters.sports = btn.getAttribute('data-filter');
        renderSportsCards();
      });
    });

    // Cultural Filter Pills
    document.querySelectorAll('[data-filter-domain="cultural"]').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('[data-filter-domain="cultural"]').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        state.activeFilters.cultural = btn.getAttribute('data-filter');
        renderCulturalCards();
      });
    });

    // Technical Filter Pills
    document.querySelectorAll('[data-filter-domain="technical"]').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('[data-filter-domain="technical"]').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        state.activeFilters.technical = btn.getAttribute('data-filter');
        renderTechnicalCards();
      });
    });
  }

  function bindSearchEvents() {
    const sportsSearch = document.getElementById('sportsSearchInput');
    if (sportsSearch) {
      sportsSearch.addEventListener('input', (e) => {
        state.searchQueries.sports = e.target.value;
        renderSportsCards();
      });
    }

    const cultSearch = document.getElementById('culturalSearchInput');
    if (cultSearch) {
      cultSearch.addEventListener('input', (e) => {
        state.searchQueries.cultural = e.target.value;
        renderCulturalCards();
      });
    }

    const techSearch = document.getElementById('technicalSearchInput');
    if (techSearch) {
      techSearch.addEventListener('input', (e) => {
        state.searchQueries.technical = e.target.value;
        renderTechnicalCards();
      });
    }
  }

  function bindModalTriggers() {
    // Additional triggers can be bound here
  }

  // --------------------------------------------------------------------------
  // 15. TOAST NOTIFICATIONS
  // --------------------------------------------------------------------------
  function showToast(message) {
    let deck = document.getElementById('aakritiToastDeck');
    if (!deck) {
      deck = document.createElement('div');
      deck.id = 'aakritiToastDeck';
      deck.className = 'aakriti-toast-deck';
      document.body.appendChild(deck);
    }

    const toast = document.createElement('div');
    toast.className = 'aakriti-toast';
    toast.innerHTML = `
      <i class="fa-solid fa-bell" style="color: var(--blue-royal);"></i>
      <span>${message}</span>
    `;

    deck.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(60px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 4000);
  }

  // --------------------------------------------------------------------------
  // 16. EXPOSE GLOBAL AAKRITI API FOR INLINE CALLS
  // --------------------------------------------------------------------------
  window.Aakriti = {
    navigateTo,
    handleBackButton,
    changeSportCategory: function (sportId, category, event) {
      if (event) event.stopPropagation();
      state.selectedSportCategory[sportId] = category;
      renderSportsCards();
      showToast(`⚡ Selected ${category} division for ${SPORTS_DATA.find(s=>s.id===sportId)?.title}`);
    },
    switchScorecardCategory: function (sportId, category) {
      const sport = SPORTS_DATA.find(s => s.id === sportId);
      if (!sport) return;

      const dynamicContainer = document.getElementById('sportsScorecardDynamicContent');
      if (dynamicContainer) {
        dynamicContainer.innerHTML = getSportsScorecardHtml(sport, category);
      }

      // Update button active state
      const buttons = document.querySelectorAll('.scorecard-cat-btn');
      buttons.forEach(btn => {
        btn.classList.toggle('active', btn.textContent.includes(category));
      });
    },
    switchArchiveYear: function (year) {
      state.selectedArchiveYear = year;
      renderArchivesModal();
    },
    openRegistrationModal,
    selectRegCategory,
    openScorecardModal,
    openEventDetailsModal,
    openArchivesModal,
    openParticipantsModal,
    filterParticipantsBranch,
    filterParticipantsCategory,
    searchParticipants,
    closeActiveModal,
    showToast
  };

  // Launch on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();

const fs = require('fs');
const path = require('path');

const filepath = path.join(__dirname, 'src', 'components', 'ClubDetails.tsx');
let content = fs.readFileSync(filepath, 'utf8');

// Add imports for modal icons if not present
if (!content.includes('CheckCircle2')) {
  content = content.replace(
    /import { ([^}]+) } from 'lucide-react';/,
    "import { $1, X, Info, CheckCircle2, AlertCircle } from 'lucide-react';"
  );
}

// Add state for selected activity
content = content.replace(
  /const \[activeTab, setActiveTab\] = useState\('Overview'\);/,
  `const [activeTab, setActiveTab] = useState('Overview');
  const [selectedActivity, setSelectedActivity] = useState<any>(null);
  const [showActivityModal, setShowActivityModal] = useState(false);`
);

// Update keyActivities mapping to be clickable
const keyActivitiesRegex = /\{club\.keyActivities\.map\(\(act, i\) => \([\s\S]*?<div key=\{i\} className="([^"]+)"\>([\s\S]*?)\<\/div\>\n\s*\)\}/;

content = content.replace(keyActivitiesRegex, `{club.keyActivities.map((act, i) => (
                        <div key={i} onClick={() => { setSelectedActivity(act); setShowActivityModal(true); }} className="$1 cursor-pointer hover:border-purple-200">
$2
                        </div>
                      ))}`);

// Add modal JSX at the end before final div/return
const modalJSX = `
      {/* Activity Details Modal */}
      {showActivityModal && selectedActivity && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-12 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl relative flex flex-col animate-in fade-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-slate-100 px-6 py-4 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-purple-100 text-purple-700">
                  Key Activity
                </div>
              </div>
              <button 
                onClick={() => setShowActivityModal(false)}
                className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 md:p-10 space-y-8">
              <div>
                <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6">{selectedActivity.title}</h2>
                <div className="w-full h-64 md:h-96 rounded-2xl overflow-hidden bg-slate-100 mb-8">
                  <img src={selectedActivity.imageUrl} alt={selectedActivity.title} className="w-full h-full object-cover" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Left Column */}
                <div className="space-y-8">
                  {selectedActivity.description && (
                    <section>
                      <h3 className="text-lg font-bold text-slate-800 mb-3 flex items-center gap-2">
                        <Info className="text-blue-500" size={20} /> Description
                      </h3>
                      <p className="text-slate-600 leading-relaxed">{selectedActivity.description}</p>
                    </section>
                  )}

                  {selectedActivity.eligibility && (
                    <section>
                      <h3 className="text-lg font-bold text-slate-800 mb-3 flex items-center gap-2">
                        <CheckCircle2 className="text-emerald-500" size={20} /> Eligibility
                      </h3>
                      <p className="text-slate-600 leading-relaxed bg-emerald-50 text-emerald-800 p-4 rounded-xl border border-emerald-100">
                        {selectedActivity.eligibility}
                      </p>
                    </section>
                  )}
                </div>

                {/* Right Column */}
                <div className="space-y-8">
                  {selectedActivity.rules && selectedActivity.rules.length > 0 && (
                    <section>
                      <h3 className="text-lg font-bold text-slate-800 mb-3 flex items-center gap-2">
                        <AlertCircle className="text-amber-500" size={20} /> Rules & Instructions
                      </h3>
                      <ul className="space-y-2">
                        {selectedActivity.rules.map((rule: string, idx: number) => (
                          <li key={idx} className="flex items-start gap-3 text-slate-600 bg-amber-50/50 p-3 rounded-lg border border-amber-100/50">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2 flex-shrink-0"></span>
                            <span>{rule}</span>
                          </li>
                        ))}
                      </ul>
                    </section>
                  )}

                  {selectedActivity.registrationSteps && selectedActivity.registrationSteps.length > 0 && (
                    <section>
                      <h3 className="text-lg font-bold text-slate-800 mb-3">Registration Steps</h3>
                      <div className="space-y-3">
                        {selectedActivity.registrationSteps.map((step: string, idx: number) => (
                          <div key={idx} className="flex items-start gap-3">
                            <div className="w-6 h-6 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center text-xs font-bold flex-shrink-0">
                              {idx + 1}
                            </div>
                            <p className="text-slate-600 pt-0.5">{step}</p>
                          </div>
                        ))}
                      </div>
                    </section>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-8 mt-8 border-t border-slate-100 flex flex-col sm:flex-row gap-4 justify-end">
                <button 
                  onClick={() => setShowActivityModal(false)}
                  className="px-6 py-3 rounded-xl font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors"
                >
                  Close
                </button>
                {selectedActivity.registrationLink && (
                  <a 
                    href={selectedActivity.registrationLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-8 py-3 rounded-xl font-bold text-white bg-purple-600 hover:bg-purple-700 transition-colors shadow-lg shadow-purple-200 flex items-center justify-center gap-2 group"
                  >
                    Register Now <ExternalLink size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
`;

content = content.replace(/(\n    \<\/div\>\n  \);\n\}\n)$/, `${modalJSX}$1`);

fs.writeFileSync(filepath, content, 'utf8');
console.log('Finished updating ClubDetails.tsx');

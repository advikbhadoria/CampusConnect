import React from 'react';
import { Building2, ShieldCheck, Heart, ArrowUpRight } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 text-xs py-10 mt-16 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          
          {/* Col 1: About */}
          <div>
            <div className="flex items-center gap-2 text-white font-extrabold text-base mb-3">
              <div className="w-6 h-6 rounded-lg bg-blue-600 flex items-center justify-center text-white">
                <Building2 className="w-3.5 h-3.5" />
              </div>
              CampuSync
            </div>
            <p className="text-slate-400 text-xs leading-relaxed mb-3">
              The official hyper-local peer-to-peer rental, marketplace and skill barter platform for Army Institute of Technology, Pune.
            </p>
            <div className="flex items-center gap-1.5 text-[11px] text-blue-400 font-semibold">
              <ShieldCheck className="w-4 h-4 text-blue-400" />
              Verified @aitpune.edu.in Community
            </div>
          </div>

          {/* Col 2: Campus Categories */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-3">Categories</h4>
            <ul className="space-y-2">
              <li><span className="hover:text-white transition-colors cursor-pointer">Electronics & Microcontrollers</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">Lab Drafters & Mechanical Tools</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">SPPU Reference Books & Notes</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">Cycles & Campus Mobility</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">Hostel Appliances & Kettles</span></li>
            </ul>
          </div>

          {/* Col 3: Hostels & Hubs */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-3">Campus Hostel Blocks</h4>
            <ul className="space-y-2">
              <li><span className="hover:text-white transition-colors cursor-pointer">OBH (Old Boys Hostel 1, 2, 3)</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">NBH (New Boys Hostel 1, 2)</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">GH (Girls Hostel 1, 2)</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">Day Scholars Network</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">Nescafe & Cafeteria Handover Zone</span></li>
            </ul>
          </div>

          {/* Col 4: Safety & Rules */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-3">Student Safety</h4>
            <ul className="space-y-2">
              <li className="flex items-center gap-1">
                <span>Always meet in public campus zones</span>
              </li>
              <li>Inspect rented items before taking possession</li>
              <li>Report any non-AIT unverified accounts</li>
              <li>Return items in original condition</li>
            </ul>
          </div>

        </div>

        <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500">
          <p>© {new Date().getFullYear()} CampuSync. Built strictly for Army Institute of Technology, Pune students.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-slate-400">
              Made with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> for AIT DTI
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
};

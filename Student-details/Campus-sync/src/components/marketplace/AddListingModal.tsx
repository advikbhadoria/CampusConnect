import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  Upload, 
  Tag, 
  RefreshCw, 
  HelpCircle, 
  CheckCircle2, 
  Building, 
  Info,
  Layers,
  IndianRupee,
  Image as ImageIcon
} from 'lucide-react';
import { useMarketplace } from '../../context/MarketplaceContext';
import { useAuth } from '../../context/AuthContext';
import { TransactionType, ListingCategory, ItemCondition, HostelBlock } from '../../types';
import { PRESET_IMAGES } from '../../data/seedData';

export const AddListingModal: React.FC = () => {
  const { isAddModalOpen, closeAddModal, addNewListing } = useMarketplace();
  const { currentUser } = useAuth();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<ListingCategory>('Electronics & IoT');
  const [transactionType, setTransactionType] = useState<TransactionType>('Rent');
  const [price, setPrice] = useState<string>('50');
  const [rentalPeriod, setRentalPeriod] = useState<'per day' | 'per week' | 'per month' | 'per semester' | 'flat sale'>('per week');
  const [barterSkill, setBarterSkill] = useState('');
  const [condition, setCondition] = useState<ItemCondition>('Like New');
  const [hostelBlock, setHostelBlock] = useState<HostelBlock>(currentUser?.hostelBlock || 'OBH-1');
  const [imageUrl, setImageUrl] = useState(PRESET_IMAGES[0].url);
  const [customImage, setCustomImage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isAddModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!title.trim()) {
      setError('Please provide a title for the item.');
      return;
    }

    if (transactionType === 'Skill-Barter' && !barterSkill.trim()) {
      setError('Please specify the skill or help you would like in return.');
      return;
    }

    const finalImage = customImage.trim() || imageUrl;

    setIsSubmitting(true);
    try {
      await addNewListing({
        title: title.trim(),
        description: description.trim(),
        category,
        transactionType,
        price: transactionType === 'Skill-Barter' ? 0 : Number(price) || 0,
        rentalPeriod: transactionType === 'Rent' ? rentalPeriod : 'flat sale',
        barterSkill: transactionType === 'Skill-Barter' ? barterSkill.trim() : undefined,
        condition,
        imageUrl: finalImage,
        status: 'Available',
        hostelBlock,
        tags: [category, transactionType, hostelBlock],
      });

      // Reset form
      setTitle('');
      setDescription('');
      setBarterSkill('');
      setPrice('50');
      closeAddModal();
    } catch (err: any) {
      setError(err.message || 'Failed to publish listing');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-6"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header Ribbon */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-900 px-6 py-5 text-white flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-widest bg-blue-500/20 text-blue-300 border border-blue-400/30 rounded-md">
                AIT Marketplace
              </span>
            </div>
            <h3 className="text-xl font-extrabold tracking-tight">
              List Campus Item or Offer Skill-Trade
            </h3>
            <p className="text-xs text-slate-300 mt-0.5">
              Instantly share gear with peers across AIT Pune hostels.
            </p>
          </div>

          <button
            onClick={closeAddModal}
            className="p-2 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5 max-h-[80vh] overflow-y-auto">
          
          {error && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold rounded-xl flex items-center gap-2">
              <Info className="w-4 h-4 text-rose-600 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* 1. Transaction Type Selector (Rent vs Sell vs Skill-Barter) */}
          <div>
            <label className="block text-xs font-extrabold text-slate-800 uppercase tracking-wider mb-2">
              1. Choose Transaction Type
            </label>
            <div className="grid grid-cols-3 gap-2.5">
              
              {/* Rent Option */}
              <button
                type="button"
                onClick={() => setTransactionType('Rent')}
                className={`p-3 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                  transactionType === 'Rent'
                    ? 'bg-blue-50 border-blue-500 ring-2 ring-blue-500/20 shadow-sm'
                    : 'bg-slate-50 border-slate-200 hover:bg-slate-100/80 text-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-blue-900">⏳ For Rent</span>
                  {transactionType === 'Rent' && <CheckCircle2 className="w-4 h-4 text-blue-600" />}
                </div>
                <p className="text-[10px] text-slate-500 leading-tight">
                  Per day/week/semester rental
                </p>
              </button>

              {/* Sell Option */}
              <button
                type="button"
                onClick={() => setTransactionType('Sell')}
                className={`p-3 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                  transactionType === 'Sell'
                    ? 'bg-slate-900 border-slate-900 text-white ring-2 ring-slate-900/20 shadow-sm'
                    : 'bg-slate-50 border-slate-200 hover:bg-slate-100/80 text-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className={`text-xs font-bold ${transactionType === 'Sell' ? 'text-white' : 'text-slate-900'}`}>🏷️ Direct Sale</span>
                  {transactionType === 'Sell' && <CheckCircle2 className="w-4 h-4 text-white" />}
                </div>
                <p className={`text-[10px] leading-tight ${transactionType === 'Sell' ? 'text-slate-300' : 'text-slate-500'}`}>
                  One-time flat price ownership
                </p>
              </button>

              {/* Skill-Barter Option (Special UI Highlight) */}
              <button
                type="button"
                onClick={() => setTransactionType('Skill-Barter')}
                className={`p-3 rounded-2xl border text-left transition-all flex flex-col justify-between relative overflow-hidden ${
                  transactionType === 'Skill-Barter'
                    ? 'bg-gradient-to-tr from-purple-900 to-indigo-900 border-purple-600 text-white ring-2 ring-purple-500/30 shadow-md shadow-purple-900/20'
                    : 'bg-purple-50/60 border-purple-200 hover:bg-purple-100/60 text-purple-900'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-purple-300" />
                    <span>Skill-Barter</span>
                  </span>
                  {transactionType === 'Skill-Barter' && <CheckCircle2 className="w-4 h-4 text-purple-300" />}
                </div>
                <p className={`text-[10px] leading-tight ${transactionType === 'Skill-Barter' ? 'text-purple-200' : 'text-purple-700'}`}>
                  Trade for code help, tutoring & notes
                </p>
              </button>

            </div>
          </div>

          {/* 2. DYNAMIC INPUT: Price vs Skill-Barter Input Field */}
          {transactionType === 'Skill-Barter' ? (
            /* Skill-Barter Adaptive UI */
            <div className="p-4 bg-gradient-to-br from-purple-50 to-indigo-50 border-2 border-purple-300 rounded-2xl animate-in fade-in zoom-in-95 duration-200 shadow-sm">
              <div className="flex items-center gap-1.5 mb-1.5 text-purple-900 font-bold text-xs">
                <Sparkles className="w-4 h-4 text-purple-600" />
                <label htmlFor="barter-skill-input">What skill or help do you want in return? (Peer Exchange)</label>
              </div>
              <p className="text-[11px] text-purple-700 mb-2.5">
                Describe the specific service, tutoring, project assistance, or assignment help you need.
              </p>
              <textarea
                id="barter-skill-input"
                required
                rows={3}
                placeholder="e.g., 'Need 1 hour help debugging React/NodeJS for my Web Tech assignment', or 'Assistance with SolidWorks 3D model CAD rendering'"
                value={barterSkill}
                onChange={(e) => setBarterSkill(e.target.value)}
                className="w-full p-3 text-xs text-purple-950 bg-white border border-purple-300 rounded-xl focus:ring-2 focus:ring-purple-500/30 focus:border-purple-600 outline-none placeholder:text-purple-300"
              />
              <div className="mt-2 flex flex-wrap gap-1.5">
                <span className="text-[10px] text-purple-600 font-semibold">Quick Prompts:</span>
                <button
                  type="button"
                  onClick={() => setBarterSkill('Need 1 hour help debugging React/Node.js web app assignment')}
                  className="px-2 py-0.5 text-[10px] bg-white border border-purple-200 text-purple-800 rounded-full hover:bg-purple-100"
                >
                  ⚡ React/Node Help
                </button>
                <button
                  type="button"
                  onClick={() => setBarterSkill('Exchange for End-Sem SPPU handwritten formula sheets & notes')}
                  className="px-2 py-0.5 text-[10px] bg-white border border-purple-200 text-purple-800 rounded-full hover:bg-purple-100"
                >
                  📚 Exam Notes
                </button>
                <button
                  type="button"
                  onClick={() => setBarterSkill('1-on-1 tutoring on Microcontrollers & Embedded C')}
                  className="px-2 py-0.5 text-[10px] bg-white border border-purple-200 text-purple-800 rounded-full hover:bg-purple-100"
                >
                  🛠️ Microcontroller Tutor
                </button>
              </div>
            </div>
          ) : (
            /* Regular Price & Duration Input */
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 bg-slate-50 border border-slate-200 rounded-2xl animate-in fade-in">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {transactionType === 'Rent' ? 'Rental Fee (₹ INR)' : 'Sale Price (₹ INR)'}
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 font-bold text-xs">₹</span>
                  <input
                    type="number"
                    min="0"
                    required
                    placeholder="e.g. 150"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full pl-7 pr-3 py-2 text-xs font-bold text-slate-900 bg-white border border-slate-200 rounded-xl focus:border-blue-500 outline-none"
                  />
                </div>
              </div>

              {transactionType === 'Rent' && (
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Rental Duration
                  </label>
                  <select
                    value={rentalPeriod}
                    onChange={(e) => setRentalPeriod(e.target.value as any)}
                    className="w-full px-3 py-2 text-xs font-semibold text-slate-900 bg-white border border-slate-200 rounded-xl focus:border-blue-500 outline-none"
                  >
                    <option value="per day">Per Day</option>
                    <option value="per week">Per Week</option>
                    <option value="per month">Per Month</option>
                    <option value="per semester">Per Semester</option>
                  </select>
                </div>
              )}
            </div>
          )}

          {/* 3. Basic Item Details */}
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Item Title
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Arduino Mega 2560 Starter Kit with 37 Sensors"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 text-xs text-slate-900 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Detailed Description & Condition Notes
              </label>
              <textarea
                rows={2}
                placeholder="Include specifications, included cables/accessories, or how well the item functions..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-3 text-xs text-slate-900 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-500 outline-none"
              />
            </div>
          </div>

          {/* 4. Category, Condition & Hostel Location */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as ListingCategory)}
                className="w-full px-3 py-2 text-xs text-slate-800 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-500 outline-none font-medium"
              >
                <option value="Electronics & IoT">Electronics & IoT</option>
                <option value="Lab Tools & Drafters">Lab Tools & Drafters</option>
                <option value="Books & Notes">Books & Notes</option>
                <option value="Cycles & Mobility">Cycles & Mobility</option>
                <option value="Hostel Essentials">Hostel Essentials</option>
                <option value="Sports & Gym">Sports & Gym</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Item Condition
              </label>
              <select
                value={condition}
                onChange={(e) => setCondition(e.target.value as ItemCondition)}
                className="w-full px-3 py-2 text-xs text-slate-800 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-500 outline-none font-medium"
              >
                <option value="Brand New">Brand New</option>
                <option value="Like New">Like New</option>
                <option value="Gently Used">Gently Used</option>
                <option value="Fair">Fair</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Hostel Handover Spot
              </label>
              <select
                value={hostelBlock}
                onChange={(e) => setHostelBlock(e.target.value as HostelBlock)}
                className="w-full px-3 py-2 text-xs text-slate-800 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-500 outline-none font-medium"
              >
                <option value="OBH-1">OBH-1</option>
                <option value="OBH-2">OBH-2</option>
                <option value="OBH-3">OBH-3</option>
                <option value="NBH-1">NBH-1</option>
                <option value="NBH-2">NBH-2</option>
                <option value="GH-1">GH-1</option>
                <option value="GH-2">GH-2</option>
                <option value="Day Scholar">Day Scholar</option>
              </select>
            </div>
          </div>

          {/* 5. Image Selector & Presets */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-bold text-slate-700">
                Item Image / Photo
              </label>
              <span className="text-[10px] text-slate-500">
                Select from campus presets or paste URL
              </span>
            </div>

            {/* Presets Gallery */}
            <div className="grid grid-cols-4 sm:grid-cols-8 gap-2 mb-2">
              {PRESET_IMAGES.map((preset, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setImageUrl(preset.url);
                    setCustomImage('');
                  }}
                  className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all group ${
                    imageUrl === preset.url && !customImage
                      ? 'border-blue-600 ring-2 ring-blue-500/30 scale-95'
                      : 'border-slate-200 hover:border-slate-400 opacity-70 hover:opacity-100'
                  }`}
                  title={preset.label}
                >
                  <img src={preset.url} alt={preset.label} className="w-full h-full object-cover" />
                  {imageUrl === preset.url && !customImage && (
                    <div className="absolute inset-0 bg-blue-600/30 flex items-center justify-center">
                      <CheckCircle2 className="w-4 h-4 text-white" />
                    </div>
                  )}
                </button>
              ))}
            </div>

            <div className="relative">
              <ImageIcon className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="url"
                placeholder="Or paste custom image URL (e.g. https://...)"
                value={customImage}
                onChange={(e) => setCustomImage(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs text-slate-800 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-500 outline-none"
              />
            </div>
          </div>

          {/* Submit Action */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={closeAddModal}
              className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs font-bold rounded-xl shadow-md shadow-blue-600/20 active:scale-95 transition-all flex items-center gap-2 disabled:opacity-50"
            >
              {isSubmitting ? (
                <span>Publishing Item...</span>
              ) : (
                <>
                  <Upload className="w-3.5 h-3.5" />
                  <span>Publish to Campus Feed</span>
                </>
              )}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};

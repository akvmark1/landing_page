import { useEffect, useState } from 'react';
import { AdminLayout } from './AdminLayout';
import { Save, Loader2, Plus, X } from 'lucide-react';
import { getHeroSection, updateHeroSection, HeroSection } from '../../lib/supabase';
import { toast } from 'sonner';

export function HeroAdmin() {
  const [data, setData] = useState<HeroSection | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [newTypewriterText, setNewTypewriterText] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    const result = await getHeroSection();
    setData(result);
    setIsLoading(false);
  };

  const handleSave = async () => {
    if (!data) return;
    
    setIsSaving(true);
    const result = await updateHeroSection(data.id, {
      company_name: data.company_name,
      tagline: data.tagline,
      main_heading: data.main_heading,
      sub_heading: data.sub_heading,
      typewriter_texts: data.typewriter_texts,
      cta_button_text: data.cta_button_text,
      cta_button_link: data.cta_button_link,
    });
    
    if (result.success) {
      toast.success('Hero section updated successfully!');
    } else {
      toast.error(result.error || 'Failed to update hero section');
    }
    setIsSaving(false);
  };

  const addTypewriterText = () => {
    if (!newTypewriterText.trim() || !data) return;
    setData({
      ...data,
      typewriter_texts: [...(data.typewriter_texts || []), newTypewriterText.trim()]
    });
    setNewTypewriterText('');
  };

  const removeTypewriterText = (index: number) => {
    if (!data) return;
    setData({
      ...data,
      typewriter_texts: data.typewriter_texts.filter((_, i) => i !== index)
    });
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <Loader2 className="w-8 h-8 animate-spin text-cyan-400" />
        </div>
      </AdminLayout>
    );
  }

  if (!data) {
    return (
      <AdminLayout>
        <div className="max-w-4xl mx-auto">
          <div className="bg-yellow-500/20 border border-yellow-500/50 rounded-xl p-6 text-center">
            <h2 className="text-xl font-bold text-yellow-400 mb-2">No Data Found</h2>
            <p className="text-slate-300">Please run the SQL schema in your Supabase SQL Editor first.</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Hero Section</h1>
            <p className="text-slate-400 mt-1">Edit the main hero section of your landing page</p>
          </div>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center gap-2 px-6 py-3 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors disabled:opacity-50"
          >
            {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            Save Changes
          </button>
        </div>

        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <h2 className="text-lg font-semibold text-white mb-4">Company Info</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Company Name</label>
                <input
                  type="text"
                  value={data.company_name || ''}
                  onChange={(e) => setData({ ...data, company_name: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-cyan-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Tagline</label>
                <input
                  type="text"
                  value={data.tagline || ''}
                  onChange={(e) => setData({ ...data, tagline: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <h2 className="text-lg font-semibold text-white mb-4">Headings</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Main Heading</label>
                <textarea
                  value={data.main_heading || ''}
                  onChange={(e) => setData({ ...data, main_heading: e.target.value })}
                  rows={2}
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-cyan-500 resize-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Sub Heading</label>
                <textarea
                  value={data.sub_heading || ''}
                  onChange={(e) => setData({ ...data, sub_heading: e.target.value })}
                  rows={2}
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-cyan-500 resize-none"
                />
              </div>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <h2 className="text-lg font-semibold text-white mb-4">Typewriter Effect Texts</h2>
            <div className="space-y-3">
              {data.typewriter_texts?.map((text, index) => (
                <div key={index} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={text}
                    onChange={(e) => {
                      const newTexts = [...data.typewriter_texts];
                      newTexts[index] = e.target.value;
                      setData({ ...data, typewriter_texts: newTexts });
                    }}
                    className="flex-1 px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-cyan-500"
                  />
                  <button
                    onClick={() => removeTypewriterText(index)}
                    className="p-2 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
              <div className="flex items-center gap-2 pt-2">
                <input
                  type="text"
                  value={newTypewriterText}
                  onChange={(e) => setNewTypewriterText(e.target.value)}
                  placeholder="Add new typewriter text..."
                  className="flex-1 px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-500"
                  onKeyPress={(e) => e.key === 'Enter' && addTypewriterText()}
                />
                <button
                  onClick={addTypewriterText}
                  className="p-2 bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30 rounded-lg transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <h2 className="text-lg font-semibold text-white mb-4">Call to Action Button</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Button Text</label>
                <input
                  type="text"
                  value={data.cta_button_text || ''}
                  onChange={(e) => setData({ ...data, cta_button_text: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-cyan-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Button Link</label>
                <input
                  type="text"
                  value={data.cta_button_link || ''}
                  onChange={(e) => setData({ ...data, cta_button_link: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

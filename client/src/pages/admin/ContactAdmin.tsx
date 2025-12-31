import { useEffect, useState } from 'react';
import { AdminLayout } from './AdminLayout';
import { Save, Loader2, Plus } from 'lucide-react';
import { getContactSection, updateContactSection, createContactSection, ContactSection } from '../../lib/supabase';
import { toast } from 'sonner';

export function ContactAdmin() {
  const [data, setData] = useState<ContactSection | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isInitializing, setIsInitializing] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    const result = await getContactSection();
    setData(result);
    setIsLoading(false);
  };

  const handleInitialize = async () => {
    setIsInitializing(true);
    const result = await createContactSection();
    if (result.success && result.data) {
      setData(result.data);
      toast.success('Contact section initialized successfully!');
    } else {
      toast.error(result.error || 'Failed to initialize contact section');
    }
    setIsInitializing(false);
  };

  const handleSave = async () => {
    if (!data) return;
    
    setIsSaving(true);
    const result = await updateContactSection(data.id, {
      section_title: data.section_title,
      section_description: data.section_description,
      email: data.email,
      phone: data.phone,
      whatsapp_link: data.whatsapp_link,
      address: data.address,
      button_1_text: data.button_1_text,
      button_1_link: data.button_1_link,
      button_2_text: data.button_2_text,
      button_2_link: data.button_2_link,
      button_3_text: data.button_3_text,
      button_3_link: data.button_3_link,
    });
    
    if (result.success) {
      toast.success('Contact section updated successfully!');
    } else {
      toast.error(result.error || 'Failed to update contact section');
    }
    setIsSaving(false);
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
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-8 text-center">
            <div className="w-16 h-16 bg-cyan-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Plus className="w-8 h-8 text-cyan-400" />
            </div>
            <h2 className="text-xl font-bold text-white mb-2">Contact Section Not Set Up</h2>
            <p className="text-slate-400 mb-6">Click the button below to initialize the contact section with default values.</p>
            <button
              onClick={handleInitialize}
              disabled={isInitializing}
              className="inline-flex items-center gap-2 px-6 py-3 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors disabled:opacity-50"
            >
              {isInitializing ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Initializing...
                </>
              ) : (
                <>
                  <Plus className="w-5 h-5" />
                  Initialize Contact Section
                </>
              )}
            </button>
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
            <h1 className="text-3xl font-bold text-white">Contact Section</h1>
            <p className="text-slate-400 mt-1">Edit the call-to-action and contact section</p>
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
            <h2 className="text-lg font-semibold text-white mb-4">Section Content</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Section Title</label>
                <input
                  type="text"
                  value={data.section_title || ''}
                  onChange={(e) => setData({ ...data, section_title: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-cyan-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Section Description</label>
                <textarea
                  value={data.section_description || ''}
                  onChange={(e) => setData({ ...data, section_description: e.target.value })}
                  rows={2}
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-cyan-500 resize-none"
                />
              </div>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <h2 className="text-lg font-semibold text-white mb-4">Contact Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Email</label>
                <input
                  type="email"
                  value={data.email || ''}
                  onChange={(e) => setData({ ...data, email: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-cyan-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Phone (optional)</label>
                <input
                  type="text"
                  value={data.phone || ''}
                  onChange={(e) => setData({ ...data, phone: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-slate-300 mb-2">WhatsApp Link</label>
              <input
                type="text"
                value={data.whatsapp_link || ''}
                onChange={(e) => setData({ ...data, whatsapp_link: e.target.value })}
                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-cyan-500"
              />
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-slate-300 mb-2">Address (optional)</label>
              <textarea
                value={data.address || ''}
                onChange={(e) => setData({ ...data, address: e.target.value })}
                rows={2}
                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-cyan-500 resize-none"
              />
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <h2 className="text-lg font-semibold text-white mb-4">CTA Buttons</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Button 1 Text</label>
                  <input
                    type="text"
                    value={data.button_1_text || ''}
                    onChange={(e) => setData({ ...data, button_1_text: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Button 1 Link</label>
                  <input
                    type="text"
                    value={data.button_1_link || ''}
                    onChange={(e) => setData({ ...data, button_1_link: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Button 2 Text</label>
                  <input
                    type="text"
                    value={data.button_2_text || ''}
                    onChange={(e) => setData({ ...data, button_2_text: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Button 2 Link</label>
                  <input
                    type="text"
                    value={data.button_2_link || ''}
                    onChange={(e) => setData({ ...data, button_2_link: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Button 3 Text (WhatsApp)</label>
                  <input
                    type="text"
                    value={data.button_3_text || ''}
                    onChange={(e) => setData({ ...data, button_3_text: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Button 3 Link</label>
                  <input
                    type="text"
                    value={data.button_3_link || ''}
                    onChange={(e) => setData({ ...data, button_3_link: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

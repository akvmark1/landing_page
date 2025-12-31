import { useEffect, useState } from 'react';
import { AdminLayout } from './AdminLayout';
import { Save, Loader2, Plus, Trash2, Edit2, X, Check } from 'lucide-react';
import { 
  getFooterSection, 
  updateFooterSection, 
  getAllFooterLinks,
  getAllFooterSocialLinks,
  updateFooterLink,
  createFooterLink,
  deleteFooterLink,
  updateFooterSocialLink,
  createFooterSocialLink,
  deleteFooterSocialLink,
  createFooterSection,
  initializeDefaultFooterLinks,
  initializeDefaultFooterSocialLinks,
  FooterSection, 
  FooterLink,
  FooterSocialLink
} from '../../lib/supabase';
import { toast } from 'sonner';

const socialPlatforms = ['LinkedIn', 'X', 'Instagram', 'Facebook', 'YouTube', 'GitHub'];
const socialIcons = ['Linkedin', 'X', 'Instagram', 'Facebook', 'Youtube', 'Github'];

export function FooterAdmin() {
  const [section, setSection] = useState<FooterSection | null>(null);
  const [links, setLinks] = useState<FooterLink[]>([]);
  const [socialLinks, setSocialLinks] = useState<FooterSocialLink[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isInitializing, setIsInitializing] = useState(false);
  const [editingLink, setEditingLink] = useState<string | null>(null);
  const [editingSocial, setEditingSocial] = useState<string | null>(null);
  const [showAddLink, setShowAddLink] = useState(false);
  const [showAddSocial, setShowAddSocial] = useState(false);
  const [newLink, setNewLink] = useState({ name: '', href: '', display_order: 0, is_active: true });
  const [newSocial, setNewSocial] = useState({ platform: 'LinkedIn', url: '', icon_name: 'Linkedin', display_order: 0, is_active: true });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    const [sectionData, linksData, socialData] = await Promise.all([
      getFooterSection(),
      getAllFooterLinks(),
      getAllFooterSocialLinks()
    ]);
    setSection(sectionData);
    setLinks(linksData);
    setSocialLinks(socialData);
    setIsLoading(false);
  };

  const handleInitialize = async () => {
    setIsInitializing(true);
    
    const [sectionResult, linksResult, socialResult] = await Promise.all([
      createFooterSection(),
      initializeDefaultFooterLinks(),
      initializeDefaultFooterSocialLinks()
    ]);
    
    if (sectionResult.success) {
      toast.success('Footer section initialized successfully!');
      await fetchData();
    } else {
      toast.error(sectionResult.error || 'Failed to initialize footer section');
    }
    
    setIsInitializing(false);
  };

  const handleSaveSection = async () => {
    if (!section) return;
    
    setIsSaving(true);
    const result = await updateFooterSection(section.id, {
      company_name: section.company_name,
      company_suffix: section.company_suffix,
      company_description: section.company_description,
      incorporation_text: section.incorporation_text,
      maps_url: section.maps_url,
      embed_map_url: section.embed_map_url,
      copyright_text: section.copyright_text,
    });
    
    if (result.success) {
      toast.success('Footer section updated successfully!');
    } else {
      toast.error(result.error || 'Failed to update footer section');
    }
    setIsSaving(false);
  };

  const handleSaveLink = async (link: FooterLink) => {
    const result = await updateFooterLink(link.id, link);
    if (result.success) {
      toast.success('Link updated!');
      setEditingLink(null);
    } else {
      toast.error(result.error || 'Failed to update link');
    }
  };

  const handleAddLink = async () => {
    const result = await createFooterLink({
      ...newLink,
      display_order: links.length + 1,
    } as Omit<FooterLink, 'id'>);
    
    if (result.success) {
      toast.success('Link added!');
      setShowAddLink(false);
      setNewLink({ name: '', href: '', display_order: 0, is_active: true });
      fetchData();
    } else {
      toast.error(result.error || 'Failed to add link');
    }
  };

  const handleDeleteLink = async (id: string) => {
    if (!confirm('Delete this link?')) return;
    const result = await deleteFooterLink(id);
    if (result.success) {
      toast.success('Link deleted!');
      fetchData();
    } else {
      toast.error(result.error || 'Failed to delete link');
    }
  };

  const handleSaveSocial = async (social: FooterSocialLink) => {
    const result = await updateFooterSocialLink(social.id, social);
    if (result.success) {
      toast.success('Social link updated!');
      setEditingSocial(null);
    } else {
      toast.error(result.error || 'Failed to update social link');
    }
  };

  const handleAddSocial = async () => {
    const result = await createFooterSocialLink({
      ...newSocial,
      display_order: socialLinks.length + 1,
    } as Omit<FooterSocialLink, 'id'>);
    
    if (result.success) {
      toast.success('Social link added!');
      setShowAddSocial(false);
      setNewSocial({ platform: 'LinkedIn', url: '', icon_name: 'Linkedin', display_order: 0, is_active: true });
      fetchData();
    } else {
      toast.error(result.error || 'Failed to add social link');
    }
  };

  const handleDeleteSocial = async (id: string) => {
    if (!confirm('Delete this social link?')) return;
    const result = await deleteFooterSocialLink(id);
    if (result.success) {
      toast.success('Social link deleted!');
      fetchData();
    } else {
      toast.error(result.error || 'Failed to delete social link');
    }
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

  if (!section) {
    return (
      <AdminLayout>
        <div className="max-w-4xl mx-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-8 text-center">
            <div className="w-16 h-16 bg-cyan-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Plus className="w-8 h-8 text-cyan-400" />
            </div>
            <h2 className="text-xl font-bold text-white mb-2">Footer Section Not Set Up</h2>
            <p className="text-slate-400 mb-6">Click the button below to initialize the footer section with default values including quick links and social links.</p>
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
                  Initialize Footer Section
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
            <h1 className="text-3xl font-bold text-white">Footer Section</h1>
            <p className="text-slate-400 mt-1">Edit the footer of your landing page</p>
          </div>
          <button
            onClick={handleSaveSection}
            disabled={isSaving || !section}
            className="flex items-center gap-2 px-6 py-3 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors disabled:opacity-50"
          >
            {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            Save Section
          </button>
        </div>

        {section && (
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 mb-6">
            <h2 className="text-lg font-semibold text-white mb-4">Company Information</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Company Name</label>
                  <input
                    type="text"
                    value={section.company_name || ''}
                    onChange={(e) => setSection({ ...section, company_name: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Company Suffix</label>
                  <input
                    type="text"
                    value={section.company_suffix || ''}
                    onChange={(e) => setSection({ ...section, company_suffix: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Company Description</label>
                <textarea
                  value={section.company_description || ''}
                  onChange={(e) => setSection({ ...section, company_description: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-cyan-500 resize-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Incorporation Text</label>
                <input
                  type="text"
                  value={section.incorporation_text || ''}
                  onChange={(e) => setSection({ ...section, incorporation_text: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-cyan-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Maps URL</label>
                <input
                  type="text"
                  value={section.maps_url || ''}
                  onChange={(e) => setSection({ ...section, maps_url: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-cyan-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Embed Map URL</label>
                <input
                  type="text"
                  value={section.embed_map_url || ''}
                  onChange={(e) => setSection({ ...section, embed_map_url: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-cyan-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Copyright Text (optional)</label>
                <input
                  type="text"
                  value={section.copyright_text || ''}
                  onChange={(e) => setSection({ ...section, copyright_text: e.target.value })}
                  placeholder="e.g., © 2025 AkashVahini. All rights reserved."
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>
          </div>
        )}

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-white">Quick Links</h2>
            <button
              onClick={() => setShowAddLink(true)}
              className="flex items-center gap-2 px-4 py-2 bg-cyan-500/20 text-cyan-400 rounded-lg hover:bg-cyan-500/30 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Link
            </button>
          </div>

          {showAddLink && (
            <div className="bg-slate-800 border border-slate-700 rounded-lg p-4 mb-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <input
                  type="text"
                  value={newLink.name}
                  onChange={(e) => setNewLink({ ...newLink, name: e.target.value })}
                  placeholder="Link Name"
                  className="px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder:text-slate-400 focus:outline-none focus:border-cyan-500"
                />
                <input
                  type="text"
                  value={newLink.href}
                  onChange={(e) => setNewLink({ ...newLink, href: e.target.value })}
                  placeholder="Link URL (e.g., #about)"
                  className="px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder:text-slate-400 focus:outline-none focus:border-cyan-500"
                />
              </div>
              <div className="flex gap-2 justify-end">
                <button onClick={() => setShowAddLink(false)} className="px-4 py-2 text-slate-400 hover:text-white">Cancel</button>
                <button onClick={handleAddLink} className="px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600">Add</button>
              </div>
            </div>
          )}

          <div className="space-y-2">
            {links.map((link) => (
              <div key={link.id} className="flex items-center justify-between bg-slate-800 border border-slate-700 rounded-lg p-3">
                {editingLink === link.id ? (
                  <div className="flex-1 flex items-center gap-2">
                    <input
                      type="text"
                      value={link.name}
                      onChange={(e) => setLinks(links.map(l => l.id === link.id ? { ...l, name: e.target.value } : l))}
                      className="flex-1 px-3 py-1 bg-slate-700 border border-slate-600 rounded text-white focus:outline-none focus:border-cyan-500"
                    />
                    <input
                      type="text"
                      value={link.href}
                      onChange={(e) => setLinks(links.map(l => l.id === link.id ? { ...l, href: e.target.value } : l))}
                      className="flex-1 px-3 py-1 bg-slate-700 border border-slate-600 rounded text-white focus:outline-none focus:border-cyan-500"
                    />
                    <button onClick={() => setEditingLink(null)} className="p-1 text-slate-400 hover:text-white"><X className="w-4 h-4" /></button>
                    <button onClick={() => handleSaveLink(link)} className="p-1 text-green-400 hover:text-green-300"><Check className="w-4 h-4" /></button>
                  </div>
                ) : (
                  <>
                    <div>
                      <span className="text-white">{link.name}</span>
                      <span className="text-slate-500 ml-2">{link.href}</span>
                    </div>
                    <div className="flex gap-1">
                      <button onClick={() => setEditingLink(link.id)} className="p-1 text-slate-400 hover:text-cyan-400"><Edit2 className="w-4 h-4" /></button>
                      <button onClick={() => handleDeleteLink(link.id)} className="p-1 text-slate-400 hover:text-red-400"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-white">Social Links</h2>
            <button
              onClick={() => setShowAddSocial(true)}
              className="flex items-center gap-2 px-4 py-2 bg-cyan-500/20 text-cyan-400 rounded-lg hover:bg-cyan-500/30 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Social
            </button>
          </div>

          {showAddSocial && (
            <div className="bg-slate-800 border border-slate-700 rounded-lg p-4 mb-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <select
                  value={newSocial.platform}
                  onChange={(e) => {
                    const index = socialPlatforms.indexOf(e.target.value);
                    setNewSocial({ ...newSocial, platform: e.target.value, icon_name: socialIcons[index] });
                  }}
                  className="px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-cyan-500"
                >
                  {socialPlatforms.map(platform => (
                    <option key={platform} value={platform}>{platform}</option>
                  ))}
                </select>
                <input
                  type="text"
                  value={newSocial.url}
                  onChange={(e) => setNewSocial({ ...newSocial, url: e.target.value })}
                  placeholder="URL"
                  className="px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder:text-slate-400 focus:outline-none focus:border-cyan-500"
                />
              </div>
              <div className="flex gap-2 justify-end">
                <button onClick={() => setShowAddSocial(false)} className="px-4 py-2 text-slate-400 hover:text-white">Cancel</button>
                <button onClick={handleAddSocial} className="px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600">Add</button>
              </div>
            </div>
          )}

          <div className="space-y-2">
            {socialLinks.map((social) => (
              <div key={social.id} className="flex items-center justify-between bg-slate-800 border border-slate-700 rounded-lg p-3">
                {editingSocial === social.id ? (
                  <div className="flex-1 flex items-center gap-2">
                    <select
                      value={social.platform}
                      onChange={(e) => {
                        const index = socialPlatforms.indexOf(e.target.value);
                        setSocialLinks(socialLinks.map(s => s.id === social.id ? { ...s, platform: e.target.value, icon_name: socialIcons[index] } : s));
                      }}
                      className="px-3 py-1 bg-slate-700 border border-slate-600 rounded text-white focus:outline-none focus:border-cyan-500"
                    >
                      {socialPlatforms.map(platform => (
                        <option key={platform} value={platform}>{platform}</option>
                      ))}
                    </select>
                    <input
                      type="text"
                      value={social.url}
                      onChange={(e) => setSocialLinks(socialLinks.map(s => s.id === social.id ? { ...s, url: e.target.value } : s))}
                      className="flex-1 px-3 py-1 bg-slate-700 border border-slate-600 rounded text-white focus:outline-none focus:border-cyan-500"
                    />
                    <button onClick={() => setEditingSocial(null)} className="p-1 text-slate-400 hover:text-white"><X className="w-4 h-4" /></button>
                    <button onClick={() => handleSaveSocial(social)} className="p-1 text-green-400 hover:text-green-300"><Check className="w-4 h-4" /></button>
                  </div>
                ) : (
                  <>
                    <div>
                      <span className="text-white">{social.platform}</span>
                      <span className="text-slate-500 ml-2 text-sm">{social.url}</span>
                    </div>
                    <div className="flex gap-1">
                      <button onClick={() => setEditingSocial(social.id)} className="p-1 text-slate-400 hover:text-cyan-400"><Edit2 className="w-4 h-4" /></button>
                      <button onClick={() => handleDeleteSocial(social.id)} className="p-1 text-slate-400 hover:text-red-400"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

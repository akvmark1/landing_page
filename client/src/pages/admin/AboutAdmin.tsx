import { useEffect, useState } from 'react';
import { AdminLayout } from './AdminLayout';
import { Save, Loader2, Plus, Trash2, Edit2, X, Check } from 'lucide-react';
import { 
  getAboutSection, 
  updateAboutSection, 
  getAllAboutValues,
  updateAboutValue,
  createAboutValue,
  deleteAboutValue,
  AboutSection, 
  AboutValue 
} from '../../lib/supabase';
import { toast } from 'sonner';

const iconOptions = ['Zap', 'Lightbulb', 'Leaf', 'Shield', 'Target', 'Heart', 'Star', 'Globe', 'Rocket', 'Award'];

export function AboutAdmin() {
  const [section, setSection] = useState<AboutSection | null>(null);
  const [values, setValues] = useState<AboutValue[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [editingValue, setEditingValue] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newValue, setNewValue] = useState({ title: '', description: '', icon_name: 'Zap', display_order: 0, is_active: true });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    const [sectionData, valuesData] = await Promise.all([
      getAboutSection(),
      getAllAboutValues()
    ]);
    setSection(sectionData);
    setValues(valuesData);
    setIsLoading(false);
  };

  const handleSaveSection = async () => {
    if (!section) return;
    
    setIsSaving(true);
    const result = await updateAboutSection(section.id, {
      section_label: section.section_label,
      title: section.title,
      title_highlight: section.title_highlight,
      description: section.description,
    });
    
    if (result.success) {
      toast.success('About section updated successfully!');
    } else {
      toast.error(result.error || 'Failed to update about section');
    }
    setIsSaving(false);
  };

  const handleSaveValue = async (value: AboutValue) => {
    const result = await updateAboutValue(value.id, {
      title: value.title,
      description: value.description,
      icon_name: value.icon_name,
      display_order: value.display_order,
      is_active: value.is_active,
    });
    
    if (result.success) {
      toast.success('Value updated successfully!');
      setEditingValue(null);
    } else {
      toast.error(result.error || 'Failed to update value');
    }
  };

  const handleAddValue = async () => {
    const result = await createAboutValue({
      ...newValue,
      display_order: values.length + 1,
    } as Omit<AboutValue, 'id'>);
    
    if (result.success) {
      toast.success('Value added successfully!');
      setShowAddForm(false);
      setNewValue({ title: '', description: '', icon_name: 'Zap', display_order: 0, is_active: true });
      fetchData();
    } else {
      toast.error(result.error || 'Failed to add value');
    }
  };

  const handleDeleteValue = async (id: string) => {
    if (!confirm('Are you sure you want to delete this value?')) return;
    
    const result = await deleteAboutValue(id);
    if (result.success) {
      toast.success('Value deleted successfully!');
      fetchData();
    } else {
      toast.error(result.error || 'Failed to delete value');
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

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">About Section</h1>
            <p className="text-slate-400 mt-1">Edit the about section of your landing page</p>
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
            <h2 className="text-lg font-semibold text-white mb-4">Section Content</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Section Label</label>
                  <input
                    type="text"
                    value={section.section_label || ''}
                    onChange={(e) => setSection({ ...section, section_label: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Title</label>
                  <input
                    type="text"
                    value={section.title || ''}
                    onChange={(e) => setSection({ ...section, title: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Title Highlight</label>
                  <input
                    type="text"
                    value={section.title_highlight || ''}
                    onChange={(e) => setSection({ ...section, title_highlight: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Description</label>
                <textarea
                  value={section.description || ''}
                  onChange={(e) => setSection({ ...section, description: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-cyan-500 resize-none"
                />
              </div>
            </div>
          </div>
        )}

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-white">Value Cards</h2>
            <button
              onClick={() => setShowAddForm(true)}
              className="flex items-center gap-2 px-4 py-2 bg-cyan-500/20 text-cyan-400 rounded-lg hover:bg-cyan-500/30 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Value
            </button>
          </div>

          {showAddForm && (
            <div className="bg-slate-800 border border-slate-700 rounded-lg p-4 mb-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <input
                  type="text"
                  value={newValue.title}
                  onChange={(e) => setNewValue({ ...newValue, title: e.target.value })}
                  placeholder="Title"
                  className="px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder:text-slate-400 focus:outline-none focus:border-cyan-500"
                />
                <select
                  value={newValue.icon_name}
                  onChange={(e) => setNewValue({ ...newValue, icon_name: e.target.value })}
                  className="px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-cyan-500"
                >
                  {iconOptions.map(icon => (
                    <option key={icon} value={icon}>{icon}</option>
                  ))}
                </select>
              </div>
              <textarea
                value={newValue.description}
                onChange={(e) => setNewValue({ ...newValue, description: e.target.value })}
                placeholder="Description"
                rows={2}
                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder:text-slate-400 focus:outline-none focus:border-cyan-500 resize-none mb-4"
              />
              <div className="flex gap-2 justify-end">
                <button
                  onClick={() => setShowAddForm(false)}
                  className="px-4 py-2 text-slate-400 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddValue}
                  className="px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors"
                >
                  Add
                </button>
              </div>
            </div>
          )}

          <div className="space-y-3">
            {values.map((value) => (
              <div key={value.id} className="bg-slate-800 border border-slate-700 rounded-lg p-4">
                {editingValue === value.id ? (
                  <div className="space-y-3">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <input
                        type="text"
                        value={value.title}
                        onChange={(e) => setValues(values.map(v => v.id === value.id ? { ...v, title: e.target.value } : v))}
                        className="px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-cyan-500"
                      />
                      <select
                        value={value.icon_name}
                        onChange={(e) => setValues(values.map(v => v.id === value.id ? { ...v, icon_name: e.target.value } : v))}
                        className="px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-cyan-500"
                      >
                        {iconOptions.map(icon => (
                          <option key={icon} value={icon}>{icon}</option>
                        ))}
                      </select>
                    </div>
                    <textarea
                      value={value.description}
                      onChange={(e) => setValues(values.map(v => v.id === value.id ? { ...v, description: e.target.value } : v))}
                      rows={2}
                      className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-cyan-500 resize-none"
                    />
                    <div className="flex items-center justify-between">
                      <label className="flex items-center gap-2 text-slate-300">
                        <input
                          type="checkbox"
                          checked={value.is_active}
                          onChange={(e) => setValues(values.map(v => v.id === value.id ? { ...v, is_active: e.target.checked } : v))}
                          className="w-4 h-4 rounded border-slate-600 bg-slate-700"
                        />
                        Active
                      </label>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setEditingValue(null)}
                          className="p-2 text-slate-400 hover:text-white transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleSaveValue(value)}
                          className="p-2 text-green-400 hover:text-green-300 transition-colors"
                        >
                          <Check className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-white font-medium">{value.title}</span>
                        <span className="text-xs px-2 py-0.5 rounded bg-slate-700 text-slate-400">{value.icon_name}</span>
                        {!value.is_active && (
                          <span className="text-xs px-2 py-0.5 rounded bg-yellow-500/20 text-yellow-400">Inactive</span>
                        )}
                      </div>
                      <p className="text-slate-400 text-sm mt-1">{value.description}</p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setEditingValue(value.id)}
                        className="p-2 text-slate-400 hover:text-cyan-400 transition-colors"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteValue(value.id)}
                        className="p-2 text-slate-400 hover:text-red-400 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

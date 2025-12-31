import { useEffect, useState } from 'react';
import { AdminLayout } from './AdminLayout';
import { Save, Loader2, Plus, Trash2, Edit2, X, Check, ChevronDown, ChevronUp } from 'lucide-react';
import { 
  getAllMentors,
  updateMentor,
  createMentor,
  deleteMentor,
  Mentor 
} from '../../lib/supabase';
import { toast } from 'sonner';

const iconOptions = ['Lightbulb', 'Award', 'Users', 'Target', 'Star', 'Globe', 'Rocket', 'Brain', 'Briefcase', 'GraduationCap'];

export function MentorsAdmin() {
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedMentor, setExpandedMentor] = useState<string | null>(null);
  const [editingMentor, setEditingMentor] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [removeMode, setRemoveMode] = useState(false);
  const [selectedForRemoval, setSelectedForRemoval] = useState<string[]>([]);
  const [newMentor, setNewMentor] = useState({
    name: '',
    role: '',
    expertise: [] as string[],
    description: '',
    quote: '',
    image_url: '',
    color: '#00d4ff',
    secondary_color: '#0066ff',
    icon_name: 'Lightbulb',
    linkedin_url: '',
    display_order: 0,
    is_active: true
  });
  const [newExpertise, setNewExpertise] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    const data = await getAllMentors();
    setMentors(data);
    setIsLoading(false);
  };

  const handleSaveMentor = async (mentor: Mentor) => {
    const result = await updateMentor(mentor.id, mentor);
    
    if (result.success) {
      toast.success('Mentor updated successfully!');
      setEditingMentor(null);
    } else {
      toast.error(result.error || 'Failed to update mentor');
    }
  };

  const handleAddMentor = async () => {
    const result = await createMentor({
      ...newMentor,
      display_order: mentors.length + 1,
    } as Omit<Mentor, 'id'>);
    
    if (result.success) {
      toast.success('Mentor added successfully!');
      setShowAddForm(false);
      setNewMentor({
        name: '',
        role: '',
        expertise: [],
        description: '',
        quote: '',
        image_url: '',
        color: '#00d4ff',
        secondary_color: '#0066ff',
        icon_name: 'Lightbulb',
        linkedin_url: '',
        display_order: 0,
        is_active: true
      });
      fetchData();
    } else {
      toast.error(result.error || 'Failed to add mentor');
    }
  };

  const handleDeleteMentor = async (id: string) => {
    if (!confirm('Are you sure you want to delete this mentor?')) return;
    
    const result = await deleteMentor(id);
    if (result.success) {
      toast.success('Mentor deleted successfully!');
      fetchData();
    } else {
      toast.error(result.error || 'Failed to delete mentor');
    }
  };

  const toggleRemoveMode = () => {
    setRemoveMode(!removeMode);
    setSelectedForRemoval([]);
  };

  const toggleSelectMentor = (id: string) => {
    if (selectedForRemoval.includes(id)) {
      setSelectedForRemoval(selectedForRemoval.filter(mId => mId !== id));
    } else {
      setSelectedForRemoval([...selectedForRemoval, id]);
    }
  };

  const handleRemoveSelected = async () => {
    if (selectedForRemoval.length === 0) {
      toast.error('Please select mentors to remove');
      return;
    }
    
    if (!confirm(`Are you sure you want to delete ${selectedForRemoval.length} mentor(s)?`)) return;
    
    let successCount = 0;
    for (const id of selectedForRemoval) {
      const result = await deleteMentor(id);
      if (result.success) successCount++;
    }
    
    if (successCount > 0) {
      toast.success(`${successCount} mentor(s) removed successfully!`);
      setRemoveMode(false);
      setSelectedForRemoval([]);
      fetchData();
    } else {
      toast.error('Failed to remove mentors');
    }
  };

  const addExpertise = (mentorId: string | null) => {
    if (!newExpertise.trim()) return;
    
    if (mentorId) {
      setMentors(mentors.map(m => 
        m.id === mentorId 
          ? { ...m, expertise: [...(m.expertise || []), newExpertise.trim()] }
          : m
      ));
    } else {
      setNewMentor({ ...newMentor, expertise: [...newMentor.expertise, newExpertise.trim()] });
    }
    setNewExpertise('');
  };

  const removeExpertise = (mentorId: string | null, index: number) => {
    if (mentorId) {
      setMentors(mentors.map(m => 
        m.id === mentorId 
          ? { ...m, expertise: m.expertise.filter((_, i) => i !== index) }
          : m
      ));
    } else {
      setNewMentor({ ...newMentor, expertise: newMentor.expertise.filter((_, i) => i !== index) });
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
            <h1 className="text-3xl font-bold text-white">Mentors</h1>
            <p className="text-slate-400 mt-1">Manage your mentors section</p>
          </div>
          <div className="flex gap-3">
            {removeMode ? (
              <>
                <button
                  onClick={handleRemoveSelected}
                  disabled={selectedForRemoval.length === 0}
                  className="flex items-center gap-2 px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Trash2 className="w-4 h-4" />
                  Remove ({selectedForRemoval.length})
                </button>
                <button
                  onClick={toggleRemoveMode}
                  className="flex items-center gap-2 px-6 py-3 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors"
                >
                  <X className="w-4 h-4" />
                  Cancel
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={toggleRemoveMode}
                  className="flex items-center gap-2 px-6 py-3 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                  Remove Mentor
                </button>
                <button
                  onClick={() => setShowAddForm(true)}
                  className="flex items-center gap-2 px-6 py-3 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Add Mentor
                </button>
              </>
            )}
          </div>
        </div>

        {showAddForm && (
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 mb-6">
            <h2 className="text-lg font-semibold text-white mb-4">Add New Mentor</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  value={newMentor.name}
                  onChange={(e) => setNewMentor({ ...newMentor, name: e.target.value })}
                  placeholder="Name"
                  className="px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder:text-slate-400 focus:outline-none focus:border-cyan-500"
                />
                <input
                  type="text"
                  value={newMentor.role}
                  onChange={(e) => setNewMentor({ ...newMentor, role: e.target.value })}
                  placeholder="Role"
                  className="px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder:text-slate-400 focus:outline-none focus:border-cyan-500"
                />
              </div>
              <textarea
                value={newMentor.description}
                onChange={(e) => setNewMentor({ ...newMentor, description: e.target.value })}
                placeholder="Description"
                rows={3}
                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder:text-slate-400 focus:outline-none focus:border-cyan-500 resize-none"
              />
              <textarea
                value={newMentor.quote}
                onChange={(e) => setNewMentor({ ...newMentor, quote: e.target.value })}
                placeholder="Quote"
                rows={2}
                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder:text-slate-400 focus:outline-none focus:border-cyan-500 resize-none"
              />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <select
                  value={newMentor.icon_name}
                  onChange={(e) => setNewMentor({ ...newMentor, icon_name: e.target.value })}
                  className="px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-cyan-500"
                >
                  {iconOptions.map(icon => (
                    <option key={icon} value={icon}>{icon}</option>
                  ))}
                </select>
                <input
                  type="color"
                  value={newMentor.color}
                  onChange={(e) => setNewMentor({ ...newMentor, color: e.target.value })}
                  className="w-full h-12 bg-slate-800 border border-slate-700 rounded-lg cursor-pointer"
                />
                <input
                  type="color"
                  value={newMentor.secondary_color}
                  onChange={(e) => setNewMentor({ ...newMentor, secondary_color: e.target.value })}
                  className="w-full h-12 bg-slate-800 border border-slate-700 rounded-lg cursor-pointer"
                />
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-2">Expertise</label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {newMentor.expertise.map((exp, index) => (
                    <span key={index} className="flex items-center gap-1 px-3 py-1 bg-cyan-500/20 text-cyan-400 rounded-full text-sm">
                      {exp}
                      <button onClick={() => removeExpertise(null, index)} className="hover:text-red-400">
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newExpertise}
                    onChange={(e) => setNewExpertise(e.target.value)}
                    placeholder="Add expertise..."
                    className="flex-1 px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder:text-slate-400 focus:outline-none focus:border-cyan-500"
                    onKeyPress={(e) => e.key === 'Enter' && addExpertise(null)}
                  />
                  <button
                    onClick={() => addExpertise(null)}
                    className="px-4 py-2 bg-cyan-500/20 text-cyan-400 rounded-lg hover:bg-cyan-500/30"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <input
                type="text"
                value={newMentor.image_url || ''}
                onChange={(e) => setNewMentor({ ...newMentor, image_url: e.target.value })}
                placeholder="Image URL (optional)"
                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder:text-slate-400 focus:outline-none focus:border-cyan-500"
              />
              <input
                type="text"
                value={newMentor.linkedin_url || ''}
                onChange={(e) => setNewMentor({ ...newMentor, linkedin_url: e.target.value })}
                placeholder="LinkedIn URL (optional)"
                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder:text-slate-400 focus:outline-none focus:border-cyan-500"
              />
              <div className="flex gap-2 justify-end">
                <button
                  onClick={() => setShowAddForm(false)}
                  className="px-4 py-2 text-slate-400 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddMentor}
                  className="px-6 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors"
                >
                  Add Mentor
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-4">
          {mentors.map((mentor) => (
            <div 
              key={mentor.id} 
              className={`bg-slate-900 border rounded-xl overflow-hidden transition-all ${
                removeMode && selectedForRemoval.includes(mentor.id) 
                  ? 'border-red-500 bg-red-500/10' 
                  : 'border-slate-800'
              }`}
            >
              <div 
                className="flex items-center justify-between p-4 cursor-pointer hover:bg-slate-800/50 transition-colors"
                onClick={() => removeMode ? toggleSelectMentor(mentor.id) : setExpandedMentor(expandedMentor === mentor.id ? null : mentor.id)}
              >
                <div className="flex items-center gap-4">
                  {removeMode && (
                    <div className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-all ${
                      selectedForRemoval.includes(mentor.id) 
                        ? 'border-red-500 bg-red-500' 
                        : 'border-slate-500'
                    }`}>
                      {selectedForRemoval.includes(mentor.id) && (
                        <Check className="w-4 h-4 text-white" />
                      )}
                    </div>
                  )}
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold"
                    style={{ background: `linear-gradient(135deg, ${mentor.color}, ${mentor.secondary_color})` }}
                  >
                    {mentor.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                  </div>
                  <div>
                    <h3 className="text-white font-medium">{mentor.name}</h3>
                    <p className="text-slate-400 text-sm">{mentor.role}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {!mentor.is_active && (
                    <span className="text-xs px-2 py-1 rounded bg-yellow-500/20 text-yellow-400">Inactive</span>
                  )}
                  {!removeMode && (
                    expandedMentor === mentor.id ? (
                      <ChevronUp className="w-5 h-5 text-slate-400" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-slate-400" />
                    )
                  )}
                </div>
              </div>

              {expandedMentor === mentor.id && (
                <div className="border-t border-slate-800 p-4">
                  {editingMentor === mentor.id ? (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                          type="text"
                          value={mentor.name}
                          onChange={(e) => setMentors(mentors.map(m => m.id === mentor.id ? { ...m, name: e.target.value } : m))}
                          placeholder="Name"
                          className="px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-cyan-500"
                        />
                        <input
                          type="text"
                          value={mentor.role}
                          onChange={(e) => setMentors(mentors.map(m => m.id === mentor.id ? { ...m, role: e.target.value } : m))}
                          placeholder="Role"
                          className="px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-cyan-500"
                        />
                      </div>
                      <textarea
                        value={mentor.description}
                        onChange={(e) => setMentors(mentors.map(m => m.id === mentor.id ? { ...m, description: e.target.value } : m))}
                        placeholder="Description"
                        rows={3}
                        className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-cyan-500 resize-none"
                      />
                      <textarea
                        value={mentor.quote}
                        onChange={(e) => setMentors(mentors.map(m => m.id === mentor.id ? { ...m, quote: e.target.value } : m))}
                        placeholder="Quote"
                        rows={2}
                        className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-cyan-500 resize-none"
                      />
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <select
                          value={mentor.icon_name}
                          onChange={(e) => setMentors(mentors.map(m => m.id === mentor.id ? { ...m, icon_name: e.target.value } : m))}
                          className="px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-cyan-500"
                        >
                          {iconOptions.map(icon => (
                            <option key={icon} value={icon}>{icon}</option>
                          ))}
                        </select>
                        <div>
                          <label className="block text-xs text-slate-400 mb-1">Primary Color</label>
                          <input
                            type="color"
                            value={mentor.color}
                            onChange={(e) => setMentors(mentors.map(m => m.id === mentor.id ? { ...m, color: e.target.value } : m))}
                            className="w-full h-10 bg-slate-800 border border-slate-700 rounded-lg cursor-pointer"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-slate-400 mb-1">Secondary Color</label>
                          <input
                            type="color"
                            value={mentor.secondary_color}
                            onChange={(e) => setMentors(mentors.map(m => m.id === mentor.id ? { ...m, secondary_color: e.target.value } : m))}
                            className="w-full h-10 bg-slate-800 border border-slate-700 rounded-lg cursor-pointer"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm text-slate-400 mb-2">Expertise</label>
                        <div className="flex flex-wrap gap-2 mb-2">
                          {mentor.expertise?.map((exp, index) => (
                            <span key={index} className="flex items-center gap-1 px-3 py-1 bg-cyan-500/20 text-cyan-400 rounded-full text-sm">
                              {exp}
                              <button onClick={() => removeExpertise(mentor.id, index)} className="hover:text-red-400">
                                <X className="w-3 h-3" />
                              </button>
                            </span>
                          ))}
                        </div>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={newExpertise}
                            onChange={(e) => setNewExpertise(e.target.value)}
                            placeholder="Add expertise..."
                            className="flex-1 px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder:text-slate-400 focus:outline-none focus:border-cyan-500"
                            onKeyPress={(e) => e.key === 'Enter' && addExpertise(mentor.id)}
                          />
                          <button
                            onClick={() => addExpertise(mentor.id)}
                            className="px-4 py-2 bg-cyan-500/20 text-cyan-400 rounded-lg hover:bg-cyan-500/30"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      <input
                        type="text"
                        value={mentor.image_url || ''}
                        onChange={(e) => setMentors(mentors.map(m => m.id === mentor.id ? { ...m, image_url: e.target.value } : m))}
                        placeholder="Image URL (optional)"
                        className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder:text-slate-400 focus:outline-none focus:border-cyan-500"
                      />
                      <input
                        type="text"
                        value={mentor.linkedin_url || ''}
                        onChange={(e) => setMentors(mentors.map(m => m.id === mentor.id ? { ...m, linkedin_url: e.target.value } : m))}
                        placeholder="LinkedIn URL (optional)"
                        className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder:text-slate-400 focus:outline-none focus:border-cyan-500"
                      />
                      <label className="flex items-center gap-2 text-slate-300">
                        <input
                          type="checkbox"
                          checked={mentor.is_active}
                          onChange={(e) => setMentors(mentors.map(m => m.id === mentor.id ? { ...m, is_active: e.target.checked } : m))}
                          className="w-4 h-4 rounded border-slate-600 bg-slate-700"
                        />
                        Active
                      </label>
                      <div className="flex gap-2 justify-end">
                        <button
                          onClick={() => setEditingMentor(null)}
                          className="px-4 py-2 text-slate-400 hover:text-white transition-colors"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => handleSaveMentor(mentor)}
                          className="px-6 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors"
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <p className="text-slate-300 mb-2">{mentor.description}</p>
                      <p className="text-slate-400 italic mb-4">"{mentor.quote}"</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {mentor.expertise?.map((exp, index) => (
                          <span key={index} className="px-3 py-1 bg-slate-800 text-slate-300 rounded-full text-sm">
                            {exp}
                          </span>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setEditingMentor(mentor.id)}
                          className="flex items-center gap-2 px-4 py-2 bg-cyan-500/20 text-cyan-400 rounded-lg hover:bg-cyan-500/30 transition-colors"
                        >
                          <Edit2 className="w-4 h-4" />
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteMentor(mentor.id)}
                          className="flex items-center gap-2 px-4 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                          Delete
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}

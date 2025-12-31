import { useEffect, useState } from 'react';
import { AdminLayout } from './AdminLayout';
import { Save, Loader2, Plus, Trash2, Edit2, X, Check, ChevronDown, ChevronUp, GraduationCap, ArrowUp, ArrowDown } from 'lucide-react';
import { 
  getAllTeamMembers,
  updateTeamMember,
  createTeamMember,
  deleteTeamMember,
  getTeamMemberEducation,
  createTeamMemberEducation,
  updateTeamMemberEducation,
  deleteTeamMemberEducation,
  reorderEducation,
  TeamMember,
  TeamMemberEducation
} from '../../lib/supabase';
import { toast } from 'sonner';

const iconOptions = ['Compass', 'Brain', 'TrendingUp', 'Activity', 'Cpu', 'Cog', 'Wifi', 'FileText', 'Settings', 'Camera', 'User', 'Code', 'Layers'];
const gradientOptions = [
  'from-cyan-400 to-blue-500',
  'from-blue-400 to-purple-500',
  'from-green-400 to-cyan-500',
  'from-emerald-400 to-cyan-500',
  'from-orange-400 to-red-500',
  'from-yellow-400 to-orange-500',
  'from-purple-400 to-pink-500',
  'from-slate-400 to-slate-600',
  'from-cyan-400 to-teal-500',
  'from-pink-400 to-rose-500',
];

interface EditableMember extends TeamMember {
  education?: TeamMemberEducation[];
}

function ArrayEditor({ 
  label, 
  items, 
  onChange, 
  placeholder 
}: { 
  label: string; 
  items: string[]; 
  onChange: (items: string[]) => void; 
  placeholder: string;
}) {
  const [newItem, setNewItem] = useState('');

  const addItem = () => {
    if (newItem.trim()) {
      onChange([...items, newItem.trim()]);
      setNewItem('');
    }
  };

  const removeItem = (index: number) => {
    onChange(items.filter((_, i) => i !== index));
  };

  const updateItem = (index: number, value: string) => {
    const updated = [...items];
    updated[index] = value;
    onChange(updated);
  };

  return (
    <div className="space-y-2">
      <label className="text-sm text-slate-400">{label}</label>
      <div className="space-y-2">
        {items.map((item, index) => (
          <div key={index} className="flex gap-2">
            <input
              type="text"
              value={item}
              onChange={(e) => updateItem(index, e.target.value)}
              className="flex-1 px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white text-sm focus:outline-none focus:border-cyan-500"
            />
            <button
              onClick={() => removeItem(index)}
              className="p-2 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
        <div className="flex gap-2">
          <input
            type="text"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addItem()}
            placeholder={placeholder}
            className="flex-1 px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white text-sm placeholder:text-slate-500 focus:outline-none focus:border-cyan-500"
          />
          <button
            onClick={addItem}
            className="px-3 py-2 bg-cyan-500/20 text-cyan-400 rounded-lg hover:bg-cyan-500/30 transition-colors"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

function EducationEditor({
  memberId,
  education,
  onUpdate
}: {
  memberId: string;
  education: TeamMemberEducation[];
  onUpdate: () => void;
}) {
  const [showAdd, setShowAdd] = useState(false);
  const [newEdu, setNewEdu] = useState({
    degree: '',
    institution: '',
    year_start: '',
    year_end: ''
  });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editData, setEditData] = useState<Partial<TeamMemberEducation>>({});
  const [eduList, setEduList] = useState(education);

  const handleAdd = async () => {
    if (!newEdu.degree.trim()) {
      toast.error('Degree/Certificate is required');
      return;
    }

    const result = await createTeamMemberEducation({
      team_member_id: memberId,
      degree: newEdu.degree,
      institution: newEdu.institution || null,
      year_start: newEdu.year_start ? parseInt(newEdu.year_start) : null,
      year_end: newEdu.year_end ? parseInt(newEdu.year_end) : null,
      display_order: (education.length || 0) + 1
    });

    if (result.success) {
      toast.success('Education added');
      setNewEdu({ degree: '', institution: '', year_start: '', year_end: '' });
      setShowAdd(false);
      onUpdate();
    } else {
      toast.error(result.error || 'Failed to add education');
    }
  };

  const handleMoveUp = async (index: number) => {
    if (index === 0) return;
    const newOrder = [...eduList];
    [newOrder[index], newOrder[index - 1]] = [newOrder[index - 1], newOrder[index]];
    setEduList(newOrder);
    await reorderEducation(newOrder);
    toast.success('Order updated');
    onUpdate();
  };

  const handleMoveDown = async (index: number) => {
    if (index === eduList.length - 1) return;
    const newOrder = [...eduList];
    [newOrder[index], newOrder[index + 1]] = [newOrder[index + 1], newOrder[index]];
    setEduList(newOrder);
    await reorderEducation(newOrder);
    toast.success('Order updated');
    onUpdate();
  };

  const handleUpdate = async (id: string) => {
    const result = await updateTeamMemberEducation(id, editData);
    if (result.success) {
      toast.success('Education updated');
      setEditingId(null);
      onUpdate();
    } else {
      toast.error(result.error || 'Failed to update');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this education entry?')) return;
    const result = await deleteTeamMemberEducation(id);
    if (result.success) {
      toast.success('Education deleted');
      onUpdate();
    } else {
      toast.error(result.error || 'Failed to delete');
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-sm text-slate-400 flex items-center gap-2">
          <GraduationCap className="w-4 h-4" />
          Education
        </label>
        <button
          onClick={() => setShowAdd(!showAdd)}
          className="text-xs px-2 py-1 bg-cyan-500/20 text-cyan-400 rounded hover:bg-cyan-500/30 transition-colors"
        >
          {showAdd ? 'Cancel' : '+ Add'}
        </button>
      </div>

      {showAdd && (
        <div className="p-3 bg-slate-800/50 rounded-lg space-y-2 border border-slate-700">
          <input
            type="text"
            value={newEdu.degree}
            onChange={(e) => setNewEdu({ ...newEdu, degree: e.target.value })}
            placeholder="Degree / Certificate *"
            className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white text-sm focus:outline-none focus:border-cyan-500"
          />
          <input
            type="text"
            value={newEdu.institution}
            onChange={(e) => setNewEdu({ ...newEdu, institution: e.target.value })}
            placeholder="Institution / University"
            className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white text-sm focus:outline-none focus:border-cyan-500"
          />
          <div className="grid grid-cols-2 gap-2">
            <input
              type="number"
              value={newEdu.year_start}
              onChange={(e) => setNewEdu({ ...newEdu, year_start: e.target.value })}
              placeholder="Start Year"
              className="px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white text-sm focus:outline-none focus:border-cyan-500"
            />
            <input
              type="number"
              value={newEdu.year_end}
              onChange={(e) => setNewEdu({ ...newEdu, year_end: e.target.value })}
              placeholder="End Year"
              className="px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white text-sm focus:outline-none focus:border-cyan-500"
            />
          </div>
          <button
            onClick={handleAdd}
            className="w-full py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors text-sm"
          >
            Add Education
          </button>
        </div>
      )}

      {eduList.map((edu, index) => (
        <div key={edu.id} className="p-3 bg-slate-800/30 rounded-lg border border-slate-700/50">
          {editingId === edu.id ? (
            <div className="space-y-2">
              <input
                type="text"
                value={editData.degree || ''}
                onChange={(e) => setEditData({ ...editData, degree: e.target.value })}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white text-sm focus:outline-none focus:border-cyan-500"
              />
              <input
                type="text"
                value={editData.institution || ''}
                onChange={(e) => setEditData({ ...editData, institution: e.target.value })}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white text-sm focus:outline-none focus:border-cyan-500"
              />
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="number"
                  value={editData.year_start || ''}
                  onChange={(e) => setEditData({ ...editData, year_start: e.target.value ? parseInt(e.target.value) : null })}
                  className="px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white text-sm focus:outline-none focus:border-cyan-500"
                />
                <input
                  type="number"
                  value={editData.year_end || ''}
                  onChange={(e) => setEditData({ ...editData, year_end: e.target.value ? parseInt(e.target.value) : null })}
                  className="px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white text-sm focus:outline-none focus:border-cyan-500"
                />
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleUpdate(edu.id)}
                  className="flex-1 py-1 bg-cyan-500 text-white rounded text-sm hover:bg-cyan-600"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditingId(null)}
                  className="px-3 py-1 text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-start justify-between">
              <div>
                <p className="text-white font-medium text-sm">{edu.degree}</p>
                {edu.institution && <p className="text-slate-400 text-xs">{edu.institution}</p>}
                {(edu.year_start || edu.year_end) && (
                  <p className="text-slate-500 text-xs">
                    {edu.year_start || '?'} - {edu.year_end || 'Present'}
                  </p>
                )}
              </div>
              <div className="flex gap-1">
                {index > 0 && (
                  <button
                    onClick={() => handleMoveUp(index)}
                    className="p-1 text-purple-400 hover:bg-purple-500/20 rounded transition-colors"
                    title="Move up"
                  >
                    <ArrowUp className="w-3 h-3" />
                  </button>
                )}
                {index < eduList.length - 1 && (
                  <button
                    onClick={() => handleMoveDown(index)}
                    className="p-1 text-purple-400 hover:bg-purple-500/20 rounded transition-colors"
                    title="Move down"
                  >
                    <ArrowDown className="w-3 h-3" />
                  </button>
                )}
                <button
                  onClick={() => {
                    setEditingId(edu.id);
                    setEditData(edu);
                  }}
                  className="p-1 text-cyan-400 hover:bg-cyan-500/20 rounded transition-colors"
                >
                  <Edit2 className="w-3 h-3" />
                </button>
                <button
                  onClick={() => handleDelete(edu.id)}
                  className="p-1 text-red-400 hover:bg-red-500/20 rounded transition-colors"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            </div>
          )}
        </div>
      ))}

      {education.length === 0 && !showAdd && (
        <p className="text-slate-500 text-xs italic">No education entries yet</p>
      )}
    </div>
  );
}

export function TeamAdmin() {
  const [members, setMembers] = useState<EditableMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedMember, setExpandedMember] = useState<string | null>(null);
  const [editingMember, setEditingMember] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [removeMode, setRemoveMode] = useState(false);
  const [selectedForRemoval, setSelectedForRemoval] = useState<string[]>([]);
  const [newMember, setNewMember] = useState({
    name: '',
    role: '',
    title: '',
    responsibility: '',
    philosophy: '',
    image_url: '',
    icon_name: 'User',
    gradient_colors: 'from-cyan-400 to-blue-500',
    linkedin_url: '',
    email: '',
    display_order: 0,
    is_active: true,
    bio: '',
    skills: [] as string[],
    achievements: [] as string[],
    experience: '',
    team_categories: [] as string[]
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    const data = await getAllTeamMembers();
    const membersWithEducation = await Promise.all(
      data.map(async (member) => {
        const education = await getTeamMemberEducation(member.id);
        return {
          ...member,
          bio: member.bio || '',
          skills: member.skills || [],
          achievements: member.achievements || [],
          experience: member.experience || '',
          education
        };
      })
    );
    setMembers(membersWithEducation);
    setIsLoading(false);
  };

  const refreshMemberEducation = async (memberId: string) => {
    const education = await getTeamMemberEducation(memberId);
    setMembers(members.map(m => m.id === memberId ? { ...m, education } : m));
  };

  const handleSaveMember = async (member: EditableMember) => {
    const { education, ...memberData } = member;
    const result = await updateTeamMember(member.id, memberData);
    
    if (result.success) {
      toast.success('Team member updated successfully!');
      setEditingMember(null);
    } else {
      toast.error(result.error || 'Failed to update team member');
    }
  };

  const handleAddMember = async () => {
    const result = await createTeamMember({
      ...newMember,
      display_order: members.length + 1,
    } as Omit<TeamMember, 'id'>);
    
    if (result.success) {
      toast.success('Team member added successfully!');
      setShowAddForm(false);
      setNewMember({
        name: '',
        role: '',
        title: '',
        responsibility: '',
        philosophy: '',
        image_url: '',
        icon_name: 'User',
        gradient_colors: 'from-cyan-400 to-blue-500',
        linkedin_url: '',
        email: '',
        display_order: 0,
        is_active: true,
        bio: '',
        skills: [],
        achievements: [],
        experience: '',
        team_categories: []
      });
      fetchData();
    } else {
      toast.error(result.error || 'Failed to add team member');
    }
  };

  const handleDeleteMember = async (id: string) => {
    if (!confirm('Are you sure you want to delete this team member?')) return;
    
    const result = await deleteTeamMember(id);
    if (result.success) {
      toast.success('Team member deleted successfully!');
      fetchData();
    } else {
      toast.error(result.error || 'Failed to delete team member');
    }
  };

  const toggleRemoveMode = () => {
    setRemoveMode(!removeMode);
    setSelectedForRemoval([]);
  };

  const toggleSelectMember = (id: string) => {
    if (selectedForRemoval.includes(id)) {
      setSelectedForRemoval(selectedForRemoval.filter(mId => mId !== id));
    } else {
      setSelectedForRemoval([...selectedForRemoval, id]);
    }
  };

  const handleRemoveSelected = async () => {
    if (selectedForRemoval.length === 0) {
      toast.error('Please select team members to remove');
      return;
    }
    
    if (!confirm(`Are you sure you want to delete ${selectedForRemoval.length} team member(s)?`)) return;
    
    let successCount = 0;
    for (const id of selectedForRemoval) {
      const result = await deleteTeamMember(id);
      if (result.success) successCount++;
    }
    
    if (successCount > 0) {
      toast.success(`${successCount} team member(s) removed successfully!`);
      setRemoveMode(false);
      setSelectedForRemoval([]);
      fetchData();
    } else {
      toast.error('Failed to remove team members');
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
            <h1 className="text-3xl font-bold text-white">Team Members</h1>
            <p className="text-slate-400 mt-1">Manage your team section with full profile details</p>
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
                  Remove Member
                </button>
                <button
                  onClick={() => setShowAddForm(true)}
                  className="flex items-center gap-2 px-6 py-3 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Add Member
                </button>
              </>
            )}
          </div>
        </div>

        {showAddForm && (
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 mb-6">
            <h2 className="text-lg font-semibold text-white mb-4">Add New Team Member</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  value={newMember.name}
                  onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                  placeholder="Name"
                  className="px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder:text-slate-400 focus:outline-none focus:border-cyan-500"
                />
                <input
                  type="text"
                  value={newMember.role}
                  onChange={(e) => setNewMember({ ...newMember, role: e.target.value })}
                  placeholder="Role (e.g., Founder & CEO)"
                  className="px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder:text-slate-400 focus:outline-none focus:border-cyan-500"
                />
              </div>
              <input
                type="text"
                value={newMember.title}
                onChange={(e) => setNewMember({ ...newMember, title: e.target.value })}
                placeholder="Title (e.g., Chief Executive Officer)"
                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder:text-slate-400 focus:outline-none focus:border-cyan-500"
              />
              <textarea
                value={newMember.responsibility}
                onChange={(e) => setNewMember({ ...newMember, responsibility: e.target.value })}
                placeholder="Responsibility"
                rows={2}
                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder:text-slate-400 focus:outline-none focus:border-cyan-500 resize-none"
              />
              <input
                type="text"
                value={newMember.philosophy}
                onChange={(e) => setNewMember({ ...newMember, philosophy: e.target.value })}
                placeholder="Philosophy / Tagline"
                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder:text-slate-400 focus:outline-none focus:border-cyan-500"
              />
              
              <div className="border-t border-slate-700 pt-4 mt-4">
                <h3 className="text-sm font-medium text-cyan-400 mb-3">Profile Details</h3>
                <textarea
                  value={newMember.bio}
                  onChange={(e) => setNewMember({ ...newMember, bio: e.target.value })}
                  placeholder="About / Bio"
                  rows={3}
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder:text-slate-400 focus:outline-none focus:border-cyan-500 resize-none mb-4"
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <ArrayEditor
                    label="Core Skills"
                    items={newMember.skills}
                    onChange={(skills) => setNewMember({ ...newMember, skills })}
                    placeholder="Add a skill..."
                  />
                  <ArrayEditor
                    label="Key Achievements"
                    items={newMember.achievements}
                    onChange={(achievements) => setNewMember({ ...newMember, achievements })}
                    placeholder="Add an achievement..."
                  />
                </div>
                <textarea
                  value={newMember.experience}
                  onChange={(e) => setNewMember({ ...newMember, experience: e.target.value })}
                  placeholder="Experience summary"
                  rows={2}
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder:text-slate-400 focus:outline-none focus:border-cyan-500 resize-none mt-4"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <select
                  value={newMember.icon_name}
                  onChange={(e) => setNewMember({ ...newMember, icon_name: e.target.value })}
                  className="px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-cyan-500"
                >
                  {iconOptions.map(icon => (
                    <option key={icon} value={icon}>{icon}</option>
                  ))}
                </select>
                <select
                  value={newMember.gradient_colors}
                  onChange={(e) => setNewMember({ ...newMember, gradient_colors: e.target.value })}
                  className="px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-cyan-500"
                >
                  {gradientOptions.map(gradient => (
                    <option key={gradient} value={gradient}>{gradient}</option>
                  ))}
                </select>
              </div>
              <input
                type="text"
                value={newMember.image_url || ''}
                onChange={(e) => setNewMember({ ...newMember, image_url: e.target.value })}
                placeholder="Image URL (e.g., /images/team/name.png)"
                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder:text-slate-400 focus:outline-none focus:border-cyan-500"
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  value={newMember.linkedin_url || ''}
                  onChange={(e) => setNewMember({ ...newMember, linkedin_url: e.target.value })}
                  placeholder="LinkedIn URL (optional)"
                  className="px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder:text-slate-400 focus:outline-none focus:border-cyan-500"
                />
                <input
                  type="email"
                  value={newMember.email || ''}
                  onChange={(e) => setNewMember({ ...newMember, email: e.target.value })}
                  placeholder="Email (optional)"
                  className="px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder:text-slate-400 focus:outline-none focus:border-cyan-500"
                />
              </div>
              
              <div className="border-t border-slate-700 pt-4 mt-4">
                <h3 className="text-sm font-medium text-cyan-400 mb-3">Team Categories</h3>
                <div className="space-y-2">
                  {['Leadership & Active Operations', 'Core Engineering', 'Operations & Creative'].map((category) => (
                    <label key={category} className="flex items-center gap-3 text-slate-300">
                      <input
                        type="checkbox"
                        checked={newMember.team_categories?.includes(category) || false}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setNewMember({ ...newMember, team_categories: [...(newMember.team_categories || []), category] });
                          } else {
                            setNewMember({ ...newMember, team_categories: (newMember.team_categories || []).filter(c => c !== category) });
                          }
                        }}
                        className="w-4 h-4 rounded border-slate-600 bg-slate-700 cursor-pointer"
                      />
                      {category}
                    </label>
                  ))}
                </div>
              </div>
              
              <div className="flex gap-2 justify-end">
                <button
                  onClick={() => setShowAddForm(false)}
                  className="px-4 py-2 text-slate-400 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddMember}
                  className="px-6 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors"
                >
                  Add Member
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-4">
          {members.map((member) => (
            <div 
              key={member.id} 
              className={`bg-slate-900 border rounded-xl overflow-hidden transition-all ${
                removeMode && selectedForRemoval.includes(member.id) 
                  ? 'border-red-500 bg-red-500/10' 
                  : 'border-slate-800'
              }`}
            >
              <div 
                className="flex items-center justify-between p-4 cursor-pointer hover:bg-slate-800/50 transition-colors"
                onClick={() => removeMode ? toggleSelectMember(member.id) : setExpandedMember(expandedMember === member.id ? null : member.id)}
              >
                <div className="flex items-center gap-4">
                  {removeMode && (
                    <div className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-all ${
                      selectedForRemoval.includes(member.id) 
                        ? 'border-red-500 bg-red-500' 
                        : 'border-slate-500'
                    }`}>
                      {selectedForRemoval.includes(member.id) && (
                        <Check className="w-4 h-4 text-white" />
                      )}
                    </div>
                  )}
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${member.gradient_colors} flex items-center justify-center text-white font-bold`}>
                    {member.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                  </div>
                  <div>
                    <h3 className="text-white font-medium">{member.name}</h3>
                    <p className="text-slate-400 text-sm">{member.role}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {!member.is_active && (
                    <span className="text-xs px-2 py-1 rounded bg-yellow-500/20 text-yellow-400">Inactive</span>
                  )}
                  {!removeMode && (
                    expandedMember === member.id ? (
                      <ChevronUp className="w-5 h-5 text-slate-400" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-slate-400" />
                    )
                  )}
                </div>
              </div>

              {expandedMember === member.id && (
                <div className="border-t border-slate-800 p-4">
                  {editingMember === member.id ? (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                          type="text"
                          value={member.name}
                          onChange={(e) => setMembers(members.map(m => m.id === member.id ? { ...m, name: e.target.value } : m))}
                          placeholder="Name"
                          className="px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-cyan-500"
                        />
                        <input
                          type="text"
                          value={member.role}
                          onChange={(e) => setMembers(members.map(m => m.id === member.id ? { ...m, role: e.target.value } : m))}
                          placeholder="Role"
                          className="px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-cyan-500"
                        />
                      </div>
                      <input
                        type="text"
                        value={member.title}
                        onChange={(e) => setMembers(members.map(m => m.id === member.id ? { ...m, title: e.target.value } : m))}
                        placeholder="Title"
                        className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-cyan-500"
                      />
                      <textarea
                        value={member.responsibility}
                        onChange={(e) => setMembers(members.map(m => m.id === member.id ? { ...m, responsibility: e.target.value } : m))}
                        placeholder="Responsibility"
                        rows={2}
                        className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-cyan-500 resize-none"
                      />
                      <input
                        type="text"
                        value={member.philosophy}
                        onChange={(e) => setMembers(members.map(m => m.id === member.id ? { ...m, philosophy: e.target.value } : m))}
                        placeholder="Philosophy"
                        className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-cyan-500"
                      />

                      <div className="border-t border-slate-700 pt-4 mt-4">
                        <h3 className="text-sm font-medium text-cyan-400 mb-3">Profile Details (shown on member page)</h3>
                        
                        <div className="space-y-4">
                          <div>
                            <label className="text-sm text-slate-400 mb-1 block">About / Bio</label>
                            <textarea
                              value={member.bio || ''}
                              onChange={(e) => setMembers(members.map(m => m.id === member.id ? { ...m, bio: e.target.value } : m))}
                              placeholder="Write a bio for this team member..."
                              rows={3}
                              className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder:text-slate-400 focus:outline-none focus:border-cyan-500 resize-none"
                            />
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <ArrayEditor
                              label="Core Skills"
                              items={member.skills || []}
                              onChange={(skills) => setMembers(members.map(m => m.id === member.id ? { ...m, skills } : m))}
                              placeholder="Add a skill..."
                            />
                            <ArrayEditor
                              label="Key Achievements"
                              items={member.achievements || []}
                              onChange={(achievements) => setMembers(members.map(m => m.id === member.id ? { ...m, achievements } : m))}
                              placeholder="Add an achievement..."
                            />
                          </div>

                          <div>
                            <label className="text-sm text-slate-400 mb-1 block">Experience</label>
                            <textarea
                              value={member.experience || ''}
                              onChange={(e) => setMembers(members.map(m => m.id === member.id ? { ...m, experience: e.target.value } : m))}
                              placeholder="Experience summary..."
                              rows={2}
                              className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder:text-slate-400 focus:outline-none focus:border-cyan-500 resize-none"
                            />
                          </div>

                          <EducationEditor
                            memberId={member.id}
                            education={member.education || []}
                            onUpdate={() => refreshMemberEducation(member.id)}
                          />
                        </div>
                      </div>

                      <div className="border-t border-slate-700 pt-4 mt-4">
                        <h3 className="text-sm font-medium text-cyan-400 mb-3">Team Categories</h3>
                        <div className="space-y-2">
                          {['Leadership & Active Operations', 'Core Engineering', 'Operations & Creative'].map((category) => (
                            <label key={category} className="flex items-center gap-3 text-slate-300">
                              <input
                                type="checkbox"
                                checked={member.team_categories?.includes(category) || false}
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    setMembers(members.map(m => m.id === member.id ? { ...m, team_categories: [...(m.team_categories || []), category] } : m));
                                  } else {
                                    setMembers(members.map(m => m.id === member.id ? { ...m, team_categories: (m.team_categories || []).filter(c => c !== category) } : m));
                                  }
                                }}
                                className="w-4 h-4 rounded border-slate-600 bg-slate-700 cursor-pointer"
                              />
                              {category}
                            </label>
                          ))}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <select
                          value={member.icon_name}
                          onChange={(e) => setMembers(members.map(m => m.id === member.id ? { ...m, icon_name: e.target.value } : m))}
                          className="px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-cyan-500"
                        >
                          {iconOptions.map(icon => (
                            <option key={icon} value={icon}>{icon}</option>
                          ))}
                        </select>
                        <select
                          value={member.gradient_colors}
                          onChange={(e) => setMembers(members.map(m => m.id === member.id ? { ...m, gradient_colors: e.target.value } : m))}
                          className="px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-cyan-500"
                        >
                          {gradientOptions.map(gradient => (
                            <option key={gradient} value={gradient}>{gradient}</option>
                          ))}
                        </select>
                      </div>
                      <input
                        type="text"
                        value={member.image_url || ''}
                        onChange={(e) => setMembers(members.map(m => m.id === member.id ? { ...m, image_url: e.target.value } : m))}
                        placeholder="Image URL"
                        className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder:text-slate-400 focus:outline-none focus:border-cyan-500"
                      />
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                          type="text"
                          value={member.linkedin_url || ''}
                          onChange={(e) => setMembers(members.map(m => m.id === member.id ? { ...m, linkedin_url: e.target.value } : m))}
                          placeholder="LinkedIn URL"
                          className="px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder:text-slate-400 focus:outline-none focus:border-cyan-500"
                        />
                        <input
                          type="email"
                          value={member.email || ''}
                          onChange={(e) => setMembers(members.map(m => m.id === member.id ? { ...m, email: e.target.value } : m))}
                          placeholder="Email"
                          className="px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder:text-slate-400 focus:outline-none focus:border-cyan-500"
                        />
                      </div>
                      <label className="flex items-center gap-2 text-slate-300">
                        <input
                          type="checkbox"
                          checked={member.is_active}
                          onChange={(e) => setMembers(members.map(m => m.id === member.id ? { ...m, is_active: e.target.checked } : m))}
                          className="w-4 h-4 rounded border-slate-600 bg-slate-700"
                        />
                        Active
                      </label>
                      <div className="flex gap-2 justify-end">
                        <button
                          onClick={() => setEditingMember(null)}
                          className="px-4 py-2 text-slate-400 hover:text-white transition-colors"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => handleSaveMember(member)}
                          className="px-6 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors flex items-center gap-2"
                        >
                          <Save className="w-4 h-4" />
                          Save Changes
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <p className="text-slate-300 mb-1"><span className="text-slate-500">Title:</span> {member.title}</p>
                      <p className="text-slate-300 mb-1"><span className="text-slate-500">Responsibility:</span> {member.responsibility}</p>
                      <p className="text-slate-400 italic mb-4">"{member.philosophy}"</p>
                      
                      {member.bio && (
                        <p className="text-slate-300 mb-2"><span className="text-slate-500">Bio:</span> {member.bio.substring(0, 100)}...</p>
                      )}
                      {member.skills && member.skills.length > 0 && (
                        <p className="text-slate-300 mb-2">
                          <span className="text-slate-500">Skills:</span>{' '}
                          {member.skills.slice(0, 3).join(', ')}{member.skills.length > 3 ? '...' : ''}
                        </p>
                      )}
                      {member.education && member.education.length > 0 && (
                        <p className="text-slate-300 mb-2">
                          <span className="text-slate-500">Education:</span>{' '}
                          {member.education.length} entries
                        </p>
                      )}
                      
                      <div className="flex gap-2 mt-4">
                        <button
                          onClick={() => setEditingMember(member.id)}
                          className="flex items-center gap-2 px-4 py-2 bg-cyan-500/20 text-cyan-400 rounded-lg hover:bg-cyan-500/30 transition-colors"
                        >
                          <Edit2 className="w-4 h-4" />
                          Edit Full Profile
                        </button>
                        <button
                          onClick={() => handleDeleteMember(member.id)}
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

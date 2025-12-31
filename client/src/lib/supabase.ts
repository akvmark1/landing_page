import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || import.meta.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || import.meta.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl || '', supabaseAnonKey || '');

export interface HeroSection {
  id: string;
  company_name: string;
  tagline: string;
  main_heading: string;
  sub_heading: string;
  typewriter_texts: string[];
  cta_button_text: string;
  cta_button_link: string;
  is_active: boolean;
  updated_at: string;
}

export interface AboutSection {
  id: string;
  section_label: string;
  title: string;
  title_highlight: string;
  description: string;
  is_active: boolean;
  updated_at: string;
}

export interface AboutValue {
  id: string;
  title: string;
  description: string;
  icon_name: string;
  display_order: number;
  is_active: boolean;
}

export interface Mentor {
  id: string;
  name: string;
  role: string;
  expertise: string[];
  description: string;
  quote: string;
  image_url: string | null;
  color: string;
  secondary_color: string;
  icon_name: string;
  linkedin_url: string | null;
  display_order: number;
  is_active: boolean;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  title: string;
  responsibility: string;
  philosophy: string;
  image_url: string | null;
  icon_name: string;
  gradient_colors: string;
  linkedin_url: string | null;
  email: string | null;
  display_order: number;
  is_active: boolean;
  bio: string | null;
  skills: string[] | null;
  achievements: string[] | null;
  experience: string | null;
  team_categories: string[] | null;
}

export interface TeamMemberEducation {
  id: string;
  team_member_id: string;
  degree: string;
  institution?: string | null;
  year_start?: number | null;
  year_end?: number | null;
  display_order?: number | null;
  created_at?: string;
}

export interface ContactSection {
  id: string;
  section_title: string;
  section_description: string;
  email: string;
  phone: string | null;
  whatsapp_link: string;
  address: string | null;
  button_1_text: string;
  button_1_link: string;
  button_2_text: string;
  button_2_link: string;
  button_3_text: string;
  button_3_link: string;
  is_active: boolean;
}

export interface FooterSection {
  id: string;
  company_name: string;
  company_suffix: string;
  company_description: string;
  incorporation_text: string;
  maps_url: string;
  embed_map_url: string;
  copyright_text: string | null;
  is_active: boolean;
}

export interface FooterLink {
  id: string;
  name: string;
  href: string;
  display_order: number;
  is_active: boolean;
}

export interface FooterSocialLink {
  id: string;
  platform: string;
  url: string;
  icon_name: string;
  display_order: number;
  is_active: boolean;
}

export interface NotifyEmail {
  id: string;
  email: string;
  created_at: string;
  is_notified: boolean;
  notified_at: string | null;
}

export async function saveEmailToNotifyList(email: string): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await supabase
      .from('notify_emails')
      .insert([{ email }]);

    if (error) {
      console.error('Error saving email:', error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err) {
    console.error('Unexpected error:', err);
    return { success: false, error: 'An unexpected error occurred' };
  }
}

export async function getHeroSection(): Promise<HeroSection | null> {
  const { data, error } = await supabase
    .from('hero_section')
    .select('*')
    .eq('is_active', true)
    .single();
  
  if (error) {
    console.error('Error fetching hero section:', error);
    return null;
  }
  return data;
}

export async function getAboutSection(): Promise<AboutSection | null> {
  const { data, error } = await supabase
    .from('about_section')
    .select('*')
    .eq('is_active', true)
    .single();
  
  if (error) {
    console.error('Error fetching about section:', error);
    return null;
  }
  return data;
}

export async function getAboutValues(): Promise<AboutValue[]> {
  const { data, error } = await supabase
    .from('about_values')
    .select('*')
    .eq('is_active', true)
    .order('display_order');
  
  if (error) {
    console.error('Error fetching about values:', error);
    return [];
  }
  return data || [];
}

export async function getMentors(): Promise<Mentor[]> {
  const { data, error } = await supabase
    .from('mentors')
    .select('*')
    .eq('is_active', true)
    .order('display_order');
  
  if (error) {
    console.error('Error fetching mentors:', error);
    return [];
  }
  return data || [];
}

export async function getTeamMembers(): Promise<TeamMember[]> {
  const { data, error } = await supabase
    .from('team_members')
    .select('*')
    .eq('is_active', true)
    .order('display_order');
  
  if (error) {
    console.error('Error fetching team members:', error);
    return [];
  }
  return data || [];
}

export async function getTeamMemberById(id: string): Promise<TeamMember | null> {
  const { data, error } = await supabase
    .from('team_members')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) {
    console.error('Error fetching team member:', error);
    return null;
  }
  return data || null;
}

export async function getTeamMemberEducation(teamMemberId: string): Promise<TeamMemberEducation[]> {
  const { data, error } = await supabase
    .from('team_member_education')
    .select('*')
    .eq('team_member_id', teamMemberId)
    .order('display_order', { ascending: true, nullsFirst: false });
  
  if (error) {
    console.error('Error fetching team member education:', error);
    return [];
  }
  return (data as TeamMemberEducation[]) || [];
}

export async function createTeamMemberEducation(education: Omit<TeamMemberEducation, 'id'>): Promise<{ success: boolean; error?: string; data?: TeamMemberEducation }> {
  const { data, error } = await supabase
    .from('team_member_education')
    .insert([education])
    .select()
    .single();
  
  if (error) {
    return { success: false, error: error.message };
  }
  return { success: true, data };
}

export async function updateTeamMemberEducation(id: string, updates: Partial<TeamMemberEducation>): Promise<{ success: boolean; error?: string }> {
  const { error } = await supabase
    .from('team_member_education')
    .update(updates)
    .eq('id', id);
  
  if (error) {
    return { success: false, error: error.message };
  }
  return { success: true };
}

export async function deleteTeamMemberEducation(id: string): Promise<{ success: boolean; error?: string }> {
  const { error } = await supabase
    .from('team_member_education')
    .delete()
    .eq('id', id);
  
  if (error) {
    return { success: false, error: error.message };
  }
  return { success: true };
}

export async function reorderEducation(educationList: TeamMemberEducation[]): Promise<{ success: boolean; error?: string }> {
  const updates = educationList.map((edu, index) => ({
    id: edu.id,
    display_order: index + 1
  }));

  for (const update of updates) {
    const { error } = await supabase
      .from('team_member_education')
      .update({ display_order: update.display_order })
      .eq('id', update.id);
    
    if (error) {
      return { success: false, error: error.message };
    }
  }
  return { success: true };
}

export async function getContactSection(): Promise<ContactSection | null> {
  const { data, error } = await supabase
    .from('contact_section')
    .select('*')
    .eq('is_active', true)
    .limit(1);
  
  if (error) {
    console.error('Error fetching contact section:', error);
    return null;
  }
  return data && data.length > 0 ? data[0] : null;
}

export async function getFooterSection(): Promise<FooterSection | null> {
  const { data, error } = await supabase
    .from('footer_section')
    .select('*')
    .eq('is_active', true)
    .limit(1);
  
  if (error) {
    console.error('Error fetching footer section:', error);
    return null;
  }
  return data && data.length > 0 ? data[0] : null;
}

export async function getFooterLinks(): Promise<FooterLink[]> {
  const { data, error } = await supabase
    .from('footer_links')
    .select('*')
    .eq('is_active', true)
    .order('display_order');
  
  if (error) {
    console.error('Error fetching footer links:', error);
    return [];
  }
  return data || [];
}

export async function getFooterSocialLinks(): Promise<FooterSocialLink[]> {
  const { data, error } = await supabase
    .from('footer_social_links')
    .select('*')
    .eq('is_active', true)
    .order('display_order');
  
  if (error) {
    console.error('Error fetching footer social links:', error);
    return [];
  }
  return data || [];
}

export async function getNotifyEmails(): Promise<NotifyEmail[]> {
  const { data, error } = await supabase
    .from('notify_emails')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error('Error fetching notify emails:', error);
    return [];
  }
  return data || [];
}

export async function updateHeroSection(id: string, updates: Partial<HeroSection>): Promise<{ success: boolean; error?: string }> {
  const { error } = await supabase
    .from('hero_section')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id);
  
  if (error) {
    return { success: false, error: error.message };
  }
  return { success: true };
}

export async function updateAboutSection(id: string, updates: Partial<AboutSection>): Promise<{ success: boolean; error?: string }> {
  const { error } = await supabase
    .from('about_section')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id);
  
  if (error) {
    return { success: false, error: error.message };
  }
  return { success: true };
}

export async function updateAboutValue(id: string, updates: Partial<AboutValue>): Promise<{ success: boolean; error?: string }> {
  const { error } = await supabase
    .from('about_values')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id);
  
  if (error) {
    return { success: false, error: error.message };
  }
  return { success: true };
}

export async function createAboutValue(value: Omit<AboutValue, 'id'>): Promise<{ success: boolean; error?: string }> {
  const { error } = await supabase
    .from('about_values')
    .insert([value]);
  
  if (error) {
    return { success: false, error: error.message };
  }
  return { success: true };
}

export async function deleteAboutValue(id: string): Promise<{ success: boolean; error?: string }> {
  const { error } = await supabase
    .from('about_values')
    .delete()
    .eq('id', id);
  
  if (error) {
    return { success: false, error: error.message };
  }
  return { success: true };
}

export async function updateMentor(id: string, updates: Partial<Mentor>): Promise<{ success: boolean; error?: string }> {
  const { error } = await supabase
    .from('mentors')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id);
  
  if (error) {
    return { success: false, error: error.message };
  }
  return { success: true };
}

export async function createMentor(mentor: Omit<Mentor, 'id'>): Promise<{ success: boolean; error?: string }> {
  const { error } = await supabase
    .from('mentors')
    .insert([mentor]);
  
  if (error) {
    return { success: false, error: error.message };
  }
  return { success: true };
}

export async function deleteMentor(id: string): Promise<{ success: boolean; error?: string }> {
  const { error } = await supabase
    .from('mentors')
    .delete()
    .eq('id', id);
  
  if (error) {
    return { success: false, error: error.message };
  }
  return { success: true };
}

export async function updateTeamMember(id: string, updates: Partial<TeamMember>): Promise<{ success: boolean; error?: string }> {
  const { error } = await supabase
    .from('team_members')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id);
  
  if (error) {
    return { success: false, error: error.message };
  }
  return { success: true };
}

export async function createTeamMember(member: Omit<TeamMember, 'id'>): Promise<{ success: boolean; error?: string }> {
  const { error } = await supabase
    .from('team_members')
    .insert([member]);
  
  if (error) {
    return { success: false, error: error.message };
  }
  return { success: true };
}

export async function deleteTeamMember(id: string): Promise<{ success: boolean; error?: string }> {
  const { error } = await supabase
    .from('team_members')
    .delete()
    .eq('id', id);
  
  if (error) {
    return { success: false, error: error.message };
  }
  return { success: true };
}

export async function updateContactSection(id: string, updates: Partial<ContactSection>): Promise<{ success: boolean; error?: string }> {
  const { error } = await supabase
    .from('contact_section')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id);
  
  if (error) {
    return { success: false, error: error.message };
  }
  return { success: true };
}

export async function updateFooterSection(id: string, updates: Partial<FooterSection>): Promise<{ success: boolean; error?: string }> {
  const { error } = await supabase
    .from('footer_section')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id);
  
  if (error) {
    return { success: false, error: error.message };
  }
  return { success: true };
}

export async function updateFooterLink(id: string, updates: Partial<FooterLink>): Promise<{ success: boolean; error?: string }> {
  const { error } = await supabase
    .from('footer_links')
    .update(updates)
    .eq('id', id);
  
  if (error) {
    return { success: false, error: error.message };
  }
  return { success: true };
}

export async function createFooterLink(link: Omit<FooterLink, 'id'>): Promise<{ success: boolean; error?: string }> {
  const { error } = await supabase
    .from('footer_links')
    .insert([link]);
  
  if (error) {
    return { success: false, error: error.message };
  }
  return { success: true };
}

export async function deleteFooterLink(id: string): Promise<{ success: boolean; error?: string }> {
  const { error } = await supabase
    .from('footer_links')
    .delete()
    .eq('id', id);
  
  if (error) {
    return { success: false, error: error.message };
  }
  return { success: true };
}

export async function updateFooterSocialLink(id: string, updates: Partial<FooterSocialLink>): Promise<{ success: boolean; error?: string }> {
  const { error } = await supabase
    .from('footer_social_links')
    .update(updates)
    .eq('id', id);
  
  if (error) {
    return { success: false, error: error.message };
  }
  return { success: true };
}

export async function createFooterSocialLink(link: Omit<FooterSocialLink, 'id'>): Promise<{ success: boolean; error?: string }> {
  const { error } = await supabase
    .from('footer_social_links')
    .insert([link]);
  
  if (error) {
    return { success: false, error: error.message };
  }
  return { success: true };
}

export async function deleteFooterSocialLink(id: string): Promise<{ success: boolean; error?: string }> {
  const { error } = await supabase
    .from('footer_social_links')
    .delete()
    .eq('id', id);
  
  if (error) {
    return { success: false, error: error.message };
  }
  return { success: true };
}

export async function deleteNotifyEmail(id: string): Promise<{ success: boolean; error?: string }> {
  const { error } = await supabase
    .from('notify_emails')
    .delete()
    .eq('id', id);
  
  if (error) {
    return { success: false, error: error.message };
  }
  return { success: true };
}

export async function markEmailAsNotified(id: string): Promise<{ success: boolean; error?: string }> {
  const { error } = await supabase
    .from('notify_emails')
    .update({ is_notified: true, notified_at: new Date().toISOString() })
    .eq('id', id);
  
  if (error) {
    return { success: false, error: error.message };
  }
  return { success: true };
}

export async function getAllMentors(): Promise<Mentor[]> {
  const { data, error } = await supabase
    .from('mentors')
    .select('*')
    .order('display_order');
  
  if (error) {
    console.error('Error fetching all mentors:', error);
    return [];
  }
  return data || [];
}

export async function getAllTeamMembers(): Promise<TeamMember[]> {
  const { data, error } = await supabase
    .from('team_members')
    .select('*')
    .order('display_order');
  
  if (error) {
    console.error('Error fetching all team members:', error);
    return [];
  }
  return data || [];
}

export async function getAllAboutValues(): Promise<AboutValue[]> {
  const { data, error } = await supabase
    .from('about_values')
    .select('*')
    .order('display_order');
  
  if (error) {
    console.error('Error fetching all about values:', error);
    return [];
  }
  return data || [];
}

export async function getAllFooterLinks(): Promise<FooterLink[]> {
  const { data, error } = await supabase
    .from('footer_links')
    .select('*')
    .order('display_order');
  
  if (error) {
    console.error('Error fetching all footer links:', error);
    return [];
  }
  return data || [];
}

export async function getAllFooterSocialLinks(): Promise<FooterSocialLink[]> {
  const { data, error } = await supabase
    .from('footer_social_links')
    .select('*')
    .order('display_order');
  
  if (error) {
    console.error('Error fetching all footer social links:', error);
    return [];
  }
  return data || [];
}

export async function createContactSection(): Promise<{ success: boolean; data?: ContactSection; error?: string }> {
  const defaultData = {
    section_title: 'Ready to explore the future?',
    section_description: 'Join us on our mission to redefine what\'s possible in the skies.',
    email: 'assist.akashvahini@gmail.com',
    phone: null,
    whatsapp_link: 'https://chat.whatsapp.com/Gz8Gjofj6W96hKpPsg9qsC?mode=wwt',
    address: null,
    button_1_text: 'About Us',
    button_1_link: '#about',
    button_2_text: 'Meet the Team',
    button_2_link: 'mailto:assist.akashvahini@gmail.com',
    button_3_text: 'Join WhatsApp',
    button_3_link: 'https://chat.whatsapp.com/Gz8Gjofj6W96hKpPsg9qsC?mode=wwt',
    is_active: true
  };

  const { data, error } = await supabase
    .from('contact_section')
    .insert([defaultData])
    .select()
    .single();
  
  if (error) {
    console.error('Error creating contact section:', error);
    return { success: false, error: error.message };
  }
  return { success: true, data };
}

export async function createFooterSection(): Promise<{ success: boolean; data?: FooterSection; error?: string }> {
  const defaultData = {
    company_name: 'AkashVahini',
    company_suffix: 'Private Limited',
    company_description: 'Pioneering the future of aerial technology with innovative drone solutions. Engineering excellence for defense, agriculture, and industrial applications.',
    incorporation_text: 'Incorporated in India',
    maps_url: 'https://www.google.com/maps/place/22%C2%B014\'43.6%22N+84%C2%B048\'55.7%22E',
    embed_map_url: 'https://maps.google.com/maps?q=22.245454,84.815479&z=15&output=embed',
    copyright_text: null,
    is_active: true
  };

  const { data, error } = await supabase
    .from('footer_section')
    .insert([defaultData])
    .select()
    .single();
  
  if (error) {
    console.error('Error creating footer section:', error);
    return { success: false, error: error.message };
  }
  return { success: true, data };
}

export async function initializeDefaultFooterLinks(): Promise<{ success: boolean; error?: string }> {
  const defaultLinks = [
    { name: 'Home', href: '#hero', display_order: 1, is_active: true },
    { name: 'About Us', href: '#about', display_order: 2, is_active: true },
    { name: 'Products', href: '#products', display_order: 3, is_active: true },
    { name: 'Technology', href: '#technology', display_order: 4, is_active: true },
    { name: 'Contact', href: '#contact', display_order: 5, is_active: true }
  ];

  const { error } = await supabase
    .from('footer_links')
    .insert(defaultLinks);
  
  if (error) {
    console.error('Error creating default footer links:', error);
    return { success: false, error: error.message };
  }
  return { success: true };
}

export async function initializeDefaultFooterSocialLinks(): Promise<{ success: boolean; error?: string }> {
  const defaultSocialLinks = [
    { platform: 'LinkedIn', url: '#', icon_name: 'Linkedin', display_order: 1, is_active: true },
    { platform: 'X', url: '#', icon_name: 'X', display_order: 2, is_active: true },
    { platform: 'Instagram', url: '#', icon_name: 'Instagram', display_order: 3, is_active: true }
  ];

  const { error } = await supabase
    .from('footer_social_links')
    .insert(defaultSocialLinks);
  
  if (error) {
    console.error('Error creating default footer social links:', error);
    return { success: false, error: error.message };
  }
  return { success: true };
}

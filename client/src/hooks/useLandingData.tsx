import { useState, useEffect } from 'react';
import {
  getHeroSection,
  getAboutSection,
  getAboutValues,
  getMentors,
  getTeamMembers,
  getContactSection,
  getFooterSection,
  getFooterLinks,
  getFooterSocialLinks,
  HeroSection,
  AboutSection,
  AboutValue,
  Mentor,
  TeamMember,
  ContactSection,
  FooterSection,
  FooterLink,
  FooterSocialLink,
} from '../lib/supabase';

export function useHeroSection() {
  const [data, setData] = useState<HeroSection | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getHeroSection().then((result) => {
      setData(result);
      setIsLoading(false);
    });
  }, []);

  return { data, isLoading };
}

export function useAboutSection() {
  const [data, setData] = useState<AboutSection | null>(null);
  const [values, setValues] = useState<AboutValue[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    Promise.all([getAboutSection(), getAboutValues()]).then(([section, vals]) => {
      setData(section);
      setValues(vals);
      setIsLoading(false);
    });
  }, []);

  return { data, values, isLoading };
}

export function useMentors() {
  const [data, setData] = useState<Mentor[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getMentors().then((result) => {
      setData(result);
      setIsLoading(false);
    });
  }, []);

  return { data, isLoading };
}

export function useTeamMembers() {
  const [data, setData] = useState<TeamMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getTeamMembers().then((result) => {
      setData(result);
      setIsLoading(false);
    });
  }, []);

  return { data, isLoading };
}

export function useContactSection() {
  const [data, setData] = useState<ContactSection | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getContactSection().then((result) => {
      setData(result);
      setIsLoading(false);
    });
  }, []);

  return { data, isLoading };
}

export function useFooterSection() {
  const [section, setSection] = useState<FooterSection | null>(null);
  const [links, setLinks] = useState<FooterLink[]>([]);
  const [socialLinks, setSocialLinks] = useState<FooterSocialLink[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    Promise.all([getFooterSection(), getFooterLinks(), getFooterSocialLinks()]).then(
      ([sec, lnks, social]) => {
        setSection(sec);
        setLinks(lnks);
        setSocialLinks(social);
        setIsLoading(false);
      }
    );
  }, []);

  return { section, links, socialLinks, isLoading };
}

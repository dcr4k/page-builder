import type { Block, PageTheme } from '../types';

const STORAGE_KEY = 'digit4l_builder_project_data';
const LEGACY_STORAGE_KEY = 'biocraft_project_data';

export interface ProjectState {
  version: string;
  theme: PageTheme;
  blocks: Block[];
  selectedTemplateId?: string;
  updatedAt: string;
}

export const saveProjectToStorage = (theme: PageTheme, blocks: Block[], selectedTemplateId?: string): boolean => {
  try {
    const state: ProjectState = {
      version: '1.0',
      theme,
      blocks,
      selectedTemplateId,
      updatedAt: new Date().toISOString(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    return true;
  } catch (err) {
    console.error('Failed to save to localStorage:', err);
    return false;
  }
};

export const loadProjectFromStorage = (): ProjectState | null => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY) || localStorage.getItem(LEGACY_STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as ProjectState;
  } catch (err) {
    console.error('Failed to load from localStorage:', err);
    return null;
  }
};

export const exportProjectToJson = (theme: PageTheme, blocks: Block[]): string => {
  const data = {
    appName: 'Digit4l Builder',
    exportedAt: new Date().toISOString(),
    theme,
    blocks,
  };
  return JSON.stringify(data, null, 2);
};

export const importProjectFromJson = (jsonString: string): { theme: PageTheme; blocks: Block[] } | null => {
  try {
    const parsed = JSON.parse(jsonString);
    if (parsed && parsed.theme && Array.isArray(parsed.blocks)) {
      return { theme: parsed.theme, blocks: parsed.blocks };
    }
    return null;
  } catch (err) {
    console.error('Failed to import JSON:', err);
    return null;
  }
};

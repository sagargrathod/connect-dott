export type TabType = 'home' | 'about' | 'privacy' | 'terms';

export interface NavigationProps {
  currentTab: TabType;
  onTabChange: (tab: TabType) => void;
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  children: React.ReactNode;
}

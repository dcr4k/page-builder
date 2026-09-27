import React, { useState, useEffect, useCallback, useRef } from 'react';
import confetti from 'canvas-confetti';
import { TEMPLATES } from './data/templates';
import { createDefaultBlock } from './data/blockPresets';
import type { AppView, Block, BlockType, PageTheme, Template } from './types';
import { saveProjectToStorage, loadProjectFromStorage } from './utils/storage';

import { Header } from './components/common/Header';
import { TemplatePicker } from './components/template-picker/TemplatePicker';
import { CanvasArea } from './components/editor/CanvasArea';
import { LivePreviewScreen } from './components/preview/LivePreviewScreen';
import { ExportCodeModal } from './components/modals/ExportCodeModal';
import { ImportExportModal } from './components/modals/ImportExportModal';

import { MobileBottomNav } from './components/mobile/MobileBottomNav';
import { MobileBottomSheet } from './components/mobile/MobileBottomSheet';
import { MobileAddBlockSheet } from './components/mobile/MobileAddBlockSheet';
import { MobileReorderSheet } from './components/mobile/MobileReorderSheet';
import { MobileBlockInspectorSheet } from './components/mobile/MobileBlockInspectorSheet';
import { GlobalStyleInspector } from './components/editor/inspector/GlobalStyleInspector';

interface HistoryState {
  theme: PageTheme;
  blocks: Block[];
}

export const App: React.FC = () => {
  // App views: 'picker' | 'editor' | 'preview'
  const [currentView, setCurrentView] = useState<AppView>('picker');
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);

  // Active theme and blocks
  const [theme, setTheme] = useState<PageTheme>(TEMPLATES[0].theme);
  const [blocks, setBlocks] = useState<Block[]>(TEMPLATES[0].blocks);

  // Inspector and selection state
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);
  const [deletingBlockIds, setDeletingBlockIds] = useState<string[]>([]);

  // Mobile Bottom Sheets
  const [isAddSheetOpen, setIsAddSheetOpen] = useState(false);
  const [isStyleSheetOpen, setIsStyleSheetOpen] = useState(false);
  const [isReorderSheetOpen, setIsReorderSheetOpen] = useState(false);
  const [isEditBlockSheetOpen, setIsEditBlockSheetOpen] = useState(false);

  // Storage & Save indicator
  const [isSaved, setIsSaved] = useState(true);

  // Modals
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [isBackupModalOpen, setIsBackupModalOpen] = useState(false);

  // History for Undo / Redo
  const [history, setHistory] = useState<HistoryState[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const isUndoRedoAction = useRef(false);

  // Push to history helper
  const pushToHistory = useCallback((newTheme: PageTheme, newBlocks: Block[]) => {
    if (isUndoRedoAction.current) {
      isUndoRedoAction.current = false;
      return;
    }
    setHistory((prev) => {
      const upToCurrent = prev.slice(0, historyIndex + 1);
      const nextState: HistoryState = {
        theme: JSON.parse(JSON.stringify(newTheme)),
        blocks: JSON.parse(JSON.stringify(newBlocks)),
      };
      const trimmed = [...upToCurrent, nextState].slice(-30);
      return trimmed;
    });
    setHistoryIndex((prev) => Math.min(prev + 1, 29));
    setIsSaved(false);
  }, [historyIndex]);

  // Load from storage on mount if available
  useEffect(() => {
    const saved = loadProjectFromStorage();
    if (saved && saved.blocks && saved.theme) {
      setTheme(saved.theme);
      setBlocks(saved.blocks);
      const initialHistory: HistoryState = {
        theme: JSON.parse(JSON.stringify(saved.theme)),
        blocks: JSON.parse(JSON.stringify(saved.blocks)),
      };
      setHistory([initialHistory]);
      setHistoryIndex(0);
      setIsSaved(true);
    } else {
      const initialHistory: HistoryState = {
        theme: JSON.parse(JSON.stringify(TEMPLATES[0].theme)),
        blocks: JSON.parse(JSON.stringify(TEMPLATES[0].blocks)),
      };
      setHistory([initialHistory]);
      setHistoryIndex(0);
    }
  }, []);

  // Auto-save to localStorage with debounce
  useEffect(() => {
    if (blocks.length > 0) {
      const timer = setTimeout(() => {
        saveProjectToStorage(theme, blocks, selectedTemplate?.id);
        setIsSaved(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [theme, blocks, selectedTemplate]);

  // Handle template selection from initial screen
  const handleSelectTemplate = (template: Template) => {
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.75 },
      });
    } catch {
      // ignore
    }

    const initialTheme = JSON.parse(JSON.stringify(template.theme));
    const initialBlocks = JSON.parse(JSON.stringify(template.blocks));

    setSelectedTemplate(template);
    setTheme(initialTheme);
    setBlocks(initialBlocks);
    setSelectedBlockId(null);
    setDeletingBlockIds([]);

    const newHistory: HistoryState = {
      theme: initialTheme,
      blocks: initialBlocks,
    };
    setHistory([newHistory]);
    setHistoryIndex(0);

    saveProjectToStorage(initialTheme, initialBlocks, template.id);
    setIsSaved(true);
    setCurrentView('editor');
  };

  // Undo action
  const handleUndo = useCallback(() => {
    if (historyIndex > 0) {
      isUndoRedoAction.current = true;
      const targetIndex = historyIndex - 1;
      const targetState = history[targetIndex];
      setTheme(JSON.parse(JSON.stringify(targetState.theme)));
      setBlocks(JSON.parse(JSON.stringify(targetState.blocks)));
      setHistoryIndex(targetIndex);
      setIsSaved(false);
    }
  }, [history, historyIndex]);

  // Redo action
  const handleRedo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      isUndoRedoAction.current = true;
      const targetIndex = historyIndex + 1;
      const targetState = history[targetIndex];
      setTheme(JSON.parse(JSON.stringify(targetState.theme)));
      setBlocks(JSON.parse(JSON.stringify(targetState.blocks)));
      setHistoryIndex(targetIndex);
      setIsSaved(false);
    }
  }, [history, historyIndex]);

  // Keyboard shortcuts (Ctrl+Z, Ctrl+Y, Ctrl+S)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'z') {
        if (e.shiftKey) {
          e.preventDefault();
          handleRedo();
        } else {
          e.preventDefault();
          handleUndo();
        }
      } else if ((e.ctrlKey || e.metaKey) && e.key === 'y') {
        e.preventDefault();
        handleRedo();
      } else if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        saveProjectToStorage(theme, blocks, selectedTemplate?.id);
        setIsSaved(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleUndo, handleRedo, theme, blocks, selectedTemplate]);

  // Manual save
  const handleManualSave = () => {
    saveProjectToStorage(theme, blocks, selectedTemplate?.id);
    setIsSaved(true);
  };

  // Add block
  const handleAddBlock = (type: BlockType, customData?: Record<string, any>) => {
    const baseBlock = createDefaultBlock(type);
    const newBlock: Block = {
      ...baseBlock,
      data: (customData ? { ...baseBlock.data, ...customData } : baseBlock.data) as any,
    };
    const updatedBlocks = [...blocks, newBlock];
    setBlocks(updatedBlocks);
    setSelectedBlockId(newBlock.id);
    setIsAddSheetOpen(false);
    setIsEditBlockSheetOpen(true);
    pushToHistory(theme, updatedBlocks);
  };

  // Update single block
  const handleUpdateBlock = (updated: Block) => {
    const updatedBlocks = blocks.map((b) => (b.id === updated.id ? updated : b));
    setBlocks(updatedBlocks);
    pushToHistory(theme, updatedBlocks);
  };

  // Delete block with smooth exit transition
  const handleDeleteBlock = (id: string) => {
    setDeletingBlockIds((prev) => [...prev, id]);

    // Give time for exit animation (0.35s) to complete before state removal
    setTimeout(() => {
      setBlocks((currentBlocks) => {
        const remaining = currentBlocks.filter((b) => b.id !== id);
        pushToHistory(theme, remaining);
        return remaining;
      });

      setDeletingBlockIds((prev) => prev.filter((item) => item !== id));

      if (selectedBlockId === id) {
        setSelectedBlockId(null);
      }
    }, 320);
  };

  // Duplicate block
  const handleDuplicateBlock = (id: string) => {
    const index = blocks.findIndex((b) => b.id === id);
    if (index === -1) return;

    const source = blocks[index];
    const duplicated: Block = {
      ...JSON.parse(JSON.stringify(source)),
      id: 'blk_' + Math.random().toString(36).substring(2, 9),
    };

    const updatedBlocks = [...blocks];
    updatedBlocks.splice(index + 1, 0, duplicated);

    setBlocks(updatedBlocks);
    setSelectedBlockId(duplicated.id);
    pushToHistory(theme, updatedBlocks);
  };

  // Move block up or down
  const handleMoveBlock = (id: string, direction: 'up' | 'down') => {
    const index = blocks.findIndex((b) => b.id === id);
    if (index === -1) return;
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === blocks.length - 1) return;

    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    const updated = [...blocks];
    const [moved] = updated.splice(index, 1);
    updated.splice(targetIndex, 0, moved);

    setBlocks(updated);
    pushToHistory(theme, updated);
  };

  // Update whole blocks list (e.g. from drag & drop)
  const handleUpdateBlocks = (newBlocks: Block[]) => {
    setBlocks(newBlocks);
    pushToHistory(theme, newBlocks);
  };

  // Update theme
  const handleUpdateTheme = (newTheme: PageTheme) => {
    setTheme(newTheme);
    pushToHistory(newTheme, blocks);
  };

  // Import JSON project
  const handleImportProject = (importedTheme: PageTheme, importedBlocks: Block[]) => {
    setTheme(importedTheme);
    setBlocks(importedBlocks);
    setSelectedBlockId(null);
    setDeletingBlockIds([]);
    pushToHistory(importedTheme, importedBlocks);
    saveProjectToStorage(importedTheme, importedBlocks);
    setIsSaved(true);
  };

  // Select or deselect / toggle block selection
  const handleSelectBlock = useCallback((id: string | null) => {
    if (id === null) {
      setSelectedBlockId(null);
      setIsEditBlockSheetOpen(false);
    } else {
      setSelectedBlockId((prev) => {
        if (prev === id) {
          setIsEditBlockSheetOpen(false);
          return null;
        }
        return id;
      });
    }
  }, []);

  const selectedBlock = blocks.find((b) => b.id === selectedBlockId) || null;
  const selectedIndex = blocks.findIndex((b) => b.id === selectedBlockId);

  // View 1: Template Picker Screen
  if (currentView === 'picker') {
    return (
      <TemplatePicker
        templates={TEMPLATES}
        onSelectTemplate={handleSelectTemplate}
      />
    );
  }

  // View 2: Live Preview Screen
  if (currentView === 'preview') {
    return (
      <>
        <LivePreviewScreen
          theme={theme}
          blocks={blocks}
          onBackToEditor={() => setCurrentView('editor')}
          onOpenExportModal={() => setIsExportModalOpen(true)}
        />
        <ExportCodeModal
          isOpen={isExportModalOpen}
          onClose={() => setIsExportModalOpen(false)}
          theme={theme}
          blocks={blocks}
        />
      </>
    );
  }

  // View 3: Mobile-First Editor Mode
  return (
    <div className="h-screen w-screen flex flex-col bg-studio-black text-slate-100 overflow-hidden relative">
      {/* Header */}
      <Header
        currentView={currentView}
        onViewChange={setCurrentView}
        canUndo={historyIndex > 0}
        canRedo={historyIndex < history.length - 1}
        onUndo={handleUndo}
        onRedo={handleRedo}
        onSave={handleManualSave}
        isSaved={isSaved}
        onOpenExportModal={() => setIsExportModalOpen(true)}
        onOpenBackupModal={() => setIsBackupModalOpen(true)}
        onBackToPicker={() => setCurrentView('picker')}
      />

      {/* Main Clean Canvas Area (min-h-0 flex-1 for accurate scroll calculations) */}
      <main className="flex-1 min-h-0 relative flex overflow-hidden">
        <CanvasArea
          blocks={blocks}
          theme={theme}
          selectedBlockId={selectedBlockId}
          deletingBlockIds={deletingBlockIds}
          onSelectBlock={handleSelectBlock}
          onOpenEditBlock={(id) => {
            setSelectedBlockId(id);
            setIsEditBlockSheetOpen(true);
          }}
          onUpdateBlocks={handleUpdateBlocks}
          onDeleteBlock={handleDeleteBlock}
          onDuplicateBlock={handleDuplicateBlock}
          onMoveBlock={handleMoveBlock}
          onOpenAddSheet={() => setIsAddSheetOpen(true)}
        />
      </main>

      {/* Mobile Bottom Navigation Bar */}
      <MobileBottomNav
        onOpenAddBlock={() => setIsAddSheetOpen(true)}
        onOpenStyle={() => setIsStyleSheetOpen(true)}
        onOpenReorder={() => setIsReorderSheetOpen(true)}
        onOpenPreview={() => setCurrentView('preview')}
        onOpenExport={() => setIsExportModalOpen(true)}
        hasBlocks={blocks.length > 0}
      />

      {/* 1. Mobile Bottom Sheet: Add Block */}
      <MobileBottomSheet
        isOpen={isAddSheetOpen}
        onClose={() => setIsAddSheetOpen(false)}
        title="Adicionar Bloco"
        subtitle="Escolha um elemento estruturado para adicionar à sua página"
      >
        <MobileAddBlockSheet onAddBlock={handleAddBlock} />
      </MobileBottomSheet>

      {/* 2. Mobile Bottom Sheet: Edit Block */}
      <MobileBottomSheet
        isOpen={isEditBlockSheetOpen && selectedBlock !== null}
        onClose={() => setIsEditBlockSheetOpen(false)}
        title={selectedBlock ? `Editar ${selectedBlock.type}` : 'Editar Bloco'}
        subtitle="Personalize textos, links, imagens e propriedades"
      >
        {selectedBlock && (
          <MobileBlockInspectorSheet
            block={selectedBlock}
            theme={theme}
            onUpdateBlock={handleUpdateBlock}
            onDeleteBlock={handleDeleteBlock}
            onDuplicateBlock={handleDuplicateBlock}
            onMoveBlock={handleMoveBlock}
            isFirst={selectedIndex === 0}
            isLast={selectedIndex === blocks.length - 1}
            onClose={() => setIsEditBlockSheetOpen(false)}
          />
        )}
      </MobileBottomSheet>

      {/* 3. Mobile Bottom Sheet: Global Style */}
      <MobileBottomSheet
        isOpen={isStyleSheetOpen}
        onClose={() => setIsStyleSheetOpen(false)}
        title="Estilo Global da Página"
        subtitle="Altere cores, fundos, fontes e formato dos botões"
      >
        <GlobalStyleInspector
          theme={theme}
          onChange={handleUpdateTheme}
        />
      </MobileBottomSheet>

      {/* 4. Mobile Bottom Sheet: Reorder / Organize */}
      <MobileBottomSheet
        isOpen={isReorderSheetOpen}
        onClose={() => setIsReorderSheetOpen(false)}
        title="Organizar Blocos"
        subtitle="Arraste ou use as setas para reordenar a sequência de exibição"
      >
        <MobileReorderSheet
          blocks={blocks}
          selectedBlockId={selectedBlockId}
          onSelectBlock={(id) => {
            setSelectedBlockId(id);
            setIsReorderSheetOpen(false);
            setIsEditBlockSheetOpen(true);
          }}
          onUpdateBlocks={handleUpdateBlocks}
          onMoveBlock={handleMoveBlock}
          onDuplicateBlock={handleDuplicateBlock}
          onDeleteBlock={handleDeleteBlock}
        />
      </MobileBottomSheet>

      {/* Export Code Modal */}
      <ExportCodeModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        theme={theme}
        blocks={blocks}
      />

      {/* Import/Export Backup Modal */}
      <ImportExportModal
        isOpen={isBackupModalOpen}
        onClose={() => setIsBackupModalOpen(false)}
        theme={theme}
        blocks={blocks}
        onImport={handleImportProject}
      />
    </div>
  );
};

export default App;

import React, { createContext, useContext, useState, useEffect } from "react";
import localforage from "localforage";

// --- RECURSIVE TYPINGS ---
export interface VirtualFile {
  name: string;
  type: "text" | "image" | "executable";
  content: string; // Text content or dataURL (Base64) for images
  lastModified: number;
}

export interface VirtualDirectory {
  name: string;
  type: "directory";
  children: Record<string, VirtualFile | VirtualDirectory>;
}

export type FSNode = VirtualFile | VirtualDirectory;

const VFS_DB_KEY = "aero_os_vfs_root";

// --- DEFAULT SEED DIRECTORY ---
const DEFAULT_FS: VirtualDirectory = {
  name: "Root",
  type: "directory",
  children: {
    "Documents": {
      name: "Documents",
      type: "directory",
      children: {
        "about_me.txt": {
          name: "about_me.txt",
          type: "text",
          content: "Chavva Akshay Kumar Reddy\n--------------------------\nB.Tech CSE Student & Full-Stack AI Engineer.\nPassionate about constructing robust web architectures,\ninteractive premium visual frameworks, and cognitive agents.",
          lastModified: Date.now()
        },
        "resume_summary.md": {
          name: "resume_summary.md",
          type: "text",
          content: "# CHAVVA AKSHAY KUMAR REDDY\n- B.Tech CSE Candidate (2024-2028)\n- Specialties: Fullstack React, TypeScript, AI Agent design, Node.js, REST APIs\n- Achievements: High honors hackathon deployments, Premium aviation telemetry panels.",
          lastModified: Date.now()
        }
      }
    },
    "Downloads": {
      name: "Downloads",
      type: "directory",
      children: {}
    },
    "Source_Code": {
      name: "Source_Code",
      type: "directory",
      children: {
        "AeroOS.tsx": {
          name: "AeroOS.tsx",
          type: "text",
          content: "export function AeroOS() {\n  const [booting, setBooting] = useState(true);\n  // High-performance virtual workstation\n  return (\n    <div className=\"workspace\">\n      <Desktop />\n    </div>\n  );\n}",
          lastModified: Date.now()
        },
        "App.tsx": {
          name: "App.tsx",
          type: "text",
          content: "import React from 'react';\nimport { AeroOS } from './components/AeroOS';\n\nexport default function App() {\n  return <AeroOS />;\n}",
          lastModified: Date.now()
        }
      }
    },
    "System_Drive": {
      name: "System_Drive",
      type: "directory",
      children: {
        "kernel.sys": {
          name: "kernel.sys",
          type: "executable",
          content: "CORE BOOTSTRAP STACK ENCRYPTED VECTOR DATA v3.00.00",
          lastModified: Date.now()
        },
        "diagnostic_logs.json": {
          name: "diagnostic_logs.json",
          type: "text",
          content: '{\n  "engine": "DevCore v3",\n  "status": "Nominal",\n  "allocations": "Active",\n  "ping": "14ms"\n}',
          lastModified: Date.now()
        }
      }
    }
  }
};

// --- FILE SYSTEM CONTEXT INTERFACE ---
interface FileSystemContextType {
  fs: VirtualDirectory;
  writeFile: (path: string[], fileName: string, content: string, type?: "text" | "image" | "executable") => void;
  deleteNode: (path: string[]) => void;
  createDirectory: (path: string[], dirName: string) => void;
  isLoading: boolean;
  saveFileSystem: (newFs: VirtualDirectory) => Promise<void>;
}

const FileSystemContext = createContext<FileSystemContextType | undefined>(undefined);

// --- RECURSIVE CORE HELPERS ---
const updateNodeAtPath = (
  node: VirtualDirectory,
  path: string[],
  fileOrDir: FSNode
): VirtualDirectory => {
  if (path.length === 0) return node;
  const [nextName, ...rest] = path;

  if (rest.length === 0) {
    return {
      ...node,
      children: {
        ...node.children,
        [nextName]: fileOrDir,
      },
    };
  }

  const child = node.children[nextName];
  if (child && child.type === "directory") {
    return {
      ...node,
      children: {
        ...node.children,
        [nextName]: updateNodeAtPath(child, rest, fileOrDir),
      },
    };
  }
  return node;
};

const deleteNodeAtPath = (node: VirtualDirectory, path: string[]): VirtualDirectory => {
  if (path.length === 0) return node;
  const [nextName, ...rest] = path;

  if (rest.length === 0) {
    const updatedChildren = { ...node.children };
    delete updatedChildren[nextName];
    return {
      ...node,
      children: updatedChildren,
    };
  }

  const child = node.children[nextName];
  if (child && child.type === "directory") {
    return {
      ...node,
      children: {
        ...node.children,
        [nextName]: deleteNodeAtPath(child, rest),
      },
    };
  }
  return node;
};

export const FileSystemProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [fs, setFs] = useState<VirtualDirectory>(DEFAULT_FS);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize and Hydrate from IndexedDB on Load
  useEffect(() => {
    const initVFS = async () => {
      try {
        const stored = await localforage.getItem<VirtualDirectory>(VFS_DB_KEY);
        if (stored && stored.type === "directory") {
          setFs(stored);
        } else {
          // Empty DB: Seed with Default Portfolio Drive
          await localforage.setItem(VFS_DB_KEY, DEFAULT_FS);
          setFs(DEFAULT_FS);
        }
      } catch (e) {
        console.error("VFS failed to initialize from IndexedDB:", e);
      } finally {
        setIsLoading(false);
      }
    };
    initVFS();
  }, []);

  // Persists Virtual File System root node to IndexedDB
  const saveFileSystem = async (newFs: VirtualDirectory) => {
    try {
      await localforage.setItem(VFS_DB_KEY, newFs);
    } catch (e) {
      console.error("VFS failed to persist changes:", e);
    }
  };

  // Write or update file
  const writeFile = (
    path: string[],
    fileName: string,
    content: string,
    type: "text" | "image" | "executable" = "text"
  ) => {
    setFs((prevFs) => {
      const newFile: VirtualFile = {
        name: fileName,
        type,
        content,
        lastModified: Date.now(),
      };
      // Skip the root name "Root" in the indexing path list
      const targetPath = [...path, fileName].filter((p) => p !== "Root");
      const updated = updateNodeAtPath(prevFs, targetPath, newFile);
      saveFileSystem(updated);
      return updated;
    });
  };

  // Delete node (file or folder)
  const deleteNode = (path: string[]) => {
    setFs((prevFs) => {
      const targetPath = path.filter((p) => p !== "Root");
      const updated = deleteNodeAtPath(prevFs, targetPath);
      saveFileSystem(updated);
      return updated;
    });
  };

  // Create new folder
  const createDirectory = (path: string[], dirName: string) => {
    setFs((prevFs) => {
      const newDir: VirtualDirectory = {
        name: dirName,
        type: "directory",
        children: {},
      };
      const targetPath = [...path, dirName].filter((p) => p !== "Root");
      const updated = updateNodeAtPath(prevFs, targetPath, newDir);
      saveFileSystem(updated);
      return updated;
    });
  };

  return (
    <FileSystemContext.Provider
      value={{
        fs,
        writeFile,
        deleteNode,
        createDirectory,
        isLoading,
        saveFileSystem,
      }}
    >
      {children}
    </FileSystemContext.Provider>
  );
};

export const useFileSystem = () => {
  const context = useContext(FileSystemContext);
  if (!context) {
    throw new Error("useFileSystem must be used within a FileSystemProvider");
  }
  return context;
};

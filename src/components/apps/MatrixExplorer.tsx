import React, { useState } from "react";
import { useSystem } from "../SystemContext";
import { useFileSystem, FSNode, VirtualDirectory } from "../FileSystemContext";

export function MatrixExplorer() {
  const { playSound, systemAccent } = useSystem();
  const { fs, writeFile, deleteNode, createDirectory } = useFileSystem();

  const [currentPath, setCurrentPath] = useState<string[]>(["Root"]);
  const [activeFile, setActiveFile] = useState<{ name: string; path: string[]; content: string; type: "text" | "image" | "executable" } | null>(null);

  // States for folder and file creation modal/forms
  const [showNewFileForm, setShowNewFileForm] = useState(false);
  const [newFileName, setNewFileName] = useState("");
  const [showNewFolderForm, setShowNewFolderForm] = useState(false);
  const [newFolderName, setNewFolderName] = useState("");

  // Resolves nested directory from current path segments
  const getDirectory = (path: string[]): VirtualDirectory | null => {
    let dir: FSNode = fs;
    const segments = path.filter((p) => p !== "Root");
    for (const seg of segments) {
      if (dir.type !== "directory") return null;
      const nextNode = dir.children[seg];
      if (!nextNode) return null;
      dir = nextNode;
    }
    return dir.type === "directory" ? dir : null;
  };

  const dirContent = getDirectory(currentPath);
  const items = dirContent ? Object.keys(dirContent.children) : [];

  const handleItemClick = (name: string, node: FSNode) => {
    playSound("click");
    if (node.type === "directory") {
      setCurrentPath([...currentPath, name]);
    } else {
      setActiveFile({
        name,
        path: [...currentPath],
        content: node.content,
        type: node.type,
      });
    }
  };

  const handleBack = () => {
    if (currentPath.length > 1) {
      playSound("click");
      setCurrentPath(currentPath.slice(0, -1));
    }
  };

  const handleContentChange = (newContent: string) => {
    if (activeFile) {
      setActiveFile({ ...activeFile, content: newContent });
      // Instant asynchronous write back to localForage VFS
      writeFile(activeFile.path, activeFile.name, newContent, activeFile.type);
    }
  };

  const handleDeleteItem = (e: React.MouseEvent, name: string) => {
    e.stopPropagation();
    playSound("close");
    const targetPath = [...currentPath, name];
    deleteNode(targetPath);
  };

  const handleCreateFile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFileName.trim()) return;
    playSound("open");
    writeFile(currentPath, newFileName.trim(), "New text file created.", "text");
    setNewFileName("");
    setShowNewFileForm(false);
  };

  const handleCreateFolder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFolderName.trim()) return;
    playSound("open");
    createDirectory(currentPath, newFolderName.trim());
    setNewFolderName("");
    setShowNewFolderForm(false);
  };

  const isLightImage = activeFile?.type === "image" || activeFile?.content?.startsWith("data:image");

  if (activeFile) {
    return (
      <div className="flex flex-col h-full bg-[#08080f]/95 border border-slate-700/60 rounded-xl p-4 text-white font-mono text-[11px] min-h-[340px]">
        <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-3 shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-[14px]">{isLightImage ? "🖼" : "📝"}</span>
            <span className="font-bold text-slate-300">{activeFile.name}</span>
            <span className="text-[8px] bg-blue-950 text-blue-400 border border-blue-900 px-1.5 py-0.5 rounded uppercase">
              {activeFile.type}
            </span>
          </div>
          <button
            onClick={() => {
              playSound("close");
              setActiveFile(null);
            }}
            className="text-[9px] font-bold px-2 py-1 bg-slate-800 border border-slate-700 hover:bg-slate-700 text-slate-300 rounded cursor-pointer transition-colors"
          >
            ← BACK TO FILES
          </button>
        </div>

        <div className="flex-1 min-h-0 flex flex-col justify-between">
          {isLightImage ? (
            <div className="flex-1 bg-slate-950/60 border border-slate-850 rounded p-4 flex flex-col items-center justify-center gap-2 overflow-hidden h-[210px]">
              <img
                src={activeFile.content}
                alt={activeFile.name}
                className="max-h-[160px] max-w-full object-contain rounded-lg border border-slate-800 shadow-md bg-white/5"
              />
              <span className="text-[8px] text-slate-500 uppercase tracking-widest">
                Binary Image Preview
              </span>
            </div>
          ) : (
            <textarea
              value={activeFile.content}
              onChange={(e) => handleContentChange(e.target.value)}
              className="flex-1 bg-slate-950/60 border border-slate-850 rounded p-3 text-slate-300 focus:outline-none focus:border-slate-700 font-mono text-[10px] resize-none h-[210px] scrollbar-thin"
            />
          )}

          <div className="flex items-center justify-between mt-3 text-[9px] text-slate-500 pt-1 shrink-0">
            <span>Size: {activeFile.content.length} characters</span>
            <span className="text-green-400 font-bold tracking-wider flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              SANDBOX VFS WRITEBACK ACTIVE
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-[#08080f]/40 text-slate-200 font-sans text-xs min-h-[340px] justify-between">
      {/* Directory Action bar */}
      <div className="flex items-center justify-between gap-2 px-3 py-2 bg-slate-900/60 border border-slate-800/80 rounded-xl mb-3 shrink-0">
        <div className="flex items-center gap-2">
          <button
            onClick={handleBack}
            disabled={currentPath.length <= 1}
            className={`w-6 h-6 flex items-center justify-center rounded border transition-all cursor-pointer ${
              currentPath.length <= 1
                ? "opacity-35 cursor-not-allowed border-slate-800 text-slate-600"
                : "border-slate-700 hover:bg-slate-850 text-white"
            }`}
          >
            ▲
          </button>
          <div className="bg-slate-950/80 border border-slate-850 px-2 py-1 rounded text-[10px] font-mono text-slate-400 max-w-[160px] sm:max-w-[280px] truncate">
            {currentPath.join(" / ")}
          </div>
        </div>

        {/* Create Node buttons */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => {
              playSound("click");
              setShowNewFileForm(!showNewFileForm);
              setShowNewFolderForm(false);
            }}
            className="px-2 py-1 border border-slate-800 hover:border-slate-700 bg-slate-900/40 text-slate-400 hover:text-white rounded text-[9px] font-mono cursor-pointer transition-colors"
          >
            + FILE
          </button>
          <button
            onClick={() => {
              playSound("click");
              setShowNewFolderForm(!showNewFolderForm);
              setShowNewFileForm(false);
            }}
            className="px-2 py-1 border border-slate-800 hover:border-slate-700 bg-slate-900/40 text-slate-400 hover:text-white rounded text-[9px] font-mono cursor-pointer transition-colors"
          >
            + FOLDER
          </button>
        </div>
      </div>

      {/* Creation Dropdowns */}
      {showNewFileForm && (
        <form
          onSubmit={handleCreateFile}
          className="mb-3 p-3 bg-slate-950/80 border border-slate-850 rounded-xl flex gap-2 items-center shrink-0"
        >
          <input
            type="text"
            placeholder="filename.txt"
            value={newFileName}
            onChange={(e) => setNewFileName(e.target.value)}
            className="flex-1 bg-slate-900 border border-slate-800 rounded px-2 py-1 text-[10px] text-white font-mono focus:outline-none"
            autoFocus
          />
          <button
            type="submit"
            className="px-3 py-1 font-bold text-[9px] rounded text-slate-950 cursor-pointer"
            style={{ backgroundColor: systemAccent }}
          >
            CREATE
          </button>
        </form>
      )}

      {showNewFolderForm && (
        <form
          onSubmit={handleCreateFolder}
          className="mb-3 p-3 bg-slate-950/80 border border-slate-850 rounded-xl flex gap-2 items-center shrink-0"
        >
          <input
            type="text"
            placeholder="Folder Name"
            value={newFolderName}
            onChange={(e) => setNewFolderName(e.target.value)}
            className="flex-1 bg-slate-900 border border-slate-800 rounded px-2 py-1 text-[10px] text-white font-mono focus:outline-none"
            autoFocus
          />
          <button
            type="submit"
            className="px-3 py-1 font-bold text-[9px] rounded text-slate-950 cursor-pointer"
            style={{ backgroundColor: systemAccent }}
          >
            MKDIR
          </button>
        </form>
      )}

      {/* Directory items grid */}
      <div className="flex-1 overflow-y-auto p-3 bg-slate-950/20 border border-slate-900 rounded-xl min-h-[220px] max-h-[240px] scrollbar-thin">
        {items.length === 0 ? (
          <div className="text-center text-slate-550 py-12 font-mono text-[10px]">
            DIRECTORY IS EMPTY
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
            {items.map((name) => {
              const node = dirContent ? dirContent.children[name] : null;
              if (!node) return null;
              const isDir = node.type === "directory";

              return (
                <button
                  key={name}
                  onClick={() => handleItemClick(name, node)}
                  className="group relative flex flex-col items-center justify-between p-3 bg-slate-900/30 border border-slate-850/50 hover:bg-slate-900/80 rounded-xl transition-all cursor-pointer text-left truncate min-h-[84px]"
                >
                  {/* Delete Item Button */}
                  <button
                    onClick={(e) => handleDeleteItem(e, name)}
                    className="absolute top-1.5 right-1.5 w-4 h-4 bg-red-950/40 text-red-500 border border-red-900/30 hover:bg-red-650 hover:text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-[8px]"
                    title={`Delete ${name}`}
                  >
                    ✕
                  </button>

                  <div className="flex flex-col items-center gap-1.5 mt-1 truncate w-full">
                    <span className="text-2xl select-none">
                      {isDir ? "📂" : node.type === "image" ? "🖼" : "📄"}
                    </span>
                    <span
                      className="text-[10px] font-mono text-slate-350 w-full text-center truncate px-1"
                      title={name}
                    >
                      {name}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
export default MatrixExplorer;

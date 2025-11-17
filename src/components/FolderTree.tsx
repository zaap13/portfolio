"use client";

import { useMemo, useState } from "react";

export type FolderTreeNode = {
  name: string;
  path: string;        // "rap/Djonga/Album X"
  count: number;       // total de faixas dentro (recursivo)
  children: FolderTreeNode[];
};

export type FolderTreeProps = {
  // lista de caminhos de pasta por faixa, ex.: ["rap","Djonga","Album X"]
  foldersOfTracks: string[][];
  scope: string;                   // caminho atual selecionado ("" = todas)
  onChange: (path: string) => void;
};

function buildTree(foldersOfTracks: string[][]): FolderTreeNode {
  const root: FolderTreeNode = { name: "Todas as pastas", path: "", count: 0, children: [] };

  // índice para acelerar criação
  const map = new Map<string, FolderTreeNode>();
  map.set("", root);

  for (const parts of foldersOfTracks) {
    // subcaminhos progressivos
    let acc = "";
    for (let i = 0; i < parts.length; i++) {
      const sub = parts.slice(0, i + 1).join("/");
      const parentPath = parts.slice(0, i).join("/");
      const parent = map.get(parentPath)!;

      if (!map.has(sub)) {
        const node: FolderTreeNode = { name: parts[i], path: sub, count: 0, children: [] };
        parent.children.push(node);
        map.set(sub, node);
      }
    }
    // sempre incrementa o root também
  }

  // ordenar filhos alfabeticamente
  for (const node of map.values()) {
    node.children.sort((a, b) => a.name.localeCompare(b.name));
  }

  // contar faixas recursivamente:
  // para cada faixa, incrementa todos os ancestrais (incluindo root)
  for (const parts of foldersOfTracks) {
    let acc = "";
    // root
    map.get("")!.count++;
    for (let i = 0; i < parts.length; i++) {
      acc = parts.slice(0, i + 1).join("/");
      map.get(acc)!.count++;
    }
  }

  return root;
}

function highlight(text: string, query: string) {
  if (!query) return text;
  const idx = text.toLowerCase().indexOf(query.toLowerCase());
  if (idx === -1) return text;
  return (
    <>
      {text.slice(0, idx)}
      <mark className="bg-yellow-300/60 dark:bg-yellow-400/40">{text.slice(idx, idx + query.length)}</mark>
      {text.slice(idx + query.length)}
    </>
  );
}

function Node({
  node,
  depth,
  scope,
  onChange,
  query,
  openPaths,
  toggleOpen,
}: {
  node: FolderTreeNode;
  depth: number;
  scope: string;
  onChange: (p: string) => void;
  query: string;
  openPaths: Set<string>;
  toggleOpen: (p: string) => void;
}) {
  const isRoot = node.path === "";
  const isOpen = openPaths.has(node.path);
  const isActive = scope === node.path;

  // se tem busca, vamos mostrar nós que batem OU que tem descendentes que batem
  const matchSelf = query ? node.name.toLowerCase().includes(query.toLowerCase()) || (isRoot && "todas as pastas".includes(query.toLowerCase())) : true;

  const filteredChildren = node.children.map(c =>
    NodeFilter.queryFilter(c, query)
  ).filter(Boolean) as FolderTreeNode[];

  const shouldRender = matchSelf || (query ? filteredChildren.length > 0 : true);
  if (!shouldRender) return null;

  return (
    <div>
      <div
        className={`group flex items-center justify-between gap-2 rounded px-2 py-1.5 cursor-pointer ${isActive ? "bg-primary/15 ring-1 ring-primary/50" : "hover:bg-black/5 dark:hover:bg-white/5"}`}
        style={{ paddingLeft: `${Math.max(0, depth) * 12 + 6}px` }}
        onClick={(e) => {
          e.stopPropagation();
          onChange(node.path);
        }}
      >
        <div className="flex items-center gap-2 min-w-0">
          {!isRoot && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleOpen(node.path);
              }}
              className="size-5 inline-flex items-center justify-center rounded hover:bg-black/10 dark:hover:bg-white/10"
              title={isOpen ? "Recolher" : "Expandir"}
            >
              {isOpen ? "▾" : "▸"}
            </button>
          )}
          <div className={`truncate ${isActive ? "text-primary font-medium" : ""}`}>
            {isRoot ? highlight("Todas as pastas", query) : highlight(node.name, query)}
          </div>
        </div>
        <span className="text-xs opacity-70 tabular-nums">{node.count}</span>
      </div>

      {(isRoot || isOpen || query) && filteredChildren.length > 0 && (
        <div className="mt-0.5">
          {filteredChildren.map((child) => (
            <Node
              key={child.path}
              node={child}
              depth={depth + 1}
              scope={scope}
              onChange={onChange}
              query={query}
              openPaths={openPaths}
              toggleOpen={toggleOpen}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// util para filtrar copiando estrutura
const NodeFilter = {
  queryFilter(node: FolderTreeNode, query: string): FolderTreeNode | null {
    if (!query) return node;
    const matchSelf = node.name.toLowerCase().includes(query.toLowerCase());
    const children = node.children
      .map((c) => NodeFilter.queryFilter(c, query))
      .filter(Boolean) as FolderTreeNode[];
    if (matchSelf || children.length > 0) {
      return { ...node, children };
    }
    return null;
  }
};

export default function FolderTree({ foldersOfTracks, scope, onChange }: FolderTreeProps) {
  const [query, setQuery] = useState("");
  const [openPaths, setOpenPaths] = useState<Set<string>>(new Set([""])); // root aberto

  const tree = useMemo(() => buildTree(foldersOfTracks), [foldersOfTracks]);

  function toggleOpen(path: string) {
    setOpenPaths((prev) => {
      const n = new Set(prev);
      if (n.has(path)) n.delete(path);
      else n.add(path);
      return n;
    });
  }

  function openAll() {
    const all = new Set<string>();
    function walk(n: FolderTreeNode) {
      all.add(n.path);
      n.children.forEach(walk);
    }
    walk(tree);
    setOpenPaths(all);
  }

  function closeAll() {
    setOpenPaths(new Set([""])); // só root
  }

  return (
    <div className="flex h-full flex-col">
      {/* barra de busca + ações */}
      <div className="flex items-center gap-2 mb-2">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar pastas…"
          className="w-full rounded border px-3 py-2 bg-white text-black dark:bg-neutral-900 dark:text-white"
        />
        <button className="rounded border px-2 py-2 hover:bg-black/5 dark:hover:bg-white/5" onClick={openAll} title="Expandir tudo">
          + Abrir
        </button>
        <button className="rounded border px-2 py-2 hover:bg-black/5 dark:hover:bg-white/5" onClick={closeAll} title="Recolher tudo">
          − Fechar
        </button>
      </div>

      {/* árvore rolável */}
      <div className="min-h-0 flex-1 overflow-auto rounded border p-1">
        <Node
          node={tree}
          depth={0}
          scope={scope}
          onChange={onChange}
          query={query}
          openPaths={openPaths}
          toggleOpen={toggleOpen}
        />
      </div>
    </div>
  );
}

"use client"

import React, { useState } from 'react';
import { useEditor, EditorContent, Editor as TiptapEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { DndContext, closestCenter, DragEndEvent } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAxios } from '@/app/hooks/useAxios';
import {
  Image as ImageIcon,
  GripVertical,
  X,
  Plus,
  Bold,
  Italic,
  Heading1,
  Heading2,
  List,
  ListOrdered,
  Quote,
  Code,
  Undo,
  Redo
} from 'lucide-react';
import { redirect } from 'next/navigation';

interface Block {
  id: string;
  type: 'title' | 'content' | 'image';
  value: string;
  file?: File;
  order: number;
}

const MenuBar = ({ editor }: { editor: TiptapEditor | null }) => {
  if (!editor) return null;

  return (
    <div className="border border-gray-200 rounded-lg p-1 mb-2 flex flex-wrap gap-1">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={editor.isActive('bold') ? 'bg-gray-200' : ''}
      >
        <Bold className="w-4 h-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={editor.isActive('italic') ? 'bg-gray-200' : ''}
      >
        <Italic className="w-4 h-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={editor.isActive('heading', { level: 1 }) ? 'bg-gray-200' : ''}
      >
        <Heading1 className="w-4 h-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={editor.isActive('heading', { level: 2 }) ? 'bg-gray-200' : ''}
      >
        <Heading2 className="w-4 h-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editor.isActive('bulletList') ? 'bg-gray-200' : ''}
      >
        <List className="w-4 h-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={editor.isActive('orderedList') ? 'bg-gray-200' : ''}
      >
        <ListOrdered className="w-4 h-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={editor.isActive('blockquote') ? 'bg-gray-200' : ''}
      >
        <Quote className="w-4 h-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={editor.isActive('codeBlock') ? 'bg-gray-200' : ''}
      >
        <Code className="w-4 h-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().undo()}
      >
        <Undo className="w-4 h-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().redo()}
      >
        <Redo className="w-4 h-4" />
      </Button>
    </div>
  );
};

const SortableBlock = ({ block, onRemove, onUpdate }: { 
  block: Block; 
  onRemove: (id: string) => void;
  onUpdate: (id: string, value: string) => void;
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: block.id });
  const editor = useEditor({
    extensions: [StarterKit],
    content: block.value,
    onUpdate: ({ editor }) => {
      onUpdate(block.id, editor.getHTML());
    }
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  };

  return (
    <div ref={setNodeRef} style={style} className="relative group mb-6 bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
      <div className="absolute -left-8 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button variant="ghost" size="sm" {...attributes} {...listeners}>
          <GripVertical className="w-4 h-4" />
        </Button>
      </div>
      
      <div className="flex items-start gap-2">
        <div className="flex-1">
          {block.type !== 'image' && <MenuBar editor={editor} />}
          {block.type === 'image' ? (
            <img src={block.value} alt="" className="max-w-full rounded-lg" />
          ) : (
            <EditorContent editor={editor} className="prose prose-sm max-w-none" />
          )}
        </div>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => onRemove(block.id)} 
          className="opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <X className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

const Editor = () => {
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [tags, setTags] = useState<string[]>(["technology", "programming"]);
  const [newTag, setNewTag] = useState("");
  const [error, setError] = useState("");
  const axios = useAxios();

  const addBlock = (type: Block['type'], value: string = '<p></p>', file?: File) => {
    setBlocks(prev => [...prev, {
      id: Math.random().toString(36).substring(2),
      type,
      value,
      file,
      order: prev.length
    }]);
  };

  const handleImageUpload = async (files: FileList) => {
    Array.from(files).forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        addBlock('image', e.target?.result as string, file);
      };
      reader.readAsDataURL(file);
    });
  };
  
  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append('titles', JSON.stringify(blocks
        .filter(b => b.type === 'title')
        .map((title, index) => ({
          text: title.value,
          order: index
        }))
      ));
  
      formData.append('contents', JSON.stringify(blocks
        .filter(b => b.type === 'content')
        .map((content, index) => ({
          text: content.value,
          order: index
        }))
      ));
  
      formData.append('author', localStorage.getItem('userId') || '');
      formData.append('tags', JSON.stringify(tags));
      
      blocks
        .filter((b): b is Block & { file: File } => b.type === 'image' && b.file !== undefined)
        .forEach(block => {
          formData.append('images', block.file);
        });
  
      await axios.post('/blog', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      redirect('/profile');
  
      setError("");
    } catch (error) {
      console.error('Error:', error);
      setError("Upload failed");
    }
  };  

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setBlocks(items => {
        const oldIndex = items.findIndex(item => item.id === active.id);
        const newIndex = items.findIndex(item => item.id === over.id);
        const newItems = [...items];
        const [removed] = newItems.splice(oldIndex, 1);
        newItems.splice(newIndex, 0, removed);
        return newItems.map((item, index) => ({ ...item, order: index }));
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {error && (
        <div className="bg-red-50 text-red-500 p-4 rounded-lg mb-4">{error}</div>
      )}
      
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
        <h2 className="text-lg font-semibold mb-4">Add Content</h2>
        <div className="flex flex-wrap gap-2">
          <Button 
            variant="outline"
            onClick={() => addBlock('title')}
            className="flex items-center gap-2"
          >
            <Heading1 className="w-4 h-4" />
            Add Title
          </Button>
          <Button 
            variant="outline"
            onClick={() => addBlock('content')}
            className="flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Content
          </Button>
          <Button variant="outline" className="cursor-pointer ">
            <input
              type="file"
              className="opacity-90 "
              accept="image/*"
              multiple
              onChange={(e) => e.target.files && handleImageUpload(e.target.files)}
            />
            <ImageIcon className="w-4 h-4 mr-2 " />
            Add Images
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
        <h2 className="text-lg font-semibold mb-4">Tags</h2>
        <div className="flex gap-2 mb-2">
          <Input
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            placeholder="Add a tag"
            className="flex-1"
          />
          <Button 
            onClick={() => {
              if (newTag && !tags.includes(newTag)) {
                setTags([...tags, newTag]);
                setNewTag('');
              }
            }} 
            size="sm"
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {tags.map(tag => (
            <span key={tag} className="px-3 py-1 bg-gray-100 rounded-full flex items-center gap-2">
              {tag}
              <button 
                onClick={() => setTags(tags.filter(t => t !== tag))} 
                className="hover:text-red-500 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </span>
          ))}
        </div>
      </div>

      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={blocks} strategy={verticalListSortingStrategy}>
          {blocks.map(block => (
            <SortableBlock
              key={block.id}
              block={block}
              onRemove={(id) => setBlocks(prev => prev.filter(b => b.id !== id))}
              onUpdate={(id, value) => setBlocks(prev => 
                prev.map(b => b.id === id ? { ...b, value } : b)
              )}
            />
          ))}
        </SortableContext>
      </DndContext>

      {blocks.length > 0 && (
        <Button 
          onClick={handleSubmit} 
          className="mt-6 w-full sm:w-auto"
          size="lg"
        >
          Publish
        </Button>
      )}
    </div>
  );
};

export default Editor;
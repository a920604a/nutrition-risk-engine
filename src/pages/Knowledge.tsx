import { useState, useEffect } from 'react'
import { collection, getDocs, addDoc, updateDoc, doc, serverTimestamp, query, orderBy } from 'firebase/firestore'
import { db } from '../lib/firebase'
import { useAppStore } from '../store/useAppStore'
import { useToast } from '../components/Toast'
import ReactMarkdown from 'react-markdown'
import { Plus, BookOpen, ArrowLeft, Pencil } from 'lucide-react'
import { CONDITION_LABELS } from '../engine/riskEngine'
import type { Condition } from '../engine/riskEngine'

interface Article {
  id: string
  title: string
  body: string
  condition_tags: Condition[]
  author_id: string
  author_name: string
  created_at: any
}

const ALL_CONDITIONS: Condition[] = ['gout', 'hyperlipidemia', 'diabetes', 'hypertension']

export function Knowledge() {
  const { user } = useAppStore()
  const { addToast } = useToast()
  const [articles, setArticles] = useState<Article[]>([])
  const [activeTag, setActiveTag] = useState<Condition | 'all'>('all')
  const [selected, setSelected] = useState<Article | null>(null)
  const [showEditor, setShowEditor] = useState(false)
  const [editingArticle, setEditingArticle] = useState<Article | null>(null)
  const [loading, setLoading] = useState(true)

  // Editor state
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [tags, setTags] = useState<Condition[]>([])
  const [submitting, setSubmitting] = useState(false)

  const fetchArticles = async () => {
    const q = query(collection(db, 'articles'), orderBy('created_at', 'desc'))
    const snap = await getDocs(q)
    setArticles(snap.docs.map((d) => ({ id: d.id, ...d.data() } as Article)))
    setLoading(false)
  }

  useEffect(() => { fetchArticles() }, [])

  const filtered = activeTag === 'all'
    ? articles
    : articles.filter((a) => a.condition_tags?.includes(activeTag))

  const openEditor = (article?: Article) => {
    if (article) {
      setEditingArticle(article)
      setTitle(article.title)
      setBody(article.body)
      setTags(article.condition_tags ?? [])
    } else {
      setEditingArticle(null)
      setTitle(''); setBody(''); setTags([])
    }
    setShowEditor(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user || !title.trim() || !body.trim()) return
    setSubmitting(true)
    if (editingArticle) {
      await updateDoc(doc(db, 'articles', editingArticle.id), {
        title: title.trim(),
        body: body.trim(),
        condition_tags: tags,
        updated_at: serverTimestamp(),
      })
      addToast('文章已更新', 'success')
      setSelected(null)
    } else {
      await addDoc(collection(db, 'articles'), {
        title: title.trim(),
        body: body.trim(),
        condition_tags: tags,
        author_id: user.uid,
        author_name: user.displayName ?? user.email ?? '匿名',
        created_at: serverTimestamp(),
        updated_at: serverTimestamp(),
      })
      addToast('文章已發布', 'success')
    }
    setTitle(''); setBody(''); setTags([])
    setShowEditor(false)
    setEditingArticle(null)
    await fetchArticles()
    setSubmitting(false)
  }

  if (selected && !showEditor) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-8">
        <button
          onClick={() => setSelected(null)}
          className="flex items-center gap-2 text-gray-500 hover:text-gray-700 mb-6 text-sm"
        >
          <ArrowLeft size={16} /> 返回列表
        </button>
        <div className="flex items-start justify-between gap-4 mb-3">
          <div className="flex gap-2 flex-wrap">
            {selected.condition_tags?.map((tag) => (
              <span key={tag} className="text-xs bg-indigo-100 text-indigo-600 px-2 py-0.5 rounded-full font-medium">
                {CONDITION_LABELS[tag].zh}
              </span>
            ))}
          </div>
          {user && user.uid === selected.author_id && (
            <button
              onClick={() => openEditor(selected)}
              className="flex-shrink-0 flex items-center gap-1.5 text-xs text-gray-500 hover:text-indigo-600 border border-gray-200 hover:border-indigo-300 px-3 py-1.5 rounded-lg transition-colors"
            >
              <Pencil size={13} /> 編輯
            </button>
          )}
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">{selected.title}</h1>
        <p className="text-sm text-gray-400 mb-6">
          {selected.author_name} · {selected.created_at?.toDate().toLocaleDateString('zh-TW')}
        </p>
        <div className="prose prose-sm max-w-none text-gray-700 leading-relaxed">
          <ReactMarkdown>{selected.body}</ReactMarkdown>
        </div>
      </div>
    )
  }

  if (showEditor) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-8">
        <button
          onClick={() => { setShowEditor(false); setEditingArticle(null) }}
          className="flex items-center gap-2 text-gray-500 hover:text-gray-700 mb-6 text-sm"
        >
          <ArrowLeft size={16} /> 取消
        </button>
        <h1 className="text-xl font-bold text-gray-900 mb-6">
          {editingArticle ? '編輯文章' : '新增知識文章'}
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">標題</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              placeholder="文章標題..."
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">相關疾病</label>
            <div className="flex gap-2 flex-wrap">
              {ALL_CONDITIONS.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setTags((prev) => prev.includes(c) ? prev.filter((t) => t !== c) : [...prev, c])}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                    tags.includes(c) ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-indigo-50'
                  }`}
                >
                  {CONDITION_LABELS[c].zh}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">內容（支援 Markdown）</label>
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              required
              rows={12}
              placeholder="撰寫文章內容，支援 Markdown 格式..."
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono resize-y"
            />
          </div>
          <button
            type="submit"
            disabled={submitting}
            className="bg-indigo-600 text-white px-6 py-2.5 rounded-xl font-medium hover:bg-indigo-700 transition-colors disabled:opacity-50"
          >
            {submitting ? '儲存中...' : editingArticle ? '儲存變更' : '發布文章'}
          </button>
        </form>
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">知識專區</h1>
          <p className="text-sm text-gray-500 mt-1">慢性病飲食衛教文章，登入後可分享知識</p>
        </div>
        {user && (
          <button
            onClick={() => openEditor()}
            className="flex items-center gap-2 bg-indigo-600 text-white text-sm font-medium px-4 py-2 rounded-xl hover:bg-indigo-700 transition-colors"
          >
            <Plus size={16} /> 新增文章
          </button>
        )}
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 flex-wrap mb-6">
        <button
          onClick={() => setActiveTag('all')}
          className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${activeTag === 'all' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-indigo-50'}`}
        >
          全部
        </button>
        {ALL_CONDITIONS.map((c) => (
          <button
            key={c}
            onClick={() => setActiveTag(c)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${activeTag === c ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-indigo-50'}`}
          >
            {CONDITION_LABELS[c].zh}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-white rounded-xl border border-gray-100 p-5 animate-pulse">
              <div className="flex gap-1.5 mb-3">
                <div className="h-5 w-12 bg-gray-200 rounded-full" />
              </div>
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
              <div className="h-3 bg-gray-100 rounded w-full mb-1" />
              <div className="h-3 bg-gray-100 rounded w-2/3" />
            </div>
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16">
          <BookOpen size={48} className="text-gray-200 mx-auto mb-4" />
          <p className="text-gray-400">尚無相關文章</p>
          {user && (
            <button onClick={() => openEditor()} className="mt-4 text-indigo-600 font-medium hover:underline text-sm">
              成為第一個撰寫者
            </button>
          )}
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((article) => (
            <button
              key={article.id}
              onClick={() => setSelected(article)}
              className="text-left bg-white border border-gray-100 rounded-xl p-5 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
            >
              <div className="flex gap-1.5 flex-wrap mb-3">
                {article.condition_tags?.map((tag) => (
                  <span key={tag} className="text-xs bg-indigo-100 text-indigo-600 px-2 py-0.5 rounded-full font-medium">
                    {CONDITION_LABELS[tag].zh}
                  </span>
                ))}
              </div>
              <h3 className="font-semibold text-gray-900 text-sm mb-2 line-clamp-2">{article.title}</h3>
              <p className="text-xs text-gray-400 line-clamp-2">{article.body.replace(/[#*`]/g, '')}</p>
              <p className="text-xs text-gray-300 mt-3">
                {article.author_name} · {article.created_at?.toDate().toLocaleDateString('zh-TW')}
              </p>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

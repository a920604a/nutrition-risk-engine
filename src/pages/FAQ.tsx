import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

interface FAQItem {
  q: string
  a: string
  tag: string
}

const FAQ_DATA: FAQItem[] = [
  // 痛風
  { tag: '痛風', q: '哪些食物含高嘌呤，痛風患者應避免？', a: '高嘌呤食物包括：內臟類（豬肝、雞肝）、海鮮（蝦、蟹、貝類、沙丁魚）、酒精飲料（尤其是啤酒）。建議痛風患者盡量避免這些食物，或控制攝取量。' },
  { tag: '痛風', q: '痛風患者可以喝豆漿嗎？', a: '黃豆製品雖含有中等嘌呤，但豆漿因為稀釋後嘌呤含量相對較低，一般認為適量飲用（一天一杯）對痛風患者風險較低。但急性發作期仍建議暫時避免。' },
  { tag: '痛風', q: '多喝水對痛風有幫助嗎？', a: '是的，多喝水（每天至少 2000–3000ml）可以幫助尿酸透過尿液排出，降低痛風發作風險。選擇白開水或無糖飲料最佳。' },

  // 高血脂
  { tag: '高血脂', q: '高血脂要避免吃什麼？', a: '應避免反式脂肪（炸物、酥皮點心）、高飽和脂肪（肥肉、豬皮）、高膽固醇食物（蛋黃不超過每週 3–4 顆）。建議多吃蔬果、全穀類、魚類（尤其深海魚）。' },
  { tag: '高血脂', q: '橄欖油炒菜比較健康嗎？', a: '橄欖油富含單元不飽和脂肪酸，相比豬油或棕櫚油確實更健康。但仍需注意用量，烹調時建議少油、低溫，以降低整體脂肪攝取。' },

  // 糖尿病
  { tag: '糖尿病', q: '糖尿病患者可以吃水果嗎？', a: '可以，但需注意份量與種類。建議選擇低升糖指數水果（如芭樂、蘋果、梨子），避免高糖水果（如荔枝、龍眼、西瓜）。每次以一個拳頭大小為宜。' },
  { tag: '糖尿病', q: '糙米比白米更適合糖尿病患者嗎？', a: '是的，糙米屬於全穀類，升糖指數（GI值）比白米低，膳食纖維也更豐富，有助於延緩血糖上升。建議以糙米、五穀米取代精緻白米。' },
  { tag: '糖尿病', q: '無糖飲料對糖尿病友好嗎？', a: '無糖飲料（使用代糖）對血糖的直接影響較小，但某些代糖可能影響腸道菌相。建議以白開水、無糖綠茶為主，偶爾飲用無糖飲料。' },

  // 高血壓
  { tag: '高血壓', q: '高血壓患者一天可以攝取多少鈉？', a: '世界衛生組織建議每日鈉攝取量低於 2000mg（相當於 5g 食鹽）。高血壓患者應盡量減少加工食品、罐頭食品、醬料的使用，並選擇低鈉調味品。' },
  { tag: '高血壓', q: '香蕉對高血壓有幫助嗎？', a: '香蕉富含鉀，而鉀有助於對抗鈉的升壓作用。適量食用香蕉對高血壓患者有益，但仍需注意整體熱量與糖分攝取。' },

  // 一般
  { tag: '一般', q: 'Nutrition Guard 的風險評估有醫療意義嗎？', a: '本系統提供的是飲食風險參考資訊，不構成醫療建議。評估結果基於食物標籤與規則引擎，個人實際情況應諮詢主治醫師或營養師。' },
  { tag: '一般', q: '我可以同時選擇多種疾病條件嗎？', a: '可以。系統支援同時選擇多種慢性病條件（痛風、高血脂、糖尿病、高血壓），食物卡片會顯示每個條件對應的風險等級，方便一次掌握全面資訊。' },
]

const TAGS = ['全部', '痛風', '高血脂', '糖尿病', '高血壓', '一般']

export function FAQ() {
  const [activeTag, setActiveTag] = useState('全部')
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const filtered = activeTag === '全部' ? FAQ_DATA : FAQ_DATA.filter((f) => f.tag === activeTag)

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">常見問題</h1>
      <p className="text-sm text-gray-500 mb-6">關於飲食與慢性病管理的常見疑問</p>

      {/* Filter */}
      <div className="flex gap-2 flex-wrap mb-8">
        {TAGS.map((tag) => (
          <button
            key={tag}
            onClick={() => { setActiveTag(tag); setOpenIndex(null) }}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
              activeTag === tag ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-indigo-50'
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.map((item, i) => (
          <div key={i} className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden">
            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="w-full flex items-center justify-between px-5 py-4 text-left"
            >
              <div className="flex items-center gap-3">
                <span className="text-xs bg-indigo-100 text-indigo-600 px-2 py-0.5 rounded-full font-medium shrink-0">{item.tag}</span>
                <span className="font-medium text-gray-900 text-sm">{item.q}</span>
              </div>
              {openIndex === i ? <ChevronUp size={16} className="text-gray-400 shrink-0" /> : <ChevronDown size={16} className="text-gray-400 shrink-0" />}
            </button>
            {openIndex === i && (
              <div className="px-5 pb-4 text-sm text-gray-600 leading-relaxed border-t border-gray-50">
                <p className="pt-3">{item.a}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

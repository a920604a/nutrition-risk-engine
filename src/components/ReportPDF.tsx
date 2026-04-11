import { Document, Page, Text, View, Svg, Rect, Line, StyleSheet, Font, pdf } from '@react-pdf/renderer'
import type { AnalysisResult } from '../lib/api'

Font.register({
  family: 'NotoSansSC',
  src: '/fonts/NotoSansSC-Regular.ttf',
})

export interface ChartDay {
  label: string
  total: number
  highCount: number
  isToday: boolean
}

export interface HighRiskFood {
  name: string
  count: number
}

interface Article {
  id: string
  title: string
  condition_tags: string[]
}

export interface ReportPDFProps {
  reportDate: string
  dateRange: string
  conditions: string[]
  chartData: ChartDay[]
  highRiskFoods: HighRiskFood[]
  analysis: AnalysisResult
  relatedArticles: Article[]
}

const styles = StyleSheet.create({
  page: {
    fontFamily: 'NotoSansSC',
    fontSize: 10,
    color: '#1f2937',
    paddingTop: 40,
    paddingBottom: 50,
    paddingHorizontal: 40,
  },
  headerBlock: {
    backgroundColor: '#4f46e5',
    borderRadius: 8,
    padding: 20,
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 18,
    color: '#ffffff',
    marginBottom: 6,
  },
  headerSub: {
    fontSize: 9,
    color: '#c7d2fe',
    marginTop: 2,
  },
  sectionTitle: {
    fontSize: 11,
    color: '#374151',
    marginBottom: 8,
    marginTop: 16,
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    marginBottom: 12,
  },
  bodyText: {
    fontSize: 9,
    color: '#4b5563',
    lineHeight: 1.6,
  },
  legendRow: {
    flexDirection: 'row',
    gap: 16,
    marginTop: 8,
    marginBottom: 4,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  legendLabel: {
    fontSize: 8,
    color: '#6b7280',
  },
  riskBox: {
    backgroundColor: '#fef2f2',
    borderRadius: 6,
    padding: 10,
    marginBottom: 10,
    marginTop: 10,
  },
  riskBoxTitle: {
    fontSize: 9,
    color: '#dc2626',
    marginBottom: 6,
  },
  bulletRow: {
    flexDirection: 'row',
    marginBottom: 3,
  },
  bulletDot: {
    fontSize: 9,
    color: '#ef4444',
    marginRight: 5,
  },
  recommendRow: {
    flexDirection: 'row',
    marginBottom: 6,
    alignItems: 'flex-start',
  },
  recommendNum: {
    fontSize: 9,
    color: '#6366f1',
    marginRight: 6,
    width: 14,
  },
  articleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#eef2ff',
    borderRadius: 5,
    padding: 8,
    marginBottom: 5,
  },
  articleTitle: {
    fontSize: 9,
    color: '#4338ca',
    flex: 1,
  },
  articleTag: {
    fontSize: 8,
    color: '#6366f1',
  },
  footer: {
    position: 'absolute',
    bottom: 20,
    left: 40,
    right: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 0.5,
    borderTopColor: '#e5e7eb',
    paddingTop: 6,
  },
  footerText: {
    fontSize: 8,
    color: '#9ca3af',
  },
  disclaimer: {
    marginTop: 24,
    backgroundColor: '#f9fafb',
    borderRadius: 6,
    padding: 10,
  },
  disclaimerText: {
    fontSize: 8,
    color: '#9ca3af',
    lineHeight: 1.5,
  },
})

function BarChart({ chartData, maxTotal }: { chartData: ChartDay[]; maxTotal: number }) {
  const W = 460
  const barAreaH = 60
  const barW = W / 7
  const gap = 4

  return (
    <Svg width={W} height={80}>
      <Line x1={0} y1={barAreaH} x2={W} y2={barAreaH} strokeWidth={0.5} stroke="#e5e7eb" />
      {chartData.map((day, i) => {
        const x = i * barW
        const barH = day.total > 0 ? Math.max((day.total / maxTotal) * barAreaH, 3) : 0
        const y = barAreaH - barH
        const fill = day.highCount > 0 ? '#FCA5A5' : '#A5B4FC'
        const opacity = day.isToday ? 1 : 0.65
        const labelX = x + barW / 2
        return (
          <View key={day.label}>
            {barH > 0 && (
              <Rect
                x={x + gap / 2}
                y={y}
                width={barW - gap}
                height={barH}
                fill={fill}
                opacity={opacity}
                rx={2}
              />
            )}
            <Text
              x={labelX}
              y={barAreaH + 14}
              style={{ fontSize: 7, fill: day.isToday ? '#4f46e5' : '#9ca3af' }}
            >
              {day.label}
            </Text>
          </View>
        )
      })}
    </Svg>
  )
}

export function ReportPDF({
  reportDate,
  dateRange,
  conditions,
  chartData,
  highRiskFoods,
  analysis,
  relatedArticles,
}: ReportPDFProps) {
  const maxTotal = Math.max(...chartData.map((d) => d.total), 1)
  const maxCount = Math.max(...highRiskFoods.map((f) => f.count), 1)

  return (
    <Document>
      {/* PAGE 1 */}
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.headerBlock}>
          <Text style={styles.headerTitle}>個人飲食風險報告</Text>
          <Text style={styles.headerSub}>{reportDate}　|　{dateRange}</Text>
          <Text style={styles.headerSub}>疾病條件：{conditions.join('、') || '未設定'}</Text>
        </View>

        {/* 7-day bar chart */}
        <Text style={styles.sectionTitle}>近 7 天飲食記錄量</Text>
        <View style={styles.divider} />
        <BarChart chartData={chartData} maxTotal={maxTotal} />
        <View style={styles.legendRow}>
          <View style={styles.legendItem}>
            <Svg width={10} height={10}>
              <Rect x={0} y={0} width={10} height={10} fill="#FCA5A5" rx={2} />
            </Svg>
            <Text style={styles.legendLabel}>含高風險飲食</Text>
          </View>
          <View style={styles.legendItem}>
            <Svg width={10} height={10}>
              <Rect x={0} y={0} width={10} height={10} fill="#A5B4FC" rx={2} />
            </Svg>
            <Text style={styles.legendLabel}>一般記錄</Text>
          </View>
        </View>

        {/* High-risk food frequency */}
        {highRiskFoods.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>高風險食物頻率（近 7 天）</Text>
            <View style={styles.divider} />
            {highRiskFoods.map((food, i) => (
              <View key={i} style={{ marginBottom: 8 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 3 }}>
                  <Text style={styles.bodyText}>{food.name}</Text>
                  <Text style={{ fontSize: 9, color: '#ef4444' }}>{food.count} 次</Text>
                </View>
                <Svg width={460} height={8}>
                  <Rect x={0} y={0} width={460} height={8} fill="#fee2e2" rx={4} />
                  <Rect
                    x={0}
                    y={0}
                    width={(food.count / maxCount) * 460}
                    height={8}
                    fill="#f87171"
                    rx={4}
                  />
                </Svg>
              </View>
            ))}
          </>
        )}

        {/* Footer */}
        <View style={styles.footer} fixed>
          <Text style={styles.footerText}>Nutrition Guard 飲食風險報告</Text>
          <Text style={styles.footerText} render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`} />
        </View>
      </Page>

      {/* PAGE 2 */}
      <Page size="A4" style={styles.page}>
        <Text style={styles.sectionTitle}>AI 個人化飲食建議</Text>
        <View style={styles.divider} />

        <Text style={styles.bodyText}>{analysis.summary}</Text>

        {analysis.riskHighlights.length > 0 && (
          <View style={styles.riskBox}>
            <Text style={styles.riskBoxTitle}>本週需注意</Text>
            {analysis.riskHighlights.map((h, i) => (
              <View key={i} style={styles.bulletRow}>
                <Text style={styles.bulletDot}>•</Text>
                <Text style={styles.bodyText}>{h}</Text>
              </View>
            ))}
          </View>
        )}

        {analysis.recommendations.length > 0 && (
          <View style={{ marginTop: 8 }}>
            <Text style={{ fontSize: 9, color: '#374151', marginBottom: 8 }}>具體建議</Text>
            {analysis.recommendations.map((rec, i) => (
              <View key={i} style={styles.recommendRow}>
                <Text style={styles.recommendNum}>{i + 1}.</Text>
                <Text style={styles.bodyText}>{rec}</Text>
              </View>
            ))}
          </View>
        )}

        {relatedArticles.length > 0 && (
          <View style={{ marginTop: 20 }}>
            <Text style={styles.sectionTitle}>相關衛教文章</Text>
            <View style={styles.divider} />
            {relatedArticles.slice(0, 5).map((article, i) => (
              <View key={i} style={styles.articleRow}>
                <Text style={styles.articleTitle}>{article.title}</Text>
                <Text style={styles.articleTag}>知識專區</Text>
              </View>
            ))}
          </View>
        )}

        <View style={styles.disclaimer}>
          <Text style={styles.disclaimerText}>
            本報告由 AI 自動生成，僅供參考，不構成醫療建議。如有健康疑慮請諮詢專業醫療人員。
          </Text>
        </View>

        <View style={styles.footer} fixed>
          <Text style={styles.footerText}>Nutrition Guard 飲食風險報告</Text>
          <Text style={styles.footerText} render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`} />
        </View>
      </Page>
    </Document>
  )
}

export async function downloadReport(props: ReportPDFProps): Promise<void> {
  const blob = await pdf(<ReportPDF {...props} />).toBlob()
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  const dateStr = props.reportDate.replace(/[年月日\s]/g, '')
  a.download = `飲食風險報告_${dateStr}.pdf`
  a.click()
  URL.revokeObjectURL(url)
}

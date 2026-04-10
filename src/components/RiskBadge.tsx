import { RISK_LABELS, CONDITION_LABELS } from '../engine/riskEngine'
import type { Condition, RiskLevel } from '../engine/riskEngine'

interface RiskBadgeProps {
  condition: Condition
  level: RiskLevel
  compact?: boolean
}

export function RiskBadge({ condition, level, compact = false }: RiskBadgeProps) {
  const risk = RISK_LABELS[level]
  const cond = CONDITION_LABELS[condition]

  if (compact) {
    return (
      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${risk.className}`}>
        {risk.emoji} {risk.zh}
      </span>
    )
  }

  return (
    <div className="flex items-center justify-between py-1.5">
      <span className="text-sm text-gray-600">{cond.zh}</span>
      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold ${risk.className}`}>
        {risk.emoji} {risk.zh}
      </span>
    </div>
  )
}

import { useEffect, useRef } from 'react'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { db } from '../lib/firebase'
import { useAppStore } from '../store/useAppStore'
import type { Condition } from '../engine/riskEngine'

const CONDITION_MIGRATION: Record<string, Condition> = {
  gout: '痛風',
  hyperlipidemia: '高血脂',
  diabetes: '糖尿病',
  hypertension: '高血壓',
}

export function useConditionsSync() {
  const { user, conditions, setConditions } = useAppStore()
  const isSyncing = useRef(false)
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const prevUid = useRef<string | null>(null)

  // On login: pull conditions from Firestore
  useEffect(() => {
    if (!user) { prevUid.current = null; return }
    if (user.uid === prevUid.current) return
    prevUid.current = user.uid

    isSyncing.current = true
    getDoc(doc(db, 'users', user.uid, 'settings', 'profile'))
      .then((snap) => {
        if (snap.exists()) {
          const data = snap.data()
          if (Array.isArray(data.conditions) && data.conditions.length > 0) {
            const migrated = data.conditions.map(
              (c: string) => CONDITION_MIGRATION[c] ?? c
            ) as Condition[]
            setConditions(migrated)
          }
        }
      })
      .finally(() => {
        setTimeout(() => { isSyncing.current = false }, 500)
      })
  }, [user?.uid])

  // On conditions change: push to Firestore
  useEffect(() => {
    if (!user || isSyncing.current) return
    if (debounceTimer.current) clearTimeout(debounceTimer.current)
    debounceTimer.current = setTimeout(() => {
      setDoc(
        doc(db, 'users', user.uid, 'settings', 'profile'),
        { conditions },
        { merge: true }
      )
    }, 500)
    return () => {
      if (debounceTimer.current) clearTimeout(debounceTimer.current)
    }
  }, [conditions, user?.uid])
}

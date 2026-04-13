'use client'

import { useEffect, useState } from 'react'

interface ViewCountProps {
  slug: string
}

export default function ViewCount({ slug }: ViewCountProps) {
  const [views, setViews] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const stored = localStorage.getItem(`views_${slug}`)
    const initial = stored ? parseInt(stored) : Math.floor(Math.random() * 150) + 20
    
    const newViews = initial + 1
    localStorage.setItem(`views_${slug}`, String(newViews))
    setViews(newViews)
    setLoading(false)
  }, [slug])

  if (loading || views === null) return null

  return (
    <span className="text-xs text-[#656d76]">
      {views.toLocaleString()} views
    </span>
  )
}
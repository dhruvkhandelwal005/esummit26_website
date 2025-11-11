import type React from "react"

import { useEffect, useRef } from "react"

interface CursorGlowProps {
  containerRef: React.RefObject<HTMLDivElement>
  radiusPx?: number
  intensity?: number
}

export function CursorGlow({ containerRef, radiusPx = 520, intensity = 0.14 }: CursorGlowProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let mouseX = canvas.width / 2
    let mouseY = canvas.height / 2
    let targetX = mouseX
    let targetY = mouseY

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      targetX = e.clientX - rect.left
      targetY = e.clientY - rect.top
    }

    const handleResize = () => {
      if (!containerRef.current) return
      canvas.width = containerRef.current.clientWidth
      canvas.height = containerRef.current.clientHeight
    }

    containerRef.current?.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("resize", handleResize)
    handleResize()

    const animate = () => {
      mouseX += (targetX - mouseX) * 0.1
      mouseY += (targetY - mouseY) * 0.1

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const gradient = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, radiusPx)
      gradient.addColorStop(0, `rgba(219, 112, 147, ${intensity * 0.8})`)
      gradient.addColorStop(0.5, `rgba(219, 112, 147, ${intensity * 0.4})`)
      gradient.addColorStop(1, `rgba(219, 112, 147, 0)`)

      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      containerRef.current?.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("resize", handleResize)
    }
  }, [containerRef, radiusPx, intensity])

  return <canvas ref={canvasRef} className="absolute inset-0 z-10 pointer-events-none" />
}

import { useEffect, useRef } from "react"

export function ToriiGate() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const canvas = document.createElement("canvas")
    containerRef.current.appendChild(canvas)

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = containerRef.current.clientWidth
    canvas.height = containerRef.current.clientHeight

    // Draw Torii Gate
    const drawToriiGate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const centerX = canvas.width / 2
      const centerY = canvas.height / 2
      const scale = Math.min(canvas.width, canvas.height) / 600

      // Main gate color - deep red
      ctx.fillStyle = "rgba(216, 30, 91, 0.8)"
      ctx.strokeStyle = "rgba(216, 30, 91, 1)"
      ctx.lineWidth = 8 * scale

      // Draw vertical posts
      const postWidth = 15 * scale
      const postHeight = 200 * scale
      const gateWidth = 150 * scale

      // Left post
      ctx.fillRect(centerX - gateWidth, centerY - postHeight / 2, postWidth, postHeight)
      // Right post
      ctx.fillRect(centerX + gateWidth, centerY - postHeight / 2, postWidth, postHeight)

      // Top horizontal beam
      ctx.beginPath()
      ctx.moveTo(centerX - gateWidth, centerY - 80 * scale)
      ctx.lineTo(centerX + gateWidth + postWidth, centerY - 80 * scale)
      ctx.lineWidth = 12 * scale
      ctx.stroke()

      // Top curved beam
      ctx.beginPath()
      ctx.moveTo(centerX - gateWidth - 20 * scale, centerY - 100 * scale)
      ctx.quadraticCurveTo(
        centerX,
        centerY - 120 * scale,
        centerX + gateWidth + postWidth + 20 * scale,
        centerY - 100 * scale,
      )
      ctx.lineWidth = 10 * scale
      ctx.strokeStyle = "rgba(216, 30, 91, 0.9)"
      ctx.stroke()

      // Decorative gold elements
      ctx.fillStyle = "rgba(193, 154, 107, 0.7)"
      // Top decoration
      ctx.fillRect(centerX - 30 * scale, centerY - 130 * scale, 60 * scale, 15 * scale)
    }

    drawToriiGate()
    window.addEventListener("resize", () => {
      canvas.width = containerRef.current?.clientWidth || 0
      canvas.height = containerRef.current?.clientHeight || 0
      drawToriiGate()
    })
  }, [])

  return <div ref={containerRef} className="w-full h-full" />
}

import { getSvgPath } from 'figma-squircle'

for (const node of figma.currentPage.selection) {
  if (node.type === 'RECTANGLE') {
    const {
      width,
      height,
      x,
      y,
      cornerSmoothing,
      topLeftRadius,
      topRightRadius,
      bottomLeftRadius,
      bottomRightRadius,
      fills,
    } = node

    const squirclePath = getSvgPath({
      width,
      height,
      cornerSmoothing,
      topLeftCornerRadius: topLeftRadius,
      topRightCornerRadius: topRightRadius,
      bottomLeftCornerRadius: bottomLeftRadius,
      bottomRightCornerRadius: bottomRightRadius,
      preserveSmoothing: true,
    })

    const svg = `
      <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
        <path d="${squirclePath}" />
      </svg>`

    const svgFrameNode = figma.createNodeFromSvg(svg)
    const vectorNode = svgFrameNode.children[0]
    if (vectorNode.type == 'VECTOR') {
      vectorNode.fills = fills
    }
    vectorNode.x = x + width * 1.25
    vectorNode.y = y

    const parentNode = node.parent ?? figma.currentPage
    parentNode.appendChild(vectorNode)
    svgFrameNode.remove()
  } else {
    figma.notify('Please select a rectangle')
  }
}

figma.closePlugin()

export {}

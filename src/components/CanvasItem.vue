<!--
 * @Author       : 'YDW'
 * @Date         : 2023-09-13 11:17:26
 * @LastEditors  : 'YDW' 2310861314@qq.com
 * @LastEditTime : 2023-09-14 01:03:05
 * @Description  : 
-->
<template>
  <div class="canvas-item">
    <canvas id="canvas" width="600" height="600"></canvas>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
const ctx = ref()
const statusConfig = {
  IDLE: 0, //空闲
  DRAG_START: 1, // 拖拽开始
  DRAGGING: 2, // 拖拽中
  MOVE_START: 3,
  MOVING: 4,
}
type InfoType = { x: number | null; y: number | null }
interface CanvasInfoType {
  status: number
  dragTarget: null | boolean | InfoType
  lastEvtPos: InfoType
  offsetEvtPos: InfoType
  offsetMouseEvtPos: InfoType
  offset: InfoType
  scale: number
  scaleStep: number
  maxScale: number
  minScale: number
}
/**
 * @description:
 * @param { number } x 圆中心x坐标
 * @param { number } y 圆中心y坐标
 * @param { number } r 圆半径
 */
interface CircleType {
  x: number
  y: number
  r?: number
}
const canvasInfo: CanvasInfoType = {
  status: statusConfig.IDLE,
  dragTarget: null, // 拖拽对象
  lastEvtPos: { x: null, y: null },
  offsetEvtPos: { x: null, y: null },
  offsetMouseEvtPos: { x: null, y: null },
  offset: { x: 0, y: 0 },
  scale: 1,
  scaleStep: 0.1,
  maxScale: 2,
  minScale: 0.5,
}

const circle: CircleType[] = []
/**
 * 画圆
 * @param { CanvasRenderingContext2D } ctx 画笔状态
 * @param { number } cx  圆中心x坐标
 * @param { number } cy  圆中心y坐标
 * @param { number } r   圆半径
 */
const drawCircle = (ctx: CanvasRenderingContext2D, cx: number, cy: number, r: number) => {
  // 保存当前的状态
  ctx.save()
  // 开始一段新的path构建
  ctx.beginPath()
  // 边的颜色
  ctx.strokeStyle = 'blue'
  // 画圆
  ctx.arc(cx, cy, r, 0, Math.PI * 2)
  // 描边模式
  ctx.stroke()
  // 将本次path的终点和起点连接，构建封闭路径
  ctx.closePath()
  // 保持画笔
  ctx.restore()
}

/**
 * 获取偏移量
 * @param e
 */
const getCanvasPosition = (e: MouseEvent, offset = { x: 0, y: 0 }, scale = 1): InfoType => {
  return {
    x: (e.offsetX - offset.x ?? 0) / scale || null,
    y: (e.offsetY - offset.y ?? 0) / scale || null,
  }
}

/**
 * 获取鼠标位置
 * @param e
 */
const getMousePosition = (e: MouseEvent) => {
  return {
    x: e.offsetX,
    y: e.offsetY,
  }
}

/**
 * 计算距离
 * @param p1
 * @param p2
 */
const getDistance = (p1: InfoType, p2: InfoType) => {
  return Math.sqrt((p1.x! - p2.x!) ** 2 + (p1.y! - p2.y!) ** 2)
}
/**
 * 是否在圆内
 * @param pos
 */
const ifInCircle = (pos: InfoType): boolean | InfoType => {
  for (let i = 0; i < circle.length; i++) {
    if (getDistance(circle[i], pos) < circle[i].r!) {
      return circle[i]
    }
  }
  return false
}

onMounted(() => {
  const canvas = document.getElementById('canvas')! as HTMLCanvasElement
  // 获取2d画笔
  ctx.value = canvas.getContext('2d') as CanvasRenderingContext2D
  drawCircle(ctx.value, 100, 100, 10)
  circle.push({ x: 100, y: 100, r: 10 })
  drawCircle(ctx.value, 200, 200, 20)
  circle.push({ x: 200, y: 200, r: 20 })

  canvas.oncontextmenu = () => false

  const render = () => {
    ctx.value.setTransform(
      canvasInfo.scale,
      0,
      0,
      canvasInfo.scale,
      canvasInfo.offset.x,
      canvasInfo.offset.y,
    )
    ctx.value.clearRect(0, 0, canvas.width, canvas.height)

    circle.forEach((c) => drawCircle(ctx.value, c.x, c.y, c.r!))
  }

  canvas.addEventListener('mousedown', (e: MouseEvent) => {
    const { x, y } = canvasInfo.offset
    const canvasPosition = getCanvasPosition(e, { x: x!, y: y! }, canvasInfo.scale)

    const circleRef = ifInCircle(canvasPosition)
    if (e.button === 0) {
      // 在圆内就是拖拽范围
      if (circleRef) {
        console.log('在圆内')
        canvasInfo.dragTarget = circleRef
        canvasInfo.status = statusConfig.DRAG_START
        canvasInfo.lastEvtPos = canvasPosition
        canvasInfo.offsetEvtPos = canvasPosition
      }
    } else if (e.button === 2) {
      if (!circleRef) {
        console.log('move')
        canvasInfo.status = statusConfig.MOVE_START
        // canvasInfo.lastEvtPos = canvasPosition
        canvasInfo.offsetMouseEvtPos = getMousePosition(e)
      }
    }
  })

  canvas.addEventListener('mousemove', (e: MouseEvent) => {
    const { DRAG_START, DRAGGING, MOVE_START, MOVING } = statusConfig
    const { x, y } = canvasInfo.offset
    const canvasPosition = getCanvasPosition(e, { x: x!, y: y! }, canvasInfo.scale)
    if (ifInCircle(canvasPosition)) {
      canvas.style.cursor = 'grabbing'
    } else {
      canvas.style.cursor = ''
    }
    if (
      canvasInfo.status === DRAG_START &&
      getDistance(canvasPosition, canvasInfo.lastEvtPos) > 5
    ) {
      console.log('try to drag')
      canvasInfo.status = DRAGGING
      // canvasInfo.offsetEvtPos = canvasPosition
    } else if (canvasInfo.status === DRAGGING) {
      console.log('dragging')
      const { dragTarget } = canvasInfo
      ;(dragTarget as InfoType).x! += canvasPosition.x! - canvasInfo.offsetEvtPos.x!
      ;(dragTarget as InfoType).y! += canvasPosition.y! - canvasInfo.offsetEvtPos.y!
      // ctx.value.clearRect(0, 0, canvas.width, canvas.height)
      // circle.forEach((c) => {
      //   drawCircle(ctx.value, c.x, c.y, c.r!)
      // })
      render()
      canvasInfo.offsetEvtPos = canvasPosition
    } else if (
      canvasInfo.status === MOVE_START &&
      getDistance(canvasPosition, canvasInfo.lastEvtPos) > 5
    ) {
      console.log('move start')
      canvasInfo.status = MOVING
      canvasInfo.offsetMouseEvtPos = getMousePosition(e)
    } else if (canvasInfo.status === MOVING) {
      console.log('moving')
      const mousePosition = getMousePosition(e)
      canvasInfo.offset.x! += mousePosition.x! - canvasInfo.offsetMouseEvtPos.x!
      canvasInfo.offset.y! += mousePosition.y! - canvasInfo.offsetMouseEvtPos.y!

      render()
      canvasInfo.offsetMouseEvtPos = mousePosition
    }
  })

  canvas.addEventListener('mouseup', (e: MouseEvent) => {
    if (canvasInfo.status === statusConfig.DRAGGING || canvasInfo.status === statusConfig.MOVING) {
      console.log('撤销移动状态', e)
      canvasInfo.status = statusConfig.IDLE
    }
  })

  canvas.addEventListener('wheel', (e: WheelEvent) => {
    e.preventDefault()
    const { x, y } = canvasInfo.offset
    const canvasPosition = getCanvasPosition(e, { x: x!, y: y! })
    // 真实的位置
    // const realCanvasPosition = {
    //   x: canvasPosition.x! - canvasInfo.offset.x!,
    //   y: canvasPosition.y! - canvasInfo.offset.y!,
    // }
    const { scaleStep, maxScale, minScale } = canvasInfo
    const deltaX = (canvasPosition.x! / canvasInfo.scale) * canvasInfo.scaleStep
    const deltaY = (canvasPosition.y! / canvasInfo.scale) * canvasInfo.scaleStep
    // 限制放缩倍数
    if (e.deltaY < 0 && canvasInfo.scale < maxScale) {
      console.log('up')
      canvasInfo.offset.x! -= deltaX
      canvasInfo.offset.y! -= deltaY
      canvasInfo.scale += scaleStep
    } else if (e.deltaY > 0 && canvasInfo.scale > minScale) {
      console.log('down')
      canvasInfo.offset.x! += deltaX
      canvasInfo.offset.y! += deltaY
      canvasInfo.scale -= scaleStep
    }
    render()
  })
})
</script>

<style lang="less" scoped>
#canvas {
  width: 600px;
  height: 600px;
  border: 1px solid greenyellow;
}
</style>

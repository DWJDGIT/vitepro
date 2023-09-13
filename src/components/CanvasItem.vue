<!--
 * @Author       : 'YDW'
 * @Date         : 2023-09-13 11:17:26
 * @LastEditors  : 'YDW' 2310861314@qq.com
 * @LastEditTime : 2023-09-13 18:41:53
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
}
type InfoType = { x: number | null; y: number | null }
interface CanvasInfoType {
  status: number
  dragTarget: null | boolean | InfoType
  lastEvtPos: InfoType
  offsetEvtPos: InfoType
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
const getCanvasPosition = (e: MouseEvent): InfoType => {
  return {
    x: e.offsetX || null,
    y: e.offsetY || null,
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

  canvas.addEventListener('mousedown', (e: MouseEvent) => {
    const canvasPosition = getCanvasPosition(e)
    const circleRef = ifInCircle(canvasPosition)
    // 在圆内就是拖拽范围
    if (circleRef) {
      console.log('在圆内')

      canvasInfo.dragTarget = circleRef
      canvasInfo.status = statusConfig.DRAG_START
      canvasInfo.lastEvtPos = canvasPosition
      canvasInfo.offsetEvtPos = canvasPosition
    }
  })

  canvas.addEventListener('mousemove', (e: MouseEvent) => {
    const canvasPosition = getCanvasPosition(e)
    if (
      canvasInfo.status === statusConfig.DRAG_START &&
      getDistance(canvasPosition, canvasInfo.lastEvtPos) > 5
    ) {
      console.log('try to drag')
      canvasInfo.status = statusConfig.DRAGGING
      canvasInfo.offsetEvtPos = canvasPosition
    } else if (canvasInfo.status === statusConfig.DRAGGING) {
      console.log('dragging')
      const { dragTarget } = canvasInfo
      ;(dragTarget as InfoType).x! += canvasPosition.x! - canvasInfo.offsetEvtPos.x!
      ;(dragTarget as InfoType).y! += canvasPosition.y! - canvasInfo.offsetEvtPos.y!
      ctx.value.clearRect(0, 0, canvas.width, canvas.height)
      console.log(circle)

      circle.forEach((c) => {
        drawCircle(ctx.value, c.x, c.y, c.r!)
      })
      canvasInfo.offsetEvtPos = canvasPosition
    }
  })

  canvas.addEventListener('mouseup', (e: MouseEvent) => {
    if (canvasInfo.status === statusConfig.DRAGGING) {
      console.log('撤销移动状态', e)
      canvasInfo.status = statusConfig.IDLE
    }
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

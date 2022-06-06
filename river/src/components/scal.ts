import { RectResize } from '@logicflow/extension'
class CustomNode extends RectResize.view { }
class CustomNodeModel extends RectResize.model {
  initNodeData (data: unknown) {
    super.initNodeData(data)
    this.width = 100
    this.height = 60
  }

  setAttributes () {
    // const size = 80
    const circleOnlyAsTarget = {
      message: '正方形节点下一个节点只能是圆形节点',
      validate: (sourceNode: any, targetNode: any, sourceAnchor: any, targetAnchor: any) => {
        // console.log(sourceNode)
        console.log(sourceNode, targetNode, sourceAnchor, targetAnchor)
        // return targetNode.type === 'circle'
        return true
        // return false
      }
    }
    const circleOnlyToTarget = {
      message: '起点相连',
      validate: (sourceNode: any, targetNode: any, sourceAnchor: any, targetAnchor: any) => {
        // console.log(sourceNode)
        console.log(sourceNode, targetNode, sourceAnchor, targetAnchor)
        return targetNode.id === sourceNode.id
        // return true
      }
    }
    console.log(circleOnlyAsTarget.validate)

    // this.width = size
    // this.height = size
    // 起点边
    this.sourceRules.push(circleOnlyAsTarget)
    // 目标边
    this.targetRules.push(circleOnlyToTarget)
  }
}
export default
{
  type: 'user-rect',
  model: CustomNodeModel,
  view: CustomNode,
  mod: {
    name: '自动定义'
  }
}

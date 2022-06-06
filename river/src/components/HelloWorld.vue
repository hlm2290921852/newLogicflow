<template>
<div style="display:flex;position:relative">
  <div class="cantainer-menu">
    <div>
    <h1>11111111111</h1>
    <div class="node-conta">
      <div  class="node-cop" onselectstart="return false">
        <span>klklkl</span>
      </div>
    </div>
    </div>
  </div>
  <div id="hello" ref="container"></div>
  <div id="node-title" v-if="clickNode"></div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import LogicFlow from '@logicflow/core'
import '@logicflow/core/dist/style/index.css'
import { Menu, Control } from '@logicflow/extension'
import '@logicflow/extension/lib/style/index.css'
// 自定义形状
import userRect from './scal'
LogicFlow.use(Menu)
LogicFlow.use(Control)

@Component({
  name: 'HelloWord'
})

export default class HelloWord extends Vue {
  clickNode = false

  mounted () {
    //   实例化
    const lf = new LogicFlow({
      container: this.$refs.container as HTMLElement,
      edgeType: 'bezier',
      stopMoveGraph: true,
      width: 1000,
      height: 700
    })
    Array.from(document.querySelectorAll('.node-cop')).forEach(item => {
      item.addEventListener('mousedown', () => {
        let text = ''
        if (!(item.children[0].textContent as string)) {
          text = '可自定义'
        } else {
          text = item.children[0].textContent as string
        }
        // 判断自己拖拽的是啥类型用自己注册的
        lf.dnd.startDrag({
          type: 'user-rect',
          text: text
        })
      })
    })
    // 右键菜单面板
    lf.extension.menu.setMenuConfig({
      nodeMenu: [
        {
          text: '删除',
          callback (node: { id: string }) {
            lf.deleteNode(node.id)
          }
        }
      ], // 覆盖默认的节点右键菜单
      edgeMenu: [{
        text: '删除',
        callback (node: { id: string }) {
          lf.deleteEdge(node.id)
        }
      }], // 删除默认的边右键菜单
      graphMenu: [] // 覆盖默认的边右键菜单，与false表现一样
    })
    // 注册自定义图形
    lf.register(userRect)
    lf.on('node:dnd-add', (data) => {
      console.log(data)
    })
    lf.on('blank:click', () => {
      this.clickNode = false
    })
    lf.on('node:click', (args) => {
      console.log(args)
      this.clickNode = true
    })
    // document.getElementsByClassName('').addEventListener('')
    lf.render()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
// #item {
//     // width: 600px;
//     // height: 300px;
//     // border: 1px solid #ddd;
// }

// .custom-context-menu {
//     //位置固定
//     position: fixed;
//     border: 1px solid #ccc;
//     font-size: 20px;
// }
.cantainer-menu{
  height: 700px;
  width: 185px;
    // height: calc(100% - 40px);
    border-right: 1px solid #dadce0;
    padding: 10px;
  h1{
    margin: 0;
    font-size: 14px;
    display: block;
    border-bottom: 1px solid #e5e5e5;
    line-height: 30px;
    margin-bottom: 10px;
  }
  .node-conta{
    border-bottom: 1px solid #e5e5e5;
  }
  .node-cop{
    padding: 10px 20px;
    border: 2px #666 solid;
    span{
      cursor:pointer;
      user-select: none;
    }
  }
}
#node-title{
  width: 300px;
    // background: #fff;
    background: #666;
    // height: calc(100% - 40px);
    height: 700px;
    position: absolute;
    right: 0;
    border-left: 1px solid #dadce0;
}
</style>

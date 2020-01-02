# Object-View-TS

## 基于TypeScript开发的Object展示组件，借鉴于Vue-Json-Pretty组件，当然它也是一个Vue组件

### 属性

  * data 需要展示的数据
  * deep 默认展开数据的深度
  * show-line 数据展开的样式
  * show-length 数据的数量
  * show-double-quotes 属性名称是否有双括号


### 示例

   ``` javascript
   <object-view 
     :data="data" 
     :deep="2" 
     :show-line="true"
     :show-length="true"
     :show-double-quotes="true"
   >
   </object-view>
   ```
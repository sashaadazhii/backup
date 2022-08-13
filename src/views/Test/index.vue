<template>
  <div class="wrap">
    <draggable tag="ul" :list="list" class="list-group" handle=".h" item-key="name">
      <template #item="{element, index}">
        <li class="list-group-item">
          <i class="i-add h"></i>
          <span class="text">{{ element.name }} </span>
          <input type="text" class="form-control" v-model="element.text" />
          <i class="fa fa-times close" @click="removeAt(index)"></i>
        </li>
      </template>
    </draggable>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
export default {
  name: 'test',
  components: {
    draggable
  },
  data() {
    return {
      list: [
        {name: 'John', text: '', id: 0},
        {name: 'Joao', text: '', id: 1},
        {name: 'Jean', text: '', id: 2}
      ],
      dragging: false
    }
  }
}
</script>
<style lang="scss"></style>
<style lang="scss" scoped>
.wrap {
  padding: 100px;
}
.pool {
  width: 100px;
  height: 6px;
  background-color: red;
}
.line {
  width: 6px;
  height: 100px;
  background-color: red;
}
.round {
  height: 100px;
  width: 100px;
  // background-color: red;
  position: relative;
  &__bottom {
    position: absolute;
    width: 50%;
    height: 6px;
    background-color: blue;
    bottom: 0;
    right: 0;
  }
  &__left {
    position: absolute;
    width: 6px;
    height: 50%;
    background-color: blue;
    top: 0;
    left: 0;
  }
  &__round {
    position: absolute;
    width: 100px;
    height: 100px;
    background-color: transparent;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-top: 6px solid transparent;
    border-bottom: 6px solid blue;
    border-radius: 50%;
    transform: rotate(45deg);

    // left: 0;
    // bottom: 0;
    // width: 6px;
    // height: 50%;
    // background-color: blue;
    // top: 0;
    // left: 0;
  }

  // border-radius: 50%;
  // border-left: 2px solid transparent;
  // border-right: 2px solid transparent;
  // border-top: 2px solid transparent;
  // border-bottom: 2px solid blue;
  // transform: rotate(45deg);
  // &::before {
  // content: '';
  // position: absolute;
  // width: 40px;
  // height: 2px;
  // background-color: blue;
  // // transform: rotate(-45deg);
  // left: 50%;
  // bottom: -2px;
  // }
}

.button {
  margin-top: 35px;
}
.handle {
  float: left;
  padding-top: 8px;
  padding-bottom: 8px;
}
.close {
  float: right;
  padding-top: 8px;
  padding-bottom: 8px;
}
input {
  display: inline-block;
  width: 50%;
}
.text {
  margin: 20px;
}

@import '~primevue/resources/themes/lara-light-indigo/theme.css';
@import '~primevue/resources/primevue.min.css';
@import '~primeicons/primeicons.css';
</style>

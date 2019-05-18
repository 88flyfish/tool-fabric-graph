"use strict";

$(function () {
  var vm = new Vue({
    el: "#vm",
    data: {
      operation: "notDone",
      isDoneStuArr: ['ff', 'ff', 'faa', 'ff', 'aa', 'xx'],
      notDoneStuArr: ['22', 'ff', '55', '33', 'aa', 'xx']
    },
    mounted: function mounted() {},

    methods: {
      isDoneTab: function isDoneTab() {
        this.operation = 'isDone';
      },
      notDoneTab: function notDoneTab() {
        this.operation = 'notDone';
      }
    }
  });
});
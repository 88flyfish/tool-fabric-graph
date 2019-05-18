$(function () {
  let vm = new Vue({
    el: "#vm",
    data: {
      operation:"notDone",
      isDoneStuArr:['ff','ff','faa','ff','aa','xx'],
      notDoneStuArr:['22','ff','55','33','aa','xx'],
    },
    mounted() {

    },  
    methods: {
      isDoneTab(){
        this.operation = 'isDone'
      },
      notDoneTab(){
        this.operation = 'notDone'
      }
    }
  })
})
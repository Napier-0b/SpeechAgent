var vm = new Vue({
    el: '#app',
    data: {
        exampleItemsArray: [
            "poyo",
            "piyo",
            "beep"
        ],
        todos: [
            { isCompleted: false, taskText: "Vue.jsを理解する", yokudekitaPoint: 100 },
            { isCompleted: true, taskText: "JavaScript(ES6)をちょっと書く", yokudekitaPoint: 50 }
        ],
        input: "",
        targetExample: "",
        oldTarget: ""
    },
    watch: {
        targetExample: function (newValue, oldValue) { //watchが渡すのは更新後、更新前の値
            this.oldTarget = oldValue
        }
    },
    computed: {
        upperMessage: function () { //動的な変数？
            return this.targetExample.toUpperCase()
        }
    },
    methods: {
        addItem: function (someItemName) {
            this.exampleItemsArray.push(someItemName)
        },
        pointCalc: function (point, isDone) {
            return point * Number(isDone)
        }
    }
});
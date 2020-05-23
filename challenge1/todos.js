export default class ToDo {
    constructor(content){
        this.content = content;
        this.completed = false;
    }

    getTimestamp(){
        const date = new Date();
        return date.getTimestamp();
    }

    checkComplete(){
        this.completed = true;
    }
}
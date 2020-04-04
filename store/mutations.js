let mutation={
    changeValue(state,newVal){
        state.CoManger=newVal
    },
    chooseCom(state,newval){
        state.choosedcompany=newval
    },
    bindwuye(state,newval){
        state.bindwuye=newval
    },
    readedCo(state,newval){
        state.readedCo=newval
    },
    notreadCo(state,newval){
        state.notreadCo=newval
    },
    WuCoXQ(state,newval){
        state.WuCoXQ=newval
    },
    choosebuild(state,newval){
        state.choosedbuild=newval
    },
};
export default mutation
